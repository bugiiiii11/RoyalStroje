import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { VAT_RATE, formatPrice } from '../../lib/constants';
import { buildFinancialSync } from '../../lib/reservationFinance';

const round2 = (n) => Math.round(n * 100) / 100;
const parse = (s) => parseFloat(String(s).replace(',', '.'));

/**
 * Edit the price of an existing finálna zmluva. Net and gross fields are
 * linked both ways — typing into either recomputes the other at 23% VAT.
 * Saving writes contracts.final_total and re-syncs the reservation money
 * fields (sum across all finálne contracts), so the dashboard, reports and
 * the regenerated PDF all agree.
 */
export default function EditFinalPriceModal({ open, onClose, contract, otherFinalsTotal, reservationId, onSaved }) {
  const { user } = useAuth();
  const [net, setNet] = useState('');
  const [gross, setGross] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && contract) {
      const g = parseFloat(contract.final_total) || 0;
      setGross(g.toFixed(2));
      setNet(round2(g / (1 + VAT_RATE)).toFixed(2));
    }
  }, [open, contract]);

  const onNetChange = (value) => {
    setNet(value);
    const n = parse(value);
    setGross(Number.isFinite(n) ? round2(n * (1 + VAT_RATE)).toFixed(2) : '');
  };

  const onGrossChange = (value) => {
    setGross(value);
    const g = parse(value);
    setNet(Number.isFinite(g) ? round2(g / (1 + VAT_RATE)).toFixed(2) : '');
  };

  const grossNum = parse(gross);
  const canSave = Number.isFinite(grossNum) && grossNum >= 0 && !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const newGross = round2(grossNum);
      const oldGross = parseFloat(contract.final_total) || 0;

      const { error: cErr } = await supabase
        .from('contracts')
        .update({ final_total: newGross })
        .eq('id', contract.id);
      if (cErr) throw cErr;

      const { error: rErr } = await supabase
        .from('reservations')
        .update(buildFinancialSync((otherFinalsTotal || 0) + newGross))
        .eq('id', reservationId);
      if (rErr) throw rErr;

      await supabase.rpc('log_activity', {
        p_user_id: user?.id,
        p_action: 'contract.price_updated',
        p_entity_type: 'reservation',
        p_entity_id: reservationId,
        p_details: { contract_number: contract.contract_number, from: oldGross, to: newGross },
      });

      onSaved?.();
      onClose();
    } catch (e) {
      alert('Chyba: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow w-full';

  return (
    <Modal open={open} onClose={onClose} title={`Upraviť cenu — ${contract?.contract_number || ''}`}>
      <div className="space-y-5">
        <p className="text-sm text-gray-500">
          Nová cena sa zapíše do finálnej zmluvy aj do financií obchodu — tržby a reporty sa
          prepočítajú automaticky.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Cena bez DPH (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={net}
              onChange={(e) => onNetChange(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Cena s DPH (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={gross}
              onChange={(e) => onGrossChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Polia sú prepojené — druhé sa dopočíta automaticky ({Math.round(VAT_RATE * 100)}% DPH).
          Pôvodná cena: {formatPrice(parseFloat(contract?.final_total) || 0)} s DPH.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
          >
            Zrušiť
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="px-5 py-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white rounded-full text-sm font-semibold shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50"
          >
            {saving ? 'Ukladá sa...' : 'Uložiť cenu'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
