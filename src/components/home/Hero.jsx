import { Phone, ArrowDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const heroRef = useRef(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const heroTop = heroRef.current.offsetTop;
        const heroHeight = heroRef.current.offsetHeight;

        if (scrolled < heroTop + heroHeight) {
          setParallaxOffset(scrolled * 0.3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero1.png"
          alt="Royal Stroje - Prenájom stavebnej techniky"
          className="w-full h-full object-cover transition-transform duration-100"
          style={{
            transform: `translateY(-${parallaxOffset * 0.15}px) scale(1.05)`,
            minHeight: '100%',
            minWidth: '100%'
          }}
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

      {/* Modern geometric bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-20">
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
            fill="#09090b"
          />
          <path
            d="M0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30"
            fill="none"
            stroke="rgba(255,102,0,0.6)"
            strokeWidth="2"
          />
          <path
            d="M250,0 L600,0"
            fill="none"
            stroke="rgba(255,102,0,0.8)"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 w-full py-24">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
              Požičovňa náradia a{' '}
              <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
                stavebnej techniky
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              Profesionálne náradie, stroje a mechanizácia pre stavby všetkých veľkostí.{' '}
              <strong className="text-orange-primary font-bold">
                Rýchla doprava na stavbu.
              </strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={20} />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 hover:border-white/50 transition-all"
              >
                <span>Zobraziť katalóg</span>
                <ArrowDown size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
