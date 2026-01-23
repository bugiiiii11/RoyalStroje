import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Send, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      {/* Bottom border */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${
        scrolled ? 'bg-white/10 opacity-100' : 'opacity-0'
      }`}></div>

      <div className={`max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src="/logoroyal.png"
              alt="Royal Stroje"
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
              }`}
            />
          </Link>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={`relative px-4 py-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive('/')
                    ? 'text-orange-primary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Požičovňa
                {isActive('/') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-primary rounded-full"></span>
                )}
              </Link>
              <Link
                to="/sluzby"
                className={`relative px-4 py-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive('/sluzby') || location.pathname.startsWith('/sluzby/')
                    ? 'text-orange-primary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Služby
                {(isActive('/sluzby') || location.pathname.startsWith('/sluzby/')) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-primary rounded-full"></span>
                )}
              </Link>
              <Link
                to="/kontakt"
                className={`relative px-4 py-2 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive('/kontakt')
                    ? 'text-orange-primary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Kontakt
                {isActive('/kontakt') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-primary rounded-full"></span>
                )}
              </Link>
            </nav>

            {/* Divider */}
            <div className="w-px h-6 bg-white/20"></div>

            {/* Contact Actions */}
            <div className="flex items-center gap-3">
              {/* Social Icons */}
              <a
                href="https://wa.me/421948555551"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-orange-primary hover:border-orange-primary transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="https://t.me/petokrivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-orange-primary hover:border-orange-primary transition-all duration-300"
                aria-label="Telegram"
              >
                <Send size={16} />
              </a>

              {/* Phone CTA */}
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-primary text-white font-bold text-sm rounded-lg hover:bg-orange-hover transition-all duration-300"
              >
                <Phone size={16} />
                <span>0948 555 551</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive('/')
                    ? 'bg-orange-primary/10 text-orange-primary'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                Požičovňa
              </Link>
              <Link
                to="/sluzby"
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive('/sluzby') || location.pathname.startsWith('/sluzby/')
                    ? 'bg-orange-primary/10 text-orange-primary'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                Služby
              </Link>
              <Link
                to="/kontakt"
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive('/kontakt')
                    ? 'bg-orange-primary/10 text-orange-primary'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                Kontakt
              </Link>
            </nav>

            {/* Mobile Contact */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <a
                href="https://wa.me/421948555551"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white/60"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://t.me/petokrivo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white/60"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="tel:+421948555551"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-primary text-white font-bold rounded-lg"
              >
                <Phone size={16} />
                <span>0948 555 551</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
