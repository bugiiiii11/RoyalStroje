import autoTable from 'jspdf-autotable';
import { COMPANY } from './companyInfo';
import { createPdfDoc, FONT_NAME } from './pdfFonts';

function fmtPrice(val) {
  if (val == null || isNaN(val)) return '0,00 \u20AC';
  return parseFloat(val).toFixed(2).replace('.', ',') + ' \u20AC';
}

function fmtDate(d) {
  if (!d) return '\u2014';
  return new Date(d).toLocaleDateString('sk-SK');
}

export default async function generateQuotePdf(reservation, items, client) {
  const doc = await createPdfDoc();
  const font = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  let y = 15;

  // Title
  doc.setFontSize(18);
  doc.setFont(font, 'bold');
  doc.text('CENOV\u00C1 PONUKA', 14, y);
  doc.setFontSize(12);
  doc.setFont(font, 'normal');
  doc.text(`\u010D. ${reservation.reservation_number}`, 82, y);
  y += 10;

  doc.setDrawColor(200);
  doc.line(14, y, w - 14, y);
  y += 8;

  // Dodavatel / Odberatel
  doc.setFontSize(9);
  doc.setFont(font, 'bold');
  doc.text('DOD\u00C1VATE\u013D', 14, y);
  doc.text('ODBERATE\u013D', w / 2 + 5, y);
  y += 5;

  doc.setFont(font, 'normal');
  const leftLines = [
    COMPANY.name, COMPANY.address, COMPANY.city,
    `I\u010CO: ${COMPANY.ico}`, `DI\u010C: ${COMPANY.dic}`, `I\u010C DPH: ${COMPANY.ic_dph}`,
    `Tel.: ${COMPANY.phone}`, `Email: ${COMPANY.email}`,
  ];
  const rightLines = [
    client?.company_name || '\u2014', client?.address || '',
    [client?.postal_code, client?.city].filter(Boolean).join(' '),
    client?.ico ? `I\u010CO: ${client.ico}` : '',
    client?.dic ? `DI\u010C: ${client.dic}` : '',
    client?.ic_dph ? `I\u010C DPH: ${client.ic_dph}` : '',
    client?.phone ? `Tel.: ${client.phone}` : '',
    client?.email ? `Email: ${client.email}` : '',
  ].filter(Boolean);

  const maxLines = Math.max(leftLines.length, rightLines.length);
  for (let i = 0; i < maxLines; i++) {
    if (leftLines[i]) doc.text(leftLines[i], 14, y);
    if (rightLines[i]) doc.text(rightLines[i], w / 2 + 5, y);
    y += 4.5;
  }
  y += 4;

  // Dates
  doc.setFont(font, 'bold');
  doc.text('D\u00E1tum vystavenia: ', 14, y);
  doc.setFont(font, 'normal');
  doc.text(fmtDate(new Date()), 55, y);
  y += 5;

  doc.setFont(font, 'bold');
  doc.text('Term\u00EDn pren\u00E1jmu: ', 14, y);
  doc.setFont(font, 'normal');
  doc.text(`${fmtDate(reservation.date_from)} \u2013 ${fmtDate(reservation.date_to)}`, 55, y);
  y += 10;

  // Items table
  const tableData = (items || []).map((item) => [
    item.equipment?.name || item.name || '\u2014',
    item.quantity,
    fmtPrice(item.daily_rate),
    item.days,
    fmtPrice(item.line_total),
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Zariadenie', 'Ks', 'Sadzba/de\u0148', 'Dn\u00ED', 'Spolu']],
    body: tableData,
    styles: { fontSize: 9, cellPadding: 3, font: font },
    headStyles: { fillColor: [51, 51, 51], textColor: 255, fontStyle: 'bold', font: font },
    columnStyles: {
      0: { cellWidth: 75 }, 1: { halign: 'center', cellWidth: 15 },
      2: { halign: 'right', cellWidth: 30 }, 3: { halign: 'center', cellWidth: 15 },
      4: { halign: 'right', cellWidth: 30 },
    },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Financials
  const financials = [['Medzis\u00FA\u010Det', fmtPrice(reservation.subtotal)]];
  if (parseFloat(reservation.discount_amount) > 0) {
    financials.push([`Z\u013Eava (${reservation.discount_percent}%)`, `-${fmtPrice(reservation.discount_amount)}`]);
  }
  if (parseFloat(reservation.delivery_fee) > 0) {
    financials.push(['Dovoz', fmtPrice(reservation.delivery_fee)]);
  }
  financials.push([`DPH (${COMPANY.vatRate}%)`, fmtPrice(reservation.vat_amount)]);

  doc.setFontSize(9);
  doc.setFont(font, 'normal');
  for (const [label, value] of financials) {
    doc.text(label, w - 90, y);
    doc.text(value, w - 14, y, { align: 'right' });
    y += 5;
  }
  y += 2;
  doc.setDrawColor(200);
  doc.line(w - 90, y, w - 14, y);
  y += 6;

  doc.setFontSize(12);
  doc.setFont(font, 'bold');
  doc.text('CELKOM', w - 90, y);
  doc.text(fmtPrice(reservation.total), w - 14, y, { align: 'right' });
  y += 12;

  // Payment info
  doc.setFontSize(9);
  doc.setFont(font, 'bold');
  doc.text('Platobn\u00E9 \u00FAdaje', 14, y);
  y += 5;
  doc.setFont(font, 'normal');
  doc.text(`IBAN: ${COMPANY.iban}`, 14, y);
  y += 4.5;
  const vsNumber = (reservation.reservation_number || '').replace(/\D/g, '');
  doc.text(`Variabiln\u00FD symbol: ${vsNumber}`, 14, y);
  y += 4.5;

  if (reservation.deposit_required) {
    doc.text(`Z\u00E1loha (depozit): ${reservation.deposit_amount > 0 ? fmtPrice(reservation.deposit_amount) : 'vy\u017Eadovan\u00E1'}`, 14, y);
    y += 4.5;
  }

  // Footer
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`${COMPANY.name} \u00B7 ${COMPANY.address}, ${COMPANY.city} \u00B7 ${COMPANY.web}`, 14, y);

  doc.save(`cenova-ponuka-${reservation.reservation_number}.pdf`);
}
