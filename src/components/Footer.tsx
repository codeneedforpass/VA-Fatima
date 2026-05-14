import {Link} from 'react-router-dom';
import {brand, contact} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';
import SiteLogo from './SiteLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const revealRef = useAnimeOnReveal({preset: 'drift', staggerMs: 55});

  const socialLinks = [
    {name: 'LinkedIn', href: contact.linkedin, external: true},
    {name: 'Facebook', href: contact.facebook, external: true},
    {name: 'OnlineJobs.ph', href: contact.onlineJobs, external: true},
    {name: 'Email', href: brand.email, external: false},
  ] as const;

  return (
    <footer
      ref={revealRef}
      id="contact"
      className="w-full py-16 bg-surface-container-low border-t border-on-surface/5"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left" data-anime>
          <Link
            to="/"
            className="mb-3 flex items-center justify-center gap-3 md:justify-start text-primary transition-opacity hover:opacity-90"
          >
            <SiteLogo className="h-11 w-11 ring-1 ring-on-surface/10 shadow-sm" />
            <span className="text-2xl font-serif font-bold">{brand.name}</span>
          </Link>
          <div className="text-sm font-medium text-on-surface-variant opacity-80">{brand.title}</div>
          <div className="text-sm font-medium text-on-surface-variant opacity-60 mt-1">
            © {currentYear} {brand.name}. All rights reserved.
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
            <Link
              to="/work"
              className="text-sm font-semibold text-tertiary hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Work samples hub →
            </Link>
            <Link
              to={contact.homeHash}
              className="text-sm font-semibold text-tertiary hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Contact
            </Link>
            <a
              href={brand.email}
              className="text-sm font-semibold text-tertiary hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Email
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12" data-anime>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              {...(link.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
