import { Phone, Mail, FileText, CheckCircle, Clock, Calculator, UserCheck, Lightbulb } from 'lucide-react';

export default function CenovaPonuka() {
  const services = [
    {
      id: 'presna-kalkulacia',
      icon: Calculator,
      title: 'Presná kalkulácia',
      description: 'Detailný rozpis všetkých položiek s férovou cenou bez skrytých poplatkov.',
      features: ['Transparentný cenník', 'Žiadne skryté poplatky', 'Detailný rozpis položiek', 'Cenová flexibilita'],
    },
    {
      id: 'rychle-spracovanie',
      icon: Clock,
      title: 'Rýchle spracovanie',
      description: 'Cenovú ponuku pripravíme a odošleme do 24 hodín od vašej požiadavky.',
      features: ['Ponuka do 24h', 'Express možnosť', 'Online odoslanie', 'SMS notifikácia'],
    },
    {
      id: 'individualny-pristup',
      icon: UserCheck,
      title: 'Individuálny prístup',
      description: 'Každá cenová ponuka je prispôsobená presne vašim potrebám a požiadavkám.',
      features: ['Konzultácia zdarma', 'Návrh riešenia', 'Možnosť úprav', 'Odborné poradenstvo'],
    },
    {
      id: 'ziadna-zavaznost',
      icon: CheckCircle,
      title: 'Bez záväzkov',
      description: 'Vytvorenie cenovej ponuky je pre vás úplne zadarmo a nezáväzné.',
      features: ['Zadarmo', 'Bez registrácie', 'Žiadne záväzky', 'Ochrana údajov'],
    },
    {
      id: 'komplexne-sluzby',
      icon: FileText,
      title: 'Komplexné služby',
      description: 'Ponúkame cenové kalkulácie pre prenájom, predaj aj servisné služby.',
      features: ['Prenájom techniky', 'Predaj náradia', 'Náhradné diely', 'Zemné práce'],
    },
    {
      id: 'poradenstvo',
      icon: Lightbulb,
      title: 'Odborné poradenstvo',
      description: 'Pomôžeme vám vybrať správne riešenie a optimalizovať náklady.',
      features: ['Výber techniky', 'Optimalizácia nákladov', 'Technické parametre', 'Alternatívne riešenia'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
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

        {/* Modern geometric bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-30">
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
            {/* Fill area below decorative line with background color */}
            <path
              d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
              fill="#09090b"
            />
            {/* Orange decorative lines */}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Cenová ponuka
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Pre každého obchodníka je tvorba cenových ponúk jednou z najdôležitejších obchodných aktivít. Je posledným krokom pred objednávkou a preto jej každý z obchodníkov pripisuje veľký význam.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Services Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Výhody <span className="text-orange-primary">cenovej ponuky</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Hlavnou výhodou týchto cenových ponúk je možnosť vypracovať presnú cenovú kalkuláciu podľa vopred zistených potrieb klienta a naviač pridať ďalšie možnosti, ktoré si klient môže vyberať sám.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
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

          {/* Benefits Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Prečo si <span className="text-orange-primary">vyžiadať ponuku?</span>
              </h2>
              <p className="text-white/70 max-w-3xl mx-auto mb-8">
                Vďaka našim dlhoročným skúsenostiam Vám vieme v tomto smere poskytnúť veľmi presnú cenovú ponuku, ktorú vieme prispôsobiť Vašim potrebám. Taktiež Vám dokážeme naceniť a zabezpečiť tovar potrebný k realizácii, čím Vás odbremeníme od nepríjemností, ktoré sú spojené často spojené.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-primary/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  1
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Vyplňte formulár</h3>
                <p className="text-white/60 text-sm">
                  Popíšte nám vaše požiadavky a potreby
                </p>
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-primary/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  2
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Konzultácia</h3>
                <p className="text-white/60 text-sm">
                  Spoločne nájdeme najlepšie riešenie
                </p>
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-primary/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-4 mx-auto text-orange-primary font-black text-2xl">
                  3
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Cenová ponuka</h3>
                <p className="text-white/60 text-sm">
                  Dostanete detailnú kalkuláciu do 24h
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-start gap-3 bg-orange-primary/10 border border-orange-primary/30 rounded-xl px-6 py-4 max-w-3xl">
                <div className="w-8 h-8 rounded-lg bg-orange-primary/20 border border-orange-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="text-orange-primary" size={18} />
                </div>
                <p className="text-white/90 text-sm text-left">
                  <strong className="text-white">Tip:</strong> Čím presnejšie popíšete vaše požiadavky, tým rýchlejšie
                  a presnejšie vieme pripraviť cenovú ponuku na mieru.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Potrebujete cenovú ponuku?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Kontaktujte nás a my vám pripravíme detailnú cenovú kalkuláciu presne podľa vašich potrieb.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 text-white/70">
                <span className="text-orange-primary">✓</span> Ponuka do 24 hodín
              </span>
              <span className="flex items-center gap-2 text-white/70">
                <span className="text-orange-primary">✓</span> Zadarmo a nezáväzne
              </span>
              <span className="flex items-center gap-2 text-white/70">
                <span className="text-orange-primary">✓</span> Odborné poradenstvo
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
              >
                <Phone size={20} />
                <span>Zavolať teraz</span>
              </a>
              <a
                href="mailto:info@royalstroje.sk"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
              >
                <Mail size={20} />
                <span>Napísať email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
