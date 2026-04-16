import { supabase } from './supabase';

// Contract number formats:
//   ZN-YYYY-XXXX        návrh (draft)
//   ZF-YYYY-XXXX        first finálna (renamed from návrh)
//   ZF-YYYY-XXXX-N      subsequent finálne (partial returns), N starts at 2

const SEQ_PATTERN = /^Z[NF]-(\d{4})-(\d{4})(?:-(\d+))?$/;

/** Parse a contract number into { prefix, year, seq, suffix }. */
export function parseContractNumber(num) {
  if (!num) return null;
  const m = num.match(/^(Z[NF])-(\d{4})-(\d{4})(?:-(\d+))?$/);
  if (!m) return null;
  return {
    prefix: m[1],            // 'ZN' | 'ZF'
    year: m[2],
    seq: m[3],               // 4-digit zero-padded
    suffix: m[4] ? parseInt(m[4], 10) : null,
  };
}

/** Generate a fresh ZN-YYYY-XXXX number for a brand-new návrh. */
export async function generateNextNavrhNumber() {
  const year = String(new Date().getFullYear());
  const { data } = await supabase
    .from('contracts')
    .select('contract_number')
    .or(`contract_number.like.ZN-${year}-%,contract_number.like.ZF-${year}-%`);
  let maxSeq = 0;
  for (const row of data || []) {
    const p = parseContractNumber(row.contract_number);
    if (p && p.year === year) {
      const n = parseInt(p.seq, 10);
      if (n > maxSeq) maxSeq = n;
    }
  }
  const nextSeq = String(maxSeq + 1).padStart(4, '0');
  return `ZN-${year}-${nextSeq}`;
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
    // First finalization: rename ZN to ZF (keep same contract row)
    const newNumber = navrh.contract_number.replace(/^ZN-/, 'ZF-');
    return { mode: 'reuse', contractId: navrh.id, contractNumber: newNumber };
  }

  // Subsequent finalization: figure base ZF number and add -N suffix
  let baseNumber;
  if (finals.length > 0) {
    const firstFinal = finals[0];
    const p = parseContractNumber(firstFinal.contract_number);
    baseNumber = p ? `ZF-${p.year}-${p.seq}` : firstFinal.contract_number.replace(/-\d+$/, '');
  } else if (navrh) {
    baseNumber = navrh.contract_number.replace(/^ZN-/, 'ZF-');
  } else {
    // No návrh, no finálne — generate new ZF number from scratch
    const fresh = await generateNextNavrhNumber();
    baseNumber = fresh.replace(/^ZN-/, 'ZF-');
  }

  // Find next available -N suffix by counting existing finals
  // (or by inspecting their suffixes if numbering is sparse)
  const usedSuffixes = new Set(
    finals.map((c) => parseContractNumber(c.contract_number)?.suffix).filter((s) => s != null)
  );
  // First final has no suffix; second uses -2, third -3, etc.
  let nextSuffix = 2;
  while (usedSuffixes.has(nextSuffix)) nextSuffix += 1;

  const contractNumber = `${baseNumber}-${nextSuffix}`;

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
