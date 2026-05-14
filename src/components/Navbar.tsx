import {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {animate, stagger} from 'animejs';
import type {JSAnimation} from 'animejs';
import {Menu, X} from 'lucide-react';
import {brand} from '../data/siteContent';

type NavItem = {name: string; to: string};

const navItems: NavItem[] = [
  {name: 'Work', to: '/work'},
  {name: 'About', to: '/#about'},
  {name: 'Experience', to: '/#experience'},
  {name: 'Portfolio', to: '/#portfolio'},
  {name: 'Approach', to: '/#approach'},
  {name: 'Testimonials', to: '/#testimonials'},
  {name: 'Services', to: '/#services'},
  {name: 'Contact', to: '/#contact'},
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [renderMobilePanel, setRenderMobilePanel] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) setRenderMobilePanel(true);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const el = mobilePanelRef.current;
    if (!el) return;
    let panelAnim: JSAnimation | null = null;
    let linkAnim: JSAnimation | null = null;
    if (isMobileMenuOpen) {
      panelAnim = animate(el, {
        opacity: [0, 1],
        y: ['-0.65rem', 0],
        duration: 280,
        ease: 'outExpo',
      });
      const links = el.querySelectorAll<HTMLElement>('[data-nav-mobile-item]');
      if (links.length) {
        linkAnim = animate(links, {
          opacity: [0, 1],
          y: ['0.35rem', 0],
          duration: 320,
          ease: 'outExpo',
          delay: stagger(32, {start: 60}),
        });
      }
    } else if (renderMobilePanel) {
      panelAnim = animate(el, {
        opacity: [1, 0],
        y: [0, '-0.45rem'],
        duration: 220,
        ease: 'inQuad',
        onComplete: () => setRenderMobilePanel(false),
      });
    }
    return () => {
      panelAnim?.revert();
      linkAnim?.revert();
    };
  }, [isMobileMenuOpen, renderMobilePanel]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const showMobilePanel = isMobileMenuOpen || renderMobilePanel;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/70 backdrop-blur-xl border-b border-on-surface/5 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="flex justify-between items-center px-4 sm:px-8 max-w-7xl mx-auto gap-4">
        <Link
          to="/"
          className="text-lg sm:text-xl font-serif font-bold tracking-tight text-on-surface hover:text-primary transition-colors shrink-0"
        >
          {brand.name}
        </Link>

        <div className="hidden lg:flex flex-wrap justify-end gap-x-5 gap-y-2 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
          <a
            href={brand.email}
            className="bg-primary text-on-primary px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all active:scale-95"
          >
            Email
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-on-surface p-2 shrink-0"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {showMobilePanel && (
        <div
          ref={mobilePanelRef}
          className="absolute top-full left-0 w-full bg-surface border-b border-on-surface/5 lg:hidden max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col p-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                data-nav-mobile-item
                to={item.to}
                className="text-lg font-medium text-on-surface py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              data-nav-mobile-item
              href={brand.email}
              className="bg-primary text-on-primary w-full py-3 rounded-lg font-medium text-center mt-2"
            >
              Email Fatima
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
