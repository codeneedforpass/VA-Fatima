import {useCallback, useEffect, useId, useRef} from 'react';
import {Link} from 'react-router-dom';
import {animate, createDrawable, scrambleText, stagger} from 'animejs';
import type {JSAnimation} from 'animejs';
import {ArrowRight, Briefcase, Paintbrush, Shield, Video, Zap} from 'lucide-react';
import {brand, contact} from '../data/siteContent';

function HeadlineLetters({text}: {text: string}) {
  const sanitized = text
    .normalize('NFC')
    .replace(/\u00a0/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF\u00ad\u2060]/g, '');
  const words = sanitized.split(/\s+/).filter(Boolean);

  return (
    <h1 className="mt-4 overflow-x-clip text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#006D77] leading-[1.08] tracking-tight drop-shadow-sm">
      {words.map((word, wi) => (
        <span key={`headline-word-${wi}`} className="inline-block whitespace-nowrap">
          {wi > 0 ? <span className="inline-block w-[0.28em]" aria-hidden /> : null}
          {word.split('').map((ch, ci) => {
            if (!ch) return null;
            const isGlobalFirst = wi === 0 && ci === 0;
            const isGlobalLast = wi === words.length - 1 && ci === word.length - 1;
            const isWordStart = ci === 0;
            const isWordEnd = ci === word.length - 1;
            const ml = isGlobalFirst || isWordStart ? 'ml-0' : '-ml-[0.06em]';
            const mr = isGlobalLast || (isWordEnd && wi < words.length - 1) ? 'mr-0' : '-mr-[0.06em]';

            return (
              <span
                key={`headline-char-${wi}-${ci}`}
                className={`inline-block overflow-hidden align-baseline px-[0.06em] ${ml} ${mr}`}
              >
                <span data-hero-letter className="inline-block opacity-0 will-change-[transform,opacity]">
                  {ch}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const parallaxRootRef = useRef<HTMLDivElement | null>(null);
  const iconsLayerRef = useRef<HTMLDivElement | null>(null);
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const floatTopRef = useRef<HTMLDivElement | null>(null);
  const floatBottomRef = useRef<HTMLDivElement | null>(null);
  const ctaIconRef = useRef<HTMLSpanElement | null>(null);
  const kickerScrambleRef = useRef<HTMLSpanElement | null>(null);
  const headlineUnderlineRef = useRef<SVGPathElement | null>(null);
  const orbitRingRef = useRef<HTMLDivElement | null>(null);
  const lineGradId = `hero-line-grad-${useId().replace(/:/g, '')}`;

  const onParallax = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = iconsLayerRef.current;
    const wrap = parallaxRootRef.current;
    if (!el || !wrap) return;
    const r = wrap.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 40;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 30;
    el.style.transform = `translate3d(${nx}px,${ny}px,0)`;
  }, []);

  useEffect(() => {
    const loops: JSAnimation[] = [];
    const b1 = blobARef.current;
    const b2 = blobBRef.current;
    const ft = floatTopRef.current;
    const fb = floatBottomRef.current;
    const icon = ctaIconRef.current;

    if (b1) {
      loops.push(
        animate(b1, {
          scale: [1, 1.12, 1],
          x: [0, 42, 0],
          y: [0, -38, 0],
          duration: 15000,
          loop: true,
          ease: 'linear',
        }),
      );
    }
    if (b2) {
      loops.push(
        animate(b2, {
          scale: [1.2, 1, 1.2],
          x: [0, -55, 0],
          y: [0, 48, 0],
          duration: 20000,
          loop: true,
          ease: 'linear',
        }),
      );
    }
    if (ft) {
      loops.push(
        animate(ft, {
          y: [0, -12, 0],
          scale: [1, 1.02, 1],
          duration: 5000,
          loop: true,
          ease: 'inOutSine',
        }),
      );
    }
    if (fb) {
      loops.push(
        animate(fb, {
          y: [0, 12, 0],
          scale: [1, 1.015, 1],
          duration: 6000,
          loop: true,
          ease: 'inOutSine',
          delay: 400,
        }),
      );
    }
    if (icon) {
      loops.push(
        animate(icon, {
          x: [0, 5, 0],
          duration: 1500,
          loop: true,
          ease: 'inOutSine',
        }),
      );
    }

    const orbit = orbitRingRef.current;
    if (orbit) {
      loops.push(
        animate(orbit, {
          rotate: [0, 360],
          duration: 42000,
          loop: true,
          ease: 'linear',
        }),
      );
    }

    return () => {
      for (const a of loops) {
        try {
          a.revert();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  useEffect(() => {
    const el = kickerScrambleRef.current;
    if (!el) return;
    el.textContent = '';
    const scr = animate(el, {
      textContent: scrambleText({
        text: brand.title,
        override: '',
        chars: 'A-Za-z ',
        duration: 1280,
        ease: 'out(3)',
        seed: 11,
      }),
    });
    return () => {
      try {
        scr.revert();
      } catch {
        /* ignore */
      }
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const anims: JSAnimation[] = [];
    let cancelled = false;

    const runAfterLetters = () => {
      if (cancelled) return;
      const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
      const intro = animate(lines, {
        opacity: [0, 1],
        y: ['1.35rem', 0],
        delay: stagger(48, {start: 50}),
        duration: 820,
        ease: 'outExpo',
      });
      anims.push(intro);

      intro.then(() => {
        if (cancelled) return;
        const panel = root.querySelector<HTMLElement>('[data-hero-panel]');
        if (!panel) return;
        const deck = animate(panel, {
          opacity: [0, 1],
          scale: [0.9, 1],
          y: ['1.75rem', 0],
          rotate: ['2.5deg', '0deg'],
          duration: 1000,
          ease: 'out(3)',
        });
        anims.push(deck);

        deck.then(() => {
          if (cancelled) return;
          const chips = root.querySelectorAll<HTMLElement>('[data-hero-chip]');
          const monogram = root.querySelector<HTMLElement>('[data-hero-ff]');
          if (chips.length) {
            const chipAnim = animate(chips, {
              opacity: [0, 1],
              scale: [0.82, 1],
              delay: stagger(75, {start: 0}),
              duration: 520,
              ease: 'outBack',
            });
            anims.push(chipAnim);
          }
          if (monogram) {
            const monoAnim = animate(monogram, {
              scale: [0.88, 1],
              duration: 780,
              ease: 'outElastic(1, .6)',
            });
            anims.push(monoAnim);
          }

          const shimmer = root.querySelector<HTMLElement>('[data-hero-shimmer]');
          if (shimmer) {
            const loop = animate(shimmer, {
              translateX: ['-120%', '220%'],
              duration: 3200,
              loop: true,
              ease: 'inOutQuad',
            });
            anims.push(loop);
          }
        });
      });
    };

    const letters = root.querySelectorAll<HTMLElement>('[data-hero-letter]');
    if (letters.length) {
      const letterAnim = animate(letters, {
        opacity: [0, 1],
        y: ['0.55em', 0],
        delay: stagger(26, {start: 60}),
        duration: 640,
        ease: 'out(3)',
      });
      anims.push(letterAnim);
      letterAnim.then(() => {
        if (cancelled) return;
        const path = headlineUnderlineRef.current;
        if (path) {
          const drawable = createDrawable(path)[0];
          if (drawable) {
            const stroke = animate(drawable, {
              draw: ['0 0', '0 1'],
              duration: 1680,
              ease: 'inOut(3)',
            });
            anims.push(stroke);
          }
        }
        runAfterLetters();
      });
    } else {
      runAfterLetters();
    }

    return () => {
      cancelled = true;
      for (const a of anims) {
        try {
          a.revert();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[min(90vh,920px)] w-full flex-col overflow-hidden bg-surface-bright px-0"
    >
      <div
        ref={blobARef}
        aria-hidden
        className="absolute top-[12%] left-[8%] w-[min(420px,70vw)] h-[min(420px,70vw)] md:w-[520px] md:h-[520px] rounded-full bg-tertiary-container/25 blur-[90px] md:blur-[110px] pointer-events-none -z-10 will-change-transform"
      />
      <div
        ref={blobBRef}
        aria-hidden
        className="absolute bottom-[8%] right-[5%] w-[min(480px,75vw)] h-[min(480px,75vw)] md:w-[600px] md:h-[600px] rounded-full bg-primary-container/30 blur-[100px] md:blur-[130px] pointer-events-none -z-10 will-change-transform"
      />

      <div
        ref={parallaxRootRef}
        onMouseMove={onParallax}
        className="relative z-10 flex min-h-[min(90vh,920px)] w-full flex-1 flex-col border-y border-on-surface/5 bg-[#FFFCF0] pt-28 pb-16 shadow-sm"
      >
        <div
          ref={iconsLayerRef}
          data-hero-float-icons
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.2] will-change-transform"
        >
          <Zap className="absolute top-[14%] left-[6%] w-9 h-9 text-primary" />
          <Video className="absolute bottom-[22%] left-[10%] w-11 h-11 text-tertiary" />
          <Paintbrush className="absolute top-[20%] right-[8%] w-10 h-10 text-primary" />
          <Briefcase className="absolute bottom-[14%] right-[10%] w-12 h-12 text-tertiary" />
          <Shield className="absolute top-[8%] left-[44%] w-7 h-7 text-primary" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="sr-only">{brand.title}</span>
              <span
                ref={kickerScrambleRef}
                aria-hidden
                className="inline-block min-h-[1.2em] text-[11px] font-bold uppercase tracking-[0.35em] text-[#006D77] will-change-transform tabular-nums"
              />
              <div className="relative mx-auto max-w-[min(100%,28rem)] lg:mx-0">
                <HeadlineLetters text={brand.name} />
                <svg
                  aria-hidden
                  className="pointer-events-none -mt-1 h-9 w-full text-[#006D77] sm:h-10 lg:-mt-0.5"
                  viewBox="0 0 520 36"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                      <stop offset="22%" stopColor="currentColor" stopOpacity="0.55" />
                      <stop offset="78%" stopColor="currentColor" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    ref={headlineUnderlineRef}
                    fill="none"
                    stroke={`url(#${lineGradId})`}
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    d="M 12 10 C 140 34 380 4 508 14"
                  />
                </svg>
              </div>
              <p className="mt-6 text-lg md:text-xl text-on-surface leading-relaxed max-w-xl mx-auto lg:mx-0">
                {brand.tagline.split(/\s+/).map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    data-hero-line
                    className="inline-block will-change-transform mr-[0.3em] last:mr-0"
                  >
                    {word}
                  </span>
                ))}
              </p>
              <div
                data-hero-line
                className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start will-change-transform"
              >
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center gap-2 bg-[#006D77] text-white px-10 py-4 rounded-xl font-semibold hover:opacity-90 hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  Browse work samples
                  <span ref={ctaIconRef} className="inline-flex will-change-transform">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <a
                  href="#about"
                  className="inline-flex justify-center border border-[#006D77]/35 text-[#0a4d52] px-10 py-4 rounded-xl font-semibold bg-white/80 hover:bg-white transition-all active:scale-[0.98]"
                >
                  Meet Fatima
                </a>
                <Link
                  to={contact.homeHash}
                  className="inline-flex justify-center border border-[#006D77]/35 text-[#0a4d52] px-10 py-4 rounded-xl font-semibold bg-white/80 hover:bg-white transition-all active:scale-[0.98]"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex w-full flex-col items-center lg:items-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-tr from-[#006D77]/25 to-tertiary/20 blur-xl opacity-80" />
                <div
                  ref={orbitRingRef}
                  aria-hidden
                  className="pointer-events-none absolute -inset-[11px] rounded-[1.65rem] sm:-inset-[13px]"
                >
                  {[0, 72, 144, 216, 288].map((deg) => (
                    <span
                      key={deg}
                      className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#006D77]/75 shadow-[0_0_10px_rgba(0,109,119,0.45)]"
                      style={{
                        marginLeft: '-3px',
                        marginTop: '-3px',
                        transform: `rotate(${deg}deg) translateY(calc(-1 * min(42vw, 10.5rem)))`,
                      }}
                    />
                  ))}
                </div>
                <div
                  data-hero-panel
                  className="relative aspect-[4/5] sm:aspect-[3/4] rounded-[1.5rem] border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-[#006D77] via-[#0d5f59] to-tertiary flex flex-col justify-between p-6 sm:p-8 text-white will-change-transform"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative z-10 flex flex-wrap gap-2 justify-center sm:justify-end">
                    <span
                      data-hero-chip
                      className="text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 will-change-transform"
                    >
                      Admin &amp; EA
                    </span>
                    <span
                      data-hero-chip
                      className="text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 will-change-transform"
                    >
                      Ops &amp; CX
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-6">
                    <p
                      data-hero-ff
                      className="font-serif text-7xl sm:text-8xl lg:text-[5.25rem] font-bold tracking-tight text-white drop-shadow-md select-none leading-none will-change-transform"
                    >
                      FF
                    </p>
                    <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85 max-w-[14rem] leading-relaxed">
                      {brand.title}
                    </p>
                  </div>
                  <div className="relative z-10 space-y-2">
                    <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                      <div
                        data-hero-shimmer
                        className="h-full w-2/5 rounded-full bg-white/70 will-change-transform"
                      />
                    </div>
                    <p className="text-center text-[10px] uppercase tracking-widest text-white/55">
                      Systems · clarity · follow-through
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-7 sm:flex-row sm:gap-4">
                <div
                  ref={floatTopRef}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md will-change-transform"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tertiary-container">
                    <Zap className="h-5 w-5 text-tertiary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-tertiary">Operations</p>
                    <p className="text-xs font-semibold leading-snug text-on-surface">Calm, documented handoffs</p>
                  </div>
                </div>

                <div
                  ref={floatBottomRef}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md will-change-transform"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-container">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-primary">Trust</p>
                    <p className="text-xs font-semibold leading-snug text-on-surface">Corporate-grade follow-through</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
