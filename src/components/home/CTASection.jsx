import { Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-16 bg-zinc-950 overflow-hidden">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Diagonal subtle lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
        }}
      />

      {/* Orange accent glow - top right */}
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

      {/* Orange accent glow - bottom left */}
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

      {/* Center pulsing glow */}
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

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Potrebujete poradiť s výberom?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          Neviete, aké náradie potrebujete na váš projekt? Zavolajte nám a náš tím vám ochotne poradí s výberom tej správnej techniky pre vašu prácu.
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
