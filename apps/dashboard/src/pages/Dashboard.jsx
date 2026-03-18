import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, BarChart3, Users, Calendar, PlusCircle, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import useDashboardStats from '../hooks/useDashboardStats';
import useReservations from '../hooks/useReservations';
import { PIPELINE_STATUSES, RESERVATION_STATUSES, getStatusColors, formatPrice, formatDate } from '../lib/constants';

function DealCard({ deal, onClick }) {
  return (
    <div
      onClick={() => onClick(deal)}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-sm hover:border-gray-300 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono font-medium text-gray-500">{deal.reservation_number}</span>
        <span className="text-xs text-gray-400">{formatDate(deal.date_from)}</span>
      </div>
      <p className="text-sm font-medium text-gray-900 truncate">
        {deal.clients?.company_name || 'Neznámy klient'}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-semibold text-gray-700">{formatPrice(deal.total)}</span>
        <span className="text-xs text-gray-400">
          {formatDate(deal.date_from)} – {formatDate(deal.date_to)}
        </span>
      </div>
    </div>
  );
}

function PipelineColumn({ status, deals, onDealClick }) {
  const colors = getStatusColors(status);
  const info = RESERVATION_STATUSES[status];

  return (
    <div className="flex-shrink-0 w-64">
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <h3 className="text-sm font-medium text-gray-700">{info.label}</h3>
        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
          {deals.length}
        </span>
      </div>
      <div className="space-y-2 min-h-[100px]">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onClick={onDealClick} />
        ))}
        {deals.length === 0 && (
          <p className="text-xs text-gray-300 text-center py-8">Žiadne obchody</p>
        )}
      </div>
    </div>
  );
}

function TodaySchedule({ deals }) {
  if (!deals || deals.length === 0) {
    return <p className="text-sm text-gray-400">Dnes nie sú naplánované žiadne udalosti</p>;
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-3">
      {deals.map((deal) => {
        const isStart = deal.date_from === today;
        return (
          <div key={deal.id} className="flex items-center gap-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${isStart ? 'bg-green-500' : 'bg-orange-500'}`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-700 truncate">
                {deal.clients?.company_name || '—'}
              </p>
              <p className="text-xs text-gray-400">
                {deal.reservation_number} · {isStart ? 'Začiatok' : 'Koniec'} prenájmu
              </p>
            </div>
            <StatusBadge status={deal.status} />
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { data: allDeals, loading: dealsLoading } = useReservations();

  const today = new Date().toISOString().split('T')[0];

  const grouped = useMemo(() => {
    if (!allDeals) return {};
    const map = {};
    for (const s of PIPELINE_STATUSES) map[s] = [];
    for (const deal of allDeals) {
      if (map[deal.status]) map[deal.status].push(deal);
    }
    return map;
  }, [allDeals]);

  const todayDeals = useMemo(() => {
    if (!allDeals) return [];
    return allDeals.filter(d => d.date_from === today || d.date_to === today);
  }, [allDeals, today]);

  const handleDealClick = (deal) => navigate(`/deals/${deal.id}`);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => navigate('/deals/new')}
          className="flex items-center gap-2 bg-royal-500 hover:bg-royal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Nový obchod
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Package}
          label="Aktívne prenájmy"
          value={statsLoading ? '…' : stats.activeRentals}
          color="bg-blue-500"
        />
        <StatCard
          icon={BarChart3}
          label="Tento mesiac"
          value={statsLoading ? '…' : formatPrice(stats.monthRevenue)}
          color="bg-green-500"
        />
        <StatCard
          icon={Users}
          label="Klienti"
          value={statsLoading ? '…' : stats.totalClients}
          color="bg-purple-500"
        />
        <StatCard
          icon={Calendar}
          label="Dnes"
          value={statsLoading ? '…' : stats.todayEvents}
          color="bg-orange-500"
        />
      </div>

      {/* Pipeline Kanban */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline obchodov</h2>
        {dealsLoading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PIPELINE_STATUSES.map((status) => (
              <PipelineColumn
                key={status}
                status={status}
                deals={grouped[status] || []}
                onDealClick={handleDealClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dnešný rozvrh</h2>
        {dealsLoading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : (
          <TodaySchedule deals={todayDeals} />
        )}
      </div>
    </div>
  );
}
