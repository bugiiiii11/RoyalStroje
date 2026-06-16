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

export default function WhyRoyalStroje() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();

  return (
    <div className="relative py-12 md:py-16 lg:py-20">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.3) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-8 md:mb-12 lg:mb-16 reveal ${headingInView ? 'in-view' : ''}`}
        >
          <span className="eyebrow eyebrow--center mb-4">Prečo Royal Stroje</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 mt-4">
            Prečo si nás vyberajú stavbári v{' '}
            <span className="text-orange-primary">Senci a Bratislave</span>
          </h2>
          <p className="text-white/60 text-sm md:text-lg max-w-3xl mx-auto">
            20 rokov skúseností v prenájme stavebnej techniky pre firmy aj súkromné osoby
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
        >
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`group relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg shadow-black/40 hover:border-orange-primary/50 hover:shadow-xl hover:shadow-orange-primary/15 transition-all duration-300 overflow-hidden reveal stagger-${i + 1} ${gridInView ? 'in-view' : ''}`}
              >
                {/* Big faint index number */}
                <span className="absolute top-2 right-3 md:top-3 md:right-4 font-display text-3xl md:text-5xl font-black text-white/[0.06] group-hover:text-orange-primary/15 transition-colors pointer-events-none select-none">
                  0{i + 1}
                </span>

                <div className="relative">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                    <Icon className="text-orange-primary" size={20} />
                  </div>

                  <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 group-hover:text-orange-primary transition-colors leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom accent line grows on hover (width transition — no GPU layer) */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-primary to-orange-hover transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
