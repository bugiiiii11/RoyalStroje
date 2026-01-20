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
    <section ref={heroRef} className="relative pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-20 bg-black overflow-hidden">
      {/* Animation keyframes for floating icons */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(-3deg); }
          25% { transform: translate(12px, -18px) rotate(2deg); }
          50% { transform: translate(-8px, -30px) rotate(-5deg); }
          75% { transform: translate(18px, -12px) rotate(0deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(2deg); }
          33% { transform: translate(-15px, 20px) rotate(-3deg); }
          66% { transform: translate(12px, 8px) rotate(4deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -15px) rotate(-2deg); }
        }
      `}</style>

      {/* Floating Construction Equipment Icons - Left Side */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Excavator - top left */}
        <div
          className="absolute top-[15%] left-[3%] w-40 h-40 opacity-[0.35]"
          style={{ animation: 'float1 14s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Tracks */}
            <rect x="10" y="75" width="55" height="15" rx="7" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            <circle cx="18" cy="82" r="4" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="57" cy="82" r="4" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="37" cy="82" r="3" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Body/Cab */}
            <rect x="20" y="55" width="40" height="20" rx="3" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            {/* Cab window */}
            <rect x="25" y="58" width="15" height="12" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Boom base */}
            <circle cx="55" cy="58" r="5" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            {/* Boom arm */}
            <path d="M58 55 L85 30" stroke="#ff6600" strokeWidth="3.5" strokeLinecap="round"/>
            {/* Stick/Dipper */}
            <path d="M85 30 L105 50" stroke="#ff6600" strokeWidth="3" strokeLinecap="round"/>
            {/* Bucket */}
            <path d="M105 50 L115 55 L110 65 L100 60 L105 50" stroke="#ff6600" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
            {/* Bucket teeth */}
            <path d="M102 62 L100 68 M106 63 L105 69 M110 63 L110 69" stroke="#ff6600" strokeWidth="2" strokeLinecap="round"/>
            {/* Hydraulic cylinders */}
            <line x1="50" y1="52" x2="70" y2="35" stroke="#ff6600" strokeWidth="2"/>
            <line x1="88" y1="33" x2="98" y2="48" stroke="#ff6600" strokeWidth="2"/>
          </svg>
        </div>

        {/* Crane - middle left */}
        <div
          className="absolute top-[40%] left-[6%] w-36 h-36 opacity-[0.35]"
          style={{ animation: 'float2 16s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Crane base/tracks */}
            <rect x="15" y="80" width="40" height="12" rx="5" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            <circle cx="23" cy="86" r="3" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="47" cy="86" r="3" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Crane body */}
            <rect x="25" y="65" width="20" height="15" rx="2" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            {/* Cabin */}
            <rect x="28" y="68" width="10" height="8" rx="1" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Main boom/tower */}
            <path d="M35 65 L35 25" stroke="#ff6600" strokeWidth="3.5" strokeLinecap="round"/>
            {/* Jib arm */}
            <path d="M35 28 L80 28" stroke="#ff6600" strokeWidth="3" strokeLinecap="round"/>
            {/* Counter jib */}
            <path d="M35 28 L15 28" stroke="#ff6600" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Counterweight */}
            <rect x="10" y="25" width="8" height="6" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Hook cable */}
            <path d="M70 28 L70 50" stroke="#ff6600" strokeWidth="2"/>
            {/* Hook */}
            <path d="M66 50 L74 50 L74 55 C74 58, 70 60, 66 55 L66 50" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Support cables */}
            <path d="M35 25 L15 28" stroke="#ff6600" strokeWidth="1.5" opacity="0.8"/>
            <path d="M35 25 L80 28" stroke="#ff6600" strokeWidth="1.5" opacity="0.8"/>
          </svg>
        </div>

        {/* Dump Truck - bottom left */}
        <div
          className="absolute top-[65%] left-[2%] w-44 h-44 opacity-[0.35]"
          style={{ animation: 'float3 12s ease-in-out infinite', animationDelay: '2s' }}
        >
          <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Wheels */}
            <circle cx="25" cy="62" r="12" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            <circle cx="25" cy="62" r="6" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="90" cy="62" r="12" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            <circle cx="90" cy="62" r="6" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Cabin */}
            <rect x="8" y="32" width="28" height="25" rx="3" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            <rect x="12" y="36" width="16" height="12" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Chassis */}
            <path d="M36 50 L108 50 L108 57 L36 57 Z" stroke="#ff6600" strokeWidth="2.5" fill="none"/>
            {/* Dump bed */}
            <path d="M40 15 L40 47 L110 47 L110 28 L92 15 L40 15" stroke="#ff6600" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
            {/* Dump bed ribs */}
            <line x1="55" y1="15" x2="55" y2="47" stroke="#ff6600" strokeWidth="2"/>
            <line x1="70" y1="15" x2="70" y2="47" stroke="#ff6600" strokeWidth="2"/>
            <line x1="85" y1="18" x2="85" y2="47" stroke="#ff6600" strokeWidth="2"/>
            {/* Hydraulic cylinder */}
            <path d="M45 47 L60 28" stroke="#ff6600" strokeWidth="2"/>
          </svg>
        </div>
      </div>

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
