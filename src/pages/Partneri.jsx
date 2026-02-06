import { Link } from 'react-router-dom';
import { Handshake, Award, TrendingUp, Users, Phone, Mail, CheckCircle, Building2, Wrench, Truck, Home } from 'lucide-react';

export default function Partneri() {
  const partnerCategories = [
    {
      icon: Building2,
      title: 'Stavebné Firmy',
      description: 'Profesionálne stavebné spoločnosti realizujúce projekty v regióne',
      count: '15+',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Home,
      title: 'Developeri',
      description: 'Developeri bytových a rodinných domov v Senci a okolí',
      count: '8+',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Wrench,
      title: 'Živnostníci',
      description: 'Samostatní živnostníci a remeselníci s pravidelnou spoluprácou',
      count: '25+',
      color: 'from-orange-primary to-orange-hover',
    },
    {
      icon: Truck,
      title: 'Dopravné Firmy',
      description: 'Prepravné spoločnosti zabezpečujúce logistiku a dopravu',
      count: '6+',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Zvýhodnené Ceny',
      description: 'Až 20% zľava na prenájom pre partnerov s dlhodobou spoluprácou',
      highlight: '-20%',
    },
    {
      icon: CheckCircle,
      title: 'Prioritná Rezervácia',
      description: 'Vždy prvý v rade pri rezervácii strojov počas špičkovej sezóny',
      highlight: '1.',
    },
    {
      icon: Award,
      title: 'Flexibilné Podmienky',
      description: 'Individuálne platobné podmienky a fakturácia na konci mesiaca',
      highlight: '30 dní',
    },
    {
      icon: Users,
      title: 'Dedikovaný Manažér',
      description: 'Osobný kontakt pre rýchle riešenie požiadaviek a problémov',
      highlight: '24/7',
    },
  ];

  const partnerTestimonials = [
    {
      company: 'STAV-SENEC s.r.o.',
      location: 'Senec',
      text: 'S Royal Stroje spolupracujeme už 3 roky. Vždy spoľahlivé, rýchle a za férové ceny. Odporúčame!',
      person: 'Ing. Peter Novák',
      position: 'Konateľ',
      projects: '12+ projektov',
    },
    {
      company: 'ZÁHRADNÍK PLUS',
      location: 'Bratislava',
      text: 'Minirýpadlá od Royal Stroje používame pravidelne. Kvalitná technika a skvelý servis.',
      person: 'Marek Horváth',
      position: 'Majiteľ',
      projects: '8+ projektov',
    },
    {
      company: 'DOM DEVELOPMENT',
      location: 'Senec',
      text: 'Pre naše projekty potrebujeme pravidelný prístup k technike. Royal Stroje nás nikdy nesklamali.',
      person: 'Lucia Krajčovičová',
      position: 'Project Manager',
      projects: '5+ projektov',
    },
  ];

  const requirements = [
    'Platné živnostenské oprávnenie alebo IČO',
    'Minimálne 3 prenájmy za posledných 6 mesiacov',
    'Pozitívna história spolupráce',
    'Sídlo alebo prevádzka v regióne Senec/Bratislava',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Partneri"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Modern geometric bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-30">
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
              fill="#09090b"
            />
            <path
              d="M0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30"
              fill="none"
              stroke="rgba(255,102,0,0.6)"
              strokeWidth="2"
            />
            <path
              d="M250,0 L600,0"
              fill="none"
              stroke="rgba(255,102,0,0.8)"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center">
                <Handshake size={28} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Naši <span className="text-orange-primary">Partneri</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Spolupracujeme s overenými profesionálmi zo Senca, Bratislavy a okolia.
              Títo partneri nám dôverujú a pravidelne využívajú naše služby pre svoje projekty.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Background effects */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-primary mb-2">50+</div>
              <div className="text-white/70 text-sm">Aktívnych Partnerov</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-primary mb-2">3 roky</div>
              <div className="text-white/70 text-sm">Priemerná Spolupráca</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-primary mb-2">500+</div>
              <div className="text-white/70 text-sm">Projektov Ročne</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-primary mb-2">98%</div>
              <div className="text-white/70 text-sm">Spokojnosť</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Kategórie <span className="text-orange-primary">Partnerov</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Naši partneri pôsobia v rôznych oblastiach stavebníctva a priemyslu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:shadow-2xl hover:shadow-orange-primary/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="text-3xl font-black text-orange-primary mb-2">{category.count}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-white/70 text-sm">{category.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 bg-black overflow-hidden">
        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Výhody <span className="text-orange-primary">Partnerstva</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Staňte sa naším partnerom a získajte prístup k exkluzívnym výhodám
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-primary/10 flex items-center justify-center">
                      <Icon size={24} className="text-orange-primary" />
                    </div>
                    <div className="text-2xl font-black text-orange-primary">{benefit.highlight}</div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/70 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Čo Hovoria Naši <span className="text-orange-primary">Partneri</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Reálne skúsenosti od firiem, ktoré s nami spolupracujú
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-primary fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-sm italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white mb-1">{testimonial.company}</div>
                  <div className="text-sm text-white/70 mb-2">{testimonial.location}</div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{testimonial.person}</span>
                    <span className="text-orange-primary">{testimonial.projects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Become Partner */}
      <section className="relative py-16 bg-black overflow-hidden">
        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center mx-auto mb-6">
                  <Handshake size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  Chcete sa stať <span className="text-orange-primary">naším partnerom</span>?
                </h2>
                <p className="text-white/80 text-lg">
                  Ste profesionálna firma pôsobiaca v Senci alebo okolí? Kontaktujte nás a staňte sa súčasťou nášho partnerského programu.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Čo Získate:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Až 20% zľavu na všetky prenájmy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Prioritnú rezerváciu strojov</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Flexibilné platobné podmienky</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Dedikovaného account manažéra</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">Referencie od spoľahlivého partnera</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Podmienky Partnerstva:</h3>
                  <ul className="space-y-3">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-orange-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-orange-primary text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-white/80 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Proces Prihlásenia:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">1</div>
                    <p className="text-white/80 text-sm">Kontaktujte nás telefonicky alebo emailom</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">2</div>
                    <p className="text-white/80 text-sm">Dohodneme si osobné stretnutie</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">3</div>
                    <p className="text-white/80 text-sm">Podpíšeme partnerskú zmluvu</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+421948555551"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
                >
                  <Phone size={20} />
                  <span>Zavolať: 0948 555 551</span>
                </a>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
                >
                  <Mail size={20} />
                  <span>Kontaktný formulár</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Často Kladené <span className="text-orange-primary">Otázky</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Je partnerstvo spoplatnené?</h3>
              <p className="text-white/70 text-sm">
                Nie, partnerstvo je úplne <strong className="text-orange-primary">bezplatné</strong>. Stačí splniť podmienky
                a môžete začať využívať všetky výhody okamžite.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Ako dlho trvá schválenie partnera?</h3>
              <p className="text-white/70 text-sm">
                Po podaní žiadosti a verifikácii dokumentov trvá schválenie <strong className="text-orange-primary">1-3 pracovné dni</strong>.
                Pri dlhodobej spolupráci môžete byť schválení okamžite.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Môžem byť partnerom ako živnostník?</h3>
              <p className="text-white/70 text-sm">
                Áno! Partnerom sa môže stať každý, kto má platné živnostenské oprávnenie a spĺňa podmienky minimálneho
                počtu prenájmov.
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Aká je minimálna doba trvania partnerstva?</h3>
              <p className="text-white/70 text-sm">
                Partnerstvo nie je časovo obmedzené. Môžete ho <strong className="text-orange-primary">kedykoľvek ukončiť</strong> bez
                sankcií. Odporúčame však minimálne ročnú spoluprácu pre maximálne výhody.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
