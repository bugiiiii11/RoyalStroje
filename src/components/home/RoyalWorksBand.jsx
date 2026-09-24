import { ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const WORKS_URL = 'https://royalworks.sk/';

// Cross-link to Royal Works, our sister division, under the catalogue.
//
// Deliberately the quiet counterpart to SourcingBanner directly above it: that
// one is the big dark orange band ("we'll source the machine"), this one is a
// slim LIGHT card in Royal Works' own bronze. Two heavy dark bands back to back
// would fight each other, and the bronze keeps this from reading as a third
// Royal Stroje CTA. Light surface is also what the wordmark needs -- "ROYAL" is
// near-black, it would vanish on our usual dark card.
//
// GPU-safe: no fixed positioning and no backdrop-filter anywhere.
export default function RoyalWorksBand() {
  const [ref, inView] = useInView();

  return (
    <section className="relative pb-10 md:pb-14 lg:pb-16">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <a
          ref={ref}
          href={WORKS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Royal Works - prejsť na stránku našej divízie royalworks.sk"
          className={`group relative block overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-zinc-200 shadow-sm shadow-zinc-900/5 transition-all duration-300 hover:border-works-bronze/45 hover:shadow-lg hover:shadow-works-bronze/10 reveal ${inView ? 'in-view' : ''}`}
        >
          {/* Bronze spine -- the accent-bar motif used across the site, in the division's colour */}
          <div className="absolute top-0 left-0 bottom-0 w-[3px] md:w-[4px] bg-gradient-to-b from-works-bronze via-works-bronze/70 to-works-bronze/15" />

          {/* Faint engineering grid, same texture as SourcingBanner but bronze and lighter */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(155,97,51,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(155,97,51,0.9) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />

          {/* Soft bronze wash bleeding in from the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[45%] h-[200%] rounded-full transition-opacity duration-300 opacity-70 group-hover:opacity-100"
            style={{ background: 'radial-gradient(ellipse at center, rgba(155,97,51,0.10), transparent 68%)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 xl:gap-12 px-6 py-8 lg:pl-10 lg:pr-9 lg:py-9 xl:pl-11 xl:pr-10">
            {/* Wordmark. Fixed height + auto width keeps the 9.45:1 lockup honest. */}
            <img
              src="/pictures/graphics/partneri/logo_royal_works_lockup.webp"
              alt="Royal Works"
              loading="lazy"
              draggable="false"
              width={1691}
              height={179}
              className="h-6 md:h-7 xl:h-8 w-auto shrink-0 self-center lg:self-auto transition-transform duration-300 group-hover:-translate-y-0.5"
            />

            {/* Hairline separator between the mark and the message */}
            <div aria-hidden="true" className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-zinc-200 to-transparent" />

            <div className="min-w-0 lg:flex-1 text-center lg:text-left">
              <p className="font-display text-lg md:text-xl xl:text-2xl font-black text-zinc-900 leading-snug text-balance">
                Nestačí vám stroj? <span className="text-works-bronze">Prácu spravíme za vás.</span>
              </p>
              <span className="mt-2 block text-sm md:text-base font-bold text-works-bronze group-hover:text-works-bronze-dark transition-colors">
                Objavte služby našej divízie ROYAL WORKS
              </span>
            </div>

            {/* The copy's trailing arrow, promoted to a real affordance. Inline it
                detached itself from the wrapped CTA line on narrow screens, and it
                left the right third of the band empty on wide ones. */}
            <span
              aria-hidden="true"
              className="shrink-0 mx-auto lg:mx-0 flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-works-bronze/35 bg-works-bronze/[0.07] text-works-bronze transition-all duration-300 group-hover:bg-works-bronze group-hover:border-works-bronze group-hover:text-white group-hover:translate-x-1"
            >
              <ArrowRight size={20} />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
