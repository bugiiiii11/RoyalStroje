import { Phone, Mail, Wrench, Settings, Cog, Zap, ClipboardCheck, Sparkles } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { useInView } from '../hooks/useInView';

export default function ServisNaradia() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();
  const [whyRef, whyInView] = useInView();
  const [ctaRef, ctaInView] = useInView();
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
      {/* Hero Section - Desktop only */}
      <PageHero
        eyebrow="Servis náradia"
        title="Servis náradia"
        subtitle="Profesionálny servis a údržba stavebného náradia a techniky. Opravy, kontroly a náhradné diely."
        image="/hero-pozicovna.webp"
        imageAlt="Royal Stroje - Servis náradia"
        actions={
          <>
            <a href="tel:+421948555551" className="btn-primary">
              <Phone size={16} />
              Zavolať teraz
            </a>
            <a href="/#katalog" className="btn-outline-light px-5 py-3">
              Zobraziť techniku
            </a>
          </>
        }
      />

      {/* Services Grid */}
      <section className="relative py-16 overflow-hidden" style={{ background: '#FAFAFA' }}>
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.webp"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div ref={headingRef} className={`text-center mb-6 md:mb-12 pt-16 md:pt-0 reveal ${headingInView ? 'in-view' : ''}`}>
            <span className="eyebrow eyebrow--center mb-4">Servis náradia</span>
            <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4 mt-4">
              Komplexný <span className="text-orange-primary">servis a údržba</span>
            </h1>
            <p className={`text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
              Udržujeme vaše stroje v perfektnom stave
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`card-light p-6 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/10 transition-all duration-300 group reveal stagger-${index + 1} ${gridInView ? 'in-view' : ''}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                    <IconComponent className="text-orange-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 mb-3">{service.title}</h3>
                  <p className="text-zinc-700 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600">
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
      <section className="relative py-16 overflow-hidden" style={{ background: '#FAFAFA' }}>
        <div ref={whyRef} className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className={`text-center mb-12 reveal ${whyInView ? 'in-view' : ''}`}>
            <span className="eyebrow eyebrow--center mb-4">Výhody</span>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 mt-4">
              Prečo si vybrať náš <span className="text-orange-primary">servis</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`text-center reveal stagger-1 ${whyInView ? 'in-view' : ''}`}>
              <div className="w-16 h-16 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Wrench className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-zinc-900 font-bold mb-2">Skúsení technici</h3>
              <p className="text-zinc-600 text-sm">Certifikovaní servisní technici s 10+ rokmi praxe</p>
            </div>
            <div className={`text-center reveal stagger-2 ${whyInView ? 'in-view' : ''}`}>
              <div className="w-16 h-16 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Zap className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-zinc-900 font-bold mb-2">Rýchle termíny</h3>
              <p className="text-zinc-600 text-sm">Expresný servis do 24 hodín</p>
            </div>
            <div className={`text-center reveal stagger-3 ${whyInView ? 'in-view' : ''}`}>
              <div className="w-16 h-16 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Settings className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-zinc-900 font-bold mb-2">Kvalitné diely</h3>
              <p className="text-zinc-600 text-sm">Len originálne a overené náhradné diely</p>
            </div>
            <div className={`text-center reveal stagger-4 ${whyInView ? 'in-view' : ''}`}>
              <div className="w-16 h-16 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 mx-auto">
                <Phone className="text-orange-primary" size={32} />
              </div>
              <h3 className="text-zinc-900 font-bold mb-2">Férové ceny</h3>
              <p className="text-zinc-600 text-sm">Transparentné ceny bez skrytých poplatkov</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div ref={ctaRef} className={`max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center reveal-scale ${ctaInView ? 'in-view' : ''}`}>
          <span className="eyebrow eyebrow--center mb-4">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 mt-4">
            Potrebujete servis alebo opravu?
          </h2>
          <p className="text-zinc-700 text-lg mb-8 max-w-2xl mx-auto">
            Kontaktujte nás a náš technik vám poradí najlepšie riešenie.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="text-orange-primary">✓</span> Diagnostika ZDARMA
            </span>
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="text-orange-primary">✓</span> Garancie na prácu
            </span>
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="text-orange-primary">✓</span> Non-stop podpora
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+421948555551"
              className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
            >
              <Phone size={20} />
              <span>Zavolať teraz</span>
            </a>
            <a
              href="mailto:info@royalstroje.sk"
              className="btn-outline-light text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
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
