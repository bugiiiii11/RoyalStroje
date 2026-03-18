import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funkcia na escapovanie CSV hodnoty
function escapeCSV(value) {
  if (!value) return '';

  const str = String(value);

  // Ak obsahuje čiarku, úvodzovky alebo nový riadok, musíme escapovať
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    // Zdvojíme úvodzovky a zabalíme do úvodzoviek
    return `"${str.replace(/"/g, '""')}"`;
  }

  // Aj tak dáme všetko do úvodzoviek pre istotu
  return `"${str}"`;
}

// Parsuj CSV riadok (jednoduchý parser)
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

  return columns;
}

// Hlavná funkcia
function fixCSV() {
  console.log('🔧 Opravujem CSV súbor...\n');

  const inputPath = path.join(__dirname, 'Royal Stroje - pozicovna - updated.csv');
  const outputPath = path.join(__dirname, 'Royal Stroje - pozicovna - FIXED.csv');

  const csvContent = fs.readFileSync(inputPath, 'utf-8');
  const lines = csvContent.split('\n');

  const fixedLines = [];
  let fixedCount = 0;
  let errorCount = 0;

  // Spracuj hlavičku
  const header = parseCSVLine(lines[0]);
  fixedLines.push(header.map(escapeCSV).join(','));

  // Spracuj dáta
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      let row = parseCSVLine(line);

      // Nájdi obrázok ako kotvu
      let imageIdx = -1;
      for (let j = 0; j < row.length; j++) {
        if (row[j] && (row[j].startsWith('/pictures/') || row[j] === '/placeholder-product.webp')) {
          imageIdx = j;
          break;
        }
      }

      // Ak obrázok nie je na správnej pozícii, rekonštruuj riadok
      if (imageIdx > 0 && imageIdx !== 12) {
        console.log(`⚠️  Riadok ${i}: Obrázok na pozícii ${imageIdx}, opravujem...`);

        const fixed = new Array(14).fill('');

        // Struktura: Názov má čiarky (napr. "2,9 kg"), Typ je značka (napr. "Makita HR2470")
        // Ceny sú pred obrázkom (imageIdx), pred nimi kategória a podkategória

        // Spracuj od konca (fixné pozície):
        fixed[12] = row[imageIdx] || ''; // obrázok
        fixed[13] = row[imageIdx + 1] || ''; // link
        fixed[11] = row[imageIdx - 1] || ''; // cena s DPH
        fixed[10] = row[imageIdx - 2] || ''; // cena bez DPH

        // Podkategória a kategória - spojíme časti ktoré môžu byť rozdelené
        // Hľadáme "Malé náradie" alebo "Stredná mechanizácia"
        let categoryIdx = -1;
        for (let j = Math.max(0, imageIdx - 10); j < imageIdx - 2; j++) {
          const val = row[j] ? row[j].trim() : '';
          if (val === 'Malé náradie' || val === 'Stredná mechanizácia' ||
              val === 'Ťažká technika' || val === 'Pracovné plošiny' ||
              val === 'Vybavenie staveniska' || val === 'Autá a prívesy') {
            categoryIdx = j;
            break;
          }
        }

        if (categoryIdx > 0) {
          fixed[8] = row[categoryIdx]; // kategória

          // Podkategória je všetko medzi kategóriou a cenou bez DPH
          const subcatParts = [];
          for (let j = categoryIdx + 1; j < imageIdx - 2; j++) {
            if (row[j]) subcatParts.push(row[j]);
          }
          fixed[9] = subcatParts.join(', ');

          // Typ produktu - značka/model, zvyčajne obsahuje veľké písmená
          let typIdx = -1;
          for (let j = 0; j < categoryIdx; j++) {
            const val = row[j] ? row[j].trim() : '';
            // Značka: začína veľkým písmenom a obsahuje písmená a čísla
            if (val && /^[A-Z][a-zA-Z0-9\s\-]+/.test(val) && val.length >= 4) {
              typIdx = j;
              break;
            }
          }

          if (typIdx >= 0) {
            // Názov je všetko pred typom
            const nameParts = [];
            for (let j = 0; j < typIdx; j++) {
              if (row[j]) nameParts.push(row[j]);
            }
            fixed[0] = nameParts.join(',');
            fixed[1] = row[typIdx];

            // Parametre sú medzi typom a kategóriou
            const paramParts = [];
            for (let j = typIdx + 1; j < categoryIdx; j++) {
              if (row[j]) paramParts.push(row[j]);
            }

            // Rozdeľ parametre na páry (popis, hodnota)
            for (let j = 0; j < 6 && j < paramParts.length; j++) {
              fixed[2 + j] = paramParts[j];
            }
          } else {
            // Nemáme typ - použijeme prvé 2 stĺpce
            fixed[0] = row[0] || '';
            fixed[1] = row[1] || '';

            // Parametre
            const paramParts = [];
            for (let j = 2; j < categoryIdx; j++) {
              if (row[j]) paramParts.push(row[j]);
            }
            for (let j = 0; j < 6 && j < paramParts.length; j++) {
              fixed[2 + j] = paramParts[j];
            }
          }
        } else {
          // Nenašli sme kategóriu - použijeme starú logiku
          fixed[8] = row[imageIdx - 4] || '';
          fixed[9] = row[imageIdx - 3] || '';
          fixed[0] = row[0] || '';
          fixed[1] = row[1] || '';

          for (let j = 2; j < 8; j++) {
            fixed[j] = row[j] || '';
          }
        }

        row = fixed;
        fixedCount++;
      } else if (imageIdx === -1) {
        console.log(`❌ Riadok ${i}: Nenašiel som obrázok, preskakujem...`);
        errorCount++;
        continue;
      } else {
        console.log(`✅ Riadok ${i}: OK`);
      }

      // Zabezpeč že máme 14 stĺpcov
      while (row.length < 14) {
        row.push('');
      }
      row = row.slice(0, 14);

      // Zapíš escapovaný riadok
      fixedLines.push(row.map(escapeCSV).join(','));

    } catch (error) {
      console.log(`❌ Riadok ${i}: Chyba - ${error.message}`);
      errorCount++;
    }
  }

  // Ulož opravený CSV
  fs.writeFileSync(outputPath, fixedLines.join('\n'), 'utf-8');

  console.log('\n📊 ŠTATISTIKY:');
  console.log(`✅ Celkom riadkov: ${lines.length - 1}`);
  console.log(`🔧 Opravených: ${fixedCount}`);
  console.log(`❌ Chýb: ${errorCount}`);
  console.log(`\n📁 Výstupný súbor: ${outputPath}`);
  console.log('\n✨ Hotovo!');
  console.log('\n💡 TIP: Skopírujte súbor do Downloads:');
  console.log(`   cp "${outputPath}" "c:\\Users\\cryptomeda\\Downloads\\"`);
}

fixCSV();
