import { Handshake } from 'lucide-react';

export default function Partneri() {
  // Placeholder data pre 12 partnerov
  const partners = [
    {
      id: 1,
      name: 'M & M WOOD',
      logo: '/pictures/graphics/partneri/logo_mmwood.png',
      website: 'https://www.mmwood.sk/',
    },
    {
      id: 2,
      name: 'ZSOLIKA',
      logo: '/pictures/graphics/partneri/logo_zsolika.png',
      website: 'https://www.zsolika.sk/',
    },
    {
      id: 3,
      name: 'MOBILBOX',
      logo: '/pictures/graphics/partneri/logo_mobilbox.png',
      website: 'https://mobilbox.sk/',
    },
    {
      id: 4,
      name: 'Partner Firma 4',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 5,
      name: 'Partner Firma 5',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 6,
      name: 'Partner Firma 6',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 7,
      name: 'Partner Firma 7',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 8,
      name: 'Partner Firma 8',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 9,
      name: 'Partner Firma 9',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 10,
      name: 'Partner Firma 10',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 11,
      name: 'Partner Firma 11',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
    {
      id: 12,
      name: 'Partner Firma 12',
      logo: '/placeholder-logo.png',
      website: 'https://example.com',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Partneri"
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center">
                <Handshake size={28} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Naši <span className="text-orange-primary">Partneri</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
              Spolupracujeme s overenými profesionálmi zo Senca, Bratislavy a okolia.
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Všetci naši partneri sú verifikované legitimné firmy, s ktorými udržiavame dlhodobú spoluprácu. Spoločne budujeme dôveryhodné partnerstvá založené na kvalite a profesionalite.
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
              Dôverujú nám <span className="text-orange-primary">profesionáli</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Prečo si nás vybrat? Špičková technika, flexibilita a overené referencie od našich partnerov.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-white/10 rounded-3xl p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px] overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-3xl"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Logo */}
                  <div className="w-32 h-32 rounded-2xl bg-white flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-orange-primary/30 transition-all duration-300 overflow-hidden">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>

                  {/* Company Name */}
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">
                    {partner.name}
                  </h3>

                  {/* Visit indicator */}
                  <span className="text-white/40 text-xs group-hover:text-orange-primary/70 transition-colors">
                    Navštíviť web →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Partnership Info Section */}
          <div className="mt-16 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Čo znamená <span className="text-orange-primary">partnerstvo</span>
              </h2>
              <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
                Naši partneri sú <strong className="text-orange-primary">základom našej úspešnej práce</strong>. Si vážime každého z nich a spoločne vytvárame sieť dôveryhodných profesionálov v stavebnom priemysle, ktorí sa môžu navzájom odporúčať a spolupracovať.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 mb-8">
              <div className="bg-zinc-950/50 rounded-xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-lg mb-3">Ako vzniká partnerstvo?</h3>
                <p className="text-white/70 leading-relaxed">
                  Nevyhľadávame nových partnerov. Partnerstvo vzniká prirodzene po dlhodobej kvalitnej spolupráci ako <strong className="text-white">poďakovanie za dôveru a profesionalitu</strong>. Len naši najbližší a najspoľahlivejší klienti sa môžu stať oficiálnymi partnermi.
                </p>
              </div>

              <div className="bg-zinc-950/50 rounded-xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-lg mb-3">Vzájomné odporúčanie</h3>
                <p className="text-white/70 leading-relaxed">
                  Partnerstvo znamená vzájomnú dôveru. Radi odporúčame služby našich partnerov aj našim klientom a spoločne vytvárame sieť spoľahlivých profesionálov v stavebnom priemysle.
                </p>
              </div>

              <div className="bg-zinc-950/50 rounded-xl p-6 border border-white/5">
                <h3 className="text-white font-bold text-lg mb-3">Komplexné pokrytie stavebníctva</h3>
                <p className="text-white/70 leading-relaxed">
                  Naša sieť partnerov pokrýva <strong className="text-white">široké spektrum stavebných služieb</strong> — od prenájmu strojov, cez zemné práce, až po dodávky materiálu. Pre našich klientov to znamená jedno spoľahlivé kontaktné miesto a rýchle riešenia.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/60 text-sm mb-4">
                Máte záujem o spoluprácu? Kontaktujte nás a začnime budovať dôveru.
              </p>
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <span>Zavolať: 0948 555 551</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
