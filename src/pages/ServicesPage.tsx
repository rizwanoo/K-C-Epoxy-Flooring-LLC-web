import { ArrowRight, Check } from 'lucide-react';
import { AppLink } from '../context/RouterContext';
import { KC_PROJECTS } from '../data/projects';
import { HeroStagger, Reveal } from '../components/MotionPrimitives';
import { ProjectImage } from '../components/ProjectImage';

const APPROACH_STEPS = [
  {
    step: '01',
    title: 'Consultation',
    description:
      "Understand the customer's space, project requirements, and desired flooring appearance.",
  },
  {
    step: '02',
    title: 'Project Planning',
    description:
      'Evaluate the flooring requirements and determine an appropriate installation solution.',
  },
  {
    step: '03',
    title: 'Transformation',
    description:
      'Complete the flooring project with attention to preparation, application, and finishing.',
  },
];

export function ServicesPage() {
  const residentialGarage = KC_PROJECTS[3]; // proj_50.png
  const residentialMetallic = KC_PROJECTS[4]; // proj_76.png
  const commercialHall = KC_PROJECTS[2]; // proj_182.jpeg
  const commercialCobalt = KC_PROJECTS[1]; // proj_31.png
  const commercialCrimson = KC_PROJECTS[5]; // proj_173.png
  const industrialCrew = KC_PROJECTS[6]; // proj_160.jpeg

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-[#F2F1EE] border-b border-[#E2E2DF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <HeroStagger delay={0.04}>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                Flooring Services <span aria-hidden="true">·</span> Dallas–Fort Worth, Texas
              </p>
            </HeroStagger>
            <HeroStagger delay={0.1}>
              <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold tracking-tight leading-[1.08] text-[#141619] text-balance">
                Engineered Epoxy Flooring Systems for Every Environment.
              </h1>
            </HeroStagger>
            <HeroStagger delay={0.16}>
              <p className="text-base sm:text-lg text-[#4A4F57] leading-relaxed">
                From residential garage transformations to expansive commercial venues and heavy-use industrial slabs, K &amp; C Epoxy Flooring LLC selects and installs coating systems aligned with the demands of your space.
              </p>
            </HeroStagger>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-[#D4D7DD]">
            <a
              href="#residential"
              className="px-4 py-2 bg-white border border-[#D4D7DD] text-xs sm:text-sm font-semibold text-[#141619] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
            >
              01. Residential
            </a>
            <a
              href="#commercial"
              className="px-4 py-2 bg-white border border-[#D4D7DD] text-xs sm:text-sm font-semibold text-[#141619] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
            >
              02. Commercial
            </a>
            <a
              href="#industrial"
              className="px-4 py-2 bg-white border border-[#D4D7DD] text-xs sm:text-sm font-semibold text-[#141619] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
            >
              03. Industrial
            </a>
            <a
              href="#approach"
              className="px-4 py-2 bg-white border border-[#D4D7DD] text-xs sm:text-sm font-semibold text-[#141619] hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
            >
              Our Approach
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 01: RESIDENTIAL */}
      <section id="residential" className="scroll-mt-20 py-20 sm:py-28 bg-[#FAFAFA] border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <div className="text-xs font-semibold tracking-[0.14em] text-[#1D4ED8] uppercase">
                  01 — Residential Epoxy Flooring
                </div>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#141619] text-balance">
                  Clean, resilient surfaces built for residential concrete spaces.
                </h2>
                <p className="mt-4 text-[#4A4F57] leading-relaxed">
                  Bare residential concrete absorbs stains, sheds surface dust, and wears unevenly over time. Professionally installed epoxy and decorative flake coatings seal the slab, brighten interiors with subtle gloss reflectance, and make day-to-day cleaning effortless.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="pt-4 border-t border-[#E2E2DF] space-y-3">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-[#141619]">
                    Residential Applications
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#272B30]">
                    {[
                      'Residential garage floors with optional coated stem walls',
                      'Interior concrete living areas and studio rooms',
                      'Basements, utility rooms, and home workshops',
                      'Home gyms, game rooms, and suitable concrete patios',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#1D4ED8] mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <Reveal delay={0.06}>
                <figure>
                  <ProjectImage
                    src={residentialGarage.src}
                    alt={residentialGarage.alt}
                    width={residentialGarage.width}
                    height={residentialGarage.height}
                    title={residentialGarage.title}
                    className="border border-[#E2E2DF]"
                  />
                  <figcaption className="mt-2.5 text-xs text-[#6E7480]">
                    {residentialGarage.title} <span aria-hidden="true">·</span> {residentialGarage.finishType}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="max-w-sm">
                  <figure>
                    <ProjectImage
                      src={residentialMetallic.src}
                      alt={residentialMetallic.alt}
                      width={residentialMetallic.width}
                      height={residentialMetallic.height}
                      title={residentialMetallic.title}
                      className="border border-[#E2E2DF]"
                    />
                    <figcaption className="mt-2.5 text-xs text-[#6E7480]">
                      {residentialMetallic.title} <span aria-hidden="true">·</span> {residentialMetallic.finishType}
                    </figcaption>
                  </figure>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: COMMERCIAL */}
      <section id="commercial" className="scroll-mt-20 py-20 sm:py-28 bg-white border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 lg:order-1 order-2 space-y-8">
              <Reveal>
                <figure>
                  <ProjectImage
                    src={commercialHall.src}
                    alt={commercialHall.alt}
                    width={commercialHall.width}
                    height={commercialHall.height}
                    title={commercialHall.title}
                    className="border border-[#E2E2DF]"
                  />
                  <figcaption className="mt-2.5 text-xs text-[#6E7480]">
                    {commercialHall.title} <span aria-hidden="true">·</span> {commercialHall.finishType}
                  </figcaption>
                </figure>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <Reveal delay={0.08}>
                  <figure>
                    <ProjectImage
                      src={commercialCobalt.src}
                      alt={commercialCobalt.alt}
                      width={commercialCobalt.width}
                      height={commercialCobalt.height}
                      title={commercialCobalt.title}
                      className="border border-[#E2E2DF]"
                    />
                    <figcaption className="mt-2.5 text-xs text-[#6E7480]">
                      {commercialCobalt.title} <span aria-hidden="true">·</span> {commercialCobalt.finishType}
                    </figcaption>
                  </figure>
                </Reveal>
                <Reveal delay={0.14}>
                  <figure>
                    <ProjectImage
                      src={commercialCrimson.src}
                      alt={commercialCrimson.alt}
                      width={commercialCrimson.width}
                      height={commercialCrimson.height}
                      title={commercialCrimson.title}
                      className="border border-[#E2E2DF]"
                    />
                    <figcaption className="mt-2.5 text-xs text-[#6E7480]">
                      {commercialCrimson.title} <span aria-hidden="true">·</span> {commercialCrimson.finishType}
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-2 order-1 space-y-6">
              <Reveal>
                <div className="text-xs font-semibold tracking-[0.14em] text-[#1D4ED8] uppercase">
                  02 — Commercial Epoxy Flooring
                </div>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#141619] text-balance">
                  Architectural presentation paired with commercial-grade functionality.
                </h2>
                <p className="mt-4 text-[#4A4F57] leading-relaxed">
                  Your floor shapes the first impression of your business. Commercial epoxy systems provide a seamless, non-porous surface built for continuous foot traffic while keeping janitorial care predictable and efficient.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="pt-4 border-t border-[#E2E2DF] space-y-3">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-[#141619]">
                    Commercial Environments
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#272B30]">
                    {[
                      'Retail spaces, boutiques, and customer lobbies',
                      'Automotive showrooms and commercial business premises',
                      'Service workshops and multi-purpose event venues',
                      'Food-service prep zones and commercial corridors',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#1D4ED8] mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: INDUSTRIAL */}
      <section id="industrial" className="scroll-mt-20 py-20 sm:py-28 bg-[#FAFAFA] border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Reveal>
                <div className="text-xs font-semibold tracking-[0.14em] text-[#1D4ED8] uppercase">
                  03 — Industrial Epoxy Flooring
                </div>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#141619] text-balance">
                  Flooring systems specified for demanding operational environments.
                </h2>
                <p className="mt-4 text-[#4A4F57] leading-relaxed">
                  Industrial slabs experience rolling equipment, frequent traffic lanes, and heavy daily utility. Each flooring system is selected around the substrate condition, traffic load, and surface texture requirements of the specific facility.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="pt-4 border-t border-[#E2E2DF] space-y-3">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-[#141619]">
                    Industrial Facilities &amp; Operations
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#272B30]">
                    {[
                      'Warehouses, distribution bays, and logistics corridors',
                      'Industrial facilities and heavy-duty mechanical workshops',
                      'Production environments and fabrication bays',
                      'High-traffic commercial and industrial concrete slabs',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#1D4ED8] mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <Reveal delay={0.06} className="w-full max-w-md">
                <figure>
                  <ProjectImage
                    src={industrialCrew.src}
                    alt={industrialCrew.alt}
                    width={industrialCrew.width}
                    height={industrialCrew.height}
                    title={industrialCrew.title}
                    className="border border-[#E2E2DF]"
                  />
                  <figcaption className="mt-2.5 text-xs text-[#6E7480]">
                    {industrialCrew.title} <span aria-hidden="true">·</span> {industrialCrew.finishType}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: OUR APPROACH */}
      <section id="approach" className="scroll-mt-20 py-20 sm:py-28 bg-[#141619] text-white">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="max-w-2xl space-y-4 pb-12 border-b border-[#2A2E35]">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#60A5FA]">
                Our Approach <span aria-hidden="true">·</span> Proposed Customer Journey
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-balance">
                A clear, structured three-step path from initial conversation to finished floor.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2A2E35] border-b border-[#2A2E35]">
            {APPROACH_STEPS.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.08}>
                <div className="py-10 md:px-8 first:md:pl-0 last:md:pr-0 space-y-4">
                  <div className="font-display text-3xl font-semibold text-[#60A5FA] tabular-nums">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A7B3] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-base text-[#D4D7DD]">
                Have a residential, commercial, or industrial slab in Dallas–Fort Worth?
              </p>
              <AppLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </AppLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
