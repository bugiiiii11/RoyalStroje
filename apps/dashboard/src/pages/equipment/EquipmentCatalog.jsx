import { useState, useMemo } from 'react';
import { LayoutGrid, List, Plus, Download } from 'lucide-react';
import useEquipment, { deleteEquipment, toggleSerialRented, updateEquipmentStatus, exportEquipmentCsv } from '../../hooks/useEquipment';
import EquipmentFilters from './EquipmentFilters';
import EquipmentTable from './EquipmentTable';
import EquipmentGrid from './EquipmentGrid';
import EquipmentDetail from './EquipmentDetail';
import EquipmentForm from './EquipmentForm';
import Pagination from '../../components/ui/Pagination';

export default function EquipmentCatalog() {
  const [filters, setFilters] = useState({ search: '', categoryId: null, skladFilter: null, page: 1, sortBy: 'name', sortAsc: true });
  const [viewMode, setViewMode] = useState('table');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [exporting, setExporting] = useState(false);

  const { data, loading, refetch, totalPages } = useEquipment(filters);

  // Expand equipment into rows per serial number
  const expandedData = useMemo(() => {
    if (!data) return null;
    const rows = [];
    data.forEach((eq) => {
      const serials = Array.isArray(eq.serial_numbers) ? eq.serial_numbers.filter(Boolean) : [];
      const rented = Array.isArray(eq.rented_serials) ? eq.rented_serials : [];
      if (serials.length === 0) {
        // No serial numbers — single row with empty serial
        rows.push({ ...eq, _serial: '', _rented: false, _rowKey: eq.id });
      } else {
        serials.forEach((sn) => {
          const isRented = rented.includes(sn);
          rows.push({ ...eq, _serial: sn, _rented: isRented, _rowKey: `${eq.id}:${sn}` });
        });
      }
    });
    // Apply sklad filter
    if (filters.skladFilter === 'na_sklade') {
      return rows.filter((r) => !r._rented && r.status !== 'inactive');
    }
    if (filters.skladFilter === 'pozicane') {
      return rows.filter((r) => r._rented);
    }
    if (filters.skladFilter === 'nedostupne') {
      return rows.filter((r) => r.status === 'inactive');
    }
    return rows;
  }, [data, filters.skladFilter]);

  const handleSort = (key) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: key,
      sortAsc: prev.sortBy === key ? !prev.sortAsc : true,
    }));
  };

  const handleEdit = (item) => {
    setSelectedItem(null);
    setEditItem(item);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setFormOpen(true);
  };

  const handleDelete = async (item) => {
    if (confirmDelete?.id === item.id) {
      try {
        await deleteEquipment(item.id);
        setConfirmDelete(null);
        setSelectedItem(null);
        refetch();
      } catch {
        alert('Chyba pri mazaní zariadenia');
      }
    } else {
      setConfirmDelete(item);
    }
  };

  const handleToggleStock = async (item) => {
    if (!item._serial) return; // Cannot toggle items without serial number
    try {
      await toggleSerialRented(item.id, item._serial, item._rented, item.rented_serials);
      refetch();
    } catch {
      alert('Chyba pri zmene dostupnosti');
    }
  };

  const handleToggleAvailability = async (item) => {
    const newStatus = item.status === 'inactive' ? 'active' : 'inactive';
    try {
      await updateEquipmentStatus(item.id, newStatus);
      refetch();
    } catch {
      alert('Chyba pri zmene dostupnosti');
    }
  };

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      await exportEquipmentCsv();
    } catch {
      alert('Chyba pri exporte CSV');
    } finally {
      setExporting(false);
    }
  };

  const handleFormSave = () => {
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Katalóg zariadení</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Exportovať CSV pre web"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{exporting ? 'Exportujem...' : 'CSV Export'}</span>
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 rounded-lg shadow-glow hover:shadow-glow-md transition-all btn-press"
          >
            <Plus className="w-4 h-4" />
            Pridať zariadenie
          </button>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 ml-1">
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
      </div>

      <div className="mb-6">
        <EquipmentFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Delete confirmation banner */}
      {confirmDelete && (
        <div className="mb-4 flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-700">
            Naozaj chcete odstrániť <strong>{confirmDelete.name}</strong>? Kliknite znova na Odstrániť pre potvrdenie.
          </p>
          <button
            onClick={() => setConfirmDelete(null)}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Zrušiť
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-card">
        {viewMode === 'table' ? (
          <EquipmentTable
            data={expandedData}
            loading={loading}
            sortBy={filters.sortBy}
            sortAsc={filters.sortAsc}
            onSort={handleSort}
            onRowClick={setSelectedItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStock={handleToggleStock}
            onToggleAvailability={handleToggleAvailability}
            confirmDeleteId={confirmDelete?.id}
          />
        ) : (
          <div className="p-4">
            <EquipmentGrid
              data={data}
              loading={loading}
              onItemClick={setSelectedItem}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStock={handleToggleStock}
              confirmDeleteId={confirmDelete?.id}
            />
          </div>
        )}
        <Pagination page={filters.page} totalPages={totalPages} onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))} />
      </div>

      <EquipmentDetail
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => { setSelectedItem(null); setConfirmDelete(null); }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStock={handleToggleStock}
        confirmDeleteId={confirmDelete?.id}
      />

      <EquipmentForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditItem(null); }}
        onSave={handleFormSave}
        item={editItem}
      />
    </div>
  );
}
