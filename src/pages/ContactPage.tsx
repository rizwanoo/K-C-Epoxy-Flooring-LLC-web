import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Instagram,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { HeroStagger, Reveal } from '../components/MotionPrimitives';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  projectType: 'Residential' | 'Commercial' | 'Industrial';
  propertyLocation: string;
  projectSize: string;
  projectDescription: string;
  preferredContactMethod: 'Phone Call' | 'Text Message (SMS)' | 'Email';
}

interface SubmissionSuccess {
  referenceId: string;
  submittedAt: string;
  preferredContactMethod: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  phone: '',
  email: '',
  projectType: 'Residential',
  propertyLocation: '',
  projectSize: '',
  projectDescription: '',
  preferredContactMethod: 'Phone Call',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactPage() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SubmissionSuccess | null>(null);

  const focusEstimateForm = () => {
    nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => nameInputRef.current?.focus(), 200);
  };

  const validateClient = (state: FormState): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (state.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const digits = state.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!EMAIL_REGEX.test(state.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (state.propertyLocation.trim().length < 2) {
      errors.propertyLocation = 'Please enter your city or area in Dallas–Fort Worth.';
    }
    if (state.projectDescription.trim().length < 10) {
      errors.projectDescription = 'Please share a brief description of your flooring project.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const errors = validateClient(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        if (payload.errors && typeof payload.errors === 'object') {
          setFieldErrors(payload.errors);
        }
        setServerError(
          payload.message || 'Unable to submit your estimate request. Please call or text 682-715-9650.'
        );
        return;
      }

      setSubmitted({
        referenceId: payload.referenceId,
        submittedAt: payload.submittedAt,
        preferredContactMethod: payload.preferredContactMethod,
      });
      setForm(INITIAL_FORM);
    } catch {
      setServerError(
        'Network error while sending your request. Please call or text 682-715-9650 directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 bg-white border text-sm sm:text-base text-[#141619] placeholder:text-[#8D94A0] transition-colors focus:outline-none ${
      hasError
        ? 'border-[#B91C1C] focus:border-[#B91C1C]'
        : 'border-[#D4D7DD] focus:border-[#1D4ED8]'
    }`;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-[#F2F1EE] border-b border-[#E2E2DF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <HeroStagger delay={0.04}>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                Contact &amp; Estimates <span aria-hidden="true">·</span> K &amp; C Epoxy Flooring LLC
              </p>
            </HeroStagger>
            <HeroStagger delay={0.1}>
              <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold tracking-tight leading-[1.08] text-[#141619] text-balance">
                Request Your Epoxy Flooring Estimate.
              </h1>
            </HeroStagger>
            <HeroStagger delay={0.16}>
              <p className="text-base sm:text-lg text-[#4A4F57] leading-relaxed">
                Reach out directly by phone or text, or share your project specifications below. Serving Dallas–Fort Worth, Texas.
              </p>
            </HeroStagger>
          </div>

          {/* Direct Action Bar */}
          <div className="mt-10 pt-8 border-t border-[#D4D7DD] flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="tel:+16827159650"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now · 682-715-9650</span>
            </a>

            <a
              href="sms:+16827159650"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white border border-[#D4D7DD] text-[#141619] text-sm font-semibold hover:border-[#141619] transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-[#1D4ED8]" />
              <span>Text Us</span>
            </a>

            <button
              type="button"
              onClick={focusEstimateForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#D4D7DD] text-[#141619] text-sm font-semibold hover:border-[#141619] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Request an Estimate</span>
            </button>

            <a
              href="https://www.instagram.com/kandcepoxyflooringllc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#D4D7DD] text-[#141619] text-sm font-semibold hover:border-[#141619] transition-colors whitespace-nowrap shrink-0"
            >
              <Instagram className="w-4 h-4 text-[#1D4ED8]" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6E7480]" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Split: Verified Info + Estimate Form */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Business Information */}
          <div className="lg:col-span-4 space-y-8">
            <Reveal>
              <div className="bg-white border border-[#E2E2DF] p-7 sm:p-8 space-y-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-[#141619]">
                    K &amp; C Epoxy Flooring LLC
                  </h2>
                  <p className="mt-1 text-sm text-[#4A4F57]">
                    Residential · Commercial · Industrial
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#E2E2DF] text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#141619]">Service Area</p>
                      <p className="text-[#4A4F57]">Serving Dallas–Fort Worth, Texas.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#141619]">Telephone</p>
                      <a
                        href="tel:+16827159650"
                        className="text-[#1D4ED8] hover:underline font-medium tabular-nums"
                      >
                        682-715-9650
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#141619]">Direct SMS</p>
                      <a
                        href="sms:+16827159650"
                        className="text-[#1D4ED8] hover:underline font-medium tabular-nums"
                      >
                        Text 682-715-9650
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#141619]">Instagram</p>
                      <a
                        href="https://www.instagram.com/kandcepoxyflooringllc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#1D4ED8] hover:underline font-medium"
                      >
                        <span>@kandcepoxyflooringllc</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="bg-[#F2F1EE] border border-[#E2E2DF] p-7 space-y-3">
                <h3 className="font-display text-base font-semibold text-[#141619]">
                  Prefer Immediate Direct Contact?
                </h3>
                <p className="text-sm text-[#4A4F57] leading-relaxed">
                  You can call or text photos of your concrete slab directly to{' '}
                  <a href="tel:+16827159650" className="text-[#141619] font-semibold underline tabular-nums">
                    682-715-9650
                  </a>{' '}
                  at any time.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Estimate Request Form */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="bg-white border border-[#E2E2DF] p-7 sm:p-10 lg:p-12">
                {submitted ? (
                  <div className="space-y-6 py-4" role="status" aria-live="polite">
                    <div className="inline-flex items-center gap-2.5 text-[#15803D] font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Estimate Request Recorded</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#141619]">
                      Thank you for reaching out to K &amp; C Epoxy Flooring LLC.
                    </h2>
                    <p className="text-[#4A4F57] leading-relaxed">
                      Your project inquiry has been saved on our server with reference{' '}
                      <span className="font-semibold text-[#141619] tabular-nums">{submitted.referenceId}</span>. We will follow up via your preferred contact method ({submitted.preferredContactMethod}).
                    </p>

                    <div className="pt-4 border-t border-[#E2E2DF] flex flex-wrap items-center gap-4">
                      <a
                        href="tel:+16827159650"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call 682-715-9650</span>
                      </a>
                      <a
                        href="sms:+16827159650"
                        className="inline-flex items-center gap-2 px-5 py-3 border border-[#D4D7DD] text-[#141619] text-sm font-semibold hover:border-[#141619] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-[#1D4ED8]" />
                        <span>Text 682-715-9650</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitted(null)}
                        className="text-sm font-semibold text-[#4A4F57] hover:text-[#141619] underline"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-7">
                    <div className="border-b border-[#E2E2DF] pb-5">
                      <h2 className="font-display text-2xl font-semibold text-[#141619]">
                        Project Details
                      </h2>
                      <p className="mt-1 text-sm text-[#4A4F57]">
                        Complete the fields below to request an estimate for your Dallas–Fort Worth property.
                      </p>
                    </div>

                    {serverError && (
                      <div
                        role="alert"
                        className="p-4 border border-[#B91C1C]/30 bg-[#FEF2F2] text-[#991B1B] text-sm flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-[#141619] mb-2">
                          Full Name <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          ref={nameInputRef}
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          placeholder="Your full name"
                          className={inputClass(Boolean(fieldErrors.fullName))}
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-1.5 text-xs text-[#B91C1C] font-medium">{fieldErrors.fullName}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-[#141619] mb-2">
                          Phone Number <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(682) 555-0199"
                          className={inputClass(Boolean(fieldErrors.phone))}
                        />
                        {fieldErrors.phone && (
                          <p className="mt-1.5 text-xs text-[#B91C1C] font-medium">{fieldErrors.phone}</p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-[#141619] mb-2">
                          Email Address <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className={inputClass(Boolean(fieldErrors.email))}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-xs text-[#B91C1C] font-medium">{fieldErrors.email}</p>
                        )}
                      </div>

                      {/* Project Type */}
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-semibold text-[#141619] mb-2">
                          Project Type <span className="text-[#B91C1C]">*</span>
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={form.projectType}
                          onChange={(e) =>
                            setForm({ ...form, projectType: e.target.value as FormState['projectType'] })
                          }
                          className={inputClass(Boolean(fieldErrors.projectType))}
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                        {fieldErrors.projectType && (
                          <p className="mt-1.5 text-xs text-[#B91C1C] font-medium">{fieldErrors.projectType}</p>
                        )}
                      </div>

                      {/* Property Location */}
                      <div>
                        <label htmlFor="propertyLocation" className="block text-sm font-semibold text-[#141619] mb-2">
                          Property Location (DFW Area) <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="propertyLocation"
                          name="propertyLocation"
                          type="text"
                          required
                          value={form.propertyLocation}
                          onChange={(e) => setForm({ ...form, propertyLocation: e.target.value })}
                          placeholder="e.g., Fort Worth, Dallas, Arlington, Plano"
                          className={inputClass(Boolean(fieldErrors.propertyLocation))}
                        />
                        {fieldErrors.propertyLocation && (
                          <p className="mt-1.5 text-xs text-[#B91C1C] font-medium">
                            {fieldErrors.propertyLocation}
                          </p>
                        )}
                      </div>

                      {/* Approximate Project Size */}
                      <div>
                        <label htmlFor="projectSize" className="block text-sm font-semibold text-[#141619] mb-2">
                          Approximate Project Size <span className="text-xs font-normal text-[#6E7480]">(Optional)</span>
                        </label>
                        <input
                          id="projectSize"
                          name="projectSize"
                          type="text"
                          value={form.projectSize}
                          onChange={(e) => setForm({ ...form, projectSize: e.target.value })}
                          placeholder="e.g., 2-car garage or ~1,500 sq ft"
                          className={inputClass(false)}
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <span className="block text-sm font-semibold text-[#141619] mb-2.5">
                        Preferred Contact Method <span className="text-[#B91C1C]">*</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(['Phone Call', 'Text Message (SMS)', 'Email'] as const).map((method) => {
                          const active = form.preferredContactMethod === method;
                          return (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setForm({ ...form, preferredContactMethod: method })}
                              aria-pressed={active}
                              className={`px-4 py-3 text-sm font-semibold border transition-colors text-center ${
                                active
                                  ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                                  : 'bg-[#FAFAFA] border-[#D4D7DD] text-[#272B30] hover:border-[#141619]'
                              }`}
                            >
                              {method}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label htmlFor="projectDescription" className="block text-sm font-semibold text-[#141619] mb-2">
                        Project Description <span className="text-[#B91C1C]">*</span>
                      </label>
                      <textarea
                        id="projectDescription"
                        name="projectDescription"
                        rows={4}
                        required
                        value={form.projectDescription}
                        onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
                        placeholder="Tell us about your concrete space, desired finish (flake, solid, metallic), and timeline."
                        className={inputClass(Boolean(fieldErrors.projectDescription))}
                      />
                      {fieldErrors.projectDescription && (
                        <p className="mt-1.5 text-xs text-[#B91C1C] font-medium">
                          {fieldErrors.projectDescription}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <span>Request My Estimate</span>
                        )}
                      </button>

                      <p className="text-xs text-[#6E7480]">
                        Or call/text directly:{' '}
                        <a href="tel:+16827159650" className="text-[#141619] font-semibold hover:underline tabular-nums">
                          682-715-9650
                        </a>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
