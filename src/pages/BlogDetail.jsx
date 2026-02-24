import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Phone, Mail } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';

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

  return (
    <div className="min-h-screen">
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
          <div className="max-w-4xl">
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-orange-primary transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span>Späť na blog</span>
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-orange-primary/90 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {article.category}
              </span>
            </div>

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

      {/* Article Content */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        {/* Background effects */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-6 pt-16">
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-orange-primary transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Späť na blog</span>
            </Link>

            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block bg-orange-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>

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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Potrebujete <span className="text-orange-primary">poradiť</span>?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={20} />
                <span>Zavolať: 0948 555 551</span>
              </a>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
              >
                <Mail size={20} />
                <span>Kontaktný formulár</span>
              </Link>
            </div>
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
      </section>
    </div>
  );
}
