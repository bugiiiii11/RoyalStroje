import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import useInvoices from '../../hooks/useInvoices';
import useContracts from '../../hooks/useContracts';
import { supabase } from '../../lib/supabase';
import SearchInput from '../../components/ui/SearchInput';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { formatPrice, formatDate } from '../../lib/constants';
import CreateInvoiceModal from './CreateInvoiceModal';

const TYPE_MAP = {
  proforma:  { label: 'Proforma',       bg: 'bg-blue-100',   text: 'text-blue-700' },
  invoice:   { label: 'Faktúra',         bg: 'bg-green-100',  text: 'text-green-700' },
  credit_note: { label: 'Dobropis',      bg: 'bg-orange-100', text: 'text-orange-700' },
  navrh:     { label: 'Návrh zmluvy',   bg: 'bg-gray-100',   text: 'text-gray-700' },
  finalna:   { label: 'Finálna zmluva', bg: 'bg-purple-100', text: 'text-purple-700' },
};

const STATUS_MAP = {
  draft:     { label: 'Návrh',     bg: 'bg-gray-100',  text: 'text-gray-700' },
  sent:      { label: 'Odoslaná',  bg: 'bg-blue-100',  text: 'text-blue-700' },
  paid:      { label: 'Zaplatená', bg: 'bg-green-100', text: 'text-green-700' },
  cancelled: { label: 'Zrušená',   bg: 'bg-red-100',   text: 'text-red-700' },
  navrh:     { label: 'Návrh',     bg: 'bg-gray-100',  text: 'text-gray-700' },
  finalna:   { label: 'Finálna',   bg: 'bg-purple-100',text: 'text-purple-700' },
};

export default function InvoiceList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ type: '', status: '', search: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, kind: 'invoice'|'contract', reservationId? }
  const [deleting, setDeleting] = useState(false);

  // Separate filter signals for each hook
  const invoiceFilters = useMemo(() => ({
    type: ['proforma', 'invoice', 'credit_note', ''].includes(filters.type) ? filters.type : '__none__',
    status: filters.status,
    search: filters.search,
  }), [filters]);

  const contractFilters = useMemo(() => ({
    type: ['navrh', 'finalna', ''].includes(filters.type) ? filters.type : '__none__',
    search: filters.search,
  }), [filters]);

  const { data: invoices, loading: invLoading, refetch: refetchInv } = useInvoices(invoiceFilters);
  const { data: contracts, loading: conLoading, refetch: refetchCon } = useContracts(contractFilters);

  const loading = invLoading || conLoading;

  // Merge + normalise into a single list
  const rows = useMemo(() => {
    const invRows = (invoices || []).map((inv) => ({
      _kind: 'invoice',
      id: inv.id,
      number: inv.invoice_number,
      type: inv.type,
      reservationNumber: inv.reservations?.reservation_number || '—',
      clientName: inv.reservations?.clients?.company_name || '—',
      issueDate: inv.issue_date,
      dueDate: inv.due_date,
      total: inv.total,
      status: inv.status,
      isOverdue: inv.status !== 'paid' && inv.status !== 'cancelled' && new Date(inv.due_date) < new Date(),
    }));

    const conRows = (contracts || []).map((con) => ({
      _kind: 'contract',
      id: con.id,
      reservationId: con.reservation_id,
      number: con.contract_number,
      type: con.type,
      reservationNumber: con.reservations?.reservation_number || '—',
      clientName: con.reservations?.clients?.company_name || '—',
      issueDate: con.created_at?.slice(0, 10),
      dueDate: null,
      total: con.final_total,
      status: con.type,
      isOverdue: false,
    }));

    // If a specific type filter targets only invoices or only contracts, skip the other
    const typeFilter = filters.type;
    const showInvoices = !typeFilter || ['proforma', 'invoice', 'credit_note'].includes(typeFilter);
    const showContracts = !typeFilter || ['navrh', 'finalna'].includes(typeFilter);

    return [
      ...(showInvoices ? invRows : []),
      ...(showContracts ? conRows : []),
    ].sort((a, b) => (b.issueDate || '').localeCompare(a.issueDate || ''));
  }, [invoices, contracts, filters.type]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.kind === 'invoice') {
        const { error } = await supabase.from('invoices').delete().eq('id', deleteTarget.id);
        if (error) throw error;
      } else {
        // Delete reservation → contract is cascaded automatically
        const { error } = await supabase.from('reservations').delete().eq('id', deleteTarget.reservationId);
        if (error) throw error;
      }
      setDeleteTarget(null);
      refetchInv();
      refetchCon();
    } catch (e) {
      alert('Chyba pri mazaní: ' + e.message);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: 'number',
      label: 'Číslo',
      width: '14%',
      render: (row) => <span className="font-mono font-medium">{row.number}</span>,
    },
    {
      key: 'type',
      label: 'Typ',
      width: '14%',
      render: (row) => {
        const t = TYPE_MAP[row.type] || TYPE_MAP.invoice;
        return <Badge label={t.label} bg={t.bg} text={t.text} />;
      },
    },
    {
      key: 'reservation',
      label: 'Obchod / Klient',
      width: '20%',
      render: (row) => (
        <div>
          <p className="text-sm font-medium">{row.reservationNumber}</p>
          <p className="text-xs text-gray-400">{row.clientName}</p>
        </div>
      ),
    },
    {
      key: 'issueDate',
      label: 'Vystavená',
      width: '12%',
      render: (row) => formatDate(row.issueDate),
    },
    {
      key: 'dueDate',
      label: 'Splatnosť',
      width: '12%',
      render: (row) => {
        if (!row.dueDate) return <span className="text-gray-300">—</span>;
        return <span className={row.isOverdue ? 'text-red-600 font-medium' : ''}>{formatDate(row.dueDate)}</span>;
      },
    },
    {
      key: 'total',
      label: 'Celkom',
      width: '12%',
      render: (row) => row.total != null ? <span className="font-semibold">{formatPrice(row.total)}</span> : <span className="text-gray-300">—</span>,
    },
    {
      key: 'status',
      label: 'Stav',
      width: '10%',
      render: (row) => {
        const s = STATUS_MAP[row.status] || STATUS_MAP.draft;
        return <Badge label={s.label} bg={s.bg} text={s.text} />;
      },
    },
    {
      key: 'actions',
      label: '',
      width: '6%',
      render: (row) => (
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteTarget({ id: row.id, kind: row._kind, reservationId: row.reservationId }); }}
          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded transition-colors"
          title="Vymazať"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Faktúry & Zmluvy</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-glow hover:shadow-glow-md transition-all btn-press"
        >
          <Plus className="w-4 h-4" />
          Nová faktúra
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-1 min-w-[200px]">
          <SearchInput value={filters.search} onChange={(v) => setFilters(f => ({ ...f, search: v }))} placeholder="Hľadať podľa čísla..." />
        </div>
        <select
          value={filters.type}
          onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
        >
          <option value="">Všetky typy</option>
          <option value="navrh">Návrh zmluvy</option>
          <option value="finalna">Finálna zmluva</option>
          <option value="proforma">Proforma</option>
          <option value="invoice">Faktúra</option>
          <option value="credit_note">Dobropis</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
        >
          <option value="">Všetky stavy</option>
          <option value="draft">Návrh (faktúra)</option>
          <option value="sent">Odoslaná</option>
          <option value="paid">Zaplatená</option>
          <option value="cancelled">Zrušená</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-card">
        <DataTable
          columns={columns}
          data={rows}
          loading={loading}
          onRowClick={(row) => {
            if (row._kind === 'invoice') navigate(`/invoices/${row.id}`);
            else navigate(`/deals/${row.reservationId}`);
          }}
          emptyMessage="Žiadne záznamy"
        />
      </div>

      <CreateInvoiceModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => { setShowCreate(false); refetchInv(); }}
      />

      {/* Delete confirmation modal */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Potvrdiť vymazanie"
      >
        <p className="text-sm text-gray-600 mb-2">
          {deleteTarget?.kind === 'contract'
            ? 'Vymazanie zmluvy zmaže aj celý obchod (rezerváciu) z databázy. Táto akcia je nevratná.'
            : 'Vymazanie faktúry je nevratné.'}
        </p>
        <p className="text-sm font-medium text-gray-900 mb-6">Naozaj chcete pokračovať?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteTarget(null)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
          >
            Zrušiť
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {deleting ? 'Maže sa...' : 'Vymazať'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
