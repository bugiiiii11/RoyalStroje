import { Phone, ArrowDown } from 'lucide-react';

export default function Hero() {

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0">
        <img
          src="/stroje2.webp"
          alt="Požičovňa stavebnej techniky Royal Stroje Senec - profesionálne náradie a stroje na prenájom"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
      </div>

      {/* Gradient fade na spodok - prechod do content sekcie */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, #181818)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 w-full pb-20 lg:pb-24">
          <div className="max-w-xl backdrop-blur-sm bg-black/40 rounded-2xl p-6 md:p-8">
            {/* Headline */}
            <h1 className="hero-desk-1 text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 md:mb-4">
              Požičovňa náradia a{' '}
              <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
                stavebnej techniky v Senci.
              </span>
            </h1>

            {/* Description */}
            <div className="hero-desk-2">
              <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-2">
                Obsluhujeme Bratislavu a okolie s dovozom na stavbu.
              </p>
              <p className="text-sm md:text-lg text-orange-primary font-bold leading-relaxed mb-4 md:mb-6">
                Po-Pia 7-16 • Nonstop linka +421 948 555 551
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-desk-3 flex flex-col sm:flex-row gap-2.5 md:gap-3">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-xs md:text-sm rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={16} className="md:w-4 md:h-4" />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-zinc-800 border-2 border-orange-primary/30 text-white font-bold text-xs md:text-sm rounded-full hover:bg-zinc-700 hover:border-orange-primary transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>Zobraziť katalóg</span>
                <ArrowDown size={16} className="md:w-4 md:h-4" />
              </a>
            </div>
          </div>

          <style>{`
            .hero-desk-1 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.15s; }
            .hero-desk-2 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.35s; }
            .hero-desk-3 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.55s; }

            @keyframes heroDeskFadeUp {
              from { opacity: 0; transform: translateY(32px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
