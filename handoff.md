# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-45 + old reference blocks archived 2026-07-29). -->

## Current State

- **Phase:** Live in production (royalstroje.sk + app.royalstroje.sk); SEO batch shipped in s46, dashboard week calendar shipped in s47
- **Session count:** 47
- **Repo status:** work on `dev`, `main` = production; `dev` == `main` == `6952a24` after the session 47 release

## What Was Done (Session 46) -- Release na produkciu + fotky strojov v CTA pásoch + promo akcia WT30
Date: 2026-07-29

1. **SEO-3 hotové: `dev` -> `main` -> produkcia (3x počas session).** Prvý release doniesol sessions 43-45 (prerender, sitemap, robots fix, blink fix, JCB článok) -- owner totiž nasadil ešte pred článkom, preto ho na webe nevidel. Overené na live: sitemap 164 URL vrátane nového článku.
2. **POZOR -- `royalstroje.sk` 307-redirectuje na `www.royalstroje.sk`**, teda opačne než hovorí úloha SEO-2. Sitemap aj canonical používajú apex. Treba rozhodnúť smer a zosúladiť (viď úloha 2).
3. **Release niesol aj cudziu prácu:** `871d67f` (Kalendár RCC, session 47) pribudol na `dev` počas tejto session a `--ff-only` merge ho poslal do produkcie spolu s webom. Migráciu `021` medzitým owner spustil (s47). Poučenie: pri `dev`->`main` sa vždy pozrieť, čo v `dev` pribudlo od poslednej vlastnej práce -- na `dev` môže paralelne pracovať iná session.
4. **Vlastný nástroj na výrez pozadia:** `scripts/cutout-transparent.py` (Pillow+numpy, flood-fill od okrajov + dekontaminácia okrajových pixelov). Parametre rozhodujú: sýty stroj s mäkkým tieňom = defaulty; nesýty stroj na plochej bielej = `250 8 255 14 400` (posledný parameter otvára uzavreté plochy, napr. medzery v ráme). QA vždy cez kompozit na tmavom pozadí.
5. **CTA pásy dostali fotku plošiny Haulotte Compact 10** namiesto watermark ikony: `SourcingBanner` natvrdo, `CtaBand` cez nový voliteľný prop `image`/`imageAlt` -- zapnutý IBA na `ZabezpecenieTechniky` (CtaBand zdieľa 12 stránok, preto opt-in).
6. **Promo carousel: nová akcia "Honda WT30 + hadica zadarmo"** ako prvý slide, CTA na `/honda-wt30` (slug overený proti live sitemape + vyrenderovanej stránke). Text hovorí "kalové čerpadlo" podľa popisu v katalógu, nie "hasičské" -- owner môže prepísať.
7. **Bezpečnostný hook opravený:** vzor `git push.*-f.*main` falošne blokoval release chain (nachádzal "-f" v `--ff-only` a preskakoval cez `&&`). Nový vzor je ohraničený na jeden príkaz a navyše chytá dve varianty force-pushu, ktoré starý prepúšťal. Pozor: hook skenuje CELÝ bash príkaz, takže aj commit message s takým textom ho spustí.
8. Opravený preklep v excerpte JCB článku (`blogMeta.js`) po ručnej úprave owner-a.

## What Was Done (Session 47) -- RCC dashboard: dispatcher week calendar
Date: 2026-07-29

1. **Calendar rebuilt from month grid to a week board** (Mon-Fri, hours 7-17, `Po-Ne` toggle). Month view dropped entirely -- owner's call, so there is no fallback overview of a whole month any more.
2. **Rentals stayed on the board but NOT in the hour grid** -- reservations are date ranges, not hour slots, so they live in an all-day lane above the grid (bars across days, `«`/`»` when they overrun the week, pickup/return counters in the day header). Putting them in hour cells was rejected as it would drown the notes.
3. **New table `calendar_tasks`** (migration `021`, RLS `is_staff()` only): one task = one date + one hour, colour `neutral|green|yellow|red`, `done` flag, optional `reservation_id` (column exists, UI does not use it yet).
4. **Decisions with owner:** single-hour tasks (no duration), NO drag & drop, month view removed, dashboard "today" widget yes; highlighting overdue unfinished tasks was explicitly declined.
5. **Owner ran migration 021** in Supabase during the session -- calendar tasks work in prod.
6. **Fonts had to be enlarged right after the first prod deploy** -- 11px chips were unreadable on the owner's screen. Now 13px chips/bars, 64px cells, 150px min column. Keep 13px as the floor for this board.
7. **QA trick for the dashboard app (auth-gated):** temporary public `/calendar-preview` route + puppeteer request interception mocking `/rest/v1/*`. Preflight must be answered too (`OPTIONS` -> 204 with `access-control-allow-headers: *`), otherwise supabase-js fails on CORS. Route reverted after the check.
8. **Dashboard eslint treats `react-hooks/set-state-in-effect` as an ERROR** -- "sync props into state" effects do not pass. Used render-phase state adjust (`if (data !== prevData) setX(...)`) in `useCalendarTasks` and `key`-remount for the task modal instead.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | **OWNER SQL** | Set `blog_article_slug` for JCB article | Supabase SQL Editor: `UPDATE equipment SET blog_article_slug = 'jcb-19c-1-mini-rypadlo-recenzia-skusenosti' WHERE slug = 'jcb-19c-i';` (optionally also fix name typo 19C-I -> 19C-1). Enables "Prečítať článok" link on product card + detail. |
| 2 | **OWNER + High** | SEO-2: zosúladiť www vs apex | Zistené v s46: apex `royalstroje.sk` **307-redirectuje na www**, ale sitemap aj canonical ukazujú na apex -> Google vidí canonical, ktorý sa presmeruje. Buď prehodiť redirect na www -> apex (308, pôvodný plán, nič v kóde sa nemení), alebo nechať www ako hlavnú a prepísať `SITE_URL` v `scripts/lib/collect-urls.mjs` + canonical/og v stránkach. Vercel -> project `royal-stroje` -> Settings -> Domains. |
| 3 | **OWNER** | SEO-4: Google Search Console | Až po vyriešení úlohy 2 (inak sa submitne sitemap s presmerovanými URL). Submit sitemap; URL Inspection na `/`, `/sluzby`, 1-2 produkty -> Request indexing; Pages report sledovať 2-4 týždne. |
| 4 | Low | SEO-5: FAQPage JSON-LD + `sameAs` | `src/components/home/FAQ.jsx` needs plain-string `answerText`; `sameAs` (GBP/Maps + Facebook URLs from owner) into LocalBusiness schema in `Home.jsx`. |
| 5 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy. If it bothers: Vercel Deploy Hook pinged from dashboard on product change. |
| 6 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Kept for revert; production ships HeroSplit since s37. |
| 7 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs. |
| 8 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit. |
| 9 | Low | Final real-Android scroll-check | FAQ + product grid + subpages on owner's Xiaomi, logged out of Vercel (toolbar = false positive, see s34). |
| 10 | Backlog | GA4 + full consent flow; Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes). |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (plain ESM; `hidden: true` = unlisted + noindex + out of sitemap); consumed by Blog, BlogDetail, build scripts |
| `scripts/prerender.mjs` | Post-build Puppeteer prerender ~177 URLs into `dist/<path>/index.html`; stamps `data-prerendered`; Vercel uses `@sparticuz/chromium` |
| `scripts/generate-sitemap.mjs` + `scripts/lib/collect-urls.mjs` | Build-time sitemap (164 URLs); collect-urls = shared URL inventory (static + visible blog + Supabase products) + `SITE_URL` |
| `scripts/cutout-transparent.py` | s46 dev tool: studio photo -> transparent WebP for the dark bands (Pillow+numpy, not part of the build); presets + QA advice in its docstring |
| `src/components/common/CtaBand.jsx` | Shared dark CTA band on 12 subpages -- `image` prop is opt-in per page, do not turn it on globally |
| `src/components/home/PromoCarousel.jsx` | Homepage promo slides (hardcoded array; owner edits copy/img/CTA here) |
| `apps/dashboard/src/pages/calendar/CalendarView.jsx` | s47 week board: rentals lane + hour grid 7-17, quick-add in cells; `src/lib/calendar.js` holds week math, task colours and the rental-bar packing |
| `apps/dashboard/src/hooks/useCalendarTasks.js` | CRUD + optimistic local copy for `calendar_tasks`; re-seeds on fetch via render-phase adjust (no sync effect -- eslint blocks it) |
| `apps/dashboard/src/lib/companyInfo.js` | Company info on PDFs -- IBAN placeholder (task 8) |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 38 | 2026-07-14 | Katalóg: nová kategória „Voľný čas a šport" + 2 elektrobicykle -> PROD | Category tree static in `categories.js` + products in Supabase; new category needs code+DB; RLS blocks anon writes (owner runs SQL) |
| 39 | 2026-07-14 | Hero vstupné animácie + fix prázdneho katalógu na back-nav -> PROD | HeroSplit entrance animations (images + USP), `useProducts` initial state = module `cachedProducts` |
| 40 | 2026-07-16 | Zmluva PDF: fix rozloženia pri 4+ položkách -> PROD | Dynamic fit-check pushes signature block to page 2; page numbering; „Späť" button in deal summary |
| 41 | 2026-07-16 | Dashboard: číslo zmluvy namiesto DB označenia -> PROD | `dealContractNumber()` helper, contracts join in useClient/useReservations |
| 42 | 2026-07-16 | Katalóg: nový dekoračný bager (bager_web) -> PROD | Owner RGBA PNG -> WebP 1024x683 q80 preserving alpha |
| 43 | 2026-07-16 | SEO: prerender + build-time sitemap + noindex/meta fixy (na `dev`) | Root cause weak indexing: robots.txt blocked `/assets/`; prerender ~177 URLs; helmet v3 multi-child title bug; blogMeta.js created |
| 44 | 2026-07-16 | Fix prerender boot blink + SEO-1 staging verification | `data-prerendered` suppression chain; SEO-1 verified on Vercel staging; commit `92c571d` |
| 45 | 2026-07-29 | Nový blog článok JCB 19C-1 (úprimná recenzia po 170 mth) | Replaces old hidden id-19 article; article<->catalog prelink (owner SQL pending); .claude tooling overhaul (auto-wrap hook, handoff skill, CLAUDE.md) |
| 46 | 2026-07-29 | Release sessions 43-46 na PROD + fotky strojov v CTA pásoch + promo WT30 | 3x `dev`->`main`; cutout tool `scripts/cutout-transparent.py`; Haulotte foto v SourcingBanner + CtaBand (opt-in prop); promo slide Honda WT30; hook force-push vzor zúžený; zistený apex->www redirect vs apex canonical |
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde; fonty zvacsene po feedbacku |

<!-- Sessions 1-35 summary rows + sessions 15-43 full notes + old Architecture/Supabase reference: handoff-archive.md -->
