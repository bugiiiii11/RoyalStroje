import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import useInvoices from '../../hooks/useInvoices';
import SearchInput from '../../components/ui/SearchInput';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice, formatDate } from '../../lib/constants';
import CreateInvoiceModal from './CreateInvoiceModal';

const TYPE_MAP = {
  proforma: { label: 'Proforma', bg: 'bg-blue-100', text: 'text-blue-700' },
  invoice: { label: 'Faktúra', bg: 'bg-green-100', text: 'text-green-700' },
  credit_note: { label: 'Dobropis', bg: 'bg-orange-100', text: 'text-orange-700' },
};

const STATUS_MAP = {
  draft: { label: 'Návrh', bg: 'bg-gray-100', text: 'text-gray-700' },
  sent: { label: 'Odoslaná', bg: 'bg-blue-100', text: 'text-blue-700' },
  paid: { label: 'Zaplatená', bg: 'bg-green-100', text: 'text-green-700' },
  cancelled: { label: 'Zrušená', bg: 'bg-red-100', text: 'text-red-700' },
};

const columns = [
  {
    key: 'invoice_number',
    label: 'Číslo',
    render: (row) => <span className="font-mono font-medium">{row.invoice_number}</span>,
  },
  {
    key: 'type',
    label: 'Typ',
    render: (row) => {
      const t = TYPE_MAP[row.type] || TYPE_MAP.invoice;
      return <Badge label={t.label} bg={t.bg} text={t.text} />;
    },
  },
  {
    key: 'reservation',
    label: 'Obchod / Klient',
    render: (row) => (
      <div>
        <p className="text-sm font-medium">{row.reservations?.reservation_number || '—'}</p>
        <p className="text-xs text-gray-400">{row.reservations?.clients?.company_name || '—'}</p>
      </div>
    ),
  },
  {
    key: 'issue_date',
    label: 'Vystavená',
    render: (row) => formatDate(row.issue_date),
  },
  {
    key: 'due_date',
    label: 'Splatnosť',
    render: (row) => {
      const isOverdue = row.status !== 'paid' && row.status !== 'cancelled' && new Date(row.due_date) < new Date();
      return <span className={isOverdue ? 'text-red-600 font-medium' : ''}>{formatDate(row.due_date)}</span>;
    },
  },
  {
    key: 'total',
    label: 'Celkom',
    render: (row) => <span className="font-semibold">{formatPrice(row.total)}</span>,
  },
  {
    key: 'status',
    label: 'Stav',
    render: (row) => {
      const s = STATUS_MAP[row.status] || STATUS_MAP.draft;
      return <Badge label={s.label} bg={s.bg} text={s.text} />;
    },
  },
];

export default function InvoiceList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ type: '', status: '', search: '' });
  const [showCreate, setShowCreate] = useState(false);
  const { data: invoices, loading, refetch } = useInvoices(filters);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Faktúry</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-royal-500 hover:bg-royal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nová faktúra
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <SearchInput value={filters.search} onChange={(v) => setFilters(f => ({ ...f, search: v }))} placeholder="Hľadať podľa čísla..." />
        </div>
        <select value={filters.type} onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royal-500 outline-none">
          <option value="">Všetky typy</option>
          <option value="proforma">Proforma</option>
          <option value="invoice">Faktúra</option>
          <option value="credit_note">Dobropis</option>
        </select>
        <select value={filters.status} onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royal-500 outline-none">
          <option value="">Všetky stavy</option>
          <option value="draft">Návrh</option>
          <option value="sent">Odoslaná</option>
          <option value="paid">Zaplatená</option>
          <option value="cancelled">Zrušená</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable
          columns={columns}
          data={invoices}
          loading={loading}
          onRowClick={(row) => navigate(`/invoices/${row.id}`)}
          emptyMessage="Žiadne faktúry"
        />
      </div>

      <CreateInvoiceModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); refetch(); }} />
    </div>
  );
}
