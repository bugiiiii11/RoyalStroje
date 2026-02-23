const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

console.log('🚀 GENEROVANIE PRODUCTS.JS Z KATALOG MVP CSV\n');
console.log('='.repeat(80) + '\n');

// Funkcia na vytvorenie slugu
function createSlug(text) {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Mapovanie kategórií na slugy
const categorySlugMapping = {
  'Malé náradie': 'male-naradie',
  'Stredná mechanizácia': 'stredna-mechanizacia',
  'Ťažká technika': 'tazka-technika',
  'Pracovné plošiny': 'pracovne-plosiny',
  'Vybavenie staveniska': 'vybavenie-staveniska',
  'Autá a prívesné vozíky': 'auta-privesy',
  'Záhradná technika': 'zahradna-technika',
};

// Načítaj CSV
const csvPath = path.join(__dirname, 'katalogMVP.csv');
console.log('📄 Načítavam CSV...');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  quoteChar: '"',
  delimiter: ',',
});

console.log(`✅ Načítaných ${parsed.data.length} produktov\n`);

// Spracuj produkty
const products = [];
const usedIds = new Set(); // Sleduj použité ID
let missingImages = 0;

parsed.data.forEach((row, idx) => {
  const nazov = row['Nazov produktu']?.trim() || '';
  const typ = row['typ produktu']?.trim() || '';
  const nazovObrazka = row['Nazov obrazka']?.trim() || '';
  const kategoria = row['Kategoria']?.trim();
  const podkategoria = row['Podkategoria']?.trim();
  const cenaBezDph = row['Cena bez dph']?.trim();
  const cenaSdph = row['Cena s dph']?.trim();

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

  // Vytvor cestu k obrázku
  let imagePath = '';
  if (nazovObrazka) {
    imagePath = `/pictures/Katalog-PNG/${kategoria}/${podkategoria}/${nazovObrazka}`;

    // Skontroluj, či obrázok existuje
    const fullPath = path.join(__dirname, 'public', 'pictures', 'Katalog-PNG', kategoria, podkategoria, nazovObrazka);
    if (!fs.existsSync(fullPath)) {
      console.log(`   ⚠️  Nenájdený obrázok: ${nazovObrazka} pre "${nazov || typ}"`);
      missingImages++;
    }
  } else {
    console.log(`   ⚠️  Chýba názov obrázka pre "${nazov || typ}" (riadok ${idx + 2})`);
    missingImages++;
  }

  // Parsuj cenu
  let price = cenaSdph || cenaBezDph || 'Na požiadanie';
  let pricePerDay = 0;

  if (cenaBezDph && cenaBezDph !== 'Na požiadanie' && cenaBezDph !== 'NA požiadanie') {
    const numPrice = parseFloat(cenaBezDph.replace(',', '.'));
    if (!isNaN(numPrice)) {
      pricePerDay = Math.round(numPrice);
      price = `${cenaSdph}€/deň`;
    }
  }

  // Vytvor features array z parametrov
  const features = [];
  for (let i = 1; i <= 3; i++) {
    const popis = row[`popis ${i}`]?.trim();
    const parameter = row[`parameter ${i}`]?.trim();
    if (popis && parameter) {
      features.push(`${popis} - ${parameter}`);
    } else if (popis) {
      features.push(popis);
    }
  }

  // Vytvor produkt
  const product = {
    id,
    name: typ || nazov,
    category: categorySlug,
    subcategory: subcategorySlug,
    image: imagePath,
    price,
    pricePerDay,
    description: nazov,
    features,
    inStock: true,
    isNew: false,
    isPopular: false,
  };

  products.push(product);
});

console.log(`\n📊 ŠTATISTIKY:`);
console.log(`✅ Spracovaných produktov: ${products.length}`);
console.log(`❌ Chýbajúcich obrázkov: ${missingImages}`);

// Zoskup produkty podľa podkategórií pre prehľadnosť
const grouped = {};
products.forEach(p => {
  const key = `${p.category}/${p.subcategory}`;
  if (!grouped[key]) {
    grouped[key] = [];
  }
  grouped[key].push(p);
});

// Generuj výstup
console.log('\n📝 Generujem products.js...\n');

let output = `// Auto-generované z katalogMVP.csv\n`;
output += `// Počet produktov: ${products.length}\n`;
output += `// Posledná aktualizácia: ${new Date().toLocaleString('sk-SK')}\n\n`;
output += `export const products = [\n`;

Object.keys(grouped).sort().forEach(key => {
  const [cat, subcat] = key.split('/');
  const items = grouped[key];

  output += `\n  // ${key} (${items.length} produktov)\n`;

  items.forEach((product, idx) => {
    output += `  {\n`;
    output += `    id: '${product.id}',\n`;
    output += `    name: '${product.name}',\n`;
    output += `    category: '${product.category}',\n`;
    output += `    subcategory: '${product.subcategory}',\n`;
    output += `    image: '${product.image}',\n`;
    output += `    price: '${product.price}',\n`;
    output += `    pricePerDay: ${product.pricePerDay},\n`;
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
const outputPath = path.join(__dirname, 'src', 'data', 'products-mvp.js');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`✅ Súbor uložený: ${outputPath}\n`);
console.log('✨ Hotovo!');
