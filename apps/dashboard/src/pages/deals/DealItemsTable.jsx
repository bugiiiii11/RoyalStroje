import { formatPrice } from '../../lib/constants';

export default function DealItemsTable({ items, returnedBySerial, returnedQty }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-gray-400">Žiadne položky</p>;
  }

  const showReturnInfo = !!(returnedBySerial || returnedQty);

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Zariadenie</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Ks</th>
          {showReturnInfo && (
            <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Vrátené</th>
          )}
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Sadzba/deň</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Dní</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Spolu</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {items.map((item) => {
          const serials = Array.isArray(item.serial_numbers) ? item.serial_numbers.filter(Boolean) : [];
          const qty = parseInt(item.quantity, 10) || 1;
          let returnedLabel = null;
          let allReturned = false;
          if (showReturnInfo) {
            if (serials.length > 0) {
              const returnedSet = (returnedBySerial || {})[item.id] || new Set();
              const returnedCount = serials.filter((sn) => returnedSet.has(sn)).length;
              returnedLabel = `${returnedCount} / ${serials.length}`;
              allReturned = returnedCount === serials.length;
            } else {
              const ret = (returnedQty || {})[item.id] || 0;
              returnedLabel = `${ret} / ${qty}`;
              allReturned = ret >= qty;
            }
          }
          return (
            <tr key={item.id}>
              <td className="px-4 py-3 font-medium text-gray-900">
                {item.equipment?.name || item.custom_name || '—'}
                {!item.equipment_id && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider font-semibold text-royal-600 bg-royal-50 px-1.5 py-0.5 rounded">Vlastný</span>
                )}
                {serials.length > 0 && (
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    SN: {serials.join(', ')}
                  </p>
                )}
              </td>
              <td className="px-4 py-3 text-right text-gray-700">{qty}</td>
              {showReturnInfo && (
                <td className={`px-4 py-3 text-right text-sm ${allReturned ? 'text-green-600 font-medium' : 'text-amber-600'}`}>
                  {returnedLabel}
                </td>
              )}
              <td className="px-4 py-3 text-right text-gray-700">{formatPrice(item.daily_rate)}</td>
              <td className="px-4 py-3 text-right text-gray-700">{item.days}</td>
              <td className="px-4 py-3 text-right font-medium text-gray-900">{formatPrice(item.line_total)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
