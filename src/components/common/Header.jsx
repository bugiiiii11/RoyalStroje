import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

const PHONE_DISPLAY = '0948 555 551';
const PHONE_HREF = 'tel:+421948555551';

const navItems = [
  { label: 'Požičovňa', to: '/', match: (p) => p === '/' },
  { label: 'Služby', to: '/sluzby', match: (p) => p === '/sluzby' || p.startsWith('/sluzby/') },
  { label: 'Blog', to: '/blog', match: (p) => p === '/blog' || p.startsWith('/blog/') },
  { label: 'Kontakt', to: '/kontakt', match: (p) => p === '/kontakt' },
];

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300 ${
        scrolled
          ? 'border-zinc-200 shadow-sm shadow-zinc-900/5'
          : 'border-zinc-200/70'
      }`}
    >
      <div className={`w-full px-4 md:px-8 lg:px-12 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center shrink-0 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/logoroyal-dark.webp"
              alt="Royal Stroje"
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-9 lg:h-10' : 'h-11 lg:h-12'}`}
              width={2048}
              height={419}
            />
          </Link>

          {/* Right cluster: nav + phone + CTA */}
          <div className="flex items-center gap-6 lg:gap-8">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = item.match(location.pathname);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative px-3 lg:px-4 py-2 font-bold text-sm lg:text-[0.95rem] uppercase tracking-wide transition-colors duration-200 ${
                      active ? 'text-orange-primary' : 'text-zinc-700 hover:text-orange-primary'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-px left-3 right-3 lg:left-4 lg:right-4 h-[3px] bg-orange-primary rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="w-px h-7 bg-zinc-200" />

            <div className="flex items-center gap-4">
              <a
                href={PHONE_HREF}
                className="hidden lg:flex items-center gap-2 text-zinc-900 font-black text-lg whitespace-nowrap hover:text-orange-primary transition-colors duration-200"
              >
                <Phone size={18} className="text-orange-primary" />
                {PHONE_DISPLAY}
              </a>
              <a href={PHONE_HREF} className="btn-primary whitespace-nowrap">
                <Phone size={16} />
                Zavolať teraz
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
