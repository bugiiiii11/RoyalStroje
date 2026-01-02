import { Link } from 'react-router-dom';
import { Wrench, Truck, Settings } from 'lucide-react';

export default function Sluzby() {
  const services = [
    {
      id: 'zemne-prace',
      path: '/sluzby/zemne-prace',
      icon: Wrench,
      title: 'Zemné a búracie práce',
      description: 'Výkopy základov, prípojky inžinierskych sietí, búracie práce s hydraulickým kladivom, terénne úpravy a odvoz odpadu.',
      features: ['Výkopy a základy', 'Inžinierske siete', 'Búracie práce', 'Terénne úpravy'],
    },
    {
      id: 'servis-naradia',
      path: '/sluzby/servis-naradia',
      icon: Settings,
      title: 'Servis náradia',
      description: 'Profesionálny servis a údržba stavebného náradia a techniky. Opravy, kontroly a náhradné diely.',
      features: ['Opravy strojov', 'Preventívna údržba', 'Náhradné diely', 'Expresný servis'],
    },
    {
      id: 'dovoz-techniky',
      path: '/sluzby/dovoz-techniky',
      icon: Truck,
      title: 'Dovoz techniky',
      description: 'Rýchla a spoľahlivá doprava náradia a techniky priamo na vašu stavbu. Dovoz do 24 hodín.',
      features: ['Dovoz na stavbu', 'Odvoz po skončení', 'Non-stop dostupnosť', 'Celé Slovensko'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[33vh] min-h-[300px] flex items-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Služby"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Naše služby
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Komplexné služby pre vašu stavbu – od požičovne náradia cez zemné práce až po servis a dopravu.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Čo pre vás <span className="text-orange-primary">môžeme urobiť</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Profesionálne služby pre stavebné firmy, remeselníkov aj súkromné osoby
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-6 group-hover:bg-orange-primary/20 transition">
                    <IconComponent className="text-orange-primary" size={32} />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-orange-primary transition">
                    {service.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                        <span className="text-orange-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-orange-primary font-bold group-hover:gap-3 transition-all">
                    <span>Viac informácií</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Potrebujete poradiť?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
          </p>
          <a
            href="tel:+421948555551"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
          >
            <span>Zavolať teraz: 0948 555 551</span>
          </a>
        </div>
      </section>
    </div>
  );
}
