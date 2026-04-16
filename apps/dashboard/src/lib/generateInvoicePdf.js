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

const ORANGE = [232, 114, 10];
const BORDER = [153, 153, 153];
const LBL_C = [85, 85, 85];
const VAL_C = [26, 26, 26];
const WHITE = [255, 255, 255];
const NOTES_BG = [255, 248, 242];

const base = (f) => ({ font: f, fontSize: 8, textColor: VAL_C, lineColor: BORDER, lineWidth: 0.4, cellPadding: { top: 1.8, bottom: 1.8, left: 3, right: 2 } });
const hdr = (f) => ({ fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold', font: f, fontSize: 8.5, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 } });
const L = { fontStyle: 'bold', textColor: LBL_C };

const TYPE_TITLES = {
  proforma: 'PROFORMA FAKT\u00DARA',
  invoice: 'FAKT\u00DARA',
  credit_note: 'DOBROPIS',
};

export default async function generateInvoicePdf(invoice, reservation, items, client) {
  const doc = await createPdfDoc();
  const f = FONT_NAME;
  const w = doc.internal.pageSize.getWidth();
  const M = 12;
  const CW = w - M * 2;
  const H = CW / 2;
  let y = 9;

  const isFO = client?.entity_type === 'fo';

  // \u2550\u2550\u2550 TITLE \u2550\u2550\u2550
  const title = TYPE_TITLES[invoice.type] || 'FAKT\u00DARA';
  doc.setFont(f, 'bold'); doc.setFontSize(10.5); doc.setTextColor(...ORANGE);
  doc.text(`${title}  \u2014  \u010D. ${invoice.invoice_number || ''}`, M, y);
  y += 3.5;
  doc.setFontSize(6.5); doc.setFont(f, 'normal'); doc.setTextColor(...LBL_C);
  doc.text(`| ROYAL STROJE s.r.o. | I\u010CO: ${COMPANY.ico} | IBAN: ${COMPANY.iban}`, M, y);
  doc.setDrawColor(...ORANGE); doc.setLineWidth(0.7); doc.line(M, y + 1.5, w - M, y + 1.5);
  doc.setDrawColor(...BORDER); doc.setLineWidth(0.4);
  y += 5;

  // \u2550\u2550\u2550 PARTIES \u2550\u2550\u2550
  const addr = [client?.address, client?.city, client?.postal_code].filter(Boolean).join(', ');
  const ids = [client?.ico, client?.dic, client?.ic_dph].filter(Boolean).join(' / ');
  const ct = [client?.phone, client?.email].filter(Boolean).join(' / ');

  const pBody = [
    [{ content: 'Obchodn\u00E9 meno:', styles: L }, COMPANY.name, { content: isFO ? 'Meno a priezvisko:' : 'Obchodn\u00E9 meno:', styles: L }, client?.company_name || ''],
    [{ content: 'S\u00EDdlo:', styles: L }, `${COMPANY.address}, ${COMPANY.city}`, { content: isFO ? 'Adresa:' : 'S\u00EDdlo:', styles: L }, addr],
    [{ content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: L }, `${COMPANY.ico} / ${COMPANY.dic} / ${COMPANY.ic_dph}`, { content: 'I\u010CO / DI\u010C / I\u010C DPH:', styles: L }, ids || ''],
    [{ content: 'Tel. / E-mail:', styles: L }, `${COMPANY.phone} / ${COMPANY.email}`, { content: 'Tel. / E-mail:', styles: L }, ct],
  ];

  autoTable(doc, {
    startY: y,
    head: [[{ content: 'DOD\u00C1VATE\u013D', colSpan: 2, styles: hdr(f) }, { content: 'ODBERATE\u013D', colSpan: 2, styles: hdr(f) }]],
    body: pBody, styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.36 }, 1: { cellWidth: H * 0.64 }, 2: { cellWidth: H * 0.36 }, 3: { cellWidth: H * 0.64 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // \u2550\u2550\u2550 INVOICE DETAILS \u2550\u2550\u2550
  const periodStr = reservation
    ? `${fmtDate(reservation.date_from)} \u2013 ${fmtDate(reservation.date_to)}`
    : '\u2014';
  const detailsBody = [
    [{ content: 'D\u00E1tum vystavenia:', styles: L }, fmtDate(invoice.issue_date || new Date()), { content: 'D\u00E1tum splatnosti:', styles: L }, fmtDate(invoice.due_date)],
    [{ content: 'Obchod \u010D.:', styles: L }, reservation?.reservation_number || '\u2014', { content: 'Term\u00EDn pren\u00E1jmu:', styles: L }, periodStr],
    [{ content: 'Variabiln\u00FD symbol:', styles: L }, (invoice.invoice_number || '').replace(/\D/g, ''), { content: 'Kon\u0161tantn\u00FD symbol:', styles: L }, '0308'],
  ];
  autoTable(doc, {
    startY: y,
    head: [[{ content: 'FAKTURA\u010CN\u00C9 \u00DADAJE', colSpan: 4, styles: hdr(f) }]],
    body: detailsBody, styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.41 }, 1: { cellWidth: H * 0.59 }, 2: { cellWidth: H * 0.41 }, 3: { cellWidth: H * 0.59 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // \u2550\u2550\u2550 EQUIPMENT \u2550\u2550\u2550
  const rateUnitLabel = (u) => u === 'mm' ? 'mm' : u === 'hod' ? 'Hodinov\u00E1' : 'Denn\u00E1';
  const eq = [];
  (items || []).forEach((it) => {
    const qty = parseInt(it.quantity, 10) || 1;
    const serials = Array.isArray(it.serial_numbers) ? it.serial_numbers : [];
    const days = it.days != null ? it.days : '';
    const unitPriceVat = (parseFloat(it.daily_rate) || 0) * 1.23;
    const lineTotal = it.line_total != null
      ? parseFloat(it.line_total)
      : (parseFloat(it.daily_rate) || 0) * qty * (parseFloat(days) || 0);
    if (serials.length >= qty && qty > 0) {
      // One row per serial (qty=1 each)
      for (let i = 0; i < qty; i++) {
        const perUnitTotal = (parseFloat(it.daily_rate) || 0) * (parseFloat(days) || 0);
        eq.push([
          it.equipment?.name || it.name || '\u2014',
          serials[i] || '',
          rateUnitLabel(it.equipment?.rate_unit),
          String(days),
          fmtPrice(unitPriceVat),
          fmtPrice(perUnitTotal),
        ]);
      }
    } else {
      eq.push([
        it.equipment?.name || it.name || '\u2014',
        serials.join(', '),
        `${rateUnitLabel(it.equipment?.rate_unit)} \u00D7 ${qty} ks`,
        String(days),
        fmtPrice(unitPriceVat),
        fmtPrice(lineTotal),
      ]);
    }
  });
  autoTable(doc, {
    startY: y,
    head: [[
      { content: 'N\u00E1zov, typ a popis PP', styles: hdr(f) },
      { content: 'V\u00FDrobn\u00E9 \u010D\u00EDslo', styles: hdr(f) },
      { content: 'Druh sadzby', styles: hdr(f) },
      { content: 'Dn\u00ED', styles: hdr(f) },
      { content: 'Sadzba vr. DPH', styles: hdr(f) },
      { content: 'Spolu vr. DPH', styles: hdr(f) },
    ]],
    body: eq.length > 0 ? eq : [['\u2014', '', '', '', '', '']],
    styles: base(f),
    columnStyles: {
      0: { cellWidth: CW * 0.30 },
      1: { cellWidth: CW * 0.18 },
      2: { cellWidth: CW * 0.14 },
      3: { cellWidth: CW * 0.08, halign: 'center' },
      4: { cellWidth: CW * 0.14, halign: 'right' },
      5: { cellWidth: CW * 0.16, halign: 'right' },
    },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // \u2550\u2550\u2550 FINANCIAL SUMMARY \u2550\u2550\u2550
  const vatRate = invoice.vat_rate || 23;
  const finBody = [];
  finBody.push([{ content: 'Medzis\u00FA\u010Det bez DPH:', styles: L }, fmtPrice(invoice.subtotal)]);
  if (reservation && parseFloat(reservation.discount_amount) > 0) {
    finBody.push([{ content: `Z\u013Eava (${reservation.discount_percent}%):`, styles: L }, `-${fmtPrice(reservation.discount_amount)}`]);
  }
  if (reservation && parseFloat(reservation.delivery_fee) > 0) {
    finBody.push([{ content: 'Dovoz:', styles: L }, fmtPrice(reservation.delivery_fee)]);
  }
  finBody.push([{ content: `DPH (${vatRate}%):`, styles: L }, fmtPrice(invoice.vat_amount)]);
  finBody.push([
    { content: 'CELKOM VR\u00C1TANE DPH:', styles: { ...L, textColor: ORANGE, fontSize: 9 } },
    { content: fmtPrice(invoice.total), styles: { fontStyle: 'bold', textColor: ORANGE, fontSize: 9, halign: 'right' } },
  ]);
  if (reservation && parseFloat(reservation.deposit_amount) > 0) {
    finBody.push([{ content: 'Z\u00E1bezpeka (depozit):', styles: L }, fmtPrice(reservation.deposit_amount)]);
  }

  autoTable(doc, {
    startY: y,
    head: [[{ content: 'FINAN\u010CN\u00DD S\u00DAHRN', colSpan: 2, styles: hdr(f) }]],
    body: finBody, styles: base(f),
    columnStyles: { 0: { cellWidth: CW * 0.70 }, 1: { cellWidth: CW * 0.30, halign: 'right' } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // \u2550\u2550\u2550 PAYMENT INFO \u2550\u2550\u2550
  const vs = (invoice.invoice_number || '').replace(/\D/g, '');
  const paymentBody = [
    [{ content: 'IBAN:', styles: L }, COMPANY.iban || 'DOPLNI\u0164', { content: 'Variabiln\u00FD symbol:', styles: L }, vs],
    [{ content: 'SWIFT/BIC:', styles: L }, COMPANY.swift || '\u2014', { content: 'Kon\u0161tantn\u00FD symbol:', styles: L }, '0308'],
    [{ content: 'Sp\u00F4sob \u00FAhrady:', styles: L }, 'Prevodom na \u00FA\u010Det', { content: 'Splatnos\u0165:', styles: L }, fmtDate(invoice.due_date)],
  ];
  autoTable(doc, {
    startY: y,
    head: [[{ content: 'PLATOBN\u00C9 \u00DADAJE', colSpan: 4, styles: hdr(f) }]],
    body: paymentBody, styles: base(f),
    columnStyles: { 0: { cellWidth: H * 0.35 }, 1: { cellWidth: H * 0.65 }, 2: { cellWidth: H * 0.41 }, 3: { cellWidth: H * 0.59 } },
    margin: { left: M, right: M }, theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 2;

  // \u2550\u2550\u2550 NOTES \u2550\u2550\u2550
  if (invoice.notes) {
    autoTable(doc, {
      startY: y,
      body: [[{ content: `Pozn\u00E1mky:\n${invoice.notes}`, styles: { ...L, fillColor: NOTES_BG, minCellHeight: 14 } }]],
      styles: base(f), columnStyles: { 0: { cellWidth: CW } },
      margin: { left: M, right: M }, theme: 'grid',
    });
    y = doc.lastAutoTable.finalY + 4;
  }

  // \u2550\u2550\u2550 FOOTER \u2550\u2550\u2550
  doc.setFontSize(7); doc.setFont(f, 'normal'); doc.setTextColor(...LBL_C);
  const footer = `${COMPANY.name} \u00B7 ${COMPANY.address}, ${COMPANY.city} \u00B7 I\u010CO: ${COMPANY.ico} \u00B7 ${COMPANY.web || ''}`;
  doc.text(footer, M, 290);
  doc.setTextColor(0, 0, 0);

  const prefix = invoice.type === 'proforma' ? 'proforma' : invoice.type === 'credit_note' ? 'dobropis' : 'faktura';
  doc.save(`${prefix}-${invoice.invoice_number}.pdf`);
}
