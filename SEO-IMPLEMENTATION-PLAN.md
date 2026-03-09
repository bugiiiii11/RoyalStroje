# SEO Implementation Plan - Royal Stroje

**Stav:** In Progress
**Posledná aktualizácia:** 9. marca 2026

---

## Prehľad fáz

| Fáza | Stránky | Priorita | Status |
|------|---------|----------|--------|
| 1 | Home.jsx, Kontakt.jsx | Critical | [x] DONE |
| 2 | Sluzby.jsx, Blog.jsx, BlogDetail.jsx | High | [x] DONE |
| 3 | PredajTechniky, NahradneDiely, CenovaPonuka, RoyalFleet | Medium | [x] DONE |
| 4 | GDPR, ObchodnePodmienky, Kosik | Low | [x] DONE |

---

## Dokončené kroky

- [x] robots.txt vytvorený (`public/robots.txt`)
- [x] sitemap.xml vytvorený (`public/sitemap.xml`)
- [x] SEO Audit Report (`SEO-AUDIT-REPORT.md`)
- [x] PNG → WebP konverzia

---

## FÁZA 1: Critical Pages

### Home.jsx
- [x] Pridať Helmet import
- [x] Pridať title, description, keywords
- [x] Pridať canonical URL
- [x] Pridať Open Graph tagy
- [x] Pridať LocalBusiness schema

### Kontakt.jsx
- [x] Pridať Helmet import
- [x] Pridať title, description
- [x] Pridať canonical URL
- [x] Pridať LocalBusiness schema

---

## FÁZA 2: Content Pages

### Sluzby.jsx
- [x] Pridať Helmet s meta tagmi

### Blog.jsx
- [x] Pridať Helmet s meta tagmi

### BlogDetail.jsx
- [x] Pridať Helmet s dynamickým title/description
- [x] Pridať Article schema

---

## FÁZA 3: Service Pages

### PredajTechniky.jsx
- [x] Pridať Helmet s meta tagmi

### NahradneDiely.jsx
- [x] Pridať Helmet s meta tagmi

### CenovaPonuka.jsx
- [x] Pridať Helmet s meta tagmi

### RoyalFleet.jsx
- [x] Pridať Helmet s meta tagmi

---

## FÁZA 4: Legal Pages

### GDPR.jsx
- [x] Pridať Helmet s noindex

### ObchodnePodmienky.jsx
- [x] Pridať Helmet s noindex

### Kosik.jsx
- [x] Pridať Helmet s noindex, nofollow

---

## Verifikácia

Po každej fáze:
```bash
npm run build
npm run preview
```

Skontrolovať:
- View Source → `<title>`, `<meta>`, `<script type="application/ld+json">`
- https://search.google.com/test/rich-results
- https://validator.schema.org

---

## Google Search Console (manuálne)

1. https://search.google.com/search-console
2. Add property: royalstroje.sk
3. Verifikovať (DNS alebo HTML tag)
4. Odoslať sitemap.xml
5. Request indexing pre homepage
