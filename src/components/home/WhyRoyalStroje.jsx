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
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4">
            Prečo si nás vyberajú stavbári v{' '}
            <span className="text-orange-primary">Senci a Bratislave</span>
          </h2>
          <p className="text-white/70 text-sm md:text-lg max-w-3xl mx-auto">
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
                className={`group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden reveal stagger-${i + 1} ${gridInView ? 'in-view' : ''}`}
              >
                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}></div>

                <div className="relative">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                    <Icon className="text-orange-primary" size={20} />
                  </div>

                  <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 group-hover:text-orange-primary transition-colors leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
