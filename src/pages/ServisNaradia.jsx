import { Phone, Mail, Wrench, Settings, Cog, Zap, ClipboardCheck, Sparkles } from 'lucide-react';

export default function ServisNaradia() {
  const services = [
    {
      id: 'opravy-strojov',
      icon: Wrench,
      title: 'Opravy strojov',
      description: 'Profesionálne opravy stavebného náradia a mechanizácie všetkých značiek.',
      features: ['Diagnostika porúch', 'Výmena dielov', 'Nastavenie strojov', 'Testovanie funkčnosti'],
    },
    {
      id: 'preventivna-udrzba',
      icon: Settings,
      title: 'Preventívna údržba',
      description: 'Pravidelné kontroly a údržba pre predĺženie životnosti vašich strojov.',
      features: ['Pravidelné kontroly', 'Výmena olejov', 'Čistenie filtrov', 'Nastavenie parametrov'],
    },
    {
      id: 'nahradne-diely',
      icon: Cog,
      title: 'Náhradné diely',
      description: 'Originálne a kompatibilné náhradné diely pre všetky typy strojov.',
      features: ['Originálne diely', 'Rýchle dodanie', 'Overená kvalita', 'Garancie na diely'],
    },
    {
      id: 'expresny-servis',
      icon: Zap,
      title: 'Expresný servis',
      description: 'Rýchle opravy priamo na stavbe alebo v našom servise do 24 hodín.',
      features: ['Servis na stavbe', 'Non-stop linka', 'Odvoz/dovoz stroja', 'Náhradný stroj'],
    },
    {
      id: 'revize-kontroly',
      icon: ClipboardCheck,
      title: 'Revízie a kontroly',
      description: 'Pravidelné revízie elektrického náradia a pracovných plošín.',
      features: ['Elektrické revízie', 'Plošiny BOZP', 'Certifikáty', 'Dokumentácia'],
    },
    {
      id: 'predpredajny-servis',
      icon: Sparkles,
      title: 'Predpredajný servis',
      description: 'Kompletná príprava a kontrola strojov pred každým zapožičaním.',
      features: ['Kontrola funkčnosti', 'Čistenie strojov', 'Doplnenie paliva', 'Bezpečnostné kontroly'],
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
            alt="Royal Stroje - Servis náradia"
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
              Servis náradia
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Profesionálny servis a údržba stavebného náradia a techniky. Opravy, kontroly a náhradné diely.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Komplexný <span className="text-orange-primary">servis a údržba</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Udržujeme vaše stroje v perfektnom stave
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

      {/* Why Us Section */}
      <section className="py-16 bg-zinc-900/30">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Prečo si vybrať náš <span className="text-orange-primary">servis</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Wrench className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">Skúsení technici</h3>
              <p className="text-white/60 text-sm">Certifikovaní servisní technici s 10+ rokmi praxe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">Rýchle termíny</h3>
              <p className="text-white/60 text-sm">Expresný servis do 24 hodín</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Settings className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">Kvalitné diely</h3>
              <p className="text-white/60 text-sm">Len originálne a overené náhradné diely</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Phone className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-white font-bold mb-2">Férové ceny</h3>
              <p className="text-white/60 text-sm">Transparentné ceny bez skrytých poplatkov</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-900/50 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Potrebujete servis alebo opravu?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktujte nás a náš technik vám poradí najlepšie riešenie.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Diagnostika ZDARMA
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Garancie na prácu
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="text-orange-primary">✓</span> Non-stop podpora
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
