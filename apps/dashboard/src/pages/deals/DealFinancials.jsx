import { formatPrice } from '../../lib/constants';

export default function DealFinancials({ reservation }) {
  if (!reservation) return null;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-500">Medzisúčet</span>
        <span>{formatPrice(reservation.subtotal)}</span>
      </div>
      {parseFloat(reservation.discount_amount) > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Zľava ({reservation.discount_percent}%)</span>
          <span>-{formatPrice(reservation.discount_amount)}</span>
        </div>
      )}
      {parseFloat(reservation.delivery_fee) > 0 && (
        <div className="flex justify-between">
          <span className="text-gray-500">Dovoz</span>
          <span>{formatPrice(reservation.delivery_fee)}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-gray-500">DPH (23%)</span>
        <span>{formatPrice(reservation.vat_amount)}</span>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold">
        <span>Celkom</span>
        <span>{formatPrice(reservation.total)}</span>
      </div>
      {reservation.deposit_required && (
        <div className="flex justify-between pt-2 border-t border-gray-100 text-sm">
          <span className="text-gray-500">Záloha</span>
          <span>{reservation.deposit_amount > 0 ? formatPrice(reservation.deposit_amount) : 'Vyžadovaná'}</span>
        </div>
      )}
    </div>
  );
}
