import { Link } from 'react-router-dom';
import { PackageSearch, Phone, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const PHONE = 'tel:+421948555551';

const chips = ['Overení partneri', 'Rýchle zabezpečenie', 'Doprava na stavbu'];

// Bold dark+orange CTA band placed between the catalog grid and "Prečo Royal Stroje".
// Stands out against the light homepage so the "we'll source anything" message is hard to miss.
// GPU-safe: every decorative layer is a non-fixed `absolute` element; reveal ends at transform:none.
export default function SourcingBanner() {
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
          <PackageSearch
            aria-hidden="true"
            className="hidden lg:block absolute right-8 xl:right-24 top-1/2 -translate-y-1/2 text-orange-primary/15"
            size={260}
            strokeWidth={1}
          />

          {/* Content */}
          <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 max-w-2xl">
            <span className="eyebrow mb-5">Nemáme to v ponuke? Žiadny problém</span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] mt-4 mb-4 text-balance">
              Nenašli ste stroj, <span className="text-orange-primary">ktorý hľadáte?</span>
            </h2>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
              Čo nemáme v našom strojovom parku, <strong className="text-white font-semibold">zoženieme za vás</strong> cez
              sieť overených partnerov — vrátane dopravy priamo na stavbu. Jeden telefonát, jeden kontakt, jedna faktúra.
            </p>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {chips.map((c) => (
                <li key={c} className="flex items-center gap-2 text-zinc-200 text-sm font-medium">
                  <span className="text-orange-primary">✓</span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link to="/sluzby/zabezpecenie-techniky" className="btn-primary text-base px-7 py-4 group">
                <PackageSearch size={18} />
                Zoženieme vám ho
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a href={PHONE} className="btn-secondary text-base px-7 py-4">
                <Phone size={18} />
                0948 555 551
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
