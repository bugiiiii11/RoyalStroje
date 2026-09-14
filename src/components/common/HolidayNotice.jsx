import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CalendarOff } from 'lucide-react';

// Temporary operating notice. To retire it, drop <HolidayNotice /> from App.jsx
// -- but it also switches itself off on its own: nothing renders once HIDE_AFTER
// has passed, so a forgotten notice can never go stale on the live site.
//
// Dismissal is deliberately NOT persisted (owner's call): closing it only hides
// it for the current page load, and a refresh brings it back. A one-day closure
// is worth re-stating to a returning visitor. Client-side route changes keep it
// closed, since this component lives outside <Routes> and never remounts.
const HIDE_AFTER = new Date('2026-09-16T00:00:00');

export default function HolidayNotice() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (Date.now() >= HIDE_AFTER.getTime()) return;

    // Held back from the first paint on purpose: the prerender snapshot is
    // taken shortly after render, so the notice stays out of the static HTML
    // that crawlers read (see also the strip rule in scripts/prerender.mjs).
    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setAnimateIn(true));
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div
      data-transient-notice
      role="status"
      aria-live="polite"
      aria-label="Prevádzkový oznam"
      className={`fixed z-[55] transition-all duration-500 ease-out
        top-16 left-3 right-3
        md:top-24 md:left-auto md:right-0 md:w-[360px]
        ${animateIn
          ? 'translate-y-0 md:translate-x-0 opacity-100'
          : '-translate-y-6 md:translate-y-0 md:translate-x-full opacity-0'}`}
    >
      {/* Solid background on purpose -- no backdrop-filter on fixed elements,
          it renders as GPU garbage on the Android devices our visitors use. */}
      <div
        className="relative bg-zinc-950 border border-orange-primary/40 rounded-2xl md:rounded-r-none md:rounded-l-2xl overflow-hidden"
        style={{ boxShadow: '0 0 0 1px rgba(255,102,0,0.25), 0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,102,0,0.08)' }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-primary/60 via-orange-primary to-orange-primary/60"></div>

        {/* Left accent bar */}
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-primary via-orange-primary/70 to-orange-primary/20"></div>

        <button
          onClick={close}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-orange-primary hover:text-white hover:bg-orange-primary rounded-lg border border-orange-primary/40 hover:border-orange-primary transition-all z-10"
          aria-label="Zavrieť oznam"
        >
          <X size={14} />
        </button>

        <div className="p-5 pr-14 md:p-6 md:pr-12">
          <div className="inline-flex items-center gap-1.5 bg-orange-primary/10 border border-orange-primary/20 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 bg-orange-primary rounded-full animate-pulse"></span>
            <span className="text-orange-primary text-xs font-semibold uppercase tracking-wider">Prevádzkový oznam</span>
          </div>

          <h3 className="flex items-start gap-2 text-white font-black text-lg md:text-xl leading-tight mb-2">
            <CalendarOff size={20} className="text-orange-primary shrink-0 mt-0.5" />
            <span>V utorok 15. 9. máme zatvorené</span>
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            V utorok 15. septembra 2026 je štátny sviatok a naša prevádzka bude celý deň zatvorená.
            V stredu 16. septembra sme vám opäť k dispozícii v bežných otváracích hodinách
            <span className="text-white font-semibold"> Po – Pi, 7:00 – 16:00</span>. Ďakujeme za pochopenie.
          </p>

          <Link
            to="/kontakt"
            onClick={close}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold py-2.5 px-5 rounded-lg hover:shadow-lg hover:shadow-orange-primary/25 transition-all duration-300"
          >
            Kontaktujte nás
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Decorative glow -- desktop only, blur filters are the mobile GPU trap */}
        <div className="hidden md:block absolute -bottom-20 -right-20 w-40 h-40 bg-orange-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
