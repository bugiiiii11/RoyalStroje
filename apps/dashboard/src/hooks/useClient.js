import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

export default function useClient(clientId) {
  const client = useSupabaseQuery(
    () => supabase.from('clients').select('*').eq('id', clientId).single(),
    [clientId]
  );

  const reservations = useSupabaseQuery(
    () => supabase
      .from('reservations')
      .select('*, reservation_items(count)')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false }),
    [clientId]
  );

  return { client, reservations };
}
