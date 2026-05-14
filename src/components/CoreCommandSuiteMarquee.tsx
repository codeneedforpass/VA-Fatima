import {useEffect, useMemo, useRef} from 'react';
import {Link} from 'react-router-dom';
import {animate, stagger} from 'animejs';
import {publicAssetUrl} from '../lib/publicAsset';
import {getMarqueeWorkStrip} from '../data/workSamples';

type StripItem = {id: string; title: string; src: string; href: string};

function buildStripItems(): StripItem[] {
  return getMarqueeWorkStrip().map((w, i) => ({
    id: `work-${w.title}-${i}`,
    title: w.title,
    src: publicAssetUrl(w.parts),
    href: `/work${w.workHash}`,
  }));
}

function MarqueeStrip({items, stripKey}: {items: StripItem[]; stripKey: 'a' | 'b'}) {
  const mountReveal = stripKey === 'a';
  return (
    <div className="flex gap-4" aria-hidden={stripKey === 'b'}>
      {items.map((item) => (
        <Link
          key={`${stripKey}-${item.id}`}
          {...(mountReveal ? {'data-marquee-item': ''} : {})}
          to={item.href}
          className="group relative flex shrink-0 overflow-hidden rounded-2xl border border-on-surface/10 shadow-md ring-2 ring-transparent transition-all hover:ring-primary/40"
        >
          <img
            src={item.src}
            alt=""
            className="h-14 w-[4.5rem] object-cover transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-24"
            loading="lazy"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-1 py-1 text-[8px] font-bold uppercase tracking-wider text-white line-clamp-2 opacity-0 transition-opacity group-hover:opacity-100">
            Work hub
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function CoreCommandSuiteMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const items = useMemo(() => buildStripItems(), []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('[data-marquee-item]');
    if (!els.length) return;
    const a = animate(els, {
      opacity: [0, 1],
      y: ['0.55rem', 0],
      scale: [0.94, 1],
      delay: stagger(22, {start: 100}),
      duration: 520,
      ease: 'out(3)',
    });
    return () => {
      a.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="command-suite"
      className="relative z-10 border-y border-on-surface/8 bg-surface-container-low/70 py-8 backdrop-blur-md"
    >
      <div className="mx-auto mb-5 max-w-7xl px-6 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-tertiary">Core command suite</span>
        <p className="mt-2 text-sm text-on-surface-variant">
          Live frames from the{' '}
          <Link to="/work" className="font-semibold text-primary underline-offset-4 hover:underline">
            work hub
          </Link>
          — click any tile to open its gallery.
        </p>
      </div>

      <div className="relative overflow-hidden mask-linear-fade">
        <div className="marquee-scroll flex w-max gap-4 pr-4 will-change-transform">
          <MarqueeStrip items={items} stripKey="a" />
          <MarqueeStrip items={items} stripKey="b" />
        </div>
      </div>

      <style>{`
        .mask-linear-fade {
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </section>
  );
}
