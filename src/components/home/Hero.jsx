import { Phone, ArrowDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const heroRef = useRef(null);

  const slides = [
    { id: 1, image: '/hero-pozicovna.webp', alt: 'Royal Stroje - Požičovňa náradia' },
    { id: 2, image: '/hero-main1.webp', alt: 'Royal Stroje - Stavebná technika' },
    { id: 3, image: '/hero-main2.webp', alt: 'Royal Stroje - Profesionálne náradie' },
    { id: 4, image: '/hero-main3.webp', alt: 'Royal Stroje - Mechanizácia' },
    { id: 5, image: '/hero-main4.webp', alt: 'Royal Stroje - Ťažká technika' },
  ];

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
    <section ref={heroRef} className="relative py-12 md:py-20 bg-black overflow-hidden">
      {/* Modern geometric bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        {/* Angled cut with steps */}
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          {/* Main shape */}
          <path
            d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
            fill="#09090b"
          />
          {/* Orange accent line */}
          <path
            d="M0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30"
            fill="none"
            stroke="rgba(255,102,0,0.6)"
            strokeWidth="2"
          />
          {/* Glow line */}
          <path
            d="M250,0 L600,0"
            fill="none"
            stroke="rgba(255,102,0,0.8)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

          {/* Left Side - Text Content (1/3) */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Prenájom náradia a{' '}
              <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
                stavebnej techniky
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Profesionálne náradie, stroje a mechanizácia pre stavby všetkých veľkostí.{' '}
              <strong className="text-orange-primary font-bold">
                Doprava na stavbu do 24 hodín.
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 border-2 border-white/20 text-white font-bold rounded-full hover:bg-zinc-800 hover:border-white/30 transition-all"
              >
                <span>Zobraziť katalóg</span>
                <ArrowDown size={20} />
              </a>
            </div>
          </div>

          {/* Right Side - Image Carousel (2/3) */}
          <div className="w-full lg:w-2/3">
            <div className="relative">
              {/* Image Container with Frame */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-orange-primary/20 bg-zinc-900 shadow-2xl">
                {/* Images with Parallax */}
                <div className="relative aspect-[16/7.2] overflow-hidden">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-[120%] object-cover transition-transform duration-100"
                        style={{ transform: `translateY(-${parallaxOffset * 0.15}px) scale(1.05)` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Gradient Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-3 mt-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-12 h-3 bg-orange-primary rounded-full'
                        : 'w-3 h-3 bg-white/30 rounded-full hover:bg-white/50'
                    }`}
                    aria-label={`Prejsť na obrázok ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
