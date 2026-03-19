import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice } from '../../lib/constants';

const columns = [
  {
    key: 'name',
    label: 'Názov',
    sortable: true,
    width: '30%',
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-400 truncate">{row.description}</p>
      </div>
    ),
  },
  {
    key: 'category',
    label: 'Kategória',
    width: '22%',
    render: (row) => (
      <div>
        <p className="text-sm">{row.equipment_categories?.name || '—'}</p>
        <p className="text-xs text-gray-400">{row.equipment_subcategories?.name || ''}</p>
      </div>
    ),
  },
  {
    key: 'daily_rate_base',
    label: 'Cena/deň',
    sortable: true,
    width: '16%',
    render: (row) => (
      <div>
        <p className="font-medium">{row.pricing_type === 'negotiable' ? 'Na požiadanie' : formatPrice(row.daily_rate_base)}</p>
        {row.pricing_type === 'fixed' && (
          <p className="text-xs text-gray-400">s DPH: {formatPrice(row.daily_rate_vat)}</p>
        )}
      </div>
    ),
  },
  {
    key: 'in_stock',
    label: 'Sklad',
    width: '14%',
    render: (row) => (
      <Badge
        label={row.in_stock ? 'Na sklade' : 'Nedostupné'}
        bg={row.in_stock ? 'bg-green-100' : 'bg-red-100'}
        text={row.in_stock ? 'text-green-700' : 'text-red-700'}
      />
    ),
  },
  {
    key: 'status',
    label: 'Stav',
    width: '12%',
    render: (row) => {
      const map = {
        active: { label: 'Aktívne', bg: 'bg-green-100', text: 'text-green-700' },
        inactive: { label: 'Neaktívne', bg: 'bg-gray-100', text: 'text-gray-700' },
        maintenance: { label: 'Údržba', bg: 'bg-orange-100', text: 'text-orange-700' },
      };
      const s = map[row.status] || map.active;
      return <Badge label={s.label} bg={s.bg} text={s.text} />;
    },
  },
];

export default function EquipmentTable({ data, loading, sortBy, sortAsc, onSort, onRowClick }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      sortBy={sortBy}
      sortAsc={sortAsc}
      onSort={onSort}
      onRowClick={onRowClick}
      emptyMessage="Žiadne zariadenia neboli nájdené"
    />
  );
}
