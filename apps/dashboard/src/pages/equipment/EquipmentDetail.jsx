import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import { formatPrice, imageUrl } from '../../lib/constants';
import { Package } from 'lucide-react';

export default function EquipmentDetail({ item, open, onClose }) {
  if (!item) return null;

  const features = Array.isArray(item.features) ? item.features : [];

  return (
    <Modal open={open} onClose={onClose} title={item.name} maxWidth="max-w-2xl">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {item.image_path ? (
            <img src={imageUrl(item.image_path)} alt={item.name} className="h-full w-full object-contain p-4" />
          ) : (
            <Package className="w-16 h-16 text-gray-300" />
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm text-gray-400">
              {item.equipment_categories?.name} · {item.equipment_subcategories?.name}
            </p>
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>

          <div className="flex gap-3">
            <Badge
              label={item.in_stock ? 'Na sklade' : 'Nedostupné'}
              bg={item.in_stock ? 'bg-green-100' : 'bg-red-100'}
              text={item.in_stock ? 'text-green-700' : 'text-red-700'}
            />
            {item.is_new && <Badge label="Nové" bg="bg-blue-100" text="text-blue-700" />}
            <Badge
              label={item.ownership_type === 'owned' ? 'Vlastné' : 'Partnerské'}
              bg="bg-gray-100"
              text="text-gray-700"
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cena</h4>
            {item.pricing_type === 'negotiable' ? (
              <p className="text-lg font-semibold text-gray-900">Na požiadanie</p>
            ) : (
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-gray-400">Bez DPH</p>
                  <p className="text-lg font-semibold">{formatPrice(item.daily_rate_base)}/deň</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">S DPH</p>
                  <p className="text-lg font-semibold">{formatPrice(item.daily_rate_vat)}/deň</p>
                </div>
              </div>
            )}
          </div>

          {features.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Parametre</h4>
              <ul className="space-y-1">
                {features.map((f, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-300 mt-1">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
