# SEO Action Plan: Royal Stroje
**Prioritizované odporúčania pre zlepšenie SEO**

---

## Critical Priority (Opraviť ihneď)

### 1. Vytvoriť robots.txt

**Súbor:** `public/robots.txt`

```
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://royalstroje.sk/sitemap.xml

# Disallow cart and internal pages
Disallow: /kosik

# Block crawling of asset files
Disallow: /*.json$
Disallow: /assets/
```

### 2. Vytvoriť sitemap.xml

**Súbor:** `public/sitemap.xml`

Základný sitemap je v [SEO-AUDIT-REPORT.md](./SEO-AUDIT-REPORT.md). Pre dynamické produkty použite skript na generovanie.

### 3. Pridať Helmet na Homepage

**Súbor:** `src/pages/Home.jsx`

```jsx
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Royal Stroje - Požičovňa náradia a stavebnej techniky Senec</title>
        <meta
          name="description"
          content="Profesionálna požičovňa stavebného náradia a techniky v Senci. Prenájom vŕtačiek, rýpadiel, plošín. Dovoz do 24h. 20 rokov skúseností. ☎ 0948 555 551"
        />
        <meta
          name="keywords"
          content="požičovňa náradia, prenájom techniky, stavebné náradie, Senec, Bratislava, rýpadlo, vŕtačka, plošina"
        />
        <link rel="canonical" href="https://royalstroje.sk/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Royal Stroje - Požičovňa náradia Senec" />
        <meta property="og:description" content="Profesionálna požičovňa stavebného náradia a techniky. Dovoz do 24h." />
        <meta property="og:image" content="https://royalstroje.sk/hero-main1.webp" />
        <meta property="og:url" content="https://royalstroje.sk/" />
        <meta property="og:locale" content="sk_SK" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Royal Stroje",
            "description": "Profesionálna požičovňa stavebného náradia a techniky v Senci",
            "url": "https://royalstroje.sk",
            "telephone": "+421948555551",
            "email": "info@royalstroje.sk",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Recká cesta 182",
              "addressLocality": "Senec",
              "postalCode": "925 26",
              "addressCountry": "SK"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "16:00"
            },
            "priceRange": "€€"
          })}
        </script>
      </Helmet>

      {/* ... rest of component */}
    </>
  );
}
```

### 4. Pridať Helmet na Kontakt stránku

**Súbor:** `src/pages/Kontakt.jsx`

```jsx
import { Helmet } from 'react-helmet-async';

// Na začiatok komponentu:
<Helmet>
  <title>Kontakt - Royal Stroje | Požičovňa náradia Senec</title>
  <meta
    name="description"
    content="Kontaktujte Royal Stroje - požičovňa náradia Senec. ☎ 0948 555 551 | info@royalstroje.sk | Recká cesta 182, Senec. Nonstop telefonická dostupnosť."
  />
  <link rel="canonical" href="https://royalstroje.sk/kontakt" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Kontakt - Royal Stroje Senec" />
  <meta property="og:description" content="Zavolajte nám: 0948 555 551. Stroje na stavbe do 24 hodín." />
</Helmet>
```

### 5. Riešenie SPA Indexability

**Možnosti (od najjednoduchšej):**

**A) Prerender.io (najrýchlejšie riešenie)**
- Služba pre prerendering SPA
- Inštalácia cez middleware na serveri

**B) Vite Plugin SSR**
```bash
npm install vite-plugin-ssr
```

**C) Migrácia na Next.js (najlepšie dlhodobo)**
- Plná SSR/SSG podpora
- Lepšia SEO out-of-the-box

---

## High Priority (Do 1 týždňa)

### 6. Helmet pre ostatné stránky

Pridať Helmet na:
- `Sluzby.jsx`
- `Blog.jsx`
- `BlogDetail.jsx`
- `PredajTechniky.jsx`
- `NahradneDiely.jsx`
- `CenovaPonuka.jsx`
- `RoyalFleet.jsx`
- `Partneri.jsx`
- `GDPR.jsx`
- `ObchodnePodmienky.jsx`

**Template:**
```jsx
<Helmet>
  <title>{pageTitle} | Royal Stroje</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={`https://royalstroje.sk${pagePath}`} />
</Helmet>
```

### 7. BreadcrumbList Schema

**Súbor:** Vytvoriť `src/components/common/Breadcrumbs.jsx`

```jsx
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbItems = [
    { name: 'Domov', url: 'https://royalstroje.sk/' }
  ];

  // ... build breadcrumb items

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          })}
        </script>
      </Helmet>
      {/* Visual breadcrumbs */}
    </>
  );
}
```

### 8. Blog Article Schema

**Súbor:** `src/pages/BlogDetail.jsx`

```jsx
<Helmet>
  <title>{article.title} | Blog | Royal Stroje</title>
  <meta name="description" content={article.excerpt} />
  <link rel="canonical" href={`https://royalstroje.sk/blog/${slug}`} />

  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={article.dateISO} />
  <meta property="article:author" content={article.author} />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "datePublished": article.dateISO,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Royal Stroje",
        "logo": {
          "@type": "ImageObject",
          "url": "https://royalstroje.sk/logoroyal.webp"
        }
      }
    })}
  </script>
</Helmet>
```

---

## Medium Priority (Do 1 mesiaca)

### 9. FAQ Schema

Ak máte FAQ sekciu (napr. v `src/components/home/FAQ.jsx`):

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  })}
</script>
```

### 10. Image Optimization

**Lazy Loading:**
```jsx
<img
  src={product.image}
  alt={product.name}
  loading="lazy"
  decoding="async"
/>
```

**Priority pre hero obrázky:**
```jsx
<img
  src="/hero-main1.webp"
  alt="Royal Stroje"
  fetchpriority="high"
/>
```

### 11. Service Schema pre Služby stránku

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Prenájom stavebnej techniky",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Royal Stroje"
  },
  "areaServed": {
    "@type": "City",
    "name": "Senec"
  }
}
```

---

## Checklist

- [ ] robots.txt vytvorený
- [ ] sitemap.xml vytvorený
- [ ] Google Search Console nastavený
- [ ] Sitemap odoslaný do GSC
- [ ] Helmet na Homepage
- [ ] Helmet na Kontakt
- [ ] Helmet na Sluzby
- [ ] Helmet na Blog
- [ ] Helmet na BlogDetail
- [ ] LocalBusiness schema
- [ ] BreadcrumbList schema
- [ ] Product schema (už implementované)
- [ ] Article schema
- [ ] FAQ schema
- [ ] Lazy loading obrázkov
- [ ] Canonical URLs na všetkých stránkach
- [ ] Open Graph tagy
- [ ] Twitter Card tagy
- [ ] SSR/Prerendering riešenie

---

*Posledná aktualizácia: 9. marca 2026*
