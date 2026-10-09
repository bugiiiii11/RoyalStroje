import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

const DIR = '/pictures/graphics/partneri/znacky';

// `ratio` = the asset's own width/height. Every file is trimmed hard to its ink
// box (same rule as the Partneri wall), so the ratio drives the on-page size.
// Order alternates the brand palettes so two reds never sit side by side.
const brands = [
  { name: 'Makita', file: 'makita.webp', w: 600, h: 138 },
  // boost: the lockup is mostly air between the icon and the words, so equal
  // area alone leaves it reading a size smaller than its neighbours.
  { name: 'Wacker Neuson', file: 'wacker.webp', w: 600, h: 203, boost: 1.22 },
  { name: 'JCB', file: 'jcb.webp', w: 294, h: 115 },
  { name: 'NIVEL System', file: 'nivel.webp', w: 220, h: 64 },
  { name: 'AVANT', file: 'avant.webp', w: 941, h: 218 },
  { name: 'NTC', file: 'ntc.webp', w: 324, h: 128 },
  { name: 'Honda Power Equipment', file: 'honda.webp', w: 270, h: 58 },
  { name: 'MASTER', file: 'master.webp', w: 223, h: 32 },
  { name: 'CEDIMA', file: 'cedima.webp', w: 478, h: 240 },
  { name: 'GÖLZ', file: 'golz.webp', w: 188, h: 54 },
];

// Equal optical AREA per mark (w = sqrt(AREA * ratio)), clamped by the row
// height -- a shared bounding box would let the 7:1 MASTER wordmark dwarf the
// 2:1 CEDIMA diamond. Numbers are for xl; --brand-scale in index.css steps down.
const AREA = 4600;
const MAX_H = 50;
const logoWidth = ({ w, h, boost = 1 }) => {
  const ratio = w / h;
  return Math.round(Math.min(Math.sqrt(AREA * ratio) * boost, MAX_H * ratio));
};

function BrandList({ hidden }) {
  return (
    <ul className="brand-copy flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b.name} className="brand-item flex items-center justify-center shrink-0">
          <img
            src={`${DIR}/${b.file}`}
            alt={hidden ? '' : b.name}
            title={b.name}
            width={b.w}
            height={b.h}
            loading="lazy"
            draggable="false"
            style={{ '--logo-w': `${logoWidth(b)}px` }}
            className="brand-logo select-none"
          />
        </li>
      ))}
    </ul>
  );
}

// "Značky v našej požičovni" -- an endless, link-free logo strip under the catalogue.
//
// Light surface on purpose: NIVEL, MASTER and Wacker are near-black ink and
// disappear on our dark cards (same exception as the Partneri wall).
// The list is rendered twice and the track slides by exactly -50%, so the loop
// has no seam. GPU guard: this is the ONE element on the page with a running
// transform; it pauses whenever it is off-screen, and the moving track is not
// clipped by a rounded overflow-hidden box (the s36 hover-seam lesson) -- the
// clip lives on a square inner wrapper inset from the card's rounded corners.
// prefers-reduced-motion: no animation, the duplicate is dropped and the
// logos wrap into a static centred block (index.css).
export default function BrandMarquee() {
  const [headingRef, headingInView] = useInView();
  const [stripRef, stripInView] = useInView();
  const viewportRef = useRef(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative pt-14 md:pt-20 lg:pt-24" aria-labelledby="brands-heading">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          ref={headingRef}
          className={`text-center mb-6 md:mb-10 reveal ${headingInView ? 'in-view' : ''}`}
        >
          <h2 id="brands-heading" className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-900 mb-3 md:mb-4">
            Značky, s ktorými <span className="text-orange-primary">pracujeme</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg max-w-3xl mx-auto">
            Stroje a náradie v našej požičovni sú od overených výrobcov, na ktoré sa spoliehajú profesionáli
          </p>
        </div>

        <div
          ref={stripRef}
          className={`relative rounded-2xl md:rounded-3xl bg-white border border-zinc-200 shadow-sm shadow-zinc-900/5 py-6 md:py-8 xl:py-9 reveal ${stripInView ? 'in-view' : ''}`}
        >
          <div ref={viewportRef} className="brand-viewport overflow-hidden">
            <div className={`brand-track flex ${running ? '' : 'is-paused'}`}>
              <BrandList />
              <BrandList hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
