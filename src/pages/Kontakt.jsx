import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function Kontakt() {
  return (
    <div className="min-h-screen">
      {/* Hero with Background */}
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
            {/* Fill area below decorative line with background color */}
            <path
              d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
              fill="#09090b"
            />
            {/* Orange decorative lines */}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              <span className="text-orange-primary">Kontaktujte</span> nás
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Sme tu pre vás. Zavolajte, napíšte email alebo nás navštívte v našej novootvorenej prevádzke v Senci.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - Unified with parallax effects */}
      <section className="relative py-16 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black overflow-hidden">
        {/* Subtle vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(ellipse 85% 75% at 50% 40%, transparent 0%, transparent 60%, rgba(0,0,0,0.08) 100%)'
          }}
        />

        {/* Diagonal subtle lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px)'
          }}
        />

        {/* Main soft spotlight */}
        <div
          className="absolute pointer-events-none z-0 transition-all duration-500 ease-out"
          style={{
            top: '150px',
            left: '50%',
            width: '1600px',
            height: '1100px',
            marginLeft: '-800px',
            background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,110,0,0.18) 0%, rgba(255,100,0,0.09) 35%, rgba(255,90,0,0.03) 70%, transparent 100%)',
            filter: 'blur(120px)',
            opacity: 0.75
          }}
        />

        {/* Subtle inner glow for depth */}
        <div
          className="absolute pointer-events-none z-[1] transition-all duration-500 ease-out"
          style={{
            top: '250px',
            left: '50%',
            width: '900px',
            height: '700px',
            marginLeft: '-450px',
            background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,115,5,0.22) 0%, rgba(255,105,0,0.10) 30%, rgba(255,95,0,0.03) 65%, transparent 100%)',
            filter: 'blur(90px)',
            opacity: 0.65
          }}
        />

        {/* Ambient background glow - very subtle */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '15%',
            right: '12%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255,100,0,0.09) 0%, rgba(255,90,0,0.03) 50%, transparent 80%)',
            filter: 'blur(110px)',
            opacity: 0.5,
            animation: 'ambientFloat1 20s ease-in-out infinite'
          }}
        />

        {/* Ambient background glow 2 */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            bottom: '10%',
            left: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,105,0,0.08) 0%, rgba(255,95,0,0.03) 50%, transparent 80%)',
            filter: 'blur(105px)',
            opacity: 0.45,
            animation: 'ambientFloat2 22s ease-in-out infinite'
          }}
        />

        {/* Animation keyframes */}
        <style>{`
          @keyframes ambientFloat1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.4;
            }
            50% {
              transform: translate(-25px, 20px) scale(1.08);
              opacity: 0.5;
            }
          }

          @keyframes ambientFloat2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.35;
            }
            50% {
              transform: translate(30px, -25px) scale(1.1);
              opacity: 0.45;
            }
          }
        `}</style>

        <div className="relative z-[10] max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Contact section heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Neváhajte nás <span className="text-orange-primary">kontaktovať</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-medium">
              Vyberte si najpohodlnejší spôsob komunikácie alebo nás navštívte v našej požičovni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {/* Phone */}
            <a
              href="tel:+421948555551"
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-orange-primary/50 transition-all">
                  <Phone className="text-orange-primary" size={24} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">Telefón</h3>
                <p className="text-orange-primary font-bold text-lg mb-1">+421 948 555 551</p>
                <p className="text-white/60 text-sm">Non-stop dostupnosť</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/421948555551"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-orange-primary/50 transition-all">
                  <MessageCircle className="text-orange-primary" size={24} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">WhatsApp</h3>
                <p className="text-orange-primary font-bold text-lg mb-1">0948 555 551</p>
                <p className="text-white/60 text-sm">Rýchla komunikácia</p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/Royalstroje"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-orange-primary/50 transition-all">
                  <Send className="text-orange-primary" size={24} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">Telegram</h3>
                <p className="text-orange-primary font-bold text-lg mb-1">@Royalstroje</p>
                <p className="text-white/60 text-sm">Alternatívny kontakt</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@royalstroje.sk"
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-orange-primary/50 transition-all">
                  <Mail className="text-orange-primary" size={24} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">Email</h3>
                <p className="text-orange-primary font-bold text-lg mb-1 break-all">info@royalstroje.sk</p>
                <p className="text-white/60 text-sm">Odpoveď do 24 hodín</p>
              </div>
            </a>
          </div>

          {/* About Us */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 mb-12 hover:border-orange-primary/30 hover:shadow-xl hover:shadow-orange-primary/10 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6">O nás</h3>
              <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
                <p>
                  ROYAL STROJE je profesionálna požičovňa stavebného náradia a techniky pôsobiaca v
                  Senci od roku 2015. Špecializujeme sa na prenájom kvalitného náradia pre stavebné
                  firmy, remeselníkov aj súkromné osoby.
                </p>
                <p>
                  Naša firma ponúka nielen požičovňu náradia, ale aj komplexné služby v oblasti
                  zemných a búracích prác. Disponujeme vlastnou strojovou technikou a skúseným tímom
                  strojníkov.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 mb-12 hover:border-orange-primary/30 hover:shadow-xl hover:shadow-orange-primary/10 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6">Hodnoty, ktorými sa riadime</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl px-4 py-3.5 border border-white/5">
                  <span className="text-orange-primary text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white text-base">Profesionalita</strong>
                    <p className="text-white/70 text-sm mt-0.5">Všetky stroje servisované a v perfektnom stave</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl px-4 py-3.5 border border-white/5">
                  <span className="text-orange-primary text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white text-base">Spoľahlivosť</strong>
                    <p className="text-white/70 text-sm mt-0.5">Dodržiavame termíny a dohody</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl px-4 py-3.5 border border-white/5">
                  <span className="text-orange-primary text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white text-base">Férovosť</strong>
                    <p className="text-white/70 text-sm mt-0.5">Transparentné ceny bez skrytých poplatkov</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl px-4 py-3.5 border border-white/5">
                  <span className="text-orange-primary text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white text-base">Dostupnosť</strong>
                    <p className="text-white/70 text-sm mt-0.5">Non-stop linka pri problémoch</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-zinc-950/50 rounded-xl px-4 py-3.5 border border-white/5">
                  <span className="text-orange-primary text-lg mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-white text-base">Kvalita</strong>
                    <p className="text-white/70 text-sm mt-0.5">Spolupráca s prémiovými značkami</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Integrated */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Navštívte nás v Senci alebo zavolajte
              </h2>
              <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-medium">
              Tešíme sa na spoluprácu!
            </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
              {/* Opening Hours */}
              <div className="bg-zinc-900/50 backdrop-blur border border-orange-primary/20 rounded-2xl p-6 text-center hover:border-orange-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/10 transition-all">
                <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="text-orange-primary" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Otváracie hodiny</h3>
                <p className="text-orange-primary font-semibold text-xl mb-1">Po - Pi</p>
                <p className="text-white/70 text-base">7:00 - 16:00</p>
              </div>

              {/* Address */}
              <div className="bg-zinc-900/50 backdrop-blur border border-orange-primary/20 rounded-2xl p-6 text-center hover:border-orange-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/10 transition-all">
                <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="text-orange-primary" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Adresa predajne</h3>
                <p className="text-white/90 text-base leading-relaxed">
                  Recká cesta 182<br />
                  <span className="text-orange-primary">925 26 Senec</span>
                </p>
              </div>

              {/* Contact */}
              <div className="bg-zinc-900/50 backdrop-blur border border-orange-primary/20 rounded-2xl p-6 text-center hover:border-orange-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/10 transition-all">
                <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                  <Phone className="text-orange-primary" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Kontakt</h3>
                <p className="text-white/90 text-base mb-1">
                  <a href="tel:+421948555551" className="hover:text-orange-primary transition-colors">
                    +421 948 555 551
                  </a>
                </p>
                <p className="text-white/70 text-sm">
                  <a href="mailto:info@royalstroje.sk" className="hover:text-orange-primary transition-colors">
                    info@royalstroje.sk
                  </a>
                </p>
              </div>
            </div>

            {/* Company Info & Map Grid */}
            <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-start">
              {/* Company Information - Left Side */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 hover:shadow-xl hover:shadow-orange-primary/10 transition-all relative overflow-hidden group h-fit">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-5">Firemné údaje</h3>
                  <div className="space-y-3.5">
                    <div>
                      <h4 className="text-orange-primary font-bold text-xl mb-1">Royal stroje, s.r.o.</h4>
                    </div>
                    <div className="space-y-2 text-white/80 text-base md:text-lg">
                      <p><span className="text-white/60">Sídlo:</span> <span className="text-white font-medium">182, Boldog 92526</span></p>
                      <p><span className="text-white/60">IČO:</span> <span className="text-white font-medium">57 405 425</span></p>
                      <p><span className="text-white/60">DIČ:</span> <span className="text-white font-medium">2122722063</span></p>
                      <p><span className="text-white/60">Zastúpený:</span> <span className="text-white font-medium">Peter Krivosudký</span></p>
                    </div>
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <p className="flex items-center gap-2">
                        <Phone className="text-orange-primary" size={18} />
                        <a href="tel:+421948555551" className="text-white hover:text-orange-primary transition-colors font-medium">
                          +421 948 555 551
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="text-orange-primary" size={18} />
                        <a href="mailto:info@royalstroje.sk" className="text-white hover:text-orange-primary transition-colors font-medium">
                          info@royalstroje.sk
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map - Right Side */}
              <div>
                <div className="rounded-2xl overflow-hidden border border-white/10 h-[400px]">
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
                <div className="text-center mt-4">
                  <a
                    href="https://maps.google.com/?q=Réčka+cesta+182,+Senec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-primary font-bold hover:gap-3 transition-all"
                  >
                    <span>Otvoriť v Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <span>Zavolať teraz: 0948 555 551</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
