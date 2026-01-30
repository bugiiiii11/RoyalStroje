import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Settings } from 'lucide-react';

export default function Sluzby() {
  const services = [
    {
      id: 'predaj-techniky',
      path: '/sluzby/predaj-techniky',
      icon: ShoppingCart,
      title: 'Predaj náradia',
      description: 'Kvalitné náradie, mechanizácia a príslušenstvo značkových výrobcov priamo na sklade v Senci.',
      features: ['Overené značky', 'Férové ceny', 'Tovar skladom', 'Expresné dodanie'],
      backgroundImage: '/pictures/graphics/predaj.png',
    },
    {
      id: 'servis-naradia',
      path: '/sluzby/servis-naradia',
      icon: Settings,
      title: 'Servis náradia',
      description: 'Profesionálny servis a údržba stavebného náradia a techniky. Opravy, kontroly a náhradné diely.',
      features: ['Opravy strojov', 'Preventívna údržba', 'Náhradné diely', 'Expresný servis'],
      backgroundImage: '/pictures/graphics/servis.png',
    },
    {
      id: 'dovoz-techniky',
      path: '/sluzby/dovoz-techniky',
      icon: Truck,
      title: 'Dovoz techniky',
      description: 'Rýchly a spoľahlivý dovoz náradia a techniky priamo na vašu stavbu. Dovoz do 24 hodín.',
      features: ['Dovoz na stavbu', 'Odvoz po skončení', 'Non-stop dostupnosť', 'Celé Slovensko'],
      backgroundImage: '/pictures/graphics/dovoz.png',
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
            alt="Royal Stroje - Služby"
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
              Naše služby
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Komplexné služby pre vašu stavbu – od požičovne náradia cez zemné práce až po servis a dopravu.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-16 bg-zinc-950 overflow-hidden">
        {/* Radial gradient overlay - wider spread */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Diagonal subtle lines for technical feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
          }}
        />

        {/* Orange accent glow - top right (animated) - FAST visible test */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '10%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.6) 0%, rgba(255,102,0,0.2) 40%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.15,
            animation: 'floatGlow1 8s ease-in-out infinite'
          }}
        />

        {/* Orange accent glow - bottom left (animated) - FAST visible test */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            bottom: '10%',
            left: '10%',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.5) 0%, rgba(255,102,0,0.15) 40%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0.12,
            animation: 'floatGlow2 10s ease-in-out infinite'
          }}
        />

        {/* Center pulsing glow - FAST visible test */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none z-0"
          style={{
            width: '800px',
            height: '800px',
            marginLeft: '-400px',
            marginTop: '-400px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.4) 0%, rgba(255,102,0,0.1) 50%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'pulseGlow 6s ease-in-out infinite'
          }}
        />

        {/* Animation keyframes - defined AFTER elements with explicit animations */}
        <style>{`
          @keyframes floatGlow1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(-120px, 100px) scale(1.2);
            }
            50% {
              transform: translate(80px, -120px) scale(0.85);
            }
            75% {
              transform: translate(100px, 60px) scale(1.1);
            }
          }

          @keyframes floatGlow2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(140px, -100px) scale(1.25);
            }
            66% {
              transform: translate(-100px, 120px) scale(0.8);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.08;
            }
            50% {
              transform: scale(1.4);
              opacity: 0.18;
            }
          }
        `}</style>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Services section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Čo pre vás <span className="text-orange-primary">môžeme urobiť</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Profesionálne služby pre stavebné firmy, remeselníkov aj súkromné osoby
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-orange-primary/50 transition-all group overflow-hidden"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.backgroundImage}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 brightness-110 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/50"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mb-6 group-hover:bg-orange-primary/20 transition">
                      <IconComponent className="text-orange-primary" size={40} />
                    </div>

                    <h3 className="text-3xl font-black text-white mb-3 group-hover:text-orange-primary transition">
                      {service.title}
                    </h3>

                    <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base text-white/60">
                          <span className="text-orange-primary mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="inline-flex items-center gap-2 text-orange-primary text-base font-bold group-hover:gap-3 transition-all">
                      <span>Viac informácií</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Section - Integrated */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Potrebujete poradiť?
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
            </p>
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
            >
              <span>Zavolať teraz: 0948 555 551</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
