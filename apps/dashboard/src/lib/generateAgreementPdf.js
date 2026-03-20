import autoTable from 'jspdf-autotable';
import { COMPANY } from './companyInfo';
import { createPdfDoc, FONT_NAME } from './pdfFonts';

function fmtPrice(val) {
  if (val == null || isNaN(val)) return '0,00 \u20AC';
  return parseFloat(val).toFixed(2).replace('.', ',') + ' \u20AC';
}

function fmtDate(d) {
  if (!d) return '...........................';
  return new Date(d).toLocaleDateString('sk-SK');
}

const BLANK = '...........................';

// ──────────────────────────────────────────────
// Shared sections used by both FO and PO
// ──────────────────────────────────────────────

function drawHeader(doc, font, w, reservation, isFO) {
  let y = 12;
  // Title
  doc.setFontSize(11);
  doc.setFont(font, 'bold');
  const title = isFO
    ? 'ZMLUVA O PREN\u00C1JME HNUTE\u013DN\u00DDCH VEC\u00CD \u2013 SPOTREBITE\u013DSK\u00C1 ZMLUVA'
    : 'N\u00C1JOMN\u00C1 ZMLUVA';
  doc.text(title, w / 2, y, { align: 'center' });
  y += 4;

  doc.setFontSize(7);
  doc.setFont(font, 'normal');
  if (isFO) {
    doc.text('\u00A7 663 a n\u00E1sl. z\u00E1k. \u010D. 40/1964 Zb. OZ', w / 2, y, { align: 'center' });
    y += 3;
    doc.text(`ROYAL STROJE s.r.o. | I\u010CO: 57 405 425 | VPPM-FO 2026.01`, w / 2, y, { align: 'center' });
  } else {
    doc.text(`Zmluva \u010D.: ${reservation.reservation_number}`, w / 2, y, { align: 'center' });
  }
  y += 3;

  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text(`Zmluva \u010D.: ${reservation.reservation_number}`, w / 2, y, { align: 'center' });
  y += 7;

  return y;
}

function drawEquipmentTable(doc, font, items, lm, y) {
  doc.setFont(font, 'bold');
  doc.setFontSize(9);

  const tableData = (items || []).map((item) => [
    item.equipment?.name || item.name || '\u2014',
    '',
    'Denn\u00E1',
    fmtPrice(item.daily_rate) + ' s DPH',
  ]);

  autoTable(doc, {
    startY: y,
    head: [['N\u00E1zov, typ a popis predmetu pren\u00E1jmu (PP)', 'V\u00FDrobn\u00E9 \u010D\u00EDslo', 'Druh sadzby', 'Sadzba/de\u0148 vr\u00E1tane DPH (EUR)']],
    body: tableData.length > 0 ? tableData : [['', '', '', '']],
    styles: { fontSize: 7.5, cellPadding: 2.5, font: font },
    headStyles: { fillColor: [255, 102, 0], textColor: 255, fontStyle: 'bold', font: font },
    margin: { left: lm, right: 14 },
  });

  return doc.lastAutoTable.finalY + 6;
}

function drawRentalAndFinancial(doc, font, reservation, w, lm, y) {
  const col1x = lm;
  const col2x = w / 2 + 5;

  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text('INFORM\u00C1CIE O PREN\u00C1JME', col1x, y);
  doc.text('FINAN\u010CN\u00C9 PODMIENKY', col2x, y);
  y += 5;

  const rentalInfo = [
    ['Za\u010Diatok pren\u00E1jmu:', fmtDate(reservation.date_from)],
    ['Dohodnut\u00E1 d\u013A\u017Eka / koniec:', fmtDate(reservation.date_to)],
    ['Skuto\u010Dn\u00FD koniec pren\u00E1jmu:', BLANK],
    ['Miesto pou\u017E\u00EDvania PP:', reservation.delivery_address || BLANK],
    ['Miesto odovzdania PP:', reservation.delivery_address || 'Reck\u00E1 cesta 182, Senec'],
  ];
  const financialInfo = [
    ['Celkov\u00E9 n\u00E1jomn\u00E9 vr\u00E1t. DPH (EUR):', fmtPrice(reservation.total)],
    ['Z\u00E1loha (depozit) po\u017Eadovan\u00E1 (EUR):', reservation.deposit_required ? '\u00C1no' : 'Nie'],
    ['Z\u00E1loha (depozit) vr\u00E1ten\u00E1 (EUR):', BLANK],
    ['Sp\u00F4sob platby n\u00E1jomn\u00E9ho:', 'Prevod / Hotovos\u0165'],
    ['Sp\u00F4sob \u00FAhrady z\u00E1lohy:', 'Prevod / Hotovos\u0165'],
  ];

  doc.setFont(font, 'normal');
  for (let i = 0; i < rentalInfo.length; i++) {
    doc.setFont(font, 'bold');
    doc.text(rentalInfo[i][0], col1x, y);
    doc.text(financialInfo[i][0], col2x, y);
    doc.setFont(font, 'normal');
    doc.text(rentalInfo[i][1], col1x + 40, y);
    doc.text(financialInfo[i][1], col2x + 46, y);
    y += 5;
  }
  return y + 3;
}

function drawNotesAndHandover(doc, font, reservation, lm, w, y) {
  const col2x = w / 2 + 5;
  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text('Ostatn\u00E9 inform\u00E1cie o PP a pr\u00EDslu\u0161enstve:', lm, y);
  doc.text('Prevzatie PP \u2013 v\u00FDhrady k stavu (ak \u017Eiadne, nechajte pr\u00E1zdne):', col2x, y);
  y += 5;
  doc.setFont(font, 'normal');
  if (reservation.notes) {
    doc.text(reservation.notes.substring(0, 80), lm, y);
  }
  return y + 10;
}

function drawSignatures(doc, font, client, lm, w, y, isFO) {
  const col2x = w / 2 + 5;
  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text('PODPISY ZMLUVN\u00DDCH STR\u00C1N', lm, y);
  doc.text('PROTOKOL O VR\u00C1TEN\u00CD PP', col2x, y);
  y += 8;

  doc.setFont(font, 'normal');
  doc.text('Za prenaj\u00EDmate\u013Ea:', lm, y);
  doc.text('D\u00E1tum a \u010Das vr\u00E1tenia:', col2x, y);
  y += 5;
  doc.text(`Meno a priezvisko: ${COMPANY.represented}`, lm, y);
  doc.text('Stav PP pri vr\u00E1ten\u00ED:', col2x, y);
  y += 5;
  doc.text('D\u00E1tum:', lm, y);
  doc.text('Po\u0161kodenia / ch\u00FDbaj\u00FAce pr\u00EDslu\u0161enstvo:', col2x, y);
  y += 5;
  doc.text('Miesto:', lm, y);
  y += 5;
  doc.text('Podpis: ...........................', lm, y);
  y += 10;

  const nameLabel = isFO ? 'N\u00E1jomca \u2013 spotrebite\u013E:' : 'N\u00E1jomca:';
  doc.text(nameLabel, lm, y);
  y += 5;
  doc.text(`Meno a priezvisko: ${client?.contact_person || client?.company_name || BLANK}`, lm, y);
  doc.text('Vy\u010Disten\u00FD: \u25A1 \u00C1no  \u25A1 Nie   Fotodokument\u00E1cia: \u25A1 \u00C1no  \u25A1 Nie', col2x, y);
  y += 5;
  doc.text('D\u00E1tum:', lm, y);
  doc.text('Podpis prenaj\u00EDmate\u013Ea:', col2x, y);
  y += 5;
  doc.text('Miesto:', lm, y);
  y += 5;
  doc.text('Podpis: ...........................', lm, y);
  doc.text('Podpis n\u00E1jomcu:', col2x, y);
}

// ──────────────────────────────────────────────
// PO (Právnická osoba) Agreement
// ──────────────────────────────────────────────

function drawPartiesPO(doc, font, client, w, lm, y) {
  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text('PRENAJ\u00CDMATE\u013D', lm, y);
  doc.text('N\u00C1JOMCA', w / 2 + 5, y);
  y += 5;

  const leftParty = [
    ['Obchodn\u00E9 meno:', COMPANY.name],
    ['S\u00EDdlo:', `${COMPANY.address}, ${COMPANY.city}`],
    ['I\u010CO / DI\u010C / I\u010C DPH:', `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`],
    ['Zast\u00FApen\u00FD:', COMPANY.represented],
    ['Tel. / E-mail:', `${COMPANY.phone} / ${COMPANY.email}`],
  ];
  const rightParty = [
    ['Obchodn\u00E9 meno:', client?.company_name || BLANK],
    ['S\u00EDdlo:', [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ') || BLANK],
    ['I\u010CO / DI\u010C / I\u010C DPH:', [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ') || BLANK],
    ['Kontakt:', client?.contact_person || BLANK],
    ['Tel. / E-mail:', [client?.phone, client?.email].filter(Boolean).join(' / ') || BLANK],
  ];

  doc.setFont(font, 'normal');
  for (let i = 0; i < leftParty.length; i++) {
    doc.setFont(font, 'bold');
    doc.text(leftParty[i][0], lm, y);
    doc.text(rightParty[i][0], w / 2 + 5, y);
    doc.setFont(font, 'normal');
    doc.text(leftParty[i][1], lm + 35, y);
    doc.text(rightParty[i][1], w / 2 + 40, y);
    y += 5;
  }
  return y + 5;
}

// ──────────────────────────────────────────────
// FO (Fyzická osoba) Agreement - Spotrebiteľská zmluva
// ──────────────────────────────────────────────

function drawPartiesFO(doc, font, client, w, lm, y) {
  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text('PRENAJ\u00CDMATE\u013D', lm, y);
  doc.text('N\u00C1JOMCA \u2013 SPOTREBITE\u013D', w / 2 + 5, y);
  y += 5;

  const leftParty = [
    ['Obchodn\u00E9 meno:', COMPANY.name],
    ['S\u00EDdlo:', `${COMPANY.address}, ${COMPANY.city}`],
    ['I\u010CO / DI\u010C / I\u010C DPH:', `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`],
    ['Zast\u00FApen\u00FD:', COMPANY.represented],
    ['Tel. / E-mail:', `${COMPANY.phone} / ${COMPANY.email}`],
    ['Zmluva \u010D.:', ''],
  ];
  const rightParty = [
    ['Meno a priezvisko:', client?.company_name || BLANK],
    ['Adresa trval\u00E9ho bydliska:', [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ') || BLANK],
    ['D\u00E1tum narodenia:', client?.birth_date ? fmtDate(client.birth_date) : BLANK],
    ['\u010C\u00EDslo OP / pasu:', client?.id_card_number || BLANK],
    ['Telef\u00F3n / E-mail:', [client?.phone, client?.email].filter(Boolean).join(' / ') || BLANK],
    ['Faktura\u010Dn\u00FD e-mail:', client?.email || BLANK],
  ];

  doc.setFont(font, 'normal');
  for (let i = 0; i < leftParty.length; i++) {
    doc.setFont(font, 'bold');
    doc.text(leftParty[i][0], lm, y);
    doc.text(rightParty[i][0], w / 2 + 5, y);
    doc.setFont(font, 'normal');
    doc.text(leftParty[i][1], lm + 35, y);
    doc.text(rightParty[i][1], w / 2 + 40, y);
    y += 5;
  }
  return y + 5;
}

function drawLegalText(doc, font, w, lm, y, isFO) {
  doc.setFontSize(6.5);
  doc.setTextColor(80);

  const legalText = isFO
    ? 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca (Spotrebite\u013E) potvrdzuje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM-FO 2026.01 \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM-FO si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva sa spravuje z\u00E1konom \u010D. 40/1964 Zb. OZ a z\u00E1konom \u010D. 250/2007 Z. z. o ochrane spotrebite\u013Ea. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk. Miestna pr\u00EDslu\u0161nos\u0165 s\u00FAdu sa riadi platn\u00FDmi predpismi; Spotrebite\u013E m\u00F4\u017Ee poda\u0165 \u017Ealobu aj na s\u00FAde v mieste svojho bydliska.'
    : 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca potvr\u0164uje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013E sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk.';

  const splitText = doc.splitTextToSize(legalText, w - 28);
  doc.text(splitText, lm, y);
  y += splitText.length * 3 + 6;
  doc.setTextColor(0);
  doc.setFontSize(8);
  return y;
}

// ──────────────────────────────────────────────
// Main export
// ──────────────────────────────────────────────

export default async function generateAgreementPdf(reservation, items, client) {
  const isFO = client?.entity_type === 'fo';
  const doc = await createPdfDoc();
  const font = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  const lm = 14;

  let y = drawHeader(doc, font, w, reservation, isFO);

  // Parties section — different layout for FO vs PO
  if (isFO) {
    y = drawPartiesFO(doc, font, client, w, lm, y);
  } else {
    y = drawPartiesPO(doc, font, client, w, lm, y);
  }

  // Equipment table
  y = drawEquipmentTable(doc, font, items, lm, y);

  // Rental info + financial conditions
  y = drawRentalAndFinancial(doc, font, reservation, w, lm, y);

  // Notes & handover
  y = drawNotesAndHandover(doc, font, reservation, lm, w, y);

  // Legal text
  y = drawLegalText(doc, font, w, lm, y, isFO);

  // Signatures + return protocol
  drawSignatures(doc, font, client, lm, w, y, isFO);

  const suffix = isFO ? 'FO' : 'PO';
  doc.save(`zmluva-${suffix}-${reservation.reservation_number}.pdf`);
}
