import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNav from './components/common/MobileNav';
import AnimatedBackground from './components/common/AnimatedBackground';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Sluzby from './pages/Sluzby';
import PredajTechniky from './pages/PredajTechniky';
import ServisNaradia from './pages/ServisNaradia';
import DovozTechniky from './pages/DovozTechniky';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        <div className="relative z-10">
          <Header />
          <main className="pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sluzby" element={<Sluzby />} />
              <Route path="/sluzby/predaj-techniky" element={<PredajTechniky />} />
              <Route path="/sluzby/servis-naradia" element={<ServisNaradia />} />
              <Route path="/sluzby/dovoz-techniky" element={<DovozTechniky />} />
              <Route path="/kontakt" element={<Kontakt />} />
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
