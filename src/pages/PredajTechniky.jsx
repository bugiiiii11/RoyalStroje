import { Phone, MessageCircle, ShoppingCart, Package, Tag, Zap, Shield, Wrench, HardHat, Truck, Clock, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContentSection from '../components/common/ContentSection';

export default function PredajTechniky() {
  // Akciové produkty - Jarná akcia
  const promoProducts = [
    {
      id: 'makita-tw001gm201',
      name: 'Makita TW001GM201',
      subtitle: 'Rázový uťahovák 40V XGT',
      price: '690',
      image: '/pictures/graphics/utahovak-transparent.webp',
      specs: [
        { label: 'Povoľovací moment', value: '2000 Nm' },
        { label: 'Uťahovací moment', value: '1630 Nm' },
        { label: 'Príslušenstvo', value: '2× batéria 4,0Ah + nabíjačka' },
      ],
      blogLink: '/blog/makita-tw001gm201-razovy-utahovak-extremny-vykon',
    },
    {
      id: 'diamantovy-kotuc-tornado',
      name: 'Diamantový kotúč 450mm',
      subtitle: 'Tornado Laser - profesionálny',
      price: '179',
      image: '/pictures/graphics/diamantovy-kotuc-transparent.webp',
      specs: [
        { label: 'Typ', value: 'Laserovaný diamantový kotúč' },
        { label: 'Priemer / otvor', value: '450 mm / 25,4 mm' },
        { label: 'Použitie', value: 'Betón, armovaný betón' },
        { label: 'Segment', value: '10 mm' },
      ],
      blogLink: null,
    },
    {
      id: 'nivel-cl3g',
      name: 'NIVEL CL3G',
      subtitle: 'Krížový laser so zeleným lúčom',
      price: '406',
      image: '/pictures/graphics/laser-transparent.webp',
      specs: [
        { label: 'Laser', value: '3× 360° rovina (zelený lúč)' },
        { label: 'Presnosť', value: '2,0 mm / 10 m' },
        { label: 'Príslušenstvo', value: 'Statív + lata' },
      ],
      blogLink: '/blog/nivel-cl3g-krizovy-laser-zeleny-profesionalny-nastroj',
    },
  ];

  const categories = [
    {
      id: 'naradie',
      icon: Wrench,
      title: 'Profesionálne náradie',
      description: 'Všetko potrebné k práci – rýchlo, priamo na prevádzke.',
      items: ['Remeselnícke pomôcky', 'Elektrické náradie', 'AKU ručné náradie', 'Meracie prístroje'],
      delivery: 'Vybrané skladom, ostatné do 24h',
      deliveryIcon: Clock,
    },
    {
      id: 'stavebna-mechanizacia',
      icon: Package,
      title: 'Stavebná mechanizácia',
      description: 'Predaj vybranej stavebnej techniky. Nová aj používaná technika z našej prevádzky a partnerských dodávok.',
      items: ['Vibračné dosky a nohy', 'Elektrocentrály', 'Rezná technika', 'Doplnková technika pre stavbu'],
      delivery: 'Vybrané skladom, ostatné na objednávku (do 5 dní)',
      deliveryIcon: Truck,
    },
    {
      id: 'prislusenstvo',
      icon: ShoppingCart,
      title: 'Príslušenstvo a spotrebný materiál',
      description: 'Široký výber príslušenstva za výhodné ceny.',
      items: ['Diamantové rezné a brúsne kotúče', 'Príslušenstvo ku elektrickému a aku náradiu', 'Vrtáky', 'Elektródy'],
      delivery: 'Vybrané skladom, ostatné do 24h',
      deliveryIcon: Clock,
    },
    {
      id: 'bozp',
      icon: HardHat,
      title: 'Ochranné pomôcky BOZP',
      description: 'Bezpečnosť na prvom mieste - kompletný sortiment ochranných pomôcok.',
      items: ['Reflexné vesty', 'Ochranné gurtne', 'Ochranné rukavice', 'Ochranné okuliare'],
      delivery: 'Skladom',
      deliveryIcon: Zap,
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
      <Helmet>
        <title>Predaj náradia Makita - Autorizovaný predajca | Royal Stroje Senec</title>
        <meta
          name="description"
          content="Autorizovaný predajca Makita v Senci. Profesionálne náradie, diamantové kotúče, vrtáky a BOZP pomôcky skladom. Férové ceny, odborné poradenstvo. 20 rokov skúseností."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/predaj-techniky" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Predaj náradia Makita | Royal Stroje Senec" />
        <meta property="og:description" content="Autorizovaný predajca Makita. Profesionálne náradie skladom. 20 rokov skúseností." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/predaj-techniky" />
      </Helmet>

      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero5.webp"
            alt="Royal Stroje - Predaj techniky"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Gradient fade na spodok - prechod do content sekcie */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '160px',
            background: 'linear-gradient(to bottom, transparent, #181818)'
          }}
        />

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Predaj náradia<span className="text-orange-primary"> a príslušenstva</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Diamantové kotúče, vrtáky, príslušenstvo a BOZP pomôcky. Férové ceny, odborné poradenstvo a okamžitý odber na prevádzke v Senci.
            </p>
          </div>
        </div>
      </section>

      {/* Separator line between hero and content */}
      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />

      {/* Main Content Section */}
      <ContentSection>
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.webp"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">

          {/* JARNÁ AKCIA - Akciové produkty */}
          <div className="mb-12 md:mb-20 pt-16 md:pt-0">
            <div className="text-center mb-8 md:mb-12">
              <div className="hidden md:inline-flex items-center gap-2 bg-orange-primary/20 border border-orange-primary/50 rounded-full px-4 py-2 mb-4">
                <Tag className="text-orange-primary" size={18} />
                <span className="text-orange-primary font-bold text-sm uppercase tracking-wider">Jarná akcia</span>
              </div>
              <h1 className="text-2xl md:text-5xl font-black text-white mb-3 md:mb-4 leading-tight">
                Akciové produkty <span className="text-orange-primary">skladom</span>
              </h1>
              <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
                Vybrané náradie a príslušenstvo za výhodné ceny. Osobný odber v Senci alebo doručenie cez Packetu.
              </p>
            </div>

            {/* Produkty grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {promoProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-xl overflow-hidden hover:border-orange-primary/80 hover:shadow-xl hover:shadow-orange-primary/40 shadow-lg shadow-black/50 hover:scale-[1.01] transition-all duration-500"
                >
                  {/* Product Image / Placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center p-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-lg" />
                    ) : (
                      <div className="text-center p-4">
                        <Wrench className="text-orange-primary/50 mx-auto mb-2" size={40} />
                        <span className="text-white/30 text-xs">Obrázok produktu</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 md:p-5">
                    <h3 className="text-base md:text-lg font-black text-white mb-0.5 group-hover:text-orange-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-white/60 text-xs mb-3">{product.subtitle}</p>

                    {/* Specs */}
                    <div className="space-y-1.5 mb-4">
                      {product.specs.map((spec, idx) => (
                        <div key={idx} className="flex justify-between text-xs border-b border-white/10 pb-1">
                          <span className="text-white/50">{spec.label}:</span>
                          <span className="text-white/90 font-medium text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl md:text-3xl font-black text-orange-primary">{product.price}</span>
                      <span className="text-white/60 text-base">€</span>
                      <span className="text-white/40 text-xs ml-1">s DPH</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:+421948555551"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-xs rounded-lg hover:scale-105 transition-all shadow-md shadow-orange-primary/30"
                      >
                        <Phone size={14} />
                        <span>Kontaktovať nás</span>
                      </a>
                      {product.blogLink && (
                        <Link
                          to={product.blogLink}
                          className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-zinc-800 border border-white/10 text-white/80 font-medium text-xs rounded-lg hover:bg-zinc-700 hover:border-orange-primary/30 transition-all"
                        >
                          <ExternalLink size={12} />
                          <span>Viac info</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4 leading-tight">
                Kúpte náradie, ktoré používame my. <span className="text-orange-primary">Overené na stavbách.</span>
              </h2>
              <p className="text-white/70 text-sm md:text-lg">
                Predaj náradia a techniky v Senci. To čo používame, to aj predávame. Viac informácií poskytneme telefonicky.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const DeliveryIcon = category.deliveryIcon;
                return (
                  <div
                    key={category.id}
                    className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border border-orange-primary/30 rounded-xl p-4 md:p-5 hover:border-orange-primary/60 hover:shadow-xl hover:shadow-orange-primary/30 shadow-lg shadow-black/50 hover:scale-[1.01] transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 flex items-center justify-center flex-shrink-0 group-hover:border-orange-primary/50 transition-all">
                          <IconComponent className="text-orange-primary" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm md:text-lg font-black text-white mb-0.5 group-hover:text-orange-primary/90 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 mt-3">
                        {category.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 bg-zinc-950/50 rounded-md px-2 py-1.5 border border-white/5 group-hover:border-orange-primary/20 transition-colors"
                          >
                            <span className="text-orange-primary text-xs mt-0.5 flex-shrink-0">▸</span>
                            <span className="text-white/80 text-xs leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery info */}
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-xs">
                          <DeliveryIcon className="text-green-500 flex-shrink-0" size={14} />
                          <span className="text-green-500 font-medium">{category.delivery}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Autorizovaný predajca Makita */}
          <div className="mb-12 md:mb-16">
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-teal-500/30 rounded-xl p-5 md:p-8 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative flex flex-col md:flex-row gap-5 md:gap-8 items-center">
                {/* Makita Logo */}
                <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 bg-white rounded-xl flex items-center justify-center p-4">
                  <img
                    src="/pictures/graphics/makita-logo.webp"
                    alt="Makita - Autorizovaný predajca"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/50 rounded-full px-3 py-1.5 mb-3">
                    <Shield className="text-teal-500" size={14} />
                    <span className="text-teal-500 font-bold text-xs uppercase tracking-wider">Autorizovaný predajca</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black text-white mb-3">
                    Makita <span className="text-teal-500">- Japonská kvalita</span>
                  </h2>

                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                    Sme hrdým autorizovaným predajcom značky <strong className="text-white">Makita</strong> - svetového lídra v profesionálnom náradí.
                    Ponúkame kompletný sortiment elektrického a AKU náradia vrátane revolučného <strong className="text-teal-500">40V XGT systému</strong>.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/50 rounded-md px-2.5 py-1.5 border border-white/10 text-xs text-white/70">
                      <span className="text-green-500">✓</span> Plná záruka
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/50 rounded-md px-2.5 py-1.5 border border-white/10 text-xs text-white/70">
                      <span className="text-green-500">✓</span> Originálne náhradné diely
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/50 rounded-md px-2.5 py-1.5 border border-white/10 text-xs text-white/70">
                      <span className="text-green-500">✓</span> Odborné poradenstvo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nivel System */}
          <div className="mb-12 md:mb-16">
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-yellow-500/30 rounded-xl p-5 md:p-8 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative flex flex-col md:flex-row gap-5 md:gap-8 items-center">
                {/* Nivel Logo */}
                <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 bg-white rounded-xl flex items-center justify-center p-4">
                  <img
                    src="/pictures/graphics/logo-nivel-home.webp"
                    alt="Nivel System - Meracie prístroje"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-3 py-1.5 mb-3">
                    <Zap className="text-yellow-500" size={14} />
                    <span className="text-yellow-500 font-bold text-xs uppercase tracking-wider">Predávame značku</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black text-white mb-3">
                    Nivel System <span className="text-yellow-500">- Presnosť na prvom mieste</span>
                  </h2>

                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                    Ponúkame profesionálne meracie prístroje značky <strong className="text-white">Nivel System</strong> - krížové lasery,
                    rotačné lasery a príslušenstvo pre stavebníkov a remeselníkov.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/50 rounded-md px-2.5 py-1.5 border border-white/10 text-xs text-white/70">
                      <span className="text-yellow-500">✓</span> Zelené lasery
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/50 rounded-md px-2.5 py-1.5 border border-white/10 text-xs text-white/70">
                      <span className="text-yellow-500">✓</span> Kompletné sety so statívom
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950/50 rounded-md px-2.5 py-1.5 border border-white/10 text-xs text-white/70">
                      <span className="text-yellow-500">✓</span> Profesionálna presnosť
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-6 leading-tight">
              Overené značky, <span className="text-orange-primary">férové ceny</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-white/90 text-sm md:text-lg lg:text-xl mb-4 md:mb-8 leading-relaxed">
                Náradie a mechanizácia na sklade v Senci. Diamantové kotúče, vrtáky, príslušenstvo a BOZP pomôcky za <span className="text-orange-primary font-bold">výhodné ceny</span>.
              </p>
            </div>
          </div>

          {/* Advantages Cards - Integrated */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {advantages.map((advantage, idx) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-4 md:p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Animated border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite'
                  }}></div>

                  <div className="relative text-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                      <IconComponent className="text-orange-primary" size={24} />
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 group-hover:text-orange-primary transition-colors">{advantage.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed">{advantage.description}</p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* Pripravujeme eshop - info banner */}
          <div className="mb-12 md:mb-16">
            <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 md:p-10 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-orange-primary/20 border border-orange-primary/50 rounded-full px-4 py-2 mb-4">
                  <ShoppingCart className="text-orange-primary" size={18} />
                  <span className="text-orange-primary font-bold text-sm uppercase tracking-wider">Pripravujeme</span>
                </div>

                <h2 className="text-xl md:text-3xl font-black text-white mb-4">
                  Online eshop <span className="text-orange-primary">už čoskoro</span>
                </h2>

                <p className="text-white/80 text-sm md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                  Pracujeme na spustení eshopu pre ešte pohodlnejší nákup. Dovtedy vám radi pomôžeme telefonicky
                  alebo osobne na našej prevádzke v Senci.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
                  <div className="flex items-center gap-3 bg-zinc-950/50 rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-orange-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-orange-primary" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-white/60 text-xs">Objednávky telefonicky</p>
                      <p className="text-white font-bold">+421 948 555 551</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-950/50 rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-orange-primary/20 flex items-center justify-center flex-shrink-0">
                      <Truck className="text-orange-primary" size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-white/60 text-xs">Doručenie</p>
                      <p className="text-white font-bold">Packeta / osobný odber</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/50 text-sm">
                  Vyzdvihnite si tovar na pobočke v Senci, alebo vám ho zašleme cez Packetu na dobierku.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Content */}
          <div className="mt-10 md:mt-20">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-5xl font-black text-white mb-3 md:mb-4">
                Navštívte našu <span className="text-orange-primary">kamennú predajňu</span>
              </h2>
              <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
                Príďte sa pozrieť na tovar osobne. V našej kamennej predajni v Senci vám radi poradíme a ukážeme náradie v akcii.
              </p>
            </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-12 max-w-6xl mx-auto">
            {/* Opening Hours */}
            <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite'
              }}></div>

              <div className="relative text-center">
                <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                  <svg className="w-7 h-7 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Otváracie hodiny</h3>
                <p className="text-orange-primary font-bold text-base mb-1">Po - Pi</p>
                <p className="text-white/60 text-sm leading-relaxed">7:00 - 16:00</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
            </div>

            {/* Address */}
            <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite'
              }}></div>

              <div className="relative text-center">
                <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                  <svg className="w-7 h-7 text-orange-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Adresa predajne</h3>
                <p className="text-white/80 text-base mb-1">Recká cesta 182</p>
                <p className="text-orange-primary font-bold text-base">925 26 Senec</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
            </div>

            {/* Contact */}
            <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite'
              }}></div>

              <div className="relative text-center">
                <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                  <Phone className="text-orange-primary" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Kontakt</h3>
                <p className="text-orange-primary font-bold text-base mb-1">+421 948 555 551</p>
                <p className="text-white/60 text-sm leading-relaxed">info@royalstroje.sk</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>

            {/* Benefits Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-10">
              <div className="flex items-center gap-1.5 md:gap-2 bg-orange-primary/10 border border-orange-primary/30 rounded-full px-3 py-2 md:px-5 md:py-2.5">
                <span className="text-orange-primary text-base md:text-lg">✓</span>
                <span className="text-white/90 font-medium text-xs md:text-sm">Odborné poradenstvo</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-orange-primary/10 border border-orange-primary/30 rounded-full px-3 py-2 md:px-5 md:py-2.5">
                <span className="text-orange-primary text-base md:text-lg">✓</span>
                <span className="text-white/90 font-medium text-xs md:text-sm">Tovar na predvádzku</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-orange-primary/10 border border-orange-primary/30 rounded-full px-3 py-2 md:px-5 md:py-2.5">
                <span className="text-orange-primary text-base md:text-lg">✓</span>
                <span className="text-white/90 font-medium text-xs md:text-sm">Bezplatné parkovanie</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-lg rounded-full hover:scale-105 transition-all shadow-2xl shadow-orange-primary/40 hover:shadow-orange-primary/60"
              >
                <Phone className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="https://wa.me/421948555551"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-zinc-900 border border-zinc-700 md:border-2 text-white font-bold text-sm md:text-lg rounded-full hover:bg-zinc-800 hover:border-orange-primary/50 transition-all"
              >
                <MessageCircle className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-green-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
