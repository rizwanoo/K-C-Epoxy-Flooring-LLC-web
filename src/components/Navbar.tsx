import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { AppLink, useRouter } from '../context/RouterContext';
import { BrandMark } from './BrandMark';

const SERVICE_SUBLINKS = [
  { label: 'Residential Epoxy Flooring', to: '/services#residential' },
  { label: 'Commercial Epoxy Flooring', to: '/services#commercial' },
  { label: 'Industrial Epoxy Flooring', to: '/services#industrial' },
  { label: 'Our Approach', to: '/services#approach' },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const isTransparentHero = route === '/' && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [route]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  const openServicesMenu = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 140);
  };

  const navLinkClass = (active: boolean) =>
    `relative inline-flex items-center whitespace-nowrap shrink-0 text-sm font-medium tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] ${
      isTransparentHero
        ? active
          ? 'text-white'
          : 'text-white/85 hover:text-white'
        : active
          ? 'text-[#1D4ED8]'
          : 'text-[#3A3F47] hover:text-[#141619]'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        isTransparentHero
          ? 'bg-gradient-to-b from-[#0E1116]/75 to-transparent border-b border-white/10'
          : 'bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#E2E2DF]'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <AppLink
          to="/"
          className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 font-display text-base sm:text-lg font-semibold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] ${
            isTransparentHero ? 'text-white' : 'text-[#141619]'
          }`}
        >
          <BrandMark className="w-7 h-7 shrink-0" />
          <span>K &amp; C Epoxy Flooring LLC</span>
        </AppLink>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main navigation">
          <AppLink to="/" className={navLinkClass(route === '/')}>
            Home
          </AppLink>

          <div
            ref={dropdownContainerRef}
            className="relative"
            onMouseEnter={openServicesMenu}
            onMouseLeave={scheduleCloseServicesMenu}
          >
            <div className="inline-flex items-center gap-1">
              <AppLink to="/services" className={navLinkClass(route === '/services')}>
                Services
              </AppLink>
              <button
                type="button"
                aria-label="Toggle Services submenu"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`p-1 transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                  isTransparentHero ? 'text-white/85 hover:text-white' : 'text-[#4A4F57] hover:text-[#141619]'
                }`}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${servicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={scheduleCloseServicesMenu}
                  className="absolute left-0 top-full pt-3 w-64 z-50"
                >
                  <div className="bg-white border border-[#E2E2DF] shadow-lg py-2">
                    {SERVICE_SUBLINKS.map((item) => (
                      <button
                        key={item.to}
                        type="button"
                        onClick={() => {
                          setServicesOpen(false);
                          navigate(item.to);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#272B30] hover:bg-[#F2F1EE] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AppLink to="/our-work" className={navLinkClass(route === '/our-work')}>
            Our Work
          </AppLink>

          <AppLink to="/contact" className={navLinkClass(route === '/contact')}>
            Contact
          </AppLink>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <AppLink
            to="/contact"
            className={`hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
              isTransparentHero
                ? 'bg-white text-[#141619] hover:bg-[#E5E4E0]'
                : 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
            }`}
          >
            Request an Estimate
          </AppLink>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 transition-colors focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
              isTransparentHero ? 'text-white hover:bg-white/10' : 'text-[#141619] hover:bg-[#F2F1EE]'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FAFAFA] border-b border-[#E2E2DF] px-5 py-6"
          >
            <nav className="flex flex-col divide-y divide-[#E2E2DF]" aria-label="Mobile navigation">
              <AppLink
                to="/"
                className={`py-3.5 text-base font-medium ${route === '/' ? 'text-[#1D4ED8]' : 'text-[#141619]'}`}
              >
                Home
              </AppLink>

              <div className="py-3">
                <div className="flex items-center justify-between">
                  <AppLink
                    to="/services"
                    className={`py-1 text-base font-medium ${route === '/services' ? 'text-[#1D4ED8]' : 'text-[#141619]'}`}
                  >
                    Services
                  </AppLink>
                  <button
                    type="button"
                    aria-label="Expand Services submenu"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className="w-10 h-10 inline-flex items-center justify-center text-[#4A4F57]"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-150 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div className="mt-2 pl-3 flex flex-col gap-1 border-l border-[#D4D7DD]">
                    {SERVICE_SUBLINKS.map((item) => (
                      <button
                        key={item.to}
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          navigate(item.to);
                        }}
                        className="py-2 text-left text-sm text-[#4A4F57] hover:text-[#1D4ED8]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <AppLink
                to="/our-work"
                className={`py-3.5 text-base font-medium ${route === '/our-work' ? 'text-[#1D4ED8]' : 'text-[#141619]'}`}
              >
                Our Work
              </AppLink>

              <AppLink
                to="/contact"
                className={`py-3.5 text-base font-medium ${route === '/contact' ? 'text-[#1D4ED8]' : 'text-[#141619]'}`}
              >
                Contact
              </AppLink>
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <AppLink
                to="/contact"
                className="w-full inline-flex items-center justify-center px-5 py-3.5 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors"
              >
                Request an Estimate
              </AppLink>
              <a
                href="tel:+16827159650"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#D4D7DD] bg-white text-[#141619] text-sm font-semibold hover:bg-[#F2F1EE] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#1D4ED8]" />
                <span>Call 682-715-9650</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
