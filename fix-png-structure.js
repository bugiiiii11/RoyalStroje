import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 OPRAVA PNG ŠTRUKTÚRY\n');
console.log('='.repeat(80));

const pngDir = path.join(__dirname, 'public', 'pictures', 'Katalog-PNG');

// 1. Oprava duplicitných priečinkov
console.log('\n📂 KROK 1: Oprava duplicitných priečinkov\n');

const duplicates = [
  'Autá a prívesné vozíky',
  'Pracovné plošiny',
];

duplicates.forEach(cat => {
  const catPath = path.join(pngDir, cat);
  const innerCatPath = path.join(catPath, cat);

  if (fs.existsSync(innerCatPath)) {
    console.log(`\n🔄 Opravujem: ${cat}`);

    // Získaj podkategórie z vnoreného priečinka
    const subcats = fs.readdirSync(innerCatPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    subcats.forEach(subcat => {
      const sourcePath = path.join(innerCatPath, subcat);
      const targetPath = path.join(catPath, subcat);

      console.log(`   └─ Presúvam: ${subcat}`);

      // Ak cieľový priečinok už existuje, zlúč obsah
      if (fs.existsSync(targetPath)) {
        console.log(`      ⚠️  Priečinok už existuje, zlučujem obsah...`);
        const files = fs.readdirSync(sourcePath);
        files.forEach(file => {
          const src = path.join(sourcePath, file);
          const dest = path.join(targetPath, file);
          fs.renameSync(src, dest);
        });
        fs.rmdirSync(sourcePath);
      } else {
        // Presuň celý priečinok
        fs.renameSync(sourcePath, targetPath);
      }
    });

    // Odstráň prázdny vnorený priečinok
    if (fs.readdirSync(innerCatPath).length === 0) {
      fs.rmdirSync(innerCatPath);
      console.log(`   ✅ Odstránený duplicitný priečinok: ${cat}/${cat}`);
    }
  } else {
    console.log(`✅ ${cat} - už v poriadku`);
  }
});

// 2. Premenovanie podkategórií aby sedeli s CSV
console.log('\n\n📝 KROK 2: Zjednotenie názvov podkategórií\n');

const renames = {
  'Malé náradie': {
    'Búracie , vŕtacie kladivá a vŕtačky': 'vŕtacie, búracie kladivá a vŕtačky',
    'Uhlové, vibračné a pásové brúsky': 'uhlové, vibračné a pásové brúsky',
    'Ručne píly a rezačky': 'ručné píly a rezačky',
    'Vysávače , tepovače a tlakové čističe': 'Vysávače, tepovače a tlakové čističe',
    'Vibrátory , vibračné lišty a miešadlá': 'Vibrátory, vibračné lišty a miešadlá',
  },
  'Stredná mechanizácia': {
    'Vibračné nohy a dosky': 'Vibračné dosky a nohy',
    'Stolové a portálové píly': 'Stolové a portálové píly',
  },
};

Object.keys(renames).forEach(cat => {
  const catPath = path.join(pngDir, cat);

  if (!fs.existsSync(catPath)) {
    console.log(`⚠️  Kategória neexistuje: ${cat}`);
    return;
  }

  console.log(`\n📁 ${cat}:`);

  Object.keys(renames[cat]).forEach(oldName => {
    const newName = renames[cat][oldName];
    const oldPath = path.join(catPath, oldName);
    const newPath = path.join(catPath, newName);

    if (fs.existsSync(oldPath)) {
      if (fs.existsSync(newPath)) {
        console.log(`   ⚠️  Cieľ už existuje: ${oldName} → ${newName}`);
        console.log(`      Zlučujem obsah...`);

        // Presuň súbory
        const files = fs.readdirSync(oldPath);
        files.forEach(file => {
          const src = path.join(oldPath, file);
          const dest = path.join(newPath, file);
          if (fs.existsSync(dest)) {
            console.log(`      ⚠️  Súbor už existuje: ${file}`);
          } else {
            fs.renameSync(src, dest);
          }
        });

        // Odstráň starý priečinok
        if (fs.readdirSync(oldPath).length === 0) {
          fs.rmdirSync(oldPath);
        }
      } else {
        fs.renameSync(oldPath, newPath);
        console.log(`   ✅ ${oldName} → ${newName}`);
      }
    } else {
      console.log(`   ℹ️  Priečinok neexistuje: ${oldName}`);
    }
  });
});

// 3. Verifikácia
console.log('\n\n✅ VERIFIKÁCIA:\n');
console.log('='.repeat(80));

const allCategories = fs.readdirSync(pngDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalImages = 0;

allCategories.forEach(cat => {
  const catPath = path.join(pngDir, cat);
  const subcats = fs.readdirSync(catPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`\n📁 ${cat}:`);
  subcats.forEach(subcat => {
    const subcatPath = path.join(catPath, subcat);
    const images = fs.readdirSync(subcatPath)
      .filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));

    totalImages += images.length;
    console.log(`   └─ ${subcat} (${images.length} obrázkov)`);
  });
});

console.log(`\n\n📊 Celkom obrázkov: ${totalImages}`);
console.log('\n✨ Oprava dokončená!\n');
