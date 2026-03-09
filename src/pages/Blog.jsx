import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      slug: 'prenajom-vs-kupa-stavebnej-mechanizacie',
      title: 'Prenájom vs. Kúpa Stavebnej Mechanizácie: Komplexný Sprievodca',
      excerpt: 'Rozhodujete sa, či investovať do vlastnej stavebnej mechanizácie alebo si ju radšej prenajať? Porovnali sme náklady, výhody a nevýhody oboch možností. Kalkulačka úspor + praktické tipy.',
      date: '15. Február 2026',
      dateSort: '2026-02-15',
      author: 'Royal Stroje',
      readTime: '9 min',
      image: '/pictures/graphics/predaj.webp',
      category: 'Tipy a rady',
    },
    {
      id: 2,
      slug: 'ako-vybrat-spravne-minirypadlo',
      title: 'Ako Vybrať Správne Minirýpadlo: Praktický Návod pre Začiatočníkov',
      excerpt: 'Minirýpadlo je jeden z najuniverzálnejších stavebných strojov. Ale s desiatskami modelov a veľkostí na trhu, ako si vybrať to pravé? Komplexný sprievodca veľkosťami, typmi a výberom správneho stroja.',
      date: '1. Marec 2026',
      dateSort: '2026-03-01',
      author: 'Royal Stroje',
      readTime: '10 min',
      image: '/pictures/graphics/mini-rypadlo-blog.webp',
      category: 'Návody',
    },
    {
      id: 3,
      slug: 'prenajom-stavebnej-mechanizacie-senec-bratislava',
      title: 'Prenájom Stavebnej Mechanizácie v Senci a okolí: Lokálny Sprievodca 2026',
      excerpt: 'Senec a jeho okolie zažíva stavebný boom. Dozviete sa všetko o dostupnosti, cenách a špecifikách prenájmu stavebnej mechanizácie v regióne Senec, Bratislava, Dunajská Streda a okolie.',
      date: '5. Marec 2026',
      dateSort: '2026-03-05',
      author: 'Royal Stroje',
      readTime: '9 min',
      image: '/pictures/graphics/objects3.webp',
      category: 'Tipy a rady',
    },
    {
      id: 4,
      slug: 'jarne-stavebne-projekty-mechanizacia',
      title: 'Jarné Stavebné Projekty: Top 5 Mechanizácií, Ktoré Potrebujete',
      excerpt: 'Plánujete stavebný projekt na jar 2026? Zistite, ktorých 5 strojov sú absolútne nevyhnutné pre terénne úpravy, základy a záhradné projekty. Jarné balíčky so zľavou.',
      date: '2. Marec 2026',
      dateSort: '2026-03-02',
      author: 'Royal Stroje',
      readTime: '11 min',
      image: '/pictures/graphics/objects2.webp',
      category: 'Tipy a rady',
    },
    {
      id: 5,
      slug: 'mobilne-sanitarne-kontajnery-sprievodca',
      title: 'Mobilné Sanitárne Kontajnery: Komplexný Sprievodca pre Stavby a Eventy',
      excerpt: 'Potrebujete mobilné WC na stavbu alebo event? Komplexný sprievodca typmi, cenami a hygienickými štandardmi. Royal Stroje Senec - prenájom od 35 €/deň.',
      date: '15. Február 2026',
      dateSort: '2026-02-15',
      author: 'Royal Stroje',
      readTime: '12 min',
      image: '/pictures/graphics/objects4.webp',
      category: 'Návody',
    },
    {
      id: 6,
      slug: 'bezpecnostne-pravidla-stavebne-stroje',
      title: '10 Bezpečnostných Pravidiel pri Práci so Stavebnými Strojmi',
      excerpt: 'Bezpečnosť na stavbe je prvoradá! 10 kľúčových pravidiel pre prácu s minirýpadlom, nakladačom a ďalšou mechanizáciou. Bezplatný checklist na stiahnutie.',
      date: '10. Január 2026',
      dateSort: '2026-01-10',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/cigy-blog.webp',
      category: 'Návody',
    },
    {
      id: 7,
      slug: 'cennik-prenajmu-stavebnej-mechanizacie-2026',
      title: 'Cenník Prenájmu Stavebnej Mechanizácie 2026: Komplexný Prehľad',
      excerpt: 'Aktuálne ceny prenájmu stavebnej mechanizácie na Slovensku 2026. Porovnanie požičovní, zľavy, kalkulačka nákladov. Royal Stroje - transparentné ceny bez skrytých poplatkov.',
      date: '1. August 2026',
      dateSort: '2026-08-01',
      author: 'Royal Stroje',
      readTime: '18 min',
      image: '/pictures/graphics/objects1.webp',
      category: 'Tipy a rady',
    },
    {
      id: 8,
      slug: 'vibracne-dosky-hutnenie-sprievodca',
      title: 'Vibračné Dosky a Hutnenie: Všetko Čo Potrebujete Vedieť',
      excerpt: 'Komplexný sprievodca vibračnými doskami a hutnením. Typy, použitie, technické parametre, najčastejšie chyby. Royal Stroje - prenájom od 25 €/deň.',
      date: '4. Marec 2026',
      dateSort: '2026-03-04',
      author: 'Royal Stroje',
      readTime: '17 min',
      image: '/pictures/graphics/vibracnadoska.webp',
      category: 'Návody',
    },
    {
      id: 9,
      slug: 'jesenne-terenne-upravy-priprava-na-zimu',
      title: 'Jesenné Terénne Úpravy: Príprava Pozemku na Zimu',
      excerpt: 'Komplexný sprievodca jesennými terénymi úpravami. Čo urobiť pred zimou, aby ste na jar mali pripravený pozemok. Drenáž, odvodnenie, hutnenie.',
      date: '10. Október 2026',
      dateSort: '2026-10-10',
      author: 'Royal Stroje',
      readTime: '12 min',
      image: '/pictures/graphics/dovoz.webp',
      category: 'Tipy a rady',
    },
    {
      id: 10,
      slug: 'case-study-projekt-30-percent-rychlejsie',
      title: 'Case Study: Ako Sme Pomohli Dokončiť Projekt o 30% Rýchlejšie',
      excerpt: 'Reálna prípadová štúdia stavby rodinného domu v Senci. Ako Royal Stroje pomohli ušetriť čas a peniaze. Before/After, náklady a lessons learned.',
      date: '5. Február 2026',
      dateSort: '2026-02-05',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/predaj.webp',
      category: 'Prípadové štúdie',
    },
    {
      id: 11,
      slug: 'zimne-stavebne-projekty-vyzvy-riesenia',
      title: 'Stavebné Projekty v Zime: Výzvy a Riešenia',
      excerpt: 'Dá sa stavať v zime? Áno! Komplexný sprievodca zimnými stavebnými prácami. Čo robiť, čo nerobiť, aká mechanizácia. Zimné zľavy až -30%!',
      date: '1. Január 2026',
      dateSort: '2026-01-01',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/servis.webp',
      category: 'Tipy a rady',
    },
    {
      id: 12,
      slug: 'rocny-prehlad-2026-trendy-prenajom',
      title: 'Ročný Prehľad 2026: Trendy v Prenájme Stavebnej Mechanizácie',
      excerpt: 'Komplexný prehľad roku 2026 v prenájme stavebnej mechanizácie na Slovensku. Trendy, štatistiky, predpovede na 2026. Čo sa zmenilo a čo nás čaká?',
      date: '15. Január 2026',
      dateSort: '2026-01-15',
      author: 'Royal Stroje',
      readTime: '14 min',
      image: '/pictures/graphics/hero4.webp',
      category: 'Novinky',
    },
    {
      id: 13,
      slug: 'dewalt-dcg405p2-akumulatorova-bruska-profesionalny-nastroj',
      title: 'Akumulátorová Brúska DeWalt Pre Profesionálov i Kutiloch',
      excerpt: 'Kompletný prehľad akumulátorovej brúsky DeWalt DCG405P2 - technické parametre, bezpečnostné funkcie, praktické využitie a naše skúsenosti s týmto nástrojom. Prečo je táto brúska jednou z najlepších volieb na trhu?',
      date: '20. Február 2026',
      dateSort: '2026-02-20',
      author: 'Royal Stroje',
      readTime: '12 min',
      image: '/pictures/graphics/dewalt-blog.webp',
      category: 'Návody',
    },
    {
      id: 14,
      slug: 'makita-tw001gm201-razovy-utahovak-extremny-vykon',
      title: 'Rázový Uťahovák Makita s Extrémnym Výkonom 2050 Nm',
      excerpt: 'Kompletný prehľad rázového uťahováka Makita TW001GM201 - 40V XGT systém, 2050 Nm krútiaci moment, profesionálne použitie v autoservisoch a ťažkom priemysle. Prečo je tento nástroj skutočný beast?',
      date: '26. Február 2026',
      dateSort: '2026-02-26',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/makita-blog.webp',
      category: 'Návody',
    },
    {
      id: 15,
      slug: 'toughbuilt-tb-c700-pracovne-kozy-profesionalny-nastroj',
      title: 'Pracovné Kozy TOUGHBUILT, Ktoré Vydržia Všetko',
      excerpt: 'Kompletný prehľad pracovných kôz TOUGHBUILT TB-C700 - 100% oceľová konštrukcia, nosnosť až 1,180 kg v páre, výškovo nastaviteľné nohy a revolučný samonivelačný systém. Prečo sú tieto kozy najlepšou voľbou pre profesionálov?',
      date: '5. Marec 2026',
      dateSort: '2026-03-05',
      author: 'Royal Stroje',
      readTime: '12 min',
      image: '/pictures/graphics/koza.webp',
      category: 'Návody',
    },
  ];

  // Filter out hidden articles - show only 8 articles (1, 2, 4, 6, 8, 13, 14, 15)
  // Sort by date from newest to oldest
  const visiblePosts = blogPosts
    .filter(post => ![3, 5, 7, 9, 10, 11, 12].includes(post.id))
    .sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog - Tipy a návody pre stavebníctvo | Royal Stroje</title>
        <meta
          name="description"
          content="Praktické rady pre prácu so stavebnou technikou. Návody, tipy a novinky z oblasti stavebných strojov a náradia."
        />
        <link rel="canonical" href="https://royalstroje.sk/blog" />
        <meta property="og:title" content="Blog - Royal Stroje" />
        <meta property="og:description" content="Tipy a návody pre prácu so stavebnou technikou." />
        <meta property="og:url" content="https://royalstroje.sk/blog" />
      </Helmet>

      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Blog"
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
              Stavajte efektívnejšie. <span className="text-orange-primary">Tipy od profesionálov.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Praktické rady, návody a novinky zo sveta stavebnej mechanizácie pre región Senec - Bratislava.
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading - Improved Typography */}
          <div className="text-center mb-10 md:mb-16 pt-16 md:pt-0">
            <h1 className="text-2xl md:text-5xl font-black text-white mb-3 md:mb-6 tracking-tight leading-tight">
              Najnovšie články <span className="text-orange-primary">a praktické návody</span>
            </h1>
            <p className="text-white/80 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
              Odborné know-how z 20 rokov praxe v stavebníctve. Konkrétne riešenia pre vaše projekty.
            </p>
          </div>

          {/* Blog Posts Grid - Enhanced Spacing */}
          <div className="mb-12 md:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-xl md:rounded-2xl overflow-hidden hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 ease-out relative"
                >
                  {/* Image - Enhanced with Zoom Effect */}
                  <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-zinc-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent group-hover:from-zinc-900/20 transition-all duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-5">
                    {/* Meta Info - Enhanced */}
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3 text-[10px] md:text-xs text-white/70">
                      <span className="flex items-center gap-1 transition-colors group-hover:text-orange-primary">
                        <Calendar size={12} className="md:w-3.5 md:h-3.5 text-orange-primary/70" />
                        <span className="font-medium">{post.date}</span>
                      </span>
                      <span className="flex items-center gap-1 transition-colors group-hover:text-orange-primary">
                        <Clock size={12} className="md:w-3.5 md:h-3.5 text-orange-primary/70" />
                        <span className="font-medium">{post.readTime}</span>
                      </span>
                    </div>

                    {/* Title - Optimized Size */}
                    <h3 className="text-sm md:text-xl font-black text-white mb-2 md:mb-3 group-hover:text-orange-primary transition-colors duration-300 line-clamp-2 leading-tight tracking-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt - Compact */}
                    <p className="text-white/75 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Read More - Enhanced Animation */}
                    <div className="flex items-center gap-1.5 text-orange-primary font-bold text-xs md:text-sm group-hover:gap-3 transition-all duration-300">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Čítať viac</span>
                      <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Hover overlay - Enhanced Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>

                  {/* Animated border glow on hover */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 3s ease infinite'
                  }}></div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section - Enhanced with Gradient */}
          <div className="relative mt-12 md:mt-20">
            {/* Gradient Background - Subtle */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/20 via-zinc-600/10 to-transparent rounded-3xl blur-3xl"></div>

            <div className="relative text-center py-12 md:py-16 px-4">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 tracking-tight">
                Zaujala vás naša ponuka?
              </h2>
              <p className="text-white/80 text-base md:text-xl mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
                Kontaktujte nás a radi vám pomôžeme s výberom správnej techniky pre váš projekt.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-base md:text-lg rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-primary/50 hover:shadow-orange-primary/70"
                >
                  <span>Kontaktujte nás</span>
                </Link>
                <Link
                  to="/sluzby"
                  className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-zinc-800 border-2 border-orange-primary/30 text-white font-bold text-base md:text-lg rounded-full hover:bg-zinc-700 hover:border-orange-primary transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  <span>Naše služby</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
