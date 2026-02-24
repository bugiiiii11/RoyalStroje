import { Phone, Mail, Package, Wrench, Clock, Shield } from 'lucide-react';

export default function NahradneDiely() {
  const services = [
    {
      id: 'originalne-diely',
      icon: Shield,
      title: 'Originálne diely',
      description: 'Iba originálne náhradné diely priamo od výrobcov techniky.',
      features: ['Záruka kvality', 'Certifikované diely', 'Dlhá životnosť', 'Plná kompatibilita'],
    },
    {
      id: 'skladova-dostupnost',
      icon: Package,
      title: 'Skladová dostupnosť',
      description: 'Najžiadanejšie náhradné diely priamo na sklade v Senci.',
      features: ['Okamžitý odber', 'Veľký sklad', 'Rezervácia telefonicky', 'Express objednávka'],
    },
    {
      id: 'odberne-poradenstvo',
      icon: Wrench,
      title: 'Odborné poradenstvo',
      description: 'Pomôžeme vám nájsť správny náhradný diel pre váš stroj.',
      features: ['Identifikácia dielu', 'Montážne rady', 'Bezplatné poradenstvo', '12 rokov skúseností'],
    },
    {
      id: 'rychle-dodanie',
      icon: Clock,
      title: 'Rýchle dodanie',
      description: 'Ak nemáme diel skladom, objednáme a dodáme do 48 hodín.',
      features: ['Dodanie do 48h', 'Dovoz na stavbu', 'Senec - Bratislava', 'SMS notifikácie'],
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
            alt="Royal Stroje - Predaj náhradných dielov"
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
              Náhradné diely skladom. <span className="text-orange-primary">Originál, rýchlo.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Originálne diely pre stavebné stroje a náradie. Express dodanie do 48 hodín.
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

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Services Grid */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-12 pt-16 md:pt-0">
              <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
                Náhradné diely skladom. <span className="text-orange-primary">Originál, rýchlo.</span>
              </h1>
              <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
                Originálne diely pre stavebné náradie. Express dodanie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ako objednať <span className="text-orange-primary">náhradný diel?</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Od identifikácie po dodanie - 4 jednoduché kroky
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  1
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Identifikácia</h3>
                <p className="text-white/60 text-sm">
                  Kontaktujte nás s označením stroja alebo dielu
                </p>
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  2
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Overenie</h3>
                <p className="text-white/60 text-sm">
                  Overíme dostupnosť a cenu dielu
                </p>
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  3
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Objednávka</h3>
                <p className="text-white/60 text-sm">
                  Potvrdíte objednávku a spôsob platby
                </p>
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  4
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Dodanie</h3>
                <p className="text-white/60 text-sm">
                  Odber skladom alebo dovoz do 48 hodín
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Hľadáte náhradný diel?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Zavolejte nám a pomôžeme vám nájsť správny diel.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 text-white/70">
                <span className="text-orange-primary">✓</span> Originálne diely
              </span>
              <span className="flex items-center gap-2 text-white/70">
                <span className="text-orange-primary">✓</span> Skladom
              </span>
              <span className="flex items-center gap-2 text-white/70">
                <span className="text-orange-primary">✓</span> Express dodanie
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
        </div>
      </section>
    </div>
  );
}
