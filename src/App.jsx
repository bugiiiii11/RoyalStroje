import { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNav from './components/common/MobileNav';
import HamburgerMenu from './components/common/HamburgerMenu';
import AnimatedBackground from './components/common/AnimatedBackground';
import ScrollToTop from './components/common/ScrollToTop';
import CookieBanner from './components/common/CookieBanner';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Sluzby from './pages/Sluzby';
import PredajTechniky from './pages/PredajTechniky';
import NahradneDiely from './pages/NahradneDiely';
import CenovaPonuka from './pages/CenovaPonuka';
import ZabezpecenieTechniky from './pages/ZabezpecenieTechniky';
import SkoLenieObsluhy from './pages/SkoLenieObsluhy';
import DovozTechniky from './pages/DovozTechniky';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Kontakt from './pages/Kontakt';
import Kosik from './pages/Kosik';
import Partneri from './pages/Partneri';
import GDPR from './pages/GDPR';
import Cookies from './pages/Cookies';
import ObchodnePodmienky from './pages/ObchodnePodmienky';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

const CHATBOT_ID = 'b1637181-da22-4ae2-b79e-11c10b967b4f';

/**
 * Prerendered pages boot with html[data-prerendered]: the inline script in
 * index.html skips js-reveal (content stays visible while React replaces the
 * prerendered DOM — no blink) and HeroSplit suppresses its entrance animations.
 * After the FIRST client-side navigation the new page mounts fresh, so we lift
 * the attribute and restore js-reveal — scroll reveals + hero animations then
 * behave exactly like the plain SPA. useLayoutEffect = before paint, so the
 * new page's reveal content never shows for a frame before hiding.
 */
function RestoreRevealsAfterNav() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const html = document.documentElement;
    if (!html.hasAttribute('data-prerendered')) return;
    html.removeAttribute('data-prerendered');
    if ('IntersectionObserver' in window) html.classList.add('js-reveal');
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    const loadChatbot = () => {
      if (document.querySelector('script[data-chatbot-id]')) return;
      const script = document.createElement('script');
      script.src = 'https://www.mdntech.org/widget.js';
      script.setAttribute('data-chatbot-id', CHATBOT_ID);
      script.async = true;
      document.body.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(loadChatbot, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(loadChatbot, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <HelmetProvider>
      {/* Site-wide meta defaults — page-level <Helmet> instances override
          matching tags (react-helmet-async dedupes by name/property). */}
      <Helmet>
        <meta property="og:site_name" content="Royal Stroje" />
        <meta property="og:locale" content="sk_SK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://royalstroje.sk/hero-main1.webp" />
      </Helmet>
      <CartProvider>
        <Router>
        <ScrollToTop />
        <RestoreRevealsAfterNav />
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
        {/* Animated Background - desktop only. On mobile the fixed full-viewport
            layers force the page-tall content (relative z-10) to be composited so
            it can stack above them; that single layer exceeds the budget Android
            GPU's max texture size (~8192px) and renders as garbage bands further
            down the page (around the FAQ). The effects are near-invisible anyway. */}
        <div className="hidden lg:block">
          <AnimatedBackground />
        </div>

        <div className="relative z-10">
          <Header />
          <HamburgerMenu />
          <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sluzby" element={<Sluzby />} />
                <Route path="/sluzby/predaj-techniky" element={<PredajTechniky />} />
                <Route path="/sluzby/nahradne-diely" element={<NahradneDiely />} />
                <Route path="/sluzby/dovoz-techniky" element={<DovozTechniky />} />
                <Route path="/sluzby/cenova-ponuka" element={<CenovaPonuka />} />
                <Route path="/sluzby/zabezpecenie-techniky" element={<ZabezpecenieTechniky />} />
                <Route path="/sluzby/skolenie-obsluhy" element={<SkoLenieObsluhy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/kosik" element={<Kosik />} />
                <Route path="/partneri" element={<Partneri />} />
                <Route path="/gdpr" element={<GDPR />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/obchodne-podmienky" element={<ObchodnePodmienky />} />
                {/* Product Detail Pages - Dynamic Route */}
                <Route path="/:productId" element={<ProductDetail />} />
                {/* Unknown multi-segment URLs → 404 view with noindex */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
          <Footer />
          <MobileNav />
          <CookieBanner />
        </div>
      </div>
      </Router>
    </CartProvider>
    </HelmetProvider>
  );
}

export default App;
