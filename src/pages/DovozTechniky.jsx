import { Phone, Mail, Truck, RefreshCw, Zap, TruckIcon, Package, Shield, MapPin, Lightbulb } from 'lucide-react';

export default function DovozTechniky() {
  const services = [
    {
      id: 'dovoz-na-stavbu',
      icon: Truck,
      title: 'Dovoz na stavbu',
      description: 'Rýchly a spoľahlivý dovoz náradia a techniky priamo na vašu stavbu.',
      features: ['Dovoz do 24 hodín', 'Celé Slovensko', 'Presný termín', 'Asistenčná služba'],
    },
    {
      id: 'odvoz-po-skonceni',
      icon: RefreshCw,
      title: 'Odvoz po skončení',
      description: 'Odvoz techniky zo stavby po skončení prenájmu. Flexibilné termíny.',
      features: ['Flexibilný čas', 'Víkendy a sviatky', 'Predĺženie prenájmu', 'Bezplatný odvoz'],
    },
    {
      id: 'express-doprava',
      icon: Zap,
      title: 'Express doprava',
      description: 'Expresné doručenie v prípade havárie alebo poruchy stroja na stavbe.',
      features: ['Non-stop dostupnosť', 'Náhradný stroj', 'Do 4 hodín', 'Prioritná podpora'],
    },
    {
      id: 'preprava-tazka-mechanizacia',
      icon: TruckIcon,
      title: 'Preprava ťažkej mechanizácie',
      description: 'Preprava bagrov, rýpadiel a inej ťažkej techniky na stavbu.',
      features: ['Vlastné podvalníky', 'Skúsení vodiči', 'Povolenia a dokumenty', 'Naloženie/vyloženie'],
    },
    {
      id: 'skladovanie',
      icon: Package,
      title: 'Skladovanie techniky',
      description: 'Krátkodobé alebo dlhodobé skladovanie vašej techniky.',
      features: ['Strážený areál', 'Prístrešky', 'Nabíjanie batérií', 'Dohľad technikov'],
    },
    {
      id: 'poistenie-prepravy',
      icon: Shield,
      title: 'Poistenie prepravy',
      description: 'Plné poistenie techniky počas prepravy na stavbu a späť.',
      features: ['Havarijné poistenie', 'Odcudzenie', 'Škody pri preprave', 'Bez rizika'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[33vh] min-h-[300px] flex items-center overflow-hidden border-b border-white/10">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Dovoz techniky"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-orange-primary/20 border border-orange-primary/40 backdrop-blur-sm rounded-full text-orange-primary text-xs md:text-sm font-bold uppercase mb-4 tracking-wide">
              Naše služby
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Dovoz techniky
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Rýchla a spoľahlivá doprava náradia a techniky priamo na vašu stavbu. Dovoz do 24 hodín.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Komplexné <span className="text-orange-primary">dopravné služby</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Dovoz a odvoz techniky kedykoľvek potrebujete
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

      {/* Pricing Info Section */}
      <section className="py-16 bg-zinc-900/30">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Transparentné <span className="text-orange-primary">cenníky</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Cena dopravy závisí od vzdialenosti a typu techniky
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 mx-auto">
                <MapPin className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Do 20 km</h3>
              <p className="text-orange-primary text-2xl font-black mb-2">ZDARMA</p>
              <p className="text-white/60 text-sm">Pri prenájme nad 3 dni</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 mx-auto">
                <Truck className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">20-50 km</h3>
              <p className="text-orange-primary text-2xl font-black mb-2">0,50 €/km</p>
              <p className="text-white/60 text-sm">Malé náradie a stroje</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 mx-auto">
                <TruckIcon className="text-orange-primary" size={28} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Nad 50 km</h3>
              <p className="text-orange-primary text-2xl font-black mb-2">Dohodou</p>
              <p className="text-white/60 text-sm">Individuálna cena</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-start gap-3 bg-orange-primary/10 border border-orange-primary/30 rounded-xl px-6 py-4 max-w-3xl">
              <div className="w-8 h-8 rounded-lg bg-orange-primary/20 border border-orange-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="text-orange-primary" size={18} />
              </div>
              <p className="text-white/90 text-sm text-left">
                <strong className="text-white">Tip:</strong> Pri dlhšom prenájme (nad 7 dní) alebo opakovanej spolupráci
                ponúkame <strong className="text-orange-primary">dopravu ZDARMA</strong> aj na väčšie vzdialenosti!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-900/50 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Potrebujete dopravu techniky?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Zavolajte nám a dohodneme presný termín dovozu priamo na vašu stavbu.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Dovoz do 24 hodín
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Non-stop linka
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Celé Slovensko
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
