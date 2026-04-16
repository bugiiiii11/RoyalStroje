import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { supabase } from '../../lib/supabase';

const EMPTY = {
  entity_type: 'po',
  company_name: '',
  contact_person: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postal_code: '',
  ico: '',
  dic: '',
  ic_dph: '',
  birth_date: '',
  id_card_number: '',
  client_type: 'standard',
  notes: '',
};

export default function ClientEditForm({ open, onClose, onSave, client }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && client) {
      setForm({
        entity_type: client.entity_type || 'po',
        company_name: client.company_name || '',
        contact_person: client.contact_person || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        postal_code: client.postal_code || '',
        ico: client.ico || '',
        dic: client.dic || '',
        ic_dph: client.ic_dph || '',
        birth_date: client.birth_date || '',
        id_card_number: client.id_card_number || '',
        client_type: client.client_type || 'standard',
        notes: client.notes || '',
      });
    }
    setError(null);
  }, [open, client]);

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.company_name.trim()) return setError('Meno / názov je povinný');

    const isFO = form.entity_type === 'fo';
    const payload = {
      entity_type: form.entity_type,
      company_name: form.company_name.trim(),
      contact_person: form.contact_person.trim() || null,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      address: form.address.trim() || null,
      city: form.city.trim() || null,
      postal_code: form.postal_code.trim() || null,
      // PO-only fields
      ico: !isFO ? (form.ico.trim() || null) : null,
      dic: !isFO ? (form.dic.trim() || null) : null,
      ic_dph: !isFO ? (form.ic_dph.trim() || null) : null,
      // FO-only fields
      birth_date: isFO ? (form.birth_date || null) : null,
      id_card_number: isFO ? (form.id_card_number.trim() || null) : null,
      client_type: form.client_type,
      notes: form.notes.trim() || null,
    };

    setSaving(true);
    try {
      const { error: err } = await supabase.from('clients').update(payload).eq('id', client.id);
      if (err) throw err;
      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const isFO = form.entity_type === 'fo';
  const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <Modal open={open} onClose={onClose} title="Upraviť klienta" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Entity type + Client type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Typ subjektu *</label>
            <select
              value={form.entity_type}
              onChange={(e) => update('entity_type', e.target.value)}
              className={inputClass}
            >
              <option value="po">Právnická osoba (PO)</option>
              <option value="fo">Fyzická osoba (FO)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Typ klienta</label>
            <select
              value={form.client_type}
              onChange={(e) => update('client_type', e.target.value)}
              className={inputClass}
            >
              <option value="standard">Štandardný</option>
              <option value="royal_card">Royal Card</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        {/* Name + Contact person */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{isFO ? 'Meno a priezvisko *' : 'Názov firmy *'}</label>
            <input
              type="text"
              value={form.company_name}
              onChange={(e) => update('company_name', e.target.value)}
              className={inputClass}
              placeholder={isFO ? 'Ján Novák' : 'ACME s.r.o.'}
            />
          </div>
          {!isFO && (
            <div>
              <label className={labelClass}>Kontaktná osoba</label>
              <input
                type="text"
                value={form.contact_person}
                onChange={(e) => update('contact_person', e.target.value)}
                className={inputClass}
                placeholder="Ján Novák"
              />
            </div>
          )}
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Telefón</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className={inputClass}
              placeholder="+421 900 123 456"
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
              placeholder="info@firma.sk"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>Adresa</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            className={inputClass}
            placeholder="Hlavná 123"
          />
        </div>

        {/* City + Postal code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Mesto</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              className={inputClass}
              placeholder="Bratislava"
            />
          </div>
          <div>
            <label className={labelClass}>PSČ</label>
            <input
              type="text"
              value={form.postal_code}
              onChange={(e) => update('postal_code', e.target.value)}
              className={inputClass}
              placeholder="811 01"
            />
          </div>
        </div>

        {/* PO-only fields */}
        {!isFO && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>IČO</label>
              <input
                type="text"
                value={form.ico}
                onChange={(e) => update('ico', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>DIČ</label>
              <input
                type="text"
                value={form.dic}
                onChange={(e) => update('dic', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>IČ DPH</label>
              <input
                type="text"
                value={form.ic_dph}
                onChange={(e) => update('ic_dph', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* FO-only fields */}
        {isFO && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Dátum narodenia</label>
              <input
                type="date"
                value={form.birth_date}
                onChange={(e) => update('birth_date', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Číslo OP</label>
              <input
                type="text"
                value={form.id_card_number}
                onChange={(e) => update('id_card_number', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className={labelClass}>Poznámky</label>
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            className={inputClass}
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Zrušiť
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 rounded-lg shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Ukladám...' : 'Uložiť zmeny'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
