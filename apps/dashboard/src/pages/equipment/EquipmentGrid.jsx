import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { formatPrice, imageUrl } from '../../lib/constants';
import { Package } from 'lucide-react';

export default function EquipmentGrid({ data, loading, onItemClick }) {
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
          onClick={() => onItemClick?.(item)}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer card-interactive group"
        >
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
      ))}
    </div>
  );
}
