import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapovanie kategórií na slug formát
const categoryMapping = {
  'Malé náradie': 'male-naradie',
  'Stredná mechanizácia': 'stredna-mechanizacia',
  'Ťažká technika': 'tazka-technika',
  'Pracovné plošiny': 'pracovne-plosiny',
  'Vybavenie staveniska': 'vybavenie-staveniska',
  'Autá a prívesy': 'auta-privesy',
};

// Mapovanie podkategórií na slug formát
const subcategoryMapping = {
  'vŕtacie, búracie kladivá a vŕtačky': 'vrtacie-buracie-kladiva',
  'uhlové, vibračné a pásové brúsky.': 'brusky',
  'uhlové, vibračné a pásové brúsky. ': 'brusky',
  'ručné píly a rezačky.': 'pily-rezacky',
  'Vysávače, tepovače a tlakové čističe': 'vysavace-tepovace',
  'Čerpadlá, ohrievače a odvlhčovače': 'cerpadla-ohrievace',
  'Zváracia  a meracia technika': 'zvaracia-meracia',
  'Zváracia a meracia technika': 'zvaracia-meracia',
  'Vibrátory, vibračné lišty a miešadlá': 'vibratory-miesadla',
  'Vibrátory , vibračné lišty a miešadlá': 'vibratory-miesadla',
  'Lešenie': 'lesenie',
  'Nádrže na vodu a naftu': 'nadrze',
  'Vibračné dosky a nohy': 'vibracne-dosky',
  'Elektrocentrály': 'elektrocentraly',
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

// Funkcia na parsovanie CSV riadku (zohľadní čiarky v úvodzovkách)
function parseCSVLine(line) {
  const columns = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      columns.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  columns.push(current.trim());

  // Inteligentná oprava CSV - nájdeme stĺpec s obrázkom a spätne určíme správne pozície
  // Obrázok je vždy na pozícii 12 a začína sa / alebo je placeholder
  let imageCol = -1;
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].startsWith('/') || columns[i] === 'nazov obrazka') {
      imageCol = i;
      break;
    }
  }

  if (imageCol > 0 && imageCol !== 12) {
    // Musíme spojiť rozdelené hodnoty
    // Formát: [0]nazov, [1]typ, [2-7]param(popis,hodnota)x3, [8]kat, [9]subkat, [10]cena1, [11]cena2, [12]img, [13]link
    const correctCols = [];

    // 0-1: Názov a typ (vždy OK)
    correctCols[0] = columns[0];
    correctCols[1] = columns[1];

    // 8-9: Kategória a podkategória (2 stĺpce pred cenami)
    correctCols[8] = columns[imageCol - 4];
    correctCols[9] = columns[imageCol - 3];

    // 10-11: Ceny (2 stĺpce pred obrázkom)
    correctCols[10] = columns[imageCol - 2];
    correctCols[11] = columns[imageCol - 1];

    // 12: Obrázok
    correctCols[12] = columns[imageCol];

    // 13: Link (voliteľný)
    correctCols[13] = columns[imageCol + 1] || '';

    // 2-7: Parametre (spojíme rozdelené hodnoty)
    // Všetko medzi columns[2] a columns[imageCol-4] patří k parametrom
    const paramCols = [];
    for (let i = 2; i < imageCol - 4; i++) {
      paramCols.push(columns[i]);
    }

    // Teraz musíme paramCols rozdeliť na páry (popis, hodnota)
    // Heuristika: párne indexy sú popisy (text), nepárne sú hodnoty
    for (let i = 0; i < 6; i++) {
      if (i < paramCols.length) {
        correctCols[2 + i] = paramCols[i];
      } else {
        correctCols[2 + i] = '';
      }
    }

    return correctCols;
  }

  return columns;
}

// Funkcia na vytvorenie ID produktu
function createProductId(typProduktu, nazovProduktu) {
  const base = typProduktu || nazovProduktu;
  return createSlug(base);
}

// Funkcia na spracovanie features (1-3 parametre)
function processFeatures(columns) {
  const features = [];

  // Parameter 1
  const desc1 = columns[2]?.replace(/^"(.*)"$/, '$1') || '';
  const param1 = columns[3]?.replace(/^"(.*)"$/, '$1') || '';
  if (desc1 && param1) {
    features.push(`${desc1} - ${param1}`);
  }

  // Parameter 2
  const desc2 = columns[4]?.replace(/^"(.*)"$/, '$1') || '';
  const param2 = columns[5]?.replace(/^"(.*)"$/, '$1') || '';
  if (desc2 && param2) {
    features.push(`${desc2} - ${param2}`);
  }

  // Parameter 3
  const desc3 = columns[6]?.replace(/^"(.*)"$/, '$1') || '';
  const param3 = columns[7]?.replace(/^"(.*)"$/, '$1') || '';
  if (desc3 && param3) {
    features.push(`${desc3} - ${param3}`);
  }

  return features;
}

// Funkcia na konverziu CSV na produkty
function csvToProducts() {
  console.log('🔄 Načítavam CSV súbor...\n');

  const csvPath = path.join(__dirname, 'Royal Stroje - pozicovna - updated.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');

  const products = [];
  let skippedCount = 0;

  // Preskočíme hlavičku (riadok 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      skippedCount++;
      continue;
    }

    const columns = parseCSVLine(line);

    // Extrakcia dát
    const nazovProduktu = columns[0]?.replace(/^"(.*)"$/, '$1') || '';
    const typProduktu = columns[1]?.replace(/^"(.*)"$/, '$1') || '';
    const kategoria = columns[8]?.replace(/^"(.*)"$/, '$1') || '';
    const podkategoria = columns[9]?.replace(/^"(.*)"$/, '$1') || '';
    const cenaBezDph = columns[10]?.replace(/^"(.*)"$/, '$1') || '';
    const cenaSdph = columns[11]?.replace(/^"(.*)"$/, '$1') || '';
    const obrazok = columns[12]?.replace(/^"(.*)"$/, '$1') || '/placeholder-product.webp';

    if (!nazovProduktu) {
      skippedCount++;
      continue;
    }

    // Vytvor ID
    const id = createProductId(typProduktu, nazovProduktu);

    // Mapuj kategóriu
    const categorySlug = categoryMapping[kategoria] || createSlug(kategoria);
    const subcategorySlug = subcategoryMapping[podkategoria] || createSlug(podkategoria);

    // Spracuj cenu
    let priceDisplay;
    let pricePerDay = null;
    let priceOnRequest = false;

    if (cenaBezDph === 'Na požiadanie' || cenaSdph === 'Na požiadanie') {
      priceDisplay = 'Na požiadanie';
      priceOnRequest = true;
    } else {
      // Parsuj cenu
      const cenaBezDphNum = parseFloat(cenaBezDph.replace(',', '.'));
      const cenaSdphNum = parseFloat(cenaSdph.replace(',', '.'));

      if (!isNaN(cenaBezDphNum)) {
        pricePerDay = cenaBezDphNum;
        priceDisplay = `${cenaSdphNum.toFixed(2)}€/deň`;
      } else {
        priceDisplay = 'Cena na vyžiadanie';
        priceOnRequest = true;
      }
    }

    // Spracuj features
    const features = processFeatures(columns);

    // Vytvor produkt objekt
    const product = {
      id,
      name: typProduktu || nazovProduktu,
      category: categorySlug,
      subcategory: subcategorySlug,
      image: obrazok,
      price: priceDisplay,
      ...(pricePerDay !== null && { pricePerDay }),
      ...(priceOnRequest && { priceOnRequest: true }),
      description: nazovProduktu,
      features,
      inStock: true,
      isNew: false,
      isPopular: false,
    };

    products.push(product);
    console.log(`✅ ${product.name} (${product.id})`);
  }

  console.log(`\n📊 ŠTATISTIKY:`);
  console.log(`✅ Spracovaných produktov: ${products.length}`);
  console.log(`⏭️  Preskočených riadkov: ${skippedCount}`);

  return products;
}

// Funkcia na generovanie products.js súboru
function generateProductsJS(products) {
  console.log('\n📝 Generujem products.js...');

  // Zoskupíme produkty podľa kategórií pre lepšiu čitateľnosť
  const grouped = {};
  products.forEach(p => {
    if (!grouped[p.category]) {
      grouped[p.category] = {};
    }
    if (!grouped[p.category][p.subcategory]) {
      grouped[p.category][p.subcategory] = [];
    }
    grouped[p.category][p.subcategory].push(p);
  });

  let output = `// Produkty pre Royal Stroje požičovňu\n`;
  output += `// Automaticky vygenerované z CSV súboru\n\n`;
  output += `export const products = [\n`;

  // Kategórie v požadovanom poradí
  const categoryOrder = ['male-naradie', 'stredna-mechanizacia', 'tazka-technika', 'pracovne-plosiny', 'vybavenie-staveniska', 'auta-privesy'];

  categoryOrder.forEach(cat => {
    if (!grouped[cat]) return;

    const categoryName = Object.keys(categoryMapping).find(k => categoryMapping[k] === cat) || cat;
    output += `  // ========== ${categoryName.toUpperCase()} ==========\n`;

    Object.keys(grouped[cat]).forEach(subcat => {
      const products = grouped[cat][subcat];
      const subcatName = Object.keys(subcategoryMapping).find(k => subcategoryMapping[k] === subcat) || subcat;

      if (products.length > 0) {
        output += `  // ${subcatName} (${products.length} produktov)\n`;
      }

      products.forEach(product => {
        output += `  {\n`;
        output += `    id: '${product.id}',\n`;
        output += `    name: '${product.name}',\n`;
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
  const outputPath = path.join(__dirname, 'src', 'data', 'products.js');
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`✅ Súbor uložený: ${outputPath}`);
  console.log(`📦 Celkom produktov: ${products.length}`);
}

// Hlavná funkcia
async function main() {
  try {
    const products = csvToProducts();
    generateProductsJS(products);
    console.log('\n✨ Hotovo!');
  } catch (error) {
    console.error('❌ Chyba:', error);
    process.exit(1);
  }
}

main();
