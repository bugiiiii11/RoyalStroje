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
  TrendingUp,
  ShoppingCart,
  Clock,
  AlertTriangle,
  Wrench,
  Euro,
  ExternalLink,
} from 'lucide-react';
import useDashboardStats from '../../hooks/useDashboardStats';
import { formatPrice } from '../../lib/constants';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Katalóg', to: '/equipment', icon: Package },
  { name: 'Klienti', to: '/clients', icon: Users },
  { name: 'Kalendár', to: '/calendar', icon: Calendar },
  { name: 'Faktúry', to: '/invoices', icon: FileText },
  { name: 'Reporty', to: '/reports', icon: BarChart3 },
];

function MiniStat({ icon: Icon, label, value, loading, accent }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ? 'bg-red-50' : 'bg-white/60'}`}>
        <Icon className={`w-3.5 h-3.5 ${accent ? 'text-red-500' : 'text-royal-500'}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold leading-tight ${accent ? 'text-red-600' : 'text-gray-800'}`}>
          {loading ? '—' : value}
        </p>
        <p className="text-[10px] text-gray-400 leading-tight">{label}</p>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose }) {
  const { stats, loading } = useDashboardStats();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px]
          bg-gradient-to-b from-gray-50 via-gray-50/95 to-orange-50/40
          flex flex-col
          transform transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          sidebar-border
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand header with real logo */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/znak.webp" alt="Royal Stroje" className="w-9 h-9 object-contain" />
              <div>
                <h1 className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight">
                  ROYAL <span className="text-royal-500">STROJE</span>
                </h1>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  Dashboard
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-gray-200/60 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* New deal CTA */}
        <div className="px-4 pb-3">
          <NavLink
            to="/deals/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold py-2.5 rounded-xl shadow-glow hover:shadow-glow-md transition-all btn-press"
          >
            <PlusCircle className="w-4 h-4" />
            Nový obchod
          </NavLink>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-gray-200/80 via-gray-200 to-gray-200/80" />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          <p className="px-3 pb-1.5 pt-1 text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
            Menu
          </p>
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-royal-600 shadow-sm ring-1 ring-gray-200/60'
                    : 'text-gray-500 hover:bg-white/60 hover:text-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'bg-royal-500 text-white shadow-glow'
                        : 'bg-gray-200/60 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-royal-500 animate-pulse-slow" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Expanded stats panel */}
        <div className="mx-4 mb-2 p-3.5 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/60 shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
            Prehľad
          </p>
          <div className="space-y-2.5">
            <MiniStat
              icon={ShoppingCart}
              label="Aktívne prenájmy"
              value={stats.activeRentals}
              loading={loading}
            />
            <MiniStat
              icon={Euro}
              label="Obrat tento mesiac"
              value={formatPrice(stats.monthRevenue)}
              loading={loading}
            />
            <MiniStat
              icon={Users}
              label="Klienti"
              value={stats.totalClients}
              loading={loading}
            />
            <MiniStat
              icon={Wrench}
              label="Zariadenia"
              value={stats.totalEquipment}
              loading={loading}
            />
            <MiniStat
              icon={Clock}
              label="Dnešné udalosti"
              value={stats.todayEvents === 0 ? 'Žiadne' : `${stats.todayEvents}`}
              loading={loading}
            />
            {stats.overdueInvoices > 0 && (
              <MiniStat
                icon={AlertTriangle}
                label="Faktúry po splatnosti"
                value={stats.overdueInvoices}
                loading={loading}
                accent
              />
            )}
          </div>
        </div>

        {/* MDN Tech credit */}
        <div className="px-4 pb-2">
          <a
            href="https://mdntech.org"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/50 transition-all"
          >
            <div className="w-5 h-5 rounded bg-gray-900 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src="/logo_mdntech.webp" alt="M.D.N Tech" className="w-4 h-4 object-contain" />
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">
                Made by <span className="font-semibold text-gray-500 group-hover:text-gray-700">M.D.N Tech</span>
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-gray-300 group-hover:text-royal-500 transition-colors" />
            </div>
          </a>
        </div>

        {/* Bottom orange accent bar */}
        <div className="h-1 bg-gradient-to-r from-royal-500 via-royal-400 to-royal-300" />
      </aside>
    </>
  );
}
