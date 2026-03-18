const article = {
  title: 'Case Study: Ako Sme Pomohli Dokončiť Projekt o 30% Rýchlejšie',
  date: '5. November 2026',
  author: 'Royal Stroje',
  readTime: '13 min',
  category: 'Prípadové štúdie',
  excerpt: 'Reálna prípadová štúdia stavby rodinného domu v Senci. Zistite, ako dokončil Ján K. hrubú stavbu o 30% rýchlejšie a ušetril 3,325 €.',
  content: (
      <div className="space-y-8">
        {/* Project Overview */}
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-primary/30 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-6">📊 O Projekte</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-orange-primary font-bold text-lg">Základné Info:</h4>
              <ul className="space-y-2 text-white/80">
                <li>• <strong className="text-white">Investor:</strong> Ján K. (42 rokov, IT podnikateľ)</li>
                <li>• <strong className="text-white">Lokalita:</strong> Senec (10 km od Bratislavy)</li>
                <li>• <strong className="text-white">Typ:</strong> Rodinný dom - murovaná stavba</li>
                <li>• <strong className="text-white">Rozmer:</strong> 10 × 12 m (1 podlažie + podkrovie)</li>
                <li>• <strong className="text-white">Pozemok:</strong> 800 m² (mierne svažitý)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-green-400 font-bold text-lg">Výsledky:</h4>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-2">
                <p className="text-white text-xl font-bold">✓ Hrubá stavba: o 30% rýchlejšie</p>
                <p className="text-white text-xl font-bold">✓ Úspora: 3,325 €</p>
                <p className="text-white text-xl font-bold">✓ Kvalita: bez chýb a reklamácií</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Challenge */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">🎯 Výzva</h2>
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <p className="text-white/80 text-lg mb-4">
              Ján rozhodol začať stavbu v júni 2026. Cieľ: <strong className="text-white">Dokončiť hrubú stavbu do konca septembra</strong>, aby stihnol strechu pred zimou.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-bold mb-2">Problémy Na Začiatku:</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Murár mal voľno až od augusta (2 mesiace strata času)</li>
                <li>• Pôvodný plán: prenájom od stavacej firmy = 4,500 € extra</li>
                <li>• Nutnosť urobiť terénne úpravy (pozemok svažitý)</li>
                <li>• Žiadne skúsenosti s organizáciou stavby</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Original Plan vs Realized Plan */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">📋 Pôvodný vs. Realizovaný Plán</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Plan */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-red-400 font-black text-xl mb-4">❌ Pôvodný Plán</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-bold mb-2">Júl - August:</h4>
                  <p className="text-white/70 text-sm">Čakanie na murára (žiadna práca)</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">September:</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Týždeň 1-2: Terénne úpravy (firma)</li>
                    <li>• Týždeň 3-4: Základy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Október - November:</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Múrovanie</li>
                    <li>• Strop</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">December:</h4>
                  <p className="text-white/70 text-sm">Strecha (riziko snehu/mrazu)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 mt-4">
                  <p className="text-white font-bold">Celkom: 6 mesiacov</p>
                  <p className="text-red-400 font-bold text-lg">Náklady: 4,500 € (mechanizácia od firmy)</p>
                </div>
              </div>
            </div>

            {/* Realized Plan */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-green-400 font-black text-xl mb-4">✓ Realizovaný Plán (Royal Stroje)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-bold mb-2">Júl:</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>✓ Týždeň 1-2: Terénne úpravy (vlastné, prenájom)</li>
                    <li>✓ Týždeň 3-4: Základy (vlastné, prenájom)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">August:</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>✓ Múrovanie (s murárom)</li>
                    <li>✓ Strop</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">September:</h4>
                  <p className="text-white/80 text-sm">✓ Strecha (ideálne počasie)</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Október - December:</h4>
                  <p className="text-white/80 text-sm">✓ Vnútorné práce (teplo, sucho)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 mt-4">
                  <p className="text-white font-bold">Celkom: 4 mesiace</p>
                  <p className="text-green-400 font-bold text-lg">Náklady: 1,175 € (prenájom Royal Stroje)</p>
                  <p className="text-green-400 font-bold text-xl mt-2">ÚSPORA: 3,325 €!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Week by Week Timeline */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">📅 Timeline: Týždeň po Týždni</h2>

          {/* Week 1-2 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black px-4 py-2 rounded-lg shrink-0">
                TÝŽ 1-2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Terénne Úpravy</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Prenajatá mechanizácia:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Minirýpadlo 1,8t (10 dní): 700 €</li>
                        <li>• Vibračná doska 120kg (5 dní): 150 €</li>
                        <li>• Doprava: 0 € (do 30 km zadarmo)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Vykonané práce:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>✓ Odstránenie ornice (30 cm)</li>
                        <li>✓ Výkopy základov (80 cm)</li>
                        <li>✓ Drenáž okolo domu</li>
                        <li>✓ Násyp štrku + hutnenie</li>
                        <li>✓ Príprava príjazdovej cesty</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-sm text-white/80">
                      <strong className="text-orange-primary">💡 Kľúč k úspechu:</strong> Ján si prenajal stroj na 10 dní (nie len 5), aby mal rezervu. Vďaka tomu mohol pracovať vo vlastnom tempe bez stresu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 3-4 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black px-4 py-2 rounded-lg shrink-0">
                TÝŽ 3-4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Základy</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Prenajatá mechanizácia:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Miešačka betónu (5 dní): 125 €</li>
                        <li>• Vibračný ponorný elektrický (3 dni): 60 €</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Vykonané práce:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>✓ Debnenie základov</li>
                        <li>✓ Výstuž (železo)</li>
                        <li>✓ Betonáž (15 m³)</li>
                        <li>✓ Vibrovanie betónu</li>
                        <li>✓ Ošetrovanie betónu (7 dní)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 5-8 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black px-4 py-2 rounded-lg shrink-0">
                TÝŽ 5-8
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Múrovanie + Strop</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Prenajatá mechanizácia:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Lešenie (celý projekt): 0 € (od murára)</li>
                        <li>• Miešačka malty (10 dní): 140 €</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Vykonané práce:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>✓ Murovanie obvodových múrov</li>
                        <li>✓ Murovanie vnútorných priečok</li>
                        <li>✓ Preklady</li>
                        <li>✓ Železobetónový veniec</li>
                        <li>✓ Stropné panely</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 9-12 */}
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="bg-orange-primary text-white font-black px-4 py-2 rounded-lg shrink-0">
                TÝŽ 9-12
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Strecha</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Prenajatá mechanizácia:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Žeriav (1 deň): 0 € (od dodávateľa krovu)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-primary font-bold mb-2">Vykonané práce:</h4>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>✓ Montáž krovu</li>
                        <li>✓ Položenie latí</li>
                        <li>✓ Difúzna fólia</li>
                        <li>✓ Strešná krytina (škridla)</li>
                        <li>✓ Klampiarské práce</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-white font-bold">✓ Hotovo do konca septembra = CIeľ splnený!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Comparison */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">💰 Porovnanie Nákladov</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-orange-primary">
                  <th className="p-3 text-white font-bold">Položka</th>
                  <th className="p-3 text-white font-bold text-right">Pôvodný plán<br/>(od firmy)</th>
                  <th className="p-3 text-white font-bold text-right">Realizované<br/>(Royal Stroje)</th>
                  <th className="p-3 text-white font-bold text-right">Úspora</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="p-3">Minirýpadlo (terénne úpravy)</td>
                  <td className="p-3 text-right">1,800 €</td>
                  <td className="p-3 text-right">700 €</td>
                  <td className="p-3 text-right text-green-400 font-bold">1,100 €</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3">Vibračná doska</td>
                  <td className="p-3 text-right">350 €</td>
                  <td className="p-3 text-right">150 €</td>
                  <td className="p-3 text-right text-green-400 font-bold">200 €</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3">Miešačky (betón + malta)</td>
                  <td className="p-3 text-right">600 €</td>
                  <td className="p-3 text-right">265 €</td>
                  <td className="p-3 text-right text-green-400 font-bold">335 €</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3">Vibrátor betónu</td>
                  <td className="p-3 text-right">180 €</td>
                  <td className="p-3 text-right">60 €</td>
                  <td className="p-3 text-right text-green-400 font-bold">120 €</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3">Doprava</td>
                  <td className="p-3 text-right">320 €</td>
                  <td className="p-3 text-right">0 €</td>
                  <td className="p-3 text-right text-green-400 font-bold">320 €</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3">Manažment/Poplatky firmy</td>
                  <td className="p-3 text-right">1,250 €</td>
                  <td className="p-3 text-right">0 €</td>
                  <td className="p-3 text-right text-green-400 font-bold">1,250 €</td>
                </tr>
                <tr className="border-t-2 border-orange-primary bg-orange-500/10">
                  <td className="p-3 font-bold text-white">CELKOM:</td>
                  <td className="p-3 text-right font-bold text-white text-lg">4,500 €</td>
                  <td className="p-3 text-right font-bold text-white text-lg">1,175 €</td>
                  <td className="p-3 text-right font-bold text-green-400 text-xl">3,325 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-6">💬 Feedback Od Jána</h2>
          <div className="space-y-6">
            <blockquote className="border-l-4 border-orange-primary pl-6 italic text-white/90 text-lg">
              "Na začiatku som bol skeptický. Prenajať si stroj a urobiť to sám? Ale Royal Stroje mi vysvetlili celý postup, zapožičali kvalitné stroje a boli vždy k dispozícii na telefóne. Ušetril som 3,300 € a stihnul som to o 2 mesiace skôr!"
            </blockquote>
            <blockquote className="border-l-4 border-orange-primary pl-6 italic text-white/90 text-lg">
              "Najväčšie prekvapenie? Aké jednoduché je ovládať minirýpadlo! Po 2 hodinách som sa cítil sebavedomne. A vibračná doska? To zvládne každý."
            </blockquote>
            <blockquote className="border-l-4 border-orange-primary pl-6 italic text-white/90 text-lg">
              "Už teraz plánem na jar dokončiť príjazdovku a terasu - opäť s Royal Stroje!"
            </blockquote>
          </div>
        </div>

        {/* Key Success Factors */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">🔑 Kľúčové Faktory Úspechu</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-green-400 font-bold text-lg mb-4">✓ Čo Fungovalo:</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 text-xl">1.</span>
                  <span><strong className="text-white">Plánovanie vopred:</strong> Ján si rezervoval stroje 3 týždne vopred</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 text-xl">2.</span>
                  <span><strong className="text-white">Dlhší prenájom:</strong> 10 dní namiesto 5 = menej stresu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 text-xl">3.</span>
                  <span><strong className="text-white">Technická podpora:</strong> Royal Stroje vždy k dispozícii na telefóne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 text-xl">4.</span>
                  <span><strong className="text-white">Kvalitné stroje:</strong> Žiadna porucha, všetko fungovalo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 text-xl">5.</span>
                  <span><strong className="text-white">Vlastné tempo:</strong> Práca bez tlaku termínov firmy</span>
                </li>
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
              <h3 className="text-orange-primary font-bold text-lg mb-4">💡 Čo By Urobil Inak:</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-orange-primary mr-2 text-xl">1.</span>
                  <span><strong className="text-white">Lešenie:</strong> Prenajať si vlastné (nie od murára)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-primary mr-2 text-xl">2.</span>
                  <span><strong className="text-white">Materiál:</strong> Objednať vopred (2-3 dni doručenie)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-primary mr-2 text-xl">3.</span>
                  <span><strong className="text-white">Počasie:</strong> Sledovať predpoveď 7 dní vopred</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-primary mr-2 text-xl">4.</span>
                  <span><strong className="text-white">Pomocníci:</strong> Pozvať kamaráta (práca ide rýchlejšie)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">📚 5 Lekcií Pre Vás</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-primary pl-4">
              <h4 className="text-white font-bold mb-1">1. Nemáte skúsenosti? Nevadí!</h4>
              <p className="text-white/70">Ján nikdy pred tým nepoužil minirýpadlo. Stačí 2 hodiny praxe a technická podpora.</p>
            </div>
            <div className="border-l-4 border-orange-primary pl-4">
              <h4 className="text-white font-bold mb-1">2. Šetríte čas aj peniaze</h4>
              <p className="text-white/70">Vlastný prenájom = úspora 3,000+ € + flexibilita termínov.</p>
            </div>
            <div className="border-l-4 border-orange-primary pl-4">
              <h4 className="text-white font-bold mb-1">3. Plánujte s rezervou</h4>
              <p className="text-white/70">Radšej 10 dní než 5. Rezerva = pokoj v práci.</p>
            </div>
            <div className="border-l-4 border-orange-primary pl-4">
              <h4 className="text-white font-bold mb-1">4. Technická podpora je kľúčová</h4>
              <p className="text-white/70">Royal Stroje 24/7 k dispozícii = istota, že neuviaznutete.</p>
            </div>
            <div className="border-l-4 border-orange-primary pl-4">
              <h4 className="text-white font-bold mb-1">5. Začnite skôr</h4>
              <p className="text-white/70">Nemusíte čakať na firmu. Terénne úpravy zvládnete sami a ušetríte mesiace.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Chcete Rovnaký Úspech?</h2>
          <p className="text-white/90 mb-6 text-lg">
            Kontaktujte nás a my vám pomôžeme naplánovať váš projekt!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+421948555551" className="bg-white text-orange-primary px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors">
              📞 +421 948 555 551
            </a>
            <a href="mailto:info@royalstroje.sk" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              📧 info@royalstroje.sk
            </a>
          </div>
          <p className="text-white/70 mt-6 text-sm">
            Poradenstvo ZADARMO | Doprava do 30 km ZADARMO | Technická podpora 24/7
          </p>
        </div>
      </div>
    ),
};
export default article;
