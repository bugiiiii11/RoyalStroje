const article = {
  title: 'NIVEL CL3G: Krížový Laser so Zeleným Lúčom Pre Profesionálnu Presnosť',
  date: '12. Marec 2026',
  author: 'Royal Stroje',
  readTime: '10 min',
  category: 'Návody',
  excerpt: 'Kompletný prehľad krížového lasera NIVEL CL3G so zeleným lúčom - technické parametre, praktické využitie a naše skúsenosti s týmto profesionálnym meracím prístrojom.',
  content: (
      <div className="space-y-8">
        <p className="text-xl text-white/90 leading-relaxed">
          NIVEL CL3G je profesionálny krížový laser s <strong className="text-green-500">troma 360° rovinami a zeleným lúčom</strong>,
          ktorý je až 4-krát viditeľnejší ako červený. Tento prístroj sa stal obľúbeným nástrojom medzi
          profesionálnymi stavbármi, obkladačmi a inštalatérmi. Poďme sa pozrieť na jeho detailný rozbor.
        </p>

        {/* YouTube Video */}
        <div className="bg-zinc-900 border border-green-500/30 rounded-2xl overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/0NTDe-6_B_o"
              title="NIVEL CL3G - Krížový laser so zeleným lúčom"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-4 bg-zinc-800/50">
            <p className="text-white/70 text-sm text-center">
              NIVEL CL3G v akcii - ukážka 3 × 360° zeleného lasera
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Prečo Práve Zelený Laser?
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Zelený laser nie je len o farbe - prináša <strong className="text-green-500">reálne výhody pri práci</strong>:
          </p>
          <ul className="space-y-2 text-white/80">
            <li>• <strong>4× lepšia viditeľnosť</strong> oproti červenému laseru pri rovnakom výkone</li>
            <li>• <strong>Lepšia čitateľnosť</strong> v jasnom svetle a na slnku</li>
            <li>• <strong>Menšia únava očí</strong> pri dlhodobej práci</li>
            <li>• <strong>Väčší dosah</strong> bez potreby prijímača</li>
          </ul>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Technické Parametre: Čo Potrebujete Vedieť</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-500 mb-4">Základné Špecifikácie</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Typ lasera:</span>
                <span className="font-bold text-green-500">Zelený (515nm)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Počet rovín:</span>
                <span className="font-bold text-white">3 × 360° (2V + 1H)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Presnosť:</span>
                <span className="font-bold text-white">±2,0 mm/10 m</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Dosah:</span>
                <span className="font-bold text-white">30 m (70 m s prijímačom)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Samonivelizácia:</span>
                <span className="font-bold text-white">±3,0°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Trieda ochrany:</span>
                <span className="font-bold text-white">IP54</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-500 mb-4">Konštrukcia a Napájanie</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Batéria:</span>
                <span className="font-bold text-white">Li-ion 3,7V / 4000mAh</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Nabíjanie:</span>
                <span className="font-bold text-white">USB-C</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Hmotnosť:</span>
                <span className="font-bold text-white">0,9 kg</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Rozmery:</span>
                <span className="font-bold text-white">148 × 90 × 133 mm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Závit statívu:</span>
                <span className="font-bold text-white">1/4″, 5/8″</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Prevádzková teplota:</span>
                <span className="font-bold text-white">-10°C až +50°C</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Tri 360° Roviny: Revolúcia v Meraní</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/30 rounded-xl p-6">
          <p className="text-white/80 mb-6">
            NIVEL CL3G disponuje <strong className="text-green-500">dvoma vertikálnymi a jednou horizontálnou rovinou</strong>,
            pričom každá pokrýva plných 360°. Toto umožňuje:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="text-green-500 text-3xl mb-3">📐</div>
              <h4 className="text-white font-bold mb-2">Pravé Uhly</h4>
              <p className="text-white/70 text-sm">
                Simultánne zobrazenie dvoch vertikálnych rovín na presné určenie pravých uhlov
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="text-green-500 text-3xl mb-3">🏗️</div>
              <h4 className="text-white font-bold mb-2">Celoplošné Meranie</h4>
              <p className="text-white/70 text-sm">
                360° pokrytie bez potreby otáčania prístroja
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="text-green-500 text-3xl mb-3">🔄</div>
              <h4 className="text-white font-bold mb-2">Flexibilita</h4>
              <p className="text-white/70 text-sm">
                Možnosť zapnúť ľubovoľnú kombináciu rovín podľa potreby
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Špeciálne Funkcie: Čím Vyniká CL3G</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/30 rounded-xl p-6">
            <div className="text-green-500 text-3xl mb-3">📱</div>
            <h4 className="text-white font-bold text-lg mb-2">Bluetooth Ovládanie</h4>
            <p className="text-white/70">
              Integrovaný Bluetooth modul umožňuje <strong className="text-green-500">diaľkové ovládanie</strong> všetkých
              funkcií cez mobilnú aplikáciu. Praktické pri práci vo výške alebo na neprístupných miestach.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-blue-500/30 rounded-xl p-6">
            <div className="text-blue-500 text-3xl mb-3">⚡</div>
            <h4 className="text-white font-bold text-lg mb-2">Automatická Nivelizácia</h4>
            <p className="text-white/70">
              Po zapnutí sa laser <strong className="text-blue-500">automaticky vyrovná</strong> v rozsahu ±3°
              a je okamžite pripravený na prácu. Uzamknutie kompenzátora umožňuje prácu so šikmými rovinami.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl p-6">
            <div className="text-orange-primary text-3xl mb-3">📏</div>
            <h4 className="text-white font-bold text-lg mb-2">Nízky Spodný Lúč (19 mm)</h4>
            <p className="text-white/70">
              Spodný laserový lúč je len <strong className="text-orange-primary">19 mm od podlahy</strong>,
              čo je ideálne pre presné vyrovnávanie dlažby a podláh.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-purple-500/30 rounded-xl p-6">
            <div className="text-purple-500 text-3xl mb-3">🛡️</div>
            <h4 className="text-white font-bold text-lg mb-2">Robustná Konštrukcia</h4>
            <p className="text-white/70">
              Telo vystužené kovovými prvkami a <strong className="text-purple-500">gumové rohy</strong> chránia
              laser pred poškodením. IP54 ochranca zaisťuje odolnosť voči prachu a vode.
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Praktické Využitie: Pre Aké Práce Je Vhodný?</h2>

        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-500 mb-4">Univerzálne Použitie</h3>
          <p className="text-white/80 mb-4">
            NIVEL CL3G je skutočne <strong className="text-white">všestranný merací prístroj</strong>. Vyniká pri:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-3">✓ Stavebné Práce</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Vytyčovanie priečok a stien</li>
                <li>• Kontrola zvislosti a vodorovnosti</li>
                <li>• Montáž sádrokartónu</li>
                <li>• Osadzovanie okien a dverí</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">✓ Dokončovacie Práce</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Kladenie obkladov a dlažby</li>
                <li>• Montáž kuchýň a nábytku</li>
                <li>• Inštalácia plavajúcich podláh</li>
                <li>• Zavesenie obrazov a políc</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">✓ Inštalatérske Práce</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Rozvodov vody a kúrenia</li>
                <li>• Elektrické rozvody</li>
                <li>• Vedenie káblov a trubiek</li>
                <li>• Montáž radiátorov</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">✓ Exteriérové Práce</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Stavba plotov a zábradlí</li>
                <li>• Terénne úpravy</li>
                <li>• Pokládka zámkovej dlažby</li>
                <li>• Montáž pergol a prístreškov</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Príslušenstvo v Balení</h2>

        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-500 mb-4">Kompletný Set</h3>
          <p className="text-white/80 mb-4">
            V Royal Stroje prenajímame NIVEL CL3G ako <strong className="text-white">kompletný set so statívom a latou</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Laser NIVEL CL3G</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Statív SJJ-M1EX</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Nivelačná lata LS24</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Li-ion batéria 4000mAh</span>
              </li>
            </ul>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>USB-C nabíjačka</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Ochranné okuliare</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Laserové terče (2 ks)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg">✓</span>
                <span>Prepravné puzdro</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pre Koho Je NIVEL CL3G Vhodný?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-2xl p-6 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">IDEÁLNE</span>
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">👷</div>
              <h4 className="text-white font-black text-lg">Profesionáli</h4>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>✓ Obkladači a dláždiari</li>
              <li>✓ Montážnici sádrokartónu</li>
              <li>✓ Inštalatéri a elektrikári</li>
              <li>✓ Stavebné firmy</li>
            </ul>
            <p className="text-white/60 text-xs mt-4 italic">
              Pre každodenné profesionálne použitie
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🔧</div>
              <h4 className="text-white font-black text-lg">Pokročilí Kutiľi</h4>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>✓ Rekonštrukcie bytov</li>
              <li>✓ Stavby prístavkov</li>
              <li>✓ Pokládka podláh</li>
              <li>✓ DIY projekty</li>
            </ul>
            <p className="text-white/60 text-xs mt-4 italic">
              Pre náročnejšie domáce projekty
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🏠</div>
              <h4 className="text-white font-black text-lg">Domáci Majstri</h4>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>✓ Zavesenie obrazov</li>
              <li>✓ Montáž políc</li>
              <li>✓ Kontrola rovnosti</li>
              <li>✓ Pomocné práce</li>
            </ul>
            <p className="text-white/60 text-xs mt-4 italic">
              Prenájom je ideálny pre jednorázové použitie
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Naša Skúsenosť: Prečo Odporúčame Tento Laser</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/30 rounded-2xl p-6 md:p-8">
          <p className="text-white/90 leading-relaxed mb-4">
            V Royal Stroje máme NIVEL CL3G v našej prenajímacej flotile a musíme povedať,
            že <strong className="text-green-500">patrí medzi najobľúbenejšie meracie prístroje</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-green-500 font-bold mb-3">✓ Čo Nás Presvedčilo:</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Zelený lúč je naozaj výrazne lepšie viditeľný</li>
                <li>• 3 roviny výrazne zrýchľujú prácu</li>
                <li>• Bluetooth ovládanie oceňujú všetci zákazníci</li>
                <li>• Robustná konštrukcia znáša stavebné podmienky</li>
              </ul>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-green-500 font-bold mb-3">💡 Čo Oceňujú Zákazníci:</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• "Konečne laser, ktorý vidím aj za denného svetla"</li>
                <li>• "Tri roviny naraz - to je bomba"</li>
                <li>• "USB-C nabíjanie je super, mám kábel v aute"</li>
                <li>• "Automatická nivelizácia šetrí čas"</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-6">
            <h4 className="text-green-500 font-bold text-lg mb-3">🎯 Pre Koho Je Prenájom Výhodný?</h4>
            <p className="text-white/80 leading-relaxed mb-3">
              Ak plánujete rekonštrukciu, pokládku dlažby alebo potrebujete presné meranie na krátkodobý projekt,
              <strong className="text-white"> prenájom je oveľa výhodnejší než kúpa</strong>:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <p className="text-green-500 font-bold mb-1">Kúpa nového lasera:</p>
                <p className="text-white/70">400-500 €</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <p className="text-orange-primary font-bold mb-1">Prenájom na týždeň:</p>
                <p className="text-white/70">~75 € (Royal Stroje: od 15 €/deň)</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <p className="text-blue-500 font-bold mb-1">Úspora:</p>
                <p className="text-white/70">~400 € + žiadne starosti s kalibráciou</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/50 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-black text-white mb-4 text-center">
            Prenajmite si NIVEL CL3G v Royal Stroje
          </h3>
          <p className="text-white/80 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            Potrebujete presné meranie na váš projekt? Máme NIVEL CL3G pripravený ako kompletný set
            so statívom a latou.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-green-500/40"
            >
              <span>Zavolať: 0948 555 551</span>
            </a>
            <a
              href="/?search=NIVEL+CL3G#katalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-green-500/50 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
            >
              <span>Pozrieť v katalógu</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-green-500 font-bold mb-1">Od 15 €/deň</p>
              <p className="text-white/60">bez DPH</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-green-500 font-bold mb-1">Kompletný set</p>
              <p className="text-white/60">so statívom a latou</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-blue-500 font-bold mb-1">Technická podpora</p>
              <p className="text-white/60">24/7 po telefóne</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Záverečné Hodnotenie</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-green-500 font-bold text-lg mb-4">✓ Klady</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Zelený lúč - 4× lepšia viditeľnosť</li>
                <li>• 3 × 360° roviny pre univerzálne použitie</li>
                <li>• Bluetooth ovládanie cez aplikáciu</li>
                <li>• Automatická nivelizácia</li>
                <li>• Nízky spodný lúč (19 mm)</li>
                <li>• USB-C nabíjanie</li>
                <li>• IP54 odolnosť</li>
              </ul>
            </div>

            <div>
              <h4 className="text-orange-primary font-bold text-lg mb-4">⚠️ Zápory</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Vyššia cena oproti červeným laserom</li>
                <li>• Pre hobby použitie môže byť predimenzovaný</li>
                <li>• Zelený laser spotrebuje viac energie</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-green-500 font-bold text-xl mb-3 text-center">Naše Finálne Hodnotenie</h4>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-green-500 text-4xl">⭐⭐⭐⭐⭐</span>
              <span className="text-white text-3xl font-black">9,3/10</span>
            </div>
            <p className="text-white/80 text-center leading-relaxed max-w-3xl mx-auto">
              NIVEL CL3G je <strong className="text-white">top voľba pre profesionálov a náročných kutiľov</strong>,
              ktorí potrebujú presné meranie so zeleným laserom. Ak potrebujete laser na krátkodobý projekt,
              prenájom je ideálne riešenie - získate prémiový nástroj za zlomok ceny.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Potrebujete <span className="text-green-500">poradiť s výberom meracieho prístroja</span>?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
            Máme 20 rokov skúseností v prenájme stavebnej mechanizácie a náradia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-green-500/40"
            >
              <span>Zavolať: 0948 555 551</span>
            </a>
          </div>
        </div>
      </div>
    ),
};
export default article;
