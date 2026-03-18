import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

export default function useClients(search = '') {
  return useSupabaseQuery(async () => {
    let query = supabase
      .from('clients')
      .select('*')
      .order('company_name');

    if (search) {
      query = query.or(`company_name.ilike.%${search}%,contact_person.ilike.%${search}%`);
    }

    return query.limit(50);
  }, [search]);
}
