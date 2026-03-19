import { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';
import SearchInput from '../../components/ui/SearchInput';
import useClients from '../../hooks/useClients';
import Badge from '../../components/ui/Badge';
import { CLIENT_TYPES } from '../../lib/constants';

export default function NewDealStepClient({ selected, onSelect }) {
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [newClient, setNewClient] = useState({ company_name: '', contact_person: '', email: '', phone: '' });
  const { data: clients, loading } = useClients(search);

  const handleNewClient = () => {
    if (!newClient.company_name.trim()) return;
    onSelect({ ...newClient, _isNew: true, client_type: 'standard', discount_percent: 0 });
  };

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
        <div className="bg-white rounded-xl border border-gray-100 shadow-card p-4 mb-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Nový klient</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Názov firmy *"
              value={newClient.company_name}
              onChange={(e) => setNewClient(p => ({ ...p, company_name: e.target.value }))}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
            />
            <input
              placeholder="Kontaktná osoba"
              value={newClient.contact_person}
              onChange={(e) => setNewClient(p => ({ ...p, contact_person: e.target.value }))}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
            />
            <input
              placeholder="Email"
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient(p => ({ ...p, email: e.target.value }))}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
            />
            <input
              placeholder="Telefón"
              value={newClient.phone}
              onChange={(e) => setNewClient(p => ({ ...p, phone: e.target.value }))}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
            />
          </div>
          <button
            onClick={handleNewClient}
            disabled={!newClient.company_name.trim()}
            className="bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-glow hover:shadow-glow-md disabled:opacity-50 transition-all btn-press"
          >
            Vybrať nového klienta
          </button>
        </div>
      )}

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {loading && <p className="text-sm text-gray-400 py-4 text-center">Načítavam...</p>}
        {!loading && clients?.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">Žiadni klienti nenájdení</p>
        )}
        {(clients || []).map((client) => {
          const isSelected = selected?.id === client.id;
          const typeInfo = CLIENT_TYPES[client.client_type] || CLIENT_TYPES.standard;
          return (
            <div
              key={client.id}
              onClick={() => onSelect(client)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected ? 'border-royal-500 bg-royal-50 ring-1 ring-royal-500' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div>
                <p className="font-medium text-gray-900">{client.company_name}</p>
                <p className="text-xs text-gray-500">
                  {client.contact_person || '—'} · {client.phone || client.email || '—'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={typeInfo.label} bg="bg-gray-100" text="text-gray-600" />
                {isSelected && <Check className="w-5 h-5 text-royal-500" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
