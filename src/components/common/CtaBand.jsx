import { useInView } from '../../hooks/useInView';

/**
 * Shared dark+orange CTA band for subpages — the same industrial dark-on-light
 * accent as the homepage `SourcingBanner`. Drop it in place of a page's old
 * "zavolajte nám" CTA section. Left-aligned copy, orange top accent, faint
 * engineering grid + orange glow, optional oversized decorative icon.
 *
 * GPU-safe: every decorative layer is a non-fixed `absolute` element; the
 * reveal ends at transform:none.
 *
 * Props:
 *  - eyebrow   : small orange label (optional)
 *  - title     : headline node (string or JSX with <span className="text-orange-primary">)
 *  - text      : supporting paragraph (optional)
 *  - actions   : button/link nodes (e.g. <><a className="btn-primary">…</a>…</>)
 *  - icon      : lucide icon component for the oversized backdrop (optional)
 */
export default function CtaBand({ eyebrow, title, text, actions, icon: Icon }) {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black reveal-scale ${inView ? 'in-view' : ''}`}
        >
          {/* Orange top accent rule */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />

          {/* Faint engineering grid for industrial texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />

          {/* Orange radial glow on the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[55%] h-[180%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,102,0,0.22), transparent 65%)',
            }}
          />

          {/* Oversized decorative icon (desktop) */}
          {Icon && (
            <Icon
              aria-hidden="true"
              className="hidden lg:block absolute right-8 xl:right-24 top-1/2 -translate-y-1/2 text-orange-primary/15"
              size={260}
              strokeWidth={1}
            />
          )}

          {/* Content */}
          <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 max-w-2xl">
            {eyebrow ? <span className="eyebrow mb-5">{eyebrow}</span> : null}

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] mt-4 mb-4 text-balance">
              {title}
            </h2>

            {text ? (
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
                {text}
              </p>
            ) : null}

            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
