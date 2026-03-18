import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import SearchInput from '../../components/ui/SearchInput';
import { supabase } from '../../lib/supabase';
import { formatPrice, VAT_RATE } from '../../lib/constants';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';

export default function CreateInvoiceModal({ open, onClose, onCreated, reservationId = null }) {
  const [search, setSearch] = useState('');
  const [selectedRes, setSelectedRes] = useState(null);
  const [type, setType] = useState('proforma');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { data: reservations } = useSupabaseQuery(
    () => supabase
      .from('reservations')
      .select('*, clients(company_name)')
      .neq('status', 'cancelled')
      .order('created_at', { ascending: false })
      .limit(20),
    []
  );

  // If reservationId is passed, auto-select it
  const activeRes = selectedRes || (reservationId ? reservations?.find(r => r.id === reservationId) : null);

  const defaultDueDays = type === 'proforma' ? 14 : 30;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + defaultDueDays);
  const dueDateStr = dueDate.toISOString().split('T')[0];
  const [customDueDate, setCustomDueDate] = useState('');

  const handleSubmit = async () => {
    if (!activeRes) return;
    setSubmitting(true);
    setError('');
    try {
      const { error: err } = await supabase.from('invoices').insert({
        reservation_id: activeRes.id,
        type,
        status: 'draft',
        due_date: customDueDate || dueDateStr,
        subtotal: activeRes.subtotal,
        vat_rate: 23,
        vat_amount: activeRes.vat_amount,
        total: activeRes.total,
        notes: notes || null,
      });
      if (err) throw err;
      onCreated?.();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nová faktúra" maxWidth="max-w-xl">
      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      {/* Type */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-2">Typ</label>
        <div className="flex gap-2">
          {[
            { value: 'proforma', label: 'Proforma faktúra' },
            { value: 'invoice', label: 'Faktúra' },
            { value: 'credit_note', label: 'Dobropis' },
          ].map((t) => (
            <button key={t.value} onClick={() => setType(t.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === t.value ? 'bg-royal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Select Reservation */}
      {!reservationId && (
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Obchod</label>
          {activeRes ? (
            <div className="flex items-center justify-between p-3 border border-royal-500 bg-royal-50 rounded-lg">
              <div>
                <p className="font-mono font-medium">{activeRes.reservation_number}</p>
                <p className="text-xs text-gray-500">{activeRes.clients?.company_name} · {formatPrice(activeRes.total)}</p>
              </div>
              <button onClick={() => setSelectedRes(null)} className="text-xs text-gray-400 hover:text-gray-600">Zmeniť</button>
            </div>
          ) : (
            <div className="space-y-2">
              <SearchInput value={search} onChange={setSearch} placeholder="Hľadať obchod..." />
              <div className="max-h-[200px] overflow-y-auto border border-gray-200 rounded-lg">
                {(reservations || [])
                  .filter(r => !search || r.reservation_number.includes(search) || r.clients?.company_name?.toLowerCase().includes(search.toLowerCase()))
                  .map(r => (
                    <div key={r.id} onClick={() => setSelectedRes(r)}
                      className="flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-mono font-medium">{r.reservation_number}</p>
                        <p className="text-xs text-gray-400">{r.clients?.company_name}</p>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(r.total)}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Splatnosť</label>
        <input type="date" value={customDueDate || dueDateStr}
          onChange={(e) => setCustomDueDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royal-500 outline-none" />
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Poznámky</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royal-500 outline-none" />
      </div>

      {/* Summary */}
      {activeRes && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Medzisúčet</span><span>{formatPrice(activeRes.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">DPH (23%)</span><span>{formatPrice(activeRes.vat_amount)}</span></div>
          <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg mt-2">
            <span>Celkom</span><span>{formatPrice(activeRes.total)}</span>
          </div>
        </div>
      )}

      <button onClick={handleSubmit} disabled={submitting || !activeRes}
        className="w-full bg-royal-500 hover:bg-royal-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50">
        {submitting ? 'Vytvára sa...' : 'Vystaviť faktúru'}
      </button>
    </Modal>
  );
}
