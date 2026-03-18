import { useState, useEffect } from 'react';
import { BarChart3, Package, Users, TrendingUp } from 'lucide-react';
import { StatCard } from '../../components/ui/Card';
import { ContentCard } from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../lib/constants';

function BarChart({ data, maxValue }) {
  if (!data || data.length === 0) return <p className="text-sm text-gray-400">Žiadne dáta</p>;
  const max = maxValue || Math.max(...data.map(d => d.value), 1);

  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-16 text-right flex-shrink-0">{item.label}</span>
          <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
            <div
              className="h-full bg-royal-500 rounded-lg flex items-center px-2 transition-all duration-500"
              style={{ width: `${Math.max((item.value / max) * 100, 2)}%` }}
            >
              {item.value > 0 && <span className="text-xs text-white font-medium truncate">{formatPrice(item.value)}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RankingTable({ data, columns }) {
  if (!data || data.length === 0) return <p className="text-sm text-gray-400 text-center py-4">Žiadne dáta</p>;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase w-8">#</th>
          {columns.map(c => (
            <th key={c.key} className={`${c.align === 'right' ? 'text-right' : 'text-left'} px-3 py-2 text-xs font-medium text-gray-500 uppercase`}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map((row, i) => (
          <tr key={i}>
            <td className="px-3 py-2 text-gray-400">{i + 1}</td>
            {columns.map(c => (
              <td key={c.key} className={`px-3 py-2 ${c.align === 'right' ? 'text-right font-medium' : ''}`}>
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    monthRevenue: 0, yearRevenue: 0, totalInvoices: 0, paidInvoices: 0,
    monthlyData: [], topEquipment: [], topClients: [],
    totalEquipment: 0, activeEquipment: 0,
  });

  useEffect(() => {
    async function fetchReports() {
      const now = new Date();
      const year = now.getFullYear();
      const monthStart = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
      const yearStart = `${year}-01-01`;

      const [monthRes, yearRes, invoiceCountRes, paidCountRes, equipRes, activeEquipRes] = await Promise.all([
        supabase.from('invoices').select('total').eq('status', 'paid').gte('paid_at', monthStart),
        supabase.from('invoices').select('total').eq('status', 'paid').gte('paid_at', yearStart),
        supabase.from('invoices').select('id', { count: 'exact', head: true }),
        supabase.from('invoices').select('id', { count: 'exact', head: true }).eq('status', 'paid'),
        supabase.from('equipment').select('id', { count: 'exact', head: true }),
        supabase.from('equipment').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      ]);

      const monthRevenue = (monthRes.data || []).reduce((s, r) => s + parseFloat(r.total || 0), 0);
      const yearRevenue = (yearRes.data || []).reduce((s, r) => s + parseFloat(r.total || 0), 0);

      // Monthly revenue (last 6 months from reservations)
      const monthlyData = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(year, now.getMonth() - i, 1);
        const mStart = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        const mEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0];
        const { data: mData } = await supabase
          .from('reservations')
          .select('total')
          .in('status', ['completed', 'invoiced', 'paid'])
          .gte('date_from', mStart)
          .lte('date_from', mEnd);
        const total = (mData || []).reduce((s, r) => s + parseFloat(r.total || 0), 0);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
        monthlyData.push({ label: monthNames[d.getMonth()], value: total });
      }

      // Top equipment
      const { data: itemsData } = await supabase
        .from('reservation_items')
        .select('equipment_id, equipment(name), quantity');
      const equipMap = {};
      (itemsData || []).forEach(item => {
        const name = item.equipment?.name || '—';
        equipMap[name] = (equipMap[name] || 0) + item.quantity;
      });
      const topEquipment = Object.entries(equipMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, count]) => ({ name, count }));

      // Top clients
      const { data: resData } = await supabase
        .from('reservations')
        .select('total, clients(company_name)')
        .in('status', ['completed', 'invoiced', 'paid']);
      const clientMap = {};
      (resData || []).forEach(r => {
        const name = r.clients?.company_name || '—';
        clientMap[name] = (clientMap[name] || 0) + parseFloat(r.total || 0);
      });
      const topClients = Object.entries(clientMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, revenue]) => ({ name, revenue }));

      setStats({
        monthRevenue, yearRevenue,
        totalInvoices: invoiceCountRes.count || 0,
        paidInvoices: paidCountRes.count || 0,
        monthlyData, topEquipment, topClients,
        totalEquipment: equipRes.count || 0,
        activeEquipment: activeEquipRes.count || 0,
      });
      setLoading(false);
    }
    fetchReports();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reporty</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Tento mesiac" value={formatPrice(stats.monthRevenue)} color="bg-green-500" />
        <StatCard icon={BarChart3} label="Tento rok" value={formatPrice(stats.yearRevenue)} color="bg-blue-500" />
        <StatCard icon={Package} label="Zariadenia" value={`${stats.activeEquipment}/${stats.totalEquipment}`} color="bg-purple-500" />
        <StatCard icon={Users} label="Faktúry (zaplatené)" value={`${stats.paidInvoices}/${stats.totalInvoices}`} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ContentCard title="Obrat za posledných 6 mesiacov">
          <BarChart data={stats.monthlyData} />
        </ContentCard>

        {/* Top Equipment */}
        <ContentCard title="Najžiadanejšie zariadenia">
          <RankingTable
            data={stats.topEquipment}
            columns={[
              { key: 'name', label: 'Zariadenie' },
              { key: 'count', label: 'Prenájmov', align: 'right' },
            ]}
          />
        </ContentCard>

        {/* Top Clients */}
        <ContentCard title="Top klienti">
          <RankingTable
            data={stats.topClients}
            columns={[
              { key: 'name', label: 'Klient' },
              { key: 'revenue', label: 'Obrat', align: 'right', render: (r) => formatPrice(r.revenue) },
            ]}
          />
        </ContentCard>
      </div>
    </div>
  );
}
