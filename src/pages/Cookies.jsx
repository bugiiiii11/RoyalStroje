import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, CheckCircle } from 'lucide-react';
import ContentSection from '../components/common/ContentSection';

const COOKIE_ROWS = [
  {
    name: '_GRECAPTCHA',
    type: 'Cookie tretej strany',
    purpose: 'Ochrana kontaktných formulárov pred botmi (Google reCAPTCHA v3)',
    duration: '6 mesiacov',
    provider: 'Google LLC',
  },
  {
    name: 'royalstroje_cart',
    type: 'localStorage',
    purpose: 'Pamätanie obsahu košíka medzi návštevami',
    duration: 'Trvalé (kým ho nevymažete)',
    provider: 'Royal Stroje s.r.o.',
  },
  {
    name: 'formSubmissions',
    type: 'localStorage',
    purpose: 'Obmedzenie počtu odoslaných formulárov (max. 3 / hodinu)',
    duration: '1 hodina',
    provider: 'Royal Stroje s.r.o.',
  },
  {
    name: 'royalstroje_cookie_consent',
    type: 'localStorage',
    purpose: 'Pamätanie zatvorenia oznámenia o cookies',
    duration: '12 mesiacov',
    provider: 'Royal Stroje s.r.o.',
  },
  {
    name: 'MDN Tech chatbot',
    type: 'Funkčný skript tretej strany',
    purpose: 'Zobrazenie chatbota a uloženie konverzácie. Neukladá osobné identifikátory návštevníkov.',
    duration: 'Iba počas návštevy',
    provider: 'M.D.N Tech',
  },
];

const CONSENT_KEY = 'royalstroje_cookie_consent';

export default function Cookies() {
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
      setResetDone(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Súbory cookies | Royal Stroje</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://royalstroje.sk/cookies" />
      </Helmet>

      <ContentSection>
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img src="/logoroyal.webp" alt="Royal Stroje" className="h-8 w-auto" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-6 md:mb-12 pt-16 md:pt-0">
            <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
              <span className="text-orange-primary">Súbory</span> cookies
            </h1>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
              Informácie o tom, aké cookies a podobné technológie používame na royalstroje.sk.
            </p>
          </div>

          {/* Intro */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-lg md:text-2xl font-black text-white mb-3 md:mb-4">
              <span className="text-orange-primary">Stručne</span>
            </h2>
            <div className="space-y-2 md:space-y-3 text-white/80 text-xs md:text-base leading-relaxed">
              <p>
                Na royalstroje.sk používame <strong className="text-white">iba nevyhnutné cookies a technológie</strong>, bez ktorých by web nemohol správne fungovať.
              </p>
              <p>
                <strong className="text-white">Nepoužívame</strong> žiadne analytické nástroje (napr. Google Analytics), reklamné cookies (napr. Meta Pixel) ani profilovanie návštevníkov.
              </p>
              <p>
                Súhlas s nevyhnutnými cookies sa udeľuje implicitne pri používaní webu (čl. 6 ods. 1 písm. f) GDPR – oprávnený záujem na zabezpečení funkčnosti webu).
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8 hover:border-orange-primary/30 transition-all">
            <h2 className="text-lg md:text-2xl font-black text-white mb-3 md:mb-6">
              Zoznam používaných cookies a technológií
            </h2>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-2 text-orange-primary font-bold">Názov</th>
                    <th className="text-left py-3 px-2 text-orange-primary font-bold">Typ</th>
                    <th className="text-left py-3 px-2 text-orange-primary font-bold">Účel</th>
                    <th className="text-left py-3 px-2 text-orange-primary font-bold">Doba</th>
                    <th className="text-left py-3 px-2 text-orange-primary font-bold">Poskytovateľ</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  {COOKIE_ROWS.map((row) => (
                    <tr key={row.name} className="border-b border-white/10">
                      <td className="py-3 px-2 font-mono text-white whitespace-nowrap">{row.name}</td>
                      <td className="py-3 px-2 whitespace-nowrap">{row.type}</td>
                      <td className="py-3 px-2">{row.purpose}</td>
                      <td className="py-3 px-2 whitespace-nowrap">{row.duration}</td>
                      <td className="py-3 px-2 whitespace-nowrap">{row.provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: card list */}
            <div className="md:hidden space-y-3">
              {COOKIE_ROWS.map((row) => (
                <div
                  key={row.name}
                  className="bg-zinc-950/60 border border-white/10 rounded-xl p-3"
                >
                  <div className="font-mono text-white text-xs font-bold break-all mb-2">
                    {row.name}
                  </div>
                  <dl className="space-y-1.5 text-[11px]">
                    <div className="flex gap-2">
                      <dt className="text-orange-primary font-bold w-24 flex-shrink-0">Typ</dt>
                      <dd className="text-white/80">{row.type}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-orange-primary font-bold w-24 flex-shrink-0">Účel</dt>
                      <dd className="text-white/80 leading-snug">{row.purpose}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-orange-primary font-bold w-24 flex-shrink-0">Doba</dt>
                      <dd className="text-white/80">{row.duration}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-orange-primary font-bold w-24 flex-shrink-0">Poskytovateľ</dt>
                      <dd className="text-white/80">{row.provider}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <p className="text-white/60 text-xs md:text-sm mt-4 italic">
              Zoznam môže byť aktualizovaný v prípade zmeny technického riešenia webu. Akákoľvek zmena bude reflektovaná na tejto stránke.
            </p>
          </div>

          {/* How to manage */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8 hover:border-orange-primary/30 transition-all">
            <h2 className="text-lg md:text-2xl font-black text-white mb-3 md:mb-4">
              Ako spravovať cookies
            </h2>
            <div className="space-y-2 md:space-y-3 text-white/80 text-xs md:text-base leading-relaxed">
              <p>
                Keďže používame iba nevyhnutné cookies, ich vypnutie môže ovplyvniť funkčnosť webu (napr. odoslanie formulára cez ochranu reCAPTCHA).
              </p>
              <p>
                Cookies a údaje v <span className="font-mono text-white">localStorage</span> môžete kedykoľvek odstrániť priamo v nastaveniach svojho prehliadača (sekcia „Súkromie a bezpečnosť“ → „Vymazať údaje prehliadania“).
              </p>
              <p>
                Ak chcete <strong className="text-white">znova zobraziť oznámenie o cookies</strong>, ktoré ste predtým zatvorili, kliknite na tlačidlo nižšie:
              </p>
            </div>

            <div className="mt-5 md:mt-6">
              {resetDone ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-green-600/20 border border-green-500/40 text-green-400 font-bold rounded-full text-sm">
                  <CheckCircle size={18} />
                  Hotovo – presmerovávame na úvod...
                </div>
              ) : (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-orange-primary hover:bg-orange-hover text-white text-sm md:text-base font-bold rounded-full transition-colors"
                >
                  <RotateCcw size={18} />
                  Znova zobraziť oznámenie
                </button>
              )}
            </div>
          </div>

          {/* Related */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-lg md:text-2xl font-black text-white mb-3 md:mb-4">
              Súvisiace dokumenty
            </h2>
            <div className="text-white/80 text-xs md:text-base leading-relaxed">
              <p className="mb-2">
                Podrobné informácie o spracúvaní osobných údajov nájdete v dokumente{' '}
                <Link to="/gdpr" className="text-orange-primary hover:text-orange-hover underline underline-offset-2 font-semibold">
                  Ochrana osobných údajov (GDPR)
                </Link>
                .
              </p>
              <p>
                Otázky ohľadom cookies posielajte na{' '}
                <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:text-orange-hover underline underline-offset-2 font-semibold">
                  info@royalstroje.sk
                </a>
                .
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
            <p className="text-white/50 text-xs md:text-sm">
              ROYAL STROJE s.r.o. | Platné od 04.05.2026 | www.royalstroje.sk
            </p>
            <p className="text-white/40 text-[10px] md:text-xs mt-2">
              Recká cesta 182, 925 26 Boldog – Senec | IČO: 57 405 425 | info@royalstroje.sk
            </p>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
