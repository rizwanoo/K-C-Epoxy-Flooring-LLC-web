import { ArrowUpRight, Instagram, MessageSquare, Phone } from 'lucide-react';
import { AppLink } from '../context/RouterContext';
import { BrandMark } from './BrandMark';

export function Footer() {
  return (
    <footer className="bg-[#141619] text-[#E5E4E0] border-t border-[#26292E]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-5 space-y-5">
            <AppLink to="/" className="inline-flex items-center gap-3 text-white font-display text-xl font-semibold tracking-tight">
              <BrandMark className="w-8 h-8" />
              <span>K &amp; C Epoxy Flooring LLC</span>
            </AppLink>
            <p className="text-sm leading-relaxed text-[#A1A7B3] max-w-md">
              Residential, commercial, and industrial epoxy flooring installations engineered for durability, visual precision, and straightforward maintenance.
            </p>
            <p className="text-sm font-medium text-white">
              Serving Dallas–Fort Worth, Texas.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wide text-white">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm text-[#A1A7B3]">
              <li>
                <AppLink to="/" className="hover:text-white transition-colors">
                  Home
                </AppLink>
              </li>
              <li>
                <AppLink to="/services" className="hover:text-white transition-colors">
                  Services
                </AppLink>
              </li>
              <li>
                <AppLink to="/services#residential" className="hover:text-white transition-colors">
                  Residential Epoxy Flooring
                </AppLink>
              </li>
              <li>
                <AppLink to="/services#commercial" className="hover:text-white transition-colors">
                  Commercial Epoxy Flooring
                </AppLink>
              </li>
              <li>
                <AppLink to="/services#industrial" className="hover:text-white transition-colors">
                  Industrial Epoxy Flooring
                </AppLink>
              </li>
              <li>
                <AppLink to="/our-work" className="hover:text-white transition-colors">
                  Our Work
                </AppLink>
              </li>
              <li>
                <AppLink to="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Estimates
                </AppLink>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wide text-white">
              Direct Contact
            </h2>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+16827159650"
                className="flex items-center gap-2.5 text-white hover:text-[#60A5FA] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#60A5FA] shrink-0" />
                <span className="tabular-nums font-medium">682-715-9650</span>
              </a>
              <a
                href="sms:+16827159650"
                className="flex items-center gap-2.5 text-[#A1A7B3] hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#A1A7B3] shrink-0" />
                <span>Text Us at 682-715-9650</span>
              </a>
              <a
                href="https://www.instagram.com/kandcepoxyflooringllc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#A1A7B3] hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                <span>@kandcepoxyflooringllc</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="pt-2">
              <AppLink
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors"
              >
                Request an Estimate
              </AppLink>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#26292E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8D94A0]">
          <p>&copy; {new Date().getFullYear()} K &amp; C Epoxy Flooring LLC. All rights reserved.</p>
          <p>Dallas–Fort Worth, Texas, USA</p>
        </div>
      </div>
    </footer>
  );
}
