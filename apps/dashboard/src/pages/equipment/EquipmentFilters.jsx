import SearchInput from '../../components/ui/SearchInput';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import { supabase } from '../../lib/supabase';

export default function EquipmentFilters({ filters, onChange }) {
  const { data: categories } = useSupabaseQuery(
    () => supabase.from('equipment_categories').select('id, name, slug').order('sort_order'),
    []
  );

  const { data: subcategories } = useSupabaseQuery(
    () => {
      let q = supabase.from('equipment_subcategories').select('id, name, slug, category_id').order('sort_order');
      if (filters.categoryId) {
        q = q.eq('category_id', filters.categoryId);
      }
      return q;
    },
    [filters.categoryId]
  );

  const update = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[200px]">
        <SearchInput
          value={filters.search || ''}
          onChange={(v) => update('search', v)}
          placeholder="Hľadať zariadenie..."
        />
      </div>

      <select
        value={filters.categoryId || ''}
        onChange={(e) => {
          const val = e.target.value || null;
          onChange({ ...filters, categoryId: val, subcategoryId: null, page: 1 });
        }}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
      >
        <option value="">Všetky kategórie</option>
        {(categories || []).map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.subcategoryId || ''}
        onChange={(e) => update('subcategoryId', e.target.value || null)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
      >
        <option value="">Všetky podkategórie</option>
        {(subcategories || []).map((sc) => (
          <option key={sc.id} value={sc.id}>{sc.name}</option>
        ))}
      </select>

      <select
        value={filters.skladFilter || ''}
        onChange={(e) => update('skladFilter', e.target.value || null)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow"
      >
        <option value="">Všetky</option>
        <option value="na_sklade">Na sklade</option>
        <option value="pozicane">Požičané</option>
      </select>
    </div>
  );
}
