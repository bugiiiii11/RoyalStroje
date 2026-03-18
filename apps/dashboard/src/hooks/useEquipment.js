import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

export default function useEquipment(filters = {}) {
  const { search, categoryId, status, inStock, page = 1, pageSize = 20, sortBy = 'name', sortAsc = true } = filters;

  const query = useSupabaseQuery(async () => {
    let q = supabase
      .from('equipment')
      .select('*, equipment_categories(name, slug), equipment_subcategories(name, slug)', { count: 'exact' })
      .order(sortBy, { ascending: sortAsc })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      q = q.ilike('name', `%${search}%`);
    }
    if (categoryId) {
      q = q.eq('category_id', categoryId);
    }
    if (status) {
      q = q.eq('status', status);
    }
    if (inStock !== undefined && inStock !== null) {
      q = q.eq('in_stock', inStock);
    }

    return q;
  }, [search, categoryId, status, inStock, page, pageSize, sortBy, sortAsc]);

  return { ...query, totalPages: query.data ? Math.ceil((query.data.length || 0) / pageSize) : 0 };
}
