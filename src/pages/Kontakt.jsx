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
              Kontaktujte nás
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Sme tu pre vás. Zavolajte, napíšte email alebo nás navštívte v našej novootvorenej prevádzke v Senci.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative pt-16 pb-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay - wider spread */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Grid pattern overlay - much more visible */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25] z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Diagonal subtle lines for technical feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
          }}
        />

        {/* Orange accent glow - top right (animated) */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '10%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.6) 0%, rgba(255,102,0,0.2) 40%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.15,
            animation: 'floatGlow1 8s ease-in-out infinite'
          }}
        />

        {/* Orange accent glow - bottom left (animated) */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            bottom: '10%',
            left: '10%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.5) 0%, rgba(255,102,0,0.15) 40%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0.12,
            animation: 'floatGlow2 10s ease-in-out infinite'
          }}
        />

        {/* Center pulsing glow */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none z-0"
          style={{
            width: '800px',
            height: '800px',
            marginLeft: '-400px',
            marginTop: '-400px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.4) 0%, rgba(255,102,0,0.1) 50%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'pulseGlow 6s ease-in-out infinite'
          }}
        />

        {/* Animation keyframes */}
        <style>{`
          @keyframes floatGlow1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(-120px, 100px) scale(1.2);
            }
            50% {
              transform: translate(80px, -120px) scale(0.85);
            }
            75% {
              transform: translate(100px, 60px) scale(1.1);
            }
          }

          @keyframes floatGlow2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(140px, -100px) scale(1.25);
            }
            66% {
              transform: translate(-100px, 120px) scale(0.8);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.08;
            }
            50% {
              transform: scale(1.4);
              opacity: 0.18;
            }
          }
        `}</style>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Contact section heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Neváhajte nás <span className="text-orange-primary">kontaktovať</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Vyberte si najpohodlnejší spôsob komunikácie alebo nás navštívte v našej požičovni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Phone */}
            <a
              href="tel:+421948555551"
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                <Phone className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Telefón</h3>
              <p className="text-orange-primary font-bold text-xl mb-1">+421 948 555 551</p>
              <p className="text-white/60 text-sm">Non-stop dostupnosť</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/421948555551"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                <MessageCircle className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-orange-primary font-bold text-xl mb-1">0948 555 551</p>
              <p className="text-white/60 text-sm">Rýchla komunikácia</p>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/petokrivo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                <Send className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Telegram</h3>
              <p className="text-orange-primary font-bold text-xl mb-1">@petokrivo</p>
              <p className="text-white/60 text-sm">Alternatívny kontakt</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@royalstroje.sk"
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                <Mail className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Email</h3>
              <p className="text-orange-primary font-bold text-xl mb-1 break-all">info@royalstroje.sk</p>
              <p className="text-white/60 text-sm">Odpoveď do 24 hodín</p>
            </a>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Address & Hours */}
            <div>
              {/* Address */}
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-orange-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Adresa</h3>
                    <p className="text-white/80 text-lg font-semibold mb-1">Recká cesta 182</p>
                    <p className="text-white/80 text-lg font-semibold">925 26 Senec-Boldog</p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.6!2d17.3994!3d48.2187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8f0c0c0c0c0d%3A0x0!2zUsOpxI1rYSBjZXN0YSAxODIsIDkwMyAwMSBTZW5lYw!5e0!3m2!1ssk!2ssk!4v1234567890"
                    width="100%"
                    height="300"
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
                  className="inline-flex items-center gap-2 text-orange-primary font-bold hover:gap-3 transition-all"
                >
                  <span>Otvoriť v Google Maps</span>
                  <span>→</span>
                </a>
              </div>

              {/* Opening Hours */}
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-orange-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Otváracie hodiny</h3>
                    <div className="space-y-2 text-white/80">
                      <div className="flex justify-between gap-8">
                        <span className="font-semibold">Pondelok – Piatok:</span>
                        <span>7:00 – 16:00</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span className="font-semibold">Sobota – Nedeľa:</span>
                        <span className="text-white/50">Zatvorené</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/60">
                    ⚠️ <strong className="text-white/80">Non-stop linka pri poruche stroja:</strong>{' '}
                    <a href="tel:+421948555551" className="text-orange-primary hover:underline">
                      0948 555 551
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: About Us */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-6">O nás</h3>
              <div className="space-y-4 text-white/70 leading-relaxed">
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
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white font-bold mb-3">Hodnoty, ktorými sa riadime:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-primary mt-0.5">✓</span>
                      <span>
                        <strong className="text-white">Profesionalita</strong> – Všetky stroje
                        servisované a v perfektnom stave
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-primary mt-0.5">✓</span>
                      <span>
                        <strong className="text-white">Spoľahlivosť</strong> – Dodržiavame termíny a
                        dohody
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-primary mt-0.5">✓</span>
                      <span>
                        <strong className="text-white">Férovosť</strong> – Transparentné ceny bez
                        skrytých poplatkov
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-primary mt-0.5">✓</span>
                      <span>
                        <strong className="text-white">Dostupnosť</strong> – Non-stop linka pri
                        problémoch
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-primary mt-0.5">✓</span>
                      <span>
                        <strong className="text-white">Kvalita</strong> – Spolupráca s prémiovými
                        značkami
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.25] z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Diagonal subtle lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
          }}
        />

        {/* Orange accent glow - top right */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '10%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.6) 0%, rgba(255,102,0,0.2) 40%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.15,
            animation: 'floatGlow1 8s ease-in-out infinite'
          }}
        />

        {/* Orange accent glow - bottom left */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            bottom: '10%',
            left: '10%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.5) 0%, rgba(255,102,0,0.15) 40%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0.12,
            animation: 'floatGlow2 10s ease-in-out infinite'
          }}
        />

        {/* Center pulsing glow */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none z-0"
          style={{
            width: '800px',
            height: '800px',
            marginLeft: '-400px',
            marginTop: '-400px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.4) 0%, rgba(255,102,0,0.1) 50%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'pulseGlow 6s ease-in-out infinite'
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Navštívte nás v Senci alebo zavolajte
          </h2>
          <p className="text-white/70 text-lg mb-8">
          Tešíme sa na spoluprácu s vami!
          </p>
          <a
            href="tel:+421948555551"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
          >
            <span>Zavolať teraz: 0948 555 551</span>
          </a>
        </div>
      </section>
    </div>
  );
}
