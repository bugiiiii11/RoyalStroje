import { CheckCircle, Clock, Calculator, UserCheck, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/contact/ContactForm';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import { useInView } from '../hooks/useInView';

export default function CenovaPonuka() {
  const [headingRef, headingInView] = useInView();
  const [gridRef, gridInView] = useInView();
  const [whyRef, whyInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const [formRef, formInView] = useInView();
  const services = [
    {
      id: 'presna-kalkulacia',
      icon: Calculator,
      title: 'Presná kalkulácia',
      description: 'Detailný rozpis všetkých položiek. Férové ceny bez skrytých poplatkov.',
      features: ['Transparentný cenník', 'Žiadne skryté poplatky', 'Detailný rozpis', 'Cenová flexibilita'],
    },
    {
      id: 'rychle-spracovanie',
      icon: Clock,
      title: 'Ponuka do 24 hodín',
      description: 'Pripravíme a odošleme cenovú ponuku do 24 hodín od požiadavky.',
      features: ['Email + Formulár do 24hodín','Okamžitá ponuka na osobnom stretnutí','Napíšte nám a my sa ozveme','Možnosť telefonickej konzultácie'],
    },
    {
      id: 'individualny-pristup',
      icon: UserCheck,
      title: 'Individuálny prístup',
      description: 'Každá cenová ponuka je na mieru podľa vašich potrieb.',
      features: ['Konzultácia zdarma', 'Návrh riešenia', 'Možnosť úprav', 'Odborné poradenstvo'],
    },
    {
      id: 'bezplatna-konzultacia',
      icon: CheckCircle,
      title: 'Bezplatná konzultácia',
      description: 'Príprava cenovej ponuky a odborná konzultácia sú úplne zdarma.',
      features: ['Konzultácia zdarma', 'Príprava ponuky zdarma', 'Bez registrácie', 'Ochrana údajov GDPR'],
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Cenová ponuka - Prenájom stavebnej techniky | Royal Stroje</title>
        <meta
          name="description"
          content="Získajte bezplatnú cenovú ponuku na prenájom stavebnej techniky do 24 hodín. Individuálny prístup, presná kalkulácia, transparentné ceny. Royal Stroje Senec."
        />
        <link rel="canonical" href="https://royalstroje.sk/sluzby/cenova-ponuka" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cenová ponuka | Royal Stroje Senec" />
        <meta property="og:description" content="Bezplatná cenová ponuka do 24 hodín. Transparentné ceny, individuálny prístup." />
        <meta property="og:url" content="https://royalstroje.sk/sluzby/cenova-ponuka" />
      </Helmet>

      <PageHero
        eyebrow="Cenová ponuka"
        title={<>Bezplatná konzultácia. <span className="text-orange-primary">Pripravíme do 24 hodín.</span></>}
        subtitle="Detailná kalkulácia na mieru. Transparentný rozpis bez skrytých poplatkov."
        image="/hero-pozicovna.webp"
        imageAlt="Royal Stroje - Cenová ponuka"
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

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Services Grid */}
          <div className="mb-12 md:mb-16">
            <div ref={headingRef} className={`text-center mb-6 md:mb-12 pt-16 md:pt-0 reveal ${headingInView ? 'in-view' : ''}`}>
              <h1 className="text-xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4">
                Cenová ponuka do 24 hodín. <span className="text-orange-primary">Presne, férovo.</span>
              </h1>
              <p className={`text-zinc-700 text-sm md:text-lg max-w-2xl mx-auto reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
                Presná kalkulácia na mieru. Transparentný rozpis bez skrytých poplatkov.
              </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 group reveal stagger-${index + 1} ${gridInView ? 'in-view' : ''}`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                      <IconComponent className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{service.title}</h3>
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                          <span className="text-orange-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Request a Quote Section */}
          <div ref={whyRef} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className={`relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden shadow-sm shadow-zinc-900/10 reveal-scale ${whyInView ? 'in-view' : ''}`}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                    Prečo si vyžiadať <span className="text-orange-primary">ponuku?</span>
                  </h2>
                  <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                    Vďaka našim <strong className="text-orange-primary">20-ročným skúsenostiam</strong> v odvetví vieme poskytnúť presnú cenovú ponuku prispôsobenú vašim potrebám. Dokážeme vám naceniť a zabezpečiť všetok potrebný tovar k realizácii projektu, čím vás odbremeníme od zbytočných komplikácií a šetríme váš čas.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-orange-primary font-black text-3xl mb-2">20</div>
                    <p className="text-zinc-300 text-sm">rokov skúseností</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-orange-primary font-black text-3xl mb-2">24h</div>
                    <p className="text-zinc-300 text-sm">príprava ponuky</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-orange-primary font-black text-3xl mb-2">100%</div>
                    <p className="text-zinc-300 text-sm">na mieru</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div ref={stepsRef} className="mb-16">
            <div className={`text-center mb-12 reveal ${stepsInView ? 'in-view' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
                Ako to <span className="text-orange-primary">funguje?</span>
              </h2>
              <p className="text-zinc-700 max-w-3xl mx-auto mb-8">
                3 jednoduché kroky k presnej cenovej ponuke
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-1 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  1
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Vyplňte formulár</h3>
                <p className="text-zinc-400 text-sm">
                  Popíšte nám vaše požiadavky a potreby
                </p>
              </div>
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-2 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  2
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Konzultácia</h3>
                <p className="text-zinc-400 text-sm">
                  Spoločne nájdeme najlepšie riešenie
                </p>
              </div>
              <div className={`bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 text-center shadow-sm shadow-zinc-900/10 hover:border-orange-primary/50 hover:shadow-md hover:shadow-orange-primary/20 transition-all duration-300 reveal stagger-3 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  3
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Cenová ponuka</h3>
                <p className="text-zinc-400 text-sm">
                  Dostanete detailnú kalkuláciu do 24h
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div ref={formRef} className={`mb-16 reveal ${formInView ? 'in-view' : ''}`}>
            <ContactForm />
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
