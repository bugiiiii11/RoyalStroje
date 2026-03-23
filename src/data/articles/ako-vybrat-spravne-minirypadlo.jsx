const article = {
  title: 'Ako Vybrať Správne Minirýpadlo: Praktický Návod pre Začiatočníkov',
  date: '10. Marec 2026',
  author: 'Royal Stroje',
  readTime: '10 min',
  category: 'Návody',
  excerpt: 'Minirýpadlo je jeden z najuniverzálnejších stavebných strojov.',
  content: (
      <div className="space-y-8">
        <p className="text-xl text-white/90 leading-relaxed">
          Minirýpadlo je jeden z najuniverzálnejších stavebných strojov. Dokáže kopať základy, čistiť pozemky, demolovať,
          a dokonca presúvať materiál. Ale s desiatskami modelov a veľkostí na trhu, ako si vybrať to pravé?
        </p>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Čo je Vlastne Minirýpadlo?</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Minirýpadlo (mini excavator, kompaktné rýpadlo) je hydraulické zemné zariadenie s pásmi alebo kolesami,
            ramenom a lopátkou.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-white/80">
            <div>
              <strong className="text-orange-primary">Hmotnosť:</strong> 0,8 až 6 ton
            </div>
            <div>
              <strong className="text-orange-primary">Šírka:</strong> 70 cm až 2,5 m
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Naše Minirýpadlá: Nájdite Perfektnú Veľkosť Pre Váš Projekt</h2>
        <p className="text-white/80 leading-relaxed mb-4">
          V Royal Stroje máme <strong className="text-orange-primary">4 veľkosti minirýpadiel</strong>, ktoré pokryjú 95% všetkých
          stavebných a záhradných projektov. Pozrime sa na ne detailne s reálnymi príkladmi použitia.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <p className="text-blue-400 font-bold mb-2">💡 Ako Si Vybrať?</p>
          <p className="text-white/80 text-sm">
            Zvoľte si podľa <strong className="text-white">hĺbky výkopu</strong> a <strong className="text-white">objemu prác</strong>.
            Ak si nie ste istí, zavolajte nám - pomôžeme vám vybrať správnu veľkosť a ušetríte peniaze.
          </p>
        </div>

        <div className="space-y-6">
          {/* Mini-rýpadlo 1t */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-orange-primary">Mini-Rýpadlo 1t</h3>
              <div className="text-right">
                <div className="bg-orange-primary/20 border border-orange-primary/50 rounded-lg px-3 py-1">
                  <p className="text-orange-primary text-lg font-black">75 €/deň</p>
                  <p className="text-white/60 text-xs">bez DPH</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-white/70 font-bold mb-2">Základné parametre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Hĺbkový dosah:</strong> 1,5 m</li>
                  <li>• <strong>Hmotnosť:</strong> 1 tona</li>
                  <li>• <strong>Šírka:</strong> 70-90 cm (prejde dverami!)</li>
                  <li>• <strong>Palivo:</strong> Nafta</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 font-bold mb-2">Najlepšie pre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Záhradné terénne úpravy</strong></li>
                  <li>• <strong>Výkop prípojok</strong> (voda, elektrika)</li>
                  <li>• <strong>Káblové ryhy</strong> pre osvetlenie</li>
                  <li>• <strong>Práce v úzkych dvoroch</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-green-500 font-bold mb-3">✓ Reálne Príklady Použitia:</p>
              <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
                <div>
                  <p className="font-bold text-white mb-1">1. Výkop pre záhradné jazierko</p>
                  <p className="text-white/60">Rozmer 3×4 m, hĺbka 80 cm → 1-2 hodiny práce</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">2. Výkop prípojky vody do domu</p>
                  <p className="text-white/60">Dĺžka 15 m, hĺbka 1,2 m → 2-3 hodiny</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">3. Terénne úpravy záhrady</p>
                  <p className="text-white/60">Zrovnanie svahu, odvoz 10 m³ zeminy → pol dňa</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">4. Výkop septiku 3 m³</p>
                  <p className="text-white/60">Hĺbka 1,2 m → 3-4 hodiny</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-green-500">✓</span>
              <span><strong className="text-white">Tip:</strong> Prejde cez štandardné dvere (90 cm) → ideálne pre práce vo dvoroch bez priameho prístupu</span>
            </div>
          </div>

          {/* Mini-rýpadlo 1.8t */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-orange-primary">Mini-Rýpadlo 1.8t</h3>
                <span className="inline-block bg-orange-primary text-white text-xs font-bold px-3 py-1 rounded-full mt-2">NAJPOPULÁRNEJŠIE</span>
              </div>
              <div className="text-right">
                <div className="bg-orange-primary/20 border border-orange-primary/50 rounded-lg px-3 py-1">
                  <p className="text-orange-primary text-lg font-black">90 €/deň</p>
                  <p className="text-white/60 text-xs">bez DPH</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-white/70 font-bold mb-2">Základné parametre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Hĺbkový dosah:</strong> 2,5-2,8 m</li>
                  <li>• <strong>Hmotnosť:</strong> 1,8 tony</li>
                  <li>• <strong>Šírka:</strong> 100-120 cm</li>
                  <li>• <strong>Palivo:</strong> Nafta</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 font-bold mb-2">Najlepšie pre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Základy rodinných domov</strong></li>
                  <li>• <strong>Garáže a prístavby</strong></li>
                  <li>• <strong>Výkop studní</strong> (do 2,5 m)</li>
                  <li>• <strong>Menšie demolácie</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-lg p-4 mb-4">
              <p className="text-white/90 text-sm mb-3">
                <strong className="text-orange-primary">Prečo je najpopulárnejší?</strong> Ideálny pomer výkon/cena/veľkosť.
                70% našich zákazníkov si prenajíma práve túto veľkosť.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-green-500 font-bold mb-3">✓ Reálne Príklady Použitia:</p>
              <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
                <div>
                  <p className="font-bold text-white mb-1">1. Základy garáže 6×6 m</p>
                  <p className="text-white/60">Hĺbka 80 cm, pás 60 cm → 1 deň</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">2. Výkop rodinného domu 10×12 m</p>
                  <p className="text-white/60">Pásové základy, hĺbka 1,2 m → 2-3 dni</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">3. Výkop septiku 6 m³</p>
                  <p className="text-white/60">Hĺbka 2 m → 4-5 hodín</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">4. Výmena kanalizácie pod domom</p>
                  <p className="text-white/60">Dĺžka 20 m, hĺbka 2 m → 1 deň</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-orange-primary">⭐</span>
              <span><strong className="text-white">Odporúčanie:</strong> Ak si nie ste istí veľkosťou, zvoľte 1.8t - zvládne 90% domácich projektov</span>
            </div>
          </div>

          {/* Mini-rýpadlo 2.6t */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-orange-primary">Mini-Rýpadlo 2.6t</h3>
              <div className="text-right">
                <div className="bg-orange-primary/20 border border-orange-primary/50 rounded-lg px-3 py-1">
                  <p className="text-orange-primary text-lg font-black">90 €/deň</p>
                  <p className="text-white/60 text-xs">bez DPH</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-white/70 font-bold mb-2">Základné parametre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Hĺbkový dosah:</strong> 3-3,2 m</li>
                  <li>• <strong>Hmotnosť:</strong> 2,6 tony</li>
                  <li>• <strong>Šírka:</strong> 130-150 cm</li>
                  <li>• <strong>Palivo:</strong> Nafta</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 font-bold mb-2">Najlepšie pre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Väčšie rodinné domy</strong></li>
                  <li>• <strong>Príprava staveniska</strong></li>
                  <li>• <strong>Demolácie menších objektov</strong></li>
                  <li>• <strong>Výkopy bazénov</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-green-500 font-bold mb-3">✓ Reálne Príklady Použitia:</p>
              <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
                <div>
                  <p className="font-bold text-white mb-1">1. Výkop bazénu 8×4 m</p>
                  <p className="text-white/60">Hĺbka 1,5 m, odvoz 50 m³ zeminy → 1-2 dni</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">2. Základy väčšieho RD 12×15 m</p>
                  <p className="text-white/60">Pásové + žumpa, hĺbka 1,5 m → 3 dni</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">3. Demolácia garáže + odvoz</p>
                  <p className="text-white/60">Bouranie + nakládka 30 m³ → 1 deň</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">4. Príprava staveniska</p>
                  <p className="text-white/60">Odstránenie stromov, zrovnanie 500 m² → 2 dni</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-blue-500">ℹ️</span>
              <span><strong className="text-white">Bonus:</strong> Vďaka vyššej hmotnosti lepšia stabilita pri práci na svahu a pri demoláciách</span>
            </div>
          </div>

          {/* Mini-rýpadlo 3.5t */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-orange-primary">Mini-Rýpadlo 3.5t</h3>
                <span className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">MAXIMÁLNY VÝKON</span>
              </div>
              <div className="text-right">
                <div className="bg-orange-primary/20 border border-orange-primary/50 rounded-lg px-3 py-1">
                  <p className="text-orange-primary text-lg font-black">110 €/deň</p>
                  <p className="text-white/60 text-xs">bez DPH</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-white/70 font-bold mb-2">Základné parametre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Hĺbkový dosah:</strong> 3,5-3,8 m</li>
                  <li>• <strong>Hmotnosť:</strong> 3,5 tony</li>
                  <li>• <strong>Šírka:</strong> 150-170 cm</li>
                  <li>• <strong>Palivo:</strong> Nafta</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 font-bold mb-2">Najlepšie pre:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>• <strong>Hlboké výkopy (pivnice)</strong></li>
                  <li>• <strong>Veľké demolácie</strong></li>
                  <li>• <strong>Ťažký terén a skaly</strong></li>
                  <li>• <strong>Komerčné projekty</strong></li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-green-500 font-bold mb-3">✓ Reálne Príklady Použitia:</p>
              <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
                <div>
                  <p className="font-bold text-white mb-1">1. Výkop pivnice pod domom</p>
                  <p className="text-white/60">Rozmer 8×10 m, hĺbka 3 m → 4-5 dní</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">2. Veľký bazén 10×5 m</p>
                  <p className="text-white/60">Hĺbka 2,5 m, odvoz 120 m³ → 2-3 dni</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">3. Demolácia staršieho domu</p>
                  <p className="text-white/60">Bouranie + nakládka, betónové základy → 3-4 dni</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">4. Výkop v skalnatom teréne</p>
                  <p className="text-white/60">Základy + drvenie skaly → podľa potreby</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-bold mb-2">💪 Kedy Zvoliť 3.5t?</p>
              <ul className="space-y-1 text-white/80 text-sm">
                <li>✓ Potrebujete kopať hlbšie ako 3 metre</li>
                <li>✓ Pracujete so skalatým alebo veľmi tvrdým terénom</li>
                <li>✓ Potrebujete demolovať betónové konštrukcie</li>
                <li>✓ Chcete maximálny výkon a stabilitu</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">2. Kľúčové Technické Parametre</h2>
        <p className="text-white/80 leading-relaxed">Pri výbere minirýpadla sledujte tieto hodnoty:</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-primary mb-3">Hĺbka Výkopu</h3>
            <p className="text-white/70 text-sm mb-3">Maximálna hĺbka, do ktorej stroj dokáže kopať.</p>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• Základy RD: <strong className="text-orange-primary">min. 2,5 m</strong></li>
              <li>• Pivnica: <strong className="text-orange-primary">min. 3,5 m</strong></li>
              <li>• Bazén: <strong className="text-orange-primary">min. 3 m</strong></li>
              <li>• Kanalizácia: <strong className="text-orange-primary">1,5-2 m stačí</strong></li>
            </ul>
            <p className="text-white/60 text-xs mt-3">💡 Tip: Vždy počítajte s rezervou +50 cm</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-primary mb-3">Šírka Lopátky</h3>
            <p className="text-white/70 text-sm mb-3">Štandardné veľkosti:</p>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• <strong>20-30 cm:</strong> Káblové výkopy, presná práca</li>
              <li>• <strong>30-40 cm:</strong> Základy, kanalizácia</li>
              <li>• <strong>40-60 cm:</strong> Veľké výkopy, terénne úpravy</li>
              <li>• <strong>60-100 cm:</strong> Demolácie, hrubé práce</li>
            </ul>
            <p className="text-green-500 text-xs mt-3">✓ Royal Stroje poskytuje 2-3 lopátky zadarmo</p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">3. Príslušenstvo a Nadstavby</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-primary mb-3">Búracie Kladivo</h3>
            <p className="text-white/70 text-sm mb-2">Rozbíja betón, asfalt, skaly</p>
            <p className="text-white/80 text-sm mb-3"><strong>Kedy použiť:</strong> Demolácie, rozbíjanie betónových podláh</p>
            <p className="text-orange-primary font-bold text-sm">Cena: +20-30 € / deň</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-orange-primary mb-3">Paletizačné Vidly</h3>
            <p className="text-white/70 text-sm mb-2">Presúvajú palety, big-bagy, materiál</p>
            <p className="text-white/80 text-sm mb-3"><strong>Kedy použiť:</strong> Nakladanie/vykladanie materiálu</p>
            <p className="text-orange-primary font-bold text-sm">Cena: +10 € / deň</p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Ako Si Vybrať Pre Váš Projekt?</h2>

        <div className="bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-4">Rozhodovací Strom - Jednoduché Kroky:</h3>

          <div className="space-y-4">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-2">KROK 1: Aký typ práce budete robiť?</p>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>→ Záhradné úpravy, drobné výkopy: <strong>Mikro minirýpadlo (0,8-1,5t)</strong></li>
                <li>→ Základy domu, kanalizácia: <strong>Malé minirýpadlo (1,5-3t)</strong></li>
                <li>→ Veľké výkopy, demolácie: <strong>Stredné minirýpadlo (3-6t)</strong></li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-2">KROK 2: Aká je hĺbka výkopu?</p>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>→ Do 2 m: Mikro minirýpadlo stačí</li>
                <li>→ 2-3,5 m: Malé minirýpadlo (1,8-2,5t)</li>
                <li>→ Nad 3,5 m: Stredné minirýpadlo (5t+)</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-2">KROK 3: Aký je prístup na pozemok?</p>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>→ Úzka brána (&lt; 1 m): Mikro minirýpadlo (70-90 cm šírka)</li>
                <li>→ Štandardná brána (1-1,5 m): Malé minirýpadlo (100-150 cm)</li>
                <li>→ Široký prístup (&gt; 2 m): Akékoľvek minirýpadlo</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-primary mb-4">Cenníkový Prehľad Royal Stroje 2026</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <div>
                <p className="text-white font-bold">Mini-rýpadlo 1t</p>
                <p className="text-white/60 text-xs">Hĺbka 1,5 m · Záhradné práce</p>
              </div>
              <span className="text-orange-primary font-bold text-lg">75 € / deň</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <div>
                <p className="text-white font-bold">Mini-rýpadlo 1.8t</p>
                <p className="text-white/60 text-xs">Hĺbka 2,8 m · Najpopulárnejšie</p>
              </div>
              <span className="text-orange-primary font-bold text-lg">90 € / deň</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <div>
                <p className="text-white font-bold">Mini-rýpadlo 2.6t</p>
                <p className="text-white/60 text-xs">Hĺbka 3,2 m · Väčšie projekty</p>
              </div>
              <span className="text-orange-primary font-bold text-lg">90 € / deň</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <div>
                <p className="text-white font-bold">Mini-rýpadlo 3.5t</p>
                <p className="text-white/60 text-xs">Hĺbka 3,8 m · Maximálny výkon</p>
              </div>
              <span className="text-orange-primary font-bold text-lg">110 € / deň</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-white/70 text-sm mb-3"><strong>V cene vždy:</strong></p>
            <div className="grid md:grid-cols-2 gap-3">
              <ul className="space-y-1 text-white/60 text-sm">
                <li>✓ Komplexný servis a údržba</li>
                <li>✓ Základné poistenie</li>
                <li>✓ Technická podpora 24/7</li>
              </ul>
              <ul className="space-y-1 text-white/60 text-sm">
                <li>✓ 2-3 štandardné lopátky</li>
                <li>✓ Kvalitné servisované stroje</li>
                <li>✓ Plná nádrž paliva</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-500 font-bold text-sm">💰 Zľavy pri dlhšom prenájme:</p>
            <p className="text-white/80 text-xs mt-1">
              5+ dní: -10% · 10+ dní: -15% · Mesačný prenájom: individuálna cena
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-primary/10 to-orange-hover/10 border-2 border-orange-primary/50 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-black text-white mb-4 text-center">Ktoré Mini-Rýpadlo Si Vybrať?</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-zinc-900/50 rounded-xl p-5">
              <h4 className="text-orange-primary font-bold mb-3">🏡 Pre Domáce Projekty</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white font-bold mb-1">→ Výber 1t mini-rýpadla</p>
                  <p className="text-white/70 text-xs">Záhrada, prípojky, malé terénne úpravy</p>
                </div>
                <div>
                  <p className="text-white font-bold mb-1">→ Výber 1.8t mini-rýpadla</p>
                  <p className="text-white/70 text-xs">Garáž, prístavba, základy menších objektov</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-xl p-5">
              <h4 className="text-orange-primary font-bold mb-3">🏗️ Pre Stavebné Projekty</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-white font-bold mb-1">→ Výber 2.6t mini-rýpadla</p>
                  <p className="text-white/70 text-xs">Rodinný dom, bazén, väčšie demolácie</p>
                </div>
                <div>
                  <p className="text-white font-bold mb-1">→ Výber 3.5t mini-rýpadla</p>
                  <p className="text-white/70 text-xs">Pivnica, tvrdý terén, komerčné projekty</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-primary/20 border border-orange-primary/40 rounded-xl p-4 text-center">
            <p className="text-white font-bold mb-2">💡 Nie ste si istí?</p>
            <p className="text-white/80 text-sm mb-4">
              Zavolajte nám a opíšte svoj projekt - poradíme vám správnu veľkosť a ušetríte peniaze!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all"
              >
                <span>Zavolať: 0948 555 551</span>
              </a>
              <a
                href="/?search=mini-rýpadlo#katalog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-orange-primary/50 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
              >
                <span>Pozrieť v katalógu</span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-primary mb-4">Potrebujete Poradiť?</h3>
          <p className="text-white/80 mb-4">
            Neviete aké minirýpadlo si vybrať? Zavolajte nám! Opíšete nám projekt a my vám odporučíme ideálny stroj. Bez záväzkov.
          </p>
          <div className="space-y-2 text-white/80">
            <p>📍 Recká cesta 182, 903 01 Senec</p>
            <p>📞 <a href="tel:+421948555551" className="text-orange-primary hover:underline">+421 948 555 551</a></p>
            <p>📧 <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:underline">info@royalstroje.sk</a></p>
          </div>
        </div>
      </div>
    ),
};
export default article;
