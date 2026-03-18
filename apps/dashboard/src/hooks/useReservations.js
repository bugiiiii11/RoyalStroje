import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

export default function useReservations(filters = {}) {
  const { status, today } = filters;

  return useSupabaseQuery(async () => {
    let query = supabase
      .from('reservations')
      .select('*, clients(company_name, contact_person, client_type)')
      .neq('status', 'cancelled')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (today) {
      query = query.or(`date_from.eq.${today},date_to.eq.${today}`);
    }

    return query;
  }, [status, today]);
}
