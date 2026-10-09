import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const contacts = [
  { href: 'tel:+421948555551', Icon: Phone, label: 'Zavolajte nám', value: '0948 555 551' },
  { href: 'mailto:info@royalstroje.sk', Icon: Mail, label: 'Napíšte nám', value: 'info@royalstroje.sk' },
  { href: 'https://wa.me/421948555551', Icon: MessageCircle, label: 'WhatsApp', value: 'Rýchla odpoveď', external: true },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqHeadingRef, faqHeadingInView] = useInView();
  const [faqListRef, faqListInView] = useInView();
  const [faqSideRef, faqSideInView] = useInView();

  const faqs = [
    {
      question: 'Ako funguje prenájom?',
      answerText: 'Prenájom funguje jednoducho: kontaktujte nás telefonicky na 0948 555 551, e-mailom na info@royalstroje.sk alebo cez WhatsApp/Telegram. Dohodneme techniku, termín a spôsob prevzatia alebo dopravy. Noví zákazníci sa registrujú osobne alebo e-mailom na základe registračného formulára a pri prvom prenájme sa vyžaduje vratná kaucia podľa typu techniky.',
      answer: (
        <div className="space-y-3">
          <p>Prenájom u nás funguje jednoducho a rýchlo – na základe priamej dohody a potvrdenia dostupnosti.</p>

          <div className="space-y-4 mt-4">
            <div>
              <p className="font-bold text-white mb-2">1. Kontaktujte nás</p>
              <ul className="space-y-1 ml-4 list-disc text-white/80">
                <li>Najrýchlejšie telefonicky na <a href="tel:+421948555551" className="text-orange-primary hover:underline font-semibold">0948 555 551</a></li>
                <li>Kontaktovať nás môžete aj e-mailom na <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:underline font-semibold">info@royalstroje.sk</a></li>
                <li>alebo cez WhatsApp / Telegram</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2">2. Dohodneme techniku, termín a spôsob prevzatia alebo dopravy</p>
              <p className="ml-4 text-white/80">Spoločne si potvrdíme dostupnosť a pripravíme všetko potrebné k prenájmu.</p>
            </div>

            <div>
              <p className="font-bold text-white mb-2">3. Registrácia a vratná kaucia (pri nových zákazníkoch)</p>
              <ul className="space-y-1 ml-4 list-disc text-white/80">
                <li>Noví zákazníci sa registrujú osobne alebo e-mailom na základe registračného formulára.</li>
                <li>Pri prvom prenájme sa vyžaduje vratná kaucia podľa typu techniky.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      question: 'Aké dokumenty potrebujem na požičanie?',
      answerText: 'Pre právnické osoby: živnostenský list alebo výpis z obchodného registra, platný doklad totožnosti oprávnenej osoby, IČO, DIČ, IČ DPH. Pre fyzické osoby: platný občiansky preukaz alebo pas a kontaktné údaje (telefón, e-mail). Všetky údaje spracúvame v súlade s GDPR výlučne na účely prenájmu.',
      answer: (
        <div className="space-y-3">
          <p><strong className="text-white">Pre právnické osoby (PO):</strong></p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Živnostenský list alebo výpis z obchodného registra</li>
            <li>Platný doklad totožnosti oprávnenej osoby</li>
            <li>IČO, DIČ, IČ DPH</li>
          </ul>
          <p className="mt-3"><strong className="text-white">Pre fyzické osoby (FO):</strong></p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Platný občiansky preukaz alebo pas</li>
            <li>Kontaktné údaje (telefón, e-mail)</li>
          </ul>
          <p className="mt-3 text-sm text-white/70">Všetky údaje sú spracúvané v súlade s GDPR a používame ich výlučne na účely prenájmu.</p>
        </div>
      )
    },
    {
      question: 'Dostanem stroj s plnou alebo prázdnou nádržou PHM?',
      answerText: 'Stroje odovzdávame s plnou nádržou pohonných hmôt a očakávame ich späť tiež s plnou nádržou. Pri vrátení s prázdnou alebo čiastočne naplnenou nádržou sa účtuje doplatok za dotankovanie vo výške 2€/liter bez DPH.',
      answer: (
        <div className="space-y-3">
          <p>Stroje <strong className="text-white">odovzdávame s plnou nádržou</strong> pohonných hmôt (PHM) a takisto ich <strong className="text-white">očakávame späť s plnou nádržou</strong>.</p>
          <p className="text-white/80">V prípade vrátenia s prázdnou alebo čiastočne naplnenou nádržou bude účtovaný doplatok za dotankovanie vo výške:</p>
          <div className="bg-zinc-800/50 rounded-lg p-3 mt-2">
            <p className="text-orange-primary font-bold">2€/liter bez DPH</p>
          </div>
          <p className="text-sm text-white/70 mt-3"><strong>Tip:</strong> Natankujte stroj pred vrátením.</p>
        </div>
      )
    },
    {
      question: 'Poskytujete dopravu techniky na miesto?',
      answerText: 'Áno, poskytujeme dopravu techniky priamo na stavbu alebo iné miesto určenia. Dodávka: Senec 15€, ostatné 1€/km (min. 15€). Pick-up s prívesným vozíkom do 3500 kg: 1,2€/km (min. 15€). Preprava cudzieho stroja/náradia: 1,50€/km (min. 30€). Ceny sú bez DPH, presnú cenu oznámime pri objednávke.',
      answer: (
        <div className="space-y-3">
          <p>Áno, poskytujeme <strong className="text-white">dopravu techniky priamo k vám</strong> na stavbu alebo iné miesto určenia.</p>
          <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg p-4 mt-3 space-y-3">
            <p><strong className="text-orange-primary">Cenník dopravy:</strong></p>

            <div>
              <p className="font-bold text-white mb-1">Dodávka</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong className="text-white">Senec:</strong> 15 €</li>
                <li>• <strong className="text-white">Ostatné:</strong> 1 €/km (min. 15 €)</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Pick-up + prívesný vozík (do 3 500 kg)</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong className="text-white">1,2 €/km</strong> (min. 15 €)</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Preprava cudzieho stroja/náradia (nie z našej požičovne)</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong className="text-white">1,50 €/km</strong> (min. 30 €)</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-white/70 mt-3">Cena dopravy závisí od typu a hmotnosti techniky. Pri objednávke vám oznámime presnú cenu. Uvedené ceny sú bez DPH.</p>
        </div>
      )
    },
    {
      question: 'Je možné prenajať stroje s obsluhou?',
      answerText: 'Áno, ponúkame prenájom s obsluhou pre klientov, ktorí nemajú potrebné oprávnenie alebo skúsenosti s obsluhou ťažkej techniky. Služba zahŕňa kvalifikovaného operátora s potrebnými oprávneniami, prípravu a údržbu stroja počas prenájmu a poradenstvo pri práci priamo na mieste. Cena sa kalkuluje individuálne podľa typu stroja a dĺžky prenájmu.',
      answer: (
        <div className="space-y-3">
          <p>Áno, <strong className="text-white">ponúkame prenájom s obsluhou</strong> pre klientov, ktorí nemajú potrebné oprávnenie alebo skúsenosti s obsluhou ťažkej techniky.</p>
          <div className="bg-zinc-800/50 rounded-lg p-4 mt-3">
            <p className="mb-2"><strong className="text-orange-primary">Služba zahŕňa:</strong></p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Kvalifikovaného operátora s potrebnými oprávneniami</li>
              <li>Prípravu a údržbu stroja počas prenájmu</li>
              <li>Poradenstvo pri práci priamo na mieste</li>
            </ul>
          </div>
          <p className="mt-3">Cena sa kalkuluje <strong className="text-white">individuálne</strong> podľa typu stroja a dĺžky prenájmu. <a href="tel:+421948555551" className="text-orange-primary hover:underline font-semibold">Zavolajte nám</a> pre konkrétnu cenovú ponuku.</p>
        </div>
      )
    },
    {
      question: 'Čo v prípade poruchy alebo poškodenia?',
      answerText: 'Ak dôjde k poruche stroja nie vaším zavinením, okamžite nás kontaktujte na 0948 555 551 – zabezpečíme opravu alebo náhradný stroj do 24 hodín. Pri poškodení vaším zavinením hradíte skutočné náklady na opravu (s DPH), pri závažnom poškodení máme právo na úhradu zostatkovej hodnoty stroja. Vybrané stroje majú v cene službu ROYAL GUARD, ktorá kryje náhodné poškodenie pri bežnom používaní so spoluúčasťou 5% z výšky škody. Nevzťahuje sa na úmyselné poškodenie a hrubú nedbanlivosť.',
      answer: (
        <div className="space-y-3">
          <p><strong className="text-orange-primary">V prípade poruchy:</strong></p>
          <p>Ak dôjde k poruche stroja <strong className="text-white">nie vašim zavinením</strong>, okamžite nás kontaktujte na <a href="tel:+421948555551" className="text-orange-primary hover:underline">0948 555 551</a>. Zabezpečíme opravu alebo náhradný stroj do 24 hodín.</p>

          <p className="mt-4"><strong className="text-orange-primary">V prípade poškodenia:</strong></p>
          <p>Pri poškodení stroja vašim zavinením sa uplatňuje:</p>
          <ul className="space-y-1 ml-4 list-disc mt-2">
            <li>Hradíte skutočné náklady na opravu (s DPH)</li>
            <li>Pri závažnom poškodení máme právo na úhradu zostatkové hodnoty stroja</li>
          </ul>

        
          <p><strong className="text-orange-primary">ROYAL GUARD – ochrana v cene prenájmu</strong></p>
          <p>Vybrané stroje majú v cene službu <strong className="text-white">ROYAL GUARD</strong>, ktorá kryje náhodné poškodenie pri bežnom používaní. V prípade škody sa uplatňuje spoluúčasť 5% z výšky škody. Nevzťahuje sa na úmyselné poškodenie a hrubú nedbanlivosť.</p>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mt-4">
            <p className="text-sm"><strong className="text-orange-primary">Odporúčame:</strong> Využite službu ROYAL GUARD, ktorá výrazne znižuje riziko nákladov pri poškodení stroja.</p>
          </div>
        </div>
      )
    },
    {
      question: 'Aké sú platobné možnosti?',
      answerText: 'Právnické osoby: fakturácia so splatnosťou 14 dní, bankový prevod, možnosť pravidelných mesačných faktúr, platba kartou na prevádzke aj v teréne. Fyzické osoby: hotovosť pri prevzatí/vrátení, bankový prevod vopred, platba kartou na prevádzke aj v teréne. Pri prenájme sa vyžaduje vratná kaucia (500 € - 2000 €), ktorá sa vracia v plnej výške pri riadnom vrátení techniky.',
      answer: (
        <div className="space-y-3">
          <p>Ponúkame <strong className="text-white">flexibilné platobné možnosti</strong> podľa typu zákazníka:</p>

          <div className="space-y-4 mt-3">
            <div>
              <p className="font-bold text-white mb-2">🏢 Právnické osoby (PO):</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Fakturácia s lehotou splatnosti 14 dní</li>
                <li>Bankovým prevodom</li>
                <li>Možnosť pravidelných mesačných faktúr pre stálych klientov</li>
                <li>Platba kartou na prevádzke aj v teréne</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2">👤 Fyzické osoby (FO):</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Hotovosť pri prevzatí/vrátení</li>
                <li>Bankovým prevodom vopred</li>
                <li>Platba kartou na prevádzke aj v teréne</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mt-4">
            <p className="text-sm"><strong className="text-orange-primary">Kaucia:</strong> Pri prenájme sa vyžaduje vratná kaucia podľa typu stroja (500 € - 2000 €). Kaucia sa vracia pri riadnom vrátení techniky v plnej výške.</p>
          </div>
        </div>
      )
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative pt-12 md:pt-20 pb-8 md:pb-16">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answerText
              }
            }))
          })}
        </script>
      </Helmet>
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* lg: heading + contact card stacked on the left, the accordion spans
            both rows on the right. DOM order (heading, list, contact) is the
            mobile order, so the contact card lands under the questions there. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_1fr] gap-6 md:gap-8 lg:gap-x-12 xl:gap-x-16 lg:gap-y-8">
          <div
            ref={faqHeadingRef}
            className={`lg:col-span-4 lg:row-start-1 reveal ${faqHeadingInView ? 'in-view' : ''}`}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-[1.05] mb-3 md:mb-4">
              Máte <span className="text-orange-primary">otázky?</span>
            </h2>
            <p className="text-zinc-600 text-sm md:text-lg max-w-md">
              Tu nájdete odpovede na najčastejšie otázky o prenájme stavebnej mechanizácie
            </p>
          </div>

          {/* Accordion: ONE dark panel with hairline rows (same single-island
              language as the "Prečo" panel) instead of seven floating cards. */}
          <div
            ref={faqListRef}
            className={`lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:row-span-2 reveal ${faqListInView ? 'in-view' : ''}`}
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-lg shadow-zinc-900/10 divide-y divide-white/10">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
              {faqs.map((faq, index) => {
                const open = openIndex === index;
                return (
                  <div key={faq.question} className={`transition-colors ${open ? 'bg-white/[0.025]' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-q-${index}`}
                      className="w-full flex items-center gap-3 md:gap-5 px-4 py-4 md:px-7 md:py-6 text-left group"
                    >
                      <span className={`font-display font-black text-xs md:text-sm tabular-nums w-6 md:w-8 shrink-0 transition-colors ${open ? 'text-orange-primary' : 'text-zinc-500 group-hover:text-orange-primary'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`font-bold text-sm md:text-lg flex-1 leading-snug transition-colors ${open ? 'text-orange-primary' : 'text-white group-hover:text-orange-primary'}`}>
                        {faq.question}
                      </h3>
                      <span
                        className={`shrink-0 grid place-items-center w-8 h-8 md:w-9 md:h-9 rounded-full border transition-all duration-300 ${
                          open
                            ? 'bg-orange-primary border-orange-primary text-white rotate-45'
                            : 'border-white/15 text-orange-primary group-hover:border-orange-primary/60'
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>

                    {/* grid-rows 0fr -> 1fr animates to the answer's real height
                        (the old max-h-[1000px] trick eased over a made-up height). */}
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-q-${index}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-[3.25rem] pr-4 pb-5 md:pl-[5.25rem] md:pr-20 md:pb-7 text-white/80 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact card -- now on mobile too (it used to be desktop-only) */}
          <div
            ref={faqSideRef}
            className={`lg:col-span-4 lg:row-start-2 self-start reveal ${faqSideInView ? 'in-view' : ''}`}
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 md:p-7 shadow-lg shadow-zinc-900/10">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
              <p className="text-white font-black text-lg md:text-xl mb-1">Neviete si rady?</p>
              <p className="text-zinc-400 text-sm mb-5">Poradíme s výberom techniky aj termínom.</p>

              <div className="space-y-2.5">
                {contacts.map(({ href, label, value, external, ...c }) => {
                  const Icon = c.Icon;
                  return (
                    <a
                      key={href}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] hover:border-orange-primary/40 hover:bg-white/[0.06] rounded-xl transition-colors group"
                    >
                      <span className="grid place-items-center w-10 h-10 shrink-0 rounded-lg bg-orange-primary/15 border border-orange-primary/25 group-hover:bg-orange-primary/25 transition-colors">
                        <Icon size={18} className="text-orange-primary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-zinc-400 text-xs">{label}</span>
                        <span className="block text-white font-bold truncate">{value}</span>
                      </span>
                      <ArrowRight size={16} className="text-zinc-600 group-hover:text-orange-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
