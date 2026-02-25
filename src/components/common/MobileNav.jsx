import { Link, useLocation } from 'react-router-dom';
import { Home, Wrench, Phone } from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Požičovňa' },
    { path: '/sluzby', icon: Wrench, label: 'Služby' },
    { path: '/kontakt', icon: Phone, label: 'Kontakt' },
    // Košík/Objednávka je dočasne skrytá
    // { path: '/kosik', icon: ShoppingCart, label: 'Objednávka' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/98 backdrop-blur-md border-t border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[70px] ${
                isActive ? 'text-orange-primary' : 'text-white/70'
              }`}
            >
              <Icon size={22} strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
