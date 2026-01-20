import { Phone, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] bg-zinc-950 overflow-hidden">
      {/* Animation keyframes */}
      <style>{`
        @keyframes floatDrill {
          0%, 100% { transform: translate(0, 0) rotate(-5deg); }
          25% { transform: translate(15px, -20px) rotate(0deg); }
          50% { transform: translate(-10px, -35px) rotate(5deg); }
          75% { transform: translate(20px, -15px) rotate(-3deg); }
        }
        @keyframes floatExcavator {
          0%, 100% { transform: translate(0, 0) rotate(3deg); }
          33% { transform: translate(-20px, 25px) rotate(-2deg); }
          66% { transform: translate(15px, 10px) rotate(5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>

      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Subtle diagonal lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)'
        }}
      />

      {/* Radial gradient overlay - positioned left for darker right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 25% 50%, rgba(70, 70, 77, 0.4) 0%, rgba(9, 9, 11, 0.95) 60%)'
        }}
      />

      {/* Floating Construction Equipment Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Drill - top left area */}
        <div
          className="absolute top-[15%] left-[5%] w-32 h-32 opacity-[0.22]"
          style={{ animation: 'floatDrill 12s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Drill body */}
            <rect x="25" y="35" width="35" height="25" rx="3" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Handle */}
            <path d="M60 42 L75 42 L75 53 L60 53" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <rect x="70" y="38" width="15" height="20" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Drill bit */}
            <path d="M25 47 L5 47" stroke="#ff6600" strokeWidth="3" strokeLinecap="round"/>
            <path d="M12 47 L5 44 M12 47 L5 50" stroke="#ff6600" strokeWidth="2" strokeLinecap="round"/>
            {/* Chuck */}
            <rect x="18" y="43" width="7" height="8" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Trigger */}
            <path d="M65 53 L65 62 L70 62" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Ventilation lines */}
            <line x1="30" y1="40" x2="40" y2="40" stroke="#ff6600" strokeWidth="1" opacity="0.5"/>
            <line x1="30" y1="44" x2="40" y2="44" stroke="#ff6600" strokeWidth="1" opacity="0.5"/>
          </svg>
        </div>

        {/* Floating Excavator - bottom left area */}
        <div
          className="absolute top-[55%] left-[8%] w-44 h-44 opacity-[0.22]"
          style={{ animation: 'floatExcavator 15s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Tracks */}
            <rect x="10" y="75" width="55" height="15" rx="7" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="18" cy="82" r="4" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="57" cy="82" r="4" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="37" cy="82" r="3" stroke="#ff6600" strokeWidth="1" fill="none"/>
            {/* Body/Cab */}
            <rect x="20" y="55" width="40" height="20" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Cab window */}
            <rect x="25" y="58" width="15" height="12" rx="1" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Boom base */}
            <circle cx="55" cy="58" r="5" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Boom arm */}
            <path d="M58 55 L85 30" stroke="#ff6600" strokeWidth="3" strokeLinecap="round"/>
            {/* Stick/Dipper */}
            <path d="M85 30 L105 50" stroke="#ff6600" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Bucket */}
            <path d="M105 50 L115 55 L110 65 L100 60 L105 50" stroke="#ff6600" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            {/* Bucket teeth */}
            <path d="M102 62 L100 67 M106 63 L105 68 M110 63 L110 68" stroke="#ff6600" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Hydraulic cylinders */}
            <line x1="50" y1="52" x2="70" y2="35" stroke="#ff6600" strokeWidth="1.5"/>
            <line x1="88" y1="33" x2="98" y2="48" stroke="#ff6600" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Floating Crane - middle left area */}
        <div
          className="absolute top-[30%] left-[18%] w-36 h-36 opacity-[0.22]"
          style={{ animation: 'floatDrill 14s ease-in-out infinite', animationDelay: '2s' }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Crane base/tracks */}
            <rect x="15" y="80" width="40" height="12" rx="4" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="23" cy="86" r="3" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="47" cy="86" r="3" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Crane body */}
            <rect x="25" y="65" width="20" height="15" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Cabin */}
            <rect x="28" y="68" width="10" height="8" rx="1" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Main boom/tower */}
            <path d="M35 65 L35 25" stroke="#ff6600" strokeWidth="3" strokeLinecap="round"/>
            {/* Jib arm */}
            <path d="M35 28 L80 28" stroke="#ff6600" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Counter jib */}
            <path d="M35 28 L15 28" stroke="#ff6600" strokeWidth="2" strokeLinecap="round"/>
            {/* Counterweight */}
            <rect x="10" y="25" width="8" height="6" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Hook cable */}
            <path d="M70 28 L70 50" stroke="#ff6600" strokeWidth="1.5"/>
            {/* Hook */}
            <path d="M66 50 L74 50 L74 55 C74 58, 70 60, 66 55 L66 50" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Support cables */}
            <path d="M35 25 L15 28" stroke="#ff6600" strokeWidth="1" opacity="0.7"/>
            <path d="M35 25 L80 28" stroke="#ff6600" strokeWidth="1" opacity="0.7"/>
          </svg>
        </div>

        {/* Floating Bulldozer - bottom area */}
        <div
          className="absolute top-[72%] left-[3%] w-32 h-32 opacity-[0.22]"
          style={{ animation: 'floatExcavator 11s ease-in-out infinite', animationDelay: '4s' }}
        >
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Tracks */}
            <rect x="20" y="55" width="60" height="18" rx="8" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="30" cy="64" r="5" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="70" cy="64" r="5" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="50" cy="64" r="3" stroke="#ff6600" strokeWidth="1" fill="none"/>
            {/* Body */}
            <rect x="30" y="35" width="45" height="20" rx="3" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Cabin */}
            <rect x="55" y="25" width="18" height="15" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <rect x="58" y="28" width="12" height="8" rx="1" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Blade */}
            <path d="M20 40 L10 35 L10 60 L20 55" stroke="#ff6600" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
            {/* Blade reinforcement */}
            <path d="M15 42 L15 53" stroke="#ff6600" strokeWidth="1.5"/>
            {/* Hydraulic arm for blade */}
            <path d="M20 45 L30 42" stroke="#ff6600" strokeWidth="2"/>
            {/* Exhaust */}
            <rect x="35" y="28" width="4" height="10" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Floating Concrete Mixer Truck - top area */}
        <div
          className="absolute top-[8%] left-[22%] w-36 h-36 opacity-[0.22]"
          style={{ animation: 'floatExcavator 13s ease-in-out infinite', animationDelay: '1s' }}
        >
          <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Wheels */}
            <circle cx="25" cy="65" r="10" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="25" cy="65" r="5" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="90" cy="65" r="10" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="90" cy="65" r="5" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Truck cabin */}
            <rect x="10" y="40" width="25" height="20" rx="3" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <rect x="14" y="44" width="12" height="10" rx="1" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Truck chassis */}
            <path d="M35 55 L100 55 L100 60 L35 60 Z" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Mixer drum */}
            <ellipse cx="70" cy="40" rx="28" ry="18" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Drum stripes */}
            <path d="M50 30 C55 40, 55 50, 50 55" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <path d="M65 25 C70 40, 70 50, 65 58" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <path d="M80 25 C85 40, 85 50, 80 58" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Drum opening/chute */}
            <path d="M98 40 L110 35 L112 42 L100 45" stroke="#ff6600" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            {/* Support frame */}
            <path d="M45 55 L55 30" stroke="#ff6600" strokeWidth="1.5"/>
            <path d="M95 55 L90 30" stroke="#ff6600" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Floating Dump Truck - middle area */}
        <div
          className="absolute top-[45%] left-[1%] w-32 h-32 opacity-[0.22]"
          style={{ animation: 'floatDrill 16s ease-in-out infinite', animationDelay: '6s' }}
        >
          <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Wheels */}
            <circle cx="20" cy="55" r="8" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="20" cy="55" r="4" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            <circle cx="75" cy="55" r="8" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <circle cx="75" cy="55" r="4" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Cabin */}
            <rect x="8" y="32" width="20" height="18" rx="2" stroke="#ff6600" strokeWidth="2" fill="none"/>
            <rect x="11" y="35" width="10" height="9" rx="1" stroke="#ff6600" strokeWidth="1.5" fill="none"/>
            {/* Chassis */}
            <path d="M28 45 L88 45 L88 50 L28 50 Z" stroke="#ff6600" strokeWidth="2" fill="none"/>
            {/* Dump bed */}
            <path d="M30 15 L30 42 L90 42 L90 25 L75 15 L30 15" stroke="#ff6600" strokeWidth="2" strokeLinejoin="round" fill="none"/>
            {/* Dump bed ribs */}
            <line x1="45" y1="15" x2="45" y2="42" stroke="#ff6600" strokeWidth="1.5"/>
            <line x1="60" y1="15" x2="60" y2="42" stroke="#ff6600" strokeWidth="1.5"/>
            <line x1="75" y1="20" x2="75" y2="42" stroke="#ff6600" strokeWidth="1.5"/>
            {/* Hydraulic cylinder */}
            <path d="M35 42 L50 25" stroke="#ff6600" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative h-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative h-full flex items-center">

          {/* Image Container - positioned on the right */}
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="relative w-full lg:w-[75%] xl:w-[70%] h-[70%] lg:h-[80%]">
              {/* Background Images with blur edges */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Left edge blur/fade into background */}
                <div
                  className="absolute inset-y-0 left-0 w-[40%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(9,9,11,1) 0%, rgba(9,9,11,0.9) 20%, rgba(9,9,11,0.6) 50%, transparent 100%)'
                  }}
                />

                {/* Top edge subtle fade */}
                <div
                  className="absolute inset-x-0 top-0 h-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(9,9,11,0.5) 0%, transparent 100%)'
                  }}
                />

                {/* Bottom edge fade */}
                <div
                  className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(9,9,11,0.8) 0%, transparent 100%)'
                  }}
                />

                {/* Corner blur effects */}
                <div
                  className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(9,9,11,0.9) 0%, transparent 70%)'
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at bottom left, rgba(9,9,11,0.9) 0%, transparent 70%)'
                  }}
                />
                <div
                  className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.5) 40%, transparent 70%)'
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at bottom right, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.5) 40%, transparent 70%)'
                  }}
                />
                {/* Right edge fade - stronger blur effect */}
                <div
                  className="absolute inset-y-0 right-0 w-[35%] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to left, rgba(9,9,11,1) 0%, rgba(9,9,11,0.85) 25%, rgba(9,9,11,0.5) 50%, rgba(9,9,11,0.2) 75%, transparent 100%)'
                  }}
                />
              </div>

              {/* Slide Dots Navigation - Bottom Center of image */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-2.5 bg-orange-primary'
                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Prejsť na obrázok ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Left Side - Text Content */}
          <div className="relative z-10 w-full lg:w-[45%] xl:w-[40%]">
            {/* Pulsing glow behind text */}
            <div
              className="absolute -inset-8 lg:-inset-12"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,102,0,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'pulseGlow 4s ease-in-out infinite'
              }}
            />
            {/* Blur background behind text - smaller and more subtle */}
            <div
              className="absolute -inset-4 lg:-inset-6"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.5) 50%, rgba(9,9,11,0.2) 75%, transparent 100%)',
                filter: 'blur(25px)'
              }}
            />

            <div className="relative space-y-6">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Prenájom
                <br />
                <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
                  stavebnej techniky
                </span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md">
                Profesionálne náradie, stroje a mechanizácia pre stavby všetkých veľkostí.{' '}
                <span className="text-orange-primary font-semibold">
                  Doprava na stavbu do 24 hodín.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="tel:+421948555551"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
                >
                  <Phone size={20} />
                  <span>Zavolať teraz</span>
                </a>
                <a
                  href="#katalog"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800/80 border border-white/20 text-white font-bold rounded-full hover:bg-zinc-700 hover:border-white/30 transition-all backdrop-blur-sm"
                >
                  <span>Zobraziť katalóg</span>
                  <ArrowDown size={20} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Orange Line Separator at Bottom - thin and subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary/70 to-transparent"></div>
    </section>
  );
}