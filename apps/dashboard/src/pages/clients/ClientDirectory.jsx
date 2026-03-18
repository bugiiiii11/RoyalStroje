import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import useClients from '../../hooks/useClients';
import SearchInput from '../../components/ui/SearchInput';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { CLIENT_TYPES } from '../../lib/constants';

const columns = [
  {
    key: 'company_name',
    label: 'Firma',
    sortable: true,
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.company_name}</p>
        {row.ico && <p className="text-xs text-gray-400">IČO: {row.ico}</p>}
      </div>
    ),
  },
  {
    key: 'contact_person',
    label: 'Kontakt',
    render: (row) => row.contact_person || '—',
  },
  {
    key: 'phone',
    label: 'Telefón',
    render: (row) => row.phone || '—',
  },
  {
    key: 'email',
    label: 'Email',
    render: (row) => row.email || '—',
  },
  {
    key: 'client_type',
    label: 'Typ',
    render: (row) => {
      const type = CLIENT_TYPES[row.client_type] || CLIENT_TYPES.standard;
      const colorMap = {
        standard: { bg: 'bg-gray-100', text: 'text-gray-700' },
        royal_card: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
        vip: { bg: 'bg-purple-100', text: 'text-purple-700' },
      };
      const colors = colorMap[row.client_type] || colorMap.standard;
      return <Badge label={type.label} bg={colors.bg} text={colors.text} />;
    },
  },
];

export default function ClientDirectory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: clients, loading } = useClients(search);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Klienti</h1>
        <button
          onClick={() => navigate('/deals/new')}
          className="flex items-center gap-2 bg-royal-500 hover:bg-royal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Nový klient
        </button>
      </div>

      <div className="mb-4 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="Hľadať podľa firmy, kontaktu, IČO..." />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable
          columns={columns}
          data={clients}
          loading={loading}
          onRowClick={(row) => navigate(`/clients/${row.id}`)}
          emptyMessage="Žiadni klienti"
        />
      </div>
    </div>
  );
}
