import { useInView } from '../../hooks/useInView';

/**
 * Light subpage hero (desktop only — `hidden md:block`, mobile keeps its own
 * compact heading). Industrial-premium on a white field: eyebrow, dark Archivo
 * headline with an orange highlight, subtitle, optional chips + CTAs, and a
 * framed photo with an orange top-accent on the right (lg+). Bottom orange rule
 * keeps the brand seam consistent with the rest of the site.
 */
export default function PageHero({ eyebrow, title, subtitle, image, imageAlt, chips, actions }) {
  const [ref, inView] = useInView();

  return (
    <section className="hidden md:block relative bg-white overflow-hidden">
      {/* Soft orange glow — non-fixed, GPU-safe */}
      <div
        aria-hidden
        className="absolute -top-40 right-0 w-[44rem] h-[44rem] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,102,0,0.10), transparent 60%)' }}
      />

      <div
        ref={ref}
        className={`relative max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:items-center reveal ${inView ? 'in-view' : ''}`}
      >
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{eyebrow}</span>
          <h1 className="text-4xl lg:text-6xl font-black text-zinc-900 mt-5 mb-5 leading-[1.05] text-balance">
            {title}
          </h1>
          <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed">{subtitle}</p>

          {chips?.length ? (
            <div className="flex flex-wrap gap-2 mt-6">
              {chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full bg-orange-primary/10 border border-orange-primary/25 text-orange-primary text-sm font-bold px-3 py-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-primary" />
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          {actions ? <div className="flex flex-wrap gap-3 mt-8">{actions}</div> : null}
        </div>

        {image && (
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-xl shadow-zinc-900/10 aspect-[4/3]">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent z-10" />
              <img src={image} alt={imageAlt || ''} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>

      <div className="h-[2px] bg-[#FF6600] w-full" />
    </section>
  );
}
