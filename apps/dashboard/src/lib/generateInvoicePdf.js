import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMPANY } from './companyInfo';

function fmtPrice(val) {
  if (val == null || isNaN(val)) return '0,00 €';
  return parseFloat(val).toFixed(2).replace('.', ',') + ' €';
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('sk-SK');
}

const TYPE_TITLES = {
  proforma: 'PROFORMA FAKTÚRA',
  invoice: 'FAKTÚRA',
  credit_note: 'DOBROPIS',
};

export default function generateInvoicePdf(invoice, reservation, items, client) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const w = doc.internal.pageSize.getWidth();
  let y = 15;

  // Title
  const title = TYPE_TITLES[invoice.type] || 'FAKTÚRA';
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, y);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`č. ${invoice.invoice_number}`, 14, y + 7);
  y += 18;

  doc.setDrawColor(200);
  doc.line(14, y, w - 14, y);
  y += 8;

  // Dodávateľ / Odberateľ
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('DODÁVATEĽ', 14, y);
  doc.text('ODBERATEĽ', w / 2 + 5, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  const leftLines = [
    COMPANY.name, COMPANY.address, COMPANY.city,
    `IČO: ${COMPANY.ico}`, `DIČ: ${COMPANY.dic}`, `IČ DPH: ${COMPANY.ic_dph}`,
    `Tel.: ${COMPANY.phone}`, `Email: ${COMPANY.email}`,
  ];
  const rightLines = [
    client?.company_name || '—', client?.address || '',
    [client?.postal_code, client?.city].filter(Boolean).join(' '),
    client?.ico ? `IČO: ${client.ico}` : '',
    client?.dic ? `DIČ: ${client.dic}` : '',
    client?.ic_dph ? `IČ DPH: ${client.ic_dph}` : '',
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

  // Invoice details
  doc.setFont('helvetica', 'bold');
  const details = [
    ['Dátum vystavenia:', fmtDate(invoice.issue_date)],
    ['Dátum splatnosti:', fmtDate(invoice.due_date)],
    ['Obchod č.:', reservation?.reservation_number || '—'],
    ['Termín prenájmu:', `${fmtDate(reservation?.date_from)} – ${fmtDate(reservation?.date_to)}`],
  ];
  for (const [label, value] of details) {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 55, y);
    y += 5;
  }
  y += 5;

  // Items table
  const tableData = (items || []).map((item) => [
    item.equipment?.name || item.name || '—',
    item.quantity,
    fmtPrice(item.daily_rate),
    item.days,
    fmtPrice(item.line_total),
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Zariadenie', 'Ks', 'Sadzba/deň', 'Dní', 'Spolu']],
    body: tableData,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [51, 51, 51], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 75 }, 1: { halign: 'center', cellWidth: 15 },
      2: { halign: 'right', cellWidth: 30 }, 3: { halign: 'center', cellWidth: 15 },
      4: { halign: 'right', cellWidth: 30 },
    },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Financials
  const financials = [['Medzisúčet', fmtPrice(invoice.subtotal)]];
  if (reservation && parseFloat(reservation.discount_amount) > 0) {
    financials.push([`Zľava (${reservation.discount_percent}%)`, `-${fmtPrice(reservation.discount_amount)}`]);
  }
  if (reservation && parseFloat(reservation.delivery_fee) > 0) {
    financials.push(['Dovoz', fmtPrice(reservation.delivery_fee)]);
  }
  financials.push([`DPH (${invoice.vat_rate || 23}%)`, fmtPrice(invoice.vat_amount)]);

  doc.setFontSize(9);
  for (const [label, value] of financials) {
    doc.text(label, w - 90, y);
    doc.text(value, w - 14, y, { align: 'right' });
    y += 5;
  }
  y += 2;
  doc.line(w - 90, y, w - 14, y);
  y += 6;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CELKOM', w - 90, y);
  doc.text(fmtPrice(invoice.total), w - 14, y, { align: 'right' });
  y += 12;

  // Payment info
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Platobné údaje', 14, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.text(`IBAN: ${COMPANY.iban}`, 14, y); y += 4.5;
  const vs = (invoice.invoice_number || '').replace(/\D/g, '');
  doc.text(`Variabilný symbol: ${vs}`, 14, y); y += 4.5;
  doc.text(`Konštantný symbol: 0308`, 14, y); y += 10;

  // Notes
  if (invoice.notes) {
    doc.setFont('helvetica', 'bold');
    doc.text('Poznámky:', 14, y); y += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.text(invoice.notes, 14, y); y += 8;
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`${COMPANY.name} · ${COMPANY.address}, ${COMPANY.city} · ${COMPANY.web}`, 14, 285);

  doc.save(`${invoice.type === 'proforma' ? 'proforma' : invoice.type === 'credit_note' ? 'dobropis' : 'faktura'}-${invoice.invoice_number}.pdf`);
}
