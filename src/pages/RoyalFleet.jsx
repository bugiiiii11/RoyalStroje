import { Phone, Mail, Check, TrendingDown, Shield, Calendar } from 'lucide-react';

export default function RoyalFleet() {
  const models = [
    {
      id: 'flexi-rent',
      title: 'FLEXI RENT',
      subtitle: 'Dlhodobý prenájom bez odkúpenia',
      description: 'Najflexibilnejšia možnosť pre firmy, ktoré chcú techniku pravidelne obmieňať.',
      features: ['Fixná mesačná platba', 'Servis zahrnutý', 'Po skončení vrátenie stroja', 'Pravidelná obmenasechniky'],
      bestFor: 'Pre firmy, ktoré chcú najnovšie stroje bez viazania kapitálu',
    },
    {
      id: 'rent-opcia',
      title: 'RENT + OPCIA',
      subtitle: 'Možnosť odkúpenia po skončení zmluvy',
      description: 'Kombinácia prenájmu s možnosťou odkúpenia za vopred dohodnutú cenu.',
      features: ['Nižšia mesačná splátka', 'Flexibilita rozhodnutia', 'Odkúpenie za dohodnutú cenu', 'Obchodná výhoda pri odkúpení'],
      bestFor: 'Pre firmy, ktoré sa ešte nerozhodli, či stroj odkúpiť',
    },
    {
      id: 'rent-to-own',
      title: 'RENT TO OWN',
      subtitle: 'Postupné splácanie s prechodom vlastníctva',
      description: 'Alternatíva ku kúpe bez jednorazovej vysokej investície.',
      features: ['Vyššia mesačná splátka', 'Prechod do vlastníctva', 'Bez vstupnej investície', 'Vlastníctvo po ukončení'],
      bestFor: 'Pre firmy, ktoré chcú vlastniť stroj bez vysokej počiatočnej investície',
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: 'Dlhodobé používanie',
      description: 'Stroj k dispozícii denne bez riešenia dostupnosti',
    },
    {
      icon: Shield,
      title: 'Bežný servis zahrnutý',
      description: 'Pravidelná údržba a technická podpora v cene',
    },
    {
      icon: TrendingDown,
      title: 'Predvídateľné náklady',
      description: 'Fixné mesačné platby bez výkyvov a prekvapení',
    },
    {
      icon: Check,
      title: 'Technická podpora',
      description: 'Riešime technické problémy, vy sa venujete práci',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Royal Fleet"
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
              Dlhodobý prenájom pre firmy. <span className="text-orange-primary">Fixné náklady, žiadne prekvapenia.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Royal Fleet - program dlhodobého prenájmu techniky s fixnou mesačnou platbou pre firmy po celom Slovensku.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative pb-16 md:py-16 bg-zinc-950 overflow-hidden min-h-screen">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Intro Section */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-12 pt-16 md:pt-0">
              <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
                Dlhodobý prenájom pre firmy. <span className="text-orange-primary">Fixné náklady, žiadne prekvapenia.</span>
              </h1>
              <p className="text-white/70 text-sm md:text-lg max-w-3xl mx-auto mb-4 md:mb-6">
                Royal Fleet je program dlhodobého prenájmu profesionálneho náradia a mechanizácie s fixnou mesačnou platbou.
              </p>
              <p className="text-white/60 text-xs md:text-base max-w-2xl mx-auto">
                Pre stavebné firmy, montážne partie a spoľahlivých podnikateľov po celom Slovensku.
              </p>
            </div>
          </div>

          {/* 3 Models of Cooperation */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                3 modely <span className="text-orange-primary">spolupráce</span>
              </h2>
              <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
                Vyberte si model, ktorý najlepšie vyhovuje vašej firme
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
                >
                  <h3 className="text-orange-primary font-black text-xl md:text-2xl mb-2">{model.title}</h3>
                  <p className="text-white font-bold text-sm md:text-base mb-3">{model.subtitle}</p>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {model.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="text-orange-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/50 text-xs leading-relaxed">
                      <strong className="text-white">Ideálne pre:</strong> {model.bestFor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Example */}
          <div className="mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-orange-primary/30 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 text-center">
                Reálny príklad <span className="text-orange-primary">úspor</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base mb-6 text-center">
                30 kg búracie kladivo | Nákupná cena: 1 000 € | Bežný denný prenájom: 30 € / deň
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Traditional Rental */}
                <div className="bg-zinc-950/50 rounded-xl p-6 border border-white/5">
                  <h3 className="text-white font-bold text-lg mb-4">Bežný denný prenájom</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/60 text-sm">10 dní mesačne × 30 €</p>
                      <p className="text-white text-xl font-bold">300 € / mesiac</p>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-white/60 text-sm">Za 24 mesiacov:</p>
                      <p className="text-red-400 text-2xl font-black">7 200 €</p>
                    </div>
                  </div>
                </div>

                {/* Royal Fleet */}
                <div className="bg-gradient-to-br from-orange-primary/10 to-orange-primary/5 rounded-xl p-6 border-2 border-orange-primary/40">
                  <h3 className="text-orange-primary font-bold text-lg mb-4">ROYAL FLEET - FLEXI RENT</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/60 text-sm">Fixná mesačná platba</p>
                      <p className="text-white text-xl font-bold">109 € / mesiac</p>
                      <p className="text-white/50 text-xs">(bez DPH)</p>
                    </div>
                    <div className="pt-3 border-t border-orange-primary/20">
                      <p className="text-white/60 text-sm">Za 24 mesiacov:</p>
                      <p className="text-orange-primary text-2xl font-black">2 616 €</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-4 text-center">
                <p className="text-white font-bold text-lg md:text-xl">
                  Úspora: <span className="text-orange-primary">4 584 €</span> za 24 mesiacov
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Stroj k dispozícii denne + servis zahrnutý + fixné náklady
                </p>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                Čo je zahrnuté v <span className="text-orange-primary">mesačnej platbe?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {benefits.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-primary/50 transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-4">
                      <IconComponent className="text-orange-primary" size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                Ako Royal Fleet <span className="text-orange-primary">funguje?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {[
                { step: '1', title: 'Vyberiete si stroj', desc: 'Z našej ponuky alebo navrhniete vlastný' },
                { step: '2', title: 'Nastavíme dĺžku', desc: '12 – 24 – 36 mesiacov' },
                { step: '3', title: 'Schválime spoluprácu', desc: 'Individuálne podmienky pre každú firmu' },
                { step: '4', title: 'Fixná mesačná suma', desc: 'Platíte pravidelne bez prekvapení' },
                { step: '5', title: 'Servis a podpora', desc: 'Zabezpečujeme technickú podporu' },
              ].map((item) => (
                <div key={item.step} className="bg-zinc-900 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-primary/20 border-2 border-orange-primary flex items-center justify-center mb-3 mx-auto text-orange-primary font-black text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Who Is It For */}
          <div className="mb-12 md:mb-16">
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 text-center">
                Pre koho je <span className="text-orange-primary">Royal Fleet</span> ideálny?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Firmy, ktoré používajú stroj denne',
                  'Subdodávatelia na dlhodobé projekty',
                  'Spoločnosti s potrebou fixných mesačných nákladov',
                  'Firmy, ktoré nechcú viazať kapitál do nákupu techniky',
                  'Stavebné firmy s pravidelnou potrebou mechanizácie',
                  'Montážne partie po celom Slovensku',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="text-orange-primary flex-shrink-0 mt-1" size={20} />
                    <p className="text-white/80 text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/20 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl font-black text-white mb-4 text-center">
                Podmienky <span className="text-orange-primary">spolupráce</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base mb-4 leading-relaxed text-center">
                Royal Fleet je určený pre aktívne podnikateľské subjekty s históriou a referenciami.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-orange-primary mt-1">•</span>
                  <p className="text-white/60 text-sm">Firmy s históriou a referenciami</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-primary mt-1">•</span>
                  <p className="text-white/60 text-sm">Partneri so spoľahlivou platobnou disciplínou</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-primary mt-1">•</span>
                  <p className="text-white/60 text-sm">Každá spolupráca podlieha individuálnemu schváleniu</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
              Zaujíma vás Royal Fleet?
            </h2>
            <p className="text-white/70 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
              Pripravíme individuálnu ponuku podľa typu stroja, dĺžky spolupráce a rozsahu využitia.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="flex items-center gap-2 text-white/70 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Dostupné po celom Slovensku
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Individuálne podmienky
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm md:text-base">
                <span className="text-orange-primary">✓</span> Servis zahrnutý
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
      </section>
    </div>
  );
}
