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
      image: '/pictures/graphics/predaj.png',
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
      image: '/pictures/graphics/servis.png',
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
      image: '/pictures/graphics/dovoz.png',
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
      image: '/pictures/graphics/predaj.png',
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
      image: '/pictures/graphics/servis.png',
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
      image: '/pictures/graphics/dovoz.png',
      category: 'Návody',
    },
  ];

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

      {/* Blog Posts Grid */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Diagonal subtle lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
          }}
        />

        {/* Orange accent glows */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '10%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.6) 0%, rgba(255,102,0,0.2) 40%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.15,
            animation: 'floatGlow1 8s ease-in-out infinite'
          }}
        />

        <div
          className="absolute pointer-events-none z-0"
          style={{
            bottom: '10%',
            left: '10%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.5) 0%, rgba(255,102,0,0.15) 40%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0.12,
            animation: 'floatGlow2 10s ease-in-out infinite'
          }}
        />

        {/* Animation keyframes */}
        <style>{`
          @keyframes floatGlow1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(-120px, 100px) scale(1.2);
            }
            50% {
              transform: translate(80px, -120px) scale(0.85);
            }
            75% {
              transform: translate(100px, 60px) scale(1.1);
            }
          }

          @keyframes floatGlow2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(140px, -100px) scale(1.25);
            }
            66% {
              transform: translate(-100px, 120px) scale(0.8);
            }
          }
        `}</style>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Najnovšie <span className="text-orange-primary">články</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Sledujte náš blog a buďte v obraze o novinkách, tipoch a trendoch v oblasti stavebnej techniky.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
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
      </section>
    </div>
  );
}
