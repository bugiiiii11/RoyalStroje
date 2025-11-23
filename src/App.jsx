import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileNav from './components/common/MobileNav';
import Home from './pages/Home';
import Sluzby from './pages/Sluzby';
import ZemnePrace from './pages/ZemnePrace';
import ServisNaradia from './pages/ServisNaradia';
import DovozTechniky from './pages/DovozTechniky';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white relative overflow-x-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Radial Gradient Accents */}
        <div className="fixed top-0 left-0 w-[700px] h-[700px] bg-orange-primary/8 rounded-full blur-3xl pointer-events-none opacity-60 z-0"></div>
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-orange-primary/6 rounded-full blur-3xl pointer-events-none opacity-50 z-0"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-primary/4 rounded-full blur-3xl pointer-events-none opacity-40 z-0"></div>

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
  );
}

export default App;
