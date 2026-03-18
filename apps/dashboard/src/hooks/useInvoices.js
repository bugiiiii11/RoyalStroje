import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

export default function useInvoices(filters = {}) {
  const { type, status, search } = filters;

  return useSupabaseQuery(async () => {
    let query = supabase
      .from('invoices')
      .select('*, reservations(reservation_number, client_id, clients(company_name))')
      .order('created_at', { ascending: false });

    if (type) query = query.eq('type', type);
    if (status) query = query.eq('status', status);
    if (search) query = query.ilike('invoice_number', `%${search}%`);

    return query;
  }, [type, status, search]);
}
