import { Truck, Phone, MapPin, Clock } from 'lucide-react';

export default function WhyRoyalStroje() {
  return (
    <div className="hidden md:block relative py-16 lg:py-20">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.3) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Prečo si nás vyberajú stavbári v{' '}
            <span className="text-orange-primary">Senci a Bratislave</span>
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            20 rokov skúseností v prenájme stavebnej techniky pre firmy aj súkromné osoby
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Benefit 1 - Rýchly dovoz */}
          <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Animated border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite'
            }}></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                <Truck className="text-orange-primary" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Dovoz do 4 hodín</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Malé náradie a stredná mechanizácia na stavbe v ten istý deň. Ťažká technika do 24 hodín.
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
          </div>

          {/* Benefit 2 - Nonstop dostupnosť */}
          <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Animated border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite'
            }}></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                <Phone className="text-orange-primary" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Nonstop podpora</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Telefonicky dostupní 24/7. Problém na stavbe? Voláme vám späť do 15 minút.
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
          </div>

          {/* Benefit 3 - Lokálna dostupnosť */}
          <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Animated border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite'
            }}></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                <MapPin className="text-orange-primary" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Región Senec – Bratislava</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Obsluhujeme Senec, Bratislavu, Galantu, Trnavu, Pezinok, Modru, Sereď, Šamorín a okolie.
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
          </div>

          {/* Benefit 4 - Skúsenosti */}
          <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            {/* Animated border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite'
            }}></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                <Clock className="text-orange-primary" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">20 rokov skúseností</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Dlhoročné know-how v prenájme techniky. Profesionálne poradenstvo pri výbere strojov.
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
