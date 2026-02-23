import { Phone, Mail, ShoppingCart, Package, Tag, Zap, Shield, Wrench, HardHat } from 'lucide-react';

export default function PredajTechniky() {
  const categories = [
    {
      id: 'naradie',
      icon: Wrench,
      title: 'Profesionálne náradie',
      description: 'Všetko potrebné k práci – rýchlo, priamo na prevádzke.',
      items: ['Remeselnícke pomôcky ', 'Elektrické náradie', 'AKU ručné náradie', 'Meracie prístroje'],
    },
    {
      id: 'Stavebná mechanizácia',
      icon: Package,
      title: 'Stavebná mechanizácia',
      description: 'Predaj vybranej stavebnej techniky. Nová aj používaná technika z našej prevádzky a partnerských dodávok.',
      items: ['Vibračné dosky a nohy', 'Elektrocentrály', 'Rezná technika', 'Doplnková technika pre stavbu '],
    },
    {
      id: 'prislusenstvo',
      icon: ShoppingCart,
      title: 'Príslušenstvo a spotrebný materiál',
      description: 'Široký výber príslušenstva za výhodné ceny. ',
      items: ['Diamantové rezné a brúsne kotúče', 'Príslušenstvo ku elektrickému a aku náradiu', 'Vrtáky', 'Elektródy'],
    },
    {
      id: 'bozp',
      icon: HardHat,
      title: 'Ochranné pomôcky BOZP',
      description: 'Bezpečnosť na prvom mieste - kompletný sortiment ochranných pomôcok.',
      items: ['Reflexné vesty', 'Ochranné gurtne', 'Ochranné rukavice', 'Ochranné okuliare'],
    },
  ];

  const advantages = [
    {
      icon: Tag,
      title: 'Férové ceny',
      description: 'Konkurenčné ponuky a akcie.',
    },
    {
      icon: Package,
      title: 'Tovar skladom',
      description: 'Okamžitý odber bez čakania.',
    },
    {
      icon: Zap,
      title: 'Expresné dodanie',
      description: 'Rýchle zabezpečenie tovaru na objednávku.',
    },
    {
      icon: Shield,
      title: 'Overené značky',
      description: 'Len kvalitní výrobcovia.',
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
            alt="Royal Stroje - Predaj techniky"
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
              <span className="text-orange-primary">Predaj</span> náradia, stavebných strojov a príslušenstva
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Všetko pre stavbu a dielňu priamo na prevádzke v Senci.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative pt-6 pb-16 md:py-16 bg-zinc-950 overflow-hidden min-h-screen">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Categories Grid */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-10">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 leading-tight">
                <span className="text-orange-primary">Kamenný</span><br className="md:hidden" /> predaj náradia a techniky
              </h1>
              <p className="text-white/70 text-sm md:text-xl lg:text-2xl font-medium">
                Kvalitné náradie a stroje, ktoré máme overené aj v našej požičovni.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative">
                      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-orange-primary/50 transition-all">
                          <IconComponent className="text-orange-primary" size={24} />
                        </div>
                        <div className="flex-1 pt-1">
                          <h3 className="text-base md:text-3xl font-black text-white mb-1 md:mb-2 group-hover:text-orange-primary/90 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-white/85 text-xs md:text-xl leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-2 mt-3 md:mt-4">
                        {category.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 md:gap-2 bg-zinc-950/50 rounded-lg px-2 py-1.5 md:px-3 md:py-2.5 border border-white/5 group-hover:border-orange-primary/20 transition-colors"
                          >
                            <span className="text-orange-primary text-xs md:text-base mt-0.5 flex-shrink-0">▸</span>
                            <span className="text-white/80 text-xs md:text-lg leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Intro Section */}
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-6 leading-tight">
              Overené značky, <span className="text-orange-primary">férové ceny</span>
            </h2>
            <div className="max-w-5xl mx-auto">
              <p className="text-white/90 text-sm md:text-lg lg:text-xl mb-4 md:mb-8 leading-relaxed">
                Na sklade je náradie, remeselnícke potreby a vybrané kusy stavebnej mechanizácie. K dispozícii je aj široký výber príslušenstva – diamantové vrtáky, rezné a diamantové kotúče rôznych priemerov a ďalší spotrebný materiál za <span className="text-orange-primary font-bold">výhodné ceny</span>.
              </p>
            </div>
          </div>

          {/* BOZP Banner */}
          <div className="mb-6 md:mb-12 p-4 md:p-8 bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl relative overflow-hidden hover:border-orange-primary/30 hover:bg-zinc-900/40 transition-all duration-300 max-w-4xl mx-auto">
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-primary/6 rounded-full blur-3xl"
            ></div>
            <div className="relative flex items-start gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="text-orange-primary w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
              </div>
              <div>
                <h3 className="text-base md:text-2xl font-bold text-white mb-1.5 md:mb-2.5">
                  Bezpečnosť na prvom mieste
                </h3>
                <p className="text-white/75 text-xs md:text-base leading-relaxed">
                  Súčasťou ponuky je aj bezpečnostné vybavenie: <span className="text-orange-primary font-semibold">reflexné vesty, gurtne, ochranné rukavice a ochranné okuliare</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Advantages Cards - Integrated */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {advantages.map((advantage, idx) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-orange-primary/20 rounded-xl p-3 md:p-5 hover:border-orange-primary/50 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-primary/10 transition-all group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                    <IconComponent className="text-orange-primary" size={20} />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1 md:mb-1.5">{advantage.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-snug">{advantage.description}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Service Banner */}
          <div className="mb-6 md:mb-12 p-4 md:p-8 bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl relative overflow-hidden hover:border-orange-primary/30 hover:bg-zinc-900/40 transition-all duration-300">
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-orange-primary/6 rounded-full blur-3xl"
            ></div>
            <div className="relative flex items-start gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/20 flex items-center justify-center flex-shrink-0">
                <Zap className="text-orange-primary w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
              </div>
              <div>
                <h3 className="text-base md:text-2xl font-bold text-white mb-1.5 md:mb-2.5">
                  Rýchlo, pohodlne, spoľahlivo
                </h3>
                <p className="text-white/75 text-xs md:text-base leading-relaxed">
                  Nákup prebieha bez zbytočného čakania. Tovar, ktorý nie je aktuálne skladom, je možné okamžite objednať a po dohode zabezpečiť <span className="text-orange-primary font-semibold">expresné doručenie</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Content */}
          <div className="mt-10 md:mt-20">
            <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-black text-white mb-3 md:mb-6">
              Zastavte sa v našej <span className="text-orange-primary">predajni</span>
            </h2>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-12 max-w-6xl mx-auto">
            {/* Opening Hours */}
            <div className="bg-zinc-900/50 backdrop-blur border border-orange-primary/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:border-orange-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/10 transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-base md:text-lg mb-1.5 md:mb-2">Otváracie hodiny</h3>
              <p className="text-orange-primary font-semibold text-lg md:text-xl mb-1">Po - Pi</p>
              <p className="text-white/70 text-sm md:text-base">7:00 - 16:00</p>
            </div>

            {/* Address */}
            <div className="bg-zinc-900/50 backdrop-blur border border-orange-primary/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:border-orange-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/10 transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-base md:text-lg mb-1.5 md:mb-2">Adresa predajne</h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Recká cesta 182<br />
                <span className="text-orange-primary">925 26 Senec</span>
              </p>
            </div>

            {/* Contact */}
            <div className="bg-zinc-900/50 backdrop-blur border border-orange-primary/20 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:border-orange-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/10 transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <Phone className="text-orange-primary w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-white font-bold text-base md:text-lg mb-1.5 md:mb-2">Kontakt</h3>
              <p className="text-white/90 text-sm md:text-base mb-1">
                <a href="tel:+421948555551" className="hover:text-orange-primary transition-colors">
                  +421 948 555 551
                </a>
              </p>
              <p className="text-white/70 text-xs md:text-sm">
                <a href="mailto:info@royalstroje.sk" className="hover:text-orange-primary transition-colors">
                  info@royalstroje.sk
                </a>
              </p>
            </div>
          </div>

            {/* Benefits Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-10">
              <div className="flex items-center gap-1.5 md:gap-2 bg-orange-primary/10 border border-orange-primary/30 rounded-full px-3 py-2 md:px-5 md:py-2.5">
                <span className="text-orange-primary text-base md:text-lg">✓</span>
                <span className="text-white/90 font-medium text-xs md:text-sm">Odborné poradenstvo</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-orange-primary/10 border border-orange-primary/30 rounded-full px-3 py-2 md:px-5 md:py-2.5">
                <span className="text-orange-primary text-base md:text-lg">✓</span>
                <span className="text-white/90 font-medium text-xs md:text-sm">Tovar na predvádzku</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-orange-primary/10 border border-orange-primary/30 rounded-full px-3 py-2 md:px-5 md:py-2.5">
                <span className="text-orange-primary text-base md:text-lg">✓</span>
                <span className="text-white/90 font-medium text-xs md:text-sm">Bezplatné parkovanie</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-lg rounded-full hover:scale-105 transition-all shadow-2xl shadow-orange-primary/40 hover:shadow-orange-primary/60"
              >
                <Phone className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="mailto:info@royalstroje.sk"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-zinc-900 border border-zinc-700 md:border-2 text-white font-bold text-sm md:text-lg rounded-full hover:bg-zinc-800 hover:border-orange-primary/50 transition-all"
              >
                <Mail className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                <span>Napísať email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
