import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

// The four core business areas of Royal Stroje. Each card is an image-led panel
// (real brand/shop photos) with a dark gradient so the white copy stays legible.
const pillars = [
  {
    title: 'Dovoz techniky',
    desc: 'Stroje aj náradie privezieme priamo na vašu stavbu — malé v ten istý deň, ťažkú techniku po dohode.',
    img: '/pictures/graphics/dovoz.webp',
    alt: 'Dodávka Royal Stroje pri dovoze techniky na stavbu',
    to: '#katalog',
  },
  {
    title: 'Prenájom a predaj náradia',
    desc: 'Profesionálne náradie Makita, DeWalt a príslušenstvo — na prenájom aj na predaj v našej predajni.',
    img: '/pictures/graphics/predajna-1.webp',
    alt: 'Predajňa profesionálneho náradia Makita v Royal Stroje',
    to: '/sluzby/predaj-techniky',
  },
  {
    title: 'Ťažká technika',
    desc: 'Minirýpadlá, nakladače a vibračná technika pre zemné práce a väčšie stavebné projekty.',
    img: '/pictures/graphics/stroje-dvor.webp',
    alt: 'Minirýpadlá a stavebná technika na dvore Royal Stroje',
    to: '#katalog',
  },
  {
    title: 'Zoženieme akýkoľvek stroj',
    desc: 'Potrebujete stroj, ktorý práve nemáme? Vybavíme ho cez partnerskú požičovňu — vy fakturujete len nám.',
    img: '/pictures/graphics/royal_stroje_krivosudsky.webp',
    alt: 'Royal Stroje — zabezpečenie techniky cez overených partnerov',
    to: '/sluzby/zabezpecenie-techniky',
  },
];

function PillarCard({ pillar, index, inView }) {
  const isHash = pillar.to.startsWith('#');

  const inner = (
    <article
      className={`group relative block h-full overflow-hidden rounded-2xl bg-zinc-900 reveal stagger-${index + 1} ${inView ? 'in-view' : ''}`}
    >
      <div className="aspect-[16/10] sm:aspect-[3/4] lg:aspect-[4/5]">
        <img
          src={pillar.img}
          alt={pillar.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Legibility gradient — dark from the bottom up */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-transparent" />

      {/* Orange top accent rule, grows on hover */}
      <div className="absolute top-0 left-0 h-[3px] w-12 bg-orange-primary transition-all duration-500 group-hover:w-full" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <h3 className="font-display font-black uppercase tracking-tight text-white text-lg md:text-xl leading-[1.05]">
          {pillar.title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mt-2 max-w-[34ch]">
          {pillar.desc}
        </p>
        <span className="inline-flex items-center gap-1.5 text-orange-primary font-bold text-sm mt-4 transition-transform duration-300 group-hover:translate-x-1">
          Zistiť viac
          <ArrowUpRight size={16} />
        </span>
      </div>
    </article>
  );

  return isHash ? (
    <a href={pillar.to} className="h-full">{inner}</a>
  ) : (
    <Link to={pillar.to} className="h-full">{inner}</Link>
  );
}

export default function BusinessPillars() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();

  return (
    <section className="bg-[#FAFAFA] py-12 md:py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          ref={headingRef}
          className={`max-w-3xl mb-8 md:mb-12 reveal ${headingInView ? 'in-view' : ''}`}
        >
          <span className="eyebrow mb-4">Čo ponúkame</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 mt-4 text-balance">
            Všetko pre vašu stavbu{' '}
            <span className="text-orange-primary">na jednom mieste</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg mt-3 md:mt-4">
            Od ručného náradia po ťažké stroje — a čo práve nemáme, to vám zabezpečíme.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
