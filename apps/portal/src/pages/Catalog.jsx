import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, ShoppingCart, Crown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatPrice, RC_DISCOUNT, imageUrl } from '../lib/constants';

export default function Catalog() {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    supabase.from('equipment_categories').select('id, name').order('sort_order')
      .then(({ data }) => setCategories(data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    let q = supabase
      .from('equipment')
      .select('*, equipment_categories(name)')
      .eq('status', 'active')
      .eq('in_stock', true)
      .order('name');
    if (search) q = q.ilike('name', `%${search}%`);
    if (categoryId) q = q.eq('category_id', categoryId);
    q.then(({ data }) => { setEquipment(data || []); setLoading(false); });
  }, [search, categoryId]);

  const addToCart = (item) => {
    if (cart.find(c => c.id === item.id)) return;
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const inCart = (id) => cart.some(c => c.id === id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Katalóg zariadení</h1>
        {cart.length > 0 && (
          <button
            onClick={() => navigate('/booking', { state: { cart } })}
            className="flex items-center gap-2 bg-royal-500 hover:bg-royal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Rezervovať ({cart.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Hľadať zariadenie..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royal-500 outline-none"
          />
        </div>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-royal-500 outline-none">
          <option value="">Všetky kategórie</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Equipment Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-500" />
        </div>
      ) : equipment.length === 0 ? (
        <p className="text-center text-gray-400 py-12">Žiadne zariadenia</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => {
            const isFixed = item.pricing_type === 'fixed';
            const rcPrice = isFixed ? item.daily_rate_base * (1 - RC_DISCOUNT) : 0;
            const added = inCart(item.id);

            return (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-36 bg-gray-100 flex items-center justify-center">
                  {item.image_path ? (
                    <img src={imageUrl(item.image_path)} alt={item.name} className="h-full w-full object-contain p-3" />
                  ) : (
                    <Package className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">{item.equipment_categories?.name}</p>
                  <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>

                  {isFixed ? (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-bold text-royal-600">{formatPrice(rcPrice)}/deň</span>
                      <span className="text-xs text-gray-400 line-through">{formatPrice(item.daily_rate_base)}</span>
                      <span className="text-xs bg-royal-100 text-royal-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Crown className="w-3 h-3" />-5%
                      </span>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm font-medium text-gray-500">Na požiadanie</p>
                  )}

                  {isFixed && (
                    <button
                      onClick={() => !added && addToCart(item)}
                      disabled={added}
                      className={`mt-3 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                        added ? 'bg-green-100 text-green-700 cursor-default' : 'bg-royal-500 hover:bg-royal-600 text-white'
                      }`}
                    >
                      {added ? 'Pridané' : 'Pridať do rezervácie'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
