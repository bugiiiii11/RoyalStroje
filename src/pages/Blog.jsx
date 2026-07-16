import { Calendar, ArrowRight, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';
import { blogPosts } from '../data/blogMeta';

export default function Blog() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();

  // Filter out hidden articles (single source of truth: src/data/blogMeta.js)
  // Sort by date from newest to oldest
  const visiblePosts = blogPosts
    .filter(post => !post.hidden)
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

      {/* Hero (desktop, light) */}
      <PageHero
        eyebrow="Blog"
        title={<>Stavajte efektívnejšie. <span className="text-orange-primary">Tipy od profesionálov.</span></>}
        subtitle="Praktické rady, návody a novinky zo sveta stavebnej mechanizácie pre región Senec - Bratislava."
        image="/pictures/graphics/predajna-2.webp"
        imageAlt="Predajňa Royal Stroje — meracia technika a náradie"
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading - Improved Typography */}
          <div ref={headingRef} className="text-center mb-10 md:mb-16 pt-16 md:pt-0">
            <h1 className={`text-2xl md:text-5xl font-black text-zinc-900 mb-3 md:mb-6 tracking-tight leading-tight reveal ${headingInView ? 'in-view' : ''}`}>
              Najnovšie články <span className="text-orange-primary">a praktické návody</span>
            </h1>
            <p className={`text-zinc-700 text-base md:text-xl max-w-3xl mx-auto leading-relaxed reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
              Odborné know-how z 20 rokov praxe v stavebníctve. Konkrétne riešenia pre vaše projekty.
            </p>
          </div>

          {/* Blog Posts Grid - Enhanced Spacing */}
          <div className="mb-12 md:mb-20">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visiblePosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 shadow-sm shadow-zinc-900/10 hover:-translate-y-1 transition-all duration-300 relative reveal stagger-${Math.min(index + 1, 8)} ${gridInView ? 'in-view' : ''}`}
                >
                  {/* Orange top accent rule */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity" />

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
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3 text-[10px] md:text-xs text-zinc-400">
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
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Read More - Enhanced Animation */}
                    <div className="flex items-center gap-1.5 text-orange-primary font-bold text-xs md:text-sm group-hover:gap-3 transition-all duration-300">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Čítať viac</span>
                      <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Hover overlay - subtle tint */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/[0.07] group-hover:to-orange-primary/[0.03] transition-all duration-300 pointer-events-none"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section - shared dark band */}
          <CtaBand
            eyebrow="Potrebujete techniku?"
            title={<>Zaujala vás naša ponuka?</>}
            text="Kontaktujte nás a radi vám pomôžeme s výberom správnej techniky pre váš projekt."
            actions={
              <>
                <Link
                  to="/kontakt"
                  className="btn-primary text-base md:text-lg px-8 py-4 md:px-10 md:py-5"
                >
                  <span>Kontaktujte nás</span>
                </Link>
                <Link
                  to="/sluzby"
                  className="btn-secondary text-base md:text-lg px-8 py-4 md:px-10 md:py-5"
                >
                  <span>Naše služby</span>
                </Link>
              </>
            }
          />
        </div>
      </ContentSection>
    </div>
  );
}
