import { CheckCircle, Clock, Calculator, UserCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/contact/ContactForm';
import ContentSection from '../components/common/ContentSection';
import { useInView } from '../hooks/useInView';

export default function CenovaPonuka() {
  const [heroRef, heroInView] = useInView();
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
      features: ['Ponuka do 24h', 'Email + SMS', 'Možnosť konzultácie', '20 rokov skúseností'],
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

      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Cenová ponuka"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Gradient fade na spodok - prechod do content sekcie */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '160px',
            background: 'linear-gradient(to bottom, transparent, #181818)'
          }}
        />

        {/* Content */}
        <div ref={heroRef} className={`relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 reveal ${heroInView ? 'in-view' : ''}`}>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Bezplatná konzultácia. <span className="text-orange-primary">Pripravíme do 24 hodín.</span>
            </h1>
            <p className={`text-lg md:text-xl text-white/90 leading-relaxed reveal-fade stagger-2 ${heroInView ? 'in-view' : ''}`}>
              Detailná kalkulácia na mieru. Transparentný rozpis bez skrytých poplatkov.
            </p>
          </div>
        </div>
      </section>

      {/* Separator line between hero and content */}
      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />

      {/* Main Content Section */}
      <ContentSection>
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
              <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
                Cenová ponuka do 24 hodín. <span className="text-orange-primary">Presne, férovo.</span>
              </h1>
              <p className={`text-white/70 text-sm md:text-lg max-w-2xl mx-auto reveal-fade stagger-2 ${headingInView ? 'in-view' : ''}`}>
                Presná kalkulácia na mieru. Transparentný rozpis bez skrytých poplatkov.
              </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className={`bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group reveal stagger-${index + 1} ${gridInView ? 'in-view' : ''}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4 group-hover:bg-orange-primary/20 transition">
                      <IconComponent className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{service.title}</h3>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
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
              <div className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-orange-primary/30 rounded-3xl p-8 md:p-12 reveal-scale ${whyInView ? 'in-view' : ''}`}>
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                    Prečo si vyžiadať <span className="text-orange-primary">ponuku?</span>
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    Vďaka našim <strong className="text-orange-primary">12-ročným skúsenostiam</strong> v odvetví vieme poskytnúť presnú cenovú ponuku prispôsobenú vašim potrebám. Dokážeme vám naceniť a zabezpečiť všetok potrebný tovar k realizácii projektu, čím vás odbremeníme od zbytočných komplikácií a šetríme váš čas.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5 text-center">
                    <div className="text-orange-primary font-black text-3xl mb-2">12+</div>
                    <p className="text-white/70 text-sm">rokov skúseností</p>
                  </div>
                  <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5 text-center">
                    <div className="text-orange-primary font-black text-3xl mb-2">24h</div>
                    <p className="text-white/70 text-sm">príprava ponuky</p>
                  </div>
                  <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5 text-center">
                    <div className="text-orange-primary font-black text-3xl mb-2">100%</div>
                    <p className="text-white/70 text-sm">na mieru</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div ref={stepsRef} className="mb-16">
            <div className={`text-center mb-12 reveal ${stepsInView ? 'in-view' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ako to <span className="text-orange-primary">funguje?</span>
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto mb-8">
                3 jednoduché kroky k presnej cenovej ponuke
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className={`bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-primary/50 transition-all reveal stagger-1 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  1
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Vyplňte formulár</h3>
                <p className="text-white/60 text-sm">
                  Popíšte nám vaše požiadavky a potreby
                </p>
              </div>
              <div className={`bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-primary/50 transition-all reveal stagger-2 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  2
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Konzultácia</h3>
                <p className="text-white/60 text-sm">
                  Spoločne nájdeme najlepšie riešenie
                </p>
              </div>
              <div className={`bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-primary/50 transition-all reveal stagger-3 ${stepsInView ? 'in-view' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  3
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Cenová ponuka</h3>
                <p className="text-white/60 text-sm">
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
