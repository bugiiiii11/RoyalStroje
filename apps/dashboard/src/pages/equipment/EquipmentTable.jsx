import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import { formatPrice } from '../../lib/constants';
import { Pencil, Trash2, PackageX, PackageCheck, EyeOff, Eye } from 'lucide-react';

export default function EquipmentTable({ data, loading, sortBy, sortAsc, onSort, onRowClick, onEdit, onDelete, onToggleStock, onToggleAvailability, confirmDeleteId }) {
  const columns = [
    {
      key: 'name',
      label: 'Názov',
      sortable: true,
      width: '25%',
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
      width: '16%',
      render: (row) => (
        <div>
          <p className="text-sm">{row.equipment_categories?.name || '—'}</p>
          <p className="text-xs text-gray-400">{row.equipment_subcategories?.name || ''}</p>
        </div>
      ),
    },
    {
      key: '_serial',
      label: 'Výrobné číslo',
      width: '14%',
      render: (row) => (
        <span className="text-sm font-mono text-gray-700">{row._serial || '—'}</span>
      ),
    },
    {
      key: 'daily_rate_base',
      label: 'Cena/deň',
      sortable: true,
      width: '14%',
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
      width: '12%',
      render: (row) => {
        if (row.status === 'inactive') {
          return <Badge label="Nedostupné" bg="bg-gray-100" text="text-gray-500" />;
        }
        return (
          <Badge
            label={row._rented ? 'Požičané' : 'Na sklade'}
            bg={row._rented ? 'bg-orange-100' : 'bg-green-100'}
            text={row._rented ? 'text-orange-700' : 'text-green-700'}
          />
        );
      },
    },
    {
      key: 'actions',
      label: '',
      width: '12%',
      render: (row) => (
        <div className="flex items-center gap-1 justify-end" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit?.(row)}
            className="p-1.5 text-gray-400 hover:text-royal-600 hover:bg-royal-50 rounded-lg transition-colors"
            title="Upraviť"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {row._serial && (
            <button
              onClick={() => onToggleStock?.(row)}
              className={`p-1.5 rounded-lg transition-colors ${
                row._rented
                  ? 'text-orange-500 hover:text-green-600 hover:bg-green-50'
                  : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
              }`}
              title={row._rented ? 'Označiť ako na sklade' : 'Označiť ako požičané'}
            >
              {row._rented ? <PackageCheck className="w-4 h-4" /> : <PackageX className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={() => onToggleAvailability?.(row)}
            className={`p-1.5 rounded-lg transition-colors ${
              row.status === 'inactive'
                ? 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title={row.status === 'inactive' ? 'Sprístupniť na webe' : 'Označiť ako nedostupné'}
          >
            {row.status === 'inactive' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onDelete?.(row)}
            className={`p-1.5 rounded-lg transition-colors ${
              confirmDeleteId === row.id
                ? 'text-white bg-red-500 hover:bg-red-600'
                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
            }`}
            title={confirmDeleteId === row.id ? 'Potvrdiť odstránenie' : 'Odstrániť'}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

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
