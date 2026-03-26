import { Phone, ArrowDown } from 'lucide-react';

export default function MobileHero() {
  return (
    <section className="relative min-h-[88svh] bg-black overflow-hidden flex flex-col md:hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/pictures/graphics/hero_main.webp"
          alt="Royal Stroje - požičovňa stavebnej techniky Senec"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.97) 100%)'
      }} />
      {/* Side vignette */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)'
      }} />

      {/* Orange accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/80 to-transparent z-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-5 pb-8 pt-16">

        {/* Headline */}
        <h1 className="hero-anim-1 text-[2.1rem] leading-[1.1] font-black text-white mb-4">
          Požičovňa náradia<br />
          a{' '}
          <span className="text-orange-primary">stavebnej<br />techniky</span>{' '}
          v Senci.
        </h1>

        {/* Subline */}
        <p className="hero-anim-2 text-white/80 text-sm leading-relaxed mb-7">
          Bratislava, Senec a okolie. Dovoz na stavbu.
          <br />
          <span className="text-orange-primary font-semibold">Po–Pia 7–16 &nbsp;·&nbsp; Nonstop +421 948 555 551</span>
        </p>

        {/* CTA Buttons */}
        <div className="hero-anim-3 flex gap-3">
          <a
            href="tel:+421948555551"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm rounded-2xl shadow-xl shadow-orange-primary/40 active:scale-95 transition-transform"
          >
            <Phone size={16} />
            Zavolať teraz
          </a>
          <a
            href="#katalog"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-zinc-900/80 border border-orange-primary/30 backdrop-blur-sm text-white font-bold text-sm rounded-2xl active:scale-95 transition-transform"
          >
            Katalóg
            <ArrowDown size={16} className="text-orange-primary" />
          </a>
        </div>
      </div>

      {/* Scroll bounce indicator */}
      <div className="hero-anim-6 absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-orange-primary rounded-full hero-scroll-dot" />
        </div>
      </div>

      <style>{`
        .hero-anim-1 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.20s; }
        .hero-anim-2 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.40s; }
        .hero-anim-3 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.58s; }
        .hero-anim-6 { animation: heroFadeIn 0.8s ease both; animation-delay: 1.0s; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hero-scroll-dot {
          animation: heroBounce 1.6s ease-in-out infinite;
        }
        @keyframes heroBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
