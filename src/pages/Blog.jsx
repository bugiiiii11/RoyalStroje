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
      {/* Main Content Section */}
      <section className="relative pb-16 md:py-16 bg-zinc-950 overflow-hidden min-h-screen">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading */}
          <div className="text-center mb-6 md:mb-12 pt-16 md:pt-0">
            <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
              Stavajte efektívnejšie. <span className="text-orange-primary">Tipy od profesionálov.</span>
            </h1>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
              Praktické rady, návody a novinky zo sveta stavebnej mechanizácie pre región Senec - Bratislava.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="mb-8 md:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 md:border-2 rounded-xl md:rounded-2xl overflow-hidden hover:border-orange-primary hover:shadow-2xl hover:shadow-orange-primary/20 hover:scale-105 transition-all duration-300 relative"
                >
                  {/* Image */}
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                      <span className="inline-block bg-orange-primary/90 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3 text-[10px] md:text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="md:w-3.5 md:h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm md:text-xl font-black text-white mb-2 md:mb-3 group-hover:text-orange-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-orange-primary font-bold text-xs md:text-sm group-hover:gap-3 transition-all">
                      <span>Čítať viac</span>
                      <ArrowRight size={14} className="md:w-4 md:h-4" />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/5 group-hover:to-orange-primary/10 transition-all duration-300 pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-lg md:text-3xl font-black text-white mb-2 md:mb-4">
              Zaujala vás naša ponuka?
            </h2>
            <p className="text-white/70 text-xs md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
              Kontaktujte nás a radi vám pomôžeme s výberom správnej techniky pre váš projekt.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-base rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <span>Kontaktujte nás</span>
              </Link>
              <Link
                to="/sluzby"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-zinc-800 border border-zinc-700 md:border-2 text-white font-bold text-sm md:text-base rounded-full hover:bg-zinc-700 transition-all"
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
