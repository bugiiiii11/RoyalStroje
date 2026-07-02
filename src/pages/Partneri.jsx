import { Phone } from 'lucide-react';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';

export default function Partneri() {
  const [headingRef, headingInView] = useInView();
  const [gridRef] = useInView();
  const [infoRef, infoInView] = useInView();
  const partners = [
    {
      id: 1,
      name: 'M & M WOOD',
      logo: '/pictures/graphics/partneri/logo_mmwood.webp',
      website: 'https://www.mmwood.sk/',
    },
    {
      id: 2,
      name: 'TERRA',
      logo: '/pictures/graphics/partneri/logo_terra.webp',
      website: 'https://www.terra-world.sk/',
    },
    {
      id: 3,
      name: 'WACKER NEUSON',
      logo: '/pictures/graphics/partneri/logo_wacker.webp',
      website: 'https://www.wackerneuson.sk/',
    },
    {
      id: 4,
      name: 'MAKITA',
      logo: '/pictures/graphics/partneri/logo_makita.webp',
      website: 'https://makita.sk/',
    },
    {
      id: 5,
      name: 'ZSOLIKA',
      logo: '/pictures/graphics/partneri/logo_zsolika.webp',
      website: 'https://www.zsolika.sk/',
    },
    {
      id: 6,
      name: 'MOBILBOX',
      logo: '/pictures/graphics/partneri/logo_mobilbox.webp',
      website: 'https://mobilbox.sk/',
    },
    {
      id: 7,
      name: 'ESKOPA',
      logo: '/pictures/graphics/partneri/logo_eskopa.webp',
      website: null,
    },
    {
      id: 8,
      name: 'MOBA',
      logo: '/pictures/graphics/partneri/logo_moba.webp',
      website: 'https://moba.sk/',
    },
    {
      id: 9,
      name: 'MK Stavebná činnosť',
      logo: '/pictures/graphics/partneri/logo_mk_stavebna_cinnost.webp',
      website: 'https://www.facebook.com/people/MK-Stavebn%C3%A1-%C4%8Cinnos%C5%A5/61579051122998/',
    },
    {
      id: 10,
      name: 'UNICON',
      logo: '/pictures/graphics/partneri/logo_unicon.webp',
      website: 'https://www.unicon.cz/',
    },
  ];

  return (
    <div className="min-h-screen">
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

          {/* Partners Grid - Option 1: Minimal with Hover Lift */}
          <div ref={gridRef} className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16`}>
            {partners.map((partner) => {
              const innerContent = (
                <div className="group flex flex-col items-center justify-center w-full h-full">
                  {/* Logo Container - White square background */}
                  <div className="bg-white rounded-xl ring-1 ring-white/10 p-4 flex items-center justify-center h-32 w-32 md:h-40 md:w-40 mb-3 md:mb-4 transition-all duration-200 group-hover:scale-105 group-hover:ring-orange-primary/50 group-hover:shadow-lg group-hover:shadow-orange-primary/20">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-24 w-24 md:h-28 md:w-28 object-contain"
                    />
                  </div>

                  {/* Partner Name */}
                  <h3 className="text-center text-xs md:text-sm text-zinc-700 font-medium line-clamp-2">
                    {partner.name}
                  </h3>
                </div>
              );

              return partner.website ? (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {innerContent}
                </a>
              ) : (
                <div key={partner.id}>
                  {innerContent}
                </div>
              );
            })}
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
