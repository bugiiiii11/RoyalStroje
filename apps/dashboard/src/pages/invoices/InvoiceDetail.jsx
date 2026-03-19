import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileDown, Building2, Phone, Mail } from 'lucide-react';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import { supabase } from '../../lib/supabase';
import { ContentCard } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import generateInvoicePdf from '../../lib/generateInvoicePdf';
import { formatPrice, formatDate } from '../../lib/constants';

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

const VALID_TRANSITIONS = {
  draft: ['sent', 'cancelled'],
  sent: ['paid', 'cancelled'],
  paid: [],
  cancelled: [],
};

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const { data: invoice, loading, refetch } = useSupabaseQuery(
    () => supabase.from('invoices').select('*, reservations(*, clients(*))').eq('id', id).single(),
    [id]
  );

  const { data: items } = useSupabaseQuery(
    () => invoice?.reservation_id
      ? supabase.from('reservation_items').select('*, equipment(name)').eq('reservation_id', invoice.reservation_id)
      : Promise.resolve({ data: [] }),
    [invoice?.reservation_id]
  );

  const handleStatusChange = async (newStatus) => {
    setTransitioning(true);
    try {
      const updates = { status: newStatus };
      if (newStatus === 'paid') updates.paid_at = new Date().toISOString();
      await supabase.from('invoices').update(updates).eq('id', id);
      setConfirmStatus(null);
      refetch();
    } catch (e) {
      alert('Chyba: ' + e.message);
    } finally {
      setTransitioning(false);
    }
  };

  const handleDownload = async () => {
    if (invoice) {
      await generateInvoicePdf(invoice, invoice.reservations, items, invoice.reservations?.clients);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!invoice) return <p className="text-center text-gray-500 py-20">Faktúra nebola nájdená</p>;

  const typeInfo = TYPE_MAP[invoice.type] || TYPE_MAP.invoice;
  const statusInfo = STATUS_MAP[invoice.status] || STATUS_MAP.draft;
  const validNext = VALID_TRANSITIONS[invoice.status] || [];
  const reservation = invoice.reservations;
  const client = reservation?.clients;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/invoices')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 font-mono">{invoice.invoice_number}</h1>
            <Badge label={typeInfo.label} bg={typeInfo.bg} text={typeInfo.text} />
            <Badge label={statusInfo.label} bg={statusInfo.bg} text={statusInfo.text} />
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Vystavená {formatDate(invoice.issue_date)}</p>
        </div>

        <button onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all">
          <FileDown className="w-4 h-4" />Stiahnuť PDF
        </button>

        {validNext.map((next) => (
          <button key={next} onClick={() => setConfirmStatus(next)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              next === 'cancelled' ? 'border border-red-300 text-red-600 hover:bg-red-50 rounded-lg' :
              next === 'paid' ? 'bg-green-600 text-white hover:bg-green-700 rounded-full' :
              'bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full shadow-glow hover:shadow-glow-md btn-press'
            }`}>
            → {STATUS_MAP[next]?.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <ContentCard title="Detaily">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div><p className="text-gray-500">Splatnosť</p><p className="font-medium">{formatDate(invoice.due_date)}</p></div>
              <div><p className="text-gray-500">Obchod</p>
                <button onClick={() => navigate(`/deals/${reservation?.id}`)} className="font-mono font-medium text-royal-600 hover:underline">
                  {reservation?.reservation_number}
                </button>
              </div>
              <div><p className="text-gray-500">VS</p><p className="font-medium">{(invoice.invoice_number || '').replace(/\D/g, '')}</p></div>
              {invoice.paid_at && <div><p className="text-gray-500">Zaplatená</p><p className="font-medium">{formatDate(invoice.paid_at)}</p></div>}
            </div>
          </ContentCard>

          {/* Items */}
          <ContentCard title="Položky">
            {items && items.length > 0 ? (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Zariadenie</th>
                  <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Ks</th>
                  <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Sadzba</th>
                  <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Dní</th>
                  <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Spolu</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 font-medium">{item.equipment?.name || '—'}</td>
                      <td className="px-4 py-3 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">{formatPrice(item.daily_rate)}</td>
                      <td className="px-4 py-3 text-right">{item.days}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatPrice(item.line_total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p className="text-sm text-gray-400">Žiadne položky</p>}
          </ContentCard>

          {invoice.notes && (
            <ContentCard title="Poznámky">
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </ContentCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ContentCard title="Financie">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Medzisúčet</span><span>{formatPrice(invoice.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">DPH ({invoice.vat_rate}%)</span><span>{formatPrice(invoice.vat_amount)}</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-100 text-lg font-bold"><span>Celkom</span><span>{formatPrice(invoice.total)}</span></div>
            </div>
          </ContentCard>

          {client && (
            <ContentCard title="Klient">
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-gray-400" /><span className="text-sm font-medium">{client.company_name}</span></div>
                {client.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><span className="text-sm">{client.phone}</span></div>}
                {client.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><span className="text-sm">{client.email}</span></div>}
                {client.ico && <p className="text-xs text-gray-400 mt-2">IČO: {client.ico}</p>}
              </div>
            </ContentCard>
          )}
        </div>
      </div>

      <Modal open={!!confirmStatus} onClose={() => setConfirmStatus(null)} title="Zmena stavu">
        <p className="text-sm text-gray-600 mb-6">
          Zmeniť stav na <strong>{STATUS_MAP[confirmStatus]?.label}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmStatus(null)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all">Zrušiť</button>
          <button onClick={() => handleStatusChange(confirmStatus)} disabled={transitioning}
            className="px-4 py-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full text-sm font-medium shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50">
            {transitioning ? 'Mení sa...' : 'Potvrdiť'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
