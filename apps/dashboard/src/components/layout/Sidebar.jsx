import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Users,
  Calendar,
  FileText,
  BarChart3,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Nový obchod', to: '/deals/new', icon: PlusCircle },
  { name: 'Katalóg', to: '/equipment', icon: Package },
  { name: 'Klienti', to: '/clients', icon: Users },
  { name: 'Kalendár', to: '/calendar', icon: Calendar },
  { name: 'Faktúry', to: '/invoices', icon: FileText },
  { name: 'Reporty', to: '/reports', icon: BarChart3 },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-royal-500 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">RS</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold">Royal Stroje</h1>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-800 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-royal-500/20 text-royal-400'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
