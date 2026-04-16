import { supabase } from './supabase';
import generateAgreementPdf from './generateAgreementPdf';
import generateAgreementPdfPO from './generateAgreementPdfPO';

/**
 * Invoice PDF reuses the agreement layout (title, parties, equipment,
 * rental + financial sections, notes, legal, signatures, return protocol)
 * with invoice-specific overrides: FAKTÚRA/PROFORMA/DOBROPIS title,
 * IBAN + variabilný symbol + splatnosť, invoice totals.
 *
 * When a finalized contract exists for the reservation, its data
 * (actual return date, final_total) is pulled in so the "Skutočný
 * koniec prenájmu" row is populated on the faktúra too.
 */
export default async function generateInvoicePdf(invoice, reservation, items, client) {
  // Pull latest finalized contract for this reservation (if any) so the
  // agreement view shows the actual return details on the faktúra.
  let contractData = null;
  if (reservation?.id) {
    const { data } = await supabase
      .from('contracts')
      .select('*')
      .eq('reservation_id', reservation.id)
      .eq('type', 'finalna')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    contractData = data || null;
  }

  const gen = client?.entity_type === 'fo' ? generateAgreementPdf : generateAgreementPdfPO;
  return gen(reservation, items, client, contractData, invoice);
}
