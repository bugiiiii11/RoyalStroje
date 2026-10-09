import { Truck, Phone, MapPin, Clock } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

// Each benefit leads with ONE hard figure -- a number is read at a glance, an
// icon + paragraph is not. Every figure is lifted from the copy beneath it
// (no new claims): 24 h heavy machinery, 24/7 phone, the 8 towns listed, 20 years.
const benefits = [
  {
    icon: Truck,
    value: '24',
    unit: 'h',
    title: 'Expresný dovoz',
    description: 'Malé náradie a stredná mechanizácia na stavbe v ten istý deň. Ťažká technika do 24 hodín.',
  },
  {
    icon: Phone,
    value: '24/7',
    unit: '',
    title: 'Nonstop podpora',
    description: 'Problém na stavbe? Sme telefonicky dostupní kedykoľvek.',
  },
  {
    icon: MapPin,
    value: '8',
    unit: '+',
    title: 'Miest v regióne',
    description: 'Senec, Bratislava, Galanta, Trnava, Pezinok, Modra, Sereď, Šamorín a okolie.',
  },
  {
    icon: Clock,
    value: '20',
    unit: 'rokov',
    title: 'Skúseností',
    description: 'Dlhoročné know-how v prenájme techniky a poradenstvo pri výbere strojov.',
  },
];

// Hairlines between cells: 2-col grid on mobile, 4-col on lg.
const cellBorders = [
  '',
  'border-l border-white/10',
  'border-t border-white/10 lg:border-t-0 lg:border-l',
  'border-l border-t border-white/10 lg:border-t-0',
];

export default function WhyRoyalStroje() {
  const [headingRef, headingInView] = useInView();
  const [panelRef, panelInView] = useInView();

  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Heading + supporting line stacked -- same pattern as the FAQ heading below */}
        <div
          ref={headingRef}
          className={`mb-6 md:mb-10 reveal ${headingInView ? 'in-view' : ''}`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-zinc-900 leading-[1.05] text-balance mb-3 md:mb-4">
            Prečo si nás vyberajú stavbári v{' '}
            <span className="text-orange-primary">Senci a Bratislave</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg max-w-2xl text-pretty">
            20 rokov skúseností v prenájme stavebnej techniky pre firmy aj súkromné osoby
          </p>
        </div>

        {/* One dark panel, hairline-divided, figure-led cells */}
        <div
          ref={panelRef}
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-lg shadow-zinc-900/10 reveal ${panelInView ? 'in-view' : ''}`}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />

          {/* Faint engineering grid -- same texture as SourcingBanner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />

          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className={`group flex flex-col p-4 pt-5 md:p-7 lg:p-8 xl:p-10 hover:bg-white/[0.03] transition-colors duration-300 ${cellBorders[i]}`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3 md:mb-5">
                    <p className="font-display font-black text-orange-primary leading-none tracking-tight">
                      <span className="text-4xl md:text-5xl xl:text-6xl">{b.value}</span>
                      {b.unit && (
                        <span className="ml-1 text-lg md:text-2xl xl:text-3xl text-orange-primary/80">{b.unit}</span>
                      )}
                    </p>
                    <span className="hidden md:grid place-items-center shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 group-hover:text-orange-primary group-hover:border-orange-primary/40 transition-colors">
                      <Icon size={18} />
                    </span>
                  </div>

                  <h3 className="text-white font-bold uppercase tracking-wide text-xs md:text-sm xl:text-base mb-1.5 md:mb-2 leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
