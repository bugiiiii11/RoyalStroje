import { VAT_RATE } from './constants';

/**
 * Reservation money fields follow the finalized (possibly custom) price — the
 * dashboard revenue tiles and Reports read reservations.total/vat_amount, not
 * contracts.final_total. Pass the SUM of final_total across ALL finálne
 * contracts of the reservation (partial returns each carry their own).
 * Discount/delivery are folded into the custom price, so they are zeroed to
 * keep the Financie panel arithmetic consistent.
 */
export function buildFinancialSync(grossTotal) {
  const gross = Math.round(grossTotal * 100) / 100;
  const netTotal = Math.round((gross / (1 + VAT_RATE)) * 100) / 100;
  return {
    subtotal: netTotal,
    vat_amount: Math.round((gross - netTotal) * 100) / 100,
    total: gross,
    discount_amount: 0,
    discount_percent: 0,
    delivery_fee: 0,
  };
}
