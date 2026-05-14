import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAnimeOnMount, useAnimeOnReveal} from '../hooks/useAnimeOnReveal';
import {
  FileText,
  ExternalLink,
  Layers,
  Clapperboard,
  KanbanSquare,
  Headphones,
  BookOpen,
  Video,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAB from '../components/FAB';
import MediaLightbox from '../components/MediaLightbox';
import {publicAssetUrl} from '../lib/publicAsset';
import {
  customerServicePdf,
  eaSamples,
  projectManagementShot,
  socialSamples,
  sopTransferwisePdf,
  videoSamples,
  workNav,
  type WorkImage,
  type WorkVideo,
} from '../data/workSamples';

function VideoSampleCard({item}: {item: WorkVideo}) {
  const src = publicAssetUrl(item.parts);
  const isMov = item.kind === 'mov';

  return (
    <article className="bento-card flex h-full flex-col p-6" data-anime>
      <header className="mb-4 shrink-0">
        <h3 className="min-h-[3.5rem] text-lg font-serif font-medium leading-snug text-on-surface line-clamp-2">
          {item.title}
        </h3>
        <span className="mt-2 inline-flex rounded-full border border-on-surface/10 bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary-container">
          {item.kind}
        </span>
      </header>

      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-on-surface/10 bg-black shadow-inner">
        <video
          key={src}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
          src={src}
        />
      </div>

      <div className="mt-3 flex min-h-[3.75rem] shrink-0 items-start text-[11px] leading-relaxed text-on-surface-variant">
        {isMov ? (
          <p>
            MOV preview depends on your browser. Use <span className="font-semibold text-on-surface">Download</span>{' '}
            below for a guaranteed playback file.
          </p>
        ) : (
          <p className="text-on-surface-variant/70">Plays inline in most modern browsers.</p>
        )}
      </div>

      <footer className="mt-auto shrink-0 border-t border-on-surface/10 pt-4">
        <a
          href={src}
          download
          className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary transition-colors hover:text-primary"
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          Download file
        </a>
      </footer>
    </article>
  );
}

function ImageMosaic({
  items,
  onOpen,
}: {
  items: WorkImage[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => {
        const src = publicAssetUrl(item.parts);
        return (
          <button
            key={item.title + i}
            type="button"
            onClick={() => onOpen(i)}
            className="group text-left rounded-2xl overflow-hidden border border-on-surface/5 bg-surface-container-lowest shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="aspect-[4/5] bg-surface-container overflow-hidden">
              <img
                src={src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-on-surface line-clamp-2 leading-snug">{item.title}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function WorkSamplesPage() {
  const heroMountRef = useAnimeOnMount<HTMLDivElement>(68);
  const eaRef = useAnimeOnReveal({preset: 'lift', staggerMs: 50});
  const socialRef = useAnimeOnReveal({preset: 'lift', staggerMs: 50});
  const videoRef = useAnimeOnReveal({preset: 'lift', staggerMs: 55});
  const pmRef = useAnimeOnReveal({preset: 'lift', staggerMs: 52});
  const sopRef = useAnimeOnReveal({preset: 'settle', staggerMs: 60});
  const supportRef = useAnimeOnReveal({preset: 'settle', staggerMs: 60});

  const [lightbox, setLightbox] = useState<{
    items: WorkImage[];
    index: number;
  } | null>(null);

  const urls = useMemo(() => (lightbox ? lightbox.items.map((x) => publicAssetUrl(x.parts)) : []), [lightbox]);
  const titles = useMemo(() => (lightbox ? lightbox.items.map((x) => x.title) : []), [lightbox]);

  const openAt = (items: WorkImage[], index: number) => setLightbox({items, index});
  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((lb) => {
      if (!lb) return lb;
      const n = lb.items.length;
      return {...lb, index: (lb.index - 1 + n) % n};
    });
  const next = () =>
    setLightbox((lb) => {
      if (!lb) return lb;
      const n = lb.items.length;
      return {...lb, index: (lb.index + 1) % n};
    });

  const activeTitle = lightbox ? titles[lightbox.index] ?? '' : '';

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <MediaLightbox
        open={!!lightbox}
        urls={urls}
        index={lightbox?.index ?? 0}
        title={activeTitle}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />

      <main>
        <section className="pt-28 pb-16 px-6 border-b border-on-surface/5 bg-surface-container-low/40">
          <div ref={heroMountRef} className="max-w-5xl mx-auto text-center">
            <span
              data-anime-mount
              className="text-[11px] font-bold text-tertiary uppercase tracking-[0.28em] inline-block mb-4"
            >
              Work samples
            </span>
            <h1
              data-anime-mount
              className="text-4xl md:text-6xl font-serif font-semibold text-on-surface mb-6 leading-tight"
            >
              Evidence-led portfolio hub
            </h1>
            <p
              data-anime-mount
              className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10"
            >
              A dedicated surface for deliverables that live outside a typical marketing site: administrative work,
              social assets, light editing, PM workflows, SOPs, and customer experience writing.
            </p>
            <div data-anime-mount className="flex flex-wrap justify-center gap-2">
              {workNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-lowest border border-on-surface/10 text-on-surface-variant hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div data-anime-mount className="mt-10">
              <Link
                to="/#portfolio"
                className="text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                ← Back to main site
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
          <section ref={eaRef} id="ea" className="scroll-mt-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl" data-anime>
                <div className="flex items-center gap-3 text-primary mb-3">
                  <Layers className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">01 Administrative / EA</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-on-surface mb-3">
                  Executive &amp; administrative samples
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Screenshots from real workflows: inbox and follow-ups, scheduling, list building, and structured VA
                  onboarding.
                </p>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest" data-anime>
                {eaSamples.length} items
              </span>
            </div>
            <div data-anime>
              <ImageMosaic items={eaSamples} onOpen={(i) => openAt(eaSamples, i)} />
            </div>
          </section>

          <section ref={socialRef} id="social" className="scroll-mt-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl" data-anime>
                <div className="flex items-center gap-3 text-primary mb-3">
                  <Clapperboard className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">02 Social media</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-on-surface mb-3">
                  Carousels, campaigns, and episodic graphics
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Mixed formats including multi-slide carousels, static post suites, and show-style episode creatives.
                </p>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest" data-anime>
                {socialSamples.length} items
              </span>
            </div>
            <div data-anime>
              <ImageMosaic items={socialSamples} onOpen={(i) => openAt(socialSamples, i)} />
            </div>
          </section>

          <section ref={videoRef} id="video" className="scroll-mt-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl" data-anime>
                <div className="flex items-center gap-3 text-primary mb-3">
                  <Video className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">03 Light audio / video</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-on-surface mb-3">
                  Short-form edits &amp; captioned cuts
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Each tile uses the same layout: title, format, 16:9 player (letterboxed when needed), a short note,
                  then download.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {videoSamples.map((v) => (
                <VideoSampleCard key={v.title} item={v} />
              ))}
            </div>
          </section>

          <section ref={pmRef} id="pm" className="scroll-mt-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl" data-anime>
                <div className="flex items-center gap-3 text-primary mb-3">
                  <KanbanSquare className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">04 Project management</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-on-surface mb-3">
                  Asana program view — BHub production
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  List view showing cross-functional stages from story workshop through final deck review, with owners
                  and due-date hygiene typical of founder-led creative ops.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bento-card overflow-hidden" data-anime>
                <img
                  src={projectManagementShot}
                  alt="Asana list view for the BHub project showing sections and tasks"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-5 space-y-4" data-anime>
                {[
                  {
                    title: 'Story workshop',
                    body: 'Canva deck intake, founder calls, final draft routing to senior reviewer, and Notion documentation.',
                  },
                  {
                    title: 'Copy editing',
                    body: 'Dedicated pass for the copy editor before design lock.',
                  },
                  {
                    title: 'Design',
                    body: 'Joint review of deck with design and story stakeholders.',
                  },
                  {
                    title: 'Final deck review',
                    body: 'Leadership + VC review, offboarding call, and payment milestones for distributed teammates.',
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-on-surface/5 bg-surface-container-low p-5 shadow-sm"
                  >
                    <h3 className="font-serif text-lg text-on-surface mb-2">{card.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section ref={sopRef} id="sop" className="scroll-mt-28 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bento-card p-8 flex flex-col h-full" data-anime>
                <div className="flex items-center gap-3 text-primary mb-4">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">05 SOP sample</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-on-surface mb-3">
                  TransferWise setup for a VA
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-1">
                  Step-by-step operational SOP you can hand to finance or HR partners — formatted for clarity and repeat
                  execution.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={sopTransferwisePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <FileText className="w-4 h-4" />
                    Open PDF
                  </a>
                  <a
                    href={sopTransferwisePdf}
                    download
                    className="inline-flex items-center gap-2 border border-outline-variant px-5 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
              <div
                className="rounded-2xl border border-on-surface/5 overflow-hidden bg-surface-container-lowest min-h-[420px] lg:min-h-[520px]"
                data-anime
              >
                <iframe title="SOP PDF preview" className="w-full h-[60vh] lg:h-full min-h-[420px]" src={sopTransferwisePdf} />
              </div>
            </div>
          </section>

          <section ref={supportRef} id="support" className="scroll-mt-28 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bento-card p-8 flex flex-col h-full" data-anime>
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Headphones className="w-5 h-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">06 Customer service</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-on-surface mb-3">
                  CX writing sample
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8 flex-1">
                  PDF artifact demonstrating tone, policy translation, and customer-safe language under pressure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={customerServicePdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-tertiary text-on-tertiary px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <FileText className="w-4 h-4" />
                    Open PDF
                  </a>
                  <a
                    href={customerServicePdf}
                    download
                    className="inline-flex items-center gap-2 border border-outline-variant px-5 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
              <div
                className="rounded-2xl border border-on-surface/5 overflow-hidden bg-surface-container-lowest min-h-[420px] lg:min-h-[520px]"
                data-anime
              >
                <iframe
                  title="Customer service PDF preview"
                  className="w-full h-[60vh] lg:h-full min-h-[420px]"
                  src={customerServicePdf}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <FAB />
    </div>
  );
}
