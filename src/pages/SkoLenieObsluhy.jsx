import { Phone, Mail, Check, Shield, Award, BookOpen, Users, ClipboardList, GraduationCap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContentSection from '../components/common/ContentSection';

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
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Školenie obsluhy strojov – Preukaz obsluhy | Royal Stroje Senec</title>
        <meta
          name="description"
          content="Certifikované kurzy obsluhy stavebných strojov – rýpadlá, nakladače, VZV, manipulátory. Akreditované školenia v spolupráci s Alpha Safety. Platný preukaz obsluhy."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/skolenie-obsluhy" />
        <meta property="og:title" content="Školenie obsluhy strojov | Royal Stroje" />
        <meta property="og:description" content="Certifikované kurzy obsluhy stavebných strojov. Platný preukaz obsluhy. V spolupráci s Alpha Safety." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/skolenie-obsluhy" />
      </Helmet>

      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje – Školenie obsluhy strojov"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '160px', background: 'linear-gradient(to bottom, transparent, #181818)' }}
        />
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-primary/20 border border-orange-primary/40 rounded-full text-orange-primary text-sm font-bold mb-6">
              <GraduationCap size={16} />
              V spolupráci s Alpha Safety
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Preukaz obsluhy strojov. <span className="text-orange-primary">Rýchlo a legálne.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Certifikované kurzy pre rýpadlá, nakladače, VZV a manipulátory. Akreditované školenia s platným preukazom obsluhy.
            </p>
          </div>
        </div>
      </section>

      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />

      <ContentSection>
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img src="/logoroyal.webp" alt="Royal Stroje" className="h-8 w-auto" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Intro */}
          <div className="text-center mb-10 md:mb-16 pt-16 md:pt-0">
            <h1 className="text-xl md:text-4xl font-black text-white mb-3 md:mb-4">
              Školenie obsluhy <span className="text-orange-primary">stavebných strojov</span>
            </h1>
            <p className="text-white/70 text-sm md:text-lg max-w-3xl mx-auto mb-4">
              Royal Stroje v spolupráci s akreditovaným partnerom <strong className="text-white">Alpha Safety</strong> zabezpečuje odborné kurzy obsluhy stavebných strojov. Získajte platný preukaz, ktorý je zákonnou podmienkou pre prácu s mechanizáciou na Slovensku.
            </p>
            <p className="text-white/50 text-xs md:text-sm max-w-2xl mx-auto">
              Zákon č. 124/2006 Z. z. o bezpečnosti a ochrane zdravia pri práci ukladá povinnosť mať preukaz obsluhy pre vybrané typy strojov.
            </p>
          </div>

          {/* Alpha Safety Partner Banner */}
          <div className="mb-10 md:mb-16">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-orange-primary/30 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center flex-shrink-0">
                <Shield className="text-orange-primary" size={32} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-orange-primary font-bold text-sm mb-1 uppercase tracking-wider">Akreditovaný partner</p>
                <h2 className="text-white font-black text-xl md:text-2xl mb-2">Alpha Safety</h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Naším certifikovaným partnerom pre školenia je spoločnosť Alpha Safety – akreditovaná inštitúcia s dlhoročnými skúsenosťami v oblasti bezpečnosti práce a odbornej prípravy obsluhy stavebných strojov.
                </p>
              </div>
            </div>
          </div>

          {/* Course Types */}
          <div className="mb-10 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                Typy <span className="text-orange-primary">kurzov</span>
              </h2>
              <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
                Zabezpečujeme certifikáciu pre všetky bežné typy stavebnej mechanizácie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {certTypes.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all group"
                >
                  <div className="text-3xl mb-4">{cert.icon}</div>
                  <h3 className="text-white font-black text-lg md:text-xl mb-1 group-hover:text-orange-primary transition">
                    {cert.title}
                  </h3>
                  <p className="text-orange-primary text-sm font-bold mb-3">{cert.subtitle}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{cert.description}</p>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                    <BookOpen size={14} className="text-orange-primary" />
                    <span className="text-white/50 text-xs">Trvanie kurzu: <strong className="text-white/70">{cert.duration}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-10 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                Prečo absolvovať <span className="text-orange-primary">školenie u nás?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4">
                      <Icon className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-10 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                Ako to <span className="text-orange-primary">funguje?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {steps.map((item) => (
                <div key={item.step} className="bg-zinc-900 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-3 mx-auto text-orange-primary font-black text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who Is It For */}
          <div className="mb-10 md:mb-16">
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 text-center">
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
                    <p className="text-white/80 text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Note */}
          <div className="mb-10 md:mb-16">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/20 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-black text-white mb-3 text-center">
                Legislatívna <span className="text-orange-primary">povinnosť</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed text-center mb-4">
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
                    <p className="text-white/60 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
              Záujem o školenie?
            </h2>
            <p className="text-white/70 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
              Kontaktujte nás – dohodneme termín, typ kurzu a všetky detaily. Školenie zabezpečíme rýchlo a bez zbytočnej byrokracie.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 text-white/70 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Akreditovaný partner Alpha Safety
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Platný preukaz obsluhy
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Rýchly termín
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-base rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={20} />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="mailto:info@royalstroje.sk"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-zinc-800 border border-zinc-700 md:border-2 text-white font-bold text-sm md:text-base rounded-full hover:bg-zinc-700 transition-all"
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
