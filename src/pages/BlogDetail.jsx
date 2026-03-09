import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogArticles } from '../data/blogArticles';
import ContentSection from '../components/common/ContentSection';

export default function BlogDetail() {
  const { slug } = useParams();
  const article = blogArticles[slug];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Článok nenájdený</h1>
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
    "headline": article.title,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": article.author
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
        <title>{article.title} | Blog | Royal Stroje</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://royalstroje.sk/blog/${slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={`https://royalstroje.sk/blog/${slug}`} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt={article.title}
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
          <div className="max-w-4xl">
            {/* Back Button - Prominent */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800/80 border border-white/20 text-white font-semibold rounded-full hover:bg-orange-primary hover:border-orange-primary transition-all mb-8"
            >
              <ArrowLeft size={18} />
              <span>Späť na blog</span>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {article.readTime}
              </span>
              <span>Autor: {article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Separator line between hero and content */}
      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />

      {/* Article Content */}
      <ContentSection>
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
          <div className="md:hidden text-center mb-6 pt-16">
            {/* Back Button - Prominent */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/80 border border-white/20 text-white font-semibold rounded-full hover:bg-orange-primary hover:border-orange-primary transition-all mb-6 text-sm"
            >
              <ArrowLeft size={16} />
              <span>Späť na blog</span>
            </Link>

            <h1 className="text-xl font-black text-white mb-2 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-white/70 text-xs">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {article.readTime}
              </span>
              <span>{article.author}</span>
            </div>
          </div>

          {/* Article Body */}
          <article className="prose prose-invert prose-lg max-w-none">
            {article.content}
          </article>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/70 text-center mb-4">Páčil sa vám tento článok? Zdieľajte ho!</p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-800 border border-white/10 text-white rounded-lg hover:border-orange-primary/50 transition-all"
              >
                Facebook
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-800 border border-white/10 text-white rounded-lg hover:border-orange-primary/50 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* CTA Section - Integrated */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Potrebujete poradiť?
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
            </p>
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
            >
              <span>Zavolať teraz: 0948 555 551</span>
            </a>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
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
