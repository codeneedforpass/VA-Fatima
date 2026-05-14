import {Link} from 'react-router-dom';
import {testimonials, brand, contact} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

export default function TestimonialsSection() {
  const revealRef = useAnimeOnReveal({preset: 'settle', staggerMs: 62});

  return (
    <section
      id="testimonials"
      ref={revealRef}
      className="scroll-mt-28 border-t border-on-surface/5 bg-secondary-fixed/35"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] font-bold text-tertiary uppercase tracking-[0.28em]" data-anime>
            Testimonials
          </span>
          <h2 data-anime className="mt-3 text-3xl md:text-5xl font-serif font-semibold text-on-surface leading-tight">
            What clients say
          </h2>
          <p data-anime className="mt-4 text-lg text-on-surface-variant leading-relaxed">
            Words shared by people who have worked alongside Fatima — formatted for the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <article key={t.name} data-anime className="bento-card flex flex-col p-8 h-full border-tertiary/15">
              <p className="font-serif text-lg text-on-surface leading-relaxed mb-8 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <footer className="pt-6 border-t border-on-surface/8">
                <p className="font-semibold text-on-surface">{t.name}</p>
                {t.title && (
                  <p className="text-sm text-tertiary font-medium mt-1 underline decoration-tertiary/40 underline-offset-4">
                    {t.title}
                  </p>
                )}
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center" data-anime>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-6">
            Interested in working together? Reach the contact block for social links, or send a message directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={contact.homeHash}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Contact
            </Link>
            <a
              href={brand.email}
              className="inline-flex items-center justify-center rounded-xl border-2 border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 active:scale-[0.98]"
            >
              Email Fatima
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
