import { Phone, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Temporary: using same image 5 times, will be replaced with different images
  const slides = [
    { id: 1, image: '/hero-pozicovna.webp', alt: 'Royal Stroje - Novinky 1' },
    { id: 2, image: '/hero-pozicovna.webp', alt: 'Royal Stroje - Novinky 2' },
    { id: 3, image: '/hero-pozicovna.webp', alt: 'Royal Stroje - Novinky 3' },
    { id: 4, image: '/hero-pozicovna.webp', alt: 'Royal Stroje - Novinky 4' },
    { id: 5, image: '/hero-pozicovna.webp', alt: 'Royal Stroje - Novinky 5' },
  ];

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
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
                {/* Images */}
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
                        className="w-full h-full object-cover"
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
