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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/5 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/30'
          : 'bg-black/95 border-b border-white/10'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-black tracking-tight hover:scale-105 transition-transform"
          >
            <span className="text-white">ROYAL</span>
            <span className="text-orange-primary"> STROJE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-base font-semibold transition-all relative group ${
                isActive('/') ? 'text-orange-primary' : 'text-white/90 hover:text-orange-primary'
              }`}
            >
              Požičovňa
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-orange-primary transition-all ${
                  isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
            <Link
              to="/sluzby"
              className={`text-base font-semibold transition-all relative group ${
                isActive('/sluzby') ? 'text-orange-primary' : 'text-white/90 hover:text-orange-primary'
              }`}
            >
              Služby
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-orange-primary transition-all ${
                  isActive('/sluzby') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
            <Link
              to="/kontakt"
              className={`text-base font-semibold transition-all relative group ${
                isActive('/kontakt') ? 'text-orange-primary' : 'text-white/90 hover:text-orange-primary'
              }`}
            >
              Kontakt
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-orange-primary transition-all ${
                  isActive('/kontakt') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          </nav>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/421948555551"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/petokrivo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all hover:scale-110"
              aria-label="Telegram"
            >
              <Send size={18} />
            </a>

            {/* Phone CTA */}
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/40 hover:shadow-xl hover:shadow-orange-primary/60"
            >
              <Phone size={16} />
              <span>0948 555 551</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
