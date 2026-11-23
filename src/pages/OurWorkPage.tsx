import { useMemo, useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AppLink } from '../context/RouterContext';
import { GALLERY_CATEGORIES, KC_PROJECTS, type ProjectCategory } from '../data/projects';
import { HeroStagger, Reveal } from '../components/MotionPrimitives';
import { ProjectImage } from '../components/ProjectImage';
import { LightboxModal } from '../components/LightboxModal';

export function OurWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All Projects' | ProjectCategory>('All Projects');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Projects') return KC_PROJECTS;
    return KC_PROJECTS.filter((project) => project.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="pt-16">
      {/* Editorial Portfolio Header */}
      <section className="bg-[#F2F1EE] border-b border-[#E2E2DF] py-16 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <HeroStagger delay={0.04}>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                Project Portfolio <span aria-hidden="true">·</span> K &amp; C Epoxy Flooring LLC
              </p>
            </HeroStagger>
            <HeroStagger delay={0.1}>
              <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold tracking-tight leading-[1.08] text-[#141619] text-balance">
                Authentic Craftsmanship Across Every Slab.
              </h1>
            </HeroStagger>
            <HeroStagger delay={0.16}>
              <p className="text-base sm:text-lg text-[#4A4F57] leading-relaxed">
                Explore completed residential, commercial, industrial, garage, and decorative epoxy flooring installations—displayed in their true proportions with full-size image viewing.
              </p>
            </HeroStagger>
          </div>

          {/* Interactive Filter Controls */}
          <div className="mt-10 pt-6 border-t border-[#D4D7DD]" role="region" aria-label="Filter projects by category">
            <div className="flex flex-wrap items-center gap-2">
              {GALLERY_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setLightboxIndex(null);
                    }}
                    aria-pressed={isActive}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      isActive
                        ? 'bg-[#1D4ED8] text-white'
                        : 'bg-white border border-[#D4D7DD] text-[#272B30] hover:border-[#141619] hover:text-[#141619]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Uncropped Gallery */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-[#E2E2DF]">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 flex items-center justify-between text-xs font-medium text-[#6E7480]">
            <span>
              Showing <span className="text-[#141619] font-semibold tabular-nums">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'installation' : 'installations'}
            </span>
            <span>Click any photograph for full-size view</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
            {filteredProjects.map((project, index) => (
              <motion.figure
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="relative w-full text-left block border border-[#E2E2DF] bg-[#EAE9E4] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  aria-label={`Open full-size view for ${project.title}`}
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
                    <span>Expand Photo</span>
                  </span>
                </button>

                <figcaption className="mt-4 pt-3 border-t border-[#E2E2DF] space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#6E7480]">
                    <span className="text-[#1D4ED8]">{project.finishType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.categories.join(' / ')}</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#141619]">
                    {project.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A4F57] leading-relaxed">
                    {project.summary}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Band */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="bg-[#F2F1EE] border border-[#E2E2DF] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#1D4ED8]">
                  Dallas–Fort Worth Epoxy Flooring
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] text-[#141619] text-balance">
                  Your Space. Your Vision. A Better Floor.
                </h2>
                <p className="text-[#4A4F57] leading-relaxed">
                  Share your project goals with our team for a straightforward consultation and estimate.
                </p>
              </div>
              <AppLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </AppLink>
            </div>
          </Reveal>
        </div>
      </section>

      <LightboxModal
        projects={filteredProjects}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
