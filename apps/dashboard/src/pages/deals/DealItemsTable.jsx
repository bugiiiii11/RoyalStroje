import { formatPrice } from '../../lib/constants';

export default function DealItemsTable({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-gray-400">Žiadne položky</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Zariadenie</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Ks</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Sadzba/deň</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Dní</th>
          <th className="text-right px-4 py-2 text-xs font-medium text-gray-500 uppercase">Spolu</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 font-medium text-gray-900">
              {item.equipment?.name || '—'}
            </td>
            <td className="px-4 py-3 text-right text-gray-700">{item.quantity}</td>
            <td className="px-4 py-3 text-right text-gray-700">{formatPrice(item.daily_rate)}</td>
            <td className="px-4 py-3 text-right text-gray-700">{item.days}</td>
            <td className="px-4 py-3 text-right font-medium text-gray-900">{formatPrice(item.line_total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
