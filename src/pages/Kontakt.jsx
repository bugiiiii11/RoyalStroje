import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function Kontakt() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
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
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Vyberte si <span className="text-orange-primary">spôsob kontaktu</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Sme dostupní telefonicky, cez email aj prostredníctvom moderných komunikačných aplikácií.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Phone */}
            <a
              href="tel:+421948555551"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-orange-primary/30 transition-all">
                <Phone className="text-orange-primary" size={24} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">Telefón</h3>
              <p className="text-orange-primary font-bold text-lg mb-1">+421 948 555 551</p>
              <p className="text-white/60 text-sm">Non-stop dostupnosť</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/421948555551"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-orange-primary/30 transition-all">
                <MessageCircle className="text-orange-primary" size={24} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">WhatsApp</h3>
              <p className="text-orange-primary font-bold text-lg mb-1">0948 555 551</p>
              <p className="text-white/60 text-sm">Rýchla komunikácia</p>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/Royalstroje"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-orange-primary/30 transition-all">
                <Send className="text-orange-primary" size={24} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">Telegram</h3>
              <p className="text-orange-primary font-bold text-lg mb-1">@Royalstroje</p>
              <p className="text-white/60 text-sm">Alternatívny kontakt</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@royalstroje.sk"
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-orange-primary/30 transition-all">
                <Mail className="text-orange-primary" size={24} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">Email</h3>
              <p className="text-orange-primary font-bold text-lg mb-1 break-all">info@royalstroje.sk</p>
              <p className="text-white/60 text-sm">Odpoveď do 24 hodín</p>
            </a>
          </div>

          {/* Visit Us Section */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Navštívte nás v <span className="text-orange-primary">Senci</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Tešíme sa na vašu návštevu v našej požičovni stavebnej techniky a náradia.
              </p>
            </div>

            {/* Large Info Cards - 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Opening Hours Card */}
              <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg group-hover:shadow-orange-primary/50 transition-all">
                    <Clock className="text-white" size={36} />
                  </div>
                  <h3 className="text-white font-black text-xl mb-4">Otváracie hodiny</h3>
                  <p className="text-orange-primary font-bold text-2xl mb-2">Po - Pi</p>
                  <p className="text-white/80 text-lg">7:00 - 16:00</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg group-hover:shadow-orange-primary/50 transition-all">
                    <MapPin className="text-white" size={36} />
                  </div>
                  <h3 className="text-white font-black text-xl mb-4">Adresa predajne</h3>
                  <p className="text-white/90 text-lg leading-relaxed mb-1">Recká cesta 182</p>
                  <p className="text-orange-primary font-bold text-xl">925 26 Senec</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-6 mx-auto group-hover:shadow-lg group-hover:shadow-orange-primary/50 transition-all">
                    <Phone className="text-white" size={36} />
                  </div>
                  <h3 className="text-white font-black text-xl mb-4">Kontakt</h3>
                  <a href="tel:+421948555551" className="block text-orange-primary font-bold text-lg mb-2 hover:text-orange-hover transition-colors">
                    +421 948 555 551
                  </a>
                  <a href="mailto:info@royalstroje.sk" className="block text-white/80 text-base hover:text-orange-primary transition-colors">
                    info@royalstroje.sk
                  </a>
                </div>
              </div>
            </div>

            {/* Map and Company Info - 2 Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

            {/* CTA Button */}
            <div className="text-center pt-8">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-2xl shadow-orange-primary/50"
              >
                <Phone size={24} />
                <span>Zavolať: 0948 555 551</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
