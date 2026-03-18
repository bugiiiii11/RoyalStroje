import { useState } from 'react';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatPrice, formatDate, daysBetween, VAT_RATE, CLIENT_TYPES } from '../../lib/constants';

export default function NewDealStepReview({ dealData, onSubmit, submitting }) {
  const [deliveryRequired, setDeliveryRequired] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [notes, setNotes] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const { client, items, dateFrom, dateTo } = dealData;
  const days = daysBetween(dateFrom, dateTo);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.daily_rate * i.days, 0);
  const discountPercent = client?.discount_percent || CLIENT_TYPES[client?.client_type]?.discount || 0;
  const discountAmount = Math.round(subtotal * discountPercent / 100 * 100) / 100;
  const deliveryFeeNum = parseFloat(deliveryFee) || 0;
  const vatAmount = Math.round((subtotal - discountAmount + deliveryFeeNum) * VAT_RATE * 100) / 100;
  const total = subtotal - discountAmount + deliveryFeeNum + vatAmount;

  const handleSubmit = () => {
    onSubmit({
      ...dealData,
      deliveryRequired,
      deliveryAddress,
      deliveryFee: deliveryFeeNum,
      discountPercent,
      notes,
      internalNotes,
      subtotal,
      discountAmount,
      vatAmount,
      total,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Súhrn obchodu</h2>
      <p className="text-sm text-gray-500 mb-6">Skontrolujte údaje a potvrďte vytvorenie</p>

      {/* Client */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Klient</p>
        <p className="font-medium text-gray-900">{client?.company_name}</p>
        <p className="text-sm text-gray-500">{client?.contact_person} · {client?.phone || client?.email}</p>
        {discountPercent > 0 && (
          <p className="text-sm text-green-600 mt-1">Zľava: {discountPercent}%</p>
        )}
      </div>

      {/* Dates */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Termín</p>
        <p className="text-sm text-gray-900">
          {formatDate(dateFrom)} – {formatDate(dateTo)} ({days} {days === 1 ? 'deň' : days < 5 ? 'dni' : 'dní'})
        </p>
      </div>

      {/* Items */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase">Zariadenia ({items.length})</p>
        </div>
        {items.map((item) => (
          <div key={item.equipment_id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 text-sm">
            <div>
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="text-gray-400 ml-2">x{item.quantity}</span>
            </div>
            <span className="font-medium">{formatPrice(item.quantity * item.daily_rate * item.days)}</span>
          </div>
        ))}
      </div>

      {/* Delivery */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={deliveryRequired}
            onChange={(e) => setDeliveryRequired(e.target.checked)}
            className="rounded border-gray-300 text-royal-500 focus:ring-royal-500"
          />
          Dovoz na miesto
        </label>
        {deliveryRequired && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Adresa dovozu"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500"
            />
            <div>
              <input
                type="number"
                placeholder="Poplatok za dovoz"
                value={deliveryFee || ''}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500 w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Poznámky (pre klienta)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Interné poznámky</label>
          <textarea
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>
      </div>

      {/* Financials */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Medzisúčet</span><span>{formatPrice(subtotal)}</span></div>
          {discountPercent > 0 && (
            <div className="flex justify-between text-green-600"><span>Zľava ({discountPercent}%)</span><span>-{formatPrice(discountAmount)}</span></div>
          )}
          {deliveryFeeNum > 0 && (
            <div className="flex justify-between"><span className="text-gray-500">Dovoz</span><span>{formatPrice(deliveryFeeNum)}</span></div>
          )}
          <div className="flex justify-between"><span className="text-gray-500">DPH (23%)</span><span>{formatPrice(vatAmount)}</span></div>
          <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold">
            <span>Celkom</span><span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-royal-500 hover:bg-royal-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {submitting ? 'Vytvára sa...' : 'Vytvoriť obchod'}
      </button>
    </div>
  );
}
