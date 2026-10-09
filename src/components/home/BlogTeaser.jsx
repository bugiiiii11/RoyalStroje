import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { blogPosts } from '../../data/blogMeta';

// Three newest published articles. Same filter + sort as /blog, so the homepage
// can never surface an unlisted (hidden) post.
const latest = blogPosts
  .filter((p) => !p.hidden)
  .sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort))
  .slice(0, 3);

// "Chcete vedieť viac?" -- real articles instead of two generic topic cards.
// Image hover is brightness only, never a scale zoom: a scaled child inside a
// rounded overflow-hidden card draws a white seam on the clip edge (s36).
export default function BlogTeaser() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();

  return (
    <section className="relative mt-8 md:mt-12 pt-12 md:pt-16">
      {/* Same inner gutter as WhyRoyalStroje / FAQ so all three share one left edge */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
      <div
        ref={headingRef}
        className={`flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8 mb-6 md:mb-10 reveal ${headingInView ? 'in-view' : ''}`}
      >
        <div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-[1.05] mb-2 md:mb-4">
            Chcete vedieť <span className="text-orange-primary">viac?</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg max-w-2xl">
            Rady, návody a recenzie strojov z nášho blogu
          </p>
        </div>
        <Link
          to="/blog"
          className="btn-outline-light self-start md:self-auto shrink-0 px-5 py-3 group"
        >
          Všetky články
          <ArrowRight size={16} className="text-orange-primary transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
        {latest.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 reveal stagger-${i + 1} ${gridInView ? 'in-view' : ''}`}
          >
            <div className="relative aspect-[16/10] bg-zinc-800">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.92] group-hover:brightness-105 transition-[filter] duration-500"
              />
              <span className="absolute top-3 left-3 rounded-full bg-zinc-950/80 border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-primary">
                {post.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2 md:mb-3 text-xs text-zinc-500">
                <span>{post.date}</span>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} className="text-orange-primary/70" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-white font-black text-base md:text-lg xl:text-xl leading-snug line-clamp-2 group-hover:text-orange-primary transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-orange-primary font-bold text-sm">
                Čítať článok
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
