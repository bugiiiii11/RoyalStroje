import { Phone, Mail, Check, Shield, Award, BookOpen, Users, ClipboardList } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import { useInView } from '../hooks/useInView';

const certTypes = [
  {
    id: 'minirypadlo',
    title: 'Mini-rýpadlo',
    subtitle: 'do 6 ton',
    description: 'Pásové a kolesové mini-rýpadlá. Najžiadanejší kurz pre stavebných pracovníkov a operátorov.',
    duration: '2 – 3 dni',
    icon: '🚜',
  },
  {
    id: 'rypadlo',
    title: 'Rýpadlo',
    subtitle: 'nad 6 ton',
    description: 'Veľké pásové a kolesové rýpadlá pre ťažšie zemné práce a výkopy.',
    duration: '3 – 5 dní',
    icon: '⛏️',
  },
  {
    id: 'nakladac',
    title: 'Kolesový nakladač',
    subtitle: 'a smykom riadený nakladač',
    description: 'Nakladače na prepravu materiálu a manipuláciu v stavebníctve a priemysle.',
    duration: '2 – 3 dni',
    icon: '🏗️',
  },
  {
    id: 'vzv',
    title: 'Vysokozdvižný vozík',
    subtitle: 'VZV – preukaz ZZ',
    description: 'Povinný preukaz pre každú obsluhu vysokozdvižného vozíka podľa platnej legislatívy SR.',
    duration: '1 – 2 dni',
    icon: '🔧',
  },
  {
    id: 'manipulator',
    title: 'Teleskopický manipulátor',
    subtitle: 'a pracovné plošiny',
    description: 'Manipulátory a kĺbové plošiny pre práce vo výške a manipuláciu s materiálom.',
    duration: '1 – 2 dni',
    icon: '📐',
  },
  {
    id: 'dumpre-valce',
    title: 'Dumpre a valce',
    subtitle: 'zhutňovacie stroje',
    description: 'Kĺbové dumpre a drogové valce pre povrchové úpravy a zhutňovanie terénu.',
    duration: '1 – 2 dni',
    icon: '🛞',
  },
];

const benefits = [
  {
    icon: Award,
    title: 'Akreditované kurzy',
    description: 'Školenia sú akreditované a preukazy platné na celom území Slovenskej republiky.',
  },
  {
    icon: Shield,
    title: 'Bezpečnosť na pracovisku',
    description: 'Certifikovaný operátor znižuje riziko pracovných úrazov a zodpovednosť firmy.',
  },
  {
    icon: Users,
    title: 'Skúsení lektori',
    description: 'Kurzy vedú certifikovaní lektori s dlhoročnou praxou na stavbách.',
  },
  {
    icon: ClipboardList,
    title: 'Teória aj prax',
    description: 'Každý kurz zahŕňa teoretickú prípravu aj praktický výcvik priamo na stroji.',
  },
];

const steps = [
  { step: '1', title: 'Kontaktujte nás', desc: 'Zavolajte alebo napíšte – poradíme, aký kurz potrebujete' },
  { step: '2', title: 'Vyberiete typ stroja', desc: 'Podľa pracovného zaradenia vyberieme správny kurz' },
  { step: '3', title: 'Absolvujete školenie', desc: 'Teoria + praktický výcvik na reálnych strojoch' },
  { step: '4', title: 'Záverečná skúška', desc: 'Pred skúšobnou komisiou akreditovaného partnera' },
  { step: '5', title: 'Získate preukaz', desc: 'Platný preukaz obsluhy strojov uznaný v celej SR' },
];

export default function SkoLenieObsluhy() {
  const [introRef, introInView] = useInView();
  const [partnerRef, partnerInView] = useInView();
  const [coursesRef, coursesInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Školenie obsluhy strojov – Preukaz obsluhy | Royal Stroje Senec</title>
        <meta
          name="description"
          content="Certifikované kurzy obsluhy stavebných strojov – rýpadlá, nakladače, VZV, manipulátory. Akreditované školenia v spolupráci s Alpha Safety s.r.o. Platný preukaz obsluhy."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/skolenie-obsluhy" />
        <meta property="og:title" content="Školenie obsluhy strojov | Royal Stroje" />
        <meta property="og:description" content="Certifikované kurzy obsluhy stavebných strojov. Platný preukaz obsluhy. V spolupráci s Alpha Safety s.r.o." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/skolenie-obsluhy" />
      </Helmet>

      {/* Hero (desktop, light) */}
      <PageHero
        eyebrow="Školenie obsluhy"
        chips={['V spolupráci s Alpha Safety s.r.o.']}
        title={<>Preukaz obsluhy strojov. <span className="text-orange-primary">Rýchlo a legálne.</span></>}
        subtitle="Certifikované kurzy pre rýpadlá, nakladače, VZV a manipulátory. Akreditované školenia s platným preukazom obsluhy."
        image="/hero-pozicovna.webp"
        imageAlt="Royal Stroje – Školenie obsluhy strojov"
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

      <ContentSection light>
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img src="/logoroyal.webp" alt="Royal Stroje" className="h-8 w-auto" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Intro */}
          <div ref={introRef} className={`text-center mb-10 md:mb-16 pt-16 md:pt-0 reveal ${introInView ? 'in-view' : ''}`}>
            <span className="eyebrow eyebrow--center mb-4">Školenie obsluhy</span>
            <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-3 md:mb-4 mt-4">
              Školenie obsluhy <span className="text-orange-primary">stavebných strojov</span>
            </h1>
            <p className={`text-zinc-700 text-sm md:text-lg max-w-3xl mx-auto mb-4 reveal-fade stagger-2 ${introInView ? 'in-view' : ''}`}>
              Royal Stroje v spolupráci s akreditovaným partnerom <a href="https://alphasafety.sk/kurzy/stavebne-stroje" target="_blank" rel="noopener noreferrer" className="text-zinc-900 font-bold hover:text-orange-primary transition-colors duration-200">Alpha Safety s.r.o.</a> zabezpečuje odborné kurzy obsluhy stavebných strojov. Získajte platný preukaz, ktorý je zákonnou podmienkou pre prácu s mechanizáciou na Slovensku.
            </p>
            <p className="text-zinc-500 text-xs md:text-sm max-w-2xl mx-auto">
              Zákon č. 124/2006 Z. z. o bezpečnosti a ochrane zdravia pri práci ukladá povinnosť mať preukaz obsluhy pre vybrané typy strojov.
            </p>
          </div>

          {/* Alpha Safety Partner Banner */}
          <div className="mb-10 md:mb-16">
            <div ref={partnerRef} className={`relative overflow-hidden bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 shadow-sm shadow-zinc-900/5 reveal-scale ${partnerInView ? 'in-view' : ''}`}>
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
              <div className="w-16 h-16 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center flex-shrink-0">
                <Shield className="text-orange-primary" size={32} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-orange-primary font-bold text-sm mb-1 uppercase tracking-wider">Akreditovaný partner</p>
                <h2 className="text-zinc-900 font-black text-xl md:text-2xl mb-2">
                  <a href="https://alphasafety.sk/kurzy/stavebne-stroje" target="_blank" rel="noopener noreferrer" className="hover:text-orange-primary transition-colors duration-200">Alpha Safety s.r.o.</a>
                </h2>
                <p className="text-zinc-700 text-sm md:text-base leading-relaxed">
                  Naším certifikovaným partnerom pre školenia je spoločnosť <a href="https://alphasafety.sk/kurzy/stavebne-stroje" target="_blank" rel="noopener noreferrer" className="text-orange-primary hover:underline">Alpha Safety s.r.o.</a> – akreditovaná inštitúcia s dlhoročnými skúsenosťami v oblasti bezpečnosti práce a odbornej prípravy obsluhy stavebných strojov.
                </p>
              </div>
            </div>
          </div>

          {/* Course Types */}
          <div className="mb-10 md:mb-16">
            <div ref={coursesRef} className={`text-center mb-6 md:mb-12 reveal ${coursesInView ? 'in-view' : ''}`}>
              <span className="eyebrow eyebrow--center mb-4">Kurzy</span>
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mb-3 md:mb-4 mt-4">
                Typy <span className="text-orange-primary">kurzov</span>
              </h2>
              <p className="text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto">
                Zabezpečujeme certifikáciu pre všetky bežné typy stavebnej mechanizácie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {certTypes.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm shadow-zinc-900/5 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/10 transition-all duration-300 group reveal stagger-${Math.min(index + 1, 6)} ${coursesInView ? 'in-view' : ''}`}
                >
                  <div className="text-3xl mb-4">{cert.icon}</div>
                  <h3 className="text-zinc-900 font-black text-lg md:text-xl mb-1 group-hover:text-orange-primary transition">
                    {cert.title}
                  </h3>
                  <p className="text-orange-primary text-sm font-bold mb-3">{cert.subtitle}</p>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-4">{cert.description}</p>
                  <div className="pt-4 border-t border-zinc-200 flex items-center gap-2">
                    <BookOpen size={14} className="text-orange-primary" />
                    <span className="text-zinc-500 text-xs">Trvanie kurzu: <strong className="text-zinc-700">{cert.duration}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-10 md:mb-16">
            <div ref={benefitsRef} className={`text-center mb-6 md:mb-12 reveal ${benefitsInView ? 'in-view' : ''}`}>
              <span className="eyebrow eyebrow--center mb-4">Výhody</span>
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mb-3 md:mb-4 mt-4">
                Prečo absolvovať <span className="text-orange-primary">školenie u nás?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className={`bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm shadow-zinc-900/5 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/10 transition-all duration-300 reveal stagger-${Math.min(idx + 1, 4)} ${benefitsInView ? 'in-view' : ''}`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4">
                      <Icon className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-zinc-900 font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-10 md:mb-16">
            <div ref={stepsRef} className={`text-center mb-6 md:mb-12 reveal ${stepsInView ? 'in-view' : ''}`}>
              <span className="eyebrow eyebrow--center mb-4">Postup</span>
              <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mb-3 md:mb-4 mt-4">
                Ako to <span className="text-orange-primary">funguje?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {steps.map((item, index) => (
                <div key={item.step} className={`bg-white border border-zinc-200 rounded-2xl p-4 text-center shadow-sm shadow-zinc-900/5 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/10 transition-all duration-300 reveal stagger-${Math.min(index + 1, 5)} ${stepsInView ? 'in-view' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-3 mx-auto text-orange-primary font-black text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-zinc-900 font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who Is It For */}
          <div className="mb-10 md:mb-16">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto shadow-sm shadow-zinc-900/5">
              <span className="eyebrow eyebrow--center mb-4">Pre koho</span>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-4 md:mb-6 mt-4 text-center">
                Pre koho je školenie <span className="text-orange-primary">určené?</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Pracovníci, ktorí chcú získať preukaz obsluhy strojov',
                  'Firmy, ktoré potrebujú certifikovať svojich zamestnancov',
                  'Operátori prenajatej techniky bez platného preukazu',
                  'Absolventi, ktorí hľadajú prácu v stavebníctve',
                  'Živnostníci pracujúci s vlastnou alebo prenajatou mechanizáciou',
                  'Každý, kto chce pracovať bezpečne a v súlade so zákonom',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="text-orange-primary flex-shrink-0 mt-1" size={20} />
                    <p className="text-zinc-700 text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Note */}
          <div className="mb-10 md:mb-16">
            <div className="relative overflow-hidden bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm shadow-zinc-900/5">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
              <span className="eyebrow eyebrow--center mb-4">Legislatíva</span>
              <h2 className="text-xl md:text-2xl font-black text-zinc-900 mb-3 mt-4 text-center">
                Legislatívna <span className="text-orange-primary">povinnosť</span>
              </h2>
              <p className="text-zinc-700 text-sm md:text-base leading-relaxed text-center mb-4">
                Podľa zákona č. 124/2006 Z. z. a vyhlášky MPSVR SR je obsluha vybraných stavebných strojov viazaná na platný preukaz vydaný oprávnenou organizáciou.
              </p>
              <div className="space-y-2">
                {[
                  'Kontroly NIP (Národného inšpektorátu práce) sú bežné na každej stavbe',
                  'Za prevádzku stroja bez preukazu hrozí pokuta zamestnávateľovi aj obsluhe',
                  'Platný preukaz je podmienkou poistného krytia pri pracovných úrazoch',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-orange-primary mt-1">•</span>
                    <p className="text-zinc-600 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className={`text-center reveal-scale ${ctaInView ? 'in-view' : ''}`}>
            <span className="eyebrow eyebrow--center mb-4">Kontakt</span>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-900 mb-4 mt-4">
              Záujem o školenie?
            </h2>
            <p className={`text-zinc-700 text-sm md:text-lg mb-8 max-w-2xl mx-auto reveal-fade stagger-2 ${ctaInView ? 'in-view' : ''}`}>
              Kontaktujte nás – dohodneme termín, typ kurzu a všetky detaily. Školenie zabezpečíme rýchlo a bez zbytočnej byrokracie.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 text-zinc-700 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Akreditovaný partner Alpha Safety s.r.o.
              </span>
              <span className="flex items-center gap-2 text-zinc-700 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Platný preukaz obsluhy
              </span>
              <span className="flex items-center gap-2 text-zinc-700 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Rýchly termín
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+421948555551"
                className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
              >
                <Phone size={20} />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="mailto:info@royalstroje.sk"
                className="btn-outline-light text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
              >
                <Mail size={20} />
                <span>Napísať email</span>
              </a>
            </div>
          </div>

        </div>
      </ContentSection>
    </div>
  );
}
