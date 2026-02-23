import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileText, Users, Shield, Lock } from 'lucide-react';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/blog', icon: FileText, label: 'Blog' },
    { path: '/partneri', icon: Users, label: 'Partneri' },
    { path: '/obchodne-podmienky', icon: Shield, label: 'Všeobecné podmienky' },
    { path: '/gdpr', icon: Lock, label: 'GDPR' },
  ];

  return (
    <>
      {/* Hamburger Button - Mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-2 right-2 z-50 w-10 h-10 flex items-center justify-center bg-zinc-900/90 backdrop-blur-md border border-white/20 rounded-lg hover:bg-zinc-800 hover:border-orange-primary/50 transition-all"
        aria-label="Open menu"
      >
        <Menu className="text-white" size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-zinc-950 border-l border-white/10 z-[70] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-black text-lg">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-white/20 rounded-lg hover:bg-zinc-800 hover:border-orange-primary/50 transition-all"
            aria-label="Close menu"
          >
            <X className="text-white" size={18} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-white/10 rounded-xl hover:border-orange-primary/50 hover:bg-zinc-800 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center group-hover:bg-orange-primary/20 transition-all">
                      <Icon className="text-orange-primary" size={18} />
                    </div>
                    <span className="text-white font-bold text-sm group-hover:text-orange-primary transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-white/50 text-xs">
              © 2026 Royal stroje, s.r.o.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
