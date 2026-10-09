import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const PHONE = '+421948555551';

// Current offers -- all visible at once (a carousel hid 3 of 4 and left most of
// each wide slide empty). Copy is the owner's to swap; `stamp` is the deal in
// two or three words and is the card's single filled-orange element.
const offers = [
  {
    category: 'Akcia na čerpadlá',
    stamp: 'Hadica zadarmo',
    title: 'Kalové čerpadlo Honda WT30',
    text: 'Vysokovýkonné kalové čerpadlo — 1 200 l/min, výtlak až 27 m. K prenájmu pridávame jednu hadicu zadarmo, inak sa príslušenstvo účtuje zvlášť.',
    img: '/pictures/graphics/honda-wt30-transparent.webp',
    imgClass: 'max-h-[92%]',
    cta: { label: 'Zobraziť čerpadlo', to: '/honda-wt30' },
  },
  {
    category: 'Sezónna akcia',
    stamp: 'Týždenná sadzba',
    title: 'Zvýhodnený prenájom minirýpadiel',
    text: 'Zvýhodnené týždenné sadzby na JCB 19C-I a Wacker Neuson. Ideálne na výkopy a terénne úpravy.',
    img: '/pictures/graphics/mini-rypadlo-1000-transparent.webp',
    imgClass: 'max-h-[108%]',
    cta: { label: 'Zobraziť stroje', href: '#katalog' },
  },
  {
    category: 'Predajňa',
    stamp: 'Akčné ceny',
    title: 'Makita aku náradie',
    text: 'Akčné ceny na vybrané aku sety a príslušenstvo. Profesionálna kvalita pre každú stavbu.',
    img: '/pictures/graphics/utahovak-transparent.webp',
    imgClass: 'max-h-[100%]',
    cta: { label: 'Do predajne', to: '/sluzby/predaj-techniky' },
  },
  {
    category: 'Výhodne',
    stamp: 'Víkend za 1 deň',
    title: 'Víkendový prenájom',
    text: 'Požičajte si v piatok, vráťte v pondelok — a platíte len jeden deň prenájmu.',
    img: '/pictures/graphics/JCB-19C-transparent.webp',
    imgClass: 'max-h-[108%]',
    cta: { label: 'Zavolať teraz', href: `tel:${PHONE}`, phone: true },
  },
];

function OfferCard({ offer }) {
  const { cta } = offer;
  const className =
    'group relative flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-lg shadow-zinc-900/10 hover:border-orange-primary/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]';

  const body = (
    <>
      <div className="absolute top-0 left-0 right-0 h-[3px] z-10 bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />

      {/* Product stage: grid texture + warm glow + floor shadow */}
      <div className="relative h-44 md:h-52 xl:h-56 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(60% 70% at 50% 78%, rgba(255,102,0,0.26) 0%, rgba(255,102,0,0) 70%)' }}
        />
        <div aria-hidden="true" className="absolute left-[18%] right-[18%] bottom-[9%] h-5 rounded-[50%] bg-black/60 blur-md" />
        <div className="absolute inset-x-6 top-10 bottom-[7%] flex items-end justify-center">
          <img
            src={offer.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={`w-auto max-w-full object-contain object-bottom drop-shadow-xl ${offer.imgClass}`}
          />
        </div>
        <span className="absolute top-4 left-4 md:top-5 md:left-5 rounded-md bg-orange-primary px-2.5 py-1 text-[11px] md:text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-primary/30">
          {offer.stamp}
        </span>
      </div>

      <div className="relative flex flex-col flex-1 p-5 md:p-6 border-t border-white/[0.06]">
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{offer.category}</p>
        <h3 className="font-display font-black uppercase tracking-tight text-white text-lg md:text-xl leading-[1.1] mt-2 text-balance">
          {offer.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mt-2.5 flex-1">{offer.text}</p>
        <span className="mt-5 inline-flex items-center justify-between gap-3 text-sm font-bold text-white">
          <span className="group-hover:text-orange-primary transition-colors">{cta.label}</span>
          <span className="grid place-items-center w-9 h-9 rounded-full border border-white/15 text-orange-primary group-hover:border-orange-primary/60 transition-colors">
            {cta.phone ? <Phone size={15} /> : <ArrowRight size={16} />}
          </span>
        </span>
      </div>
    </>
  );

  return cta.href ? (
    <a href={cta.href} className={className}>{body}</a>
  ) : (
    <Link to={cta.to} className={className}>{body}</Link>
  );
}

export default function PromoOffers() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();

  return (
    <section className="relative pt-14 md:pt-20 lg:pt-24" aria-labelledby="offers-heading">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          ref={headingRef}
          className={`text-center mb-6 md:mb-10 reveal ${headingInView ? 'in-view' : ''}`}
        >
          <h2 id="offers-heading" className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 mb-3 md:mb-4">
            Aktuálne <span className="text-orange-primary">ponuky a zľavy</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg max-w-3xl mx-auto text-pretty">
            Ušetrite na prenájme aj nákupe — víkend za cenu jedného dňa, zvýhodnené týždenné sadzby,
            príslušenstvo zadarmo a akčné ceny v predajni. Ponuky sa priebežne menia, oplatí sa sem vracať.
          </p>
        </div>

        {/* Mobile: swipeable row with the next card peeking. md: 2x2. xl: one row of 4. */}
        <div
          ref={gridRef}
          className={`no-scrollbar -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible xl:grid-cols-4 reveal ${gridInView ? 'in-view' : ''}`}
        >
          {offers.map((offer) => (
            <div key={offer.title} className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-auto">
              <OfferCard offer={offer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
