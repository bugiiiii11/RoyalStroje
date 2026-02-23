import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function Kontakt() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-12 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Kontakt"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Modern geometric bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-30">
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
              fill="#09090b"
            />
            <path
              d="M0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30"
              fill="none"
              stroke="rgba(255,102,0,0.6)"
              strokeWidth="2"
            />
            <path
              d="M250,0 L600,0"
              fill="none"
              stroke="rgba(255,102,0,0.8)"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              <span className="text-orange-primary">Kontaktujte</span> nás
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
              Sme tu pre vás. Zavolajte, napíšte email alebo nás navštívte v našej prevádzke v Senci.
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              ROYAL STROJE je profesionálna požičovňa stavebného náradia a techniky pôsobiaca v Senci od roku 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Single Section */}
      <section className="relative pt-6 pb-16 md:py-16 bg-zinc-950 overflow-hidden min-h-screen">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading */}
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4">
              Vyberte si<br className="md:hidden" /> <span className="text-orange-primary">spôsob kontaktu</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-lg hidden md:block">
              Sme dostupní telefonicky, cez email aj prostredníctvom moderných komunikačných aplikácií.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-6 md:mb-16">
            {/* Phone */}
            <a
              href="tel:+421948555551"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 md:mb-4 group-hover:border-orange-primary/30 transition-all">
                <Phone className="text-orange-primary" size={16} />
              </div>
              <h3 className="text-white font-bold text-xs md:text-base mb-0.5 md:mb-1.5">Telefón</h3>
              <p className="text-orange-primary font-bold text-sm md:text-lg mb-0.5 md:mb-1">+421 948 555 551</p>
              <p className="text-white/60 text-[10px] md:text-sm hidden md:block">Non-stop dostupnosť</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/421948555551"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 md:mb-4 group-hover:border-orange-primary/30 transition-all">
                <MessageCircle className="text-orange-primary" size={16} />
              </div>
              <h3 className="text-white font-bold text-xs md:text-base mb-0.5 md:mb-1.5">WhatsApp</h3>
              <p className="text-orange-primary font-bold text-sm md:text-lg mb-0.5 md:mb-1">0948 555 551</p>
              <p className="text-white/60 text-[10px] md:text-sm hidden md:block">Rýchla komunikácia</p>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/Royalstroje"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 md:mb-4 group-hover:border-orange-primary/30 transition-all">
                <Send className="text-orange-primary" size={16} />
              </div>
              <h3 className="text-white font-bold text-xs md:text-base mb-0.5 md:mb-1.5">Telegram</h3>
              <p className="text-orange-primary font-bold text-sm md:text-lg mb-0.5 md:mb-1">@Royalstroje</p>
              <p className="text-white/60 text-[10px] md:text-sm hidden md:block">Alternatívny kontakt</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@royalstroje.sk"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 md:mb-4 group-hover:border-orange-primary/30 transition-all">
                <Mail className="text-orange-primary" size={16} />
              </div>
              <h3 className="text-white font-bold text-xs md:text-base mb-0.5 md:mb-1.5">Email</h3>
              <p className="text-orange-primary font-bold text-sm md:text-lg mb-0.5 md:mb-1 break-all">info@royalstroje.sk</p>
              <p className="text-white/60 text-[10px] md:text-sm hidden md:block">Odpoveď do 24 hodín</p>
            </a>
          </div>

          {/* Visit Us Section */}
          <div className="space-y-4 md:space-y-8">
            {/* Section Header */}
            <div className="text-center mb-3 md:mb-12">
              <h2 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
                Navštívte nás v <span className="text-orange-primary">Senci</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-lg hidden md:block">
                Tešíme sa na vašu návštevu v našej požičovni stavebnej techniky a náradia.
              </p>
            </div>

            {/* Large Info Cards - Vertical on mobile, 3 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
              {/* Opening Hours Card */}
              <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 md:border-2 rounded-xl md:rounded-3xl p-4 md:p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover items-center justify-center mb-6 mx-auto group-hover:shadow-lg group-hover:shadow-orange-primary/50 transition-all">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h3 className="text-white font-black text-sm md:text-xl mb-2 md:mb-4">Otváracie hodiny</h3>
                  <p className="text-orange-primary font-bold text-base md:text-2xl mb-1 md:mb-2">Po - Pi</p>
                  <p className="text-white/80 text-sm md:text-lg">7:00 - 16:00</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 md:border-2 rounded-xl md:rounded-3xl p-4 md:p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover items-center justify-center mb-6 mx-auto group-hover:shadow-lg group-hover:shadow-orange-primary/50 transition-all">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <h3 className="text-white font-black text-sm md:text-xl mb-2 md:mb-4">Adresa predajne</h3>
                  <p className="text-white/90 text-sm md:text-lg leading-relaxed mb-1 md:mb-1">Recká cesta 182</p>
                  <p className="text-orange-primary font-bold text-base md:text-xl">925 26 Senec</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 md:border-2 rounded-xl md:rounded-3xl p-4 md:p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="hidden md:flex w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover items-center justify-center mb-6 mx-auto group-hover:shadow-lg group-hover:shadow-orange-primary/50 transition-all">
                    <Phone className="text-white" size={24} />
                  </div>
                  <h3 className="text-white font-black text-sm md:text-xl mb-2 md:mb-4">Kontakt</h3>
                  <a href="tel:+421948555551" className="block text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2 hover:text-orange-hover transition-colors">
                    +421 948 555 551
                  </a>
                  <a href="mailto:info@royalstroje.sk" className="block text-white/80 text-xs md:text-base hover:text-orange-primary transition-colors">
                    info@royalstroje.sk
                  </a>
                </div>
              </div>
            </div>

            {/* Map and Company Info - 2 Column Grid - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-6 overflow-hidden">
                <h3 className="text-white font-black text-xl mb-4 px-2">Nájdete nás tu</h3>
                <div className="rounded-2xl overflow-hidden border-2 border-white/10 h-[350px] mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.6!2d17.3994!3d48.2187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8f0c0c0c0c0d%3A0x0!2zUsOpxI1rYSBjZXN0YSAxODIsIDkwMyAwMSBTZW5lYw!5e0!3m2!1ssk!2ssk!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Royal Stroje - Mapa"
                  ></iframe>
                </div>
                <a
                  href="https://maps.google.com/?q=Réčka+cesta+182,+Senec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-orange-primary font-bold hover:gap-3 transition-all"
                >
                  <span>Otvoriť v Google Maps</span>
                  <span>→</span>
                </a>
              </div>

              {/* Company Info & About */}
              <div className="space-y-6">
                {/* Company Information */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-8">
                  <h3 className="text-white font-black text-xl mb-4">Firemné údaje</h3>
                  <div className="space-y-2.5 text-white/70 leading-relaxed">
                    <p><strong className="text-white font-bold">Názov:</strong> Royal stroje, s.r.o.</p>
                    <p><strong className="text-white font-bold">Sídlo:</strong> 182, Boldog 92526</p>
                    <p><strong className="text-white font-bold">IČO:</strong> 57 405 425</p>
                    <p><strong className="text-white font-bold">DIČ:</strong> 2122722063</p>
                    <p><strong className="text-white font-bold">IČDPH:</strong> SK2122722063</p>
                    <p><strong className="text-white font-bold">Zastúpený:</strong> Peter Krivosudský</p>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-8">
                  <h3 className="text-white font-black text-xl mb-4">O nás</h3>
                  <p className="text-white/70 leading-relaxed">
                    ROYAL STROJE je profesionálna požičovňa stavebného náradia a techniky pôsobiaca v Senci od roku 2026. Ponúkame prenájom kvalitného náradia aj komplexné služby v oblasti stavebníctva.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-white font-black text-lg md:text-2xl mb-3 md:mb-6">
                Sledujte <span className="text-orange-primary">nás</span>
              </h3>
              <p className="text-white/60 text-xs md:text-sm mb-4 md:mb-6">Zostaňte v kontakte cez sociálne siete</p>
              <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
                <a
                  href="https://www.facebook.com/royalstroje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all group"
                  aria-label="Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/royalstroje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center hover:border-[#E1306C] hover:bg-[#E1306C]/10 transition-all group"
                  aria-label="Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFDC80"/>
                        <stop offset="25%" stopColor="#F77737"/>
                        <stop offset="50%" stopColor="#E1306C"/>
                        <stop offset="75%" stopColor="#C13584"/>
                        <stop offset="100%" stopColor="#833AB4"/>
                      </linearGradient>
                    </defs>
                    <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/royalstroje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all group"
                  aria-label="LinkedIn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                    <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-4 md:pt-8">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-lg rounded-full hover:scale-105 transition-all shadow-2xl shadow-orange-primary/50"
              >
                <Phone size={18} className="md:w-6 md:h-6" />
                <span>Zavolať: 0948 555 551</span>
              </a>
            </div>

            {/* Company Details - Mobile only */}
            <div className="md:hidden mt-6">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-black text-sm mb-3">Firemné údaje</h3>
                <div className="space-y-1.5 text-white/70 text-xs leading-relaxed">
                  <p><strong className="text-white font-bold">Názov:</strong> Royal stroje, s.r.o.</p>
                  <p><strong className="text-white font-bold">Sídlo:</strong> 182, Boldog 92526</p>
                  <p><strong className="text-white font-bold">IČO:</strong> 57 405 425</p>
                  <p><strong className="text-white font-bold">DIČ:</strong> 2122722063</p>
                  <p><strong className="text-white font-bold">IČDPH:</strong> SK2122722063</p>
                  <p><strong className="text-white font-bold">Zastúpený:</strong> Peter Krivosudský</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
