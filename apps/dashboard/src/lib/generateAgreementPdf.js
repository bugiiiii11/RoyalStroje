import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMPANY } from './companyInfo';

function fmtPrice(val) {
  if (val == null || isNaN(val)) return '0,00 €';
  return parseFloat(val).toFixed(2).replace('.', ',') + ' €';
}

function fmtDate(d) {
  if (!d) return '...........................';
  return new Date(d).toLocaleDateString('sk-SK');
}

export default function generateAgreementPdf(reservation, items, client) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const w = doc.internal.pageSize.getWidth();
  const lm = 14; // left margin
  const rm = w - 14;
  let y = 15;

  // ── Title ──
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('NÁJOMNÁ ZMLUVA', w / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Zmluva č.: ${reservation.reservation_number}`, w / 2, y, { align: 'center' });
  y += 10;

  // ── Parties table ──
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PRENAJÍMATEĽ', lm, y);
  doc.text('NÁJOMCA', w / 2 + 5, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  const leftParty = [
    ['Obchodné meno:', COMPANY.name],
    ['Sídlo:', `${COMPANY.address}, ${COMPANY.city}`],
    ['IČO / DIČ / IČ DPH:', `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`],
    ['Zastúpený:', COMPANY.represented],
    ['Tel. / E-mail:', `${COMPANY.phone} / ${COMPANY.email}`],
  ];
  const rightParty = [
    ['Obchodné meno:', client?.company_name || '...........................'],
    ['Sídlo:', [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ') || '...........................'],
    ['IČO / DIČ / IČ DPH:', [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ') || '...........................'],
    ['Kontakt:', client?.contact_person || '...........................'],
    ['Tel. / E-mail:', [client?.phone, client?.email].filter(Boolean).join(' / ') || '...........................'],
  ];

  for (let i = 0; i < leftParty.length; i++) {
    doc.setFont('helvetica', 'bold');
    doc.text(leftParty[i][0], lm, y);
    doc.text(rightParty[i][0], w / 2 + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(leftParty[i][1], lm + 35, y);
    doc.text(rightParty[i][1], w / 2 + 40, y);
    y += 5;
  }
  y += 5;

  // ── Equipment table ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PREDMET PRENÁJMU', lm, y);
  y += 3;

  const tableData = (items || []).map((item) => [
    item.equipment?.name || item.name || '—',
    '',  // Výrobné číslo
    'Denná',
    fmtPrice(item.daily_rate) + ' s DPH',
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Názov a popis predmetu prenájmu', 'Výrobné číslo', 'Druh sadzby', 'Sadzba/deň vr. DPH']],
    body: tableData.length > 0 ? tableData : [['', '', '', '']],
    styles: { fontSize: 8, cellPadding: 2.5 },
    headStyles: { fillColor: [51, 51, 51], textColor: 255, fontStyle: 'bold' },
    margin: { left: lm, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 8;

  // ── Rental info + Financial conditions ──
  doc.setFontSize(8);
  const col1x = lm;
  const col2x = w / 2 + 5;

  doc.setFont('helvetica', 'bold');
  doc.text('INFORMÁCIE O PRENÁJME', col1x, y);
  doc.text('FINANČNÉ PODMIENKY', col2x, y);
  y += 5;

  const rentalInfo = [
    ['Začiatok prenájmu:', fmtDate(reservation.date_from)],
    ['Dohodnutá dĺžka / koniec:', fmtDate(reservation.date_to)],
    ['Skutočný koniec prenájmu:', '...........................'],
    ['Miesto používania PP:', reservation.delivery_address || '...........................'],
    ['Miesto odovzdania PP:', reservation.delivery_address || 'Recká cesta 182, Senec'],
  ];
  const financialInfo = [
    ['Celkové nájomné vr. DPH:', fmtPrice(reservation.total)],
    ['Záloha (depozit) požad.:', reservation.deposit_required ? 'Áno' : 'Nie'],
    ['Záloha (depozit) vrátená:', '...........................'],
    ['Spôsob platby nájomného:', 'Prevod / Hotovosť'],
    ['Spôsob úhrady zálohy:', 'Prevod / Hotovosť'],
  ];

  doc.setFont('helvetica', 'normal');
  for (let i = 0; i < rentalInfo.length; i++) {
    doc.setFont('helvetica', 'bold');
    doc.text(rentalInfo[i][0], col1x, y);
    doc.text(financialInfo[i][0], col2x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(rentalInfo[i][1], col1x + 40, y);
    doc.text(financialInfo[i][1], col2x + 42, y);
    y += 5;
  }
  y += 5;

  // ── Notes / Handover ──
  doc.setFont('helvetica', 'bold');
  doc.text('Ostatné informácie:', col1x, y);
  doc.text('Prevzatie PP – výhrady k stavu:', col2x, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  if (reservation.notes) {
    doc.text(reservation.notes.substring(0, 80), col1x, y);
  }
  y += 12;

  // ── Legal text ──
  doc.setFontSize(7);
  doc.setTextColor(80);
  const legalText = 'PP je odovzdávaný v stave zodpovedajúcom jeho veku a opotrebeniu. Nájomca potvrdzuje prevzatie PP funkčného a bez výhrad (okrem uvedených). Prílohou č. 1 sú VPPM – neoddeliteľná súčasť Zmluvy; v prípade rozporu má prednosť Zmluva. Nájomca vyhlasuje, že VPPM si preštudoval, obdržal ich v papierovej forme a v plnom rozsahu akceptuje. Zmluva je vyhotovená v 2 rovnopisoch. Prenajímateľ spracúva osobné údaje podľa čl. 6 ods. 1 písm. b) GDPR; podrobnosti na www.royalstroje.sk.';
  const splitText = doc.splitTextToSize(legalText, w - 28);
  doc.text(splitText, lm, y);
  y += splitText.length * 3.5 + 8;

  doc.setTextColor(0);
  doc.setFontSize(8);

  // ── Signatures ──
  doc.setFont('helvetica', 'bold');
  doc.text('PODPISY ZMLUVNÝCH STRÁN', col1x, y);
  doc.text('PROTOKOL O VRÁTENÍ PP', col2x, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.text('Za prenajímateľa:', col1x, y);
  doc.text('Dátum a čas vrátenia:', col2x, y);
  y += 5;
  doc.text(`Meno: ${COMPANY.represented}`, col1x, y);
  doc.text('Stav PP pri vrátení:', col2x, y);
  y += 5;
  doc.text('Dátum:', col1x, y);
  doc.text('Poškodenia:', col2x, y);
  y += 5;
  doc.text('Podpis: ...........................', col1x, y);
  y += 10;

  doc.text('Nájomca:', col1x, y);
  y += 5;
  doc.text(`Meno: ${client?.contact_person || client?.company_name || '...........................'}`, col1x, y);
  y += 5;
  doc.text('Dátum:', col1x, y);
  doc.text('Podpis prenajímateľa:', col2x, y);
  y += 5;
  doc.text('Podpis: ...........................', col1x, y);
  doc.text('Podpis nájomcu:', col2x, y);

  // Save
  doc.save(`zmluva-${reservation.reservation_number}.pdf`);
}
