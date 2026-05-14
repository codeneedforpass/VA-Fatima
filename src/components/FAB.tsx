import {useState, useEffect, useRef} from 'react';
import {animate, stagger} from 'animejs';
import type {JSAnimation} from 'animejs';
import {Facebook, Linkedin, Mail, MessageCircle} from 'lucide-react';
import {brand, contact} from '../data/siteContent';

const fabLinks = [
  {
    label: 'Facebook',
    href: contact.facebook,
    Icon: Facebook,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: contact.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    label: 'Email',
    href: brand.email,
    Icon: Mail,
    external: false,
  },
] as const;

export default function FAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [renderLinks, setRenderLinks] = useState(false);
  const linksWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setRenderLinks(true);
  }, [isOpen]);

  useEffect(() => {
    const el = linksWrapRef.current;
    if (!el) return;
    let a: JSAnimation | null = null;
    if (isOpen) {
      const links = el.querySelectorAll<HTMLElement>('[data-fab-link]');
      a = animate(links, {
        opacity: [0, 1],
        x: ['0.75rem', 0],
        scale: [0.94, 1],
        duration: 400,
        ease: 'outExpo',
        delay: stagger(55, {start: 30}),
      });
    } else if (renderLinks) {
      a = animate(el, {
        opacity: [1, 0],
        y: [0, '0.5rem'],
        scale: [1, 0.96],
        duration: 200,
        ease: 'inQuad',
        onComplete: () => setRenderLinks(false),
      });
    }
    return () => {
      a?.revert();
    };
  }, [isOpen, renderLinks]);

  const showLinks = isOpen || renderLinks;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {showLinks && (
        <div ref={linksWrapRef} className="flex flex-col items-end gap-3 mb-2">
          {fabLinks.map(({label, href, Icon, external}) => (
            <a
              key={label}
              data-fab-link
              href={href}
              {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
              className="bg-surface-container-highest px-6 py-3 rounded-full shadow-xl border border-on-surface/5 text-on-surface text-sm font-semibold flex items-center gap-2 hover:bg-white whitespace-nowrap transition-all hover:-translate-x-0.5"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {label}
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
        className="relative glass-fab w-16 h-16 rounded-full flex items-center justify-center text-primary group hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <MessageCircle
          className={`w-8 h-8 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'opacity-100'}`}
          fill="currentColor"
          fillOpacity={0.1}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
        >
          <div className="w-6 h-0.5 bg-primary absolute" />
          <div className="w-6 h-0.5 bg-primary absolute rotate-90" />
        </div>
      </button>
    </div>
  );
}
