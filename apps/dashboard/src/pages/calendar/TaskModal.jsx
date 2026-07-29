import { useState } from 'react';
import { Trash2, Check } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { HOURS, TASK_COLORS, TASK_COLOR_KEYS, formatHour, clampHour } from '../../lib/calendar';

const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

// Edit / create a dispatcher task. `task` = existing row, or {task_date, start_hour}
// defaults. Mount conditionally with a `key` so the form re-initialises per task.
export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const isNew = !task?.id;
  const [form, setForm] = useState(() => ({
    title: task.title || '',
    note: task.note || '',
    task_date: task.task_date,
    start_hour: clampHour(task.start_hour),
    color: task.color || 'neutral',
    done: !!task.done,
  }));
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    await onSave({ ...form, title: form.title.trim(), note: form.note.trim() || null });
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    setSaving(true);
    await onDelete(task.id);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={isNew ? 'Nová úloha' : 'Upraviť úlohu'}>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className={labelClass}>Úloha *</label>
          <input
            type="text"
            autoFocus
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="napr. Volal Novák – vráti bager"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Dátum</label>
            <input
              type="date"
              value={form.task_date}
              onChange={(e) => update('task_date', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hodina</label>
            <select
              value={form.start_hour}
              onChange={(e) => update('start_hour', Number(e.target.value))}
              className={inputClass}
            >
              {HOURS.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Farba</label>
          <div className="flex items-center gap-2">
            {TASK_COLOR_KEYS.map((key) => {
              const c = TASK_COLORS[key];
              const active = form.color === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => update('color', key)}
                  title={c.label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    active ? 'ring-2 ring-offset-2 ring-royal-500 scale-105' : 'hover:scale-105'
                  } ${c.chip} border-l-[3px]`}
                >
                  <span className={`w-3 h-3 rounded-full ${c.dot}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelClass}>Poznámka</label>
          <textarea
            rows={3}
            value={form.note}
            onChange={(e) => update('note', e.target.value)}
            placeholder="Detaily, telefón, adresa…"
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="button"
          onClick={() => update('done', !form.done)}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            form.done
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className={`w-5 h-5 rounded-md flex items-center justify-center border ${
            form.done ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
          }`}>
            {form.done && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
          </span>
          {form.done ? 'Ukončené' : 'Označiť ako ukončené'}
        </button>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {!isNew ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Zmazať
            </button>
          ) : <span />}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              Zrušiť
            </button>
            <button
              type="submit"
              disabled={saving || !form.title.trim()}
              className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-glow transition-all btn-press disabled:opacity-50"
            >
              {saving ? 'Ukladám…' : 'Uložiť'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
