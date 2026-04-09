import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

export default function useContracts(filters = {}) {
  const { type, search } = filters;

  return useSupabaseQuery(async () => {
    let query = supabase
      .from('contracts')
      .select('*, reservations(reservation_number, client_id, clients(company_name))')
      .order('created_at', { ascending: false });

    if (type === 'navrh') query = query.eq('type', 'navrh');
    if (type === 'finalna') query = query.eq('type', 'finalna');
    if (search) query = query.ilike('contract_number', `%${search}%`);

    return query;
  }, [type, search]);
}
