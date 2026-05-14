import {useRef} from 'react';
import {Building2, Laptop, ShieldCheck, Sparkles} from 'lucide-react';
import {Link} from 'react-router-dom';
import {impactMetrics, contact, brand} from '../data/siteContent';
import {useAnimeMeter, useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

export default function CommandCenter() {
  const sectionRef = useAnimeOnReveal({preset: 'expoRise', staggerMs: 150});
  const firstCardRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  useAnimeMeter(firstCardRef, meterRef, '100%');

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl" data-anime>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">{impactMetrics.headline}</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">{impactMetrics.sub}</p>
        </div>
        <div className="flex gap-2" data-anime>
          <span className="bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Corporate
          </span>
          <span className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Remote VA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div
          ref={firstCardRef}
          data-anime
          className="md:col-span-8 bento-card p-8 flex flex-col justify-between min-h-[300px] transition-transform duration-300 hover:-translate-y-1"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-tertiary-container rounded-xl">
                <Building2 className="w-8 h-8 text-tertiary" />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Regulated ops
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-medium mb-3">Finance &amp; care operations</h3>
            <p className="text-on-surface-variant max-w-lg leading-relaxed">
              Years at <strong className="text-on-surface">JPMorgan Chase &amp; Co.</strong> in merchant disputes, fraud
              recovery, and client operations — plus BPO leadership at <strong className="text-on-surface">Alorica</strong>{' '}
              as a quality coach. That backbone shows up in how I document, escalate, and protect your brand.
            </p>
          </div>
          <div className="mt-10">
            <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div ref={meterRef} className="h-full bg-tertiary rounded-full w-0" />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-tertiary">
              <span>Depth of tenure</span>
              <span>{impactMetrics.corporateYears} yrs corporate</span>
            </div>
          </div>
        </div>

        <div
          data-anime
          className="md:col-span-4 bg-primary-container p-8 rounded-2xl border border-on-surface/5 flex flex-col items-center justify-center text-center group transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="p-4 bg-white rounded-full mb-6 group-hover:scale-110 transition-transform shadow-sm">
            <Laptop className="w-10 h-10 text-primary" />
          </div>
          <div className="text-5xl font-serif font-bold text-on-primary-container mb-2">{impactMetrics.remoteYears}</div>
          <p className="font-semibold text-on-primary-container">Years remote-first</p>
          <p className="text-sm mt-4 text-on-primary-container/75 leading-relaxed px-2">
            Agency VA work through Awesome Outsourcing, then independent contracts across real estate, SaaS-style ops,
            and education support.
          </p>
          <Link
            to="/work#ea"
            className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline underline-offset-4"
          >
            See sample deliverables
          </Link>
        </div>

        <div
          data-anime
          className="md:col-span-4 bento-card p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="p-3 bg-primary-container inline-block rounded-xl mb-8 self-start">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-serif font-medium mb-2">Fatima &amp; Friends</div>
            <p className="text-on-surface-variant leading-relaxed">
              Launched in 2023 to help VA parents build sustainable remote careers while keeping small businesses running
              smoothly.
            </p>
          </div>
        </div>

        <div
          data-anime
          className="md:col-span-8 bg-inverse-surface p-8 rounded-2xl text-inverse-on-surface relative overflow-hidden flex flex-col justify-center transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-serif font-medium mb-4">What you get day-to-day</h3>
            <p className="text-lg opacity-85 mb-8 max-w-xl leading-relaxed">
              Inbox and calendar control, social upkeep, light audio/video, structured SOPs, and calm customer comms —
              all organized in your{' '}
              <Link to="/work" className="font-semibold text-tertiary-fixed underline-offset-4 hover:underline">
                work hub
              </Link>
              .               When you are ready to talk scope, use{' '}
              <Link to={contact.homeHash} className="font-semibold text-tertiary-fixed underline-offset-4 hover:underline">
                Contact
              </Link>{' '}
              or{' '}
              <a href={brand.email} className="font-semibold text-tertiary-fixed underline-offset-4 hover:underline">
                email directly
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-tertiary-fixed shrink-0" />
                <span className="text-sm font-medium">Quality &amp; follow-through</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-tertiary-fixed shrink-0" />
                <span className="text-sm font-medium">Train-the-next-VA mindset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
