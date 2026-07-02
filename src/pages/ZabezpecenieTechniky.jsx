import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Mail,
  Handshake,
  Zap,
  PhoneCall,
  Truck,
  Construction,
  ChevronsUp,
  Forklift,
  Cylinder,
  Tractor,
  Boxes,
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';

const PHONE = 'tel:+421948555551';

const benefits = [
  {
    icon: Handshake,
    title: 'Overení partneri',
    text: 'Spolupracujeme so sieťou preverených požičovní, takže dostanete spoľahlivý a servisovaný stroj.',
  },
  {
    icon: Zap,
    title: 'Rýchle zabezpečenie',
    text: 'Preveríme dostupnosť u partnerov a ozveme sa vám s riešením — bez zbytočného čakania a obvolávania.',
  },
  {
    icon: PhoneCall,
    title: 'Jeden kontakt',
    text: 'Nemusíte volať ďalším požičovniam. Vybavíte všetko na jednom mieste a fakturujeme vám len my.',
  },
  {
    icon: Truck,
    title: 'Doprava na stavbu',
    text: 'Postaráme sa o naloženie, dovoz aj odvoz techniky priamo na miesto určenia.',
  },
];

const equipment = [
  { icon: Construction, label: 'Špeciálna stavebná technika' },
  { icon: ChevronsUp, label: 'Pracovné plošiny' },
  { icon: Forklift, label: 'Teleskopické manipulátory' },
  { icon: Cylinder, label: 'Valce' },
  { icon: Tractor, label: 'Veľké pásové bagre' },
  { icon: Boxes, label: 'Ďalšie stroje podľa požiadaviek' },
];

const steps = [
  {
    n: '01',
    title: 'Kontaktujete nás',
    text: 'Zavoláte alebo napíšete — poviete nám, čo na stavbe potrebujete.',
  },
  {
    n: '02',
    title: 'Spresníme stroj',
    text: 'Doladíme typ techniky, termín nasadenia a miesto, kam ju potrebujete.',
  },
  {
    n: '03',
    title: 'Preveríme partnerov',
    text: 'Oslovíme sieť overených požičovní a nájdeme vhodný dostupný stroj.',
  },
  {
    n: '04',
    title: 'Zabezpečíme všetko',
    text: 'Vybavíme prenájom, dovoz aj odvoz. Fakturujeme vám len my — jedna zmluva, jeden kontakt.',
  },
];

// Hairline dividers for the single-panel benefits grid (2-col mobile, 4-col lg),
// same language as the homepage WhyRoyalStroje island — structural 1px rules, not cards.
const cellBorders = [
  '',
  'border-l border-white/10',
  'border-t border-white/10 lg:border-t-0 lg:border-l',
  'border-l border-t border-white/10 lg:border-t-0',
];

export default function ZabezpecenieTechniky() {
  const [benefitsRef, benefitsInView] = useInView();
  const [equipRef, equipInView] = useInView();
  const [stepsRef, stepsInView] = useInView();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Zoženieme akýkoľvek stroj — zabezpečenie techniky na mieru | Royal Stroje</title>
        <meta
          name="description"
          content="Nemáte stroj v našej ponuke? Zabezpečíme ho cez sieť overených partnerov — vrátane dovozu na stavbu. Plošiny, manipulátory, valce, veľké bagre aj špeciálna technika. Vy fakturujete len nám."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/zabezpecenie-techniky" />
        <meta property="og:title" content="Zoženieme akýkoľvek stroj | Royal Stroje" />
        <meta
          property="og:description"
          content="Stroj, ktorý práve nemáme, vám zabezpečíme cez overených partnerov — aj s dopravou na stavbu. Jeden kontakt, jedna faktúra."
        />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/zabezpecenie-techniky" />
      </Helmet>

      {/* Hero (desktop, light) */}
      <PageHero
        eyebrow="Služby · Zabezpečenie techniky"
        title={<>Zoženieme <span className="text-orange-primary">akýkoľvek stroj</span></>}
        subtitle="Hľadáte techniku, ktorú práve nemáme v strojovom parku? Vďaka sieti overených partnerov vám zabezpečíme vhodný stroj rýchlo a spoľahlivo — vrátane dovozu na stavbu. Vy sa nemusíte starať o nič, fakturujeme vám len my."
        image="/pictures/graphics/stroje-dvor.webp"
        imageAlt="Stavebná technika na dvore Royal Stroje"
        chips={['Overení partneri', 'Rýchle zabezpečenie', 'Jeden kontakt']}
        actions={
          <>
            <a href={PHONE} className="btn-primary">
              <Phone size={16} />
              Zavolať teraz
            </a>
            <a href="/#katalog" className="btn-outline-light px-5 py-3">
              Zobraziť techniku
            </a>
          </>
        }
      />

      <div className="bg-[#FAFAFA]">
        {/* Mobile brand logo */}
        <div className="md:hidden pt-4 px-4">
          <img src="/logoroyal-dark.webp" alt="Royal Stroje" className="h-8 w-auto" />
        </div>

        {/* Mobile heading */}
        <div className="md:hidden px-4 pt-6 pb-2 text-center">
          <span className="eyebrow eyebrow--center mb-3">Zabezpečenie techniky</span>
          <h1 className="text-2xl font-black text-zinc-900 mt-3">
            Zoženieme <span className="text-orange-primary">akýkoľvek stroj</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-3">
            Stroj, ktorý nemáme v ponuke, vám zabezpečíme cez overených partnerov — aj s dovozom.
          </p>
        </div>

        {/* Benefits */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900">
                Vy nám poviete čo treba, <span className="text-orange-primary">o zvyšok sa postaráme my</span>
              </h2>
              <p className="text-zinc-600 text-sm md:text-lg mt-3">
                Nie vždy je potrebná technika súčasťou nášho strojového parku. Ak ide o špeciálny stroj,
                zabezpečíme ho prostredníctvom našej siete overených partnerov.
              </p>
            </div>
            {/* One dark island with hairline-divided columns (not 4 clone cards) — matches homepage WhyRoyalStroje */}
            <div
              ref={benefitsRef}
              className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-lg shadow-zinc-900/10 reveal ${benefitsInView ? 'in-view' : ''}`}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.title}
                      className={`group p-4 md:p-6 lg:p-8 hover:bg-white/[0.03] transition-colors duration-300 ${cellBorders[i]}`}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                        <Icon className="text-orange-primary" size={20} />
                      </div>
                      <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 leading-tight">{b.title}</h3>
                      <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{b.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What we can source */}
        <section className="py-12 md:py-16 lg:py-20 border-t border-zinc-200/70">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900">
                Od bežnej techniky až po <span className="text-orange-primary">špeciálne stroje</span>
              </h2>
              <p className="text-zinc-600 text-sm md:text-lg mt-3">
                Ak hľadaný stroj momentálne nemáme alebo ide o špeciálnu techniku, vybavíme ho za vás.
              </p>
            </div>
            <div
              ref={equipRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto"
            >
              {equipment.map((e, i) => {
                const Icon = e.icon;
                return (
                  <div
                    key={e.label}
                    className={`group flex items-center gap-3 md:gap-4 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-${Math.min(i + 1, 6)} ${equipInView ? 'in-view' : ''}`}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                      <Icon className="text-orange-primary" size={20} />
                    </div>
                    <span className="text-zinc-200 font-semibold text-sm md:text-base leading-tight">{e.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 md:py-16 lg:py-20 border-t border-zinc-200/70">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900">
                Od telefonátu <span className="text-orange-primary">po stroj na stavbe</span>
              </h2>
            </div>
            <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`group relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-${Math.min(i + 1, 4)} ${stepsInView ? 'in-view' : ''}`}
                >
                  {/* Deliberate step index — solid badge, not a decorative faint watermark */}
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-primary/10 border border-orange-primary/30 text-orange-primary font-display font-black text-base mb-4 group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                    {s.n}
                  </span>
                  <h3 className="text-white font-black text-lg md:text-xl mb-2 group-hover:text-orange-primary transition-colors">{s.title}</h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-[40ch]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band (shared dark+orange) */}
        <CtaBand
          eyebrow="Zabezpečiť stroj"
          title={<>Potrebujete stroj, <span className="text-orange-primary">ktorý nemáme?</span></>}
          text="Stačí nám povedať, čo potrebujete — o všetko ostatné sa postaráme my. Zavolajte a nájdeme riešenie."
          actions={
            <>
              <a href={PHONE} className="btn-primary text-base px-8 py-4">
                <Phone size={18} />
                <span>Zavolať teraz: 0948 555 551</span>
              </a>
              <a href="mailto:info@royalstroje.sk" className="btn-secondary text-base px-8 py-4">
                <Mail size={18} />
                <span>Napísať email</span>
              </a>
            </>
          }
        />
      </div>
    </div>
  );
}
