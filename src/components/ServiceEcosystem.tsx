import {Link} from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Headphones,
  KanbanSquare,
  Palette,
  Shield,
  Video,
} from 'lucide-react';
import {publicAssetUrl} from '../lib/publicAsset';
import {servicesOffered} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

const adminPreview = publicAssetUrl([
  'work',
  'ea-samples',
  '01 Administrative-EA Samples',
  'Coordinating Schedules.JPG',
]);

const cardHover = 'transition-transform duration-300 hover:-translate-y-1';

export default function ServiceEcosystem() {
  const revealRef = useAnimeOnReveal({preset: 'elasticCards', staggerMs: 200});

  return (
    <section ref={revealRef} className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2 data-anime className="text-3xl md:text-4xl font-serif font-semibold mb-4">
          Services offered
        </h2>
        <p data-anime className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Three pillars Fatima leads with — each with proof in the{' '}
          <Link to="/work" className="font-semibold text-tertiary underline-offset-4 hover:underline">
            work hub
          </Link>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          data-anime
          className={`md:col-span-2 bg-primary-container p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-12 items-center ${cardHover}`}
        >
          <div className="flex-1">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-medium mb-4">{servicesOffered[0].title}</h3>
            <p className="text-on-primary-container mb-6 leading-relaxed">
              Core back-office support for owners and lean teams — calendar, inbox, growth support, and property ops.
            </p>
            <ul className="space-y-3">
              {servicesOffered[0].items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-on-primary-container/85 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/work#ea"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Open EA sample gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link to="/work#ea" className="block w-full md:w-1/2" aria-label="View EA samples">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={adminPreview}
                alt="Sample administrative workflow screenshot"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </Link>
        </div>

        <div
          data-anime
          className={`bg-surface-container-low p-10 rounded-3xl flex flex-col border border-on-surface/5 group ${cardHover}`}
        >
          <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-12 transition-transform">
            <Palette className="w-7 h-7 text-tertiary" />
          </div>
          <h3 className="text-2xl font-serif font-medium mb-4">Social &amp; campaign creative</h3>
          <p className="text-on-surface-variant mb-auto leading-relaxed">
            Beyond maintenance: campaign carousels, static suites, and episodic graphics — see your{' '}
            <span className="font-medium text-on-surface">02 Social Media Samples</span> in the hub.
          </p>
          <div className="mt-12 pt-8 border-t border-on-surface/5 flex justify-between items-center">
            <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Carousels &amp; feeds</span>
            <Link
              to="/work#social"
              className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors group/link"
            >
              View gallery
              <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div data-anime className={`bg-surface-container-low p-10 rounded-3xl flex flex-col border border-on-surface/5 ${cardHover}`}>
          <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center mb-8 shadow-sm">
            <Video className="w-7 h-7 text-tertiary" />
          </div>
          <h3 className="text-2xl font-serif font-medium mb-4">{servicesOffered[2].title}</h3>
          <ul className="text-on-surface-variant text-sm space-y-2 mb-4 leading-relaxed">
            {servicesOffered[2].items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="text-xs text-on-surface-variant/80 italic mb-6">{servicesOffered[2].footnote}</p>
          <Link
            to="/work#video"
            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            Watch samples
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          data-anime
          className={`bg-inverse-surface p-10 rounded-3xl flex flex-col text-inverse-on-surface group ${cardHover}`}
        >
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
            <KanbanSquare className="w-7 h-7 text-tertiary-fixed" />
          </div>
          <h3 className="text-2xl font-serif font-medium mb-4">Program management (Asana)</h3>
          <p className="opacity-80 mb-8 leading-relaxed">
            Cross-functional lists, owners, and stage gates — illustrated with a real <strong>BHub</strong> program
            view (story workshop → copy → design → final review).
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['Story workshop', 'Design review', 'Final deck'].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to="/work#pm"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-tertiary-fixed hover:underline underline-offset-4"
          >
            See Asana board capture
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div data-anime className={`bg-surface-container-low p-10 rounded-3xl flex flex-col border border-on-surface/5 ${cardHover}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-primary-container rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center shadow-sm shrink-0 -ml-2 ring-4 ring-surface-container-low">
              <Headphones className="w-6 h-6 text-tertiary" />
            </div>
          </div>
          <h3 className="text-2xl font-serif font-medium mb-4">SOPs, CX &amp; phone support</h3>
          <p className="text-on-surface-variant leading-relaxed mb-4 text-sm">
            <span className="font-semibold text-on-surface">{servicesOffered[1].title}</span>
            {servicesOffered[1].subtitle && (
              <span className="text-on-surface-variant"> ({servicesOffered[1].subtitle})</span>
            )}
          </p>
          <ul className="text-sm text-on-surface-variant space-y-2 mb-6">
            {servicesOffered[1].items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="text-on-surface-variant leading-relaxed mb-6 text-sm">
            Artifacts: TransferWise VA SOP + customer service writing sample — open below.
          </p>
          <div className="mt-auto flex flex-col gap-2 text-sm font-semibold">
            <Link to="/work#sop" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
              Open SOP sample
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/work#support" className="inline-flex items-center gap-1 text-tertiary hover:underline underline-offset-4">
              Open CX writing PDF
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div
          data-anime
          className={`md:col-span-3 bg-tertiary text-on-tertiary p-10 md:p-12 rounded-3xl overflow-hidden group shadow-xl ${cardHover}`}
        >
          <div className="relative z-10 max-w-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-medium mb-4">Prefer proof before a call?</h3>
              <p className="text-lg opacity-90 leading-relaxed md:max-w-xl">
                Everything referenced here lives in one place: PDFs, carousels, videos, and the Asana program capture
                — organized in the work hub so nothing is buried in attachments.
              </p>
            </div>
            <Link
              to="/work"
              className="shrink-0 inline-flex items-center justify-center bg-white text-tertiary px-8 py-4 rounded-xl font-bold hover:bg-tertiary-fixed transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              Browse the work hub
            </Link>
          </div>
          <div className="absolute -right-16 -bottom-16 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000 ease-in-out pointer-events-none">
            <div className="eco-float-icon">
              <ArrowRight className="w-[280px] h-[280px] -rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
