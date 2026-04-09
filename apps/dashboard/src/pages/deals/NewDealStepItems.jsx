import { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import SearchInput from '../../components/ui/SearchInput';
import useEquipment from '../../hooks/useEquipment';
import { formatPrice, daysBetween } from '../../lib/constants';

export default function NewDealStepItems({ dateFrom, dateTo, timeFrom, items, onDatesChange, onTimeFromChange, onItemsChange }) {
  const [search, setSearch] = useState('');
  const { data: equipment, loading } = useEquipment({ search, pageSize: 50 });
  const days = daysBetween(dateFrom, dateTo);

  const addItem = (eq) => {
    if (items.find((i) => i.equipment_id === eq.id)) return;
    onItemsChange([...items, {
      equipment_id: eq.id,
      name: eq.name,
      daily_rate: eq.daily_rate_base,
      quantity: 1,
      days,
    }]);
  };

  const updateQty = (idx, delta) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], quantity: Math.max(1, updated[idx].quantity + delta) };
    onItemsChange(updated);
  };

  const removeItem = (idx) => {
    onItemsChange(items.filter((_, i) => i !== idx));
  };

  // When dateFrom changes, auto-set dateTo = dateFrom + 1 day (návrh = 1 deň)
  const handleDateFromChange = (value) => {
    let autoDateTo = '';
    if (value) {
      const d = new Date(value + 'T00:00:00');
      d.setDate(d.getDate() + 1);
      autoDateTo = d.toISOString().split('T')[0];
    }
    onDatesChange(value, autoDateTo);
    const newDays = daysBetween(value, autoDateTo);
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
        {dateTo && (
          <div className="flex items-end">
            <span className="text-sm text-gray-400 pb-2">Predpokladaný návrat: <span className="text-gray-600 font-medium">{dateTo}</span> (1 deň — návrh)</span>
          </div>
        )}
      </div>

      {/* Equipment Search */}
      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Hľadať zariadenie na pridanie..." />
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
          {items.map((item, idx) => (
            <div key={item.equipment_id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-400">{formatPrice(item.daily_rate)} x {item.days} dní</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQty(idx, -1)} className="p-1 hover:bg-gray-100 rounded">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(idx, 1)} className="p-1 hover:bg-gray-100 rounded">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-sm font-semibold w-20 text-right">
                  {formatPrice(item.quantity * item.daily_rate * item.days)}
                </span>
                <button onClick={() => removeItem(idx)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
            <span className="text-sm font-medium text-gray-700">Medzisúčet</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
