import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Phone, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const PHONE = '+421948555551';

// Promo slides — placeholder offers in the brand style, ready for the owner to
// swap copy/images. 3:1 banner on desktop, taller on mobile so the copy breathes.
const slides = [
  {
    eyebrow: 'Sezónna akcia',
    title: 'Jarný prenájom minirýpadiel',
    text: 'Zvýhodnené týždenné sadzby na JCB 19C-I a Wacker Neuson. Ideálne na výkopy a terénne úpravy.',
    img: '/pictures/graphics/mini-rypadlo-1000-transparent.webp',
    cta: { label: 'Zobraziť stroje', to: '#katalog' },
  },
  {
    eyebrow: 'Predajňa',
    title: 'Makita aku náradie',
    text: 'Akčné ceny na vybrané aku sety a príslušenstvo. Profesionálna kvalita pre každú stavbu.',
    img: '/pictures/graphics/utahovak-transparent.webp',
    cta: { label: 'Do predajne', to: '/sluzby/predaj-techniky' },
  },
  {
    eyebrow: 'Výhodne',
    title: 'Víkendový prenájom',
    text: 'Požičajte si v piatok, vráťte v pondelok — a platíte len jeden deň prenájmu.',
    img: '/pictures/graphics/diamantovy-kotuc-transparent.webp',
    cta: { label: 'Zavolať teraz', href: `tel:${PHONE}` },
  },
];

const AUTOPLAY_MS = 6000;

export default function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [sectionRef, inView] = useInView();
  const touchStartX = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((i) => setIndex(i), []);

  // Autoplay — paused on hover/touch, when off-screen, or with reduced motion.
  useEffect(() => {
    if (paused || reduced || !inView) return undefined;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduced, inView, go]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section className="bg-[#FAFAFA] pb-12 md:pb-16 lg:pb-20">
      <div
        ref={sectionRef}
        className={`max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 reveal ${inView ? 'in-view' : ''}`}
      >
        {/* Header row */}
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <span className="eyebrow mb-4">Akcie</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 mt-4">
              Aktuálne <span className="text-orange-primary">ponuky a zľavy</span>
            </h2>
          </div>
          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Predchádzajúca akcia"
              className="grid place-items-center w-11 h-11 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-orange-primary hover:border-orange-primary/50 transition-colors active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Ďalšia akcia"
              className="grid place-items-center w-11 h-11 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:text-orange-primary hover:border-orange-primary/50 transition-colors active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: reduced ? 'none' : 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.title}
                className="min-w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} z ${slides.length}`}
                aria-hidden={i !== index}
              >
                <div className="relative aspect-[16/10] sm:aspect-[10/3] lg:aspect-[4/1] bg-zinc-950 overflow-hidden">
                  {/* Brand backdrop: deep gradient + orange glow on the right */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(120% 140% at 88% 50%, rgba(255,102,0,0.28) 0%, rgba(255,102,0,0) 55%), linear-gradient(110deg, #0c0c0e 0%, #18181b 60%, #1c1c20 100%)',
                    }}
                  />
                  {/* Top accent rule */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />

                  {/* Copy */}
                  <div className="relative h-full flex items-center">
                    <div className="w-full sm:w-[62%] lg:w-[58%] px-6 md:px-10 lg:px-14 py-6">
                      <span className="eyebrow mb-3">{slide.eyebrow}</span>
                      <h3 className="font-display font-black uppercase tracking-tight text-white text-xl md:text-3xl lg:text-[2.4rem] leading-[1.02] mt-3">
                        {slide.title}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed mt-3 max-w-[44ch]">
                        {slide.text}
                      </p>
                      <div className="mt-5">
                        {slide.cta.href ? (
                          <a href={slide.cta.href} className="btn-primary" tabIndex={i === index ? 0 : -1}>
                            <Phone size={16} />
                            {slide.cta.label}
                          </a>
                        ) : slide.cta.to.startsWith('#') ? (
                          <a href={slide.cta.to} className="btn-primary" tabIndex={i === index ? 0 : -1}>
                            {slide.cta.label}
                            <ArrowRight size={16} />
                          </a>
                        ) : (
                          <Link to={slide.cta.to} className="btn-primary" tabIndex={i === index ? 0 : -1}>
                            {slide.cta.label}
                            <ArrowRight size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product image — right side, hidden on the smallest screens */}
                  <img
                    src={slide.img}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden sm:block absolute right-3 lg:right-10 bottom-0 h-[78%] sm:h-[88%] lg:h-[92%] w-auto object-contain drop-shadow-2xl pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Prejsť na akciu ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-orange-primary' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
