import { Phone, ArrowRight, Truck, Wrench, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHONE = '+421948555551';

const usps = [
  { Icon: Truck, title: 'Dovoz techniky', text: 'Dovezieme až na vašu stavbu' },
  { Icon: Wrench, title: 'Servisované stroje', text: 'Pravidelný servis a údržba' },
  { Icon: MapPin, title: 'Senec – Bratislava', text: 'Pôsobíme v širokom okolí' },
  { Icon: Star, title: 'Overená požičovňa', text: 'Stovky spokojných zákazníkov' },
];

// Poradie zladené so 4 USP kartami pod pásom (rovnaké stĺpce)
const stripImages = [
  { src: '/pictures/graphics/web_pics/doprava1.webp', alt: 'Dovoz techniky – JCB mini bager na vlečke Royal Stroje' }, // → Dovoz techniky
  { src: '/pictures/graphics/predajna-4.webp', alt: 'Servisované stavebné stroje – JCB mini bager a Avant nakladač' }, // → Servisované stroje
  { src: '/pictures/graphics/predajna-2.webp', alt: 'Predajňa a požičovňa Royal Stroje – náradie a meracia technika' }, // → Senec – Bratislava
  { src: '/pictures/graphics/stroje-dvor.webp', alt: 'Požičovňa Royal Stroje – stroje na dvore v Senci pri Bratislave' }, // → Overená požičovňa
];

export default function HeroSplit() {
  return (
    <section className="relative bg-zinc-950 overflow-hidden md:h-screen md:flex md:flex-col">
      {/* ================= TOP: SPLIT (prenájom | predaj) ================= */}

      {/* ---- Desktop: diagonal split (fills remaining height) ---- */}
      <div className="hidden md:block md:flex-1 md:min-h-0 relative">
        {/* LEFT base layer — pure white; truck centered in the left section, grounded slightly into the bottom */}
        <div className="absolute inset-0 bg-white overflow-hidden">
          <img
            src="/pictures/graphics/web_pics/auto_hero.webp"
            alt="Prenájom stavebnej techniky a náradia s dovozom na stavbu - Royal Stroje"
            className="absolute left-[10%] top-[55%] -translate-y-1/2 w-[42%] h-auto"
            width={1774}
            height={887}
            fetchPriority="high"
          />
        </div>

        {/* RIGHT image — diagonally clipped overlay */}
        <div className="absolute inset-0" style={{ clipPath: 'polygon(57% 0, 100% 0, 100% 100%, 49% 100%)' }}>
          {/* image constrained to the right portion so object-cover crops much less (less "zoomed") */}
          <img
            src="/pictures/graphics/predajna-1.webp"
            alt="Predaj profesionálneho náradia, príslušenstva a OOPP - Royal Stroje"
            className="absolute inset-y-0 right-0 w-[58%] h-full object-cover"
            width={1280}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(255,255,255,0.10)' }}
          />
        </div>

        {/* Orange diagonal divider — single thin crisp line */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: 'polygon(56.78% 0, 57% 0, 49% 100%, 48.78% 100%)', background: '#FF6600' }}
        />

        {/* Top orange accent rule */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent z-20" />

        {/* Content grid aligned to the split */}
        <div className="relative z-10 h-full w-full px-6 lg:px-12">
          <div className="grid grid-cols-[57%_43%] h-full">
            {/* LEFT — Prenájom: heading top-left, CTAs bottom-left */}
            <div className="flex flex-col justify-between items-start pr-[8%] pt-24 pb-12">
              {/* heading group — single soft white "cloud" behind the whole text block (CTA excluded) */}
              <div className="relative w-fit">
                <span aria-hidden className="absolute -inset-5 bg-white/95 rounded-[2rem] blur-xl" />
                <div className="relative">
                  <span className="hs-0 eyebrow">Senec · Bratislava · Okolie</span>
                  <h1 className="hs-1 font-display font-black uppercase text-zinc-900 leading-[0.95] tracking-tight text-[clamp(1.35rem,2vw,2.2rem)] mt-4">
                    Prenájom strojov<br />
                    <span className="text-orange-primary">s dovozom na stavbu</span>
                  </h1>
                  <p className="hs-2 text-zinc-800 text-sm md:text-base font-semibold tracking-wide mt-5">
                    Mini bagre · Nakladače · Vibračná technika · Náradie
                  </p>
                </div>
              </div>
              {/* CTAs — bottom-left, no white backing (buttons sit on the image) */}
              <div className="hs-3 flex flex-wrap gap-3 mt-10">
                <a href={`tel:${PHONE}`} className="btn-primary">
                  <Phone size={16} />
                  <span>Zavolať teraz</span>
                </a>
                <a href="#katalog" className="btn-outline-light px-5 py-3">
                  <span>Zobraziť stroje</span>
                  <ArrowRight size={16} className="text-orange-primary" />
                </a>
              </div>
            </div>

            {/* RIGHT — Predaj náradia: heading top-left, CTA below the cloud (on the image) */}
            <div className="flex flex-col justify-start items-start pl-[4%] pt-24 pb-12">
              {/* soft white "cloud" behind the text only — CTA sits below, on the image */}
              <div className="relative w-fit">
                <span aria-hidden className="absolute -inset-5 bg-white/95 rounded-[2rem] blur-xl" />
                <div className="relative">
                  <span className="hs-2 eyebrow">Predajňa</span>
                  <h2 className="hs-3 font-display font-black uppercase text-zinc-900 leading-[0.95] tracking-tight text-[clamp(1.35rem,2vw,2.2rem)] mt-4">
                    Prenájom a<br /><span className="text-orange-primary">predaj náradia</span>
                  </h2>
                  <p className="hs-4 text-zinc-800 text-sm md:text-base font-semibold mt-4">
                    Profesionálne náradie, príslušenstvo a OOPP
                  </p>
                </div>
              </div>
              {/* animation on wrapper, not the button — keeps btn-primary hover lift working */}
              <div className="hs-4 mt-7">
                <Link to="/sluzby/predaj-techniky" className="btn-primary">
                  <span>Navštíviť predajňu</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Mobile: stacked cards ---- */}
      <div className="md:hidden">
        {/* Prenájom */}
        <div className="relative h-[58vh] min-h-[380px] bg-white">
          <img
            src="/pictures/graphics/web_pics/auto_hero.webp"
            alt="Prenájom stavebnej techniky a náradia s dovozom na stavbu - Royal Stroje"
            className="absolute bottom-0 inset-x-0 w-full h-auto"
            width={1774}
            height={887}
            fetchPriority="high"
          />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent z-20" />
          <div className="relative z-10 h-full flex flex-col justify-between items-start px-5 pb-7 pt-16">
            <div className="relative w-fit">
              <span aria-hidden className="absolute -inset-4 bg-white/95 rounded-[1.75rem] blur-lg" />
              <div className="relative">
                <span className="hs-0 eyebrow">Senec · Bratislava</span>
                <h1 className="hs-1 font-display font-black uppercase text-zinc-900 leading-[0.98] tracking-tight text-[2rem] mt-3">
                  Prenájom strojov{' '}
                  <span className="text-orange-primary">s dovozom na stavbu</span>
                </h1>
                <p className="hs-2 text-zinc-800 text-sm font-semibold mt-3">
                  Mini bagre · Nakladače · Vibračná technika · Náradie
                </p>
              </div>
            </div>
            <div className="hs-3 flex gap-2.5 mt-6 w-full">
              <a href={`tel:${PHONE}`} className="btn-primary flex-1 py-3.5">
                <Phone size={16} />
                Zavolať
              </a>
              <a href="#katalog" className="btn-outline-light flex-1 py-3.5">
                Stroje
                <ArrowRight size={16} className="text-orange-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Predaj náradia */}
        <div className="relative h-[42vh] min-h-[300px] border-t-2 border-orange-primary">
          <img
            src="/pictures/graphics/predajna-1.webp"
            alt="Predaj profesionálneho náradia, príslušenstva a OOPP - Royal Stroje"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(255,255,255,0.10)' }}
          />
          <div className="relative z-10 h-full flex flex-col justify-start items-start px-5 pb-7 pt-10">
            <div className="relative w-fit">
              <span aria-hidden className="absolute -inset-4 bg-white/95 rounded-[1.75rem] blur-lg" />
              <div className="relative">
                <span className="hs-1 eyebrow">Predajňa</span>
                <h2 className="hs-2 font-display font-black uppercase text-zinc-900 leading-[0.98] tracking-tight text-[1.7rem] mt-3">
                  Prenájom a <span className="text-orange-primary">predaj náradia</span>
                </h2>
                <p className="hs-3 text-zinc-800 text-sm font-semibold mt-2">
                  Profesionálne náradie, príslušenstvo a OOPP
                </p>
              </div>
            </div>
            <div className="hs-3 mt-5">
              <Link to="/sluzby/predaj-techniky" className="btn-primary">
                <span>Navštíviť predajňu</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4-image strip (white bg, rounded corners, spaced) ================= */}
      <div className="bg-white md:shrink-0">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 pt-4 pb-5 md:pt-5 md:pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {stripImages.map((img, i) => (
              <div
                key={img.src}
                className="group overflow-hidden rounded-xl border border-zinc-200 shadow-sm shadow-zinc-900/5 hover:border-orange-primary/40 hover:shadow-md hover:shadow-orange-primary/10 transition-all duration-300"
                style={{ animation: 'hsUp .7s ease both', animationDelay: `${0.2 + i * 0.08}s` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover aspect-[4/3] md:aspect-auto md:h-[24vh] group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 4 USPs (gray band, card style) ================= */}
      <div className="bg-zinc-100 md:shrink-0">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {usps.map((usp) => {
              const Icon = usp.Icon;
              return (
                <div
                  key={usp.title}
                  className="group flex flex-col items-center text-center gap-2 md:flex-row md:items-center md:text-left md:gap-4 rounded-xl md:rounded-2xl bg-white border border-zinc-200 px-3 md:px-5 py-4 md:py-5 shadow-sm shadow-zinc-900/5 hover:border-orange-primary/40 hover:shadow-md hover:shadow-orange-primary/10 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="shrink-0 grid place-items-center w-11 h-11 md:w-14 md:h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/25 text-orange-primary group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors duration-300">
                    <Icon size={22} className="md:w-6 md:h-6" />
                  </span>
                  <div className="min-w-0 w-full md:w-auto">
                    <p className="font-display font-bold uppercase text-zinc-900 text-[13px] md:text-base tracking-wide leading-tight break-words">
                      {usp.title}
                    </p>
                    <p className="text-zinc-600 text-xs md:text-sm mt-0.5 leading-snug">{usp.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Orange hairline at the very bottom of the screen */}
      <div className="h-[2px] bg-[#FF6600] w-full md:shrink-0" />

      <style>{`
        .hs-0 { animation: hsUp .7s ease both; animation-delay: .05s; }
        .hs-1 { animation: hsUp .7s ease both; animation-delay: .15s; }
        .hs-2 { animation: hsUp .7s ease both; animation-delay: .28s; }
        .hs-3 { animation: hsUp .7s ease both; animation-delay: .40s; }
        .hs-4 { animation: hsUp .7s ease both; animation-delay: .52s; }
        @keyframes hsUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
