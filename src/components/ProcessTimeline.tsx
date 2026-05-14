import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {animate, stagger} from 'animejs';
import type {JSAnimation} from 'animejs';
import {approach, brand, contact} from '../data/siteContent';

/**
 * Precision process: stats + steps (Anime), SVG path draw driven by scroll + pointer position.
 */
export default function ProcessTimeline({sectionId}: {sectionId?: string}) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const statYearsRef = useRef<HTMLSpanElement>(null);
  const statRemoteRef = useRef<HTMLSpanElement>(null);
  const statReliabilityRef = useRef<HTMLSpanElement>(null);
  const mouseXRef = useRef(0.5);

  useEffect(() => {
    const animations: JSAnimation[] = [];

    const stats = {corporate: 0, remote: 0, reliability: 0};
    animations.push(
      animate(stats, {
        corporate: 12,
        remote: 5,
        reliability: 100,
        duration: 2800,
        ease: 'outExpo',
        onUpdate: () => {
          const y = statYearsRef.current;
          const r = statRemoteRef.current;
          const e = statReliabilityRef.current;
          if (y) y.textContent = `${Math.round(stats.corporate)}+`;
          if (r) r.textContent = `${Math.round(stats.remote)}+`;
          if (e) e.textContent = `${Math.round(stats.reliability)}%`;
        },
      }),
    );

    const root = wrapRef.current;
    if (root) {
      const steps = root.querySelectorAll<HTMLElement>('[data-timeline-step]');
      if (steps.length) {
        animations.push(
          animate(steps, {
            translateX: [-48, 0],
            opacity: [0, 1],
            delay: stagger(200, {start: 120}),
            duration: 1000,
            ease: 'outElastic(1, .8)',
          }),
        );
      }
    }

    return () => {
      for (const a of animations) {
        try {
          a.revert();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const applyDraw = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const mid = (r.top + r.bottom) / 2;
      const scrollP = 1 - Math.min(1, Math.max(0, (mid - vh * 0.12) / (vh * 0.88)));
      const mx = mouseXRef.current;
      const p = Math.min(1, Math.max(0, scrollP * 0.65 + mx * 0.35));
      path.style.strokeDashoffset = `${len * (1 - p)}`;
    };

    const onMouse = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        mouseXRef.current = (e.clientX - r.left) / Math.max(r.width, 1);
      }
    };

    const onScroll = () => applyDraw();
    applyDraw();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    window.addEventListener('mousemove', onMouse);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  const steps = approach.pillars.map((p) => ({title: p.label, desc: p.body}));

  return (
    <section
      id={sectionId}
      ref={wrapRef}
      className={`py-20 md:py-24 bg-surface-variant/55 px-6 overflow-hidden border-y border-on-surface/5${sectionId ? ' scroll-mt-28' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-bold text-tertiary uppercase tracking-[0.3em] mb-4 block">
            How work flows
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-on-surface">Precision process</h2>
          <p className="mt-4 text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">{approach.intro}</p>
        </div>

        <div className="relative mb-20 md:mb-28">
          <svg
            className="absolute top-1/2 left-0 w-full h-12 -translate-y-1/2 hidden md:block opacity-35 pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M0,24 Q480,2 960,24 T1920,24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-tertiary/40"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.title}
                data-timeline-step
                className="flex flex-col items-center text-center group opacity-0"
              >
                <div className="w-16 h-16 rounded-3xl bg-surface-container-lowest shadow-xl flex items-center justify-center mb-6 border border-on-surface/8 text-on-surface group-hover:bg-tertiary group-hover:border-tertiary group-hover:text-white transition-all duration-500 scale-100 group-hover:scale-110">
                  <span className="font-serif font-bold text-2xl">{i + 1}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed opacity-90">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12 border-t border-on-surface/5">
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm border border-on-surface/5 flex flex-col items-center">
            <span ref={statYearsRef} className="text-4xl md:text-5xl font-serif font-bold text-tertiary mb-2 tabular-nums">
              0+
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">
              Years corporate discipline
            </span>
          </div>
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm border border-on-surface/5 flex flex-col items-center">
            <span ref={statRemoteRef} className="text-4xl md:text-5xl font-serif font-bold text-tertiary mb-2 tabular-nums">
              0+
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">
              Years remote-first delivery
            </span>
          </div>
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm border border-on-surface/5 flex flex-col items-center">
            <span
              ref={statReliabilityRef}
              className="text-4xl md:text-5xl font-serif font-bold text-tertiary mb-2 tabular-nums"
            >
              0%
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">
              Follow-through you can feel
            </span>
          </div>
        </div>

        <p className="mt-14 text-center text-sm text-on-surface-variant">
          <Link to={contact.homeHash} className="font-semibold text-primary underline-offset-4 hover:underline">
            Contact
          </Link>
          <span className="mx-2 text-on-surface-variant/40" aria-hidden>
            ·
          </span>
          <a href={brand.email} className="font-semibold text-primary underline-offset-4 hover:underline">
            Email
          </a>
        </p>
      </div>
    </section>
  );
}
