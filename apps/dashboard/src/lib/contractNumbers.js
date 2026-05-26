import { supabase } from './supabase';

// Contract number format: YYXXXX
//   YY   = 2-digit year (26 for 2026, 27 for 2027, …)
//   XXXX = 4-digit zero-padded sequence, shared by návrh and finálna
//   YYXXXX-N  subsequent finálne (partial returns), N starts at 2

/** Parse a contract number into { yy, seq, suffix }. */
export function parseContractNumber(num) {
  if (!num) return null;
  const m = String(num).match(/^(\d{2})(\d{4})(?:-(\d+))?$/);
  if (!m) return null;
  return {
    yy: m[1],
    seq: m[2],               // 4-digit zero-padded
    suffix: m[3] ? parseInt(m[3], 10) : null,
  };
}

/** Generate a fresh YYXXXX number for a brand-new návrh. */
export async function generateNextNavrhNumber() {
  const yy = String(new Date().getFullYear()).slice(-2);
  const year = `20${yy}`;
  // Fetch both new format (YYXXXX) and legacy format (ZN/ZF-YYYY-XXXX)
  const { data } = await supabase
    .from('contracts')
    .select('contract_number')
    .or(`contract_number.like.${yy}%,contract_number.like.ZN-${year}-%,contract_number.like.ZF-${year}-%`);
  let maxSeq = 146; // contracts 1–146 were manually renamed on PC; start DB sequence from 147
  for (const row of data || []) {
    const num = String(row.contract_number);
    // New format: YYXXXX or YYXXXX-N
    const newFmt = num.match(/^(\d{2})(\d{4})(?:-\d+)?$/);
    if (newFmt && newFmt[1] === yy) {
      const n = parseInt(newFmt[2], 10);
      if (n > maxSeq) maxSeq = n;
      continue;
    }
    // Legacy format: ZN-YYYY-XXXX or ZF-YYYY-XXXX
    const oldFmt = num.match(/^Z[NF]-(\d{4})-(\d{4})(?:-\d+)?$/);
    if (oldFmt && oldFmt[1] === year) {
      const n = parseInt(oldFmt[2], 10);
      if (n > maxSeq) maxSeq = n;
    }
  }
  const nextSeq = String(maxSeq + 1).padStart(4, '0');
  return `${yy}${nextSeq}`;
}

/**
 * Decide the contract row for a finalization.
 *   - If a návrh exists for this reservation → flip its type to finalna and rename ZN→ZF.
 *   - Otherwise (subsequent finalizations) → create new contract with -N suffix.
 *
 * Returns { contractId, contractNumber } of the contract that should hold the
 * new finalization data.
 */
export async function prepareFinalizationContract({ reservationId, reservationDateFrom, contracts }) {
  const navrh = (contracts || []).find((c) => c.type === 'navrh');
  const finals = (contracts || []).filter((c) => c.type === 'finalna');

  if (finals.length === 0 && navrh) {
    // First finalization: keep same number (no rename needed in new format)
    return { mode: 'reuse', contractId: navrh.id, contractNumber: navrh.contract_number };
  }

  // Subsequent finalization: keep same number as first finalization (no suffix)
  let contractNumber;
  if (finals.length > 0) {
    const firstFinal = finals[0];
    const p = parseContractNumber(firstFinal.contract_number);
    contractNumber = p ? `${p.yy}${p.seq}` : firstFinal.contract_number.replace(/-\d+$/, '');
  } else if (navrh) {
    contractNumber = navrh.contract_number;
  } else {
    contractNumber = await generateNextNavrhNumber();
  }

  const { data: created, error } = await supabase
    .from('contracts')
    .insert({
      contract_number: contractNumber,
      reservation_id: reservationId,
      type: 'finalna',
      time_from: reservationDateFrom ? '08:00' : null,
    })
    .select()
    .single();
  if (error) throw error;

  return { mode: 'created', contractId: created.id, contractNumber };
}
