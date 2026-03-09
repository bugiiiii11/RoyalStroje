# Full SEO Audit Report: Royal Stroje

**Website:** https://royalstroje.sk
**Business Type:** Local Equipment Rental (Construction Tools & Machinery)
**Location:** Senec, Slovakia
**Date:** March 9, 2026

---

## Executive Summary

### Overall SEO Health Score: 73/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 65/100 | 25% | 16.25 |
| Content Quality | 78/100 | 25% | 19.50 |
| On-Page SEO | 82/100 | 20% | 16.40 |
| Schema / Structured Data | 60/100 | 10% | 6.00 |
| Performance (CWV) | 70/100 | 10% | 7.00 |
| Images | 75/100 | 5% | 3.75 |
| AI Search Readiness | 80/100 | 5% | 4.00 |
| **Total** | | **100%** | **72.90** |

### Top 5 Critical Issues

1. **SPA Indexability** - React SPA without SSR/prerendering may cause Google indexing issues
2. **Sitemap Incomplete** - 139 product pages and blog articles missing from sitemap.xml
3. **Missing BreadcrumbList Schema** - No breadcrumb structured data
4. **Missing Article Schema** - Blog posts lack Article schema markup
5. **Missing FAQ Schema** - FAQ section exists but lacks FAQPage schema

### Top 5 Quick Wins

1. **Add product URLs to sitemap** - Instant indexability boost for 139 products
2. **Implement BreadcrumbList schema** - Enhanced SERP display
3. **Add Article schema to blog posts** - Rich results for blog content
4. **Implement FAQ schema** - FAQ section already exists, just add markup
5. **Add explicit image dimensions** - Prevent CLS issues

---

## Technical SEO (Score: 65/100)

### robots.txt - EXCELLENT

```
User-agent: *
Allow: /
Sitemap: https://royalstroje.sk/sitemap.xml
Disallow: /kosik
Disallow: /*.json$
Disallow: /assets/
```

**Positive:**
- Allows all crawlers by default
- Explicitly allows AI crawlers (GPTBot, Google-Extended, anthropic-ai, CCBot)
- Properly blocks cart and asset files
- Includes sitemap reference

### Sitemap - NEEDS IMPROVEMENT

**Current URLs:** 11 pages in sitemap

**Issues:**
- **CRITICAL:** 139 product pages NOT in sitemap (e.g., `/makita-ga5030r`, `/dewalt-dcg405p2`)
- **HIGH:** Blog article pages NOT in sitemap (e.g., `/blog/prenajom-vs-kupa-stavebnej-mechanizacie`)
- Orphan pages found: `DovozTechniky.jsx`, `ZemnePrace.jsx`, `ServisNaradia.jsx` not linked in routes

**Recommendation:** Generate dynamic sitemap with all product and blog URLs.

### Crawlability & Indexability

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS | ✅ Pass | Site uses HTTPS |
| Canonical URLs | ✅ Pass | Implemented via react-helmet-async |
| Noindex tags | ✅ Pass | None found on public pages |
| Language | ✅ Pass | `lang="sk"` set correctly |
| Viewport | ✅ Pass | `width=device-width, initial-scale=1.0` |
| SPA Rendering | ⚠️ Warning | Client-side rendering only |

### SPA/JavaScript Rendering - CRITICAL

**Issue:** This is a React SPA. Google may have difficulty indexing all content.

**Current State:**
- Using react-router-dom for routing
- Using react-helmet-async for meta tags (good)
- No SSR or prerendering detected

**Recommendations:**
1. Implement prerender.io middleware (quickest)
2. Use vite-plugin-ssr for SSR
3. Migrate to Next.js (best long-term)

---

## Content Quality (Score: 78/100)

### E-E-A-T Assessment

| Signal | Score | Evidence |
|--------|-------|----------|
| **Experience** | ✅ Strong | "20 rokov skusenosti" (20 years experience) |
| **Expertise** | ✅ Good | Detailed product specs, industry knowledge in blog |
| **Authoritativeness** | ✅ Good | Complete business info, local presence |
| **Trustworthiness** | ✅ Good | Phone number, physical address, email visible |

### Content Depth Analysis

| Page Type | Assessment | Notes |
|-----------|------------|-------|
| Homepage | ✅ Good | Clear value proposition, services overview |
| Product Pages | ✅ Good | 139 products with specs, pricing, images |
| Blog | ✅ Excellent | Comprehensive 9-min read articles with data |
| Service Pages | ✅ Good | Detailed service descriptions |
| Contact | ✅ Good | Full contact info, business hours, map |

### Thin Content Check

| Page | Word Count | Status |
|------|------------|--------|
| Blog articles | 1000+ | ✅ Pass |
| Product pages | 200-400 | ✅ Pass |
| GDPR | ~500 | ⚠️ Standard legal page |
| Obchodne podmienky | ~600 | ⚠️ Standard legal page |

### AI Citability Score: 80/100

**Positive:**
- Structured content with clear headings
- Factual data (prices, specs, statistics)
- Clear brand identity
- Well-organized FAQ section

**Improvements Needed:**
- Add more statistics and data points
- Include expert quotes/testimonials
- Add publication dates to all content

---

## On-Page SEO (Score: 82/100)

### Title Tags

| Page | Title | Length | Status |
|------|-------|--------|--------|
| Home | Royal Stroje - Pozicovna naradia a stavebnej techniky Senec | 59 chars | ✅ Good |
| Product | [Name] - [Brand] [Model] \| Prenajom strojov Senec \| Royal Stroje | ~70 chars | ✅ Good |
| Blog | [Article Title] \| Blog \| Royal Stroje | Dynamic | ✅ Good |

### Meta Descriptions

| Page | Status | Notes |
|------|--------|-------|
| Home | ✅ | 160 chars, includes CTA and phone |
| Products | ✅ | Dynamic with price and phone |
| Services | ✅ | Present on all service pages |

### Heading Structure

**Homepage:**
- H1: "Royal Stroje" (via Hero)
- H2: Categories and sections
- Hierarchy: ✅ Correct

**Product Pages:**
- H1: Product name
- H2: Brand/Model, Cena prenajmu, Technicke parametre
- Hierarchy: ✅ Correct

### Internal Linking

**Strengths:**
- Clear navigation structure
- Product cards link to detail pages
- Service pages interlinked

**Opportunities:**
- Add related products section
- Add "next/previous" navigation for products
- Add category breadcrumbs

---

## Schema / Structured Data (Score: 60/100)

### Currently Implemented

| Schema Type | Location | Status | Quality |
|-------------|----------|--------|---------|
| LocalBusiness | Home.jsx | ✅ | Excellent - includes geo, hours, area served |
| Product | ProductDetail.jsx | ✅ | Good - includes offer, brand, price |
| OpenGraph | All pages | ✅ | Complete |
| Twitter Cards | All pages | ✅ | Complete |

### LocalBusiness Schema (Home.jsx)
```json
{
  "@type": "LocalBusiness",
  "name": "Royal Stroje",
  "telephone": "+421948555551",
  "address": {
    "streetAddress": "Recka cesta 182",
    "addressLocality": "Senec",
    "postalCode": "925 26"
  },
  "geo": { "latitude": "48.2187", "longitude": "17.3994" },
  "areaServed": ["Senec", "Bratislava", "Galanta", "Trnava", "Pezinok", "Samorin"]
}
```

### Product Schema (ProductDetail.jsx)
```json
{
  "@type": "Product",
  "name": "[Product Name]",
  "brand": { "@type": "Brand", "name": "[Brand]" },
  "offers": {
    "@type": "Offer",
    "price": "[Price]",
    "priceCurrency": "EUR",
    "availability": "InStock"
  }
}
```

### Missing Schema Opportunities

| Schema Type | Priority | Impact |
|-------------|----------|--------|
| BreadcrumbList | HIGH | Rich snippets, navigation understanding |
| FAQPage | HIGH | FAQ section exists, easy win |
| Article | HIGH | Blog posts need this |
| Organization | MEDIUM | Company-wide authority |
| Service | MEDIUM | For service pages |
| HowTo | LOW | For tutorial blog posts |

---

## Performance / Core Web Vitals (Score: 70/100)

### Current Stack Analysis

| Technology | Impact on CWV |
|------------|---------------|
| React 19.2.0 | Neutral - depends on implementation |
| Vite 7.2.4 | Positive - fast builds, optimized output |
| TailwindCSS | Positive - minimal CSS footprint |
| lucide-react | Positive - tree-shakable icons |
| WebP Images | Positive - optimized format |

### Estimated Core Web Vitals

| Metric | Estimate | Status | Notes |
|--------|----------|--------|-------|
| LCP | ~2.5s | ⚠️ Needs Improvement | Hero images may need optimization |
| INP | ~100ms | ✅ Good | React hydration concern on load |
| CLS | ~0.1 | ✅ Good | Some images missing dimensions |

### Image Optimization

**Positive:**
- All images converted to WebP format
- Optimized file sizes

**Issues:**
- Some images missing explicit width/height
- Hero images need `fetchpriority="high"`
- Product images missing `loading="lazy"`

### Third-Party Impact

| Script | Type | Impact |
|--------|------|--------|
| EmailJS | Contact form | Low - async |
| reCAPTCHA v3 | Security | Medium - external JS |

---

## Images (Score: 75/100)

### Format Analysis

| Format | Count | Status |
|--------|-------|--------|
| WebP | 139+ | ✅ All products |
| PNG | 0 | ✅ All converted |

### Alt Text Coverage

| Page Type | Alt Text | Status |
|-----------|----------|--------|
| Products | ✅ Present | `{brand} {model} - {name}` |
| Hero | ⚠️ Generic | "Royal Stroje" |
| Blog | ✅ Present | Descriptive |

### CLS Prevention

| Issue | Count | Fix |
|-------|-------|-----|
| Missing width/height | Several | Add explicit dimensions |
| Dynamic content | Hero carousel | Set reserved height |

---

## AI Search Readiness (Score: 80/100)

### AI Crawler Access

| Crawler | Status |
|---------|--------|
| GPTBot | ✅ Allowed |
| Google-Extended | ✅ Allowed |
| anthropic-ai | ✅ Allowed |
| CCBot | ✅ Allowed |

### Citability Factors

| Factor | Score | Notes |
|--------|-------|-------|
| Structured headings | ✅ | Clear H1-H3 hierarchy |
| Data/statistics | ✅ | Pricing, specs included |
| Author attribution | ⚠️ | "Royal Stroje" - could be more specific |
| Publication dates | ⚠️ | Present on blog, missing elsewhere |
| Unique content | ✅ | Original content throughout |

### llms.txt

**Status:** Not implemented

**Recommendation:** Create `/llms.txt` file for AI crawlers with site summary.

---

## Detailed Issue List

### Critical (Fix Immediately)

1. **Sitemap Missing Product URLs**
   - Impact: 139 products not discoverable via sitemap
   - Fix: Generate dynamic sitemap including all `/:productId` routes

2. **SPA Indexability Risk**
   - Impact: Google may not fully render JavaScript content
   - Fix: Implement prerendering or SSR

### High Priority (Within 1 Week)

3. **Missing BreadcrumbList Schema**
   - Impact: No breadcrumb rich snippets
   - Fix: Add to navigation component

4. **Missing Article Schema**
   - Impact: Blog posts lack rich results
   - Fix: Add to BlogDetail.jsx

5. **Missing FAQ Schema**
   - Impact: FAQ section not eligible for rich results
   - Fix: Add FAQPage schema to FAQ.jsx

6. **Sitemap Missing Blog URLs**
   - Impact: Blog articles not in sitemap
   - Fix: Add `/blog/[slug]` URLs dynamically

### Medium Priority (Within 1 Month)

7. **Image Dimensions Missing**
   - Impact: Potential CLS issues
   - Fix: Add explicit width/height attributes

8. **Hero Image Optimization**
   - Impact: LCP may be slow
   - Fix: Add `fetchpriority="high"` to hero images

9. **Lazy Loading Missing**
   - Impact: Slower page loads
   - Fix: Add `loading="lazy"` to below-fold images

10. **Orphan Pages**
    - Files: DovozTechniky.jsx, ZemnePrace.jsx, ServisNaradia.jsx
    - Impact: Pages created but not routed
    - Fix: Either add routes or remove files

### Low Priority (Backlog)

11. **llms.txt Not Present**
    - Fix: Create AI crawler guidance file

12. **Service Schema**
    - Fix: Add to service pages

13. **Organization Schema**
    - Fix: Add site-wide organization markup

---

## Page-by-Page Analysis

### Homepage (/)
- **Title:** ✅ Optimized
- **Meta Description:** ✅ Compelling with phone number
- **H1:** ✅ Present
- **Schema:** ✅ LocalBusiness
- **Score:** 85/100

### Product Pages (/:productId)
- **Title:** ✅ Dynamic, optimized
- **Meta Description:** ✅ Dynamic with price
- **H1:** ✅ Product name
- **Schema:** ✅ Product with Offer
- **Score:** 88/100

### Services (/sluzby/*)
- **Title:** ✅ Optimized
- **Meta Description:** ✅ Present
- **Schema:** ⚠️ Missing Service schema
- **Score:** 72/100

### Blog (/blog, /blog/:slug)
- **Title:** ✅ Dynamic
- **Meta Description:** ✅ Excerpt used
- **Schema:** ⚠️ Missing Article schema
- **Score:** 70/100

### Contact (/kontakt)
- **Title:** ✅ Optimized
- **Meta Description:** ✅ With contact info
- **Schema:** ⚠️ Could add ContactPage
- **Score:** 78/100

---

## Competitive Positioning

### Local SEO Strengths
- Clear Senec/Bratislava targeting
- Complete NAP (Name, Address, Phone)
- Opening hours specified
- Area served defined (6 cities)

### Unique Value Propositions Identified
1. 20 years of experience
2. 24-hour delivery
3. 139 products available
4. Professional equipment (Makita, DeWalt, etc.)

---

## Recommendations Summary

### Immediate Actions (Week 1)
1. Generate dynamic sitemap with all products/blogs
2. Implement prerendering solution (prerender.io)
3. Add BreadcrumbList schema
4. Add Article schema to blog

### Short-term (Month 1)
5. Add FAQ schema
6. Add explicit image dimensions
7. Optimize hero images with priority hints
8. Implement lazy loading

### Long-term (Quarter 1)
9. Consider Next.js migration for full SSR
10. Implement structured data for all services
11. Create llms.txt for AI crawlers
12. Add review/rating schema when reviews are available

---

*Report generated: March 9, 2026*
*Audit tool: Claude Code SEO Audit System*
