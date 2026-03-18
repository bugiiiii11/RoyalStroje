import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

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
  'Vibračné dosky a nohy': 'vibracne-dosky-nohy',
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

// Funkcia na vytvorenie ID produktu
function createProductId(typProduktu, nazovProduktu) {
  const base = typProduktu || nazovProduktu;
  return createSlug(base);
}

// Funkcia na konverziu CSV na produkty
function csvToProducts() {
  console.log('🔄 Načítavam CSV súbor...\n');

  const csvPath = path.join(__dirname, 'Royal Stroje - pozicovna - FIXED.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  // Parsuj CSV s papaparse
  // POZNÁMKA: CSV obsahuje čiarky v dátach (napr. "2,9 kg") ktoré nie sú v úvodzovkách
  // Preto musíme použiť inú stratégiu - nájdeme stĺpec s obrázkom a podľa neho určíme pozície
  const parsed = Papa.parse(csvContent, {
    delimiter: ',',
    skipEmptyLines: true,
    quoteChar: '"',
  });

  const rows = parsed.data;
  const products = [];

  // Preskočíme hlavičku (riadok 0)
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];

    // Oprava CSV - nájdeme stĺpec s obrázkom (začína sa /) a podľa toho rekonštruujeme
    let imageIdx = -1;
    for (let j = 0; j < row.length; j++) {
      if (row[j] && (row[j].startsWith('/pictures/') || row[j] === '/placeholder-product.webp')) {
        imageIdx = j;
        break;
      }
    }

    // Ak sme našli obrázok, rekonštruujeme správne stĺpce
    if (imageIdx > 0 && imageIdx !== 12) {
      // Poznáme že obrazok je vždy 12, pred ním 2 ceny, pred tým kategória a podkategória
      // Takže:
      // row[imageIdx] = obrazok (12)
      // row[imageIdx-1] = cena s DPH (11)
      // row[imageIdx-2] = cena bez DPH (10)
      // row[imageIdx-3] = podkategória (9)
      // row[imageIdx-4] = kategória (8)
      // Všetko od row[2] po row[imageIdx-5] sú parametre (možno rozdelené)

      const fixed = new Array(14).fill('');
      // Spojíme názov produktu (všetko pred typom produktu)
      // Typ produktu je zvyčajne značka + model (obsahuje veľké písmeno alebo značku)
      let typIdx = -1;
      for (let j = 0; j < Math.min(5, imageIdx - 10); j++) {
        if (row[j] && /^[A-Z]/.test(row[j].trim()) && row[j].trim().length > 3) {
          typIdx = j;
          break;
        }
      }

      if (typIdx > 0) {
        // Názov = všetko pred typom
        fixed[0] = row.slice(0, typIdx).join(',');
        // Typ
        fixed[1] = row[typIdx];
        // Parametre
        const paramStart = typIdx + 1;
        const paramEnd = imageIdx - 4;
        for (let j = 0; j < 6 && (paramStart + j) < paramEnd; j++) {
          fixed[2 + j] = row[paramStart + j] || '';
        }
      } else {
        // Fallback - spojíme prvé 2 stĺpce ako názov
        fixed[0] = row.slice(0, 2).join(',');
        fixed[1] = row[2] || '';
        const paramStart = 3;
        const paramEnd = imageIdx - 4;
        for (let j = 0; j < 6 && (paramStart + j) < paramEnd; j++) {
          fixed[2 + j] = row[paramStart + j] || '';
        }
      }

      // Kategória, podkategória, ceny, obrázok
      fixed[8] = row[imageIdx - 4] || '';
      fixed[9] = row[imageIdx - 3] || '';
      fixed[10] = row[imageIdx - 2] || '';
      fixed[11] = row[imageIdx - 1] || '';
      fixed[12] = row[imageIdx] || '';
      fixed[13] = row[imageIdx + 1] || '';

      row = fixed;
    }

    // Extrakcia dát podľa stĺpcov
    const nazovProduktu = row[0] || '';
    const typProduktu = row[1] || '';
    const popisParam1 = row[2] || '';
    const param1 = row[3] || '';
    const popisParam2 = row[4] || '';
    const param2 = row[5] || '';
    const popisParam3 = row[6] || '';
    const param3 = row[7] || '';
    const kategoria = row[8] || '';
    const podkategoria = row[9] || '';
    const cenaBezDph = row[10] || '';
    const cenaSdph = row[11] || '';

    // Obrázok môže byť rozdelený na 2 stĺpce (12 a 13) kvôli čiarke v ceste
    // Ak stĺpec 13 neobsahuje http (nie je to link), spoj ho so stĺpcom 12
    let obrazok = row[12] || '/placeholder-product.webp';
    if (row[13] && !row[13].startsWith('http')) {
      // Ak stĺpec 13 obsahuje lomítko, znamená to že je to pokračovanie cesty
      // a musíme spojiť názov priečinka s čiarkou a medzerou
      if (row[13].includes('/')) {
        // Rozdel stĺpec 13 na názov priečinka a súbor
        const parts = row[13].split('/');
        const folderName = parts[0];
        const restOfPath = parts.slice(1).join('/');

        // Niektoré priečinky majú medzeru pred čiarkou, niektoré nie
        // Búracie , Vysávače , Vibrátory  - majú medzeru pred čiarkou
        // Uhlové, Čerpadlá - nemajú medzeru pred čiarkou
        const needsSpaceBeforeComma = row[12].endsWith('Búracie') ||
                                       row[12].endsWith('Vysávače') ||
                                       row[12].endsWith('Vibrátory');

        const separator = needsSpaceBeforeComma ? ' , ' : ', ';
        obrazok = row[12] + separator + folderName + '/' + restOfPath;
      } else {
        // Inak je to len súbor alebo iná časť cesty
        obrazok = row[12] + '/' + row[13];
      }
    }

    if (!nazovProduktu && !typProduktu) continue;

    // Vytvor ID
    const id = createProductId(typProduktu, nazovProduktu);

    // Mapuj kategóriu
    const categorySlug = categoryMapping[kategoria] || createSlug(kategoria);
    const subcategorySlug = subcategoryMapping[podkategoria] || createSlug(podkategoria);

    // Spracuj cenu
    let priceDisplay;
    let pricePerDay = null;
    let priceOnRequest = false;

    if (cenaBezDph === 'Na požiadanie' || cenaSdph === 'Na požiadanie' || !cenaBezDph || !cenaSdph) {
      if (cenaBezDph === 'Na požiadanie' || cenaSdph === 'Na požiadanie') {
        priceDisplay = 'Na požiadanie';
        priceOnRequest = true;
      } else {
        priceDisplay = 'Cena na vyžiadanie';
        priceOnRequest = true;
      }
    } else {
      // Parsuj cenu
      const cenaBezDphNum = parseFloat(cenaBezDph.replace(',', '.'));
      const cenaSdphNum = parseFloat(cenaSdph.replace(',', '.'));

      if (!isNaN(cenaBezDphNum) && !isNaN(cenaSdphNum)) {
        pricePerDay = cenaBezDphNum;
        priceDisplay = `${cenaSdphNum.toFixed(2)}€/deň`;
      } else {
        priceDisplay = 'Cena na vyžiadanie';
        priceOnRequest = true;
      }
    }

    // Spracuj features
    const features = [];
    if (popisParam1 && param1) {
      features.push(`${popisParam1} - ${param1}`);
    }
    if (popisParam2 && param2) {
      features.push(`${popisParam2} - ${param2}`);
    }
    if (popisParam3 && param3) {
      features.push(`${popisParam3} - ${param3}`);
    }

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
