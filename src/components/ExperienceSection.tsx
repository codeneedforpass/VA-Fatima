import {experienceColumns} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

export default function ExperienceSection() {
  const revealRef = useAnimeOnReveal({preset: 'lift', staggerMs: 64});

  return (
    <section id="experience" ref={revealRef} className="scroll-mt-28 bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-bold text-tertiary-fixed uppercase tracking-[0.28em]" data-anime>
            Work experience
          </span>
          <h2
            data-anime
            className="mt-3 text-3xl md:text-5xl font-serif font-semibold text-inverse-on-surface leading-tight"
          >
            Corporate, agency &amp; independent
          </h2>
          <p data-anime className="mt-4 text-lg opacity-85 leading-relaxed">
            Regulated financial operations, BPO quality leadership, and founder-led remote programs — at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {experienceColumns.map((col) => (
            <div
              key={col.id}
              data-anime
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-tertiary-fixed mb-8">{col.label}</h3>
              <div className="space-y-8">
                {col.employers.map((org) => (
                  <div key={org.company}>
                    <p className="font-serif text-lg font-semibold text-inverse-on-surface mb-4">{org.company}</p>
                    <ul className="space-y-3">
                      {org.roles.map((r) => (
                        <li key={r.title + r.range} className="text-sm leading-snug">
                          <span className="block font-medium text-inverse-on-surface/95">{r.title}</span>
                          <span className="text-inverse-on-surface/60">{r.range}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
