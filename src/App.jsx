import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNav from './components/common/MobileNav';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Sluzby from './pages/Sluzby';
import ZemnePrace from './pages/ZemnePrace';
import ServisNaradia from './pages/ServisNaradia';
import DovozTechniky from './pages/DovozTechniky';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
        {/* Main Grid 60x60px - White/Gray */}
        <div className="fixed inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Detail Grid 15x15px - White (technical drawing) */}
        <div className="fixed inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px'
        }}></div>

        {/* Diagonal Lines 45° - Technical look */}
        <div className="fixed inset-0 pointer-events-none z-[1]" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 120px,
            rgba(255,255,255,0.06) 120px,
            rgba(255,255,255,0.06) 121px
          )`
        }}></div>

        {/* Vignette Effect for depth */}
        <div className="fixed inset-0 pointer-events-none z-[2]" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.5) 100%)'
        }}></div>

        {/* Orange corner accents */}
        <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-orange-primary/15 rounded-full blur-[150px] pointer-events-none z-[1]"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-orange-primary/12 rounded-full blur-[120px] pointer-events-none z-[1]"></div>

        <div className="relative z-10">
          <Header />
          <main className="pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sluzby" element={<Sluzby />} />
              <Route path="/sluzby/zemne-prace" element={<ZemnePrace />} />
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
