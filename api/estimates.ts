import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

interface IncomingRequest {
  method?: string;
  body?: unknown;
}

interface OutgoingResponse {
  status: (code: number) => OutgoingResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const VALID_PROJECT_TYPES = new Set(['Residential', 'Commercial', 'Industrial']);
const VALID_CONTACT_METHODS = new Set(['Phone Call', 'Text Message (SMS)', 'Email']);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

export default async function handler(req: IncomingRequest, res: OutgoingResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  try {
    const rawBody =
      typeof req.body === 'string'
        ? (JSON.parse(req.body) as Record<string, unknown>)
        : ((req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>);

    const errors: Record<string, string> = {};

    const fullName = sanitizeText(rawBody.fullName, 120);
    const phone = sanitizeText(rawBody.phone, 40);
    const email = sanitizeText(rawBody.email, 160);
    const projectType = sanitizeText(rawBody.projectType, 40);
    const propertyLocation = sanitizeText(rawBody.propertyLocation, 160);
    const projectSize = sanitizeText(rawBody.projectSize, 80);
    const projectDescription = sanitizeText(rawBody.projectDescription, 2000);
    const preferredContactMethod = sanitizeText(rawBody.preferredContactMethod, 40);

    if (fullName.length < 2) errors.fullName = 'Please enter your full name.';
    if (phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a valid 10-digit phone number.';
    if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.';
    if (!VALID_PROJECT_TYPES.has(projectType)) errors.projectType = 'Please select Residential, Commercial, or Industrial.';
    if (propertyLocation.length < 2) errors.propertyLocation = 'Please enter the city or area in Dallas–Fort Worth.';
    if (projectDescription.length < 10) errors.projectDescription = 'Please share a brief description of your flooring project.';
    if (!VALID_CONTACT_METHODS.has(preferredContactMethod)) errors.preferredContactMethod = 'Please choose your preferred contact method.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Please review the highlighted fields.',
        errors,
      });
    }

    const referenceId = `KC-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    const record = {
      fullName,
      phone,
      email,
      projectType,
      propertyLocation,
      projectSize: projectSize || undefined,
      projectDescription,
      preferredContactMethod,
      referenceId,
      submittedAt,
    };

    const tmpFile = path.join(os.tmpdir(), 'kc-estimates.json');
    try {
      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(tmpFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) existing = parsed;
      } catch {
        existing = [];
      }
      existing.push(record);
      await fs.writeFile(tmpFile, JSON.stringify(existing, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('Could not write estimate to tmp storage:', fsErr);
    }

    const webhookUrl = process.env.ESTIMATE_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
      } catch (webhookErr) {
        console.error('Estimate webhook forwarding failed:', webhookErr);
      }
    }

    return res.status(201).json({
      ok: true,
      referenceId,
      submittedAt,
      preferredContactMethod,
      message: 'Your estimate request has been received and recorded.',
    });
  } catch (err) {
    console.error('Estimate API error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Unable to record your estimate request right now. Please call or text 682-715-9650 directly.',
    });
  }
}
