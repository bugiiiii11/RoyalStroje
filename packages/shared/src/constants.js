export const RESERVATION_STATUSES = {
  inquiry: { label: 'Dopyt', color: 'gray' },
  quoted: { label: 'Cenová ponuka', color: 'blue' },
  confirmed: { label: 'Potvrdená', color: 'green' },
  active: { label: 'Aktívna', color: 'orange' },
  completed: { label: 'Ukončená', color: 'teal' },
  invoiced: { label: 'Fakturovaná', color: 'purple' },
  paid: { label: 'Zaplatená', color: 'emerald' },
  cancelled: { label: 'Zrušená', color: 'red' },
};

export const INVOICE_TYPES = {
  proforma: { label: 'Proforma faktúra', prefix: 'PF' },
  invoice: { label: 'Faktúra', prefix: 'FA' },
  credit_note: { label: 'Dobropis', prefix: 'CN' },
};

export const CLIENT_TYPES = {
  standard: { label: 'Štandardný', discount: 0 },
  royal_card: { label: 'Royal Card', discount: 5 },
  vip: { label: 'VIP', discount: 10 },
};

export const VAT_RATE = 0.23; // Slovak VAT 23%
