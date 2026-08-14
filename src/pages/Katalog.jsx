import { Phone, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContentSection from '../components/common/ContentSection';
import PageHero from '../components/common/PageHero';
import CtaBand from '../components/common/CtaBand';
import { categories } from '../data/categories';
import useProducts from '../hooks/useProducts';

/**
 * HTML sitemap of the whole rental catalog (SEO-7). Every product detail page
 * gets a plain crawlable <a href> from here, and this page is linked site-wide
 * from the Footer — so product pages are no longer orphans that Google leaves
 * as "Discovered - currently not indexed". Intentionally NO reveal animations
 * on the list body: the prerendered HTML must carry every link fully visible.
 */
export default function Katalog() {
  const { products } = useProducts();

  // Accessories (Malé náradie → Príslušenstvo) render only as table rows in the
  // homepage catalog — their auto-generated detail URLs are thin, noindexed
  // pages kept out of the sitemap + prerender. Don't link them from here either.
  const listable = products.filter((p) => p.subcategory !== 'prislusenstvo');

  const sections = categories
    .map((cat) => {
      const catProducts = listable.filter((p) => p.category === cat.id);
      const subs = cat.subcategories.filter((s) => s.id !== 'all' && s.id !== 'prislusenstvo');
      const groups = subs
        .map((sub) => ({ sub, items: catProducts.filter((p) => p.subcategory === sub.id) }))
        .filter((g) => g.items.length > 0);
      // Safety net: products whose subcategory isn't in the static tree
      const knownIds = new Set(subs.map((s) => s.id));
      const rest = catProducts.filter((p) => !knownIds.has(p.subcategory));
      if (rest.length > 0) groups.push({ sub: { id: 'ostatne', name: 'Ostatné' }, items: rest });
      return { cat, groups, count: catProducts.length };
    })
    .filter((s) => s.count > 0);

  const catalogHref = (catId) =>
    catId === 'male-naradie' ? '/#katalog' : `/?category=${catId}#katalog`;

  const priceLabel = (p) =>
    p.pricePerDay > 0 ? `${p.pricePerDay.toFixed(2)}€/deň bez DPH` : 'Cena na požiadanie';

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Katalóg strojov a náradia na prenájom - kompletný zoznam | Royal Stroje</title>
        <meta
          name="description"
          content="Kompletný zoznam techniky na prenájom v Royal Stroje: vyše 140 strojov od vŕtacích kladív a plošín po mini-rýpadlá a kontajnery. Požičovňa Senec - Boldog, dovoz na stavbu do 24 hodín."
        />
        <link rel="canonical" href="https://royalstroje.sk/katalog" />
        <meta property="og:title" content="Katalóg strojov a náradia na prenájom | Royal Stroje" />
        <meta property="og:description" content="Kompletný zoznam techniky na prenájom: vyše 140 strojov v 8 kategóriách. Dovoz na stavbu do 24 hodín." />
        <meta property="og:url" content="https://royalstroje.sk/katalog" />
      </Helmet>

      <PageHero
        eyebrow="Katalóg · Senec — Boldog"
        title={
          <>
            Kompletný zoznam <span className="text-orange-primary">strojov na prenájom.</span>
          </>
        }
        subtitle="Všetka technika Royal Stroje na jednej stránke — od ručného náradia po ťažké stroje. Kliknite na stroj pre parametre, cenu a objednanie."
        image="/pictures/graphics/stroje-dvor.webp"
        imageAlt="Stroje na dvore požičovne Royal Stroje"
        actions={
          <>
            <a href="tel:+421948555551" className="btn-primary">
              <Phone size={16} />
              Zavolať teraz
            </a>
            <Link to="/#katalog" className="btn-outline-light px-5 py-3">
              Otvoriť katalóg s filtrami
            </Link>
          </>
        }
      />

      <ContentSection light>
        {/* Mobile Logo - Top Left */}
        <div className="md:hidden absolute top-3 left-3 z-30">
          <img src="/logoroyal.webp" alt="Royal Stroje" className="h-8 w-auto" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pb-8 md:pb-16">
          {/* Mobile heading (PageHero is desktop-only) */}
          <div className="md:hidden text-center pt-14 pb-6">
            <h1 className="text-2xl font-black text-zinc-900 leading-tight mb-2">
              Kompletný zoznam <span className="text-orange-primary">strojov na prenájom</span>
            </h1>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Všetka technika Royal Stroje na jednej stránke. Kliknite na stroj pre parametre a cenu.
            </p>
          </div>

          {/* Quick category index */}
          <nav aria-label="Kategórie katalógu" className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 md:pt-10">
            {sections.map(({ cat, count }) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 text-white/80 hover:text-white hover:border-orange-primary/40 text-xs md:text-sm font-bold px-3 py-2 transition-colors"
              >
                {cat.name}
                <span className="text-orange-primary">{count}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-8 md:space-y-12">
            {sections.map(({ cat, groups, count }) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="bg-zinc-900 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden">
                  {/* Category header */}
                  <div className="px-4 md:px-8 py-4 md:py-6 bg-gradient-to-r from-orange-primary/15 to-transparent border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-white font-black text-lg md:text-2xl leading-tight">
                        {cat.name}{' '}
                        <span className="text-orange-primary text-sm md:text-base font-bold align-middle">
                          ({count})
                        </span>
                      </h2>
                      <p className="text-zinc-400 text-xs md:text-sm mt-1">{cat.description}</p>
                    </div>
                    <Link
                      to={catalogHref(cat.id)}
                      className="inline-flex items-center gap-1 text-orange-primary hover:text-orange-hover font-bold text-xs md:text-sm whitespace-nowrap transition-colors"
                    >
                      Otvoriť v katalógu
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  {/* Subcategory groups */}
                  <div className="px-4 md:px-8 py-4 md:py-6 grid gap-5 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {groups.map(({ sub, items }) => (
                      <div key={sub.id}>
                        <h3 className="flex items-center gap-2 text-white font-bold text-sm md:text-base uppercase tracking-wide mb-2.5">
                          <span className="inline-block w-4 h-0.5 bg-orange-primary" />
                          {sub.name}
                        </h3>
                        <ul className="space-y-1">
                          {items.map((p) => (
                            <li key={p.id}>
                              <Link
                                to={`/${p.id}`}
                                className="group flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 -mx-2 hover:bg-white/5 transition-colors"
                              >
                                <span className="min-w-0">
                                  <span className="block text-white/90 group-hover:text-orange-primary text-sm font-semibold leading-snug transition-colors">
                                    {p.name}
                                  </span>
                                  <span className="block text-zinc-500 text-xs leading-snug">
                                    {p.description}
                                  </span>
                                </span>
                                <span className="text-orange-primary/90 text-xs font-bold whitespace-nowrap">
                                  {priceLabel(p)}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <CtaBand
          eyebrow="Nenašli ste svoj stroj?"
          title={
            <>
              Zoženieme <span className="text-orange-primary">akýkoľvek stroj.</span>
            </>
          }
          text="Cez sieť overených partnerov zabezpečíme aj techniku, ktorú nemáme vo vlastnom parku — vrátane dovozu na stavbu do 24 hodín."
          actions={
            <a href="tel:+421948555551" className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-4">
              <Phone size={16} className="md:w-5 md:h-5" />
              <span>Zavolať: 0948 555 551</span>
            </a>
          }
        />
      </ContentSection>
    </div>
  );
}
