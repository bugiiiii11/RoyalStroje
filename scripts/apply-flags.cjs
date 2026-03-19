const fs = require('fs');
let js = fs.readFileSync('src/data/products.js', 'utf-8');

const newIds = [
  'makita-tw001gm201', 'makita-dhp482rfj', 'makita-1806b', 'makita-pc5010c',
  'makita-hm1213c', 'makita-hm1812', 'toughbuilt-tb-c700', 'makita-ce001gz',
  'makita-n5900b', 'makita-4327', 'makita-ut1200', 'makita-hr2630',
  'ryobi-170-bar', 'makita-hg6031vk', 'nivel-cl3g', 'nivel-n32x',
  'makita-uc3541a', 'makita-dur190uzx3', 'riwall-pro-rpt-8556-r',
];

let count = 0;
for (const id of newIds) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp("(id: '" + escaped + "'[\\s\\S]*?isNew: )false");
  if (pattern.test(js)) {
    js = js.replace(pattern, '$1true');
    count++;
  }
}

fs.writeFileSync('src/data/products.js', js, 'utf-8');
console.log('Updated isNew for', count, 'products');
