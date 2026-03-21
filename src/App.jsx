import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNav from './components/common/MobileNav';
import HamburgerMenu from './components/common/HamburgerMenu';
import AnimatedBackground from './components/common/AnimatedBackground';
import ScrollToTop from './components/common/ScrollToTop';
import { CartProvider } from './context/CartContext';

// Lazy-loaded pages — each becomes a separate chunk
const Home = lazy(() => import('./pages/Home'));
const Sluzby = lazy(() => import('./pages/Sluzby'));
const PredajTechniky = lazy(() => import('./pages/PredajTechniky'));
const NahradneDiely = lazy(() => import('./pages/NahradneDiely'));
const CenovaPonuka = lazy(() => import('./pages/CenovaPonuka'));
const RoyalFleet = lazy(() => import('./pages/RoyalFleet'));
const SkoLenieObsluhy = lazy(() => import('./pages/SkoLenieObsluhy'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const Kosik = lazy(() => import('./pages/Kosik'));
const Partneri = lazy(() => import('./pages/Partneri'));
const GDPR = lazy(() => import('./pages/GDPR'));
const ObchodnePodmienky = lazy(() => import('./pages/ObchodnePodmienky'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        <div className="relative z-10">
          <Header />
          <HamburgerMenu />
          <main className="pb-20 md:pb-0">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sluzby" element={<Sluzby />} />
                <Route path="/sluzby/predaj-techniky" element={<PredajTechniky />} />
                <Route path="/sluzby/nahradne-diely" element={<NahradneDiely />} />
                <Route path="/sluzby/cenova-ponuka" element={<CenovaPonuka />} />
                <Route path="/sluzby/royal-fleet" element={<RoyalFleet />} />
                <Route path="/sluzby/skolenie-obsluhy" element={<SkoLenieObsluhy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/kosik" element={<Kosik />} />
                <Route path="/partneri" element={<Partneri />} />
                <Route path="/gdpr" element={<GDPR />} />
                <Route path="/obchodne-podmienky" element={<ObchodnePodmienky />} />
                {/* Product Detail Pages - Dynamic Route */}
                <Route path="/:productId" element={<ProductDetail />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <MobileNav />
        </div>
      </div>
      </Router>
    </CartProvider>
    </HelmetProvider>
  );
}

export default App;
