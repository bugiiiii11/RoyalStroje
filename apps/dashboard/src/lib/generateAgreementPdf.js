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

const ORANGE = [255, 102, 0];
const WHITE = [255, 255, 255];
const LIGHT_GRAY = [245, 245, 245];
const BORDER_COLOR = [200, 200, 200];

// Shared table styles
const cellStyles = (font) => ({
  fontSize: 7.5,
  cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
  font,
  lineColor: BORDER_COLOR,
  lineWidth: 0.3,
});

const headerStyles = (font) => ({
  fillColor: ORANGE,
  textColor: WHITE,
  fontStyle: 'bold',
  font,
  fontSize: 8,
  cellPadding: { top: 3, bottom: 3, left: 3, right: 3 },
});

const labelStyle = { fontStyle: 'bold', textColor: [60, 60, 60] };
const valueStyle = { fontStyle: 'normal', textColor: [30, 30, 30] };

export default async function generateAgreementPdf(reservation, items, client) {
  const isFO = client?.entity_type === 'fo';
  const doc = await createPdfDoc();
  const font = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  const lm = 12;
  const rm = 12;
  const contentWidth = w - lm - rm;
  let y = 10;

  // ═══════════════════════════════════════════
  // TITLE
  // ═══════════════════════════════════════════
  doc.setFontSize(10);
  doc.setFont(font, 'bold');
  if (isFO) {
    doc.text('ZMLUVA O PREN\u00C1JME HNUTE\u013DN\u00DDCH VEC\u00CD \u2013 SPOTREBITE\u013DSK\u00C1 ZMLUVA', w / 2, y, { align: 'center' });
    y += 4;
    doc.setFontSize(6.5);
    doc.setFont(font, 'normal');
    doc.text('| \u00A7 663 a n\u00E1sl. z\u00E1k. \u010D. 40/1964 Zb. OZ |', w / 2, y, { align: 'center' });
    y += 3;
    doc.text(`ROYAL STROJE s.r.o. | I\u010CO: 57 405 425 | VPPM-FO 2026.01`, w / 2, y, { align: 'center' });
  } else {
    doc.text('N\u00C1JOMN\u00C1 ZMLUVA', w / 2, y, { align: 'center' });
    y += 4;
    doc.setFontSize(7);
    doc.setFont(font, 'normal');
    doc.text(`ROYAL STROJE s.r.o. | I\u010CO: 57 405 425 | VPPM-PO 2026.01`, w / 2, y, { align: 'center' });
  }
  y += 5;

  // ═══════════════════════════════════════════
  // PARTIES TABLE
  // ═══════════════════════════════════════════
  const halfW = contentWidth / 2;
  const addr = [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ');

  let partiesBody;
  if (isFO) {
    partiesBody = [
      [{ content: 'Obchodn\u00E9 meno:', styles: labelStyle }, COMPANY.name, { content: 'Meno a priezvisko:', styles: labelStyle }, client?.company_name || ''],
      [{ content: 'S\u00EDdlo:', styles: labelStyle }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'Adresa trval\u00E9ho bydliska:', styles: labelStyle }, addr || ''],
      [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: labelStyle }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'D\u00E1tum narodenia:', styles: labelStyle }, client?.birth_date ? fmtDate(client.birth_date) : ''],
      [{ content: 'Zast\u00FApen\u00FD:', styles: labelStyle }, COMPANY.represented, { content: '\u010C\u00EDslo OP / pasu:', styles: labelStyle }, client?.id_card_number || ''],
      [{ content: 'Tel. / E-mail:', styles: labelStyle }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Telef\u00F3n / E-mail:', styles: labelStyle }, [client?.phone, client?.email].filter(Boolean).join(' / ') || ''],
      [{ content: 'Zmluva \u010D.:', styles: labelStyle }, reservation.reservation_number || '', { content: 'Faktura\u010Dn\u00FD e-mail:', styles: labelStyle }, client?.email || ''],
    ];
  } else {
    partiesBody = [
      [{ content: 'Obchodn\u00E9 meno:', styles: labelStyle }, COMPANY.name, { content: 'Obchodn\u00E9 meno:', styles: labelStyle }, client?.company_name || ''],
      [{ content: 'S\u00EDdlo:', styles: labelStyle }, `${COMPANY.address}, ${COMPANY.city}`, { content: 'S\u00EDdlo:', styles: labelStyle }, addr || ''],
      [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: labelStyle }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: labelStyle }, [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ') || ''],
      [{ content: 'Zast\u00FApen\u00FD:', styles: labelStyle }, COMPANY.represented, { content: 'Kontakt:', styles: labelStyle }, client?.contact_person || ''],
      [{ content: 'Tel. / E-mail:', styles: labelStyle }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Tel. / E-mail:', styles: labelStyle }, [client?.phone, client?.email].filter(Boolean).join(' / ') || ''],
      [{ content: 'Zmluva \u010D.:', styles: labelStyle }, reservation.reservation_number || '', { content: 'Faktura\u010Dn\u00FD e-mail:', styles: labelStyle }, client?.email || ''],
    ];
  }

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'PRENAJ\u00CDMATE\u013D', colSpan: 2, styles: headerStyles(font) },
      { content: isFO ? 'N\u00C1JOMCA \u2013 SPOTREBITE\u013D' : 'N\u00C1JOMCA', colSpan: 2, styles: headerStyles(font) },
    ]],
    body: partiesBody,
    styles: cellStyles(font),
    columnStyles: {
      0: { cellWidth: halfW * 0.38, ...labelStyle },
      1: { cellWidth: halfW * 0.62 },
      2: { cellWidth: halfW * 0.42, ...labelStyle },
      3: { cellWidth: halfW * 0.58 },
    },
    margin: { left: lm, right: rm },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 4;

  // ═══════════════════════════════════════════
  // EQUIPMENT TABLE
  // ═══════════════════════════════════════════
  const tableData = (items || []).map((item) => [
    item.equipment?.name || item.name || '\u2014',
    '',
    'Denn\u00E1',
    fmtPrice(item.daily_rate * 1.23) + '',
  ]);
  // Pad to minimum 5 rows for empty space
  while (tableData.length < 5) tableData.push(['', '', '', '']);

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'N\u00E1zov, typ a popis predmetu pren\u00E1jmu (PP)', styles: headerStyles(font) },
      { content: 'V\u00FDrobn\u00E9 \u010D\u00EDslo', styles: headerStyles(font) },
      { content: 'Druh sadzby', styles: headerStyles(font) },
      { content: 'Sadzba/de\u0148 vr\u00E1tane DPH (EUR)', styles: headerStyles(font) },
    ]],
    body: tableData,
    styles: cellStyles(font),
    columnStyles: {
      0: { cellWidth: contentWidth * 0.42 },
      1: { cellWidth: contentWidth * 0.18 },
      2: { cellWidth: contentWidth * 0.17 },
      3: { cellWidth: contentWidth * 0.23 },
    },
    margin: { left: lm, right: rm },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 4;

  // ═══════════════════════════════════════════
  // RENTAL INFO + FINANCIAL CONDITIONS TABLE
  // ═══════════════════════════════════════════
  const rentalFinBody = [
    [
      { content: 'Za\u010Diatok pren\u00E1jmu:', styles: labelStyle },
      fmtDate(reservation.date_from),
      { content: 'Celkov\u00E9 n\u00E1jomn\u00E9 vr\u00E1t. DPH (EUR):', styles: labelStyle },
      fmtPrice(reservation.total),
    ],
    [
      { content: 'Dohodnut\u00E1 d\u013A\u017Eka / koniec:', styles: labelStyle },
      fmtDate(reservation.date_to),
      { content: 'Z\u00E1loha (depozit) po\u017Eadovan\u00E1 (EUR):', styles: labelStyle },
      reservation.deposit_required ? '\u00C1no' : 'Nie',
    ],
    [
      { content: 'Skuto\u010Dn\u00FD koniec pren\u00E1jmu:', styles: labelStyle },
      '',
      { content: 'Z\u00E1loha (depozit) vr\u00E1ten\u00E1 (EUR):', styles: labelStyle },
      '',
    ],
    [
      { content: 'Miesto pou\u017E\u00EDvania PP:', styles: labelStyle },
      reservation.delivery_address || '',
      { content: 'Sp\u00F4sob platby n\u00E1jomn\u00E9ho:', styles: labelStyle },
      'Prevod / Hotovos\u0165',
    ],
    [
      { content: 'Miesto odovzdania PP:', styles: labelStyle },
      reservation.delivery_address || 'Reck\u00E1 cesta 182, Senec',
      { content: 'Sp\u00F4sob \u00FAhrady z\u00E1lohy:', styles: labelStyle },
      'Prevod / Hotovos\u0165',
    ],
  ];

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'INFORM\u00C1CIE O PREN\u00C1JME', colSpan: 2, styles: headerStyles(font) },
      { content: 'FINAN\u010CN\u00C9 PODMIENKY', colSpan: 2, styles: headerStyles(font) },
    ]],
    body: rentalFinBody,
    styles: cellStyles(font),
    columnStyles: {
      0: { cellWidth: halfW * 0.42, ...labelStyle },
      1: { cellWidth: halfW * 0.58 },
      2: { cellWidth: halfW * 0.46, ...labelStyle },
      3: { cellWidth: halfW * 0.54 },
    },
    margin: { left: lm, right: rm },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 4;

  // ═══════════════════════════════════════════
  // NOTES + HANDOVER TABLE
  // ═══════════════════════════════════════════
  autoTable(doc, {
    startY: y,
    body: [[
      { content: `Ostatn\u00E9 inform\u00E1cie o PP a pr\u00EDslu\u0161enstve:\n${reservation.notes || ''}`, styles: { ...labelStyle, minCellHeight: 14 } },
      { content: 'Prevzatie PP \u2013 v\u00FDhrady k stavu (ak \u017Eiadne, nechajte pr\u00E1zdne):\n', styles: { ...labelStyle, minCellHeight: 14 } },
    ]],
    styles: cellStyles(font),
    columnStyles: {
      0: { cellWidth: halfW },
      1: { cellWidth: halfW },
    },
    margin: { left: lm, right: rm },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 3;

  // ═══════════════════════════════════════════
  // LEGAL TEXT
  // ═══════════════════════════════════════════
  doc.setFontSize(6);
  doc.setTextColor(80);
  doc.setFont(font, 'normal');

  const legalText = isFO
    ? 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca (Spotrebite\u013E) potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-FO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-FO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva sa spravuje z\u00E1konom \u010D. 40/1964 Zb. OZ a z\u00E1konom \u010D. 250/2007 Z. z. o ochrane spotrebite\u013Ea. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk. Miestna pr\u00EDslu\u0161nos\u0165 s\u00FAdu sa riadi platn\u00FDmi predpismi; Spotrebite\u013E m\u00F4\u017Ee poda\u0165 \u017Ealobu aj na s\u00FAde v mieste svojho bydliska.'
    : 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-PO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-PO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk.';

  const splitText = doc.splitTextToSize(legalText, contentWidth);
  doc.text(splitText, lm, y);
  y += splitText.length * 2.8 + 4;
  doc.setTextColor(0);

  // ═══════════════════════════════════════════
  // SIGNATURES + RETURN PROTOCOL TABLE
  // ═══════════════════════════════════════════
  const lesseeLabel = isFO ? 'N\u00E1jomca \u2013 spotrebite\u013E:' : 'N\u00E1jomca:';
  const lesseeName = isFO ? (client?.company_name || '') : (client?.contact_person || client?.company_name || '');

  const sigLeft =
    `Za prenaj\u00EDmate\u013Ea:\nMeno a priezvisko: ${COMPANY.represented}\n\n________________________\nD\u00E1tum:\n________________________\nMiesto:\n________________________\nPodpis:\n________________________\n\n${lesseeLabel}\nMeno a priezvisko: ${lesseeName}\n\n________________________\nD\u00E1tum:\n________________________\nMiesto:\n________________________\nPodpis:\n________________________`;

  const sigRight =
    `D\u00E1tum a \u010Das vr\u00E1tenia:\n________________________\nStav PP pri vr\u00E1ten\u00ED:\n________________________\n________________________\nPo\u0161kodenia / ch\u00FDbaj\u00FAce pr\u00EDslu\u0161enstvo:\n________________________\n________________________\nVy\u010Disten\u00FD: \u25A1 \u00C1no  \u25A1 Nie    Fotodokument\u00E1cia: \u25A1 \u00C1no  \u25A1 Nie\nPodpis prenaj\u00EDmate\u013Ea:\n________________________\n\nPodpis n\u00E1jomcu:\n________________________`;

  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'PODPISY ZMLUVN\u00DDCH STR\u00C1N', styles: headerStyles(font) },
      { content: 'PROTOKOL O VR\u00C1TEN\u00CD PP', styles: headerStyles(font) },
    ]],
    body: [[
      { content: sigLeft, styles: { minCellHeight: 70 } },
      { content: sigRight, styles: { minCellHeight: 70 } },
    ]],
    styles: { ...cellStyles(font), fontSize: 7 },
    columnStyles: {
      0: { cellWidth: halfW },
      1: { cellWidth: halfW },
    },
    margin: { left: lm, right: rm },
    theme: 'grid',
  });

  const suffix = isFO ? 'FO' : 'PO';
  doc.save(`zmluva-${suffix}-${reservation.reservation_number}.pdf`);
}
