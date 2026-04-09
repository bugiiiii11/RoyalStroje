import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Check, Building2, User, Plus, Trash2 } from 'lucide-react';
import SearchInput from '../../components/ui/SearchInput';
import useClients from '../../hooks/useClients';
import Badge from '../../components/ui/Badge';
import { CLIENT_TYPES } from '../../lib/constants';
import { supabase } from '../../lib/supabase';

const EMPTY_PO = { company_name: '', email: '', phone: '', ico: '', dic: '', ic_dph: '', address: '', city: '', postal_code: '' };
const EMPTY_FO = { company_name: '', email: '', phone: '', address: '', city: '', postal_code: '', birth_date: '', id_card_number: '' };
const EMPTY_CONTACT = { name: '', phone: '', email: '', position: '' };

export default function NewDealStepClient({ selected, onSelect, onSelectAndNext }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [entityType, setEntityType] = useState('po');
  const [newClient, setNewClient] = useState(EMPTY_PO);
  const [contacts, setContacts] = useState([{ ...EMPTY_CONTACT, is_primary: true }]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const { data: clients, loading } = useClients(search);

  const switchEntityType = (type) => {
    setEntityType(type);
    setNewClient(type === 'po' ? EMPTY_PO : EMPTY_FO);
    setContacts([{ ...EMPTY_CONTACT, is_primary: true }]);
  };

  const addContact = () => {
    if (contacts.length >= 5) return;
    setContacts([...contacts, { ...EMPTY_CONTACT, is_primary: false }]);
  };

  const removeContact = (idx) => {
    if (contacts.length <= 1) return;
    setContacts(contacts.filter((_, i) => i !== idx));
  };

  const updateContact = (idx, field, value) => {
    const updated = [...contacts];
    updated[idx] = { ...updated[idx], [field]: value };
    setContacts(updated);
  };

  const buildClientData = () => {
    const primaryContact = contacts[0];
    const clientData = { ...newClient, _isNew: true, entity_type: entityType, client_type: 'standard', discount_percent: 0 };
    if (entityType === 'po') {
      clientData._contacts = contacts;
      clientData.contact_person = primaryContact?.name || '';
    }
    return clientData;
  };

  const handleCreateDeal = () => {
    if (!newClient.company_name.trim()) return;
    const clientData = buildClientData();
    onSelect(clientData);
    onSelectAndNext?.(clientData);
  };

  const handleSaveClient = async () => {
    if (!newClient.company_name.trim()) return;
    setSaving(true);
    setSaveError('');
    try {
      const isFO = entityType === 'fo';
      const clientPayload = {
        company_name: newClient.company_name,
        email: newClient.email || null,
        phone: newClient.phone || null,
        entity_type: entityType,
        client_type: 'standard',
        discount_percent: 0,
        address: newClient.address || null,
        city: newClient.city || null,
        postal_code: newClient.postal_code || null,
      };
      if (isFO) {
        clientPayload.birth_date = newClient.birth_date || null;
        clientPayload.id_card_number = newClient.id_card_number || null;
      } else {
        clientPayload.contact_person = contacts[0]?.name || null;
        clientPayload.ico = newClient.ico || null;
        clientPayload.dic = newClient.dic || null;
        clientPayload.ic_dph = newClient.ic_dph || null;
      }
      const { data: saved, error: clientErr } = await supabase
        .from('clients')
        .insert(clientPayload)
        .select()
        .single();
      if (clientErr) throw clientErr;

      if (!isFO && contacts.length > 0) {
        const contactsPayload = contacts.map((c, idx) => ({
          client_id: saved.id,
          name: c.name,
          phone: c.phone || null,
          email: c.email || null,
          position: c.position || null,
          is_primary: idx === 0,
        })).filter(c => c.name.trim());
        if (contactsPayload.length > 0) {
          await supabase.from('client_contacts').insert(contactsPayload);
        }
      }
      navigate('/clients');
    } catch (e) {
      setSaveError(e.message || 'Chyba pri ukladaní klienta');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow';

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Vyberte klienta</h2>
      <p className="text-sm text-gray-500 mb-4">Vyhľadajte existujúceho klienta alebo vytvorte nového</p>

      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Hľadať podľa názvu firmy..." />
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Nový klient
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-4 space-y-4">
          {/* FO/PO Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchEntityType('po')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                entityType === 'po'
                  ? 'bg-royal-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Firma (PO)
            </button>
            <button
              onClick={() => switchEntityType('fo')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                entityType === 'fo'
                  ? 'bg-royal-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User className="w-4 h-4" />
              Fyzická osoba (FO)
            </button>
          </div>

          {entityType === 'po' ? (
            /* PO Form */
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Nová firma</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Obchodné meno *" value={newClient.company_name}
                  onChange={(e) => setNewClient(p => ({ ...p, company_name: e.target.value }))} className={inputClass} />
                <input placeholder="Email firmy" type="email" value={newClient.email}
                  onChange={(e) => setNewClient(p => ({ ...p, email: e.target.value }))} className={inputClass} />
                <input placeholder="IČO" value={newClient.ico}
                  onChange={(e) => setNewClient(p => ({ ...p, ico: e.target.value }))} className={inputClass} />
                <input placeholder="DIČ" value={newClient.dic}
                  onChange={(e) => setNewClient(p => ({ ...p, dic: e.target.value }))} className={inputClass} />
                <input placeholder="IČ DPH" value={newClient.ic_dph}
                  onChange={(e) => setNewClient(p => ({ ...p, ic_dph: e.target.value }))} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input placeholder="Ulica a číslo" value={newClient.address}
                  onChange={(e) => setNewClient(p => ({ ...p, address: e.target.value }))} className={inputClass} />
                <input placeholder="Mesto" value={newClient.city}
                  onChange={(e) => setNewClient(p => ({ ...p, city: e.target.value }))} className={inputClass} />
                <input placeholder="PSČ" value={newClient.postal_code}
                  onChange={(e) => setNewClient(p => ({ ...p, postal_code: e.target.value }))} className={inputClass} />
              </div>

              {/* Kontaktné osoby */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Kontaktné osoby ({contacts.length}/5)</h4>
                  {contacts.length < 5 && (
                    <button onClick={addContact} className="flex items-center gap-1 text-xs text-royal-600 hover:text-royal-700 font-medium">
                      <Plus className="w-3 h-3" /> Pridať osobu
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {contacts.map((contact, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">
                          {idx === 0 ? 'Primárny kontakt *' : `Kontakt ${idx + 1}`}
                        </span>
                        {idx > 0 && (
                          <button onClick={() => removeContact(idx)} className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Meno a priezvisko *" value={contact.name}
                          onChange={(e) => updateContact(idx, 'name', e.target.value)} className={`${inputClass} col-span-2`} />
                        <input placeholder="Pozícia (napr. konateľ)" value={contact.position}
                          onChange={(e) => updateContact(idx, 'position', e.target.value)} className={inputClass} />
                        <input placeholder="Telefón" value={contact.phone}
                          onChange={(e) => updateContact(idx, 'phone', e.target.value)} className={inputClass} />
                        <input placeholder="Email" type="email" value={contact.email}
                          onChange={(e) => updateContact(idx, 'email', e.target.value)} className={`${inputClass} col-span-2`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* FO Form */
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Nová fyzická osoba</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Meno a priezvisko *" value={newClient.company_name}
                  onChange={(e) => setNewClient(p => ({ ...p, company_name: e.target.value }))} className={inputClass} />
                <input placeholder="Telefón" value={newClient.phone}
                  onChange={(e) => setNewClient(p => ({ ...p, phone: e.target.value }))} className={inputClass} />
                <input placeholder="Email" type="email" value={newClient.email}
                  onChange={(e) => setNewClient(p => ({ ...p, email: e.target.value }))} className={inputClass} />
                <input placeholder="Dátum narodenia" type="date" value={newClient.birth_date}
                  onChange={(e) => setNewClient(p => ({ ...p, birth_date: e.target.value }))} className={inputClass} />
                <input placeholder="Číslo OP / pasu" value={newClient.id_card_number}
                  onChange={(e) => setNewClient(p => ({ ...p, id_card_number: e.target.value }))} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input placeholder="Adresa trvalého bydliska" value={newClient.address}
                  onChange={(e) => setNewClient(p => ({ ...p, address: e.target.value }))} className={inputClass} />
                <input placeholder="Mesto" value={newClient.city}
                  onChange={(e) => setNewClient(p => ({ ...p, city: e.target.value }))} className={inputClass} />
                <input placeholder="PSČ" value={newClient.postal_code}
                  onChange={(e) => setNewClient(p => ({ ...p, postal_code: e.target.value }))} className={inputClass} />
              </div>
            </div>
          )}

          {saveError && (
            <p className="text-xs text-red-600">{saveError}</p>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleCreateDeal}
              disabled={!newClient.company_name.trim()}
              className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-glow hover:shadow-glow-md disabled:opacity-50 transition-all btn-press"
            >
              Vytvoriť obchod
            </button>
            <button
              onClick={handleSaveClient}
              disabled={!newClient.company_name.trim() || saving}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Ukladám...' : 'Uložiť klienta'}
            </button>
          </div>
        </div>
      )}

      {!showNew && <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {loading && <p className="text-sm text-gray-400 py-4 text-center">Načítavam...</p>}
        {!loading && clients?.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">Žiadni klienti nenájdení</p>
        )}
        {(clients || []).map((client) => {
          const isSelected = selected?.id === client.id;
          const typeInfo = CLIENT_TYPES[client.client_type] || CLIENT_TYPES.standard;
          const isFO = client.entity_type === 'fo';
          return (
            <div
              key={client.id}
              onClick={() => onSelect(client)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected ? 'border-royal-500 bg-royal-50 ring-1 ring-royal-500' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {isFO ? <User className="w-4 h-4 text-gray-400" /> : <Building2 className="w-4 h-4 text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900">{client.company_name}</p>
                  <p className="text-xs text-gray-500">
                    {isFO ? (client.phone || client.email || '—') : `${client.contact_person || '—'} · ${client.phone || client.email || '—'}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  label={isFO ? 'FO' : 'PO'}
                  bg={isFO ? 'bg-blue-50' : 'bg-gray-100'}
                  text={isFO ? 'text-blue-600' : 'text-gray-600'}
                />
                <Badge label={typeInfo.label} bg="bg-gray-100" text="text-gray-600" />
                {isSelected && <Check className="w-5 h-5 text-royal-500" />}
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
}
