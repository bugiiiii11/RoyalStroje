import { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { RESERVATION_STATUSES, formatPrice, formatDate } from '../lib/constants';

export default function MyRentals() {
  const { client } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [items, setItems] = useState({});

  useEffect(() => {
    if (!client) return;
    supabase
      .from('reservations')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setRentals(data || []); setLoading(false); });
  }, [client]);

  const toggleExpand = async (id) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    if (!items[id]) {
      const { data } = await supabase
        .from('reservation_items')
        .select('*, equipment(name)')
        .eq('reservation_id', id);
      setItems(prev => ({ ...prev, [id]: data || [] }));
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-500" /></div>;
  }

  return (
    <div className="animate-page-enter">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Moje prenájmy</h1>

      {rentals.length === 0 ? (
        <div className="text-center py-12">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Zatiaľ nemáte žiadne prenájmy</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rentals.map((r) => {
            const status = RESERVATION_STATUSES[r.status];
            const isExpanded = expanded === r.id;
            return (
              <div key={r.id} className="card-interactive bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div
                  onClick={() => toggleExpand(r.id)}
                  className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-mono text-sm font-semibold text-gray-900">{r.reservation_number}</p>
                      <p className="text-xs text-gray-400">{formatDate(r.date_from)} – {formatDate(r.date_to)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{formatPrice(r.total)}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full ${status?.color || ''}`}>{status?.label}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-4 border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Medzisúčet</p>
                        <p className="font-medium">{formatPrice(r.subtotal)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">DPH (23%)</p>
                        <p className="font-medium">{formatPrice(r.vat_amount)}</p>
                      </div>
                      {parseFloat(r.delivery_fee) > 0 && (
                        <div>
                          <p className="text-gray-500">Dovoz</p>
                          <p className="font-medium">{formatPrice(r.delivery_fee)}</p>
                        </div>
                      )}
                    </div>

                    {items[r.id] && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase mb-2">Zariadenia</p>
                        {items[r.id].map((item) => (
                          <div key={item.id} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                            <span>{item.equipment?.name || '—'} <span className="text-gray-400">x{item.quantity}</span></span>
                            <span className="font-medium">{formatPrice(item.line_total)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {r.notes && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500">Poznámky</p>
                        <p className="text-sm text-gray-700">{r.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
