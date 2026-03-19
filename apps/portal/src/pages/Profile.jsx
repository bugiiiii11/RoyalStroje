import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Crown, Save, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { client, user, refetchClient } = useAuth();
  const [form, setForm] = useState({
    company_name: client?.company_name || '',
    contact_person: client?.contact_person || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    city: client?.city || '',
    postal_code: client?.postal_code || '',
    ico: client?.ico || '',
    dic: client?.dic || '',
    ic_dph: client?.ic_dph || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const { error: err } = await supabase
        .from('clients')
        .update(form)
        .eq('id', client.id);
      if (err) throw err;
      await refetchClient();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil</h1>

      {/* Royal Card Status */}
      <div className="bg-gradient-to-r from-royal-500 to-royal-600 rounded-xl p-5 text-white mb-6 shadow-glow">
        <div className="flex items-center gap-3">
          <Crown className="w-8 h-8" />
          <div>
            <h2 className="font-bold text-lg">Royal Card</h2>
            <p className="text-royal-100 text-sm">Zľava 5% · Bez zálohy · Samoobslužný portál</p>
          </div>
        </div>
        <p className="text-xs text-royal-200 mt-3">Člen od: {client?.created_at ? new Date(client.created_at).toLocaleDateString('sk-SK') : '—'}</p>
      </div>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
          <CheckCircle className="w-4 h-4" />Profil bol uložený
        </div>
      )}

      {/* Company Info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 mb-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Firemné údaje</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Názov firmy</label>
            <input value={form.company_name} onChange={(e) => update('company_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Kontaktná osoba</label>
            <input value={form.contact_person} onChange={(e) => update('contact_person', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Telefón</label>
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Adresa</label>
            <input value={form.address} onChange={(e) => update('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Mesto</label>
            <input value={form.city} onChange={(e) => update('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">PSČ</label>
            <input value={form.postal_code} onChange={(e) => update('postal_code', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">IČO</label>
            <input value={form.ico} onChange={(e) => update('ico', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">DIČ</label>
            <input value={form.dic} onChange={(e) => update('dic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">IČ DPH</label>
            <input value={form.ic_dph} onChange={(e) => update('ic_dph', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none" />
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="flex items-center gap-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white font-semibold px-6 py-2.5 rounded-full shadow-glow btn-press transition-all disabled:opacity-50">
        <Save className="w-4 h-4" />
        {saving ? 'Ukladám...' : 'Uložiť zmeny'}
      </button>

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6 mt-6">
        <h2 className="text-sm font-medium text-gray-500 uppercase mb-3">Účet</h2>
        <p className="text-sm text-gray-600">Email: {user?.email}</p>
        <p className="text-xs text-gray-400 mt-1">Pre zmenu hesla kontaktujte info@royalstroje.sk</p>
      </div>
    </div>
  );
}
