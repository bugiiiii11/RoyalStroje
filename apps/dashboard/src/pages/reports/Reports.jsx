import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BarChart3, Package, FileText, TrendingUp, AlertTriangle, Clock, Euro } from 'lucide-react';
import { StatCard, ContentCard } from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import { supabase } from '../../lib/supabase';
import { formatPrice } from '../../lib/constants';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const REVENUE_STATUSES = ['completed', 'invoiced', 'paid'];

const TABS = [
  { key: 'prehlad', label: 'Prehľad' },
  { key: 'pohladavky', label: 'Pohľadávky' },
  { key: 'stroje', label: 'Stroje' },
  { key: 'klienti', label: 'Klienti' },
];

// Local date -> YYYY-MM-DD without the UTC shift toISOString() introduces.
const fmtISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const net = (r) => (parseFloat(r.total) || 0) - (parseFloat(r.vat_amount) || 0);

function BarChart({ data, format = formatPrice, labelWidth = 'w-16' }) {
  if (!data || data.length === 0) return <p className="text-sm text-gray-400">Žiadne dáta</p>;
  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className={`text-xs text-gray-500 ${labelWidth} text-right flex-shrink-0 truncate`} title={item.label}>
            {item.label}
          </span>
          <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden">
            <div
              className="h-full bg-royal-500 rounded-lg flex items-center px-2 transition-all duration-500"
              style={{ width: `${Math.max((item.value / max) * 100, 2)}%` }}
            >
              {item.value > 0 && <span className="text-xs text-white font-medium truncate">{format(item.value)}</span>}
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

// Plain month table (no ranking column).
function MonthTable({ data, columns }) {
  if (!data || data.length === 0) return <p className="text-sm text-gray-400 text-center py-4">Žiadne dáta</p>;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
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
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'prehlad';
  const setTab = (key) => setParams(key === 'prehlad' ? {} : { tab: key }, { replace: true });

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      const now = new Date();
      const year = now.getFullYear();
      const todayISO = fmtISO(now);
      const monthStart = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
      const monthEnd = fmtISO(new Date(year, now.getMonth() + 1, 0));
      const yearStart = `${year}-01-01`;
      const sixMonthsStart = fmtISO(new Date(year, now.getMonth() - 5, 1));
      const windowStart = fmtISO(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29));

      const [resRes, contractsRes, equipRes, itemsRes] = await Promise.all([
        // One broad pull; every reservation-based stat is derived client-side.
        supabase.from('reservations')
          .select('client_id, status, date_from, date_to, total, vat_amount, clients(company_name)')
          .neq('status', 'cancelled'),
        // "Faktúry" are finálne zmluvy (payment lives on contracts.paid_at),
        // NOT the dead invoices table — it would always count 0/0.
        supabase.from('contracts')
          .select('contract_number, final_total, paid_at, return_date, created_at, reservations(clients(company_name))')
          .eq('type', 'finalna'),
        supabase.from('equipment').select('id, status'),
        supabase.from('reservation_items')
          .select('quantity, line_total, custom_name, equipment(name, equipment_categories(name)), reservations!inner(status, date_from, date_to)')
          .neq('reservations.status', 'cancelled'),
      ]);

      const reservations = resRes.data || [];
      const contracts = contractsRes.data || [];
      const equipment = equipRes.data || [];
      const items = itemsRes.data || [];

      const revenueRes = reservations.filter((r) => REVENUE_STATUSES.includes(r.status));

      // Revenue tiles — date_from basis, same as the 6-month chart, so the
      // numbers agree with each other (created_at drifted a few EUR off).
      const monthRevenue = revenueRes
        .filter((r) => r.date_from >= monthStart && r.date_from <= monthEnd)
        .reduce((s, r) => s + net(r), 0);
      const yearRevenue = revenueRes
        .filter((r) => r.date_from >= yearStart)
        .reduce((s, r) => s + net(r), 0);

      // Last 6 months: revenue chart + avg rental length/value + client mix
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(year, now.getMonth() - i, 1);
        months.push({
          key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
          label: MONTH_NAMES[d.getMonth()],
        });
      }

      const monthlyData = months.map((m) => ({
        label: m.label,
        value: revenueRes
          .filter((r) => (r.date_from || '').slice(0, 7) === m.key)
          .reduce((s, r) => s + net(r), 0),
      }));

      const rentalDays = (r) => {
        const diff = Math.round((new Date(r.date_to) - new Date(r.date_from)) / 86400000);
        return Math.max(diff, 1);
      };
      const avgRental = months.map((m) => {
        const rows = revenueRes.filter((r) => (r.date_from || '').slice(0, 7) === m.key);
        const count = rows.length;
        return {
          month: m.label,
          count,
          avgDays: count ? rows.reduce((s, r) => s + rentalDays(r), 0) / count : 0,
          avgValue: count ? rows.reduce((s, r) => s + net(r), 0) / count : 0,
        };
      });

      // New vs returning clients per month (first-ever reservation = new).
      // All non-cancelled reservations count as activity, not just revenue ones.
      const firstMonth = {};
      for (const r of reservations) {
        if (!r.client_id || !r.date_from) continue;
        const mk = r.date_from.slice(0, 7);
        if (!firstMonth[r.client_id] || mk < firstMonth[r.client_id]) firstMonth[r.client_id] = mk;
      }
      const clientMix = months.map((m) => {
        const active = new Set(
          reservations.filter((r) => r.client_id && (r.date_from || '').slice(0, 7) === m.key).map((r) => r.client_id)
        );
        let newC = 0;
        for (const id of active) if (firstMonth[id] === m.key) newC++;
        return { month: m.label, total: active.size, newClients: newC, returning: active.size - newC };
      });

      // Receivables aging — unpaid finálne, bucketed by days since return
      const unpaid = contracts
        .filter((c) => !c.paid_at)
        .map((c) => {
          const base = c.return_date || (c.created_at || '').slice(0, 10);
          const age = base ? Math.max(0, Math.floor((new Date(todayISO) - new Date(base)) / 86400000)) : 0;
          return {
            number: c.contract_number,
            client: c.reservations?.clients?.company_name || '—',
            amount: parseFloat(c.final_total) || 0,
            age,
          };
        });
      const bucket = (from, to) => {
        const rows = unpaid.filter((u) => u.age >= from && (to == null || u.age <= to));
        return { count: rows.length, sum: rows.reduce((s, u) => s + u.amount, 0) };
      };
      const aging = {
        fresh: bucket(0, 14),
        mid: bucket(15, 30),
        old: bucket(31, null),
        oldest: [...unpaid].sort((a, b) => b.age - a.age).slice(0, 10),
      };

      // Equipment: demand (all-time rentals), utilization (rented days, last 30d),
      // category revenue (this year, net line totals)
      const equipMap = {};
      const utilMap = {};
      const catMap = {};
      for (const item of items) {
        const name = item.equipment?.name || item.custom_name || '—';
        const qty = parseInt(item.quantity, 10) || 1;
        equipMap[name] = (equipMap[name] || 0) + qty;

        const res = item.reservations;
        if (res?.date_from && res?.date_to) {
          const from = res.date_from < windowStart ? windowStart : res.date_from;
          const to = res.date_to > todayISO ? todayISO : res.date_to;
          const overlap = Math.round((new Date(to) - new Date(from)) / 86400000) + 1;
          if (overlap > 0) utilMap[name] = (utilMap[name] || 0) + overlap * qty;
        }

        if (res && REVENUE_STATUSES.includes(res.status) && (res.date_from || '') >= yearStart) {
          const cat = item.equipment?.equipment_categories?.name || 'Ostatné';
          catMap[cat] = (catMap[cat] || 0) + (parseFloat(item.line_total) || 0);
        }
      }
      const topN = (map) => Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const topEquipment = topN(equipMap).map(([name, count]) => ({ name, count }));
      const utilization = topN(utilMap).map(([label, value]) => ({ label, value }));
      const categoryRevenue = Object.entries(catMap)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value]) => ({ label, value }));

      // Top clients — lifetime net revenue
      const clientMap = {};
      for (const r of revenueRes) {
        const name = r.clients?.company_name || '—';
        clientMap[name] = (clientMap[name] || 0) + net(r);
      }
      const topClients = topN(clientMap).map(([name, revenue]) => ({ name, revenue }));

      setStats({
        monthRevenue, yearRevenue, monthlyData, avgRental, clientMix, aging,
        topEquipment, utilization, categoryRevenue, topClients,
        totalInvoices: contracts.length,
        paidInvoices: contracts.filter((c) => c.paid_at).length,
        totalEquipment: equipment.length,
        activeEquipment: equipment.filter((e) => e.status === 'active').length,
      });
      setLoading(false);
    }
    fetchReports();
  }, []);

  if (loading || !stats) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const goUnpaid = () => navigate('/invoices?type=finalna&payment=unpaid');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reporty</h1>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-card w-fit mb-6 overflow-x-auto max-w-full">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.key ? 'bg-royal-500 text-white shadow-glow' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'prehlad' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={TrendingUp} label="Tržby tento mesiac (bez DPH)" value={formatPrice(stats.monthRevenue)} color="bg-green-500" />
            <StatCard icon={BarChart3} label="Tržby tento rok (bez DPH)" value={formatPrice(stats.yearRevenue)} color="bg-blue-500" />
            <StatCard icon={Package} label="Zariadenia" value={`${stats.activeEquipment}/${stats.totalEquipment}`} color="bg-purple-500" />
            <StatCard
              icon={FileText}
              label="Faktúry (zaplatené)"
              value={`${stats.paidInvoices}/${stats.totalInvoices}`}
              color="bg-orange-500"
              onClick={() => navigate('/invoices?type=finalna')}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContentCard title="Obrat za posledných 6 mesiacov (bez DPH)">
              <BarChart data={stats.monthlyData} />
            </ContentCard>

            <ContentCard title="Priemerný prenájom (posledných 6 mesiacov)">
              <MonthTable
                data={stats.avgRental}
                columns={[
                  { key: 'month', label: 'Mesiac' },
                  { key: 'count', label: 'Prenájmov', align: 'right' },
                  { key: 'avgDays', label: 'Priemer dní', align: 'right', render: (r) => r.count ? r.avgDays.toFixed(1) : '—' },
                  { key: 'avgValue', label: 'Priem. hodnota (bez DPH)', align: 'right', render: (r) => r.count ? formatPrice(r.avgValue) : '—' },
                ]}
              />
            </ContentCard>
          </div>
        </>
      )}

      {tab === 'pohladavky' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard
              icon={Clock}
              label="Nezaplatené do 14 dní"
              value={formatPrice(stats.aging.fresh.sum)}
              sub={`${stats.aging.fresh.count} faktúr`}
              color="bg-blue-500"
              onClick={goUnpaid}
            />
            <StatCard
              icon={Euro}
              label="Nezaplatené 15–30 dní"
              value={formatPrice(stats.aging.mid.sum)}
              sub={`${stats.aging.mid.count} faktúr`}
              color="bg-orange-500"
              onClick={goUnpaid}
            />
            <StatCard
              icon={AlertTriangle}
              label="Nezaplatené 30+ dní"
              value={formatPrice(stats.aging.old.sum)}
              sub={`${stats.aging.old.count} faktúr`}
              color="bg-red-500"
              onClick={goUnpaid}
            />
          </div>

          <ContentCard title="Najstaršie nezaplatené faktúry — kam volať najprv">
            <RankingTable
              data={stats.aging.oldest}
              columns={[
                { key: 'client', label: 'Klient' },
                { key: 'number', label: 'Zmluva' },
                { key: 'age', label: 'Dní od vrátenia', align: 'right' },
                { key: 'amount', label: 'Suma (s DPH)', align: 'right', render: (r) => formatPrice(r.amount) },
              ]}
            />
          </ContentCard>
        </>
      )}

      {tab === 'stroje' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentCard title="Vyťaženosť — dni v prenájme (posledných 30 dní)">
            <BarChart
              data={stats.utilization}
              labelWidth="w-40"
              format={(v) => `${v} ${v === 1 ? 'deň' : v < 5 ? 'dni' : 'dní'}`}
            />
          </ContentCard>

          <ContentCard title="Tržby podľa kategórie — tento rok (bez DPH)">
            <BarChart data={stats.categoryRevenue} labelWidth="w-40" />
          </ContentCard>

          <ContentCard title="Najžiadanejšie zariadenia (počet prenájmov)">
            <RankingTable
              data={stats.topEquipment}
              columns={[
                { key: 'name', label: 'Zariadenie' },
                { key: 'count', label: 'Prenájmov', align: 'right' },
              ]}
            />
          </ContentCard>
        </div>
      )}

      {tab === 'klienti' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentCard title="Top klienti (obrat bez DPH)">
            <RankingTable
              data={stats.topClients}
              columns={[
                { key: 'name', label: 'Klient' },
                { key: 'revenue', label: 'Obrat', align: 'right', render: (r) => formatPrice(r.revenue) },
              ]}
            />
          </ContentCard>

          <ContentCard title="Noví vs. vracajúci sa klienti (posledných 6 mesiacov)">
            <MonthTable
              data={stats.clientMix}
              columns={[
                { key: 'month', label: 'Mesiac' },
                { key: 'newClients', label: 'Noví', align: 'right' },
                { key: 'returning', label: 'Vracajúci sa', align: 'right' },
                { key: 'total', label: 'Spolu', align: 'right' },
              ]}
            />
          </ContentCard>
        </div>
      )}
    </div>
  );
}
