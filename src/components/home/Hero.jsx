import { Phone, ArrowDown } from 'lucide-react';

export default function Hero() {

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero1.webp"
          alt="Požičovňa stavebnej techniky Royal Stroje Senec - profesionálne náradie a stroje na prenájom"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark gradient overlay from right to left for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 75%, transparent 100%)
          `
        }}
      />

      {/* Additional gradient from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)'
        }}
      />

      {/* Gradient fade na spodok - prechod do content sekcie */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, #181818)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 w-full pt-28 pb-24 md:py-24">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-4 md:mb-6">
              Požičovňa náradia a{' '}
              <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
                stavebnej techniky v Senci.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-xl text-white/90 leading-relaxed mb-2">
              Obsluhujeme Bratislavu a okolie s dovozom na stavbu.
            </p>
            <p className="text-base md:text-xl text-orange-primary font-bold leading-relaxed mb-6 md:mb-8">
              Po-Pia 7-16 • Nonstop linka +421 948 555 551
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-base rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={18} className="md:w-5 md:h-5" />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-zinc-800 border-2 border-orange-primary/30 text-white font-bold text-sm md:text-base rounded-full hover:bg-zinc-700 hover:border-orange-primary transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>Zobraziť katalóg</span>
                <ArrowDown size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
