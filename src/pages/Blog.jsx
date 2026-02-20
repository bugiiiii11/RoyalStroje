import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      slug: 'prenajom-vs-kupa-stavebnej-mechanizacie',
      title: 'Prenájom vs. Kúpa Stavebnej Mechanizácie: Komplexný Sprievodca 2025',
      excerpt: 'Rozhodujete sa, či investovať do vlastnej stavebnej mechanizácie alebo si ju radšej prenajať? Porovnali sme náklady, výhody a nevýhody oboch možností. Kalkulačka úspor + praktické tipy.',
      date: '15. Marec 2025',
      author: 'Royal Stroje',
      readTime: '9 min',
      image: '/pictures/graphics/objects2.png',
      category: 'Tipy a rady',
    },
    {
      id: 2,
      slug: 'ako-vybrat-spravne-minirypadlo',
      title: 'Ako Vybrať Správne Minirýpadlo: Praktický Návod pre Začiatočníkov',
      excerpt: 'Minirýpadlo je jeden z najuniverzálnejších stavebných strojov. Ale s desiatskami modelov a veľkostí na trhu, ako si vybrať to pravé? Komplexný sprievodca veľkosťami, typmi a výberom správneho stroja.',
      date: '10. Marec 2025',
      author: 'Royal Stroje',
      readTime: '10 min',
      image: '/pictures/graphics/objects1.png',
      category: 'Návody',
    },
    {
      id: 3,
      slug: 'prenajom-stavebnej-mechanizacie-senec-bratislava',
      title: 'Prenájom Stavebnej Mechanizácie v Senci a okolí: Lokálny Sprievodca 2025',
      excerpt: 'Senec a jeho okolie zažíva stavebný boom. Dozviete sa všetko o dostupnosti, cenách a špecifikách prenájmu stavebnej mechanizácie v regióne Senec, Bratislava, Dunajská Streda a okolie.',
      date: '5. Apríl 2025',
      author: 'Royal Stroje',
      readTime: '9 min',
      image: '/pictures/graphics/objects3.png',
      category: 'Tipy a rady',
    },
    {
      id: 4,
      slug: 'jarne-stavebne-projekty-mechanizacia',
      title: 'Jarné Stavebné Projekty: Top 5 Mechanizácií, Ktoré Potrebujete',
      excerpt: 'Plánujete stavebný projekt na jar 2025? Zistite, ktorých 5 strojov sú absolútne nevyhnutné pre terénne úpravy, základy a záhradné projekty. Jarné balíčky so zľavou.',
      date: '20. Máj 2025',
      author: 'Royal Stroje',
      readTime: '11 min',
      image: '/pictures/graphics/objects3.png',
      category: 'Tipy a rady',
    },
    {
      id: 5,
      slug: 'mobilne-sanitarne-kontajnery-sprievodca',
      title: 'Mobilné Sanitárne Kontajnery: Komplexný Sprievodca pre Stavby a Eventy',
      excerpt: 'Potrebujete mobilné WC na stavbu alebo event? Komplexný sprievodca typmi, cenami a hygienickými štandardmi. Royal Stroje Senec - prenájom od 35 €/deň.',
      date: '15. Jún 2025',
      author: 'Royal Stroje',
      readTime: '12 min',
      image: '/pictures/graphics/objects4.png',
      category: 'Návody',
    },
    {
      id: 6,
      slug: 'bezpecnostne-pravidla-stavebne-stroje',
      title: '10 Bezpečnostných Pravidiel pri Práci so Stavebnými Strojmi',
      excerpt: 'Bezpečnosť na stavbe je prvoradá! 10 kľúčových pravidiel pre prácu s minirýpadlom, nakladačom a ďalšou mechanizáciou. Bezplatný checklist na stiahnutie.',
      date: '10. Júl 2025',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/objects1.png',
      category: 'Návody',
    },
    {
      id: 7,
      slug: 'cennik-prenajmu-stavebnej-mechanizacie-2025',
      title: 'Cenník Prenájmu Stavebnej Mechanizácie 2025: Komplexný Prehľad',
      excerpt: 'Aktuálne ceny prenájmu stavebnej mechanizácie na Slovensku 2025. Porovnanie požičovní, zľavy, kalkulačka nákladov. Royal Stroje - transparentné ceny bez skrytých poplatkov.',
      date: '1. August 2025',
      author: 'Royal Stroje',
      readTime: '18 min',
      image: '/pictures/graphics/objects1.png',
      category: 'Tipy a rady',
    },
    {
      id: 8,
      slug: 'vibracne-dosky-hutnenie-sprievodca',
      title: 'Vibračné Dosky a Hutnenie: Všetko Čo Potrebujete Vedieť',
      excerpt: 'Komplexný sprievodca vibračnými doskami a hutnením. Typy, použitie, technické parametre, najčastejšie chyby. Royal Stroje - prenájom od 25 €/deň.',
      date: '15. September 2025',
      author: 'Royal Stroje',
      readTime: '17 min',
      image: '/pictures/graphics/objects5.png',
      category: 'Návody',
    },
    {
      id: 9,
      slug: 'jesenne-terenne-upravy-priprava-na-zimu',
      title: 'Jesenné Terénne Úpravy: Príprava Pozemku na Zimu',
      excerpt: 'Komplexný sprievodca jesennými terénymi úpravami. Čo urobiť pred zimou, aby ste na jar mali pripravený pozemok. Drenáž, odvodnenie, hutnenie.',
      date: '10. Október 2025',
      author: 'Royal Stroje',
      readTime: '12 min',
      image: '/pictures/graphics/dovoz.png',
      category: 'Tipy a rady',
    },
    {
      id: 10,
      slug: 'case-study-projekt-30-percent-rychlejsie',
      title: 'Case Study: Ako Sme Pomohli Dokončiť Projekt o 30% Rýchlejšie',
      excerpt: 'Reálna prípadová štúdia stavby rodinného domu v Senci. Ako Royal Stroje pomohli ušetriť čas a peniaze. Before/After, náklady a lessons learned.',
      date: '5. November 2025',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/predaj.png',
      category: 'Prípadové štúdie',
    },
    {
      id: 11,
      slug: 'zimne-stavebne-projekty-vyzvy-riesenia',
      title: 'Stavebné Projekty v Zime: Výzvy a Riešenia',
      excerpt: 'Dá sa stavať v zime? Áno! Komplexný sprievodca zimnými stavebnými prácami. Čo robiť, čo nerobiť, aká mechanizácia. Zimné zľavy až -30%!',
      date: '1. December 2025',
      author: 'Royal Stroje',
      readTime: '13 min',
      image: '/pictures/graphics/servis.png',
      category: 'Tipy a rady',
    },
    {
      id: 12,
      slug: 'rocny-prehlad-2025-trendy-prenajom',
      title: 'Ročný Prehľad 2025: Trendy v Prenájme Stavebnej Mechanizácie',
      excerpt: 'Komplexný prehľad roku 2025 v prenájme stavebnej mechanizácie na Slovensku. Trendy, štatistiky, predpovede na 2026. Čo sa zmenilo a čo nás čaká?',
      date: '15. Január 2026',
      author: 'Royal Stroje',
      readTime: '14 min',
      image: '/pictures/graphics/hero4.png',
      category: 'Novinky',
    },
  ];

  // Filter out hidden articles (3, 7, 9)
  const visiblePosts = blogPosts.filter(post => ![3, 7, 9].includes(post.id));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
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

        {/* Modern geometric bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-30">
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
              fill="#09090b"
            />
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
              Blog
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Tipy, novinky a užitočné informácie zo sveta stavebnej techniky a náradia.
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
          {/* Blog Posts Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Najnovšie <span className="text-orange-primary">články</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Sledujte náš blog a buďte v obraze o novinkách, tipoch a trendoch v oblasti stavebnej techniky.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 relative"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-orange-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-3 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-orange-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-orange-primary font-bold text-sm group-hover:gap-3 transition-all">
                      <span>Čítať viac</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Zaujala vás naša ponuka?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Kontaktujte nás a radi vám pomôžeme s výberom správnej techniky pre váš projekt.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <span>Kontaktujte nás</span>
              </Link>
              <Link
                to="/sluzby"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
              >
                <span>Naše služby</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
