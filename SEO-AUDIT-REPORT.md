# SEO Audit Report: Royal Stroje
**Dátum:** 9. marca 2026
**URL:** https://royalstroje.sk
**Typ biznisu:** Požičovňa stavebného náradia a techniky (Local Service Business)

---

## Executive Summary

### SEO Health Score: 42/100

| Kategória | Skóre | Váha |
|-----------|-------|------|
| Technical SEO | 35/100 | 25% |
| Content Quality | 50/100 | 25% |
| On-Page SEO | 30/100 | 20% |
| Schema / Structured Data | 40/100 | 10% |
| Performance (CWV) | 55/100 | 10% |
| Images | 60/100 | 5% |
| AI Search Readiness | 35/100 | 5% |

### Top 5 Kritických Problémov

1. **Chýba robots.txt** - Vyhľadávače nemajú pokyny pre crawlovanie
2. **Chýba sitemap.xml** - Google nepozná štruktúru stránky
3. **Homepage bez meta tagov** - Najdôležitejšia stránka nemá SEO optimalizáciu
4. **SPA bez SSR** - React aplikácia bez server-side renderingu = slabá indexovateľnosť
5. **Väčšina stránok bez Helmet** - Chýbajú title, description, OG tagy

### Top 5 Quick Wins

1. Pridať robots.txt do public/ adresára
2. Vygenerovať sitemap.xml
3. Implementovať Helmet na všetky stránky
4. Pridať LocalBusiness schema na homepage
5. Pridať canonical URLs

---

## Technical SEO Audit

### Crawlability

| Problém | Závažnosť | Status |
|---------|-----------|--------|
| robots.txt | Critical | CHÝBA |
| sitemap.xml | Critical | CHÝBA |
| Meta robots tagy | High | Čiastočne implementované |
| Canonical URLs | High | CHÝBAJÚ |
| Crawl barriers | Medium | SPA bez SSR |

#### Odporúčania

**robots.txt** (pridať do `public/robots.txt`):
```
User-agent: *
Allow: /

Sitemap: https://royalstroje.sk/sitemap.xml

# Disallow admin/internal paths
Disallow: /kosik
Disallow: /*.json$
```

### Indexability

| Problém | Závažnosť | Popis |
|---------|-----------|-------|
| SPA Rendering | Critical | React bez SSR - vyhľadávače vidia len prázdny `<div id="root">` |
| Dynamic Content | High | Produkty a blog články sa načítavajú cez JavaScript |
| Meta Description | Critical | Chýba na väčšine stránok |

#### Odporúčania

1. **Implementovať SSR/SSG** - Migrácia na Next.js alebo použitie Vite SSR pluginu
2. **Prerendering** - Použiť službu ako prerender.io pre SPA
3. **Meta tagy na každú stránku** - Implementovať react-helmet-async konzistentne

### Security Headers

| Header | Status | Odporúčanie |
|--------|--------|-------------|
| HTTPS | OK | Áno |
| HSTS | Unknown | Overiť na serveri |
| X-Frame-Options | Unknown | Pridať `SAMEORIGIN` |
| X-Content-Type-Options | Unknown | Pridať `nosniff` |
| CSP | Unknown | Implementovať Content Security Policy |

### Mobile Optimization

| Aspekt | Status | Poznámka |
|--------|--------|----------|
| Responsive Design | OK | Tailwind CSS responsive classes |
| Mobile Nav | OK | MobileNav komponent |
| Touch Targets | OK | Dostatočná veľkosť tlačidiel |
| Viewport Meta | OK | V index.html |

---

## On-Page SEO Analysis

### Stránky s implementovaným SEO

| Stránka | Title | Description | Keywords | OG Tags | Schema |
|---------|-------|-------------|----------|---------|--------|
| ProductDetail.jsx | ✅ | ✅ | ✅ | ✅ | ✅ Product |
| Home.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |
| Sluzby.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |
| Kontakt.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |
| Blog.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |
| BlogDetail.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |
| GDPR.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |
| Kosik.jsx | ❌ | ❌ | ❌ | ❌ | ❌ |

### Heading Structure

**Home.jsx:**
- ❌ Chýba H1 tag (iba v Hero komponente)
- Heading hierarchy potrebuje revíziu

**Sluzby.jsx:**
- ✅ H1: "Všetko pre vašu stavbu. Pod jednou strechou."
- ⚠️ Duplicitné H1 v mobile verzii

### Internal Linking

| Aspekt | Status | Poznámka |
|--------|--------|----------|
| Navigation | OK | Konzistentná navigácia |
| Footer Links | OK | Odkazy na dôležité stránky |
| Product Links | OK | Správne odkazovanie na produkty |
| Breadcrumbs | ⚠️ | Iba na ProductDetail stránke |

---

## Schema / Structured Data

### Aktuálna Implementácia

**ProductDetail.jsx** - ✅ Implementované:
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "...",
  "brand": {...},
  "offers": {
    "@type": "Offer",
    "price": "...",
    "seller": {
      "@type": "Organization",
      "name": "Royal Stroje"
    }
  }
}
```

### Chýbajúce Schema Types

| Typ | Stránka | Priorita |
|-----|---------|----------|
| LocalBusiness | Homepage, Kontakt | Critical |
| Organization | Všade (globálne) | High |
| BreadcrumbList | Všetky stránky | High |
| Service | Sluzby.jsx | High |
| FAQPage | FAQ sekcia | Medium |
| Article/BlogPosting | BlogDetail.jsx | Medium |
| WebSite + SearchAction | Homepage | Medium |

### Odporúčané Schema - LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://royalstroje.sk/#organization",
  "name": "Royal Stroje",
  "alternateName": "Royal stroje, s.r.o.",
  "description": "Profesionálna požičovňa stavebného náradia a techniky v Senci",
  "url": "https://royalstroje.sk",
  "logo": "https://royalstroje.sk/logoroyal.webp",
  "image": "https://royalstroje.sk/hero-main1.webp",
  "telephone": "+421948555551",
  "email": "info@royalstroje.sk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Recká cesta 182",
    "addressLocality": "Senec",
    "postalCode": "925 26",
    "addressCountry": "SK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.2187",
    "longitude": "17.3994"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "16:00"
  },
  "priceRange": "€€",
  "areaServed": ["Senec", "Bratislava", "Galanta", "Trnava", "Pezinok"],
  "sameAs": [
    "https://t.me/Royalstroje",
    "https://wa.me/421948555551"
  ]
}
```

---

## Content Quality (E-E-A-T)

### Experience (Skúsenosť)

| Signál | Status | Poznámka |
|--------|--------|----------|
| Testimonials | ❌ | Chýbajú recenzie zákazníkov |
| Case Studies | ❌ | Žiadne príklady projektov |
| 20 rokov skúseností | ✅ | Zmienené na stránke |
| Profesionálne fotky | ⚠️ | Produktové fotky OK, chýbajú firemné |

### Expertise (Odbornosť)

| Signál | Status | Poznámka |
|--------|--------|----------|
| Blog s odbornými článkami | ✅ | Existuje blog sekcia |
| Technické parametre produktov | ✅ | Detailné špecifikácie |
| Odborné poradenstvo | ✅ | Zmienené v texte |
| Autori článkov | ⚠️ | Bez bio a credentials |

### Authoritativeness (Autorita)

| Signál | Status | Poznámka |
|--------|--------|----------|
| Makita autorizovaný predajca | ✅ | Explicitne uvedené |
| Partnerstvá | ⚠️ | Stránka Partneri existuje, ale prázdna |
| Certifikácie | ❌ | Žiadne zmienky |
| Externé odkazy | ❌ | Žiadne backlinky |

### Trustworthiness (Dôveryhodnosť)

| Signál | Status | Poznámka |
|--------|--------|----------|
| Kontaktné údaje | ✅ | Telefón, email, adresa |
| GDPR | ✅ | Samostatná stránka |
| Obchodné podmienky | ✅ | Samostatná stránka |
| IČO/DIČ | ✅ | Uvedené na kontakte |
| SSL/HTTPS | ✅ | Zabezpečené |
| Sociálne siete | ⚠️ | Iba Telegram |

---

## Images Audit

### Formáty

| Formát | Počet | Status |
|--------|-------|--------|
| WebP | ~150+ | ✅ Optimálny formát |
| PNG | ~5 | OK pre logá |
| JPG | ~5 | ⚠️ Konvertovať na WebP |

### Alt Text

| Problém | Závažnosť | Poznámka |
|---------|-----------|----------|
| Produktové obrázky | ⚠️ | Dynamicky generované z názvu |
| Hero obrázky | ✅ | Majú alt text |
| Logo | ✅ | "Royal Stroje" |

### Optimalizácia

- ✅ Používanie WebP formátu
- ⚠️ Veľkosti súborov - potrebné overiť
- ❌ Lazy loading - nie je implementované pre všetky obrázky
- ❌ srcset/responsive images - chýba

---

## Performance Estimates (Core Web Vitals)

> **Poznámka:** Skutočné hodnoty vyžadujú meranie cez PageSpeed Insights

### Predpokladané hodnoty (SPA bez SSR)

| Metrika | Odhad | Cieľ | Status |
|---------|-------|------|--------|
| LCP (Largest Contentful Paint) | ~3.5-4.5s | < 2.5s | ⚠️ Needs Improvement |
| INP (Interaction to Next Paint) | ~150-250ms | < 200ms | ⚠️ Needs Improvement |
| CLS (Cumulative Layout Shift) | ~0.05-0.15 | < 0.1 | ⚠️ May Need Improvement |

### Faktory ovplyvňujúce výkon

| Faktor | Vplyv | Poznámka |
|--------|-------|----------|
| SPA JavaScript bundle | High | Veľký bundle = pomalé LCP |
| Client-side rendering | High | Oneskorené vykreslenie obsahu |
| Font loading | Medium | Google Fonts vs self-hosted |
| Image loading | Medium | Chýba prioritizácia hero obrázkov |
| Third-party scripts | Low | Minimálne externe skripty |

---

## AI Search Readiness (GEO)

### Citability Score: 35/100

| Faktor | Status | Poznámka |
|--------|--------|----------|
| Jasná štruktúra obsahu | ⚠️ | Potrebuje headingy a sekcie |
| Faktické informácie | ✅ | Ceny, parametre, kontakty |
| Jedinečný obsah | ⚠️ | Blog potrebuje viac hĺbky |
| Štrukturované dáta | ⚠️ | Iba na produktoch |
| AI crawler prístup | ❌ | SPA problém |
| llms.txt | ❌ | Chýba |

### Odporúčania pre AI vyhľadávanie

1. **Pridať llms.txt** - Sprístupniť obsah AI crawlerom
2. **Implementovať SSR** - Kritické pre indexovanie
3. **Zlepšiť štruktúru obsahu** - Používať jasné headingy
4. **Pridať FAQ sekciu** - AI často cituje FAQ odpovede
5. **Rozšíriť blog** - Hlbšie, expertné články

---

## Sitemap Recommendations

### Navrhovaný sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://royalstroje.sk/</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/sluzby</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/sluzby/predaj-techniky</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/sluzby/nahradne-diely</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/sluzby/cenova-ponuka</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/sluzby/royal-fleet</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/blog</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/kontakt</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/partneri</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/gdpr</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://royalstroje.sk/obchodne-podmienky</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <!-- Produktové stránky - dynamicky generovať -->
</urlset>
```

---

## Action Plan

### Critical (Opraviť ihneď)

| # | Úloha | Náročnosť | Dopad |
|---|-------|-----------|-------|
| 1 | Vytvoriť robots.txt | Nízka | Vysoký |
| 2 | Vytvoriť sitemap.xml | Nízka | Vysoký |
| 3 | Pridať Helmet na Homepage | Nízka | Vysoký |
| 4 | Pridať Helmet na Kontakt stránku | Nízka | Vysoký |
| 5 | Implementovať prerendering alebo SSR | Vysoká | Kritický |

### High (Opraviť do 1 týždňa)

| # | Úloha | Náročnosť | Dopad |
|---|-------|-----------|-------|
| 6 | Pridať Helmet na všetky stránky | Stredná | Vysoký |
| 7 | Implementovať LocalBusiness schema | Nízka | Vysoký |
| 8 | Pridať canonical URLs | Nízka | Stredný |
| 9 | Implementovať BreadcrumbList schema | Nízka | Stredný |
| 10 | Pridať meta tagy na blog články | Stredná | Vysoký |

### Medium (Opraviť do 1 mesiaca)

| # | Úloha | Náročnosť | Dopad |
|---|-------|-----------|-------|
| 11 | Implementovať FAQPage schema | Nízka | Stredný |
| 12 | Pridať Article schema na blog | Stredná | Stredný |
| 13 | Optimalizovať obrázky (lazy loading, srcset) | Stredná | Stredný |
| 14 | Pridať zákaznícke recenzie | Stredná | Vysoký |
| 15 | Rozšíriť partnerstvá sekciu | Nízka | Stredný |

### Low (Backlog)

| # | Úloha | Náročnosť | Dopad |
|---|-------|-----------|-------|
| 16 | Pridať llms.txt pre AI crawlery | Nízka | Nízky |
| 17 | Implementovať hreflang (ak bude viacjazyčný) | Stredná | Nízky |
| 18 | Pridať sociálne siete profily | Nízka | Nízky |
| 19 | Security headers optimalizácia | Stredná | Nízky |
| 20 | Performance monitoring setup | Stredná | Stredný |

---

## Záver

Web **royalstroje.sk** má solídny základ s dobrým dizajnom a obsahom, ale **kriticky zaostáva v technickej SEO implementácii**. Najväčšie problémy sú:

1. **Chýbajúce základy** - robots.txt, sitemap.xml
2. **Nekompletná on-page optimalizácia** - meta tagy iba na produktových stránkach
3. **SPA bez SSR** - vážny problém pre indexovateľnosť

Odporúčam začať s kritickými opravami (1-5) ihneď, pretože bez nich Google nemôže efektívne indexovať stránku. Následne implementovať schema markup a kompletné meta tagy.

**Odhadované zlepšenie po implementácii:**
- SEO Health Score: 42/100 → 75-85/100
- Viditeľnosť v lokálnom vyhľadávaní: Výrazné zlepšenie
- Indexované stránky: Nárast z ~10 na ~50+

---

*Tento report bol vygenerovaný pomocou Claude SEO Audit Tool*
*Dátum: 9. marca 2026*
