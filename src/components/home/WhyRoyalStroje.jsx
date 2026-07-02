import { Truck, Phone, MapPin, Clock } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const benefits = [
  {
    icon: Truck,
    title: 'Expresný dovoz',
    description: 'Malé náradie a stredná mechanizácia na stavbe v ten istý deň. Ťažká technika do 24 hodín.',
  },
  {
    icon: Phone,
    title: 'Nonstop podpora',
    description: 'Problém na stavbe? Telefonicky dostupní 24/7.',
  },
  {
    icon: MapPin,
    title: 'Región Senec – Bratislava',
    description: 'Obsluhujeme Senec, Bratislavu, Galantu, Trnavu, Pezinok, Modru, Sereď, Šamorín a okolie.',
  },
  {
    icon: Clock,
    title: '20 rokov skúseností',
    description: 'Dlhoročné know-how v prenájme techniky. Profesionálne poradenstvo pri výbere strojov.',
  },
];

// Divider borders per cell: 2-col grid on mobile, 4-col on lg.
// 1px structural hairlines between cells (not accent stripes).
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
    <div className="relative py-12 md:py-16 lg:py-20">
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-8 md:mb-12 reveal ${headingInView ? 'in-view' : ''}`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 mb-3 md:mb-4">
            Prečo si nás vyberajú stavbári v{' '}
            <span className="text-orange-primary">Senci a Bratislave</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg max-w-3xl mx-auto">
            20 rokov skúseností v prenájme stavebnej techniky pre firmy aj súkromné osoby
          </p>
        </div>

        {/* One dark panel with hairline-divided columns (single island, not 4 clone cards) */}
        <div
          ref={panelRef}
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-lg shadow-zinc-900/10 reveal ${panelInView ? 'in-view' : ''}`}
        >
          {/* Orange top accent rule — same language as CtaBand/PromoCarousel */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`group p-4 md:p-6 lg:p-8 hover:bg-white/[0.03] transition-colors duration-300 ${cellBorders[i]}`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                    <Icon className="text-orange-primary" size={20} />
                  </div>

                  <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
