import { Link, useLocation } from 'react-router-dom';
import { Phone, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

// WhatsApp icon with brand color
const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Telegram icon with brand color
const TelegramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#229ED9">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [promoVisible, setPromoVisible] = useState(false);
  const [promoClosed, setPromoClosed] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Show promo banner after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!promoClosed) {
        setPromoVisible(true);
      }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [promoClosed]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClosePromo = () => {
    setPromoVisible(false);
    setPromoClosed(true);
  };

  return (
    <>
      {/* Promo Banner - Slide in from right - Desktop only */}
      <div
        className={`hidden md:block fixed top-24 right-0 z-[60] transition-all duration-500 ease-out ${
          promoVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative bg-gradient-to-br from-orange-primary to-orange-hover rounded-l-2xl shadow-2xl shadow-orange-primary/30 overflow-hidden max-w-sm">
          {/* Close button */}
          <button
            onClick={handleClosePromo}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all z-10"
            aria-label="Zavrieť"
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div className="p-6 pr-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-white font-black text-lg leading-tight mb-2">
                  Čoskoro otvárame!
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Web je momentálne v testovacej prevádzke. Oficiálne spustenie čoskoro.
                </p>
              </div>
            </div>
            <Link
              to="/kontakt"
              onClick={() => setPromoVisible(false)}
              className="block w-full text-center bg-white text-orange-primary font-bold py-2.5 px-4 rounded-lg hover:bg-white/90 transition-all"
            >
              Kontaktujte nás
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                className={`relative px-3 py-2 font-medium text-sl uppercase tracking-wide transition-all duration-300 ${
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
                className={`relative px-3 py-2 font-medium text-sl uppercase tracking-wide transition-all duration-300 ${
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
                className={`relative px-3 py-2 font-medium text-sl uppercase tracking-wide transition-all duration-300 ${
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
            <div className="flex items-center gap-4">
              {/* Social Icons - no borders, bigger */}
              <a
                href="https://wa.me/421948555551"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={32} />
              </a>
              <a
                href="https://t.me/Royalstroje"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Telegram"
              >
                <TelegramIcon size={32} />
              </a>

              {/* Phone CTA - icon with hover to show number */}
              <a
                href="tel:+421948555551"
                className="group relative flex items-center gap-2 text-orange-primary hover:text-orange-hover transition-all duration-300"
                onMouseEnter={() => setPhoneHovered(true)}
                onMouseLeave={() => setPhoneHovered(false)}
                aria-label="Telefón: 0948 555 551"
              >
                <Phone size={32} className="flex-shrink-0" />
                <span className={`font-black text-xl whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  phoneHovered ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0'
                }`}>
                  0948 555 551
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
