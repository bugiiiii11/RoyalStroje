import { Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-16 overflow-visible">
      {/* Dark gradient background with depth */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, #0c0c0f 0%, #131318 30%, #18181d 50%, #131318 70%, #0c0c0f 100%)'
        }}
      />

      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Soft ambient light from top */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,102,0,0.15) 0%, transparent 60%)'
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Orange accent glow - center */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none z-0"
        style={{
          width: '900px',
          height: '500px',
          marginLeft: '-450px',
          marginTop: '-250px',
          background: 'radial-gradient(ellipse, rgba(255,102,0,0.2) 0%, rgba(255,102,0,0.05) 40%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'pulseGlow 8s ease-in-out infinite'
        }}
      />

      {/* Animation keyframes for floating objects */}
      <style>{`
        @keyframes floatObjectLeft {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(0.5deg); }
          50% { transform: translateY(-25px) rotate(-0.5deg); }
          75% { transform: translateY(-10px) rotate(0.3deg); }
        }
        @keyframes floatObjectRight {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(-0.3deg); }
          50% { transform: translateY(-20px) rotate(0.4deg); }
          75% { transform: translateY(-8px) rotate(-0.2deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>

      {/* 3D Object - Left Side - Extends into footer (20% smaller) */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-[1]">
        <div
          className="absolute top-[10%] left-[1%] w-[19rem] md:w-[19rem] lg:w-[24rem] opacity-100"
          style={{ animation: 'floatObjectLeft 16s ease-in-out infinite' }}
        >
          <img
            src="/pictures/graphics/objects5.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* 3D Object - Right Side - Extends into footer */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-[1]">
        <div
          className="absolute top-[10%] right-[1%] w-[19rem] md:w-[19rem] lg:w-[24rem] opacity-100"
          style={{ animation: 'floatObjectRight 18s ease-in-out infinite' }}
        >
          <img
            src="/pictures/graphics/objects1.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Potrebujete poradiť s výberom?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          Neviete, aké náradie potrebujete pre vašu prácu? Zavolajte nám a náš tím vám ochotne poradí s výberom tej správnej techniky.
        </p>
        <a
          href="tel:+421948555551"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
        >
          <Phone size={20} />
          <span>Zavolať teraz: 0948 555 551</span>
        </a>
      </div>
    </section>
  );
}
