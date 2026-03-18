import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, ClipboardList, User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/', label: 'Domov', icon: Home },
  { to: '/catalog', label: 'Katalóg', icon: Package },
  { to: '/rentals', label: 'Moje prenájmy', icon: ClipboardList },
  { to: '/profile', label: 'Profil', icon: User },
];

export default function PortalLayout() {
  const { client, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-royal-500 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Royal Card</h1>
              <p className="text-xs text-gray-400">{client?.company_name || 'Portal'}</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-royal-50 text-royal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleSignOut}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
            title="Odhlásiť sa"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden flex border-t border-gray-100 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium ${
                  isActive ? 'text-royal-600 border-b-2 border-royal-500' : 'text-gray-500'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
