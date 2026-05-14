import {about, brand} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

export default function AboutSection() {
  const revealRef = useAnimeOnReveal({preset: 'settle', staggerMs: 52});

  return (
    <section
      id="about"
      ref={revealRef}
      className="scroll-mt-28 border-t border-on-surface/5 bg-primary-container/55"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14 lg:items-center">
          <div className="lg:col-span-5 lg:order-2">
            <figure
              data-anime
              className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            >
              <div
                className="overflow-hidden rounded-2xl border border-on-surface/10 bg-surface-container-lowest p-1.5 shadow-[0_20px_50px_-12px_rgba(25,28,28,0.18)] sm:rounded-[1.35rem] sm:p-2"
                style={{aspectRatio: '4 / 5'}}
              >
                <img
                  src="/about/fatima-francisco.png"
                  alt={`${brand.name}, ${brand.title}, at work on a laptop`}
                  className="h-full w-full rounded-[1.1rem] object-cover object-[center_22%] sm:rounded-[1.15rem]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
          </div>

          <div className="lg:col-span-7 lg:order-1">
            <span className="text-[11px] font-bold text-tertiary uppercase tracking-[0.28em]" data-anime>
              {about.headline}
            </span>
            <h2
              data-anime
              className="mt-3 text-3xl font-serif font-semibold leading-tight text-on-surface md:text-5xl md:leading-[1.12]"
            >
              People-first operations
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-on-surface-variant md:mt-8">
              {about.paragraphs.map((p, i) => (
                <p key={i} data-anime>
                  {p}
                </p>
              ))}
            </div>
            <blockquote
              data-anime
              className="mt-10 border-l-4 border-tertiary pl-6 text-lg font-serif italic text-on-surface md:mt-12"
            >
              {about.quote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
