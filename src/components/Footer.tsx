import {Link} from 'react-router-dom';
import {brand} from '../data/siteContent';
import {useAnimeOnReveal} from '../hooks/useAnimeOnReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const revealRef = useAnimeOnReveal({preset: 'drift', staggerMs: 55});

  const socialLinks = [
    {name: 'LinkedIn', href: '#'},
    {name: 'Upwork', href: '#'},
    {name: 'OnlineJobs.ph', href: '#'},
    {name: 'Email', href: brand.email},
  ];

  return (
    <footer
      ref={revealRef}
      id="contact"
      className="w-full py-16 bg-surface-container-low border-t border-on-surface/5"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left" data-anime>
          <div className="text-2xl font-serif font-bold text-primary mb-3">{brand.name}</div>
          <div className="text-sm font-medium text-on-surface-variant opacity-80">{brand.title}</div>
          <div className="text-sm font-medium text-on-surface-variant opacity-60 mt-1">
            © {currentYear} {brand.name}. All rights reserved.
          </div>
          <Link
            to="/work"
            className="mt-4 text-sm font-semibold text-tertiary hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            Work samples hub →
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12" data-anime>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
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
