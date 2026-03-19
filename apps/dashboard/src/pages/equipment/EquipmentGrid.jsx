import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { formatPrice, imageUrl } from '../../lib/constants';
import { Package, Pencil, Trash2, PackageX, PackageCheck } from 'lucide-react';

export default function EquipmentGrid({ data, loading, onItemClick, onEdit, onDelete, onToggleStock, confirmDeleteId }) {
  if (loading) {
    return <div className="flex justify-center py-12"><Spinner /></div>;
  }

  if (!data || data.length === 0) {
    return <EmptyState message="Žiadne zariadenia neboli nájdené" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden card-interactive group relative"
        >
          {/* Action buttons overlay */}
          <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
              className="p-1.5 bg-white/90 backdrop-blur-sm text-gray-500 hover:text-royal-600 hover:bg-royal-50 rounded-lg shadow-sm transition-colors"
              title="Upraviť"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleStock?.(item); }}
              className={`p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm transition-colors ${
                item.in_stock
                  ? 'text-gray-500 hover:text-orange-600 hover:bg-orange-50'
                  : 'text-orange-500 hover:text-green-600 hover:bg-green-50'
              }`}
              title={item.in_stock ? 'Nedostupné' : 'Na sklade'}
            >
              {item.in_stock ? <PackageX className="w-3.5 h-3.5" /> : <PackageCheck className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(item); }}
              className={`p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm transition-colors ${
                confirmDeleteId === item.id
                  ? 'text-white bg-red-500'
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
              }`}
              title="Odstrániť"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div onClick={() => onItemClick?.(item)} className="cursor-pointer">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {item.image_path ? (
                <img src={imageUrl(item.image_path)} alt={item.name} className="h-full w-full object-contain p-4" />
              ) : (
                <Package className="w-12 h-12 text-gray-300" />
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">{item.equipment_categories?.name}</p>
              <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
              <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-semibold text-sm text-gray-900">
                  {item.pricing_type === 'negotiable' ? 'Na požiadanie' : formatPrice(item.daily_rate_base) + '/deň'}
                </span>
                <Badge
                  label={item.in_stock ? 'Skladom' : 'Nedostupné'}
                  bg={item.in_stock ? 'bg-green-100' : 'bg-red-100'}
                  text={item.in_stock ? 'text-green-700' : 'text-red-700'}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
