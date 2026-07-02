import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogMeta, loadArticle } from '../data/blogArticles';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';

export default function BlogDetail() {
  const { slug } = useParams();
  const meta = blogMeta[slug];
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const [articleRef, articleInView] = useInView();
  const [shareRef, shareInView] = useInView();
  const [relatedRef, relatedInView] = useInView();

  useEffect(() => {
    let cancelled = false;
    loadArticle(slug).then((data) => {
      if (!cancelled) {
        setArticle(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [slug]);

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAFAFA' }}>
        <div className="text-center">
          <h1 className="text-4xl font-black text-zinc-900 mb-4">Článok nenájdený</h1>
          <Link to="/blog" className="text-orange-primary hover:underline">
            Späť na blog
          </Link>
        </div>
      </div>
    );
  }

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "datePublished": meta.date,
    "author": {
      "@type": "Person",
      "name": meta.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Royal Stroje",
      "logo": {
        "@type": "ImageObject",
        "url": "https://royalstroje.sk/logoroyal.webp"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{meta.title} | Blog | Royal Stroje</title>
        <meta name="description" content={meta.excerpt} />
        <link rel="canonical" href={`https://royalstroje.sk/blog/${slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.excerpt} />
        <meta property="og:url" content={`https://royalstroje.sk/blog/${slug}`} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Hero (desktop, light) */}
      <PageHero
        eyebrow="Článok"
        chips={[meta.date, meta.readTime, `Autor: ${meta.author}`]}
        title={meta.title}
        subtitle={meta.excerpt}
        image="/hero-pozicovna.webp"
        imageAlt={meta.title}
        actions={
          <Link to="/blog" className="btn-outline-light px-5 py-3">
            <ArrowLeft size={16} />
            Späť na blog
          </Link>
        }
      />

      {/* Article Content */}
      <ContentSection light>
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.webp"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-6 pt-16 reveal in-view">
            {/* Back Button - Prominent */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-900 font-semibold rounded-full hover:bg-orange-primary hover:border-orange-primary hover:text-white transition-all mb-6 text-sm shadow-sm shadow-zinc-900/5"
            >
              <ArrowLeft size={16} />
              <span>Späť na blog</span>
            </Link>

            <h1 className="text-xl font-black text-zinc-900 mb-2 leading-tight">
              {meta.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-600 text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {meta.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {meta.readTime}
              </span>
              <span>{meta.author}</span>
            </div>
          </div>

          {/* Article Body */}
          <article ref={articleRef} className={`prose prose-lg max-w-none text-zinc-700 prose-headings:text-zinc-900 prose-strong:text-zinc-900 prose-a:text-orange-primary reveal-fade ${articleInView ? 'in-view' : ''}`}>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-orange-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : article ? (
              article.content
            ) : (
              <p className="text-zinc-700 text-center py-20">Článok sa nepodarilo načítať.</p>
            )}
          </article>

          {/* Share Section */}
          <div ref={shareRef} className={`mt-16 pt-8 border-t border-zinc-200 reveal ${shareInView ? 'in-view' : ''}`}>
            <p className="text-zinc-700 text-center mb-4">Páčil sa vám tento článok? Zdieľajte ho!</p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 text-white rounded-lg shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 transition-all"
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 text-white rounded-lg shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* CTA Section - shared dark band */}
          <CtaBand
            eyebrow="Kontakt"
            title={<>Potrebujete poradiť?</>}
            text="Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt."
            actions={
              <a href="tel:+421948555551" className="btn-primary text-base px-8 py-4">
                <span>Zavolať teraz: 0948 555 551</span>
              </a>
            }
          />

          {/* Related Articles */}
          <div ref={relatedRef} className={`mt-16 text-center reveal ${relatedInView ? 'in-view' : ''}`}>
            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mb-8 text-center">
              Ďalšie <span className="text-orange-primary">články</span>
            </h3>
            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-orange-primary font-bold text-lg hover:gap-3 transition-all"
              >
                <span>Zobraziť všetky články</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
