import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 GENEROVANIE PRODUCTS.JS Z CSV A PNG\n');
console.log('='.repeat(80));

// Mapovanie kategórií na slug formát
const categorySlugMapping = {
  'Malé náradie': 'male-naradie',
  'Stredná mechanizácia': 'stredna-mechanizacia',
  'Ťažká technika': 'tazka-technika',
  'Pracovné plošiny': 'pracovne-plosiny',
  'Vybavenie staveniska': 'vybavenie-staveniska',
  'Autá a prívesné vozíky': 'auta-privesy',
  'Záhradná technika': 'zahradna-technika',
};

// Mapovanie CSV podkategórií na PNG názvy priečinkov
const subcategoryFolderMapping = {
  // Malé náradie
  'vŕtacie, búracie kladivá a vŕtačky': 'vŕtacie, búracie kladivá a vŕtačky',
  'uhlové, vibračné a pásové brúsky.': 'Uhlové, vibračné a pásové brúsky',
  'ručné píly a rezačky.': 'ručné píly a rezačky',
  'Vysávače, tepovače a tlakové čističe': 'Vysávače, tepovače a tlakové čističe',
  'Čerpadlá, ohrievače a odvlhčovače': 'Čerpadlá, ohrievače a odvlhčovače',
  'Zváracia  a meracia technika': 'Zváracia a meracia technika',
  'Zváracia a meracia technika': 'Zváracia a meracia technika',
  'Vibrátory, vibračné lišty a miešadlá': 'Vibrátory, vibračné lišty a miešadlá',
  'Lešenie': 'Lešenie',
  'Nádrže na vodu a naftu': 'Nádrže na vodu a naftu',

  // Stredná mechanizácia
  'Vibračné dosky a nohy': 'Vibračné dosky a nohy',
  'Elektrocentrály': 'Elektrocentrály',
  'Kompresory': 'Kompresory',
  'Cestné rezačky, frézy a brúsky': 'Cestné rezačky, frézy a brúsky',
  'Stolové a portálové píly.': 'Stolové a portálové píly',
  'Miešačky , hladičky betónu a bádie': 'Miešačky , hladičky betónu a bádie',
  'Manipulačná technika': 'Manipulačná technika',

  // Ťažká technika
  'Pásové mini-rýpadlá ': 'Pásové mini-rýpadlá',
  'Pásové ťažké rýpadlá': 'Pásové ťažké rýpadlá',
  'Kolesové rýpadla a nakladače': 'Kolesové rýpadla a nakladače',
  'Šmykom riadené nakladače ': 'Šmykom riadené nakladače',
  'Dumpre': 'Dumpre',
  'Valce': 'Valce',
  'Manipulátory a vysokozdvižné vozíky': 'Manipulátory a vysokozdvižné vozíky',

  // Pracovné plošiny
  'Interiérové': 'Interiérové',
  'Exteriérové': 'Exteriérové',

  // Vybavenie staveniska
  'Kancelárske kontajnery a vrátnice': 'Kancelárske kontajnery a vrátnice',
  'Skladové kontajnery': 'Skladové kontajnery',
  'Sanitárne kontajnery': 'Sanitárne kontajnery',
  'Mobilné oplotenia a zábrany': 'Mobilné oplotenia a zábrany',
  'Mobilné toalety': 'Mobilné toalety',

  // Autá a prívesné vozíky
  'Autá a dodávky': 'Autá a dodávky',
  'Prívesné vozíky': 'Prívesné vozíky',

  // Záhradná technika
  'Kosačky na trávu': 'Kosačky na trávu',
  'Krovinorezy a motorové píly': 'Krovinorezy a motorové píly',
};

// Funkcia na vytvorenie slug z textu
function createSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // odstráň diakritiku
    .replace(/[^a-z0-9]+/g, '-') // nahraď non-alphanumeric za pomlčky
    .replace(/^-+|-+$/g, ''); // odstráň pomlčky na začiatku/konci
}

// Funkcia na normalizáciu textu pre porovnávanie
function normalizeForMatch(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Funkcia na nájdenie obrázka
function findImage(typProduktu, nazovProduktu, kategoria, podkategoria) {
  const pngDir = path.join(__dirname, 'public', 'pictures', 'Katalog-PNG');

  // Získaj správny názov priečinka podkategórie
  const folderName = subcategoryFolderMapping[podkategoria] || podkategoria;
  const subcatPath = path.join(pngDir, kategoria, folderName);

  if (!fs.existsSync(subcatPath)) {
    console.log(`   ⚠️  Priečinok neexistuje: ${kategoria}/${folderName}`);
    return null;
  }

  const images = fs.readdirSync(subcatPath).filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));

  // Hľadaj obrázok podľa názvu
  const searchTerms = [
    typProduktu,
    nazovProduktu,
    `${typProduktu} ${nazovProduktu}`,
  ].filter(Boolean);

  for (const term of searchTerms) {
    const normalized = normalizeForMatch(term);

    // Presná zhoda
    const exactMatch = images.find(img => {
      const imgNorm = normalizeForMatch(path.basename(img, path.extname(img)));
      return imgNorm === normalized;
    });

    if (exactMatch) {
      return `/pictures/Katalog-PNG/${kategoria}/${folderName}/${exactMatch}`;
    }

    // Čiastočná zhoda
    const partialMatch = images.find(img => {
      const imgNorm = normalizeForMatch(path.basename(img, path.extname(img)));
      return imgNorm.includes(normalized) || normalized.includes(imgNorm);
    });

    if (partialMatch) {
      return `/pictures/Katalog-PNG/${kategoria}/${folderName}/${partialMatch}`;
    }
  }

  // Ak nenájdené, vráť prvý obrázok ako fallback
  if (images.length > 0) {
    console.log(`   ⚠️  Nenájdený presný obrázok pre "${typProduktu || nazovProduktu}", použijem: ${images[0]}`);
    return `/pictures/Katalog-PNG/${kategoria}/${folderName}/${images[0]}`;
  }

  return null;
}

// Načítaj CSV
console.log('\n📄 Načítavam CSV...');
const csvPath = path.join(__dirname, 'pozicovna-final.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
});

console.log(`✅ Načítaných ${parsed.data.length} produktov\n`);

// Spracuj produkty
const products = [];
let missingImages = 0;
const usedIds = new Set(); // Sleduj použité ID

parsed.data.forEach((row, idx) => {
  const nazov = row['Nazov produktu']?.trim() || '';
  const typ = row['typ produktu']?.trim() || '';
  const kategoria = row['Kategoria']?.trim();
  const podkategoria = row['Podkategoria']?.trim();

  if (!kategoria || !podkategoria) {
    console.log(`⚠️  Riadok ${idx + 2}: Chýba kategória/podkategória`);
    return;
  }

  // Vytvor ID - pridaj suffix ak už existuje
  let id = createSlug(typ || nazov);
  let counter = 2;
  while (usedIds.has(id)) {
    id = `${createSlug(typ || nazov)}-${counter}`;
    counter++;
  }
  usedIds.add(id);

  // Mapuj kategóriu/podkategóriu na slug
  const categorySlug = categorySlugMapping[kategoria] || createSlug(kategoria);
  const subcategorySlug = createSlug(podkategoria);

  // Nájdi obrázok
  const imagePath = findImage(typ, nazov, kategoria, podkategoria);

  if (!imagePath) {
    console.log(`❌ Nenájdený obrázok: ${nazov} (${typ})`);
    missingImages++;
  }

  // Spracuj cenu
  const cenaBezDph = row['Cena bez dph']?.trim();
  const cenaSdph = row['Cena s dph']?.trim();

  let price;
  let pricePerDay = null;
  let priceOnRequest = false;

  if (cenaBezDph === 'Na požiadanie' || cenaBezDph === 'NA požiadanie' || !cenaBezDph || cenaBezDph === '') {
    price = 'Na požiadanie';
    priceOnRequest = true;
  } else {
    const cenaBezDphNum = parseFloat(cenaBezDph.replace(',', '.'));
    const cenaSdphNum = cenaSdph ? parseFloat(cenaSdph.replace(',', '.')) : cenaBezDphNum * 1.2;

    if (!isNaN(cenaBezDphNum)) {
      pricePerDay = cenaBezDphNum;
      price = `${cenaSdphNum.toFixed(2)}€/deň`;
    } else {
      price = 'Na požiadanie';
      priceOnRequest = true;
    }
  }

  // Vytvor features
  const features = [];
  for (let i = 1; i <= 3; i++) {
    const popis = row[`popis ${i}`]?.trim();
    const param = row[`parameter ${i}`]?.trim();

    if (popis && param) {
      features.push(`${popis} - ${param}`);
    }
  }

  // Vytvor produkt objekt
  const product = {
    id,
    name: typ || nazov,
    category: categorySlug,
    subcategory: subcategorySlug,
    image: imagePath || '/placeholder-product.webp',
    price,
    description: nazov,
    features,
    inStock: true,
    isNew: false,
    isPopular: false,
  };

  if (pricePerDay !== null) {
    product.pricePerDay = pricePerDay;
  }

  if (priceOnRequest) {
    product.priceOnRequest = true;
  }

  products.push(product);
});

console.log(`\n📊 ŠTATISTIKY:`);
console.log(`✅ Spracovaných produktov: ${products.length}`);
console.log(`❌ Chýbajúcich obrázkov: ${missingImages}`);

// Generuj products.js
console.log('\n📝 Generujem products.js...');

// Zoskup produkty podľa kategórií
const grouped = {};
products.forEach(p => {
  if (!grouped[p.category]) grouped[p.category] = {};
  if (!grouped[p.category][p.subcategory]) grouped[p.category][p.subcategory] = [];
  grouped[p.category][p.subcategory].push(p);
});

let output = `// Produkty pre Royal Stroje požičovňu\n`;
output += `// Automaticky vygenerované z CSV súboru\n`;
output += `// Vygenerované: ${new Date().toLocaleString('sk-SK')}\n\n`;
output += `export const products = [\n`;

// Kategórie v požadovanom poradí
const categoryOrder = Object.keys(categorySlugMapping).map(k => categorySlugMapping[k]);

categoryOrder.forEach(catSlug => {
  if (!grouped[catSlug]) return;

  const catName = Object.keys(categorySlugMapping).find(k => categorySlugMapping[k] === catSlug);
  output += `  // ========== ${catName.toUpperCase()} ==========\n`;

  Object.keys(grouped[catSlug]).sort().forEach(subcatSlug => {
    const prods = grouped[catSlug][subcatSlug];

    output += `  // ${subcatSlug.replace(/-/g, ' ')} (${prods.length} produktov)\n`;

    prods.forEach(product => {
      output += `  {\n`;
      output += `    id: '${product.id}',\n`;
      output += `    name: '${product.name.replace(/'/g, "\\'")}',\n`;
      output += `    category: '${product.category}',\n`;
      output += `    subcategory: '${product.subcategory}',\n`;
      output += `    image: '${product.image}',\n`;
      output += `    price: '${product.price}',\n`;
      if (product.pricePerDay !== undefined) {
        output += `    pricePerDay: ${product.pricePerDay},\n`;
      }
      if (product.priceOnRequest) {
        output += `    priceOnRequest: true,\n`;
      }
      output += `    description: '${product.description.replace(/'/g, "\\'")}',\n`;
      output += `    features: [\n`;
      product.features.forEach(f => {
        output += `      '${f.replace(/'/g, "\\'")}',\n`;
      });
      output += `    ],\n`;
      output += `    inStock: ${product.inStock},\n`;
      output += `    isNew: ${product.isNew},\n`;
      output += `    isPopular: ${product.isPopular},\n`;
      output += `  },\n`;
    });
    output += `\n`;
  });
});

output += `];\n\n`;

// Pridaj helper funkcie
output += `// Helper funkcie\n`;
output += `export const getProductsByCategory = (categoryId) => {\n`;
output += `  return products.filter(p => p.category === categoryId);\n`;
output += `};\n\n`;

output += `export const getProductsBySubcategory = (categoryId, subcategoryId) => {\n`;
output += `  if (subcategoryId === 'all') {\n`;
output += `    return getProductsByCategory(categoryId);\n`;
output += `  }\n`;
output += `  return products.filter(p => p.category === categoryId && p.subcategory === subcategoryId);\n`;
output += `};\n\n`;

output += `export const getPopularProducts = () => {\n`;
output += `  return products.filter(p => p.isPopular).slice(0, 6);\n`;
output += `};\n\n`;

output += `export const getNewProducts = () => {\n`;
output += `  return products.filter(p => p.isNew).slice(0, 4);\n`;
output += `};\n`;

// Ulož súbor
const outputPath = path.join(__dirname, 'src', 'data', 'products-new.js');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`\n✅ Súbor uložený: ${outputPath}`);
console.log(`\n✨ Hotovo!\n`);
