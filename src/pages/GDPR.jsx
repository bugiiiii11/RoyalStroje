export default function GDPR() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="relative pb-16 md:py-16 bg-zinc-950 overflow-hidden min-h-screen">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
          }}
        />

        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Section Heading */}
          <div className="text-center mb-6 md:mb-12 pt-16 md:pt-0">
            <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
              <span className="text-orange-primary">Ochrana</span> osobných údajov
            </h1>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
              Informácie o spracúvaní osobných údajov v zmysle GDPR
            </p>
          </div>

          {/* Header Info */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-base">
              <div>
                <p className="text-white/60 mb-1 text-[10px] md:text-sm">Prevádzkovateľ</p>
                <p className="text-white font-semibold text-xs md:text-base">ROYAL STROJE s.r.o.</p>
                <p className="text-white/80 text-xs md:text-base">Recká cesta 182, 925 26 Boldog – Senec</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-[10px] md:text-sm">Kontakt</p>
                <p className="text-white font-semibold text-xs md:text-base">info@royalstroje.sk</p>
                <p className="text-white/80 text-xs md:text-base">+421 948 555 551</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-[10px] md:text-sm">IČO / DIČ / IČ DPH</p>
                <p className="text-white/80 text-xs md:text-base">57 405 425 / 2122722063 / SK2122722063</p>
              </div>
              <div>
                <p className="text-white/60 mb-1 text-[10px] md:text-sm">Verzia / Platné od</p>
                <p className="text-white/80 text-xs md:text-base">GDPR2026.01 / 01. 02. 2026</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-4 md:space-y-8">

            {/* Section I */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">I.</span> Rozsah spracúvaných osobných údajov
              </h2>

              <div className="space-y-2 md:space-y-4 text-white/80 text-xs md:text-base leading-relaxed">
                <p>
                  <strong className="text-white">1.</strong> Prevádzkovateľ spracúva tieto bežné kategórie osobných údajov zmluvných partnerov a ich zástupcov:
                </p>
                <ul className="space-y-2 ml-6 list-disc list-inside">
                  <li><strong className="text-white">identifikačné údaje:</strong> meno, priezvisko, titul, podpis</li>
                  <li><strong className="text-white">kontaktné údaje:</strong> telefónne číslo, e-mailová adresa</li>
                  <li><strong className="text-white">podnikateľské údaje:</strong> obchodné meno, IČO, DIČ, IČ DPH, adresa sídla alebo miesta podnikania</li>
                  <li><strong className="text-white">zmluvné a transakčné údaje:</strong> obsah zmluvy a objednávok, fakturácia, platobná história</li>
                  <li><strong className="text-white">komunikačné údaje:</strong> obsah e-mailov a inej korešpondencie súvisiacej so zmluvou</li>
                  <li><strong className="text-white">údaje z dokladu totožnosti</strong> osoby podpisujúcej zmluvu v nevyhnutnom rozsahu – spracúvané výlučne na účely overenia oprávnenia konať v mene zmluvného partnera</li>
                </ul>

                <p>
                  <strong className="text-white">2.</strong> V prípade návštevy webovej stránky www.royalstroje.sk môžu byť spracúvané aj: IP adresa, technické údaje o zariadení a prehliadači, súbory cookies — v rozsahu podľa udeleného súhlasu (analytické, marketingové cookies) alebo oprávneného záujmu (nevyhnutné cookies).
                </p>

                <p>
                  <strong className="text-white">3.</strong> Prevádzkovateľ nespracúva osobitné kategórie osobných údajov (citlivé údaje) podľa čl. 9 GDPR.
                </p>
              </div>
            </div>

            {/* Section II - Table */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">II.</span> Účel, právny základ a doba uchovávania
              </h2>

              <div className="text-white/80 text-xs md:text-base leading-relaxed mb-4 md:mb-6">
                <p>Osobné údaje sú spracúvané vždy na konkrétny, legitímny a vopred určený účel:</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[10px] md:text-base">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-2 text-orange-primary font-bold">Účel spracúvania</th>
                      <th className="text-left py-3 px-2 text-orange-primary font-bold">Právny základ (GDPR)</th>
                      <th className="text-left py-3 px-2 text-orange-primary font-bold">Doba uchovávania</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Uzatvorenie a plnenie zmluvy o prenájme</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. b) – plnenie zmluvy</td>
                      <td className="py-3 px-2">Po dobu trvania zmluvy + 10 rokov</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Overenie oprávnenia konať</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. b) a f)</td>
                      <td className="py-3 px-2">Po dobu trvania zmluvy + 10 rokov</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Fakturácia a vedenie účtovníctva</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. c) – zákonná povinnosť</td>
                      <td className="py-3 px-2">10 rokov od vystavenia dokladu</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Vymáhanie pohľadávok a právna ochrana</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. f) – oprávnený záujem</td>
                      <td className="py-3 px-2">Do ukončenia konania + 5 rokov</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Zasielanie obchodných informácií existujúcim zákazníkom</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. f) – oprávnený záujem</td>
                      <td className="py-3 px-2">Do podania námietky</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Zasielanie obchodných informácií – noví kontakty</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. a) – súhlas</td>
                      <td className="py-3 px-2">Do odvolania súhlasu</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-2">Analytické a marketingové cookies</td>
                      <td className="py-3 px-2">Čl. 6 ods. 1 písm. a) – súhlas</td>
                      <td className="py-3 px-2">Max. 2 roky</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-white/70 text-sm mt-4 italic">
                Po uplynutí doby uchovávania budú osobné údaje vymazané alebo anonymizované.
              </p>
            </div>

            {/* Section III */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">III.</span> Zdroj údajov a poskytovanie tretím osobám
              </h2>

              <div className="space-y-2 md:space-y-4 text-white/80 text-xs md:text-base leading-relaxed">
                <p>
                  <strong className="text-white">1.</strong> Osobné údaje sú získavané priamo od dotknutej osoby, z údajov uvedených v zmluve alebo objednávke, alebo z verejne dostupných registrov (napr. obchodný register, register živnostenského podnikania).
                </p>

                <p>
                  <strong className="text-white">2.</strong> Osobné údaje môžu byť sprístupnené nasledovným kategóriám príjemcov, výlučne v nevyhnutnom rozsahu:
                </p>
                <ul className="space-y-1 ml-6 list-disc list-inside">
                  <li>účtovná spoločnosť a daňoví poradcovia</li>
                  <li>poskytovatelia IT služieb a cloudových riešení</li>
                  <li>právni zástupcovia a advokátske kancelárie</li>
                  <li>faktoringové spoločnosti (v prípade postúpenia pohľadávok)</li>
                  <li>súdy, exekútori, orgány verejnej moci</li>
                  <li>poskytovatelia e-mailových a marketingových služieb</li>
                </ul>

                <p>
                  <strong className="text-white">3.</strong> Osobné údaje nie sú prenášané do tretích krajín mimo EÚ/EHP ani medzinárodným organizáciám.
                </p>
              </div>
            </div>

            {/* Section IV - Rights Table */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">IV.</span> Práva dotknutej osoby
              </h2>

              <div className="text-white/80 leading-relaxed mb-6">
                <p>
                  Každá dotknutá osoba má nasledovné práva, ktoré môže uplatniť písomne na adrese sídla Prevádzkovateľa alebo e-mailom na{' '}
                  <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:underline font-semibold">
                    info@royalstroje.sk
                  </a>
                  {' '}(predmet: „GDPR – žiadosť dotknutej osoby").
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Prístup k údajom (čl. 15 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo získať potvrdenie, či sa vaše údaje spracúvajú, a prístup k nim vrátane informácií o spracúvaní.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Oprava údajov (čl. 16 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo na opravu nesprávnych alebo doplnenie neúplných osobných údajov.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Vymazanie údajov (čl. 17 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo na výmaz, ak pominul účel, bol odvolaný súhlas alebo spracúvanie je protiprávne – s výnimkou zákonných povinností uchovávania.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Obmedzenie spracúvania (čl. 18 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo požadovať obmedzenie spracúvania počas preverenia námietky alebo v iných zákonom stanovených prípadoch.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Prenosnosť údajov (čl. 20 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo získať údaje v štruktúrovanom, strojovo čitateľnom formáte a preniesť ich inému prevádzkovateľovi.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Námietka (čl. 21 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo kedykoľvek namietať spracúvanie založené na oprávnenom záujme (vrátane priameho marketingu).</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Odvolanie súhlasu (čl. 7 ods. 3 GDPR)</h3>
                  <p className="text-white/80 text-sm">Ak je spracúvanie založené na súhlase, máte právo ho kedykoľvek odvolať.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
                  <h3 className="text-orange-primary font-bold text-sm md:text-lg mb-1 md:mb-2">Sťažnosť dozornému orgánu (čl. 77 GDPR)</h3>
                  <p className="text-white/80 text-sm">Právo podať sťažnosť Úradu na ochranu osobných údajov SR.</p>
                </div>
              </div>
            </div>

            {/* Sections V-VII */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">V.</span> Bezpečnosť osobných údajov
              </h2>

              <div className="space-y-2 md:space-y-4 text-white/80 text-xs md:text-base leading-relaxed">
                <p>
                  <strong className="text-white">1.</strong> Prevádzkovateľ prijal primerané technické a organizačné opatrenia na ochranu osobných údajov proti neoprávnenému prístupu, strate, poškodeniu, zneužitiu alebo zničeniu, v súlade s čl. 32 GDPR. Medzi tieto opatrenia patria najmä: šifrovanie dát, riadenie prístupov a autentifikácia, pravidelné zálohovanie, školenie zamestnancov.
                </p>
                <p>
                  <strong className="text-white">2.</strong> V prípade porušenia ochrany osobných údajov, ktoré predstavuje riziko pre práva a slobody fyzických osôb, Prevádzkovateľ nahlási incident Úradu na ochranu osobných údajov SR do 72 hodín od jeho zistenia (čl. 33 GDPR).
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">VI.</span> Automatizované rozhodovanie a profilovanie
              </h2>

              <div className="text-white/80 leading-relaxed">
                <p>
                  <strong className="text-white">1.</strong> Prevádzkovateľ nevykonáva automatizované individuálne rozhodovanie ani profilovanie podľa čl. 22 GDPR, ktoré by malo právne účinky alebo by sa podobne závažne dotýkalo dotknutých osôb.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">VII.</span> Dobrovoľnosť poskytnutia údajov
              </h2>

              <div className="text-white/80 leading-relaxed">
                <p>
                  <strong className="text-white">1.</strong> Poskytnutie osobných údajov je dobrovoľné. Avšak poskytnutie údajov potrebných na uzatvorenie a plnenie zmluvy je nevyhnutnou podmienkou vzniku zmluvného vzťahu — bez ich poskytnutia nie je možné zmluvu uzatvoriť. Poskytnutie údajov na marketingové účely je vždy dobrovoľné a je možné ho kedykoľvek odvolať.
                </p>
              </div>
            </div>

            {/* Section VIII - Contact Info */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">VIII.</span> Dozorný orgán
              </h2>

              <div className="text-white/80 leading-relaxed mb-4">
                <p>Dotknutá osoba má právo podať sťažnosť dozornému orgánu:</p>
              </div>

              <div className="bg-zinc-950/50 rounded-xl p-6 border border-orange-primary/20">
                <h3 className="text-white font-bold text-xl mb-3">Úrad na ochranu osobných údajov Slovenskej republiky</h3>
                <div className="space-y-1 text-white/80">
                  <p>Hraničná 12, 820 07 Bratislava 27</p>
                  <p>Tel.: +421 2 3231 3214</p>
                  <p>E-mail: statny.dozor@pdp.gov.sk</p>
                  <p>
                    Web:{' '}
                    <a
                      href="https://www.dataprotection.gov.sk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-primary hover:underline"
                    >
                      www.dataprotection.gov.sk
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Section IX */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-lg md:text-3xl font-black text-white mb-3 md:mb-6">
                <span className="text-orange-primary">IX.</span> Záverečné ustanovenia
              </h2>

              <div className="space-y-2 md:space-y-4 text-white/80 text-xs md:text-base leading-relaxed">
                <p>
                  <strong className="text-white">1.</strong> Tento dokument je zverejnený na webovej stránke www.royalstroje.sk a v tlačenej forme je dostupný v sídle Prevádzkovateľa.
                </p>
                <p>
                  <strong className="text-white">2.</strong> Prevádzkovateľ si vyhradzuje právo tento dokument aktualizovať v prípade zmeny legislatívy alebo spôsobu spracúvania. O podstatných zmenách budú dotknuté osoby informované zverejnením aktualizovanej verzie na webe a/alebo e-mailom minimálne 30 dní pred nadobudnutím účinnosti zmien.
                </p>
                <p>
                  <strong className="text-white">3.</strong> Ak máte akékoľvek otázky týkajúce sa spracúvania vašich osobných údajov, kontaktujte nás e-mailom na{' '}
                  <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:underline font-semibold">
                    info@royalstroje.sk
                  </a>.
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
            <p className="text-white/50 text-xs md:text-sm">
              ROYAL STROJE s.r.o. | Verzia GDPR2026.01 | Platné od 01.02.2026 | www.royalstroje.sk
            </p>
            <p className="text-white/40 text-[10px] md:text-xs mt-2">
              Recká cesta 182, 925 26 Boldog – Senec | IČO: 57 405 425 | info@royalstroje.sk
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
