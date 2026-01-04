import { Phone, Mail, Hammer, Wrench, Drill, Tractor, CircleDot, Truck } from 'lucide-react';

export default function ZemnePrace() {
  const services = [
    {
      id: 'vykopy-zaklady',
      icon: Hammer,
      title: 'Výkopy a základy',
      description: 'Výkopy základov, bazénov, pivníc, žúmp a ČOV. Práca s presnosťou na milimetre.',
      features: ['Základy domov', 'Bazény', 'Pivnice', 'Žumpy a ČOV'],
    },
    {
      id: 'inzinierske-siete',
      icon: Wrench,
      title: 'Inžinierske siete',
      description: 'Vodovodné a kanalizačné prípojky. Šachty, montážne jamy, uloženie sietí.',
      features: ['Vodovod', 'Kanalizácia', 'Plyn', 'Elektroinštalácie'],
    },
    {
      id: 'buracie-prace',
      icon: Drill,
      title: 'Búracie práce',
      description: 'Demolácia s hydraulickým kladivom. Bezpečné a efektívne búranie konštrukcií.',
      features: ['Búranie stien', 'Hydraulické kladivo', 'Demolácia objektov', 'Spevnené plochy'],
    },
    {
      id: 'terenne-upravy',
      icon: Tractor,
      title: 'Terénne úpravy',
      description: 'Zrovnávanie pozemkov, planírovanie. Sadové úpravy, odvodnenie.',
      features: ['Planírovanie', 'Odvodnenie', 'Terasy', 'Záhrady'],
    },
    {
      id: 'vrtanie-stolpikov',
      icon: CircleDot,
      title: 'Vŕtanie stĺpikov',
      description: 'Presné vŕtanie dier pre plotové stĺpiky. Vrtáky Ø 300 / 400 mm.',
      features: ['Ploty', 'Pergoly', 'Prístrešky', 'Brány'],
    },
    {
      id: 'odvoz-dovoz',
      icon: Truck,
      title: 'Odvoz a dovoz',
      description: 'Likvidácia odpadu kontajnermi 3–10 m³. Dovoz štrku, piesku, makadamu.',
      features: ['Odvoz sute', 'Dovoz materiálu', 'Kontajnery', 'Preprava'],
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
            alt="Royal Stroje - Zemné a búracie práce"
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
              Zemné a búracie práce
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Výkopy základov, prípojky inžinierskych sietí, búracie práce s hydraulickým kladivom, terénne úpravy a odvoz odpadu.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Kompletné <span className="text-orange-primary">zemné práce</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Profesionálne služby pre všetky typy projektov
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                    <IconComponent className="text-orange-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="text-orange-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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
            Potrebujete zemné alebo búracie práce?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Zavolajte nám ešte dnes – dohodneme obhliadku a termín v najbližšom možnom čase.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Obhliadka je ZDARMA
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Transparentné ceny
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Rýchle termíny
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
