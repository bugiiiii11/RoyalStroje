import { Phone, Mail, Package, Wrench, Clock, Shield, CheckCircle, Lightbulb } from 'lucide-react';

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
      features: ['Okamžitý odber', 'Veľký sklad', 'Rezervácia online', 'Express objednávka'],
    },
    {
      id: 'odberne-poradenstvo',
      icon: Wrench,
      title: 'Odborné poradenstvo',
      description: 'Pomôžeme vám nájsť správny náhradný diel pre váš stroj.',
      features: ['Skúsení technici', 'Identifikácia dielu', 'Montážne rady', 'Bezplatné poradenstvo'],
    },
    {
      id: 'rychle-dodanie',
      icon: Clock,
      title: 'Rýchle dodanie',
      description: 'Ak nemáme diel skladom, objednáme a dodáme do 48 hodín.',
      features: ['Express objednávka', 'Sledovanie zásielky', 'SMS notifikácie', 'Dovoz na stavbu'],
    },
    {
      id: 'servisne-balicky',
      icon: CheckCircle,
      title: 'Servisné balíčky',
      description: 'Kompletné servisné sady pre pravidelné údržby vašej techniky.',
      features: ['Filtre a oleje', 'Opotrebované diely', 'Zvýhodnené ceny', 'Servisné manuály'],
    },
    {
      id: 'garancia-zaruka',
      icon: Shield,
      title: 'Garancia a záruka',
      description: 'Všetky diely s plnou zárukou výrobcu a možnosťou vrátenia.',
      features: ['Záruka 24 mesiacov', 'Výmena vadného dielu', '14 dní na vrátenie', 'Certifikát pravosti'],
    },
  ];

  const partners = [
    {
      name: 'Makita',
      logo: '/pictures/brands/makita.png',
      description: 'Profesionálne elektrické náradie',
    },
    {
      name: 'Bosch',
      logo: '/pictures/brands/bosch.png',
      description: 'Prémiové náradie a príslušenstvo',
    },
    {
      name: 'Hilti',
      logo: '/pictures/brands/hilti.png',
      description: 'Stavebná technika a náradie',
    },
    {
      name: 'Stihl',
      logo: '/pictures/brands/stihl.png',
      description: 'Motorové píly a záhradná technika',
    },
    {
      name: 'DeWalt',
      logo: '/pictures/brands/dewalt.png',
      description: 'Profesionálne akumulátorové náradie',
    },
    {
      name: 'Milwaukee',
      logo: '/pictures/brands/milwaukee.png',
      description: 'Ťažké profesionálne náradie',
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
              Predaj náhradných dielov
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Široký sortiment originálnych náhradných dielov pre stavebné náradie a techniku. Skladom diely pre všetky typy strojov.
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
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Services Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Komplexný servis <span className="text-orange-primary">náhradných dielov</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Od identifikácie po dodanie - postaráme sa o všetko
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

          {/* Partners Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Naši <span className="text-orange-primary">partneri</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Spolupracujeme s prémiovými značkami stavebného náradia a techniky
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group text-center flex flex-col items-center justify-center"
                >
                  <div className="w-full h-20 flex items-center justify-center mb-3">
                    <div className="text-white/80 font-black text-2xl group-hover:text-orange-primary transition-colors">
                      {partner.name}
                    </div>
                  </div>
                  <p className="text-white/50 text-xs leading-tight">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-start gap-3 bg-orange-primary/10 border border-orange-primary/30 rounded-xl px-6 py-4 max-w-3xl">
                <div className="w-8 h-8 rounded-lg bg-orange-primary/20 border border-orange-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="text-orange-primary" size={18} />
                </div>
                <p className="text-white/90 text-sm text-left">
                  <strong className="text-white">Nenašli ste značku?</strong> Objednávame diely aj pre ďalšie značky na vyžiadanie.
                  Kontaktujte nás a overíme dostupnosť.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ako to <span className="text-orange-primary">funguje?</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Jednoduchý proces objednávky náhradných dielov
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
              Potrebujete náhradný diel?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Kontaktujte nás a pomôžeme vám nájsť správny diel pre váš stroj.
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
