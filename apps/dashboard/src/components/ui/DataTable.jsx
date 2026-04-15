import { ChevronUp, ChevronDown } from 'lucide-react';
import Spinner from './Spinner';
import EmptyState from './EmptyState';

export default function DataTable({ columns, data, loading, sortBy, sortAsc, onSort, onRowClick, emptyMessage }) {
  if (loading) {
    return <div className="flex justify-center py-12"><Spinner /></div>;
  }

  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage || 'Žiadne záznamy'} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider ${col.sortable ? 'cursor-pointer hover:text-gray-600 select-none transition-colors' : ''}`}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortBy === col.key && (
                    sortAsc ? <ChevronUp className="w-3 h-3 text-royal-500" /> : <ChevronDown className="w-3 h-3 text-royal-500" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, i) => (
            <tr
              key={row._rowKey || row.id || i}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer table-row-hover' : ''}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
