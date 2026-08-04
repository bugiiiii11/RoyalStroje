import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie } from 'lucide-react';
import { enableAnalytics, disableAnalytics, CONSENT_KEY } from '../../lib/analytics';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      // Only 'accepted' / 'rejected' are real decisions. Anything else --
      // including the legacy ISO-timestamp value the old "OK, got it" banner
      // used to store -- means the visitor was never actually asked about
      // analytics, so re-prompt once.
      if (stored === 'accepted' || stored === 'rejected') return;
    } catch {
      // localStorage blocked – still show banner this session
    }

    setVisible(true);
    const t = setTimeout(() => setAnimateIn(true), 800);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 400);
  };

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // ignore
    }
    enableAnalytics();
    close();
  };

  const reject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'rejected');
    } catch {
      // ignore
    }
    disableAnalytics();
    close();
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Oznámenie o cookies"
      className={`fixed left-0 right-0 bottom-20 md:bottom-0 z-[60] transition-transform duration-500 ease-out ${
        animateIn ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-zinc-950/95 md:backdrop-blur-md border-t border-orange-primary/40 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-3 md:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
            <Cookie size={20} className="text-orange-primary flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              Používame <span className="text-white font-semibold">nevyhnutné cookies</span> na fungovanie webu (ochrana proti botom a chatbot). So súhlasom aj Google Analytics na meranie návštevnosti.{' '}
              <Link
                to="/cookies"
                className="text-orange-primary hover:text-orange-hover underline underline-offset-2 font-semibold whitespace-nowrap"
              >
                Viac info
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 self-stretch md:self-auto">
            <button
              onClick={reject}
              className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-bold rounded-full transition-colors whitespace-nowrap"
            >
              Odmietnuť
            </button>
            <button
              onClick={accept}
              className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 bg-orange-primary hover:bg-orange-hover text-white text-xs md:text-sm font-bold rounded-full transition-colors whitespace-nowrap"
            >
              Prijať
            </button>
            <button
              onClick={reject}
              aria-label="Zatvoriť oznámenie (rovnocenné s odmietnutím)"
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
