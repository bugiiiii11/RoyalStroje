import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ANALÝZA KATEGÓRIÍ A PODKATEGÓRIÍ\n');
console.log('='.repeat(80));

// 1. Analyzuj CSV
console.log('\n📄 KATEGÓRIE V CSV:');
const csvPath = path.join(__dirname, 'pozicovna-final.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n');

const csvCategories = {};
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const parts = line.split(',');
  const kategoria = parts[8]?.replace(/"/g, '').trim();
  const podkategoria = parts[9]?.replace(/"/g, '').trim();

  if (kategoria) {
    if (!csvCategories[kategoria]) {
      csvCategories[kategoria] = new Set();
    }
    if (podkategoria) {
      csvCategories[kategoria].add(podkategoria);
    }
  }
}

Object.keys(csvCategories).sort().forEach(cat => {
  console.log(`\n📁 ${cat}:`);
  Array.from(csvCategories[cat]).sort().forEach(subcat => {
    console.log(`   └─ ${subcat}`);
  });
});

// 2. Analyzuj PNG priečinky
console.log('\n\n📂 KATEGÓRIE V PNG PRIEČINKOCH:');
const pngDir = path.join(__dirname, 'public', 'pictures', 'Katalog-PNG');
const pngCategories = {};

const mainCategories = fs.readdirSync(pngDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

mainCategories.forEach(cat => {
  const catPath = path.join(pngDir, cat);
  const subcats = fs.readdirSync(catPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  pngCategories[cat] = subcats;

  console.log(`\n📁 ${cat}:`);
  subcats.forEach(subcat => {
    const subcatPath = path.join(catPath, subcat);
    const images = fs.readdirSync(subcatPath)
      .filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
    console.log(`   └─ ${subcat} (${images.length} obrázkov)`);
  });
});

// 3. Porovnaj a nájdi rozdiely
console.log('\n\n⚠️  ROZDIELY MEDZI CSV A PNG:');
console.log('='.repeat(80));

// Kategórie v CSV ale nie v PNG
const csvCats = new Set(Object.keys(csvCategories));
const pngCats = new Set(Object.keys(pngCategories));

const missingInPng = [...csvCats].filter(c => !pngCats.has(c));
const missingInCsv = [...pngCats].filter(c => !csvCats.has(c));

if (missingInPng.length > 0) {
  console.log('\n❌ Kategórie v CSV, ktoré CHÝBAJÚ v PNG:');
  missingInPng.forEach(c => console.log(`   - ${c}`));
}

if (missingInCsv.length > 0) {
  console.log('\n❌ Kategórie v PNG, ktoré CHÝBAJÚ v CSV:');
  missingInCsv.forEach(c => console.log(`   - ${c}`));
}

// Porovnaj podkategórie
console.log('\n\n🔄 MAPOVANIE PODKATEGÓRIÍ (CSV → PNG):');
console.log('='.repeat(80));

Object.keys(csvCategories).sort().forEach(csvCat => {
  // Nájdi najlepšiu zhodu v PNG
  const pngCat = Object.keys(pngCategories).find(p =>
    p === csvCat ||
    p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ===
    csvCat.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  );

  if (!pngCat) {
    console.log(`\n❌ ${csvCat} - NENÁJDENÁ v PNG`);
    return;
  }

  console.log(`\n✅ ${csvCat} → ${pngCat}`);

  const csvSubcats = Array.from(csvCategories[csvCat]);
  const pngSubcats = pngCategories[pngCat];

  csvSubcats.forEach(csvSubcat => {
    // Hľadaj presné alebo podobné meno
    const match = pngSubcats.find(p => {
      const normalize = (str) => str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
      return normalize(p) === normalize(csvSubcat);
    });

    if (match) {
      if (match === csvSubcat) {
        console.log(`   ✅ ${csvSubcat} → ${match}`);
      } else {
        console.log(`   ⚠️  ${csvSubcat} → ${match} (ROZDIELNY NÁZOV)`);
      }
    } else {
      console.log(`   ❌ ${csvSubcat} → NENÁJDENÁ`);
      console.log(`      Dostupné v PNG: ${pngSubcats.join(', ')}`);
    }
  });

  // Nájdi PNG podkategórie, ktoré nie sú v CSV
  const unusedPngSubcats = pngSubcats.filter(p => {
    return !csvSubcats.some(c => {
      const normalize = (str) => str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
      return normalize(p) === normalize(c);
    });
  });

  if (unusedPngSubcats.length > 0) {
    console.log(`   ℹ️  V PNG ale nie v CSV: ${unusedPngSubcats.join(', ')}`);
  }
});

console.log('\n\n📊 ŠTATISTIKY:');
console.log('='.repeat(80));
console.log(`CSV kategórie: ${Object.keys(csvCategories).length}`);
console.log(`PNG kategórie: ${Object.keys(pngCategories).length}`);

let totalCsvSubcats = 0;
let totalPngSubcats = 0;
let totalPngImages = 0;

Object.values(csvCategories).forEach(s => totalCsvSubcats += s.size);
Object.values(pngCategories).forEach(s => totalPngSubcats += s.length);

// Spočítaj obrázky
Object.keys(pngCategories).forEach(cat => {
  pngCategories[cat].forEach(subcat => {
    const subcatPath = path.join(pngDir, cat, subcat);
    const images = fs.readdirSync(subcatPath)
      .filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
    totalPngImages += images.length;
  });
});

console.log(`CSV podkategórie: ${totalCsvSubcats}`);
console.log(`PNG podkategórie: ${totalPngSubcats}`);
console.log(`PNG obrázky: ${totalPngImages}`);

console.log('\n✨ Analýza dokončená!\n');
