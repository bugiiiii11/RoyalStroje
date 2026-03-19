/**
 * Generate products.js + clean CSV from the source-of-truth CSV.
 * Source: public/pictures/Katalog-PNG/katalogMVP.csv
 * Output: katalogMVP.csv (root), src/data/products.js
 *
 * Run: node scripts/generate-catalog.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_CSV = path.join(ROOT, 'public/pictures/Katalog-PNG/katalogMVP.csv');
const DST_CSV = path.join(ROOT, 'katalogMVP.csv');
const DST_JS = path.join(ROOT, 'src/data/products.js');

// ---- CSV Parser ----
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

// ---- Slug generator ----
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ---- Mappings ----
const catSlugMap = {
  'Malé náradie': 'male-naradie',
  'Stredná mechanizácia': 'stredna-mechanizacia',
  'Ťažká technika': 'tazka-technika',
  'Pracovné plošiny': 'pracovne-plosiny',
  'Vybavenie staveniska': 'vybavenie-staveniska',
  'Autá a prívesné vozíky': 'auta-privesy',
  'Záhradná technika': 'zahradna-technika',
};

const subcatSlugMap = {
  'Vŕtacie kladivá a vŕtačky': 'vrtacie-kladiva-a-vrtacky',
  'Búracie kladivá': 'buracie-kladiva',
  'Uťahovače a skrutkovače': 'utahovace-a-skrutkovace',
  'Brúsky': 'brusky',
  'Píly a rezačky': 'pily-a-rezacky',
  'Vysávače a čističe': 'vysavace-a-cistice',
  'Čerpadlá': 'cerpadla',
  'Ohrievače a odvlhčovače': 'ohrievace-a-odvlhcovace',
  'Zváracia technika': 'zvaracia-technika',
  'Meracia technika': 'meracia-technika',
  'Vibrátory, lišty a miešadlá': 'vibratory-listy-a-miesadla',
  'Lešenie': 'lesenie',
  'Nádrže': 'nadrze',
  'Príslušenstvo': 'prislusenstvo',
  'Vibračné dosky a nohy': 'vibracne-dosky-a-nohy',
  'Elektrocentrály': 'elektrocentraly',
  'Kompresory': 'kompresory',
  'Cestné rezačky, frézy a brúsky': 'cestne-rezacky-frezy-a-brusky',
  'Stolové píly': 'stolove-pily',
  'Miešačky, hladičky betónu a bádie': 'miesacky-hladicky-betonu-a-badie',
  'Manipulačná technika': 'manipulacna-technika',
  'Pásové mini-rýpadlá': 'pasove-mini-rypadla',
  'Pásové ťažké rýpadlá': 'pasove-tazke-rypadla',
  'Kolesové rýpadla a nakladače': 'kolesove-rypadla-a-nakladace',
  'Šmykom riadené nakladače': 'smykom-riadene-nakladace',
  'Dumpre': 'dumpre',
  'Valce': 'valce',
  'Manipulátory': 'manipulatory',
  'Vysokozdvižné vozíky': 'vysokozdvizne-voziky',
  'Interiérové': 'interierove',
  'Exteriérové': 'exterierove',
  'Kancelárske kontajnery a vrátnice': 'kancelarske-kontajnery-a-vratnice',
  'Skladové kontajnery': 'skladove-kontajnery',
  'Sanitárne kontajnery': 'sanitarne-kontajnery',
  'Mobilné oplotenia a zábrany': 'mobilne-oplotenia-a-zabrany',
  'Mobilné toalety': 'mobilne-toalety',
  'Autá a dodávky': 'auta-a-dodavky',
  'Prívesné vozíky': 'privesne-voziky',
  'Kosačky na trávu': 'kosacky-na-travu',
  'Krovinorezy a motorové píly': 'krovinorezy-a-motorove-pily',
  'Rotavátory': 'rotavatory',
};

// Image folder names (on disk) -- may differ from CSV category names
const catFolderMap = {
  'Malé náradie': 'Malé náradie',
  'Stredná mechanizácia': 'Stredná mechanizácia',
  'Ťažká technika': 'Ťažká technika',
  'Pracovné plošiny': 'Pracovné plošiny',
  'Vybavenie staveniska': 'Vybavenie staveniska',
  'Autá a prívesné vozíky': 'Autá a prívesné vozíky',
  'Záhradná technika': 'Záhradná technika',
};

const subcatFolderMap = {
  'Vŕtacie kladivá a vŕtačky': 'Vŕtacie kladivá a vŕtačky',
  'Búracie kladivá': 'Búracie kladivá',
  'Uťahovače a skrutkovače': 'Uťahovače a skrútkovače',
  'Brúsky': 'Brúsky',
  'Píly a rezačky': 'Píly a rezačky',
  'Vysávače a čističe': 'Vysávače a čističe',
  'Čerpadlá': 'Čerpadlá',
  'Ohrievače a odvlhčovače': 'Ohrievače a odvlhčovače',
  'Zváracia technika': 'Zváracia a meracia technika',
  'Meracia technika': 'Zváracia a meracia technika',
  'Vibrátory, lišty a miešadlá': 'Vibrátory, lišty a miešadlá',
  'Lešenie': 'Lešenie',
  'Nádrže': 'Nádrže',
  'Vibračné dosky a nohy': 'Vibračné dosky a nohy',
  'Elektrocentrály': 'Elektrocentrály',
  'Kompresory': 'Kompresory',
  'Cestné rezačky, frézy a brúsky': 'Cestné rezačky, frézy a brúsky',
  'Stolové píly': 'Stolové píly',
  'Miešačky, hladičky betónu a bádie': 'Miešačky, hladičky betónu a bádie',
  'Manipulačná technika': 'Manipulačná technika',
  'Pásové mini-rýpadlá': 'Pásové mini-rýpadlá',
  'Pásové ťažké rýpadlá': 'Pásové ťažké rýpadlá',
  'Kolesové rýpadlá a nakladače': 'Kolesové rýpadlá a nakladače',
  'Kolesové rýpadla a nakladače': 'Kolesové rýpadlá a nakladače',
  'Šmykom riadené nakladače': 'Šmykom riadené nakladače',
  'Dumpre': 'Dumpre',
  'Valce': 'Valce',
  'Manipulátory': 'Manipulátory',
  'Vysokozdvižné vozíky': 'Vysokozdvižné vozíky',
  'Interiérové': 'Interiérové',
  'Exteriérové': 'Exteriérové',
  'Kancelárske kontajnery a vrátnice': 'Kancelárske kontajnery a vrátnice',
  'Skladové kontajnery': 'Skladové kontajnery',
  'Sanitárne kontajnery': 'Sanitárne kontajnery',
  'Mobilné oplotenia a zábrany': 'Mobilné oplotenia a zábrany',
  'Mobilné toalety': 'Mobilné toalety',
  'Autá a dodávky': 'Autá a dodávky',
  'Prívesné vozíky': 'Prívesné vozíky',
  'Kosačky na trávu': 'Kosačky na trávu',
  'Krovinorezy a motorové píly': 'Krovinorezy a motorové píly',
  'Rotavátory': 'Rotavátory',
};

// ---- Parse source CSV ----
const csvRaw = fs.readFileSync(SRC_CSV, 'utf-8');
const allLines = csvRaw.split('\n');
const headerLine = allLines[0].replace(/\r$/, '');

const products = [];
const cleanLines = [headerLine];

for (let i = 1; i < allLines.length; i++) {
  const raw = allLines[i].replace(/\r$/, '');
  const trimmed = raw.trim();
  if (!trimmed || /^,{4,}/.test(trimmed) || trimmed.startsWith('DELETED')) continue;

  const fields = parseCSVLine(raw);
  const nazov = (fields[0] || '').trim();
  if (!nazov) continue;

  cleanLines.push(raw);

  products.push({
    nazov,
    typ: (fields[1] || '').trim(),
    obrazok: (fields[2] || '').trim(),
    popis1: (fields[3] || '').trim(),
    param1: (fields[4] || '').trim(),
    popis2: (fields[5] || '').trim(),
    param2: (fields[6] || '').trim(),
    popis3: (fields[7] || '').trim(),
    param3: (fields[8] || '').trim(),
    kategoria: (fields[9] || '').trim(),
    podkategoria: (fields[10] || '').trim(),
    cenaBezDph: (fields[11] || '').trim(),
    cenaSdph: (fields[12] || '').trim(),
    url: (fields[14] || '').trim(),
  });
}

// ---- Write clean CSVs ----
const cleanCsv = cleanLines.join('\n') + '\n';
fs.writeFileSync(SRC_CSV, cleanCsv, 'utf-8');
fs.writeFileSync(DST_CSV, cleanCsv, 'utf-8');
console.log(`Clean CSV: ${products.length} products`);

// ---- Build products.js ----
const VAT = 1.23;

// Track group counts
const groupCounts = {};
const jsItems = products.map((p) => {
  const catSlug = catSlugMap[p.kategoria] || slugify(p.kategoria);
  const subTrimmed = p.podkategoria.trim();
  const subcatSlug = subcatSlugMap[subTrimmed] || slugify(subTrimmed);
  const groupKey = catSlug + '/' + subcatSlug;
  groupCounts[groupKey] = (groupCounts[groupKey] || 0) + 1;

  const id = slugify(p.typ || p.nazov);
  const isNeg = /na požiadanie/i.test(p.cenaBezDph);
  const isMonthly = /mesiac/i.test(p.cenaBezDph);
  const pricePerDay = isNeg || isMonthly ? 0 : (parseFloat(p.cenaBezDph.replace(',', '.')) || 0);

  let priceStr;
  if (isNeg) priceStr = 'NA požiadanie';
  else if (isMonthly) priceStr = p.cenaBezDph;
  else if (pricePerDay > 0) priceStr = (Math.round(pricePerDay * VAT * 100) / 100) + '€/deň';
  else priceStr = 'NA požiadanie';

  const features = [];
  if (p.popis1 && p.param1) features.push(p.popis1 + ' - ' + p.param1);
  else if (p.popis1) features.push(p.popis1);
  if (p.popis2 && p.param2) features.push(p.popis2 + ' - ' + p.param2);
  else if (p.popis2) features.push(p.popis2);
  if (p.popis3 && p.param3) features.push(p.popis3 + ' - ' + p.param3);
  else if (p.popis3) features.push(p.popis3);

  const imgName = p.obrazok ? p.obrazok.replace(/\.png$/i, '.webp') : '';
  const catFolder = catFolderMap[p.kategoria] || p.kategoria;
  const subFolder = subcatFolderMap[subTrimmed] || subTrimmed;
  const imagePath = imgName ? `/pictures/Katalog-PNG/${catFolder}/${subFolder}/${imgName}` : '';

  return { id, catSlug, subcatSlug, groupKey, imagePath, priceStr, pricePerDay, nazov: p.nazov, typ: p.typ, features };
});

// Sort by group then by id
jsItems.sort((a, b) => a.groupKey.localeCompare(b.groupKey) || a.id.localeCompare(b.id));

// Escape single quotes for JS strings
const esc = (s) => s.replace(/'/g, "\\'");

let js = '';
js += '// Auto-generované z katalogMVP.csv\n';
js += `// Počet produktov: ${jsItems.length}\n`;
js += '// Posledná aktualizácia: 19. 3. 2026\n';
js += '// Source of truth: public/pictures/Katalog-PNG/katalogMVP.csv\n';
js += '// Regenerovať: node scripts/generate-catalog.js\n';
js += '\nexport const products = [\n';

let lastGroup = '';
for (const p of jsItems) {
  if (p.groupKey !== lastGroup) {
    js += `\n  // ${p.groupKey} (${groupCounts[p.groupKey]} produktov)\n`;
    lastGroup = p.groupKey;
  }
  js += '  {\n';
  js += `    id: '${esc(p.id)}',\n`;
  js += `    name: '${esc(p.typ || p.nazov)}',\n`;
  js += `    category: '${p.catSlug}',\n`;
  js += `    subcategory: '${p.subcatSlug}',\n`;
  js += `    image: '${esc(p.imagePath)}',\n`;
  js += `    price: '${esc(p.priceStr)}',\n`;
  js += `    pricePerDay: ${p.pricePerDay},\n`;
  js += `    description: '${esc(p.nazov)}',\n`;
  js += '    features: [\n';
  for (const f of p.features) {
    js += `      '${esc(f)}',\n`;
  }
  js += '    ],\n';
  js += '    inStock: true,\n';
  js += '    isNew: false,\n';
  js += '    isPopular: false,\n';
  js += '  },\n';
}

js += '];\n\n';
js += '// Helper funkcie\n';
js += "export const getProductsByCategory = (categoryId) => {\n";
js += "  return products.filter(p => p.category === categoryId);\n";
js += "};\n\n";
js += "export const getProductsBySubcategory = (categoryId, subcategoryId) => {\n";
js += "  if (subcategoryId === 'all') {\n";
js += "    return getProductsByCategory(categoryId);\n";
js += "  }\n";
js += "  return products.filter(p => p.category === categoryId && p.subcategory === subcategoryId);\n";
js += "};\n\n";
js += "export const getPopularProducts = () => {\n";
js += "  return products.filter(p => p.isPopular).slice(0, 6);\n";
js += "};\n\n";
js += "export const getNewProducts = () => {\n";
js += "  return products.filter(p => p.isNew).slice(0, 4);\n";
js += "};\n";

fs.writeFileSync(DST_JS, js, 'utf-8');
console.log(`products.js: ${jsItems.length} products`);
console.log('NOTE: After regenerating, run "node scripts/apply-flags.cjs" to restore isNew/isPopular flags.');
console.log('Done!');
