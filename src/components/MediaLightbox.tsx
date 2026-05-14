import {useCallback, useEffect, useRef} from 'react';
import {animate} from 'animejs';
import {X, ChevronLeft, ChevronRight} from 'lucide-react';

type Props = {
  open: boolean;
  urls: string[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function MediaLightbox({open, urls, index, title, onClose, onPrev, onNext}: Props) {
  const url = urls[index];
  const backdropRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasIntroRef = useRef(false);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [open, onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !url) {
      hasIntroRef.current = false;
      return;
    }
    const backdrop = backdropRef.current;
    const dialog = dialogRef.current;
    if (!backdrop || !dialog) return;
    if (hasIntroRef.current) return;
    hasIntroRef.current = true;

    const a1 = animate(backdrop, {
      opacity: [0, 1],
      duration: 260,
      ease: 'outQuad',
    });
    const a2 = animate(dialog, {
      opacity: [0, 1],
      scale: [0.96, 1],
      y: ['0.65rem', 0],
      duration: 420,
      ease: 'outExpo',
    });
    return () => {
      a1.revert();
      a2.revert();
      hasIntroRef.current = false;
    };
  }, [open, url]);

  return (
    <>
      {open && url && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <button
            ref={backdropRef}
            type="button"
            className="absolute inset-0 bg-inverse-surface/80 backdrop-blur-sm"
            style={{opacity: 0}}
            aria-label="Close gallery"
            onClick={onClose}
          />
          <div
            ref={dialogRef}
            style={{opacity: 0}}
            className="relative z-10 max-w-6xl w-full max-h-[90vh] bg-surface-container-lowest rounded-2xl border border-on-surface/10 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-on-surface/5">
              <p className="text-sm font-medium text-on-surface truncate pr-4">{title}</p>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 p-2 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative flex-1 min-h-0 bg-inverse-surface/30 flex items-center justify-center p-4">
              <img src={url} alt="" className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-lg" />
              {urls.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 glass-fab w-11 h-11 rounded-full flex items-center justify-center text-on-surface"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 glass-fab w-11 h-11 rounded-full flex items-center justify-center text-on-surface"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="px-4 py-3 text-center text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
              {index + 1} / {urls.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
