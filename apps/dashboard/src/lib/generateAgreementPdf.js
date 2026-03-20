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

// ── Exact colors from original HTML template ──
const ORANGE = [232, 114, 10];       // #e8720a
const BORDER = [153, 153, 153];      // #999999
const LABEL_COLOR = [85, 85, 85];    // #555555
const VALUE_COLOR = [26, 26, 26];    // #1a1a1a
const WHITE = [255, 255, 255];
const NOTES_BG = [255, 248, 242];    // #fff8f2

// ── Reusable style factories ──
const baseStyles = (font) => ({
  font,
  fontSize: 8.5,
  textColor: VALUE_COLOR,
  lineColor: BORDER,
  lineWidth: 0.5,
  cellPadding: { top: 2.2, bottom: 2.2, left: 4, right: 3 },
});

const orangeHeader = (font) => ({
  fillColor: ORANGE,
  textColor: WHITE,
  fontStyle: 'bold',
  font,
  fontSize: 9,
  cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
});

const lbl = { fontStyle: 'bold', textColor: LABEL_COLOR };
const val = { fontStyle: 'normal', textColor: VALUE_COLOR };

// ══════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════
export default async function generateAgreementPdf(reservation, items, client) {
  const isFO = client?.entity_type === 'fo';
  const doc = await createPdfDoc();
  const f = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  const M = 14;          // left & right margin
  const CW = w - M * 2;  // content width
  const HALF = CW / 2;
  let y = 10;

  // ═══ TITLE ═══
  doc.setFont(f, 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...ORANGE);
  if (isFO) {
    doc.text('ZMLUVA O PREN\u00C1JME HNUTE\u013DN\u00DDCH VEC\u00CD \u2013 SPOTREBITE\u013DSK\u00C1 ZMLUVA', M, y);
  } else {
    doc.text('N\u00C1JOMN\u00C1 ZMLUVA', M, y);
  }
  y += 4;
  doc.setFontSize(7);
  doc.setFont(f, 'normal');
  doc.setTextColor(...LABEL_COLOR);
  const sub = isFO
    ? `| \u00A7 663 a n\u00E1sl. z\u00E1k. \u010D. 40/1964 Zb. OZ |  ROYAL STROJE s.r.o.  |  I\u010CO: 57 405 425  |  VPPM-FO 2026.01`
    : `| ROYAL STROJE s.r.o.  |  I\u010CO: 57 405 425  |  VPPM-PO 2026.01`;
  doc.text(sub, M, y);
  // Orange underline
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.8);
  doc.line(M, y + 2, w - M, y + 2);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.5);
  y += 7;

  // ═══ PARTIES TABLE ═══
  const addr = [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ');
  const ids = [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ');
  const contact = [client?.phone, client?.email].filter(Boolean).join(' / ');

  let partiesBody;
  if (isFO) {
    partiesBody = [
      [{ content: 'Obchodn\u00E9 meno:', styles: lbl }, COMPANY.name, { content: 'Meno a priezvisko:', styles: lbl }, client?.company_name || ''],
      [{ content: 'S\u00EDdlo:', styles: lbl }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'Adresa trval\u00E9ho bydliska:', styles: lbl }, addr],
      [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: lbl }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'D\u00E1tum narodenia:', styles: lbl }, client?.birth_date ? fmtDate(client.birth_date) : ''],
      [{ content: 'Zast\u00FApen\u00FD:', styles: lbl }, COMPANY.represented, { content: '\u010C\u00EDslo OP / pasu:', styles: lbl }, client?.id_card_number || ''],
      [{ content: 'Tel. / E-mail:', styles: lbl }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Telef\u00F3n / E-mail:', styles: lbl }, contact],
      [{ content: 'Zmluva \u010D.:', styles: lbl }, reservation.reservation_number || '', { content: 'Faktura\u010Dn\u00FD e-mail:', styles: lbl }, client?.email || ''],
    ];
  } else {
    partiesBody = [
      [{ content: 'Obchodn\u00E9 meno:', styles: lbl }, COMPANY.name, { content: 'Obchodn\u00E9 meno:', styles: lbl }, client?.company_name || ''],
      [{ content: 'S\u00EDdlo:', styles: lbl }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'S\u00EDdlo:', styles: lbl }, addr],
      [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: lbl }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: lbl }, ids],
      [{ content: 'Zast\u00FApen\u00FD:', styles: lbl }, COMPANY.represented, { content: 'Kontakt:', styles: lbl }, client?.contact_person || ''],
      [{ content: 'Tel. / E-mail:', styles: lbl }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Tel. / E-mail:', styles: lbl }, contact],
      [{ content: 'Zmluva \u010D.:', styles: lbl }, reservation.reservation_number || '', { content: 'Faktura\u010Dn\u00FD e-mail:', styles: lbl }, client?.email || ''],
    ];
  }

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'PRENAJ\u00CDMATE\u013D', colSpan: 2, styles: orangeHeader(f) },
      { content: isFO ? 'N\u00C1JOMCA \u2013 SPOTREBITE\u013D' : 'N\u00C1JOMCA', colSpan: 2, styles: orangeHeader(f) },
    ]],
    body: partiesBody,
    styles: baseStyles(f),
    columnStyles: {
      0: { cellWidth: HALF * 0.355 },  // ~93pt / 262.7pt
      1: { cellWidth: HALF * 0.645 },  // ~169.7pt
      2: { cellWidth: HALF * 0.355 },
      3: { cellWidth: HALF * 0.645 },
    },
    margin: { left: M, right: M },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 3;

  // ═══ EQUIPMENT TABLE ═══
  const eqRows = (items || []).map((item) => [
    item.equipment?.name || item.name || '\u2014',
    '',
    'Denn\u00E1',
    fmtPrice(item.daily_rate * 1.23),
  ]);

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'N\u00E1zov, typ a popis predmetu pren\u00E1jmu (PP)', styles: orangeHeader(f) },
      { content: 'V\u00FDrobn\u00E9 \u010D\u00EDslo', styles: orangeHeader(f) },
      { content: 'Druh sadzby', styles: orangeHeader(f) },
      { content: 'Sadzba/de\u0148 vr\u00E1tane DPH (EUR)', styles: orangeHeader(f) },
    ]],
    body: eqRows.length > 0 ? eqRows : [['', '', '', '']],
    styles: baseStyles(f),
    columnStyles: {
      0: { cellWidth: CW * 0.343 },  // ~180pt / 525.3pt
      1: { cellWidth: CW * 0.209 },  // ~110pt
      2: { cellWidth: CW * 0.171 },  // ~90pt
      3: { cellWidth: CW * 0.277 },  // ~145.3pt
    },
    margin: { left: M, right: M },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 3;

  // ═══ RENTAL INFO + FINANCIAL CONDITIONS ═══
  const renFinBody = [
    [{ content: 'Za\u010Diatok pren\u00E1jmu:', styles: lbl }, fmtDate(reservation.date_from),
     { content: 'Celkov\u00E9 n\u00E1jomn\u00E9 vr\u00E1t. DPH (EUR):', styles: lbl }, fmtPrice(reservation.total)],
    [{ content: 'Dohodnut\u00E1 d\u013A\u017Eka / koniec:', styles: lbl }, fmtDate(reservation.date_to),
     { content: 'Z\u00E1loha (depozit) po\u017Eadovan\u00E1 (EUR):', styles: lbl }, reservation.deposit_required ? '\u00C1no' : 'Nie'],
    [{ content: 'Skuto\u010Dn\u00FD koniec pren\u00E1jmu:', styles: lbl }, '',
     { content: 'Z\u00E1loha (depozit) vr\u00E1ten\u00E1 (EUR):', styles: lbl }, ''],
    [{ content: 'Miesto pou\u017E\u00EDvania PP:', styles: lbl }, reservation.delivery_address || '',
     { content: 'Sp\u00F4sob platby n\u00E1jomn\u00E9ho:', styles: lbl }, 'Prevod / Hotovos\u0165'],
    [{ content: 'Miesto odovzdania PP:', styles: lbl }, reservation.delivery_address || 'Reck\u00E1 cesta 182, Senec',
     { content: 'Sp\u00F4sob \u00FAhrady z\u00E1lohy:', styles: lbl }, 'Prevod / Hotovos\u0165'],
  ];

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'INFORM\u00C1CIE O PREN\u00C1JME', colSpan: 2, styles: orangeHeader(f) },
      { content: 'FINAN\u010CN\u00C9 PODMIENKY', colSpan: 2, styles: orangeHeader(f) },
    ]],
    body: renFinBody,
    styles: baseStyles(f),
    columnStyles: {
      0: { cellWidth: HALF * 0.412 },  // ~108pt / 262.7pt
      1: { cellWidth: HALF * 0.588 },  // ~154.7pt
      2: { cellWidth: HALF * 0.449 },  // ~118pt
      3: { cellWidth: HALF * 0.551 },  // ~144.7pt
    },
    margin: { left: M, right: M },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 3;

  // ═══ NOTES + HANDOVER ═══
  autoTable(doc, {
    startY: y,
    body: [[
      { content: `Ostatn\u00E9 inform\u00E1cie o PP a pr\u00EDslu\u0161enstve:\n${reservation.notes || ''}\n `, styles: { ...lbl, fillColor: NOTES_BG, minCellHeight: 14 } },
      { content: 'Prevzatie PP \u2013 v\u00FDhrady k stavu (ak \u017Eiadne, nechajte pr\u00E1zdne):\n\n ', styles: { ...lbl, fillColor: NOTES_BG, minCellHeight: 14 } },
    ]],
    styles: baseStyles(f),
    columnStyles: { 0: { cellWidth: HALF }, 1: { cellWidth: HALF } },
    margin: { left: M, right: M },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // ═══ LEGAL TEXT ═══
  doc.setFontSize(8);
  doc.setFont(f, 'normal');
  doc.setTextColor(...LABEL_COLOR);

  const legal = isFO
    ? 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca (Spotrebite\u013E) potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-FO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-FO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva sa spravuje z\u00E1konom \u010D. 40/1964 Zb. OZ a z\u00E1konom \u010D. 250/2007 Z. z. o ochrane spotrebite\u013Ea. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk. Miestna pr\u00EDslu\u0161nos\u0165 s\u00FAdu sa riadi platn\u00FDmi predpismi; Spotrebite\u013E m\u00F4\u017Ee poda\u0165 \u017Ealobu aj na s\u00FAde v mieste svojho bydliska.'
    : 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-PO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-PO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk.';

  const lines = doc.splitTextToSize(legal, CW);
  doc.text(lines, M, y);
  y += lines.length * 3.2 + 3;
  doc.setTextColor(0, 0, 0);

  // ═══ SIGNATURES + RETURN PROTOCOL ═══
  const lesseeTitle = isFO ? 'N\u00E1jomca \u2013 spotrebite\u013E:' : 'N\u00E1jomca:';
  const lesseeName = isFO ? (client?.company_name || '') : (client?.contact_person || client?.company_name || '');

  // Signature block - left cell has nested two-column layout
  const sigLeft =
    'Za prenaj\u00EDmate\u013Ea:\n' +
    `Meno a priezvisko: ${COMPANY.represented}\n` +
    '\n___________________________\n' +
    'D\u00E1tum:\n___________________________\n' +
    'Miesto:\n___________________________\n' +
    'Podpis:\n___________________________';

  const sigRight =
    `${lesseeTitle}\n` +
    `Meno a priezvisko: ${lesseeName}\n` +
    '\n___________________________\n' +
    'D\u00E1tum:\n___________________________\n' +
    'Miesto:\n___________________________\n' +
    'Podpis:\n___________________________';

  const sigLeftFull = sigLeft + '\n\n' + sigRight;

  const protocolRight =
    'D\u00E1tum a \u010Das vr\u00E1tenia:\n___________________________________\n\n' +
    'Stav PP pri vr\u00E1ten\u00ED:\n___________________________________\n\n' +
    'Po\u0161kodenia / ch\u00FDbaj\u00FAce pr\u00EDslu\u0161enstvo:\n___________________________________\n\n' +
    'Vy\u010Disten\u00FD:  \u25A1 \u00C1no   \u25A1 Nie    Fotodokument\u00E1cia:  \u25A1 \u00C1no   \u25A1 Nie\n' +
    'Podpis prenaj\u00EDmate\u013Ea:\n___________________________________\n\n' +
    'Podpis n\u00E1jomcu:\n___________________________________';

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'PODPISY ZMLUVN\u00DDCH STR\u00C1N', styles: orangeHeader(f) },
      { content: 'PROTOKOL O VR\u00C1TEN\u00CD PP', styles: orangeHeader(f) },
    ]],
    body: [[
      { content: sigLeftFull, styles: { fontSize: 8, textColor: LABEL_COLOR } },
      { content: protocolRight, styles: { fontSize: 8, textColor: LABEL_COLOR, fillColor: NOTES_BG } },
    ]],
    styles: { ...baseStyles(f), cellPadding: { top: 5, bottom: 5, left: 5, right: 5 } },
    columnStyles: { 0: { cellWidth: HALF }, 1: { cellWidth: HALF } },
    margin: { left: M, right: M },
    theme: 'grid',
  });

  const suffix = isFO ? 'FO' : 'PO';
  doc.save(`zmluva-${suffix}-${reservation.reservation_number}.pdf`);
}
