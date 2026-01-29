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
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
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
              Všetko pre stavbu a dielňu priamo na prevádzke <span className="text-orange-primary">v Senci</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
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
          {/* Intro Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Overené značky, <span className="text-orange-primary">férové ceny</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-white/80 text-lg leading-relaxed">
              <p>
                Na sklade je náradie, remeselnícke potreby a vybrané kusy stavebnej mechanizácie. K dispozícii je aj široký výber príslušenstva – diamantové vrtáky, rezné a diamantové kotúče rôznych priemerov a ďalší spotrebný materiál <span className="text-orange-primary font-bold">výhodné ceny</span>.
              </p>
              <p>
                Súčasťou ponuky je aj bezpečnostné vybavenie: reflexné vesty, gurtne, ochranné rukavice a ochranné okuliare.
              </p>
            </div>
          </div>

          {/* Quick Service Banner */}
          <div className="mb-16 p-8 bg-gradient-to-r from-orange-primary/10 to-orange-primary/5 border-l-4 border-orange-primary rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-primary/20 border border-orange-primary/40 flex items-center justify-center flex-shrink-0">
                <Zap className="text-orange-primary" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Rýchlo, pohodlne, spoľahlivo
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Nákup prebieha bez zbytočného čakania. Tovar, ktorý nie je aktuálne skladom, je možné okamžite objednať a po dohode zabezpečiť <span className="text-orange-primary font-bold">expresné doručenie</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                <span className="text-orange-primary">Kamenný predaj</span> náradia a techniky
              </h2>
              <p>
                Kvalitné náradie a stroje, ktoré máme overené aj v našej požičovni.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                      <IconComponent className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{category.title}</h3>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                          <span className="text-orange-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
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

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Prečo nakupovať <span className="text-orange-primary">u nás</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, idx) => {
              const IconComponent = advantage.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="text-orange-primary" size={32} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{advantage.title}</h3>
                  <p className="text-white/60 text-sm">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Zastavte sa v našej <span className="text-orange-primary">predajni</span>
          </h2>
          <p className="text-white/70 text-lg mb-4 max-w-2xl mx-auto">
            Naša predajňa v Senci je otvorená Po - Pi od 7:00 do 16:00.
          </p>
          <p className="text-white/60 mb-8">
            Recká cesta 182, 925 26 Senec
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Odborné poradenstvo
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Tovar na predvádzku
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Bezplatné parkovanie
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
            >
              <Phone size={20} />
              <span>Zavolať teraz</span>
            </a>
            <a
              href="mailto:info@royalstroje.sk"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
            >
              <Mail size={20} />
              <span>Napísať email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
