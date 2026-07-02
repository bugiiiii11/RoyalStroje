import { Phone, Mail, Package, Wrench, Clock, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';

export default function NahradneDiely() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
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
      features: ['Identifikácia dielu', 'Montážne rady', 'Bezplatné poradenstvo', '20 rokov skúseností'],
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
      <Helmet>
        <title>Náhradné diely pre stavebné stroje | Royal Stroje Senec</title>
        <meta
          name="description"
          content="Originálne náhradné diely pre stavebné náradie a stroje. Široký sortiment skladom v Senci. Odborné poradenstvo, express dodanie do 48h. 20 rokov skúseností."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/nahradne-diely" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Náhradné diely pre stavebné stroje | Royal Stroje" />
        <meta property="og:description" content="Originálne náhradné diely skladom. Express dodanie do 48h. Odborné poradenstvo." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/nahradne-diely" />
      </Helmet>

      <PageHero
        eyebrow="Náhradné diely"
        title={<>Okamžitý odber alebo dodanie do 48 hodín. <span className="text-orange-primary">Iba originálne diely.</span></>}
        subtitle="Široký sortiment náhradných dielov pre stavebné stroje a náradie. Sklad v Senci."
        image="/hero-pozicovna.webp"
        imageAlt="Royal Stroje - Predaj náhradných dielov"
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

      {/* Main Content Section */}
      <ContentSection light>
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.webp"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Services Grid */}
          <div className="mb-12 md:mb-16">
            <div ref={headingRef} className={`text-center mb-6 md:mb-12 pt-16 md:pt-0 reveal ${headingInView ? 'in-view' : ''}`}>
              <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4">
                Náhradné diely skladom. <span className="text-orange-primary">Originál, rýchlo.</span>
              </h1>
              <p className={`text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
                Originálne diely pre stavebné náradie. Express dodanie.
              </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 group reveal stagger-${index + 1} ${gridInView ? 'in-view' : ''}`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                      <IconComponent className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{service.title}</h3>
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
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
          <div ref={stepsRef} className="mb-16">
            <div className={`text-center mb-12 reveal ${stepsInView ? 'in-view' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
                Ako objednať <span className="text-orange-primary">náhradný diel?</span>
              </h2>
              <p className="text-zinc-700 max-w-2xl mx-auto mb-8">
                Od identifikácie po dodanie - 4 jednoduché kroky
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-1 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  1
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Identifikácia</h3>
                <p className="text-zinc-400 text-sm">
                  Kontaktujte nás s označením stroja alebo dielu
                </p>
              </div>
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-2 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  2
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Overenie</h3>
                <p className="text-zinc-400 text-sm">
                  Overíme dostupnosť a cenu dielu
                </p>
              </div>
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-3 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  3
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Objednávka</h3>
                <p className="text-zinc-400 text-sm">
                  Potvrdíte objednávku a spôsob platby
                </p>
              </div>
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-4 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-xl">
                  4
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Dodanie</h3>
                <p className="text-zinc-400 text-sm">
                  Odber skladom alebo dovoz do 48 hodín
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <CtaBand
            eyebrow="Kontakt"
            title="Hľadáte náhradný diel?"
            text="Zavolejte nám a pomôžeme vám nájsť správny diel."
            icon={Package}
            actions={
              <>
                <a
                  href="tel:+421948555551"
                  className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
                >
                  <Phone size={20} />
                  <span>Zavolať teraz</span>
                </a>
                <a
                  href="mailto:info@royalstroje.sk"
                  className="btn-secondary text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
                >
                  <Mail size={20} />
                  <span>Napísať email</span>
                </a>
              </>
            }
          />
        </div>
      </ContentSection>
    </div>
  );
}
