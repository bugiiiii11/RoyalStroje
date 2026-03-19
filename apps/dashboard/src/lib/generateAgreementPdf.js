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

export default async function generateAgreementPdf(reservation, items, client) {
  const doc = await createPdfDoc();
  const font = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  const lm = 14;
  const rm = w - 14;
  let y = 15;

  // Title
  doc.setFontSize(14);
  doc.setFont(font, 'bold');
  doc.text('N\u00C1JOMN\u00C1 ZMLUVA', w / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(10);
  doc.setFont(font, 'normal');
  doc.text(`Zmluva \u010D.: ${reservation.reservation_number}`, w / 2, y, { align: 'center' });
  y += 10;

  // Parties
  doc.setFontSize(8);
  doc.setFont(font, 'bold');
  doc.text('PRENAJ\u00CDMATE\u013D', lm, y);
  doc.text('N\u00C1JOMCA', w / 2 + 5, y);
  y += 5;

  doc.setFont(font, 'normal');
  const leftParty = [
    ['Obchodn\u00E9 meno:', COMPANY.name],
    ['S\u00EDdlo:', `${COMPANY.address}, ${COMPANY.city}`],
    ['I\u010CO / DI\u010C / I\u010C DPH:', `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`],
    ['Zast\u00FApen\u00FD:', COMPANY.represented],
    ['Tel. / E-mail:', `${COMPANY.phone} / ${COMPANY.email}`],
  ];
  const rightParty = [
    ['Obchodn\u00E9 meno:', client?.company_name || '...........................'],
    ['S\u00EDdlo:', [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ') || '...........................'],
    ['I\u010CO / DI\u010C / I\u010C DPH:', [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ') || '...........................'],
    ['Kontakt:', client?.contact_person || '...........................'],
    ['Tel. / E-mail:', [client?.phone, client?.email].filter(Boolean).join(' / ') || '...........................'],
  ];

  for (let i = 0; i < leftParty.length; i++) {
    doc.setFont(font, 'bold');
    doc.text(leftParty[i][0], lm, y);
    doc.text(rightParty[i][0], w / 2 + 5, y);
    doc.setFont(font, 'normal');
    doc.text(leftParty[i][1], lm + 35, y);
    doc.text(rightParty[i][1], w / 2 + 40, y);
    y += 5;
  }
  y += 5;

  // Equipment table
  doc.setFont(font, 'bold');
  doc.setFontSize(9);
  doc.text('PREDMET PREN\u00C1JMU', lm, y);
  y += 3;

  const tableData = (items || []).map((item) => [
    item.equipment?.name || item.name || '\u2014',
    '',
    'Denn\u00E1',
    fmtPrice(item.daily_rate) + ' s DPH',
  ]);

  autoTable(doc, {
    startY: y,
    head: [['N\u00E1zov a popis predmetu pren\u00E1jmu', 'V\u00FDrobn\u00E9 \u010D\u00EDslo', 'Druh sadzby', 'Sadzba/de\u0148 vr. DPH']],
    body: tableData.length > 0 ? tableData : [['', '', '', '']],
    styles: { fontSize: 8, cellPadding: 2.5, font: font },
    headStyles: { fillColor: [51, 51, 51], textColor: 255, fontStyle: 'bold', font: font },
    margin: { left: lm, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 8;

  // Rental info + Financial conditions
  doc.setFontSize(8);
  const col1x = lm;
  const col2x = w / 2 + 5;

  doc.setFont(font, 'bold');
  doc.text('INFORM\u00C1CIE O PREN\u00C1JME', col1x, y);
  doc.text('FINAN\u010CN\u00C9 PODMIENKY', col2x, y);
  y += 5;

  const rentalInfo = [
    ['Za\u010Diatok pren\u00E1jmu:', fmtDate(reservation.date_from)],
    ['Dohodnut\u00E1 d\u013A\u017Eka / koniec:', fmtDate(reservation.date_to)],
    ['Skuto\u010Dn\u00FD koniec pren\u00E1jmu:', '...........................'],
    ['Miesto pou\u017E\u00EDvania PP:', reservation.delivery_address || '...........................'],
    ['Miesto odovzdania PP:', reservation.delivery_address || 'Reck\u00E1 cesta 182, Senec'],
  ];
  const financialInfo = [
    ['Celkov\u00E9 n\u00E1jomn\u00E9 vr. DPH:', fmtPrice(reservation.total)],
    ['Z\u00E1loha (depozit) po\u017Ead.:', reservation.deposit_required ? '\u00C1no' : 'Nie'],
    ['Z\u00E1loha (depozit) vr\u00E1ten\u00E1:', '...........................'],
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
    doc.text(financialInfo[i][1], col2x + 42, y);
    y += 5;
  }
  y += 5;

  // Notes / Handover
  doc.setFont(font, 'bold');
  doc.text('Ostatn\u00E9 inform\u00E1cie:', col1x, y);
  doc.text('Prevzatie PP \u2013 v\u00FDhrady k stavu:', col2x, y);
  y += 5;
  doc.setFont(font, 'normal');
  if (reservation.notes) {
    doc.text(reservation.notes.substring(0, 80), col1x, y);
  }
  y += 12;

  // Legal text
  doc.setFontSize(7);
  doc.setTextColor(80);
  const legalText = 'PP je odovzd\u00E1van\u00FD v stave zodpovedaj\u00FAcom jeho veku a opotrebeniu. N\u00E1jomca potvr\u0164uje prevzatie PP funk\u010Dn\u00E9ho a bez v\u00FDhrad (okrem uveden\u00FDch). Pr\u00EDlohou \u010D. 1 s\u00FA VPPM \u2013 neoddelite\u013En\u00E1 s\u00FA\u010Das\u0165 Zmluvy; v pr\u00EDpade rozporu m\u00E1 prednos\u0165 Zmluva. N\u00E1jomca vyhlasuje, \u017Ee VPPM si pre\u0161tudoval, obdr\u017Eal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva je vyhotoven\u00E1 v 2 rovnopisoch. Prenaj\u00EDmate\u013D sprac\u00FAva osobn\u00E9 \u00FAdaje pod\u013Ea \u010Dl. 6 ods. 1 p\u00EDsm. b) GDPR; podrobnosti na www.royalstroje.sk.';
  const splitText = doc.splitTextToSize(legalText, w - 28);
  doc.text(splitText, lm, y);
  y += splitText.length * 3.5 + 8;

  doc.setTextColor(0);
  doc.setFontSize(8);

  // Signatures
  doc.setFont(font, 'bold');
  doc.text('PODPISY ZMLUVN\u00DDCH STR\u00C1N', col1x, y);
  doc.text('PROTOKOL O VR\u00C1TEN\u00CD PP', col2x, y);
  y += 8;

  doc.setFont(font, 'normal');
  doc.text('Za prenaj\u00EDmate\u013Ea:', col1x, y);
  doc.text('D\u00E1tum a \u010Das vr\u00E1tenia:', col2x, y);
  y += 5;
  doc.text(`Meno: ${COMPANY.represented}`, col1x, y);
  doc.text('Stav PP pri vr\u00E1ten\u00ED:', col2x, y);
  y += 5;
  doc.text('D\u00E1tum:', col1x, y);
  doc.text('Po\u0161kodenia:', col2x, y);
  y += 5;
  doc.text('Podpis: ...........................', col1x, y);
  y += 10;

  doc.text('N\u00E1jomca:', col1x, y);
  y += 5;
  doc.text(`Meno: ${client?.contact_person || client?.company_name || '...........................'}`, col1x, y);
  y += 5;
  doc.text('D\u00E1tum:', col1x, y);
  doc.text('Podpis prenaj\u00EDmate\u013Ea:', col2x, y);
  y += 5;
  doc.text('Podpis: ...........................', col1x, y);
  doc.text('Podpis n\u00E1jomcu:', col2x, y);

  doc.save(`zmluva-${reservation.reservation_number}.pdf`);
}
