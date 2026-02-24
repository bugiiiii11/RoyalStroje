import { Phone } from 'lucide-react';

export default function Partneri() {
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
      name: 'ESKOPA',
      logo: '/pictures/graphics/partneri/logo_eskopa.png',
      website: null,
    },
    {
      id: 5,
      name: 'MOBA',
      logo: '/pictures/graphics/partneri/logo_moba.png',
      website: 'https://moba.sk/',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
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
              Sieť overených profesionálov. <span className="text-orange-primary">Jeden kontakt, všetky služby.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Partneri Royal Stroje v Senci, Bratislave a okolí - stavbári, ktorým dôverujeme.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative pb-16 md:py-16 bg-zinc-950 overflow-hidden min-h-screen">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading */}
          <div className="text-center mb-6 md:mb-12 pt-16 md:pt-0">
            <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
              Naši <span className="text-orange-primary">partneri</span>
            </h1>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto mb-2 md:mb-4">
              Stavebné firmy a dodávatelia, s ktorými spolupracujeme v regióne Senec - Bratislava.
            </p>
            <p className="text-white/60 text-xs md:text-base max-w-2xl mx-auto hidden md:block">
              Partnerstvo vzniká prirodzene po dlhodobej kvalitnej spolupráci. Len naši najspoľahlivejší partneri sú uvedení na tomto zozname.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
            {partners.map((partner) => {
              const cardContent = (
                <>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 rounded-2xl md:rounded-3xl"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Logo */}
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl bg-white flex items-center justify-center mb-2 md:mb-5 group-hover:shadow-lg group-hover:shadow-orange-primary/30 transition-all duration-300 overflow-hidden">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain p-2 md:p-3"
                      />
                    </div>

                    {/* Company Name */}
                    <h3 className="text-white font-bold text-xs md:text-lg mb-1 md:mb-2 group-hover:text-orange-primary transition-colors line-clamp-2">
                      {partner.name}
                    </h3>

                    {/* Visit indicator - only show if website exists */}
                    {partner.website && (
                      <span className="text-white/40 text-[10px] md:text-xs group-hover:text-orange-primary/70 transition-colors">
                        Navštíviť web →
                      </span>
                    )}
                  </div>
                </>
              );

              const cardClasses = "group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 md:border-2 rounded-2xl md:rounded-3xl p-3 md:p-8 hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[140px] md:min-h-[220px] overflow-hidden";

              return partner.website ? (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  {cardContent}
                </a>
              ) : (
                <div
                  key={partner.id}
                  className={cardClasses}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          {/* Partnership Info Section */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl md:rounded-2xl p-4 md:p-12">
            <div className="text-center mb-4 md:mb-8">
              <h2 className="text-lg md:text-3xl font-black text-white mb-2 md:mb-4">
                Čo znamená <span className="text-orange-primary">partnerstvo</span>
              </h2>
              <p className="text-white/80 max-w-3xl mx-auto text-xs md:text-lg leading-relaxed">
                Naši partneri sú <strong className="text-orange-primary">základom našej úspešnej práce</strong>. Si vážime každého z nich a spoločne vytvárame sieť dôveryhodných profesionálov v stavebnom priemysle, ktorí sa môžu navzájom odporúčať a spolupracovať.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3 md:space-y-6 mb-4 md:mb-8">
              <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-6 border border-white/5">
                <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-3">Ako vzniká partnerstvo?</h3>
                <p className="text-white/70 text-xs md:text-base leading-relaxed">
                  Nevyhľadávame nových partnerov. Partnerstvo vzniká prirodzene po dlhodobej kvalitnej spolupráci ako <strong className="text-white">poďakovanie za dôveru a profesionalitu</strong>. Len naši najbližší a najspoľahlivejší klienti sa môžu stať oficiálnymi partnermi.
                </p>
              </div>

              <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-6 border border-white/5">
                <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-3">Vzájomné odporúčanie</h3>
                <p className="text-white/70 text-xs md:text-base leading-relaxed">
                  Partnerstvo znamená vzájomnú dôveru. Radi odporúčame služby našich partnerov aj našim klientom a spoločne vytvárame sieť spoľahlivých profesionálov v stavebnom priemysle.
                </p>
              </div>

              <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-6 border border-white/5">
                <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-3">Komplexné pokrytie stavebníctva</h3>
                <p className="text-white/70 text-xs md:text-base leading-relaxed">
                  Naša sieť partnerov pokrýva <strong className="text-white">široké spektrum stavebných služieb</strong> — od prenájmu strojov, cez zemné práce, až po dodávky materiálu. Pre našich klientov to znamená jedno spoľahlivé kontaktné miesto a rýchle riešenia.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">
                Máte záujem o spoluprácu? Kontaktujte nás a začnime budovať dôveru.
              </p>
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-base rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={16} className="md:w-5 md:h-5" />
                <span>Zavolať: 0948 555 551</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
