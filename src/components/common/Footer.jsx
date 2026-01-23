import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black pt-24 pb-16 overflow-visible">
      {/* Modern geometric top border - mirrored from Hero */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        {/* Angled cut with steps - flipped vertically */}
        <svg className="absolute top-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          {/* Main shape */}
          <path
            d="M0,0 L0,50 L200,50 L250,80 L600,80 L650,50 L900,50 L950,65 L1200,65 L1250,50 L1440,50 L1440,0 Z"
            fill="#09090b"
          />
          {/* Orange accent line */}
          <path
            d="M0,50 L200,50 L250,80 L600,80 L650,50 L900,50 L950,65 L1200,65 L1250,50 L1440,50"
            fill="none"
            stroke="rgba(255,102,0,0.6)"
            strokeWidth="2"
          />
          {/* Glow line */}
          <path
            d="M250,80 L600,80"
            fill="none"
            stroke="rgba(255,102,0,0.8)"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="text-2xl font-black mb-4">
              <span className="text-white">ROYAL</span>
              <span className="text-orange-primary"> STROJE</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Profesionálna požičovňa v Senci.
              Ponúkame prenájom a predaj špičkovej stavebnej techniky a náradia pre vaše najnáročnejšie práce.
              Budujte s dôverou.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Rýchle linky
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-orange-primary transition">
                  Požičovňa náradia
                </Link>
              </li>
              <li>
                <Link to="/sluzby" className="text-white/70 hover:text-orange-primary transition">
                  Služby
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-white/70 hover:text-orange-primary transition">
                  Kontakt
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-orange-primary transition">
                  Obchodné podmienky
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-orange-primary transition">
                  GDPR
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/70">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+421948555551" className="hover:text-orange-primary transition">
                  +421 948 555 551
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:info@royalstroje.sk" className="hover:text-orange-primary transition">
                  info@royalstroje.sk
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Recká cesta 182, 925 26 Senec-Boldog</span>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <Clock size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <div>Po-Pi: 7:00-16:00</div>
                  <div>So-Ne: zatvorené</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Sledujte nás
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-orange-primary hover:border-orange-primary hover:text-white transition-all hover:-translate-y-1"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-orange-primary hover:border-orange-primary hover:text-white transition-all hover:-translate-y-1"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/421948555551"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-orange-primary hover:border-orange-primary hover:text-white transition-all hover:-translate-y-1"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://t.me/petokrivo"
                aria-label="Telegram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-orange-primary hover:border-orange-primary hover:text-white transition-all hover:-translate-y-1"
              >
                <Send size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © 2024 Royal Stroje. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
}
