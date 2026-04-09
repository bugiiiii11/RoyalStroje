import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { supabase } from '../../lib/supabase';
import { calculateRentalDays, combineDatetime } from '../../lib/rentalDays';
import { formatPrice, VAT_RATE } from '../../lib/constants';
import generateAgreementPdf from '../../lib/generateAgreementPdf';
import generateAgreementPdfPO from '../../lib/generateAgreementPdfPO';

export default function FinalizeContractModal({ open, onClose, reservation, items, client, contract, onFinalized }) {
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('08:00');
  const [finalTotal, setFinalTotal] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const timeFrom = contract?.time_from || '08:00';
  const pickupDatetime = combineDatetime(reservation?.date_from, timeFrom);
  const returnDatetime = combineDatetime(returnDate, returnTime);

  const { days, isNegotiable } = (pickupDatetime && returnDatetime && returnDatetime > pickupDatetime)
    ? calculateRentalDays(pickupDatetime, returnDatetime)
    : { days: null, isNegotiable: false };

  // Auto-calculate suggested price when days change
  const dailySubtotal = (items || []).reduce((sum, i) => sum + i.quantity * i.daily_rate, 0);
  const suggestedNet = days != null ? dailySubtotal * days : null;
  const suggestedTotal = suggestedNet != null
    ? Math.round(suggestedNet * (1 + VAT_RATE) * 100) / 100
    : null;

  useEffect(() => {
    if (suggestedTotal != null) {
      setFinalTotal(suggestedTotal.toFixed(2));
    }
  }, [suggestedTotal]);

  const handleConfirm = async () => {
    if (!returnDate || !contract) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('contracts')
        .update({
          type: 'finalna',
          return_date: returnDate,
          time_to: returnTime || null,
          calculated_days: days,
          final_total: parseFloat(finalTotal) || 0,
          notes: notes || null,
        })
        .eq('id', contract.id);
      if (error) throw error;

      // Generate final PDF
      const contractData = {
        ...contract,
        type: 'finalna',
        return_date: returnDate,
        time_to: returnTime,
        calculated_days: days,
        final_total: parseFloat(finalTotal) || 0,
      };
      const gen = client?.entity_type === 'fo' ? generateAgreementPdf : generateAgreementPdfPO;
      await gen(reservation, items, client, contractData);

      onFinalized?.();
      onClose();
    } catch (e) {
      alert('Chyba: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow';

  return (
    <Modal open={open} onClose={onClose} title="Sfinalizovať zmluvu">
      <div className="space-y-5">
        {/* Pickup info */}
        <div className="bg-gray-50 rounded-lg p-3 text-sm">
          <p className="text-gray-500 text-xs font-medium mb-1">VYZDVIHNUTIE</p>
          <p className="font-medium text-gray-900">
            {reservation?.date_from} {timeFrom && `o ${timeFrom}`}
          </p>
        </div>

        {/* Return date + time */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Dátum a čas vrátenia</label>
          <div className="flex gap-3">
            <input
              type="date"
              value={returnDate}
              min={reservation?.date_from}
              onChange={(e) => setReturnDate(e.target.value)}
              className={inputClass}
            />
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Calculated days */}
        {days != null && (
          <div className={`rounded-lg p-3 text-sm ${isNegotiable ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="flex items-start gap-2">
              {isNegotiable && <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />}
              <div>
                <p className={`font-semibold ${isNegotiable ? 'text-amber-800' : 'text-blue-800'}`}>
                  Vypočítaný prenájom: <strong>{days} {days === 1 ? 'deň' : days < 5 ? 'dni' : 'dní'}</strong>
                </p>
                {isNegotiable && (
                  <p className="text-amber-700 text-xs mt-0.5">
                    Čas vrátenia je do 2h od hranice — zvyčajne sa účtuje rovnaký počet dní (podľa dohody).
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Editable final price */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Finálna cena vrátane DPH (€)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={finalTotal}
            onChange={(e) => setFinalTotal(e.target.value)}
            className={`${inputClass} w-full`}
          />
          {suggestedTotal != null && (
            <p className="text-xs text-gray-400 mt-1">
              Navrhovaná cena: {formatPrice(suggestedTotal)} ({days} dní × {formatPrice(dailySubtotal)}/deň + 23% DPH)
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Poznámky k zmluve</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className={`${inputClass} w-full`}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
          >
            Zrušiť
          </button>
          <button
            onClick={handleConfirm}
            disabled={saving || !returnDate || !finalTotal}
            className="px-5 py-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full text-sm font-semibold shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50"
          >
            {saving ? 'Ukladá sa...' : 'Potvrdiť a generovať zmluvu'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
