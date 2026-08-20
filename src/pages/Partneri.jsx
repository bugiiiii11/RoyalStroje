import { Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';

// Optical sizing for the logo wall. A single shared bounding box would be
// wrong: a 9.35:1 wordmark fills it and a 0.76:1 portrait mark rattles around
// inside it at a third of the visual weight. So each mark gets the same
// AREA instead -- w = sqrt(AREA * ratio) -- clamped by what the cell can hold.
// Numbers are for the xl breakpoint; --logo-scale in index.css steps them down.
const LOGO_AREA = 11000; // px^2; a square mark lands at ~105px
const LOGO_MAX_W = 224;
const LOGO_MAX_H = 108;
const logoWidth = (ratio) =>
  Math.round(Math.min(Math.sqrt(LOGO_AREA * ratio), LOGO_MAX_W, LOGO_MAX_H * ratio));

export default function Partneri() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();
  const [infoRef, infoInView] = useInView();
  // `ratio` is the asset's own width/height. Every file is trimmed HARD to its
  // ink box, so canvas ratio == ink ratio and the numbers below drive the
  // on-page size directly (see logoWidth). A new partner logo MUST be trimmed
  // the same way -- transparent padding inside the canvas silently shrinks the
  // mark on the wall.
  const partners = [
    {
      id: 1,
      name: 'M & M WOOD',
      logo: '/pictures/graphics/partneri/logo_mmwood.webp',
      ratio: 1.2,
      website: 'https://www.mmwood.sk/',
    },
    {
      id: 2,
      name: 'TERRA',
      logo: '/pictures/graphics/partneri/logo_terra.webp',
      ratio: 4.55,
      website: 'https://www.terra-world.sk/',
    },
    {
      id: 3,
      name: 'WACKER NEUSON',
      logo: '/pictures/graphics/partneri/logo_wacker.webp',
      ratio: 2.93,
      website: 'https://www.wackerneuson.sk/',
    },
    {
      id: 4,
      name: 'MAKITA',
      logo: '/pictures/graphics/partneri/logo_makita.webp',
      ratio: 4.29,
      website: 'https://makita.sk/',
    },
    {
      id: 5,
      name: 'M.D.N Tech',
      logo: '/pictures/graphics/partneri/logo_mdn_tech_v2.webp',
      ratio: 5.73,
      website: 'https://mdntech.org/sk',
    },
    {
      id: 6,
      name: 'Royal Works',
      logo: '/pictures/graphics/partneri/logo_royal_works.webp',
      ratio: 9.35,
      website: 'https://royalworks.sk/',
    },
    {
      id: 7,
      name: 'ZSOLIKA',
      logo: '/pictures/graphics/partneri/logo_zsolika.webp',
      ratio: 2.23,
      website: 'https://www.zsolika.sk/',
    },
    {
      id: 8,
      name: 'MOBILBOX',
      logo: '/pictures/graphics/partneri/logo_mobilbox.webp',
      ratio: 1.24,
      website: 'https://mobilbox.sk/',
    },
    {
      id: 9,
      name: 'ESKOPA',
      logo: '/pictures/graphics/partneri/logo_eskopa.webp',
      ratio: 3.26,
      website: null,
    },
    {
      id: 10,
      name: 'MOBA',
      logo: '/pictures/graphics/partneri/logo_moba.webp',
      ratio: 2.4,
      website: 'https://moba.sk/',
    },
    {
      id: 11,
      name: 'MK Stavebná činnosť',
      logo: '/pictures/graphics/partneri/logo_mk_stavebna_cinnost_v2.webp',
      ratio: 0.76,
      website: 'https://www.facebook.com/people/MK-Stavebn%C3%A1-%C4%8Cinnos%C5%A5/61579051122998/',
    },
    {
      id: 12,
      name: 'UNICON',
      logo: '/pictures/graphics/partneri/logo_unicon_v2.webp',
      ratio: 3.31,
      website: 'https://www.unicon.cz/',
    },
    {
      id: 13,
      name: 'SILKOT-ETI',
      logo: '/pictures/graphics/partneri/logo_silkot_eti.webp',
      ratio: 5.31,
      website: 'https://silkot-eti.sk/',
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Partneri - Overení dodávatelia a značky | Royal Stroje</title>
        <meta
          name="description"
          content="Sieť overených partnerov Royal Stroje: Makita, Wacker Neuson, Terra a ďalší. Kvalitná technika a spoľahlivé služby pre región Senec - Bratislava."
        />
        <link rel="canonical" href="https://royalstroje.sk/partneri" />
        <meta property="og:title" content="Partneri - Royal Stroje" />
        <meta property="og:description" content="Sieť overených partnerov a značiek Royal Stroje. Jeden kontakt, všetky služby." />
        <meta property="og:url" content="https://royalstroje.sk/partneri" />
      </Helmet>
      <PageHero
        eyebrow="Partneri · Senec — Bratislava"
        title={
          <>
            Sieť overených profesionálov. <span className="text-orange-primary">Jeden kontakt, všetky služby.</span>
          </>
        }
        subtitle="Partneri Royal Stroje v Senci, Bratislave a okolí - stavbári, ktorým dôverujeme."
        image="/pictures/graphics/stroje-jcb-rameno.webp"
        imageAlt="Stroje partnerských značiek na dvore Royal Stroje"
        actions={
          <>
            <a href="tel:+421948555551" className="btn-primary">
              <Phone size={16} />
              Zavolať teraz
            </a>
            <a href="/#katalog" className="btn-outline-light px-5 py-3">
              Zobraziť techniku
            </a>
          </>
        }
      />

      {/* Main Content Section */}
      <ContentSection light>
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.webp"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading */}
          <div ref={headingRef} className={`text-center mb-6 md:mb-12 pt-16 md:pt-0 reveal ${headingInView ? 'in-view' : ''}`}>
            <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4">
              Naši <span className="text-orange-primary">partneri</span>
            </h1>
            <p className={`text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto mb-2 md:mb-4 reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
              Stavebné firmy a dodávatelia, s ktorými spolupracujeme v regióne Senec - Bratislava.
            </p>
            <p className="text-zinc-600 text-xs md:text-base max-w-2xl mx-auto hidden md:block">
              Partnerstvo vzniká prirodzene po dlhodobej kvalitnej spolupráci. Len naši najspoľahlivejší partneri sú uvedení na tomto zozname.
            </p>
          </div>

          {/* Partner logo wall.
              One continuous sheet with a hairline lattice (gap-px over a zinc
              background paints the rules) rather than floating tiles -- the
              wall reads as a single composed object. Thirteen partners no
              longer divide evenly by 2/3/4, so blank white filler cells top up
              the last row per breakpoint (1 on 2-col, 2 on 3-col, 3 on 4-col)
              -- without them the container's zinc shows as a grey block.
              The 4th column waits for lg, not md: at 768px four columns leave a
              cell too narrow to hold a wordmark at readable size, and three
              wide cells beat four cramped ones.
              Names are intentionally absent: on most of these logos the caption
              just repeated the wordmark. The name survives as alt + title. */}
          <div
            ref={gridRef}
            className={`mb-8 md:mb-16 reveal ${gridInView ? 'in-view' : ''}`}
          >
            <div className="partner-wall grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-200 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm shadow-zinc-900/5">
              {partners.map((partner) => {
                const logo = (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    style={{ '--logo-w': `${logoWidth(partner.ratio)}px` }}
                    className="partner-logo"
                  />
                );
                const cellClass =
                  'partner-cell relative flex items-center justify-center bg-white px-3 py-5 sm:px-4 sm:py-6 xl:px-6 xl:py-7 min-h-[7rem] sm:min-h-[8.75rem] md:min-h-[9.5rem] xl:min-h-[10.5rem]';

                return partner.website ? (
                  <a
                    key={partner.id}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={partner.name}
                    className={cellClass}
                  >
                    {logo}
                  </a>
                ) : (
                  <div key={partner.id} title={partner.name} className={cellClass}>
                    {logo}
                  </div>
                );
              })}
              {/* Row top-ups: 13 % cols leaves 1 orphan at every breakpoint.
                  Mobile 2-col needs +1, sm 3-col +2, lg 4-col +3. */}
              <div className="bg-white min-h-[7rem] sm:min-h-[8.75rem] md:min-h-[9.5rem] xl:min-h-[10.5rem]" aria-hidden="true" />
              <div className="hidden sm:block min-h-[8.75rem] md:min-h-[9.5rem] xl:min-h-[10.5rem] bg-white" aria-hidden="true" />
              <div className="hidden lg:block min-h-[9.5rem] xl:min-h-[10.5rem] bg-white" aria-hidden="true" />
            </div>
          </div>

          {/* Partnership Info Section */}
          <div ref={infoRef} className={`text-center mb-6 md:mb-12 reveal ${infoInView ? 'in-view' : ''}`}>
            <h2 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4">
              Čo znamená <span className="text-orange-primary">partnerstvo</span>
            </h2>
            <p className="text-zinc-700 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed">
              Naši partneri sú <strong className="text-orange-primary">základom našej úspešnej práce</strong>. Si vážime každého z nich a spoločne vytvárame sieť dôveryhodných profesionálov v stavebnom priemysle, ktorí sa môžu navzájom odporúčať a spolupracovať.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
            {[
              {
                title: 'Ako vzniká partnerstvo?',
                text: 'Nevyhľadávame nových partnerov. Partnerstvo vzniká prirodzene po dlhodobej kvalitnej spolupráci ako poďakovanie za dôveru a profesionalitu. Len naši najbližší a najspoľahlivejší klienti sa môžu stať oficiálnymi partnermi.',
              },
              {
                title: 'Vzájomné odporúčanie',
                text: 'Partnerstvo znamená vzájomnú dôveru. Radi odporúčame služby našich partnerov aj našim klientom a spoločne vytvárame sieť spoľahlivých profesionálov v stavebnom priemysle.',
              },
              {
                title: 'Komplexné pokrytie stavebníctva',
                text: 'Naša sieť partnerov pokrýva široké spektrum stavebných služieb — od prenájmu strojov, cez zemné práce, až po dodávky materiálu. Pre našich klientov to znamená jedno spoľahlivé kontaktné miesto a rýchle riešenia.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 overflow-hidden"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-primary/10 border border-orange-primary/30 text-orange-primary font-display font-black text-base mb-4 group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                  0{i + 1}
                </span>
                <h3 className="text-white font-bold text-base md:text-xl mb-2 md:mb-3 group-hover:text-orange-primary transition-colors leading-tight">{item.title}</h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{item.text}</p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-primary to-orange-hover transition-all duration-500" />
              </div>
            ))}
          </div>

          <CtaBand
            eyebrow="Spolupráca"
            title={<>Máte záujem o <span className="text-orange-primary">spoluprácu?</span></>}
            text="Kontaktujte nás a začnime budovať dôveru."
            actions={
              <a
                href="tel:+421948555551"
                className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
              >
                <Phone size={16} className="md:w-5 md:h-5" />
                <span>Zavolať: 0948 555 551</span>
              </a>
            }
          />

        </div>
      </ContentSection>
    </div>
  );
}
