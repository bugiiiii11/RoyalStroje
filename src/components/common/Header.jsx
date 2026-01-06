import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl shadow-2xl shadow-black/50'
          : 'bg-black/95'
      }`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-orange-primary to-transparent transition-all duration-500 ${scrolled ? 'h-0.5' : 'h-1'}`}></div>

      {/* Bottom border with geometric accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500 bg-gradient-to-r from-transparent via-orange-primary to-transparent ${scrolled ? 'w-1/2' : 'w-1/3'}`}></div>

      {/* Corner accents - hide when scrolled */}
      <div className={`absolute top-0 left-0 w-20 h-full overflow-hidden pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-0 left-0 w-1 h-10 bg-gradient-to-b from-orange-primary to-transparent"></div>
        <div className="absolute top-0 left-0 w-10 h-1 bg-gradient-to-r from-orange-primary to-transparent"></div>
      </div>
      <div className={`absolute top-0 right-0 w-20 h-full overflow-hidden pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-0 right-0 w-1 h-10 bg-gradient-to-b from-orange-primary to-transparent"></div>
        <div className="absolute top-0 right-0 w-10 h-1 bg-gradient-to-l from-orange-primary to-transparent"></div>
      </div>

      <div className={`max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 transition-all duration-500 ${scrolled ? 'py-3 md:py-3' : 'py-5 md:py-6'}`}>
        <div className="flex items-center justify-between">
          {/* Logo - larger when not scrolled */}
          <Link
            to="/"
            className="flex items-center hover:scale-105 transition-all duration-500 group"
          >
            <div className="relative">
              <img
                src="/logoroyal.png"
                alt="Royal Stroje"
                className={`w-auto relative z-10 transition-all duration-500 ${scrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            {/* Navigation container with border */}
            <div className={`flex items-center gap-2 rounded-full bg-white/5 border border-white/10 transition-all duration-500 ${scrolled ? 'px-1.5 py-1.5' : 'px-2 py-2'}`}>
              <Link
                to="/"
                className={`rounded-full font-bold transition-all ${
                  scrolled ? 'px-4 py-1.5 text-sm' : 'px-5 py-2 text-base'
                } ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg shadow-orange-primary/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Požičovňa
              </Link>
              <Link
                to="/sluzby"
                className={`rounded-full font-bold transition-all ${
                  scrolled ? 'px-4 py-1.5 text-sm' : 'px-5 py-2 text-base'
                } ${
                  isActive('/sluzby') || location.pathname.startsWith('/sluzby/')
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg shadow-orange-primary/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Služby
              </Link>
              <Link
                to="/kontakt"
                className={`rounded-full font-bold transition-all ${
                  scrolled ? 'px-4 py-1.5 text-sm' : 'px-5 py-2 text-base'
                } ${
                  isActive('/kontakt')
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg shadow-orange-primary/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Kontakt
              </Link>
            </div>
          </nav>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/421948555551"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gradient-to-r hover:from-orange-primary hover:to-orange-hover hover:border-orange-primary hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-orange-primary/40 ${scrolled ? 'w-10 h-10' : 'w-11 h-11'}`}
              aria-label="WhatsApp"
            >
              <MessageCircle size={scrolled ? 18 : 20} />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/petokrivo"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gradient-to-r hover:from-orange-primary hover:to-orange-hover hover:border-orange-primary hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-orange-primary/40 ${scrolled ? 'w-10 h-10' : 'w-11 h-11'}`}
              aria-label="Telegram"
            >
              <Send size={scrolled ? 18 : 20} />
            </a>

            {/* Phone CTA - more prominent */}
            <a
              href="tel:+421948555551"
              className={`relative inline-flex items-center gap-2 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/40 hover:shadow-xl hover:shadow-orange-primary/60 overflow-hidden group ${scrolled ? 'px-5 py-2.5 text-sm' : 'px-6 py-3 text-sm'}`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Phone size={scrolled ? 16 : 18} className="relative z-10" />
              <span className="relative z-10">0948 555 551</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
