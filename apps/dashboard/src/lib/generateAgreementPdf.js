import autoTable from 'jspdf-autotable';
import { COMPANY } from './companyInfo';
import { createPdfDoc, FONT_NAME } from './pdfFonts';

function fmtPrice(val) {
  if (val == null || isNaN(val)) return '0,00 \u20AC';
  return parseFloat(val).toFixed(2).replace('.', ',') + ' \u20AC';
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

const base = (f) => ({ font: f, fontSize: 8, textColor: VAL_C, lineColor: BORDER, lineWidth: 0.4, cellPadding: { top: 1.8, bottom: 1.8, left: 3, right: 2 } });
const hdr = (f) => ({ fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold', font: f, fontSize: 8.5, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 } });
const L = { fontStyle: 'bold', textColor: LBL_C };

export default async function generateAgreementPdf(reservation, items, client, contractData = null) {
  const isFO = client?.entity_type === 'fo';
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
  const baseTitle = isFO ? 'ZMLUVA O PREN\u00C1JME HNUTE\u013DN\u00DDCH VEC\u00CD \u2013 SPOTREBITE\u013DSK\u00C1 ZMLUVA' : 'N\u00C1JOMN\u00C1 ZMLUVA';
  doc.text(baseTitle, M, y);
  y += 3.5;
  doc.setFontSize(6.5); doc.setFont(f, 'normal'); doc.setTextColor(...LBL_C);
  doc.text(isFO
    ? `| \u00A7 663 a n\u00E1sl. z\u00E1k. \u010D. 40/1964 Zb. OZ | ROYAL STROJE s.r.o. | I\u010CO: 57 405 425 | VPPM-FO 2026.01`
    : `| ROYAL STROJE s.r.o. | I\u010CO: 57 405 425 | VPPM-PO 2026.01`, M, y);
  doc.setDrawColor(...ORANGE); doc.setLineWidth(0.7); doc.line(M, y + 1.5, w - M, y + 1.5);
  doc.setDrawColor(...BORDER); doc.setLineWidth(0.4);
  y += 5;

  // ═══ PARTIES ═══
  const addr = [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ');
  const ids = [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ');
  const ct = [client?.phone, client?.email].filter(Boolean).join(' / ');

  const pBody = isFO ? [
    [{ content: 'Obchodn\u00E9 meno:', styles: L }, COMPANY.name, { content: 'Meno a priezvisko:', styles: L }, client?.company_name || ''],
    [{ content: 'S\u00EDdlo:', styles: L }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'Adresa trval\u00E9ho bydliska:', styles: L }, addr],
    [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: L }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'D\u00E1tum narodenia:', styles: L }, client?.birth_date ? fmtDate(client.birth_date) : ''],
    [{ content: 'Zast\u00FApen\u00FD:', styles: L }, COMPANY.represented, { content: '\u010C\u00EDslo OP / pasu:', styles: L }, client?.id_card_number || ''],
    [{ content: 'Tel. / E-mail:', styles: L }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Telef\u00F3n / E-mail:', styles: L }, ct],
    [{ content: 'Zmluva \u010D.:', styles: L }, reservation.reservation_number || '', { content: 'Faktura\u010Dn\u00FD e-mail:', styles: L }, client?.email || ''],
  ] : [
    [{ content: 'Obchodn\u00E9 meno:', styles: L }, COMPANY.name, { content: 'Obchodn\u00E9 meno:', styles: L }, client?.company_name || ''],
    [{ content: 'S\u00EDdlo:', styles: L }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'S\u00EDdlo:', styles: L }, addr],
    [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: L }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: L }, ids],
    [{ content: 'Zast\u00FApen\u00FD:', styles: L }, COMPANY.represented, { content: 'Kontakt:', styles: L }, client?.contact_person || ''],
    [{ content: 'Tel. / E-mail:', styles: L }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Tel. / E-mail:', styles: L }, ct],
    [{ content: 'Zmluva \u010D.:', styles: L }, reservation.reservation_number || '', { content: 'Faktura\u010Dn\u00FD e-mail:', styles: L }, client?.email || ''],
  ];

  autoTable(doc, {
    startY: y,
    head: [[{ content: 'PRENAJ\u00CDMATE\u013D', colSpan: 2, styles: hdr(f) }, { content: isFO ? 'N\u00C1JOMCA \u2013 SPOTREBITE\u013D' : 'N\u00C1JOMCA', colSpan: 2, styles: hdr(f) }]],
    body: pBody, styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.36 }, 1: { cellWidth: H * 0.64 }, 2: { cellWidth: H * 0.36 }, 3: { cellWidth: H * 0.64 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ EQUIPMENT ═══
  const rateUnitLabel = (u) => u === 'mm' ? 'mm' : u === 'hod' ? 'Hodinov\u00E1' : 'Denn\u00E1';
  const eq = [];
  (items || []).forEach((it) => {
    const qty = it.quantity || 1;
    const serials = Array.isArray(it.serial_numbers) ? it.serial_numbers : [];
    for (let i = 0; i < qty; i++) {
      eq.push([it.equipment?.name || it.name || '\u2014', serials[i] || '', rateUnitLabel(it.equipment?.rate_unit), fmtPrice(it.daily_rate * 1.23)]);
    }
  });
  autoTable(doc, {
    startY: y,
    head: [[{ content: 'N\u00E1zov, typ a popis predmetu pren\u00E1jmu (PP)', styles: hdr(f) }, { content: 'V\u00FDrobn\u00E9 \u010D\u00EDslo', styles: hdr(f) }, { content: 'Druh sadzby', styles: hdr(f) }, { content: 'Sadzba/de\u0148 vr\u00E1tane DPH (EUR)', styles: hdr(f) }]],
    body: eq.length > 0 ? eq : [['', '', '', '']],
    styles: base(f),
    columnStyles: { 0: { cellWidth: CW * 0.34 }, 1: { cellWidth: CW * 0.21 }, 2: { cellWidth: CW * 0.17 }, 3: { cellWidth: CW * 0.28 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ RENTAL + FINANCIAL ═══
  const timeFromStr = contractData?.time_from ? ` o ${contractData.time_from.slice(0, 5)}` : '';
  const actualReturnStr = isFinalna && contractData?.return_date
    ? fmtDate(contractData.return_date) + (contractData.time_to ? ` o ${contractData.time_to.slice(0, 5)}` : '')
    : '';
  // For návrh: leave price blank; only fill in after finalization
  const displayTotal = isFinalna && contractData?.final_total != null
    ? fmtPrice(contractData.final_total)
    : '';
  const depositStr = reservation.deposit_amount > 0
    ? fmtPrice(reservation.deposit_amount)
    : (reservation.deposit_required ? '\u00C1no' : 'Nie');

  const rf = [
    [{ content: 'Za\u010Diatok pren\u00E1jmu (d\u00E1tum od):', styles: L }, fmtDate(reservation.date_from) + timeFromStr, { content: 'Celkov\u00E9 n\u00E1jomn\u00E9 vr\u00E1t. DPH (EUR):', styles: L }, displayTotal],
    [{ content: 'D\u00E1tum do (dohodnut\u00FD koniec):', styles: L }, fmtDate(reservation.date_to), { content: 'Z\u00E1bezpeka (depozit) (EUR):', styles: L }, depositStr],
    [{ content: 'Skuto\u010Dn\u00FD koniec pren\u00E1jmu:', styles: L }, actualReturnStr, { content: 'Z\u00E1bezpeka vr\u00E1ten\u00E1 (EUR):', styles: L }, ''],
    [{ content: 'Miesto pou\u017E\u00EDvania PP:', styles: L }, reservation.usage_location || reservation.delivery_address || '', { content: 'Sp\u00F4sob platby n\u00E1jomn\u00E9ho:', styles: L }, 'Prevod / Hotovos\u0165'],
    [{ content: 'Miesto odovzdania PP:', styles: L }, reservation.delivery_address || 'Reck\u00E1 cesta 182, Senec', { content: 'Sp\u00F4sob \u00FAhrady z\u00E1bezpeky:', styles: L }, 'Prevod / Hotovos\u0165'],
  ];
  autoTable(doc, {
    startY: y,
    head: [[{ content: 'INFORM\u00C1CIE O PREN\u00C1JME', colSpan: 2, styles: hdr(f) }, { content: 'FINAN\u010CN\u00C9 PODMIENKY', colSpan: 2, styles: hdr(f) }]],
    body: rf, styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.41 }, 1: { cellWidth: H * 0.59 }, 2: { cellWidth: H * 0.45 }, 3: { cellWidth: H * 0.55 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ NOTES ═══
  autoTable(doc, {
    startY: y,
    body: [[
      { content: `Ostatn\u00E9 inform\u00E1cie o PP a pr\u00EDslu\u0161enstve:\n${reservation.notes || ''}\n\n `, styles: { ...L, fillColor: NOTES_BG, minCellHeight: 22 } },
      { content: 'Prevzatie PP \u2013 v\u00FDhrady k stavu (ak \u017Eiadne, nechajte pr\u00E1zdne):\n\n\n ', styles: { ...L, fillColor: NOTES_BG, minCellHeight: 22 } },
    ]],
    styles: base(f), columnStyles: { 0: { cellWidth: H }, 1: { cellWidth: H } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 4;

  // ═══ LEGAL ═══
  doc.setFontSize(7); doc.setFont(f, 'normal'); doc.setTextColor(...LBL_C);
  const legal = isFO
    ? 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca (Spotrebite\u013E) potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-FO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-FO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva sa spravuje z\u00E1konom \u010D. 40/1964 Zb. OZ a z\u00E1konom \u010D. 250/2007 Z. z. o ochrane spotrebite\u013Ea. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk. Miestna pr\u00EDslu\u0161nos\u0165 s\u00FAdu sa riadi platn\u00FDmi predpismi; Spotrebite\u013E m\u00F4\u017Ee poda\u0165 \u017Ealobu aj na s\u00FAde v mieste svojho bydliska.'
    : 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-PO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-PO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk.';
  const ll = doc.splitTextToSize(legal, CW);
  doc.text(ll, M, y);
  y += ll.length * 2.8 + 2;
  doc.setTextColor(0, 0, 0);

  // ═══ SIGNATURES (two side-by-side tables for wider signature rows) ═══
  const lesseeTitle = isFO ? 'N\u00E1jomca \u2013 spotrebite\u013E:' : 'N\u00E1jomca:';
  const lesseeName = isFO ? (client?.company_name || '') : (client?.contact_person || client?.company_name || '');
  const repName = COMPANY.represented.replace(/, konate\u013E/i, '');
  const returnProtocol = isFinalna && contractData?.return_date
    ? fmtDate(contractData.return_date) + (contractData.time_to ? ` o ${contractData.time_to.slice(0, 5)}` : '')
    : '';
  const s = { fontSize: 7, textColor: LBL_C };
  const sigY = y;
  const todayStr = new Date().toLocaleDateString('sk-SK');

  // LEFT: Signature table
  autoTable(doc, {
    startY: sigY,
    head: [[{ content: 'PODPISY ZMLUVN\u00DDCH STR\u00C1N', colSpan: 2, styles: hdr(f) }]],
    body: [
      [{ content: 'Za prenaj\u00EDmate\u013Ea:', styles: { ...s, fontStyle: 'bold' } }, { content: lesseeTitle, styles: { ...s, fontStyle: 'bold' } }],
      [{ content: `Meno: ${repName}`, styles: s }, { content: `Meno: ${lesseeName}`, styles: s }],
      [{ content: `D\u00E1tum: ${todayStr}`, styles: s }, { content: `D\u00E1tum: ${todayStr}`, styles: s }],
      [{ content: 'Miesto: Boldog \u2013 Senec', styles: s }, { content: 'Miesto:', styles: s }],
      [{ content: 'Podpis prenaj\u00EDmate\u013Ea:', colSpan: 2, styles: { ...s, minCellHeight: 15 } }],
      [{ content: 'Podpis n\u00E1jomcu:', colSpan: 2, styles: { ...s, minCellHeight: 15 } }],
    ],
    styles: { ...base(f), cellPadding: { top: 1.5, bottom: 1.5, left: 3, right: 2 } },
    columnStyles: { 0: { cellWidth: H * 0.5 }, 1: { cellWidth: H * 0.5 } },
    margin: { left: M, right: M + H },
    theme: 'grid',
  });
  const finalYLeft = doc.lastAutoTable.finalY;

  // RIGHT: Return protocol table
  autoTable(doc, {
    startY: sigY,
    head: [[{ content: 'PROTOKOL O VR\u00C1TEN\u00CD PP', colSpan: 2, styles: hdr(f) }]],
    body: [
      [{ content: 'D\u00E1tum a \u010Das vr\u00E1tenia:', styles: { ...s, fillColor: NOTES_BG } }, { content: returnProtocol, styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Stav PP pri vr\u00E1ten\u00ED:', styles: { ...s, fillColor: NOTES_BG } }, { content: '', styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Po\u0161kodenia / ch\u00FDbaj\u00FAce:', styles: { ...s, fillColor: NOTES_BG } }, { content: '', styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Vy\u010Disten\u00FD: \u25A1 \u00C1no \u25A1 Nie', styles: { ...s, fillColor: NOTES_BG } }, { content: 'Foto: \u25A1 \u00C1no \u25A1 Nie', styles: { ...s, fillColor: NOTES_BG } }],
      [{ content: 'Podpis prenaj\u00EDmate\u013Ea:', colSpan: 2, styles: { ...s, fillColor: NOTES_BG, minCellHeight: 15 } }],
      [{ content: 'Podpis n\u00E1jomcu:', colSpan: 2, styles: { ...s, fillColor: NOTES_BG, minCellHeight: 15 } }],
    ],
    styles: { ...base(f), cellPadding: { top: 1.5, bottom: 1.5, left: 3, right: 2 } },
    columnStyles: { 0: { cellWidth: H * 0.45 }, 1: { cellWidth: H * 0.55 } },
    margin: { left: M + H, right: M },
    theme: 'grid',
  });
  const finalYRight = doc.lastAutoTable.finalY;
  y = Math.max(finalYLeft, finalYRight);

  const typeTag = isFinalna ? 'finalna' : 'navrh';
  doc.save(`zmluva-${isFO ? 'FO' : 'PO'}-${typeTag}-${reservation.reservation_number}.pdf`);
}
