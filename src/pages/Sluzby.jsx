import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Wrench, Truck, GraduationCap, Phone, PackageSearch } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import { useInView } from '../hooks/useInView';

export default function Sluzby() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const services = [
    {
      id: 'prenajom',
      path: '/#katalog',
      icon: Wrench,
      title: 'Prenájom techniky',
      description: 'Malé náradie, stredná a ťažká mechanizácia. Prenájom od 1 dňa s dovozom na stavbu.',
      features: ['Expresný dovoz', 'Nonstop podpora', 'Senec - Bratislava - okolie', 'Od 1 dňa prenájmu'],
      backgroundImage: '/pictures/graphics/hero4.webp',
    },
    {
      id: 'predaj-techniky',
      path: '/sluzby/predaj-techniky',
      icon: ShoppingCart,
      title: 'Predaj náradia a príslušenstva',
      description: 'Kvalitné náradie, mechanizácia a príslušenstvo značkových výrobcov priamo na sklade v Senci.',
      features: ['Overené značky', 'Férové ceny', 'Tovar skladom', 'Expresné dodanie'],
      backgroundImage: '/pictures/graphics/predaj.webp',
    },
    {
      id: 'nahradne-diely',
      path: '/sluzby/nahradne-diely',
      icon: Package,
      title: 'Predaj náhradných dielov',
      description: 'Široký sortiment originálnych náhradných dielov pre stavebné náradie. Skladom diely pre všetky typy strojov a zariadení.',
      features: ['Originálne diely', 'Skladová dostupnosť', 'Odborné poradenstvo', 'Expresná objednávka'],
      backgroundImage: '/pictures/graphics/servis.webp',
    },
    {
      id: 'dovoz-techniky',
      path: '/sluzby/dovoz-techniky',
      icon: Truck,
      title: 'Dovoz techniky na stavbu',
      description: 'Naložíme, privezieme a vyložíme techniku priamo na vašej stavbe. Načas, spoľahlivo a po celom okolí.',
      features: ['Dovoz do 24 hodín', 'Naloženie aj vyloženie', 'Senec · Bratislava · okolie', 'Vlastná flotila'],
      backgroundImage: '/pictures/graphics/dovoz.webp',
    },
    {
      id: 'zabezpecenie-techniky',
      path: '/sluzby/zabezpecenie-techniky',
      icon: PackageSearch,
      title: 'Zoženieme akýkoľvek stroj',
      description: 'Nemáte stroj v našej ponuke? Zabezpečíme ho cez sieť overených partnerov — vrátane dopravy. Vy fakturujete len nám.',
      features: ['Overení partneri', 'Rýchle zabezpečenie', 'Jeden kontakt', 'Doprava na stavbu'],
      backgroundImage: '/pictures/graphics/stroje-dvor.webp',
    },
    {
      id: 'skolenie-obsluhy',
      path: '/sluzby/skolenie-obsluhy',
      icon: GraduationCap,
      title: 'Školenie obsluhy strojov',
      description: 'Získajte platný preukaz obsluhy stavebných strojov. Certifikované kurzy zabezpečujeme v spolupráci s akreditovaným partnerom Alpha Safety.',
      features: ['Certifikované kurzy', 'Akreditovaný partner Alpha Safety', 'Platný preukaz obsluhy', 'Rýchly termín'],
      backgroundImage: '/pictures/graphics/objects3.webp',
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Služby - Prenájom a predaj stavebnej techniky | Royal Stroje Senec</title>
        <meta
          name="description"
          content="Kompletné služby pre stavebníctvo: prenájom techniky, predaj Makita náradia, náhradné diely, dovoz na stavbu. 20 rokov skúseností v Senci."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby" />
        <meta property="og:title" content="Služby - Royal Stroje Senec" />
        <meta property="og:description" content="Prenájom techniky, predaj náradia, náhradné diely. 20 rokov skúseností." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby" />
      </Helmet>

      {/* Hero (desktop, light) */}
      <PageHero
        eyebrow="Služby · Senec"
        title={<>Všetko pre vašu stavbu. <span className="text-orange-primary">Pod jednou strechou.</span></>}
        subtitle="Prenájom stavebnej techniky, predaj náradia, náhradné diely a odborné poradenstvo v Senci."
        image="/pictures/graphics/predajna-1.webp"
        imageAlt="Predajňa a požičovňa Royal Stroje v Senci"
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
          {/* Services section */}
          <div ref={headingRef} className={`text-center mb-6 md:mb-12 pt-16 md:pt-0 reveal ${headingInView ? 'in-view' : ''}`}>
            <span className="eyebrow eyebrow--center mb-4">Naše služby</span>
            <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4 mt-4">
              Čo pre vás <span className="text-orange-primary">môžeme urobiť?</span>
            </h1>
            <p className={`text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
              Profesionálne služby pre stavebné firmy, remeselníkov aj súkromné osoby
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className={`relative bg-white border border-zinc-200 rounded-xl md:rounded-2xl shadow-sm shadow-zinc-900/5 p-4 md:p-8 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/10 transition-all group overflow-hidden reveal stagger-${Math.min(index + 1, 6)} ${gridInView ? 'in-view' : ''}`}
                >
                  {/* Orange top accent rule */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent z-20 opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.backgroundImage}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 brightness-110 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/50"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-orange-primary/20 transition">
                      <IconComponent className="text-orange-primary" size={24} />
                    </div>

                    <h3 className="text-lg md:text-3xl font-black text-zinc-900 mb-2 md:mb-3 group-hover:text-orange-primary transition">
                      {service.title}
                    </h3>

                    <p className="text-zinc-700 text-xs md:text-lg leading-relaxed mb-3 md:mb-6 line-clamp-2 md:line-clamp-none">
                      {service.description}
                    </p>

                    <ul className="space-y-1 md:space-y-2 mb-3 md:mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-base text-zinc-600">
                          <span className="text-orange-primary mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="inline-flex items-center gap-2 text-orange-primary text-base font-bold group-hover:gap-3 transition-all">
                      <span>Viac informácií</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Section - Integrated */}
          <div ref={ctaRef} className={`mt-16 text-center max-w-3xl mx-auto reveal-scale ${ctaInView ? 'in-view' : ''}`}>
            <span className="eyebrow eyebrow--center mb-4">Poradenstvo zdarma</span>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 mt-4">
              Potrebujete poradiť?
            </h2>
            <p className={`text-zinc-700 text-lg mb-8 leading-relaxed reveal-fade stagger-2 ${ctaInView ? 'in-view' : ''}`}>
              Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
            </p>
            <a
              href="tel:+421948555551"
              className={`btn-primary text-base px-8 py-4 reveal-fade stagger-3 ${ctaInView ? 'in-view' : ''}`}
            >
              <Phone size={18} />
              <span>Zavolať teraz: 0948 555 551</span>
            </a>
          </div>

        </div>
      </ContentSection>
    </div>
  );
}
