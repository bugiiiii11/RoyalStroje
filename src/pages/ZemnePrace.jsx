import { Phone, Mail, Hammer, Wrench, Drill, Tractor, CircleDot, Truck } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { useInView } from '../hooks/useInView';

export default function ZemnePrace() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();
  const [ctaRef, ctaInView] = useInView();
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
      <PageHero
        eyebrow="Zemné práce"
        title={<>Zemné a búracie práce</>}
        subtitle="Výkopy základov, prípojky inžinierskych sietí, búracie práce s hydraulickým kladivom, terénne úpravy a odvoz odpadu."
        image="/hero-pozicovna.webp"
        imageAlt="Royal Stroje - Zemné a búracie práce"
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
            <span className="eyebrow eyebrow--center mb-4">Zemné práce</span>
            <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4 mt-4">
              Kompletné <span className="text-orange-primary">zemné práce</span>
            </h1>
            <p className={`text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
              Profesionálne služby pre všetky typy projektov
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className={`bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm shadow-zinc-900/5 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/10 transition-all duration-300 group reveal stagger-${index + 1} ${gridInView ? 'in-view' : ''}`}
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

      {/* CTA Section */}
      <section className="py-16" style={{ background: '#FAFAFA' }}>
        <div ref={ctaRef} className={`max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center reveal-scale ${ctaInView ? 'in-view' : ''}`}>
          <span className="eyebrow eyebrow--center mb-4">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 mt-4">
            Potrebujete zemné alebo búracie práce?
          </h2>
          <p className="text-zinc-700 text-lg mb-8 max-w-2xl mx-auto">
            Zavolajte nám ešte dnes – dohodneme obhliadku a termín v najbližšom možnom čase.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="text-orange-primary">✓</span> Obhliadka je ZDARMA
            </span>
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="text-orange-primary">✓</span> Transparentné ceny
            </span>
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="text-orange-primary">✓</span> Rýchle termíny
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
