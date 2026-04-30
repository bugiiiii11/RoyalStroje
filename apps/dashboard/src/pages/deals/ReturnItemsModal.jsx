import { useState, useEffect, useMemo } from 'react';
import { AlertCircle, CheckSquare, Square } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { supabase } from '../../lib/supabase';
import { calculateRentalDays, combineDatetime } from '../../lib/rentalDays';
import { formatPrice, VAT_RATE } from '../../lib/constants';
import { prepareFinalizationContract } from '../../lib/contractNumbers';
import generateAgreementPdf from '../../lib/generateAgreementPdf';
import generateAgreementPdfPO from '../../lib/generateAgreementPdfPO';

/**
 * Build rows of returnable units from reservation items + already-returned data.
 *   - Item with serial_numbers: one row per not-yet-returned serial.
 *   - Item without serial_numbers: one aggregate row, qty = remaining quantity.
 */
function buildReturnableRows(items, returnedBySerial, returnedQty) {
  const rows = [];
  for (const item of items || []) {
    const serials = Array.isArray(item.serial_numbers) ? item.serial_numbers.filter(Boolean) : [];
    if (serials.length > 0) {
      const returnedSet = returnedBySerial[item.id] || new Set();
      for (const sn of serials) {
        if (!returnedSet.has(sn)) {
          rows.push({
            key: `${item.id}:${sn}`,
            itemId: item.id,
            equipmentName: item.equipment?.name || item.custom_name || '—',
            serialNumber: sn,
            dailyRate: parseFloat(item.daily_rate) || 0,
            quantity: 1,
          });
        }
      }
    } else {
      const totalQty = parseInt(item.quantity, 10) || 1;
      const alreadyReturned = returnedQty[item.id] || 0;
      const remaining = totalQty - alreadyReturned;
      if (remaining > 0) {
        rows.push({
          key: `${item.id}:noserial`,
          itemId: item.id,
          equipmentName: item.equipment?.name || item.custom_name || '—',
          serialNumber: null,
          dailyRate: parseFloat(item.daily_rate) || 0,
          quantity: remaining,
        });
      }
    }
  }
  return rows;
}

export default function ReturnItemsModal({
  open,
  onClose,
  reservation,
  items,
  client,
  contracts,                // all contracts for this reservation (návrh + finálne)
  returnedBySerial,
  returnedQty,
  onFinalized,
}) {
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('08:00');
  const [finalTotal, setFinalTotal] = useState('');
  const [notes, setNotes] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [saving, setSaving] = useState(false);

  const navrh = (contracts || []).find((c) => c.type === 'navrh');
  const timeFrom = navrh?.time_from || '08:00';
  const pickupDatetime = combineDatetime(reservation?.date_from, timeFrom);
  const returnDatetime = combineDatetime(returnDate, returnTime);

  const { days, isNegotiable } = (pickupDatetime && returnDatetime && returnDatetime > pickupDatetime)
    ? calculateRentalDays(pickupDatetime, returnDatetime)
    : { days: null, isNegotiable: false };

  const rows = useMemo(
    () => buildReturnableRows(items, returnedBySerial, returnedQty),
    [items, returnedBySerial, returnedQty]
  );

  // Reset selection + dates when modal opens
  useEffect(() => {
    if (open) {
      setSelected(new Set(rows.map((r) => r.key)));
      setReturnDate('');
      setReturnTime('08:00');
      setNotes('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const selectedRows = rows.filter((r) => selected.has(r.key));
  const dailySubtotal = selectedRows.reduce((sum, r) => sum + r.dailyRate * r.quantity, 0);
  const suggestedNet = days != null ? dailySubtotal * days : null;
  const suggestedTotal = suggestedNet != null
    ? Math.round(suggestedNet * (1 + VAT_RATE) * 100) / 100
    : null;

  useEffect(() => {
    if (suggestedTotal != null) setFinalTotal(suggestedTotal.toFixed(2));
  }, [suggestedTotal]);

  const toggle = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === rows.length) setSelected(new Set());
    else setSelected(new Set(rows.map((r) => r.key)));
  };

  const handleConfirm = async () => {
    if (!returnDate || selectedRows.length === 0) return;
    setSaving(true);
    try {
      // 1. Create or reuse contract for this finalization
      const { contractId, contractNumber } = await prepareFinalizationContract({
        reservationId: reservation.id,
        reservationDateFrom: reservation.date_from,
        contracts,
      });

      // 2. Update contract with finalization data
      const { error: updErr } = await supabase
        .from('contracts')
        .update({
          contract_number: contractNumber,
          type: 'finalna',
          return_date: returnDate,
          time_to: returnTime || null,
          calculated_days: days,
          final_total: parseFloat(finalTotal) || 0,
          notes: notes || null,
        })
        .eq('id', contractId);
      if (updErr) throw updErr;

      // 3. Insert contract_returned_items rows
      const returnedRows = selectedRows.map((r) => ({
        contract_id: contractId,
        reservation_item_id: r.itemId,
        serial_number: r.serialNumber,
        quantity: r.quantity,
      }));
      const { error: insErr } = await supabase.from('contract_returned_items').insert(returnedRows);
      if (insErr) throw insErr;

      // 4. Build PDF items: filter to only returned items, with adjusted qty + serials
      const pdfItems = (items || [])
        .map((item) => {
          const ownRows = selectedRows.filter((r) => r.itemId === item.id);
          if (ownRows.length === 0) return null;
          const isSerial = ownRows[0].serialNumber != null;
          const qty = isSerial
            ? ownRows.length
            : ownRows.reduce((s, r) => s + r.quantity, 0);
          const serials = isSerial ? ownRows.map((r) => r.serialNumber) : [];
          const lineTotal = (parseFloat(item.daily_rate) || 0) * qty * (days || 0);
          return {
            ...item,
            quantity: qty,
            serial_numbers: serials,
            days: days,
            line_total: lineTotal,
          };
        })
        .filter(Boolean);

      // 5. Generate PDF
      const contractDataForPdf = {
        id: contractId,
        contract_number: contractNumber,
        type: 'finalna',
        time_from: timeFrom,
        time_to: returnTime,
        return_date: returnDate,
        calculated_days: days,
        final_total: parseFloat(finalTotal) || 0,
      };
      const gen = client?.entity_type === 'fo' ? generateAgreementPdf : generateAgreementPdfPO;
      await gen(reservation, pdfItems, client, contractDataForPdf);

      // 6. Auto-complete reservation if everything is now returned
      const remainingAfter = rows.length - selectedRows.length;
      if (remainingAfter === 0) {
        await supabase
          .from('reservations')
          .update({ status: 'completed' })
          .eq('id', reservation.id);
      }

      onFinalized?.();
      onClose();
    } catch (e) {
      alert('Chyba: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow';
  const allSelected = selected.size === rows.length && rows.length > 0;

  return (
    <Modal open={open} onClose={onClose} title="Vrátiť zariadenia" maxWidth="max-w-2xl">
      <div className="space-y-5">
        {/* Items checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-500">Vrátené zariadenia</label>
            {rows.length > 0 && (
              <button
                onClick={toggleAll}
                className="text-xs text-royal-600 hover:text-royal-700 font-medium"
              >
                {allSelected ? 'Zrušiť výber' : 'Vybrať všetko'}
              </button>
            )}
          </div>

          {rows.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Všetky položky sú už vrátené.</p>
          ) : (
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {rows.map((r) => {
                const isSel = selected.has(r.key);
                return (
                  <button
                    key={r.key}
                    onClick={() => toggle(r.key)}
                    type="button"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                      isSel ? 'bg-royal-50/50' : ''
                    }`}
                  >
                    {isSel ? (
                      <CheckSquare className="w-4 h-4 text-royal-500 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{r.equipmentName}</p>
                      {r.serialNumber ? (
                        <p className="text-xs text-gray-500 font-mono">SN: {r.serialNumber}</p>
                      ) : r.quantity > 1 ? (
                        <p className="text-xs text-gray-500">{r.quantity} ks</p>
                      ) : null}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatPrice(r.dailyRate)}/deň
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

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
              Navrhovaná cena: {formatPrice(suggestedTotal)} ({days} dní × {formatPrice(dailySubtotal)}/deň + {Math.round(VAT_RATE * 100)}% DPH)
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
            disabled={saving || !returnDate || !finalTotal || selectedRows.length === 0}
            className="px-5 py-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full text-sm font-semibold shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50"
          >
            {saving ? 'Ukladá sa...' : `Vrátiť ${selectedRows.length} ${selectedRows.length === 1 ? 'položku' : 'položky'} a generovať zmluvu`}
          </button>
        </div>
      </div>
    </Modal>
  );
}
