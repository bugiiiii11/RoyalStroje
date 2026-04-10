import autoTable from 'jspdf-autotable';
import { COMPANY } from './companyInfo';
import { createPdfDoc, FONT_NAME } from './pdfFonts';

function fmtPrice(val) {
  if (val == null || isNaN(val)) return '0,00 €';
  return parseFloat(val).toFixed(2).replace('.', ',') + ' €';
}
function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('sk-SK');
}

const ORANGE = [232, 114, 10];
const BORDER = [153, 153, 153];
const LBL_C = [85, 85, 85];
const VAL_C = [26, 26, 26];
const WHITE = [255, 255, 255];
const NOTES_BG = [255, 248, 242];

const base = (f) => ({ font: f, fontSize: 8, textColor: VAL_C, lineColor: BORDER, lineWidth: 0.4, cellPadding: { top: 1.6, bottom: 1.6, left: 3, right: 2 } });
const hdr = (f) => ({ fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold', font: f, fontSize: 8.5, cellPadding: { top: 2.2, bottom: 2.2, left: 3, right: 3 } });
const secHdr = (f) => ({ fillColor: [245, 245, 245], textColor: [40, 40, 40], fontStyle: 'bold', font: f, fontSize: 8 });
const L = { fontStyle: 'bold', textColor: LBL_C };

export default async function generateAgreementPdfPO(reservation, items, client, contractData = null) {
  const isFinalna = contractData?.type === 'finalna';
  const doc = await createPdfDoc();
  const f = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  const M = 12;
  const CW = w - M * 2;
  const H = CW / 2;
  let y = 9;

  // ═══ TITLE ═══
  doc.setFont(f, 'bold'); doc.setFontSize(10.5); doc.setTextColor(...ORANGE);
  doc.text('ZMLUVA O PREN\u00C1JME HNUTE\u013DN\u00DDCH VEC\u00CD', M, y);
  y += 3.5;
  doc.setFontSize(6.5); doc.setFont(f, 'normal'); doc.setTextColor(...LBL_C);
  doc.text('uzatvorená podľa § 269 ods. 2 zákona č. 513/1991 Zb. Obchodný zákonník | ROYAL STROJE s.r.o. | IČO: 57 405 425 | VPPM-PO 2026.02', M, y);
  doc.setDrawColor(...ORANGE); doc.setLineWidth(0.7); doc.line(M, y + 1.5, w - M, y + 1.5);
  doc.setDrawColor(...BORDER); doc.setLineWidth(0.4);
  y += 4.5;

  // ═══ SUBTITLE ═══
  doc.setFontSize(6); doc.setFont(f, 'normal'); doc.setTextColor(...LBL_C);
  const subtitle = doc.splitTextToSize(
    'Zmluvné strany sa dohodli na nasledovnom znení tejto Zmluvy. Všetky ostatné práva a povinnosti oboch zmluvných strán neuvedené v Zmluve sú definované vo všeobecných podmienkach prenájmu mechanizácie a príslušenstva, ktoré sú neoddeliteľnou súčasťou Zmluvy (ďalej len VPPM).', CW);
  doc.text(subtitle, M, y);
  y += subtitle.length * 2.2 + 1.5;

  // ═══ I. ZMLUVNÉ STRANY ═══
  const addr = [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ');

  autoTable(doc, {
    startY: y,
    head: [[{ content: 'I. ZMLUVNÉ STRANY — Prenajímateľ', colSpan: 2, styles: hdr(f) }, { content: 'Nájomca', colSpan: 2, styles: hdr(f) }]],
    body: [
      [{ content: 'Obchodné meno:', styles: L }, COMPANY.name, { content: 'Obchodné meno:', styles: L }, client?.company_name || ''],
      [{ content: 'Sídlo:', styles: L }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'Sídlo:', styles: L }, addr],
      [{ content: 'IČO:', styles: L }, COMPANY.ico, { content: 'IČO:', styles: L }, client?.ico || ''],
      [{ content: 'DIČ:', styles: L }, COMPANY.dic, { content: 'DIČ:', styles: L }, client?.dic || ''],
      [{ content: 'IČ DPH:', styles: L }, COMPANY.ic_dph, { content: 'IČ DPH:', styles: L }, client?.ic_dph || ''],
      [{ content: 'Zastúpený:', styles: L }, COMPANY.represented, { content: 'Zastúpený:', styles: L }, client?.contact_person || ''],
      [{ content: 'Tel / Email:', styles: L }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Tel / Email:', styles: L }, [client?.phone, client?.email].filter(Boolean).join(' / ')],
      [{ content: 'Zmluva č. / Obj. č.:', styles: L }, reservation.reservation_number || '', { content: 'Email (fakturačný):', styles: L }, client?.billing_email || client?.email || ''],
    ],
    styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.34 }, 1: { cellWidth: H * 0.66 }, 2: { cellWidth: H * 0.34 }, 3: { cellWidth: H * 0.66 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ II. PREDMET NÁJMU, DOBA NÁJMU A PLATOBNÉ PODMIENKY ═══
  const rateUnitLabel = (u) => u === 'mm' ? 'mm' : u === 'hod' ? 'Hodinová' : 'Denná';
  const eq = [];
  (items || []).forEach((it) => {
    const qty = it.quantity || 1;
    for (let i = 0; i < qty; i++) {
      eq.push([it.equipment?.name || it.name || '—', '', rateUnitLabel(it.equipment?.rate_unit), fmtPrice(it.daily_rate)]);
    }
  });
  autoTable(doc, {
    startY: y,
    head: [[{ content: 'II. PREDMET NÁJMU — Názov, typ, druh a informácie o PP', colSpan: 2, styles: hdr(f) }, { content: 'Výrobné číslo', styles: hdr(f) }, { content: 'Druh sadzby', styles: hdr(f) }, { content: 'bez DPH v EUR', styles: hdr(f) }]],
    body: eq.length > 0 ? eq.map(r => [{ content: r[0], colSpan: 2 }, r[1], r[2], r[3]]) : [[{ content: '', colSpan: 2 }, '', '', '']],
    styles: base(f),
    columnStyles: { 0: { cellWidth: CW * 0.38 }, 1: { cellWidth: CW * 0.17 }, 2: { cellWidth: CW * 0.17 }, 3: { cellWidth: CW * 0.11 }, 4: { cellWidth: CW * 0.17 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ RENTAL DETAILS + FINANCIAL ═══
  // For návrh: leave price blank; only fill in after finalization
  const displayTotal = isFinalna && contractData?.final_total != null ? contractData.final_total : null;
  const netto = displayTotal != null ? (displayTotal / 1.23) : null;
  const dph = displayTotal != null ? (displayTotal - netto) : null;
  const timeFromStr = contractData?.time_from ? ` o ${contractData.time_from.slice(0, 5)}` : '';
  const actualReturnStr = isFinalna && contractData?.return_date
    ? fmtDate(contractData.return_date) + (contractData.time_to ? ` o ${contractData.time_to.slice(0, 5)}` : '')
    : '';
  const depositStr = reservation.deposit_amount > 0
    ? fmtPrice(reservation.deposit_amount)
    : (reservation.deposit_required ? fmtPrice(0) : '\u2014');

  autoTable(doc, {
    startY: y,
    head: [[{ content: 'DOBA NÁJMU A ODOVZDANIE', colSpan: 2, styles: hdr(f) }, { content: 'PLATOBNÉ PODMIENKY', colSpan: 2, styles: hdr(f) }]],
    body: [
      [{ content: 'Ostatné info o PP a príslušenstve:', styles: L }, reservation.notes || '', { content: 'Celkové nájomné:', styles: { ...L, fontStyle: 'bold' } }, ''],
      [{ content: 'Miesto používania PP:', styles: L }, reservation.delivery_address || '', { content: 'bez DPH', styles: L }, netto != null ? fmtPrice(netto) : ''],
      [{ content: 'Presné miesto odovzdania PP:', styles: L }, reservation.delivery_address || 'Recká cesta 182, Senec', { content: `DPH ${COMPANY.vatRate}%`, styles: L }, dph != null ? fmtPrice(dph) : ''],
      [{ content: 'Začiatok prenájmu (dátum od):', styles: L }, fmtDate(reservation.date_from) + timeFromStr, { content: 's DPH', styles: { ...L, fontStyle: 'bold' } }, displayTotal != null ? fmtPrice(displayTotal) : ''],
      [{ content: 'Dátum do (dohodnutý koniec):', styles: L }, fmtDate(reservation.date_to), { content: 'Zábezpeka v EUR:', styles: L }, depositStr],
      [{ content: 'Skutočný koniec prenájmu:', styles: L }, actualReturnStr, { content: 'Vrátená zábezpeka v EUR:', styles: L }, ''],
      [{ content: 'Neúčtované dni PP:', styles: L }, '', { content: 'Platobné podmienky:', styles: L }, 'Prevod / Hotovosť'],
    ],
    styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.46 }, 1: { cellWidth: H * 0.54 }, 2: { cellWidth: H * 0.46 }, 3: { cellWidth: H * 0.54 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ III. VŠEOBECNÉ PODMIENKY + IV. ZÁVEREČNÉ USTANOVENIA (compact) ═══
  doc.setFontSize(6.5); doc.setFont(f, 'bold'); doc.setTextColor(...VAL_C);
  doc.text('III. VŠEOBECNÉ PODMIENKY', M, y + 0.5);
  y += 2.5;
  doc.setFont(f, 'normal'); doc.setFontSize(6); doc.setTextColor(...LBL_C);
  const vppm = doc.splitTextToSize(
    'PP je odovzdávaný v technickom stave zodpovedajúcom jeho veku, miere opotrebenia a účelu použitia. ' +
    'Nájomca podpisom tejto Zmluvy potvrdzuje, že PP prevzal funkčný, riadne ho skontroloval a nevzniesol žiadne výhrady k jeho technickému stavu, okrem tých, ktoré sú výslovne uvedené v tejto Zmluve alebo v protokole. ' +
    'Prílohou č. 1 tejto Zmluvy sú Všeobecné podmienky prenájmu mechanizácie a príslušenstva (ďalej len „VPPM") verzie VPPM2026.02, ktoré tvoria neoddeliteľnú súčasť tejto Zmluvy. ' +
    'VPPM sú k dispozícii na sídle Prenajímateľa (Royal stroje, s.r.o., 182, Boldog 92526) a zároveň v elektronickej podobe na webovej stránke www.royalstroje.sk; ' +
    'tlačenú verziu poskytne Prenajímateľ Nájomcovi na požiadanie bezplatne. Nájomca vyhlasuje, že si VPPM pred podpisom tejto Zmluvy preštudoval, porozumel ich obsahu a v plnom rozsahu ich akceptuje.', CW);
  doc.text(vppm, M, y);
  y += vppm.length * 2.2 + 1.5;

  doc.setFont(f, 'bold'); doc.setFontSize(6.5); doc.setTextColor(...VAL_C);
  doc.text('IV. ZÁVEREČNÉ USTANOVENIA', M, y + 0.5);
  y += 2.5;
  doc.setFont(f, 'normal'); doc.setFontSize(6); doc.setTextColor(...LBL_C);
  const zaver = doc.splitTextToSize(
    '1. Táto Zmluva nadobúda účinnosť dňom jej podpísania oboma zmluvnými stranami a platí do úplného splnenia všetkých práv a povinností z nej vyplývajúcich. ' +
    '2. Zmluva je vyhotovená v dvoch rovnopisoch s platnosťou originálu, z ktorých každá zo zmluvných strán obdrží po jednom. ' +
    '3. Zmeny a doplnenia tejto Zmluvy sú možné výhradne písomnou formou dodatku podpísaného oboma zmluvnými stranami. ' +
    '4. Zmluvné strany sa zaväzujú riešiť prípadné spory prednostne vzájomnou dohodou. Ak sa spor nepodarí vyriešiť dohodou, bude rozhodovaný miestne a vecne príslušným súdom v Bratislave. ' +
    '5. Právne vzťahy neupravené touto Zmluvou sa riadia zákonom č. 513/1991 Zb. Obchodný zákonník v platnom znení a súvisiacimi právnymi predpismi SR. ' +
    '6. V prípade rozporu medzi ustanoveniami tejto Zmluvy a VPPM majú prednosť ustanovenia tejto Zmluvy.', CW);
  doc.text(zaver, M, y);
  y += zaver.length * 2.2 + 2;

  // ═══ OVERENIE + PODPISY (two side-by-side tables for wider signature rows) ═══
  const repName = COMPANY.represented.replace(/, konateľ/i, '');
  const lesseeName = client?.contact_person || client?.company_name || '';
  const returnProtocol = isFinalna && contractData?.return_date
    ? fmtDate(contractData.return_date) + (contractData.time_to ? ` o ${contractData.time_to.slice(0, 5)}` : '')
    : '';
  const s = { fontSize: 7, textColor: LBL_C };
  const sigY = y;
  const todayStr = new Date().toLocaleDateString('sk-SK');

  // LEFT: Overenie + signatures
  autoTable(doc, {
    startY: sigY,
    head: [[{ content: 'OVERENIE OPRÁVNENIA A PODPISY', colSpan: 2, styles: hdr(f) }]],
    body: [
      [{ content: 'Osoba podpisujúca Zmluvu v mene Nájomcu prehlasuje, že je na to riadne oprávnená (štatutárny orgán alebo splnomocnená osoba)', colSpan: 2, styles: { ...s, fontSize: 6, fillColor: [250, 250, 250], minCellHeight: 8 } }],
      [{ content: `V Boldog \u2013 Senec d\u0148a ${todayStr}`, colSpan: 2, styles: { ...s, fontSize: 6.5 } }],
      [{ content: 'Za prenaj\u00EDmate\u013Ea:', styles: { ...s, fontStyle: 'bold' } }, { content: 'Za n\u00E1jomcu:', styles: { ...s, fontStyle: 'bold' } }],
      [{ content: `Meno: ${repName}`, styles: s }, { content: `Meno: ${lesseeName}`, styles: s }],
      [{ content: 'Podpis prenaj\u00EDmate\u013Ea:', colSpan: 2, styles: { ...s, minCellHeight: 15 } }],
      [{ content: 'Podpis n\u00E1jomcu:', colSpan: 2, styles: { ...s, minCellHeight: 15 } }],
    ],
    styles: { ...base(f), cellPadding: { top: 1.4, bottom: 1.4, left: 3, right: 2 } },
    columnStyles: { 0: { cellWidth: H * 0.5 }, 1: { cellWidth: H * 0.5 } },
    margin: { left: M, right: M + H },
    theme: 'grid',
  });
  const finalYLeft = doc.lastAutoTable.finalY;

  // RIGHT: Return protocol
  autoTable(doc, {
    startY: sigY,
    head: [[{ content: 'V. PROTOKOL O VRÁTENÍ PP', colSpan: 2, styles: hdr(f) }]],
    body: [
      [{ content: 'Dátum a čas vrátenia:', styles: { ...s, fillColor: NOTES_BG, minCellHeight: 8 } }, { content: returnProtocol, styles: { ...s, fillColor: NOTES_BG, minCellHeight: 8 } }],
      [{ content: 'Stav PP pri vrátení:', styles: { ...s, fillColor: NOTES_BG } }, { content: '', styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Poškodenia / chýbajúce:', styles: { ...s, fillColor: NOTES_BG } }, { content: '', styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Vyčistený: ☐ Áno ☐ Nie', styles: { ...s, fillColor: NOTES_BG } }, { content: 'Foto: ☐ Áno ☐ Nie', styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Podpis prenajímateľa:', colSpan: 2, styles: { ...s, fillColor: NOTES_BG, minCellHeight: 15 } }],
      [{ content: 'Podpis nájomcu:', colSpan: 2, styles: { ...s, fillColor: NOTES_BG, minCellHeight: 15 } }],
    ],
    styles: { ...base(f), cellPadding: { top: 1.4, bottom: 1.4, left: 3, right: 2 } },
    columnStyles: { 0: { cellWidth: H * 0.45 }, 1: { cellWidth: H * 0.55 } },
    margin: { left: M + H, right: M },
    theme: 'grid',
  });
  const finalYRight = doc.lastAutoTable.finalY;
  y = Math.max(finalYLeft, finalYRight);

  const typeTag = isFinalna ? 'finalna' : 'navrh';
  doc.save(`zmluva-PO-${typeTag}-${reservation.reservation_number}.pdf`);
}
