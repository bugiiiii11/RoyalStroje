const article = {
  title: '10 Bezpečnostných Pravidiel pri Práci so Stavebnými Strojmi',
  date: '8. Marec 2026',
  author: 'Royal Stroje',
  readTime: '13 min',
  category: 'Návody',
  excerpt: 'Bezpečnosť na stavbe je prvoradá! 10 kľúčových pravidiel pre prácu s minirýpadlom, nakladačom a ďalšou mechanizáciou.',
  content: (
      <div className="space-y-8">
        <p className="text-xl text-white/90 leading-relaxed">
          Stavebná mechanizácia dokáže urobiť prácu ľahšou a rýchlejšou. Ale nesprávne použitie môže viesť k vážnym úrazom,
          ba dokonca k úmrtiam. Každý rok na Slovensku dochádza k desiatm úrazom pri práci so stavebnými strojmi – väčšinu
          z nich by bolo možné predísť dodržiavaním základných bezpečnostných pravidiel.
        </p>

        <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-500/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            ⚠️ Prečo Je Bezpečnosť Taká Dôležitá?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-white/90">
            <div>
              <p className="font-bold text-red-500 mb-2">Štatistiky SR 2023-2024:</p>
              <ul className="space-y-2 text-sm">
                <li>• <strong>47 pracovných úrazov</strong> pri práci s minirýpadlami</li>
                <li>• <strong>3 úmrtia</strong> spôsobené prevrátením stroja</li>
                <li>• <strong>12 zranení</strong> od hydraulických hadíc</li>
                <li>• <strong>Priemer:</strong> 1 úraz každých 8 dní</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-orange-primary mb-2">Finančné dôsledky:</p>
              <ul className="space-y-2 text-sm">
                <li>• Pokuta za porušenie BOZP: <strong>500 – 30 000 €</strong></li>
                <li>• Náhrada škody zranenému: <strong>10 000+ €</strong></li>
                <li>• Zastavenie stavby: <strong>stratené zisky</strong></li>
                <li>• Poškodenie reputácie firmy</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pravidlo #1: Preškolenie a Oprávnenie</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
          <p className="text-white/80 mb-4">
            Najčastejšia chyba začiatočníkov je myslieť si, že obsluha minirýpadla je "intuitive". Nie je!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-orange-primary font-bold mb-3">Čo Hovorí Zákon?</h4>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <p className="text-white/80 text-sm mb-3">
                  Podľa <strong className="text-orange-primary">§ 30 zákona č. 124/2006 Z. z.</strong> musí mať obsluha stavebných
                  strojov platné <strong>osvedčenie o odbornej spôsobilosti</strong>.
                </p>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>✓ Platný vodičský preukaz skupiny B (minimum)</li>
                  <li>✓ Školenie BOZP (Bezpečnosť a ochrana zdravia pri práci)</li>
                  <li>✓ Certifikát na obsluhu zemných strojov (od 3,5t je povinný)</li>
                  <li>✓ Minimálny vek: 18 rokov</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-orange-primary font-bold mb-3">Royal Stroje – Školenie Zdarma</h4>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-white/90 text-sm mb-3">
                  Pri každom prenájme poskytujeme <strong className="text-green-500">bezplatné zaškolenie</strong> na stroj (30-45 minút).
                </p>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>✓ Základy ovládania (páky, pedále)</li>
                  <li>✓ Bezpečnostné funkcie</li>
                  <li>✓ Čo robiť pri poruche</li>
                  <li>✓ Praktická ukážka</li>
                </ul>
                <p className="text-green-500 text-xs mt-3">100% našich zákazníkov odchádza s plnou znalosťou ovládania stroja.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-500 font-bold mb-2">⚠️ NEROBTE TO:</p>
              <p className="text-white/80 text-sm">
                <strong>Nikdy</strong> nenechajte nekvalifikovanú osobu obsluhovať stroj. Aj keď sa to zdá "jednoduché",
                jeden nesprávny pohyb môže spôsobiť vážny úraz alebo škodu na majetku.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pravidlo #2: Osobné Ochranné Pracovné Pomôcky (OOPP)</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
          <p className="text-white/80 mb-4">
            OOPP nie sú len "odporúčané" – sú <strong className="text-orange-primary">povinné</strong> podľa zákona.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🪖</div>
              <h4 className="text-white font-bold mb-2 text-sm">Prilba</h4>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Povinná na každej stavbe</li>
                <li>• Ochrana pred padajúcimi predmetmi</li>
                <li>• Norma: EN 397</li>
              </ul>
              <p className="text-red-500 text-xs mt-2">❌ Pokuta: 50 €</p>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-3xl mb-2">👢</div>
              <h4 className="text-white font-bold mb-2 text-sm">Pracovná Obuv</h4>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• S oceľovou špičkou (ochrana 200 J)</li>
                <li>• Protišmyková podrážka</li>
                <li>• Norma: EN ISO 20345</li>
              </ul>
              <p className="text-orange-primary text-xs mt-2">⚠️ Odporúčané: S1P</p>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🧤</div>
              <h4 className="text-white font-bold mb-2 text-sm">Rukavice</h4>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Mechanická ochrana</li>
                <li>• Pri práci s palivom: chemicky odolné</li>
                <li>• Norma: EN 388</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🦺</div>
              <h4 className="text-white font-bold mb-2 text-sm">Reflexná Vesta</h4>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Viditeľnosť na stavbe</li>
                <li>• Povinná v blízkosti vozidiel</li>
                <li>• Trieda: 2 alebo 3</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-3xl mb-2">👓</div>
              <h4 className="text-white font-bold mb-2 text-sm">Ochranné Okuliare</h4>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Pri búracích prácach</li>
                <li>• Ochrana pred prašnosťou</li>
                <li>• Norma: EN 166</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <div className="text-3xl mb-2">🎧</div>
              <h4 className="text-white font-bold mb-2 text-sm">Chrániče Sluchu</h4>
              <ul className="space-y-1 text-white/70 text-xs">
                <li>• Pri hladine nad 85 dB</li>
                <li>• Minirýpadlá: cca 75-80 dB</li>
                <li>• Búracie kladivá: 100+ dB!</li>
              </ul>
              <p className="text-red-500 text-xs mt-2">❌ Pri kladive: povinné!</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pravidlo #3: Pred-prevádzková Kontrola Stroja</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
          <p className="text-white/80 mb-4">
            Každý deň pred začatím práce musíte vykonať <strong className="text-orange-primary">vizuálnu kontrolu</strong> stroja.
            Tento návyk vám môže zachrániť život.
          </p>

          <div className="space-y-4">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h4 className="text-orange-primary font-bold mb-3 flex items-center gap-2">
                <span>✓</span>
                <span>Kontrolný Zoznam (Checklist) – 5 Minút</span>
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 font-bold mb-2 text-sm">Vizuálna Kontrola:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>☐ Pásy: Žiadne praskliny, žiadne uvoľnené články</li>
                    <li>☐ Hydraulické hadice: Žiadne priesaky oleja</li>
                    <li>☐ Výkopová lopata: Nie je poškodená, zuby sú kompletné</li>
                    <li>☐ Kabína: Čisté sklo, funkčné dvere</li>
                    <li>☐ Bezpečnostné pásy: Funkčné</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 font-bold mb-2 text-sm">Kontrola Hladín:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>☐ Motorový olej: Kontrola tyčinky (medzi MIN a MAX)</li>
                    <li>☐ Hydraulický olej: Vizuálna kontrola nádrže</li>
                    <li>☐ Chladiaca kvapalina: Nádrž naplnená</li>
                    <li>☐ Palivo: Dostatočná hladina na celý deň</li>
                    <li>☐ Sklo ostrekovača: Naplnené (ak má stroj)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/70 font-bold mb-2 text-sm">Funkčný Test (Motor Zapnutý):</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  <li>☐ Ovládanie: Všetky páky fungujú plynulo</li>
                  <li>☐ Brzda: Funkčná a držiaca</li>
                  <li>☐ Houkačka: Funguje</li>
                  <li>☐ Svetlá: Fungujú (ak má stroj)</li>
                  <li>☐ Výstražné kontrolky: Žiadna červená kontrolka nesvieti</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-500 font-bold mb-2">❌ Čo Robiť Pri Zistení Závady?</p>
              <ol className="space-y-2 text-white/80 text-sm list-decimal list-inside">
                <li><strong>ZASTAVTE prácu</strong> – nepoužívajte poškodený stroj</li>
                <li><strong>Kontaktujte Royal Stroje</strong> na +421 948 555 551</li>
                <li><strong>Nahradný stroj</strong> vám dodáme do 24 hodín</li>
                <li><strong>NIKDY</strong> neopravujte stroj sami</li>
              </ol>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pravidlo #4: Stabilita Stroja – Prevenujte Prevráteniu</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/30 rounded-xl p-6">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-500 font-bold mb-2">⚠️ NAJČASTEJŠÍ PRÍČINA ÚMRTÍ:</p>
            <p className="text-white/90 text-sm">
              Prevrátenie minirýpadla je príčinou <strong>60% smrteľných úrazov</strong> pri práci so stavebnými strojmi.
              Dodržiavajte tieto pravidlá VŽDY.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-orange-primary font-bold mb-3">1. Pracujte na Rovnom Teréne</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-500 font-bold text-sm mb-2">✓ BEZPEČNE:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• Rovný terén (sklon do 5°)</li>
                    <li>• Pevný podklad (hlina, štrk, betón)</li>
                    <li>• Dostatočný priestor okolo stroja</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-500 font-bold text-sm mb-2">❌ NEBEZPEČNE:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• Svahy nad 10° (riziko prevrátenia)</li>
                    <li>• Mokrá, bahnitá pôda</li>
                    <li>• Okraj výkopu alebo svahu</li>
                    <li>• Nestabilný terén (štrkoviská)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-orange-primary font-bold mb-3">2. Používajte Stabilizátory Správne</h4>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <p className="text-white/80 text-sm mb-3">
                  Minirýpadlá majú <strong className="text-orange-primary">hydraulickú radlicu,</strong>
                  ktorá slúži ako stabilizátor.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-500 font-bold mb-2">✓ SPRÁVNE:</p>
                    <ul className="space-y-1 text-white/80">
                      <li>• Radlica vždy spustená počas kopania</li>
                      <li>• Radlica vytvorí pevný trojbodový podpeor</li>
                      <li>• Pri zdvíhaní ťažkých bremien radlicu pritlačte</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-500 font-bold mb-2">❌ NESPRÁVNE:</p>
                    <ul className="space-y-1 text-white/80">
                      <li>• Kopať bez spustenej radlice</li>
                      <li>• Radlica vo vzduchu = nestabilita!</li>
                      <li>• Jazdiť s naplnenou výkopovou lopatku bez radlice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-orange-primary font-bold mb-3">3. Neprekračujte Dosah Ramena</h4>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <p className="text-white/80 text-sm mb-3">
                  Čím ďalej vysuniete rameno, tým <strong className="text-red-500">väčšie riziko prevrátenia</strong>.
                </p>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>✓ <strong>Pracujte blízko stroja:</strong> Ideálny dosah je 60-70% maximálneho dosahu</li>
                  <li>✓ <strong>Plná výkopoválopata = kratší dosah:</strong> Ťažšie bremeno vyžaduje prácu bližšie k stroju</li>
                  <li>❌ <strong>NIKDY</strong> nevysúvajte rameno na maximum s ťažkou výkopovou lopatou – stroj sa môže prevrátiť!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pravidlo #5: Bezpečná Pracovná Zóna</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
          <p className="text-white/80 mb-4">
            Okolo pracujúceho stroja musí byť <strong className="text-orange-primary">vymedzená bezpečnostná zóna</strong>.
          </p>

          <div className="space-y-6">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h4 className="text-orange-primary font-bold mb-3">Minimálne Vzdialenosti:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li>• <strong className="text-orange-primary">5 metrov:</strong> Okolo stroja v pohybe</li>
                    <li>• <strong className="text-orange-primary">3 metre:</strong> Okolo ramena pri kopání</li>
                    <li>• <strong className="text-orange-primary">10 metrov:</strong> Pri použití búracieho kladiva</li>
                    <li>• <strong className="text-orange-primary">2 metre:</strong> Od okraja výkopu (riziko zrútenia)</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-500 font-bold text-sm mb-2">⚠️ PRAVIDLO:</p>
                  <p className="text-white/80 text-sm">
                    <strong>NIKDY</strong> sa nepribližujte k stroju v prevádzke bez toho, aby vás operátor videl
                    a potvrdil očný kontakt!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h4 className="text-orange-primary font-bold mb-3">Komunikácia na Stavbe:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-2"><strong>Ak Potrebujete Zastaviť Stroj:</strong></p>
                  <ul className="space-y-1 text-white/80">
                    <li>1. Zazvoňte alebo zakričte z bezpečnej vzdialenosti</li>
                    <li>2. Počkajte na očný kontakt s operátorom</li>
                    <li>3. Ukážte gesto "STOP" (zdvihnutá ruka)</li>
                    <li>4. Počkajte, kým operátor stroj vypne</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-2"><strong>Základné Gestá:</strong></p>
                  <ul className="space-y-1 text-white/80">
                    <li>✋ Zdvihnutá ruka = STOP</li>
                    <li>👍 Palec hore = Všetko v poriadku</li>
                    <li>👇 Ukazovák dolu = Spustiť rameno</li>
                    <li>☝️ Ukazovák hore = Zdvihnúť rameno</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pravidlo #6-10: Ďalšie Kľúčové Bezpečnostné Pravidlá</h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold">6</div>
              <h3 className="text-xl font-bold text-white">Pozor na Podzemné Inžinierske Siete</h3>
            </div>
            <div className="ml-13">
              <p className="text-white/80 text-sm mb-3">
                Každý rok dochádza k <strong className="text-red-500">vážnym úrazom</strong> a škodám z dôvodu poškodenia
                elektrických, plynových alebo vodovodných rozvodov.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-500 font-bold text-sm mb-2">⚠️ Rizika:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• Elektrický prúd: Úraz elektrickým proudom, požiar</li>
                    <li>• Plyn: Výbuch, smrť</li>
                    <li>• Voda: Zaplavenie výkopu, škody na majetku</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-500 font-bold text-sm mb-2">✓ Ochrana:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>✓ Vyžiadajte si situačný plán sietí PRED kopáním</li>
                    <li>✓ Označte polohu sietí na teréne</li>
                    <li>✓ V blízkosti sietí (1 m) kopajte ručne!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold">7</div>
              <h3 className="text-xl font-bold text-white">Zabezpečenie Výkopu</h3>
            </div>
            <div className="ml-13">
              <p className="text-white/80 text-sm mb-3">
                Výkopy hlbšie ako <strong className="text-orange-primary">1,3 m</strong> musia byť zabezpečené proti zrúteniu.
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>✓ <strong>Paženie:</strong> Použite pažiace dosky alebo steny</li>
                  <li>✓ <strong>Svahovanie:</strong> Vytvorte šikmé steny výkopu (pomer 1:1,5)</li>
                  <li>❌ <strong>NIKDY</strong> nevstupujte do nezabezpečeného výkopu nad 1,3 m!</li>
                  <li>⚠️ <strong>Riziko:</strong> Zrútenie pôdy môže pohrebiť osobu za sekundy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold">8</div>
              <h3 className="text-xl font-bold text-white">Tankovanie a Práca s Palivom</h3>
            </div>
            <div className="ml-13">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-500 font-bold text-sm mb-2">✓ SPRÁVNE:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• Tankujte pri vypnutom motore</li>
                    <li>• Zákaz fajčenia v okruhu 5 m</li>
                    <li>• Používajte lievik (prevenujte rozliatiu)</li>
                    <li>• Rozliate palivo okamžite utrite</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-500 font-bold text-sm mb-2">❌ NEBEZPEČNÉ:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• Tankovať pri bežiacom motore</li>
                    <li>• Fajčiť počas tankovania</li>
                    <li>• Preliať nádrž (riziko požiaru)</li>
                    <li>• Skladovať palivo v kabíne</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold">9</div>
              <h3 className="text-xl font-bold text-white">Preprava Stroja</h3>
            </div>
            <div className="ml-13">
              <p className="text-white/80 text-sm mb-3">
                Pri preprave minirýpadla na príves dodržiavajte tieto pravidlá:
              </p>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>✓ <strong>Upevnenie:</strong> Min. 4 upínacie pásy (2 vpredu, 2 vzadu)</li>
                  <li>✓ <strong>Rameno:</strong> Zložené a zaistené</li>
                  <li>✓ <strong>Radlica:</strong> Zdvihnutá</li>
                  <li>✓ <strong>Výkopová lopata:</strong> Prázdna a zložená</li>
                  <li>✓ <strong>Rýchlosť:</strong> Max. 80 km/h (odporúčané 60 km/h)</li>
                  <li>⚠️ <strong>Značenie:</strong> Reflexné trojuholníky na príves (povinné!)</li>
                </ul>
              </div>
              <p className="text-orange-primary text-sm mt-3">
                💡 Tip: Royal Stroje zabezpečí dopravu stroja za vás – bezpečne a profesionálne.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-primary flex items-center justify-center text-white font-bold">10</div>
              <h3 className="text-xl font-bold text-white">Počasie a Pracovné Podmienky</h3>
            </div>
            <div className="ml-13">
              <p className="text-white/80 text-sm mb-3">
                Nepriaznivé počasie <strong className="text-red-500">výrazne zvyšuje riziko úrazu</strong>.
              </p>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-500 font-bold text-sm mb-2">❌ Kedy ZASTAVIŤ Prácu:</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• <strong>Silný dážď:</strong> Zhoršená viditeľnosť, šmyklavý terén</li>
                    <li>• <strong>Búrka:</strong> Riziko zásahu bleskom (stroj je kovový!)</li>
                    <li>• <strong>Silný vietor:</strong> Nad 50 km/h (nestabilita stroja)</li>
                    <li>• <strong>Hmla:</strong> Viditeľnosť pod 50 m</li>
                    <li>• <strong>Tma:</strong> Nedostatočné osvetlenie</li>
                  </ul>
                </div>
                <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-lg p-4">
                  <p className="text-orange-primary font-bold text-sm mb-2">⚠️ Zima (November – Marec):</p>
                  <ul className="space-y-1 text-white/80 text-sm">
                    <li>• Kontrolujte zamrznuté hadice</li>
                    <li>• Pri -10°C a nižšie použite predohrev motora</li>
                    <li>• Pozor na námrazu a ľad na strojoch</li>
                    <li>• Skrátený pracovný čas (denné svetlo)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Čo Robiť Pri Nehode alebo Úraze?</h2>

        <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border border-red-500/50 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-4">Postup Pri Úraze – BEZPEČNE A RÝCHLO</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shrink-0">1</div>
              <div>
                <p className="text-white font-bold mb-1">ZABEZPEČTE Miesto Nehody</p>
                <p className="text-white/80 text-sm">Vypnite stroj, zaistite ho, zabráňte vstupu ďalších osôb do nebezpečného priestoru</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shrink-0">2</div>
              <div>
                <p className="text-white font-bold mb-1">ZAVOLAJTE Záchrannú Službu</p>
                <p className="text-white/80 text-sm">
                  <strong className="text-red-500">155</strong> (záchranná zdravotná služba) alebo <strong className="text-red-500">112</strong> (tiesňová linka)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shrink-0">3</div>
              <div>
                <p className="text-white font-bold mb-1">Poskytnutie Prvej Pomoci</p>
                <p className="text-white/80 text-sm">Iba ak ste vyškolení! Nezhoršujte situáciu neodborným zásahom</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shrink-0">4</div>
              <div>
                <p className="text-white font-bold mb-1">OZNÁMTE Nehodu</p>
                <p className="text-white/80 text-sm">
                  • Zamestnávateľovi<br/>
                  • Inšpekcii práce (pri vážnom úraze povinné!)<br/>
                  • Royal Stroje (+421 948 555 551)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-red-500/30">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-white/70 font-bold mb-2 text-sm">Lekárnička na Stavbe:</p>
              <p className="text-white/80 text-sm mb-2">Každá stavba musí mať <strong className="text-orange-primary">vybaven lekárničku</strong> podľa vyhlášky 11/2005 Z. z.</p>
              <p className="text-white/60 text-xs">Royal Stroje odporúča mať lekárničku v aute aj priamo na stavbe.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Bezpečnosť Je Na Prvom Mieste
          </h3>
          <div className="text-center mb-6">
            <p className="text-white/90 text-lg mb-2">
              V Royal Stroje <strong className="text-orange-primary">garantujeme</strong>, že každý stroj je:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-zinc-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-white font-bold mb-1">Pravidelne Servisovaný</p>
              <p className="text-white/70 text-xs">Servis každých 250 mth</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-white font-bold mb-1">Bezpečnostne Kontrolovaný</p>
              <p className="text-white/70 text-xs">Pred každým prenájmom</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-white font-bold mb-1">S Platným Poistením</p>
              <p className="text-white/70 text-xs">Havarijné + zodpovednostné</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-primary mb-4">Royal Stroje – Váš Partner Pre Bezpečnú Prácu</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-white/80 text-sm mb-4">
                Máte otázky k bezpečnosti? Potrebujete poradiť? Zavolajte nám!
              </p>
              <div className="space-y-2 text-white/80 text-sm">
                <p>📍 Recká cesta 182, 903 01 Senec</p>
                <p>📞 <a href="tel:+421948555551" className="text-orange-primary hover:underline font-bold">+421 948 555 551</a></p>
                <p>📧 <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:underline">info@royalstroje.sk</a></p>
                <p>⏰ Po-Pi: 7:00-18:00 | So: 8:00-14:00</p>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-500 font-bold mb-2">🎁 Bezplatné Služby:</p>
              <ul className="space-y-1 text-white/80 text-sm">
                <li>✓ Zaškolenie na stroj (30-45 minút)</li>
                <li>✓ Technická podpora 24/7</li>
                <li>✓ Výmena stroja pri poruche do 24h</li>
                <li>✓ Bezpečnostné checklisty na stiahnutie</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xl font-bold text-white mb-2">
              Každý deň <span className="text-orange-primary">bez úrazu</span> je úspešný deň!
            </p>
            <p className="text-white/70 text-sm">Dodržiavajte bezpečnostné pravidlá a pracujte s rozumom.</p>
          </div>
        </div>
      </div>
    ),
};
export default article;
