import { jsPDF } from 'jspdf';

let fontsLoaded = false;
let fontRegular = null;
let fontBold = null;

async function loadFont(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function ensureFonts() {
  if (fontsLoaded) return;
  try {
    [fontRegular, fontBold] = await Promise.all([
      loadFont('/fonts/Inter-Regular.ttf'),
      loadFont('/fonts/Inter-Bold.ttf'),
    ]);
    fontsLoaded = true;
  } catch (e) {
    console.warn('Failed to load Inter fonts for PDF:', e);
  }
}

export async function createPdfDoc(orientation = 'p') {
  await ensureFonts();

  const doc = new jsPDF(orientation, 'mm', 'a4');

  if (fontsLoaded) {
    doc.addFileToVFS('Inter-Regular.ttf', fontRegular);
    doc.addFont('Inter-Regular.ttf', 'Inter', 'normal', 'Identity-H');
    doc.addFileToVFS('Inter-Bold.ttf', fontBold);
    doc.addFont('Inter-Bold.ttf', 'Inter', 'bold', 'Identity-H');
    doc.setFont('Inter');
  }

  return doc;
}

export const FONT_NAME = 'Inter';
