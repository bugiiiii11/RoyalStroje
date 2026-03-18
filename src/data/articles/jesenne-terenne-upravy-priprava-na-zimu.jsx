const article = {
  title: 'Jesenné Terénne Úpravy: Kompletný Sprievodca',
  date: '1. October 2026',
  author: 'Royal Stroje',
  readTime: '16 min',
  category: 'Návody',
  excerpt: 'Prečo je jeseň najlepší čas na terénne úpravy? Návod krok po kroku, najčastejšie chyby a cenník.',
  content: (
      <div className="space-y-8">
        {/* Intro Section */}
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-primary/30 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Prečo Je Jeseň Najlepší Čas?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-orange-primary">✓ Výhody:</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Optimálna vlhkosť pôdy (nie sucho, nie blato)</li>
                <li>• Pôda sa ešte nestihla zmrznúť</li>
                <li>• Nižšie ceny prenájmu (-15-30%)</li>
                <li>• Dostupnosť mechanizácie</li>
                <li>• Pripravené na jar = skorý štart stavby</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-red-400">✗ Riziká Ak Počkáte Na Jar:</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Blato (apríl-máj) = nemožnosť práce</li>
                <li>• Vysoké ceny (+20-30%)</li>
                <li>• Obsadená mechanizácia (čakanie 2-4 týždne)</li>
                <li>• Strata času = oneskorenie stavby</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 10 Tasks - Priority Order */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">10 Jesenných Úloh (Poradie!)</h2>

          {/* Task 1 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Analýza a Zameranie Pozemku</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-orange-primary">Prečo prvé:</strong> Všetko ostatné závisí od správneho zamerania</p>
                  <p><strong className="text-white">Čo urobiť:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Zameranie výškových bodov (nivelačný prístroj)</li>
                    <li>• Identifikácia sklonu (kde tečie voda)</li>
                    <li>• Označenie budúcich objektov (dom, príjazdovka, terasa)</li>
                    <li>• Fotodokumentácia súčasného stavu</li>
                  </ul>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mt-3">
                    <p className="text-sm"><strong>💡 TIP:</strong> Použite mobil s aplikáciou (napr. "Clinometer") pre základné meranie sklonu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task 2 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Odstránenie Ornice a Vegetácie</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-orange-primary">Kedy:</strong> Skôr, než zamrzne pôda (ideálne september-október)</p>
                  <p><strong className="text-white">Postup:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Odstránenie trávy, kríkov, menších stromov</li>
                    <li>• Skrývka ornice: 20-40 cm (v záhradnej časti menej, pod domom viac)</li>
                    <li>• Ornica sa ukladá bokom = použitie naspäť do záhrady</li>
                    <li>• Výkopové práce tam, kde bude dom/cesta</li>
                  </ul>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-3">
                    <p className="text-sm"><strong>⚠️ CHYBA:</strong> Ponechanie ornice pod základom = pokles, praskliny!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task 3 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Drenážny Systém</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-orange-primary">Prečo teraz:</strong> Pred nasypávaním štrku, inak už sa nedostanete k podkladu</p>
                  <p><strong className="text-white">Typy drenáže:</strong></p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Základová drenáž:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Okolo celého domu (60 cm od základu)</li>
                        <li>• Hĺbka: úroveň základovej dosky -20 cm</li>
                        <li>• Drenážna rúra DN110 (s geotextíliou)</li>
                        <li>• Štrk 16-32 mm (min. 15 cm)</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Plošná drenáž:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Pod celou plochou domu</li>
                        <li>• Štrk 8-16 mm (min. 30 cm)</li>
                        <li>• Geotextília 300 g/m²</li>
                        <li>• Odvod do drenáže alebosakovacej jamy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task 4 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">4</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Základná Násypka (Štrk)</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-white">Materiál:</strong> Lomový kameň / štrk 32-63 mm</p>
                  <p><strong className="text-white">Postup:</strong></p>
                  <ol className="space-y-2 ml-4 list-decimal">
                    <li>Položenie geotextílie (200-300 g/m²)</li>
                    <li>Nasypanie 1. vrstvy štrku (max. 20 cm)</li>
                    <li>Zhutnenie vibračnou doskou (min. 3 prechody)</li>
                    <li>Kontrola roviny a sklonu</li>
                    <li>Opakovanie pre ďalšie vrstvy</li>
                  </ol>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-3">
                    <p className="text-sm"><strong>✓ SPRÁVNE:</strong> Max. 20 cm na vrstvu + zhutnenie = stabilita na desaťročia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task 5 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">5</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Odvodnenie Povrchových Vôd</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-orange-primary">Kritické:</strong> Voda = nepriateľ č. 1 každej stavby</p>
                  <p><strong className="text-white">Riešenia:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Priekopy:</strong> Popri hranici pozemku (šírka 40 cm, hĺbka 30 cm)</li>
                    <li>• <strong>Zasakovacie jamy:</strong> Pre dažďovú vodu (min. 3m³)</li>
                    <li>• <strong>Rigoly:</strong> Pod okapmi (štrk + drenážna rúra)</li>
                    <li>• <strong>Spád terénu:</strong> Min. 2% od domu</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Task 6 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">6</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Spevnené Plochy (Príjazdovka, Parkovisko)</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-white">Skladba (zdola nahor):</strong></p>
                  <ol className="space-y-2 ml-4 list-decimal">
                    <li>Geotextília 300 g/m²</li>
                    <li>Štrk 32-63 mm (20 cm) - zhutnený</li>
                    <li>Štrk 16-32 mm (15 cm) - zhutnený</li>
                    <li>Štrkopiesok 0-8 mm (10 cm) - zhutnený</li>
                    <li>Dlažba / betón (podľa projektu)</li>
                  </ol>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mt-3">
                    <p className="text-sm"><strong>💡 TIP JESEŇ:</strong> Urobiť vrstvy 1-4, dlažbu nechať na jar (keď bude sucho a pekne).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task 7 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">7</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Výsadba Stromov a Kríkov</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-orange-primary">Prečo jeseň:</strong> Najlepší čas na výsadbu (stromy majú čas zakoreniť pred zimou)</p>
                  <p><strong className="text-white">Postup:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Výkop jamky (2× väčšia než koreňový bal)</li>
                    <li>• Drenáž na dne (štrk 5-10 cm)</li>
                    <li>• Zmiešanie výkopovej zeminy s kompostom (1:1)</li>
                    <li>• Výsadba + zalievanie (10-20 l na strom)</li>
                    <li>• Mulčovanie (kôra, štiepka) - ochrana pred mrazom</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Task 8 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">8</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Ochrana Svahov</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-white">Riešenia podľa sklonu:</strong></p>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-green-400 font-bold mb-2">Mierny svah (do 15°):</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Zatravnenie</li>
                        <li>• Mulčovanie</li>
                        <li>• Nízke kríky</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-orange-primary font-bold mb-2">Stredný svah (15-30°):</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Geomreža</li>
                        <li>• Kamenný koberec</li>
                        <li>• Drevené palisády</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-red-400 font-bold mb-2">Strmý svah (nad 30°):</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Gabióny</li>
                        <li>• Betónová oporna múr</li>
                        <li>• Pilótová stena</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task 9 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">9</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Príprava Základov Pod Záhradné Domčeky</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-white">Typ základu podľa veľkosti:</strong></p>
                  <ul className="space-y-3 ml-4">
                    <li>
                      <strong className="text-orange-primary">Malý domček (do 10 m²):</strong>
                      <div className="ml-4 mt-1 text-sm">
                        • Betónové pätky (4-6 ks, 40×40×40 cm)<br/>
                        • Výkop: 50×50×60 cm<br/>
                        • Štrk 8-16 mm (dno 15 cm)
                      </div>
                    </li>
                    <li>
                      <strong className="text-orange-primary">Veľký domček (nad 10 m²):</strong>
                      <div className="ml-4 mt-1 text-sm">
                        • Betónová doska 10 cm (s výstužou Kari-sieť)<br/>
                        • Podkladný štrk 30 cm (zhutnený)<br/>
                        • Hydroizolácia (PE fólia)
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Task 10 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black text-2xl rounded-full w-12 h-12 flex items-center justify-center shrink-0">10</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Zimná Ochrana a Úprava</h3>
                <div className="space-y-3 text-white/80">
                  <p><strong className="text-orange-primary">Posledný krok pred zimou:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Prekrytie:</strong> Geotextília/plachta na zhutnený štrk (proti vymývaniu)</li>
                    <li>• <strong>Drenáž:</strong> Kontrola priechodnosti (prepláchnuť vodou)</li>
                    <li>• <strong>Sklony:</strong> Finálna kontrola odtoku vody</li>
                    <li>• <strong>Fotodokumentácia:</strong> Stav pred zimou</li>
                  </ul>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-3">
                    <p className="text-sm"><strong>✓ BENEFIT:</strong> Na jar máte hotovo a môžete okamžite začať stavať!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Checklist */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">✓ Záverečný Checklist Pred Zimou</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-white font-bold">Hotovo?</h4>
              <ul className="space-y-2 text-white/80">
                <li>☐ Ornica odstránená</li>
                <li>☐ Drenáž položená a funkčná</li>
                <li>☐ Štrk nasypný a zhutnený</li>
                <li>☐ Povrchová voda odvedená</li>
                <li>☐ Svahy zabezpečené</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-bold">Dokumentácia?</h4>
              <ul className="space-y-2 text-white/80">
                <li>☐ Fotodokumentácia (pred/po)</li>
                <li>☐ Zameranie výšok</li>
                <li>☐ Faktúry za materiál</li>
                <li>☐ Protokol o zhutnení</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Packages */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Cenník Jesenné Balíčky 2026</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Basic Package */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-orange-primary/50 rounded-2xl p-6">
              <h3 className="text-white font-black text-2xl mb-2">JESEŇ BASIC</h3>
              <div className="text-5xl font-black text-orange-primary mb-4">799 €</div>
              <p className="text-white/60 text-sm mb-6">Normálna cena: 950 € | Úspora: 151 € (16%)</p>

              <div className="space-y-4 mb-6">
                <h4 className="text-white font-bold">Obsahuje:</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-orange-primary mr-2">✓</span>
                    <span>Minirýpadlo 1,8t (5 dní)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-primary mr-2">✓</span>
                    <span>Vibračná doska 120kg (3 dni)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-primary mr-2">✓</span>
                    <span>Doprava do 30 km ZADARMO</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-primary mr-2">✓</span>
                    <span>Technické poradenstvo 24/7</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-white/70"><strong className="text-white">Vhodné pre:</strong> Pozemky do 500 m², základné terénne úpravy</p>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 border-2 border-orange-primary rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white text-orange-primary text-xs font-black px-3 py-1 rounded-full">
                NAJPREDÁVANEJŠÍ
              </div>

              <h3 className="text-white font-black text-2xl mb-2">JESEŇ PREMIUM</h3>
              <div className="text-5xl font-black text-white mb-4">1,299 €</div>
              <p className="text-white/80 text-sm mb-6">Normálna cena: 1,590 € | Úspora: 291 € (18%)</p>

              <div className="space-y-4 mb-6">
                <h4 className="text-white font-bold">Obsahuje:</h4>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Minirýpadlo 3t (7 dní)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Vibračná doska 150kg (5 dní)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Kalové čerpadlo (3 dni)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Doprava do 50 km ZADARMO</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Konzultácia s odborníkom na stavbe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Technická podpora 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Fotodokumentácia pred/po ZADARMO</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-sm text-white"><strong>Vhodné pre:</strong> Pozemky 500-1000 m², kompletné terénne úpravy s drenážou</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <p className="text-white/80 text-center">
              <strong className="text-orange-primary">🍂 JESENNÁ AKCIA:</strong> Platí od 1.9. do 30.11.2026 | Pri objednávke uvedite kód <strong className="text-white">"JESEN2026"</strong>
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Pripravte Svoj Pozemok Ešte Túto Jeseň!</h2>
          <p className="text-white/90 mb-6 text-lg">
            Poradenstvo a kalkulácia ZADARMO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+421948555551" className="bg-white text-orange-primary px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors">
              📞 +421 948 555 551
            </a>
            <a href="mailto:info@royalstroje.sk" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              📧 info@royalstroje.sk
            </a>
          </div>
        </div>
      </div>
    ),
};
export default article;
