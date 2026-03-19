import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import useEquipment from '../../hooks/useEquipment';
import EquipmentFilters from './EquipmentFilters';
import EquipmentTable from './EquipmentTable';
import EquipmentGrid from './EquipmentGrid';
import EquipmentDetail from './EquipmentDetail';
import Pagination from '../../components/ui/Pagination';

export default function EquipmentCatalog() {
  const [filters, setFilters] = useState({ search: '', categoryId: null, status: null, inStock: null, page: 1, sortBy: 'name', sortAsc: true });
  const [viewMode, setViewMode] = useState('table');
  const [selectedItem, setSelectedItem] = useState(null);

  const { data, loading } = useEquipment(filters);

  const handleSort = (key) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: key,
      sortAsc: prev.sortBy === key ? !prev.sortAsc : true,
    }));
  };

  const totalPages = data ? Math.ceil(data.length / 20) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Katalóg zariadení</h1>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-royal-50 text-royal-600 shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-royal-50 text-royal-600 shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <EquipmentFilters filters={filters} onChange={setFilters} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-card">
        {viewMode === 'table' ? (
          <EquipmentTable
            data={data}
            loading={loading}
            sortBy={filters.sortBy}
            sortAsc={filters.sortAsc}
            onSort={handleSort}
            onRowClick={setSelectedItem}
          />
        ) : (
          <div className="p-4">
            <EquipmentGrid data={data} loading={loading} onItemClick={setSelectedItem} />
          </div>
        )}
        <Pagination page={filters.page} totalPages={totalPages} onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))} />
      </div>

      <EquipmentDetail item={selectedItem} open={!!selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
