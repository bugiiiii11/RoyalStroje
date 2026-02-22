import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ANALÝZA KATEGÓRIÍ A PODKATEGÓRIÍ (v2)\n');
console.log('='.repeat(80));

// 1. Analyzuj CSV pomocou Papa Parse
console.log('\n📄 KATEGÓRIE V CSV:');
const csvPath = path.join(__dirname, 'pozicovna-final.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  quoteChar: '"',
  delimiter: ',',
});

const csvCategories = {};
const csvProducts = [];

parsed.data.forEach((row, idx) => {
  const kategoria = row['Kategoria']?.trim();
  const podkategoria = row['Podkategoria']?.trim();
  const nazov = row['Nazov produktu']?.trim();
  const typ = row['typ produktu']?.trim();

  if (!kategoria) {
    console.log(`⚠️  Riadok ${idx + 2}: Chýba kategória pre ${nazov || typ}`);
    return;
  }

  if (!csvCategories[kategoria]) {
    csvCategories[kategoria] = new Set();
  }

  if (podkategoria) {
    csvCategories[kategoria].add(podkategoria);
  }

  csvProducts.push({
    nazov,
    typ,
    kategoria,
    podkategoria,
  });
});

console.log(`\nNájdených ${csvProducts.length} produktov v CSV\n`);

Object.keys(csvCategories).sort().forEach(cat => {
  const subcats = Array.from(csvCategories[cat]).sort();
  const count = csvProducts.filter(p => p.kategoria === cat).length;

  console.log(`\n📁 ${cat} (${count} produktov):`);
  subcats.forEach(subcat => {
    const subcatCount = csvProducts.filter(p => p.kategoria === cat && p.podkategoria === subcat).length;
    console.log(`   └─ ${subcat} (${subcatCount})`);
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

  // Získaj podkategórie
  const subcats = fs.readdirSync(catPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  pngCategories[cat] = {};

  console.log(`\n📁 ${cat}:`);
  subcats.forEach(subcat => {
    const subcatPath = path.join(catPath, subcat);
    const images = fs.readdirSync(subcatPath)
      .filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));

    pngCategories[cat][subcat] = images;
    console.log(`   └─ ${subcat} (${images.length} obrázkov)`);
  });
});

// 3. Porovnaj a nájdi rozdiely
console.log('\n\n⚠️  ANALÝZA ROZDIELOV:');
console.log('='.repeat(80));

const issues = [];

// Pre každú CSV kategóriu/podkategóriu hľadaj zhodu v PNG
Object.keys(csvCategories).forEach(csvCat => {
  // Nájdi zhodu kategórie
  const pngCat = Object.keys(pngCategories).find(p =>
    p === csvCat ||
    p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ===
    csvCat.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  );

  if (!pngCat) {
    issues.push({
      type: 'KATEGÓRIA CHÝBA V PNG',
      csv: csvCat,
      png: null,
    });
    return;
  }

  // Porovnaj podkategórie
  const csvSubcats = Array.from(csvCategories[csvCat]);
  const pngSubcats = Object.keys(pngCategories[pngCat]);

  csvSubcats.forEach(csvSubcat => {
    const match = pngSubcats.find(p => {
      const normalize = (str) => str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
      return normalize(p) === normalize(csvSubcat);
    });

    if (!match) {
      issues.push({
        type: 'PODKATEGÓRIA CHÝBA V PNG',
        kategoria: csvCat,
        csv: csvSubcat,
        png: null,
        dostupne: pngSubcats,
      });
    } else if (match !== csvSubcat) {
      issues.push({
        type: 'ROZDIELNY NÁZOV',
        kategoria: csvCat,
        csv: csvSubcat,
        png: match,
      });
    }
  });
});

// PNG priečinky ktoré nie sú v CSV
Object.keys(pngCategories).forEach(pngCat => {
  const csvCat = Object.keys(csvCategories).find(c =>
    c === pngCat ||
    c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ===
    pngCat.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  );

  if (!csvCat) {
    issues.push({
      type: 'PNG KATEGÓRIA NIE JE V CSV',
      png: pngCat,
      csv: null,
    });
    return;
  }

  const pngSubcats = Object.keys(pngCategories[pngCat]);
  const csvSubcats = Array.from(csvCategories[csvCat]);

  pngSubcats.forEach(pngSubcat => {
    const match = csvSubcats.find(c => {
      const normalize = (str) => str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
      return normalize(c) === normalize(pngSubcat);
    });

    if (!match) {
      issues.push({
        type: 'PNG PODKATEGÓRIA NIE JE V CSV',
        kategoria: pngCat,
        png: pngSubcat,
        csv: null,
      });
    }
  });
});

// Vypíš problémy
if (issues.length > 0) {
  console.log(`\n❌ Našiel som ${issues.length} problémov:\n`);

  const grouped = {};
  issues.forEach(issue => {
    if (!grouped[issue.type]) grouped[issue.type] = [];
    grouped[issue.type].push(issue);
  });

  Object.keys(grouped).forEach(type => {
    console.log(`\n${type}:`);
    grouped[type].forEach(issue => {
      if (issue.kategoria) {
        console.log(`  [${issue.kategoria}]`);
      }
      console.log(`    CSV: ${issue.csv || 'N/A'}`);
      console.log(`    PNG: ${issue.png || 'N/A'}`);
      if (issue.dostupne) {
        console.log(`    Dostupné: ${issue.dostupne.join(', ')}`);
      }
      console.log('');
    });
  });
} else {
  console.log('\n✅ Všetky kategórie a podkategórie sú v poriadku!');
}

// 4. Vytvor mapping pre script
console.log('\n\n📋 MAPOVANIE PRE KONVERZIU:');
console.log('='.repeat(80));

console.log('\nconst subcategoryMapping = {');
Object.keys(csvCategories).forEach(csvCat => {
  const pngCat = Object.keys(pngCategories).find(p =>
    p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ===
    csvCat.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  );

  if (!pngCat) return;

  const csvSubcats = Array.from(csvCategories[csvCat]);
  const pngSubcats = Object.keys(pngCategories[pngCat]);

  csvSubcats.forEach(csvSubcat => {
    const match = pngSubcats.find(p => {
      const normalize = (str) => str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
      return normalize(p) === normalize(csvSubcat);
    });

    if (match && match !== csvSubcat) {
      console.log(`  '${csvSubcat}': '${match}',`);
    }
  });
});
console.log('};');

console.log('\n\n📊 ŠTATISTIKY:');
console.log('='.repeat(80));
console.log(`Produkty v CSV: ${csvProducts.length}`);
console.log(`CSV kategórie: ${Object.keys(csvCategories).length}`);
console.log(`PNG kategórie: ${Object.keys(pngCategories).length}`);

let totalCsvSubcats = 0;
let totalPngSubcats = 0;
let totalPngImages = 0;

Object.values(csvCategories).forEach(s => totalCsvSubcats += s.size);
Object.values(pngCategories).forEach(subcats => {
  totalPngSubcats += Object.keys(subcats).length;
  Object.values(subcats).forEach(images => totalPngImages += images.length);
});

console.log(`CSV podkategórie: ${totalCsvSubcats}`);
console.log(`PNG podkategórie: ${totalPngSubcats}`);
console.log(`PNG obrázky: ${totalPngImages}`);

console.log('\n✨ Analýza dokončená!\n');
