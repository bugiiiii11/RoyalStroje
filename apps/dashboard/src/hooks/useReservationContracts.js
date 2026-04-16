import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

/**
 * Returns all contracts (návrh + finálne) for a reservation, plus aggregated
 * info about which serials/quantities have been returned across all final
 * contracts.
 *
 * Result shape:
 *   contracts: array of contracts ordered by created_at asc (návrh first, then ZF, ZF-2, ...)
 *   finalContracts: subset where type='finalna'
 *   returnedBySerial: { reservationItemId: Set<serialNumber> }
 *   returnedQty: { reservationItemId: number }  // for items without serials
 *   refetch
 */
export default function useReservationContracts(reservationId) {
  return useSupabaseQuery(async () => {
    const { data: contracts, error: cErr } = await supabase
      .from('contracts')
      .select('*, contract_returned_items(*)')
      .eq('reservation_id', reservationId)
      .order('created_at', { ascending: true });

    if (cErr) return { error: cErr };

    const finalContracts = (contracts || []).filter((c) => c.type === 'finalna');

    const returnedBySerial = {};
    const returnedQty = {};
    for (const contract of finalContracts) {
      for (const ri of contract.contract_returned_items || []) {
        if (ri.serial_number) {
          if (!returnedBySerial[ri.reservation_item_id]) {
            returnedBySerial[ri.reservation_item_id] = new Set();
          }
          returnedBySerial[ri.reservation_item_id].add(ri.serial_number);
        } else {
          returnedQty[ri.reservation_item_id] =
            (returnedQty[ri.reservation_item_id] || 0) + (ri.quantity || 0);
        }
      }
    }

    return {
      data: {
        contracts: contracts || [],
        finalContracts,
        returnedBySerial,
        returnedQty,
      },
    };
  }, [reservationId]);
}
