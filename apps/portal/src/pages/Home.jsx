import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Package, PlusCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { RESERVATION_STATUSES, formatPrice, formatDate } from '../lib/constants';

export default function Home() {
  const { client } = useAuth();
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) return;
    supabase
      .from('reservations')
      .select('*')
      .eq('client_id', client.id)
      .in('status', ['inquiry', 'quoted', 'confirmed', 'active'])
      .order('date_from')
      .then(({ data }) => {
        setRentals(data || []);
        setLoading(false);
      });
  }, [client]);

  return (
    <div>
      {/* Welcome */}
      <div className="bg-gradient-to-r from-royal-500 to-royal-600 rounded-2xl p-6 md:p-8 text-white mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Vitajte, {client?.contact_person || client?.company_name || 'klient'}!</h1>
            <p className="text-royal-100 text-sm">{client?.company_name} · Royal Card</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-xs text-royal-100">Zľava</p>
            <p className="text-lg font-bold">5%</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-xs text-royal-100">Záloha</p>
            <p className="text-lg font-bold">Bez zálohy</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-xs text-royal-100">Aktívne prenájmy</p>
            <p className="text-lg font-bold">{rentals.filter(r => r.status === 'active').length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-5 hover:border-royal-300 hover:shadow-sm transition-all text-left"
        >
          <div className="w-10 h-10 bg-royal-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-royal-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Prehliadať katalóg</p>
            <p className="text-xs text-gray-500">142+ zariadení na prenájom</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </button>
        <button
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-5 hover:border-royal-300 hover:shadow-sm transition-all text-left"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Nová rezervácia</p>
            <p className="text-xs text-gray-500">Objednajte zariadenie online</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Active Rentals */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Aktívne prenájmy</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-4">Načítavam...</p>
          ) : rentals.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Žiadne aktívne prenájmy</p>
          ) : (
            <div className="space-y-3">
              {rentals.map((r) => {
                const status = RESERVATION_STATUSES[r.status];
                return (
                  <div key={r.id} onClick={() => navigate('/rentals')}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div>
                      <p className="font-mono text-sm font-medium">{r.reservation_number}</p>
                      <p className="text-xs text-gray-400">{formatDate(r.date_from)} – {formatDate(r.date_to)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{formatPrice(r.total)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${status?.color || ''}`}>{status?.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
