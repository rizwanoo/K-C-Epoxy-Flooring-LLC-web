import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Maximize2, Phone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AppLink } from '../context/RouterContext';
import {
  COMMERCIAL_FEATURE,
  HERO_PROJECT,
  INDUSTRIAL_FEATURE,
  KC_PROJECTS,
  RESIDENTIAL_FEATURE,
} from '../data/projects';
import { HeroStagger, Reveal } from '../components/MotionPrimitives';
import { ProjectImage } from '../components/ProjectImage';
import { LightboxModal } from '../components/LightboxModal';

const FEATURED_GALLERY = [
  KC_PROJECTS[1], // Cobalt & Ocean Metallic Commercial Interior
  KC_PROJECTS[4], // Charcoal & Smoke Metallic Interior Concrete
  KC_PROJECTS[5], // Commercial Food-Service & Prep Area Epoxy
  KC_PROJECTS[7], // Home Gym & Recreation Suite Epoxy Floor
];

const VALUE_PILLARS = [
  {
    number: '01',
    title: 'Modern Appearance',
    description:
      'Seamless architectural finishes—from subtle neutral flake blends to deep marbled metallic systems—that elevate the look of any concrete slab.',
  },
  {
    number: '02',
    title: 'Easy Maintenance',
    description:
      'Non-porous, continuous surfaces eliminate grout lines and trap less dust, making routine sweeping and wet cleaning quick and straightforward.',
  },
  {
    number: '03',
    title: 'Durable Floor Finishes',
    description:
      'Resinous floor coatings engineered to resist everyday foot traffic, rolling tool chests, vehicle tires, and common surface wear.',
  },
  {
    number: '04',
    title: 'Versatile Applications',
    description:
      'Tailored coating systems adaptable to residential garages, interior living areas, retail showrooms, food-service prep rooms, and industrial bays.',
  },
  {
    number: '05',
    title: 'Professional-Looking Spaces',
    description:
      'Clean perimeter coving, uniform gloss reflection, and disciplined surface preparation deliver a crisp finish built to make a lasting impression.',
  },
];

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] lg:min-h-[92vh] flex items-end bg-[#11141A] text-white overflow-hidden pt-24 pb-16 sm:pb-20 lg:pb-24"
      >
        <motion.div
          style={{ y: heroParallaxY }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={HERO_PROJECT.src}
            alt={HERO_PROJECT.alt}
            width={HERO_PROJECT.width}
            height={HERO_PROJECT.height}
            loading="eager"
            decoding="sync"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F14]/92 via-[#0C0F14]/65 to-[#0C0F14]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14]/90 via-transparent to-[#0C0F14]/55" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1360px] w-full px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-6">
            <HeroStagger delay={0.05}>
              <p className="text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-[#D4D7DD]">
                Dallas–Fort Worth, Texas <span aria-hidden="true">·</span> Residential · Commercial · Industrial
              </p>
            </HeroStagger>

            <HeroStagger delay={0.12}>
              <h1 className="font-display text-[clamp(2.25rem,4.6vw,4.15rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-white text-balance">
                Floors That Transform Spaces. Built to Make an Impression.
              </h1>
            </HeroStagger>

            <HeroStagger delay={0.2}>
              <p className="text-base sm:text-lg text-[#E5E4E0] leading-relaxed max-w-2xl">
                Professional epoxy flooring solutions for residential, commercial, and industrial spaces throughout Dallas–Fort Worth, Texas.
              </p>
            </HeroStagger>

            <HeroStagger delay={0.28}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <AppLink
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#1D4ED8] text-white text-sm font-semibold tracking-tight hover:bg-[#1E40AF] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Request an Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </AppLink>

                <AppLink
                  to="/our-work"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 bg-white/10 backdrop-blur-xs text-white text-sm font-semibold tracking-tight hover:bg-white hover:text-[#141619] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Explore Our Work</span>
                </AppLink>
              </div>
            </HeroStagger>
          </div>
        </div>
      </section>

      {/* 2. SERVICE INTRODUCTION */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#E2E2DF]">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                  Core Flooring Disciplines
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.12] text-[#141619] text-balance">
                  Precision coatings tailored to residential, commercial, and industrial spaces.
                </h2>
              </div>
              <AppLink
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#141619] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </AppLink>
            </div>
          </Reveal>

          <div className="divide-y divide-[#E2E2DF]">
            {/* 01 Residential */}
            <Reveal delay={0.05}>
              <article className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[#4A4F57]">
                    <span className="text-[#1D4ED8] tabular-nums">01</span>
                    <span aria-hidden="true">/</span>
                    <span>GARAGES · BASEMENTS · INTERIORS</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141619]">
                    Residential Epoxy Flooring
                  </h3>
                  <p className="text-[#4A4F57] leading-relaxed">
                    Beautiful, practical flooring transformations for residential environments—turning concrete garages, interior rooms, and recreation spaces into clean, high-gloss surfaces built for daily living.
                  </p>
                  <div className="pt-2">
                    <AppLink
                      to="/services#residential"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                    >
                      <span>Explore Residential Solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </AppLink>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <ProjectImage
                    src={RESIDENTIAL_FEATURE.src}
                    alt={RESIDENTIAL_FEATURE.alt}
                    width={RESIDENTIAL_FEATURE.width}
                    height={RESIDENTIAL_FEATURE.height}
                    title={RESIDENTIAL_FEATURE.title}
                    className="border border-[#E2E2DF]"
                  />
                </div>
              </article>
            </Reveal>

            {/* 02 Commercial */}
            <Reveal delay={0.05}>
              <article className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 lg:order-1 order-2">
                  <ProjectImage
                    src={COMMERCIAL_FEATURE.src}
                    alt={COMMERCIAL_FEATURE.alt}
                    width={COMMERCIAL_FEATURE.width}
                    height={COMMERCIAL_FEATURE.height}
                    title={COMMERCIAL_FEATURE.title}
                    className="border border-[#E2E2DF]"
                  />
                </div>
                <div className="lg:col-span-5 lg:order-2 order-1 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[#4A4F57]">
                    <span className="text-[#1D4ED8] tabular-nums">02</span>
                    <span aria-hidden="true">/</span>
                    <span>RETAIL · SHOWROOMS · BUSINESSES</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141619]">
                    Commercial Epoxy Flooring
                  </h3>
                  <p className="text-[#4A4F57] leading-relaxed">
                    Professional flooring solutions for commercial properties and business environments—delivering uniform light reflectance, sharp architectural presentation, and straightforward facility upkeep.
                  </p>
                  <div className="pt-2">
                    <AppLink
                      to="/services#commercial"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                    >
                      <span>Explore Commercial Solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </AppLink>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* 03 Industrial */}
            <Reveal delay={0.05}>
              <article className="pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-[#4A4F57]">
                    <span className="text-[#1D4ED8] tabular-nums">03</span>
                    <span aria-hidden="true">/</span>
                    <span>WAREHOUSES · WORKSHOPS · FACILITIES</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141619]">
                    Industrial Epoxy Flooring
                  </h3>
                  <p className="text-[#4A4F57] leading-relaxed">
                    Durable flooring solutions designed for industrial environments—selecting coating build and surface texture to match the operational demands of workshops, storage bays, and production floors.
                  </p>
                  <div className="pt-2">
                    <AppLink
                      to="/services#industrial"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                    >
                      <span>Explore Industrial Solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </AppLink>
                  </div>
                </div>
                <div className="lg:col-span-7 flex justify-center lg:justify-end">
                  <div className="w-full max-w-md">
                    <ProjectImage
                      src={INDUSTRIAL_FEATURE.src}
                      alt={INDUSTRIAL_FEATURE.alt}
                      width={INDUSTRIAL_FEATURE.width}
                      height={INDUSTRIAL_FEATURE.height}
                      title={INDUSTRIAL_FEATURE.title}
                      className="border border-[#E2E2DF]"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                  Selected Installations
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#141619] text-balance">
                  Completed K &amp; C Flooring Projects
                </h2>
                <p className="text-[#4A4F57] leading-relaxed">
                  Authentic photography of our completed epoxy installations—presented uncropped to preserve every floor detail, reflection, and edge transition.
                </p>
              </div>
              <AppLink
                to="/our-work"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D4D7DD] text-sm font-semibold text-[#141619] hover:border-[#141619] transition-colors whitespace-nowrap shrink-0"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </AppLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-start">
            {FEATURED_GALLERY.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 0.06}>
                <figure className="group">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="relative w-full text-left block border border-[#E2E2DF] bg-[#F2F1EE] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                    aria-label={`View full-size photograph of ${project.title}`}
                  >
                    <ProjectImage
                      src={project.src}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      title={project.title}
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141619]/85 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Full Size</span>
                    </span>
                  </button>
                  <figcaption className="mt-4 space-y-1.5">
                    <div className="text-xs text-[#6E7480] font-medium">
                      <span>{project.finishType}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{project.categories[0]}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#141619]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#4A4F57] leading-relaxed">
                      {project.summary}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE K & C */}
      <section className="py-20 sm:py-28 bg-[#F2F1EE] border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-4">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                  Why Choose K &amp; C
                </p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#141619] text-balance">
                  Craftsmanship built around practical performance.
                </h2>
                <p className="mt-4 text-[#4A4F57] leading-relaxed">
                  Every installation is approached with careful surface preparation, clean perimeter detailing, and resinous systems matched to how your space actually works.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#D4D7DD] border-t border-b border-[#D4D7DD]">
              {VALUE_PILLARS.map((item, idx) => (
                <Reveal key={item.number} delay={idx * 0.04}>
                  <div className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                    <div className="sm:col-span-1 text-xs font-semibold text-[#1D4ED8] tabular-nums">
                      {item.number}
                    </div>
                    <h3 className="sm:col-span-4 font-display text-lg font-semibold text-[#141619]">
                      {item.title}
                    </h3>
                    <p className="sm:col-span-7 text-sm sm:text-base text-[#4A4F57] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="bg-white border border-[#E2E2DF] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                  Dallas–Fort Worth, Texas
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-[#141619] text-balance">
                  Ready to Transform Your Floors?
                </h2>
                <p className="text-base sm:text-lg text-[#4A4F57] leading-relaxed">
                  Let&apos;s discuss your next residential, commercial, or industrial flooring project.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <AppLink
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Request an Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </AppLink>
                <a
                  href="tel:+16827159650"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#D4D7DD] text-[#141619] text-sm font-semibold hover:border-[#141619] transition-colors whitespace-nowrap shrink-0 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#1D4ED8]" />
                  <span>682-715-9650</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <LightboxModal
        projects={FEATURED_GALLERY}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
