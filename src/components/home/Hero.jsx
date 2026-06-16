import { Phone, ArrowDown } from 'lucide-react';

const stats = [
  { value: '20+', label: 'rokov' },
  { value: '24 h', label: 'dovoz' },
  { value: '24/7', label: 'linka' },
];

export default function Hero() {

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0">
        <img
          src="/stroje2.webp"
          alt="Požičovňa stavebnej techniky Royal Stroje Senec - profesionálne náradie a stroje na prenájom"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
      </div>

      {/* Gradient fade na spodok - prechod do content sekcie */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #181818)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 w-full pb-20 lg:pb-24">
          <div className="relative max-w-xl rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-6 md:p-8 overflow-hidden shadow-2xl shadow-black/40">
            {/* Top orange accent rule */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />

            {/* Eyebrow */}
            <span className="hero-desk-0 eyebrow">Senec · Bratislava · Okolie</span>

            {/* Headline */}
            <h1 className="hero-desk-1 text-3xl md:text-4xl lg:text-[3.25rem] font-black text-white leading-[1.05] mt-4 mb-3 md:mb-4">
              Požičovňa náradia a{' '}
              <span className="bg-gradient-to-r from-orange-primary to-orange-hover bg-clip-text text-transparent">
                stavebnej techniky v Senci.
              </span>
            </h1>

            {/* Description */}
            <div className="hero-desk-2">
              <p className="text-sm md:text-lg text-white/85 leading-relaxed mb-2">
                Obsluhujeme Bratislavu a okolie s dovozom na stavbu.
              </p>
              <p className="text-sm md:text-base text-orange-primary font-bold leading-relaxed mb-5 md:mb-6">
                Po-Pia 7-16 • Nonstop linka +421 948 555 551
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-desk-3 flex flex-col sm:flex-row gap-2.5 md:gap-3">
              <a href="tel:+421948555551" className="btn-primary">
                <Phone size={16} />
                <span>Zavolať teraz</span>
              </a>
              <a href="#katalog" className="btn-secondary">
                <span>Zobraziť katalóg</span>
                <ArrowDown size={16} className="text-orange-primary" />
              </a>
            </div>

            {/* Stat strip */}
            <div className="hero-desk-4 mt-6 pt-5 border-t border-white/10 flex items-center gap-4 md:gap-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-baseline gap-1.5 ${i > 0 ? 'pl-4 md:pl-6 border-l border-white/10' : ''}`}
                >
                  <span className="font-display text-xl md:text-2xl font-black text-white leading-none">{s.value}</span>
                  <span className="text-[0.65rem] md:text-xs uppercase tracking-wider text-white/55">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .hero-desk-0 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.05s; }
            .hero-desk-1 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.15s; }
            .hero-desk-2 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.30s; }
            .hero-desk-3 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.45s; }
            .hero-desk-4 { animation: heroDeskFadeUp 0.7s ease both; animation-delay: 0.58s; }

            @keyframes heroDeskFadeUp {
              from { opacity: 0; transform: translateY(32px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
