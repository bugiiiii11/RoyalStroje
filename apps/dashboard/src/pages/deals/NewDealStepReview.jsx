import { useState, useEffect } from 'react';
import StatusBadge from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';
import { formatPrice, formatDate, daysBetween, VAT_RATE, CLIENT_TYPES } from '../../lib/constants';

export default function NewDealStepReview({ dealData, onSubmit, submitting }) {
  const [deliveryRequired, setDeliveryRequired] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [usageLocation, setUsageLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');

  const { client, items, dateFrom, dateTo, timeFrom } = dealData;

  // Fetch contact persons for this client
  useEffect(() => {
    if (!client?.id || client?._isNew) return;
    supabase
      .from('client_contacts')
      .select('*')
      .eq('client_id', client.id)
      .order('is_primary', { ascending: false })
      .then(({ data }) => {
        setContacts(data || []);
        // Auto-select primary contact or client.contact_person
        const primary = (data || []).find((c) => c.is_primary);
        setSelectedContact(primary?.name || client?.contact_person || '');
      });
  }, [client?.id]);
  const days = daysBetween(dateFrom, dateTo);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.daily_rate * i.days, 0);
  const discountPercent = client?.discount_percent || CLIENT_TYPES[client?.client_type]?.discount || 0;
  const discountAmount = Math.round(subtotal * discountPercent / 100 * 100) / 100;
  const deliveryFeeNum = parseFloat(deliveryFee) || 0;
  const vatAmount = Math.round((subtotal - discountAmount + deliveryFeeNum) * VAT_RATE * 100) / 100;
  const total = subtotal - discountAmount + deliveryFeeNum + vatAmount;

  const depositAmountNum = parseFloat(depositAmount) || 0;

  const handleSubmit = () => {
    onSubmit({
      ...dealData,
      deliveryRequired,
      deliveryAddress,
      deliveryFee: deliveryFeeNum,
      usageLocation,
      discountPercent,
      notes,
      depositAmount: depositAmountNum,
      depositRequired: depositAmountNum > 0,
      subtotal,
      discountAmount,
      vatAmount,
      total,
      contactPerson: selectedContact || client?.contact_person || '',
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Súhrn obchodu</h2>
      <p className="text-sm text-gray-500 mb-6">Skontrolujte údaje a potvrďte vytvorenie</p>

      {/* Client */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Klient</p>
        <p className="font-medium text-gray-900">{client?.company_name}</p>
        <p className="text-sm text-gray-500">{client?.contact_person} · {client?.phone || client?.email}</p>
        {discountPercent > 0 && (
          <p className="text-sm text-green-600 mt-1">Zľava: {discountPercent}%</p>
        )}
      </div>

      {/* Contact person selection */}
      {(contacts.length > 1 || (contacts.length === 0 && client?.entity_type === 'po')) && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-4">
          <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Kontaktná osoba (na zmluvu)</label>
          {contacts.length > 0 ? (
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow"
            >
              {contacts.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}{c.position ? ` — ${c.position}` : ''}{c.is_primary ? ' (hlavná)' : ''}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              placeholder="Meno kontaktnej osoby"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow"
            />
          )}
        </div>
      )}

      {/* Dates */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-4">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Termín</p>
        <p className="text-sm text-gray-900">
          {formatDate(dateFrom)}{timeFrom ? ` o ${timeFrom}` : ''} – {formatDate(dateTo)}{' '}
          ({days} {days === 1 ? 'deň' : days < 5 ? 'dni' : 'dní'})
        </p>
      </div>

      {/* Items */}
      <div className="border border-gray-100 rounded-xl shadow-card mb-4">
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Zariadenia ({items.length})</p>
        </div>
        {items.map((item, idx) => (
          <div key={item.is_custom ? `custom-${idx}` : item.equipment_id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 text-sm">
            <div>
              <span className="font-medium text-gray-900">{item.name}</span>
              {item.is_custom && (
                <span className="ml-2 text-[10px] uppercase tracking-wider font-semibold text-royal-600 bg-royal-50 px-1.5 py-0.5 rounded">Vlastný</span>
              )}
              <span className="text-gray-400 ml-2">x{item.quantity}</span>
            </div>
            <span className="font-medium">{formatPrice(item.quantity * item.daily_rate * item.days)}</span>
          </div>
        ))}
      </div>

      {/* Delivery */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-4">
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
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow"
            />
            <div>
              <input
                type="number"
                placeholder="Poplatok za dovoz"
                value={deliveryFee || ''}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Miesto používania PP */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Miesto používania PP</label>
        <input
          placeholder="Adresa, kde bude predmet prenájmu používaný"
          value={usageLocation}
          onChange={(e) => setUsageLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow"
        />
        <p className="text-xs text-gray-400 mt-1">Vyplní sa automaticky do zmluvy</p>
      </div>

      {/* Notes + Zábezpeka */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Poznámky (pre klienta)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Zábezpeka (€)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow"
          />
          <p className="text-xs text-gray-400 mt-1">Záloha prijatá pri prevzatí zariadenia</p>
        </div>
      </div>

      {/* Financials */}
      <div className="border border-gray-100 rounded-xl shadow-card p-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Medzisúčet</span><span>{formatPrice(subtotal)}</span></div>
          {discountPercent > 0 && (
            <div className="flex justify-between text-green-600"><span>Zľava ({discountPercent}%)</span><span>-{formatPrice(discountAmount)}</span></div>
          )}
          {deliveryFeeNum > 0 && (
            <div className="flex justify-between"><span className="text-gray-500">Dovoz</span><span>{formatPrice(deliveryFeeNum)}</span></div>
          )}
          <div className="flex justify-between"><span className="text-gray-500">DPH (23%)</span><span>{formatPrice(vatAmount)}</span></div>
          <div className="flex justify-between pt-2 border-t border-gray-100 text-lg font-bold">
            <span>Celkom</span><span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold py-3 rounded-full shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50"
      >
        {submitting ? 'Vytvára sa...' : 'Vytvoriť obchod'}
      </button>
    </div>
  );
}
