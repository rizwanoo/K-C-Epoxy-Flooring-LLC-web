import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectItem } from '../data/projects';

interface LightboxModalProps {
  projects: ProjectItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function LightboxModal({
  projects,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxModalProps) {
  const isOpen = activeIndex !== null && projects[activeIndex] !== undefined;
  const current = isOpen ? projects[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % projects.length);
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + projects.length) % projects.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, activeIndex, projects.length, onClose, onChangeIndex]);

  return (
    <AnimatePresence>
      {isOpen && current && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#0D0F12]/92 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-display text-base sm:text-lg font-semibold truncate">
                {current.title}
              </p>
              <p className="text-xs sm:text-sm text-[#A1A7B3] truncate">
                {current.finishType} <span aria-hidden="true">·</span> {current.categories.join(' / ')}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="w-11 h-11 inline-flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-[#141619] transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Full Uncropped Image Stage */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onChangeIndex((activeIndex - 1 + projects.length) % projects.length)}
              aria-label="Previous project image"
              className="hidden sm:inline-flex items-center justify-center w-11 h-11 border border-white/20 text-white hover:bg-white hover:text-[#141619] transition-colors mr-4 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-full flex items-center justify-center"
            >
              <img
                src={current.src}
                alt={current.alt}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full w-auto h-auto object-contain shadow-2xl"
              />
            </motion.div>

            <button
              type="button"
              onClick={() => onChangeIndex((activeIndex + 1) % projects.length)}
              aria-label="Next project image"
              className="hidden sm:inline-flex items-center justify-center w-11 h-11 border border-white/20 text-white hover:bg-white hover:text-[#141619] transition-colors ml-4 shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Caption & Mobile Controls */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15 pt-4 text-sm text-[#D4D7DD]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-2xl leading-relaxed">{current.summary}</p>
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs text-[#A1A7B3] tabular-nums">
                {activeIndex + 1} / {projects.length}
              </span>
              <div className="flex sm:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChangeIndex((activeIndex - 1 + projects.length) % projects.length)}
                  aria-label="Previous project image"
                  className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeIndex((activeIndex + 1) % projects.length)}
                  aria-label="Next project image"
                  className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
