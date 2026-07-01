import { Helmet } from 'react-helmet-async';
import { Phone, Mail, Truck, Zap, PackageCheck, MapPin, Package, ArrowLeftRight } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { useInView } from '../hooks/useInView';

const PHONE = 'tel:+421948555551';

const benefits = [
  {
    icon: Zap,
    title: 'Expresne načas',
    text: 'Malé náradie a stredná mechanizácia často v ten istý deň, ťažká technika do 24 hodín.',
  },
  {
    icon: PackageCheck,
    title: 'Naložíme aj vyložíme',
    text: 'Techniku naložíme u nás a vyložíme priamo na mieste — nepotrebujete vlastný transport ani manipuláciu.',
  },
  {
    icon: Truck,
    title: 'Vlastná flotila',
    text: 'Dodávka, pick-up s prívesným vozíkom do 3 500 kg aj preprava ťažších strojov. Vyberieme správny spôsob.',
  },
  {
    icon: MapPin,
    title: 'Po celom okolí',
    text: 'Senec, Bratislava, Galanta, Trnava, Pezinok, Šamorín a široké okolie.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Ozvite sa nám',
    text: 'Telefonicky, e-mailom alebo cez WhatsApp / Telegram. Radi poradíme s výberom techniky.',
  },
  {
    n: '02',
    title: 'Dohodneme termín a dopravu',
    text: 'Potvrdíme dostupnosť a vyberieme vhodný spôsob prepravy podľa typu a hmotnosti techniky.',
  },
  {
    n: '03',
    title: 'Privezieme a vyložíme',
    text: 'V dohodnutom čase doručíme techniku priamo na stavbu. Po skončení prenájmu ju odvezieme.',
  },
];

const pricing = [
  {
    icon: Truck,
    title: 'Dodávka',
    subtitle: 'Malé náradie a stredná mechanizácia',
    rows: [
      { label: 'Senec', value: '15 €' },
      { label: 'Ostatné', value: '1 €/km', note: 'min. 15 €' },
    ],
  },
  {
    icon: Package,
    title: 'Pick-up + prívesný vozík',
    subtitle: 'Do 3 500 kg — ťažšie stroje a minirýpadlá',
    rows: [{ label: 'Doprava', value: '1,2 €/km', note: 'min. 15 €' }],
  },
  {
    icon: ArrowLeftRight,
    title: 'Preprava cudzej techniky',
    subtitle: 'Aj stroje, ktoré nie sú z našej požičovne',
    rows: [{ label: 'Doprava', value: '1,50 €/km', note: 'min. 30 €' }],
  },
];

export default function DovozTechniky() {
  const [benefitsRef, benefitsInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const [pricingRef, pricingInView] = useInView();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Dovoz techniky na stavbu — Senec, Bratislava a okolie | Royal Stroje</title>
        <meta
          name="description"
          content="Dovezieme stavebnú techniku a náradie priamo na vašu stavbu. Naloženie aj vyloženie, dovoz do 24 h, vlastná flotila. Senec, Bratislava a okolie. Transparentný cenník dopravy."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/dovoz-techniky" />
        <meta property="og:title" content="Dovoz techniky na stavbu | Royal Stroje" />
        <meta property="og:description" content="Naložíme, privezieme a vyložíme techniku priamo na vašej stavbe. Dovoz do 24 h, Senec · Bratislava · okolie." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/dovoz-techniky" />
      </Helmet>

      {/* Hero (desktop, light) */}
      <PageHero
        eyebrow="Služby · Doprava"
        title={<>Dovoz techniky <span className="text-orange-primary">priamo na vašu stavbu</span></>}
        subtitle="Naložíme, privezieme a vyložíme techniku presne tam, kde pracujete. Načas, spoľahlivo a po celom okolí Senca a Bratislavy — vy sa staráte o stavbu, my o jej dovoz."
        image="/pictures/graphics/dovoz.webp"
        imageAlt="Dodávka Royal Stroje s dovozom techniky na stavbu"
        chips={['Dovoz do 24 h', 'Naloženie aj vyloženie', 'Senec · Bratislava · okolie']}
        actions={
          <>
            <a href={PHONE} className="btn-primary">
              <Phone size={16} />
              Zavolať teraz
            </a>
            <a href="#cennik" className="btn-outline-light px-5 py-3">
              Cenník dopravy
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
          <span className="eyebrow eyebrow--center mb-3">Dovoz techniky</span>
          <h1 className="text-2xl font-black text-zinc-900 mt-3">
            Dovoz techniky <span className="text-orange-primary">na stavbu</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-3">
            Naložíme, privezieme a vyložíme techniku priamo na vašej stavbe.
          </p>
        </div>

        {/* Benefits */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
              <span className="eyebrow eyebrow--center mb-4">Prečo Royal Stroje</span>
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mt-4">
                Dovoz, na ktorý sa <span className="text-orange-primary">môžete spoľahnúť</span>
              </h2>
            </div>
            <div
              ref={benefitsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
            >
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className={`group relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 overflow-hidden reveal stagger-${i + 1} ${benefitsInView ? 'in-view' : ''}`}
                  >
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-orange-primary/20 group-hover:border-orange-primary/50 transition-colors">
                      <Icon className="text-orange-primary" size={22} />
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-lg mb-1 md:mb-2 leading-tight">{b.title}</h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{b.text}</p>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-primary to-orange-hover transition-all duration-500" />
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
              <span className="eyebrow eyebrow--center mb-4">Ako to funguje</span>
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mt-4">
                Od telefonátu <span className="text-orange-primary">po vyloženie na stavbe</span>
              </h2>
            </div>
            <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`group relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 overflow-hidden reveal stagger-${i + 1} ${stepsInView ? 'in-view' : ''}`}
                >
                  <span className="absolute top-3 right-4 font-display text-5xl md:text-6xl font-black text-white/[0.06] group-hover:text-orange-primary/20 transition-colors pointer-events-none select-none">
                    {s.n}
                  </span>
                  <div className="relative">
                    <h3 className="text-white font-black text-lg md:text-xl mb-2 group-hover:text-orange-primary transition-colors">{s.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-[40ch]">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="cennik" className="py-12 md:py-16 lg:py-20 border-t border-zinc-200/70 scroll-mt-24">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
            <div ref={pricingRef} className={`text-center max-w-2xl mx-auto mb-8 md:mb-12 reveal ${pricingInView ? 'in-view' : ''}`}>
              <span className="eyebrow eyebrow--center mb-4">Cenník dopravy</span>
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mt-4">
                Transparentné ceny <span className="text-orange-primary">bez prekvapení</span>
              </h2>
              <p className="text-zinc-600 text-sm md:text-lg mt-3">
                Cena dopravy závisí od typu a hmotnosti techniky.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {pricing.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent rounded-t-2xl" />
                    <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center mb-4">
                      <Icon className="text-orange-primary" size={26} />
                    </div>
                    <h3 className="text-white font-black text-lg md:text-xl mb-1">{p.title}</h3>
                    <p className="text-zinc-500 text-sm mb-5">{p.subtitle}</p>
                    <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
                      {p.rows.map((r) => (
                        <div key={r.label} className="flex items-baseline justify-between gap-3">
                          <span className="text-zinc-400 text-sm">{r.label}</span>
                          <span className="text-right">
                            <span className="text-orange-primary font-black text-xl">{r.value}</span>
                            {r.note && <span className="block text-zinc-400 text-xs">{r.note}</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-zinc-500 text-sm mt-6">
              Presnú cenu vám oznámime pri objednávke. Uvedené ceny sú <strong className="text-zinc-700">bez DPH</strong>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <CtaBand
          eyebrow="Objednať dopravu"
          title="Potrebujete techniku na stavbe?"
          text="Zavolajte nám a dohodneme presný termín dovozu priamo na vašu stavbu."
          icon={Truck}
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
