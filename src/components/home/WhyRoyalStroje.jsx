import { Truck, Phone, MapPin, Clock } from 'lucide-react';

export default function WhyRoyalStroje() {
  return (
    <section className="hidden md:block relative bg-zinc-950 py-16 lg:py-20 overflow-hidden">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.3) 0%, rgba(9, 9, 11, 1) 70%)'
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
            12 rokov skúseností v prenájme stavebnej techniky pre firmy aj súkromné osoby
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Benefit 1 - Rýchly dovoz */}
          <div className="group relative bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-orange-primary to-orange-hover rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="text-white" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2">Dovoz do 4 hodín</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Malé náradie a stredná mechanizácia na stavbe v ten istý deň. Ťažká technika do 24 hodín.
              </p>
            </div>
          </div>

          {/* Benefit 2 - Nonstop dostupnosť */}
          <div className="group relative bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-orange-primary to-orange-hover rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="text-white" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2">Nonstop podpora</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Telefonicky dostupní 24/7. Problém na stavbe? Voláme vám späť do 15 minút.
              </p>
            </div>
          </div>

          {/* Benefit 3 - Lokálna dostupnosť */}
          <div className="group relative bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-orange-primary to-orange-hover rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="text-white" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2">Región Senec – Bratislava</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Obsluhujeme Senec, Bratislavu, Galantu, Trnavu, Pezinok, Modru, Sereď, Šamorín a okolie.
              </p>
            </div>
          </div>

          {/* Benefit 4 - Skúsenosti */}
          <div className="group relative bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-orange-primary to-orange-hover rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="text-white" size={28} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2">12 rokov skúseností</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Dlhoročné know-how v prenájme techniky. Profesionálne poradenstvo pri výbere strojov.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-white/70 text-lg mb-6">
            Stavebná technika a náradie{' '}
            <span className="text-orange-primary font-bold">priamo v Senci</span> na Reckej ceste 182
          </p>
          <a
            href="tel:+421948555551"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
          >
            <Phone size={20} />
            <span>Zavolať: 0948 555 551</span>
          </a>
        </div>
      </div>
    </section>
  );
}
