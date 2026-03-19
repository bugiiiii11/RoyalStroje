import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Trash2, Minus, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { formatPrice, daysBetween, VAT_RATE, RC_DISCOUNT } from '../lib/constants';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { client, user } = useAuth();

  const [items, setItems] = useState(
    (location.state?.cart || []).map(item => ({
      equipment_id: item.id,
      name: item.name,
      daily_rate: item.daily_rate_base * (1 - RC_DISCOUNT),
      quantity: 1,
    }))
  );
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const days = daysBetween(dateFrom, dateTo);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.daily_rate * days, 0);
  const vatAmount = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = subtotal + vatAmount;

  const updateQty = (idx, delta) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], quantity: Math.max(1, updated[idx].quantity + delta) };
    setItems(updated);
  };

  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    if (!dateFrom || !dateTo || items.length === 0) return;
    setSubmitting(true);
    setError('');
    try {
      const { data: reservation, error: err } = await supabase
        .from('reservations')
        .insert({
          client_id: client.id,
          status: 'inquiry',
          date_from: dateFrom,
          date_to: dateTo,
          discount_percent: 5,
          deposit_required: false,
          subtotal,
          vat_amount: vatAmount,
          total,
          notes: notes || null,
          created_by: user?.id,
        })
        .select()
        .single();
      if (err) throw err;

      const itemsToInsert = items.map(item => ({
        reservation_id: reservation.id,
        equipment_id: item.equipment_id,
        quantity: item.quantity,
        daily_rate: item.daily_rate,
        days,
        line_total: item.quantity * item.daily_rate * days,
      }));
      const { error: itemsErr } = await supabase.from('reservation_items').insert(itemsToInsert);
      if (itemsErr) throw itemsErr;

      // Fetch updated with auto-calculated totals
      const { data: updated } = await supabase.from('reservations').select('*').eq('id', reservation.id).single();
      setResult(updated || reservation);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rezervácia odoslaná!</h2>
        <p className="text-gray-500 mb-1">Číslo rezervácie</p>
        <p className="text-3xl font-mono font-bold text-royal-600 mb-2">{result.reservation_number}</p>
        <p className="text-sm text-gray-400 mb-8">Ozveme sa vám s cenovou ponukou.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/rentals')} className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-glow btn-press transition-all">
            Moje prenájmy
          </button>
          <button onClick={() => navigate('/catalog')} className="border border-gray-200 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-all">
            Späť do katalógu
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <p className="text-gray-500 mb-4">Nemáte vybrané žiadne zariadenia.</p>
        <button onClick={() => navigate('/catalog')} className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-glow btn-press transition-all">
          Prejsť do katalógu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nová rezervácia</h1>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

      {/* Dates */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 mb-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase mb-3">Termín prenájmu</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Od</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Do</label>
            <input type="date" value={dateTo} min={dateFrom} onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          {days > 0 && <div className="flex items-end"><span className="text-sm text-gray-500 pb-2">{days} dní</span></div>}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card mb-4">
        <div className="px-6 py-3 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Zariadenia ({items.length})</h2>
        </div>
        {items.map((item, idx) => (
          <div key={item.equipment_id} className="flex items-center justify-between px-6 py-3 border-b border-gray-100 last:border-0">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-400">{formatPrice(item.daily_rate)}/deň (Royal Card cena)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button onClick={() => updateQty(idx, -1)} className="p-1 hover:bg-royal-50 hover:text-royal-600 rounded transition-colors"><Minus className="w-3 h-3" /></button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQty(idx, 1)} className="p-1 hover:bg-royal-50 hover:text-royal-600 rounded transition-colors"><Plus className="w-3 h-3" /></button>
              </div>
              {days > 0 && <span className="text-sm font-semibold w-20 text-right">{formatPrice(item.quantity * item.daily_rate * days)}</span>}
              <button onClick={() => removeItem(idx)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Poznámky (voliteľné)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
          placeholder="Doplňte prípadné požiadavky..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
      </div>

      {/* Summary */}
      {days > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Medzisúčet</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">DPH (23%)</span><span>{formatPrice(vatAmount)}</span></div>
            <div className="flex justify-between pt-2 border-t border-gray-100 text-lg font-bold">
              <span>Celkom</span><span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-green-600">Royal Card: bez zálohy, 5% zľava</p>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting || !dateFrom || !dateTo || items.length === 0}
        className="w-full bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold py-2.5 rounded-full shadow-glow hover:shadow-glow-md btn-press transition-all disabled:opacity-50"
      >
        {submitting ? 'Odosielam...' : 'Odoslať rezerváciu'}
      </button>
    </div>
  );
}
