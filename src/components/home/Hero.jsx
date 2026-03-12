import { Phone, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const akcioveProdukty = [
  {
    nazov: 'Optický prístroj',
    cena: 12,
    zlava: 20,
    obrazok: '/products/nivelak-akcia.webp'
  },
  {
    nazov: 'Uhlová brúska AKU 125mm',
    cena: 8,
    zlava: 15,
    obrazok: '/products/bruska-akcia.webp'
  },
  {
    nazov: 'Pracovné kozy',
    cena: 5,
    zlava: 10,
    obrazok: '/products/kozy-akcia.webp'
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % akcioveProdukty.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

            {/* Akciové produkty carousel */}
            <div className="mt-8 md:mt-10">
              <div className="group inline-flex items-stretch bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-orange-primary/30 transition-all duration-300">
                {/* Product image container - square */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 flex-shrink-0">
                  {/* Discount badge */}
                  <div className="absolute top-2 left-2 z-10">
                    {akcioveProdukty.map((produkt, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center gap-1 bg-orange-primary text-white text-xs font-bold px-2 py-1 rounded-lg transition-all duration-300 ${
                          index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90 absolute'
                        }`}
                      >
                        -{produkt.zlava}%
                      </span>
                    ))}
                  </div>

                  {/* Rotating product images */}
                  {akcioveProdukty.map((produkt, index) => (
                    <img
                      key={index}
                      src={produkt.obrazok}
                      alt={produkt.nazov}
                      className={`absolute inset-0 w-full h-full object-contain p-3 transition-all duration-500 ${
                        index === currentIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-90'
                      }`}
                    />
                  ))}
                </div>

                {/* Divider line */}
                <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                {/* Product info */}
                <div className="flex flex-col justify-center px-5 py-4 min-w-[180px]">
                  {/* Label */}
                  <span className="text-orange-primary text-[10px] font-semibold uppercase tracking-widest mb-1">Akcia dňa</span>

                  {/* Rotating product name */}
                  <div className="relative h-6 overflow-hidden mb-2">
                    {akcioveProdukty.map((produkt, index) => (
                      <span
                        key={index}
                        className={`absolute inset-0 text-white text-sm md:text-base font-semibold leading-tight transition-all duration-500 ${
                          index === currentIndex
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-full'
                        }`}
                      >
                        {produkt.nazov}
                      </span>
                    ))}
                  </div>

                  {/* Price section */}
                  <div className="flex items-baseline gap-2">
                    {/* Current price */}
                    <div className="relative h-7 overflow-hidden">
                      {akcioveProdukty.map((produkt, index) => {
                        const povodna = produkt.cena;
                        const zlava = Math.round(povodna * (1 - produkt.zlava / 100) * 10) / 10;
                        return (
                          <span
                            key={index}
                            className={`absolute inset-0 text-white text-xl md:text-2xl font-black transition-all duration-500 ${
                              index === currentIndex
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-full'
                            }`}
                          >
                            {zlava.toFixed(0)}€
                          </span>
                        );
                      })}
                    </div>

                    {/* Original price */}
                    <div className="relative h-4 overflow-hidden">
                      {akcioveProdukty.map((produkt, index) => (
                        <span
                          key={index}
                          className={`absolute inset-0 text-white/40 text-sm line-through transition-all duration-500 ${
                            index === currentIndex
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-full'
                          }`}
                        >
                          {produkt.cena}€
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
