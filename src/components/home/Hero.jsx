import { Phone, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[45vh] min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/hero-pozicovna.webp"
          alt="Royal Stroje - Požičovňa náradia a stavebnej techniky"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

      {/* Content - Full Width */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Prenájom náradia a{' '}
            <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
              stavebnej techniky
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-2xl">
            Profesionálne náradie, stroje a mechanizácia pre stavby všetkých veľkostí.{' '}
            <strong className="text-orange-primary font-bold">
              Doprava na stavbu do 24 hodín.
            </strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
            >
              <Phone size={20} />
              <span>Zavolať teraz</span>
            </a>
            <a
              href="#katalog"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-black/50 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full hover:bg-black/70 hover:border-white/50 transition-all"
            >
              <span>Zobraziť katalóg</span>
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
