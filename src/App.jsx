import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNav from './components/common/MobileNav';
import HamburgerMenu from './components/common/HamburgerMenu';
import AnimatedBackground from './components/common/AnimatedBackground';
import ScrollToTop from './components/common/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Sluzby from './pages/Sluzby';
import PredajTechniky from './pages/PredajTechniky';
import NahradneDiely from './pages/NahradneDiely';
import CenovaPonuka from './pages/CenovaPonuka';
import RoyalFleet from './pages/RoyalFleet';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Kontakt from './pages/Kontakt';
import Kosik from './pages/Kosik';
import Partneri from './pages/Partneri';
import GDPR from './pages/GDPR';
import ObchodnePodmienky from './pages/ObchodnePodmienky';

function App() {
  return (
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sluzby" element={<Sluzby />} />
              <Route path="/sluzby/predaj-techniky" element={<PredajTechniky />} />
              <Route path="/sluzby/nahradne-diely" element={<NahradneDiely />} />
              <Route path="/sluzby/cenova-ponuka" element={<CenovaPonuka />} />
              <Route path="/sluzby/royal-fleet" element={<RoyalFleet />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/kosik" element={<Kosik />} />
              <Route path="/partneri" element={<Partneri />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/obchodne-podmienky" element={<ObchodnePodmienky />} />
            </Routes>
          </main>
          <Footer />
          <MobileNav />
        </div>
      </div>
      </Router>
    </CartProvider>
  );
}

export default App;
