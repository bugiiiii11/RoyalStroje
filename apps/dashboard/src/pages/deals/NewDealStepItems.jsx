import { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import SearchInput from '../../components/ui/SearchInput';
import useEquipment from '../../hooks/useEquipment';
import { supabase } from '../../lib/supabase';
import { formatPrice, daysBetween } from '../../lib/constants';

const RATE_UNIT_OPTIONS = [
  { value: 'deň', label: 'Denná' },
  { value: 'mm', label: 'mm' },
  { value: 'hod', label: 'Hodinová' },
];

const emptyCustomForm = { name: '', serial: '', rate_unit: 'deň', daily_rate: '' };

export default function NewDealStepItems({ dateFrom, dateTo, timeFrom, items, onDatesChange, onTimeFromChange, onItemsChange }) {
  const [search, setSearch] = useState('');
  const { data: equipment, loading } = useEquipment({ search, pageSize: 50 });
  const days = daysBetween(dateFrom, dateTo);
  const [newSerialInputs, setNewSerialInputs] = useState({}); // { "itemIdx-slotIdx": "value" }
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customForm, setCustomForm] = useState(emptyCustomForm);

  const addItem = (eq) => {
    if (items.find((i) => i.equipment_id === eq.id)) return;
    const availableSerials = Array.isArray(eq.serial_numbers) ? eq.serial_numbers : [];
    onItemsChange([...items, {
      equipment_id: eq.id,
      name: eq.name,
      daily_rate: eq.daily_rate_base,
      quantity: 1,
      days,
      available_serials: availableSerials,
      serial_numbers: availableSerials.length === 1 ? [availableSerials[0]] : [''],
    }]);
  };

  const addCustomItem = () => {
    const name = customForm.name.trim();
    const rate = parseFloat(customForm.daily_rate);
    if (!name || !(rate >= 0)) return;
    onItemsChange([...items, {
      equipment_id: null,
      is_custom: true,
      name,
      custom_rate_unit: customForm.rate_unit,
      daily_rate: rate,
      quantity: 1,
      days,
      available_serials: [],
      serial_numbers: [customForm.serial.trim()].filter(Boolean),
    }]);
    setCustomForm(emptyCustomForm);
    setShowCustomForm(false);
  };

  const updateCustomSerial = (idx, value) => {
    const updated = [...items];
    const item = { ...updated[idx], serial_numbers: [value] };
    updated[idx] = item;
    onItemsChange(updated);
  };

  const updateSerial = (itemIdx, slotIdx, value) => {
    const updated = [...items];
    const item = { ...updated[itemIdx] };
    const serials = [...(item.serial_numbers || [])];
    serials[slotIdx] = value;
    item.serial_numbers = serials;
    updated[itemIdx] = item;
    onItemsChange(updated);
  };

  // Add a new serial number to the equipment (saves to DB) and select it
  const addNewSerial = async (itemIdx, slotIdx) => {
    const key = `${itemIdx}-${slotIdx}`;
    const value = (newSerialInputs[key] || '').trim();
    if (!value) return;

    const updated = [...items];
    const item = { ...updated[itemIdx] };

    // Check for duplicates
    if (item.available_serials.includes(value)) {
      updateSerial(itemIdx, slotIdx, value);
      setNewSerialInputs((prev) => ({ ...prev, [key]: '' }));
      return;
    }

    // Save to equipment in DB
    const newSerials = [...item.available_serials, value];
    await supabase
      .from('equipment')
      .update({ serial_numbers: newSerials })
      .eq('id', item.equipment_id);

    // Update local state
    item.available_serials = newSerials;
    const serials = [...(item.serial_numbers || [])];
    serials[slotIdx] = value;
    item.serial_numbers = serials;
    updated[itemIdx] = item;
    onItemsChange(updated);
    setNewSerialInputs((prev) => ({ ...prev, [key]: '' }));
  };

  const updateQty = (idx, delta) => {
    const updated = [...items];
    const item = { ...updated[idx] };
    const newQty = Math.max(1, item.quantity + delta);
    item.quantity = newQty;
    // Resize serial_numbers array to match quantity (trim or pad with '')
    const serials = [...(item.serial_numbers || [])];
    while (serials.length < newQty) serials.push('');
    item.serial_numbers = serials.slice(0, newQty);
    updated[idx] = item;
    onItemsChange(updated);
  };

  const removeItem = (idx) => {
    onItemsChange(items.filter((_, i) => i !== idx));
  };

  const localDateStr = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  // When dateFrom changes, auto-set dateTo = dateFrom + 1 day as default
  const handleDateFromChange = (value) => {
    let autoDateTo = '';
    if (value) {
      const d = new Date(value + 'T00:00:00');
      d.setDate(d.getDate() + 1);
      autoDateTo = localDateStr(d);
    }
    onDatesChange(value, autoDateTo);
    const newDays = daysBetween(value, autoDateTo);
    if (newDays > 0) {
      onItemsChange(items.map((i) => ({ ...i, days: newDays })));
    }
  };

  const handleDateToChange = (value) => {
    onDatesChange(dateFrom, value);
    const newDays = daysBetween(dateFrom, value);
    if (newDays > 0) {
      onItemsChange(items.map((i) => ({ ...i, days: newDays })));
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.daily_rate * i.days, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Zariadenia a termín</h2>
      <p className="text-sm text-gray-500 mb-4">Vyberte dátumy a pridajte zariadenia</p>

      {/* Date Range */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Dátum od</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => handleDateFromChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Čas vyzdvihnutia</label>
          <input
            type="time"
            value={timeFrom}
            onChange={(e) => onTimeFromChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Dátum do</label>
          <input
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={(e) => handleDateToChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
          />
        </div>
      </div>

      {/* Equipment Search */}
      <div className="mb-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Hľadať zariadenie na pridanie..." />
      </div>

      {/* Custom (ad-hoc) item — toggle + inline form */}
      <div className="mb-4">
        {!showCustomForm ? (
          <button
            type="button"
            onClick={() => setShowCustomForm(true)}
            className="text-sm text-royal-600 hover:text-royal-700 font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Pridať vlastný stroj (mimo katalógu)
          </button>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50/50">
            <p className="text-xs font-medium text-gray-500 uppercase mb-3">Vlastný stroj</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Názov stroja</label>
                <input
                  type="text"
                  value={customForm.name}
                  onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                  placeholder="napr. Makita VC2512L"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Výrobné číslo</label>
                <input
                  type="text"
                  value={customForm.serial}
                  onChange={(e) => setCustomForm({ ...customForm, serial: e.target.value })}
                  placeholder="(voliteľné)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Druh sadzby</label>
                <select
                  value={customForm.rate_unit}
                  onChange={(e) => setCustomForm({ ...customForm, rate_unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none"
                >
                  {RATE_UNIT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Cena bez DPH (€)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customForm.daily_rate}
                  onChange={(e) => setCustomForm({ ...customForm, daily_rate: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setShowCustomForm(false); setCustomForm(emptyCustomForm); }}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Zrušiť
              </button>
              <button
                type="button"
                onClick={addCustomItem}
                disabled={!customForm.name.trim() || !customForm.daily_rate}
                className="px-3 py-1.5 text-xs font-medium text-white bg-royal-500 hover:bg-royal-600 rounded-lg disabled:opacity-50 transition-colors"
              >
                Pridať do obchodu
              </button>
            </div>
          </div>
        )}
      </div>

      {search && (
        <div className="border border-gray-100 rounded-xl shadow-card mb-6 max-h-[200px] overflow-y-auto">
          {loading && <p className="text-sm text-gray-400 p-3">Načítavam...</p>}
          {!loading && equipment?.length === 0 && (
            <p className="text-sm text-gray-400 p-3">Nič nenájdené</p>
          )}
          {(equipment || []).filter(eq => eq.pricing_type === 'fixed' && eq.in_stock).map((eq) => {
            const alreadyAdded = items.some((i) => i.equipment_id === eq.id);
            return (
              <div
                key={eq.id}
                onClick={() => !alreadyAdded && addItem(eq)}
                className={`flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-0 ${
                  alreadyAdded ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{eq.name}</p>
                  <p className="text-xs text-gray-400">{eq.equipment_categories?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{formatPrice(eq.daily_rate_base)}/deň</span>
                  {!alreadyAdded && <Plus className="w-4 h-4 text-royal-500" />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Items */}
      {items.length > 0 && (
        <div className="border border-gray-100 rounded-xl shadow-card">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase">Vybrané zariadenia ({items.length})</p>
          </div>
          {items.map((item, idx) => {
            const availableSerials = item.available_serials || [];
            // Serials already picked for OTHER slots of this item
            const usedSerials = (item.serial_numbers || []).filter(Boolean);
            const isCustom = !!item.is_custom;
            return (
              <div key={isCustom ? `custom-${idx}` : item.equipment_id} className="border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                      {isCustom && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider font-semibold text-royal-600 bg-royal-50 px-1.5 py-0.5 rounded">
                          Vlastný
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">{formatPrice(item.daily_rate)} x {item.days} dní</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {!isCustom && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(idx, -1)} className="p-1 hover:bg-gray-100 rounded">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(idx, 1)} className="p-1 hover:bg-gray-100 rounded">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {isCustom && (
                      <span className="text-xs text-gray-400 w-16 text-center">1 ks</span>
                    )}
                    <span className="text-sm font-semibold w-20 text-right">
                      {formatPrice(item.quantity * item.daily_rate * item.days)}
                    </span>
                    <button onClick={() => removeItem(idx)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Serial number pickers — always visible */}
                <div className="px-4 pb-3 space-y-1.5">
                  {isCustom ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-16 shrink-0">Výr. č.:</span>
                      <input
                        type="text"
                        value={item.serial_numbers?.[0] || ''}
                        onChange={(e) => updateCustomSerial(idx, e.target.value)}
                        placeholder="(voliteľné)"
                        className="flex-1 px-2 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none"
                      />
                    </div>
                  ) : (
                  Array.from({ length: item.quantity }).map((_, slotIdx) => {
                    const currentVal = item.serial_numbers?.[slotIdx] || '';
                    const inputKey = `${idx}-${slotIdx}`;
                    const isAddingNew = newSerialInputs[inputKey] !== undefined && newSerialInputs[inputKey] !== null;
                    return (
                      <div key={slotIdx}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-16 shrink-0">
                            {item.quantity > 1 ? `Kus ${slotIdx + 1}:` : 'Výr. č.:'}
                          </span>
                          {availableSerials.length > 0 ? (
                            <select
                              value={currentVal}
                              onChange={(e) => {
                                if (e.target.value === '__new__') {
                                  setNewSerialInputs((prev) => ({ ...prev, [inputKey]: '' }));
                                } else {
                                  updateSerial(idx, slotIdx, e.target.value);
                                  setNewSerialInputs((prev) => { const n = { ...prev }; delete n[inputKey]; return n; });
                                }
                              }}
                              className="flex-1 px-2 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none"
                            >
                              <option value="">— Bez výrobného čísla —</option>
                              {availableSerials.map((sn) => {
                                const usedElsewhere = usedSerials.includes(sn) && currentVal !== sn;
                                return (
                                  <option key={sn} value={sn} disabled={usedElsewhere}>{sn}</option>
                                );
                              })}
                              <option value="__new__">+ Pridať nové číslo...</option>
                            </select>
                          ) : (
                            <div className="flex-1 flex items-center gap-1.5">
                              {!isAddingNew ? (
                                <button
                                  type="button"
                                  onClick={() => setNewSerialInputs((prev) => ({ ...prev, [inputKey]: '' }))}
                                  className="px-2 py-1 text-xs text-royal-500 hover:bg-royal-50 border border-dashed border-gray-300 rounded-lg transition-colors"
                                >
                                  + Pridať výrobné číslo
                                </button>
                              ) : null}
                            </div>
                          )}
                        </div>
                        {/* Inline input for adding new serial number */}
                        {isAddingNew && (
                          <div className="flex items-center gap-2 mt-1.5 ml-[4.5rem]">
                            <input
                              type="text"
                              value={newSerialInputs[inputKey] || ''}
                              onChange={(e) => setNewSerialInputs((prev) => ({ ...prev, [inputKey]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNewSerial(idx, slotIdx); } }}
                              placeholder="Zadajte výrobné číslo"
                              className="flex-1 px-2 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => addNewSerial(idx, slotIdx)}
                              className="px-2 py-1 text-xs font-medium text-white bg-royal-500 hover:bg-royal-600 rounded-lg transition-colors"
                            >
                              Pridať
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewSerialInputs((prev) => { const n = { ...prev }; delete n[inputKey]; return n; });
                                if (availableSerials.length > 0) updateSerial(idx, slotIdx, '');
                              }}
                              className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              Zrušiť
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                  )}
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
            <span className="text-sm font-medium text-gray-700">Medzisúčet</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
