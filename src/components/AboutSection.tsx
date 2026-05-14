import {about} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

export default function AboutSection() {
  const revealRef = useAnimeOnReveal({preset: 'settle', staggerMs: 52});

  return (
    <section id="about" ref={revealRef} className="scroll-mt-28 border-t border-on-surface/5 bg-surface-container-low/30">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <span className="text-[11px] font-bold text-tertiary uppercase tracking-[0.28em]" data-anime>
          {about.headline}
        </span>
        <h2
          data-anime
          className="mt-3 text-3xl md:text-5xl font-serif font-semibold text-on-surface mb-8 leading-tight"
        >
          People-first operations
        </h2>
        <div className="space-y-5 text-lg text-on-surface-variant leading-relaxed">
          {about.paragraphs.map((p, i) => (
            <p key={i} data-anime>
              {p}
            </p>
          ))}
        </div>
        <blockquote
          data-anime
          className="mt-10 border-l-4 border-tertiary pl-6 text-lg font-serif italic text-on-surface"
        >
          {about.quote}
        </blockquote>
      </div>
    </section>
  );
}
