# SEO Action Plan: Royal Stroje

**Overall SEO Health Score: 73/100**
**Generated:** March 9, 2026

---

## Critical Priority (Fix Immediately)

### 1. Generate Dynamic Sitemap with All Products

**Current Issue:** 139 product pages and blog articles missing from sitemap.xml

**Solution:** Create a script to generate sitemap dynamically from products.js

**File:** `scripts/generate-sitemap.js`

```javascript
import fs from 'fs';
import { products } from '../src/data/products.js';
import { blogArticles } from '../src/data/blogArticles.jsx';

const baseUrl = 'https://royalstroje.sk';

const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/sluzby', priority: '0.9', changefreq: 'monthly' },
  { loc: '/sluzby/predaj-techniky', priority: '0.8', changefreq: 'monthly' },
  { loc: '/sluzby/nahradne-diely', priority: '0.8', changefreq: 'monthly' },
  { loc: '/sluzby/cenova-ponuka', priority: '0.8', changefreq: 'monthly' },
  { loc: '/sluzby/royal-fleet', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.7', changefreq: 'weekly' },
  { loc: '/kontakt', priority: '0.8', changefreq: 'monthly' },
  { loc: '/partneri', priority: '0.5', changefreq: 'monthly' },
  { loc: '/gdpr', priority: '0.3', changefreq: 'yearly' },
  { loc: '/obchodne-podmienky', priority: '0.3', changefreq: 'yearly' },
];

// Add product URLs
const productUrls = products.map(product => ({
  loc: `/${product.id}`,
  priority: '0.7',
  changefreq: 'monthly'
}));

// Add blog article URLs
const blogUrls = Object.keys(blogArticles).map(slug => ({
  loc: `/blog/${slug}`,
  priority: '0.6',
  changefreq: 'monthly'
}));

const allUrls = [...staticUrls, ...productUrls, ...blogUrls];
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log(`Generated sitemap with ${allUrls.length} URLs`);
```

**Run:** `node scripts/generate-sitemap.js`

---

### 2. Implement Prerendering for SPA

**Current Issue:** React SPA may have indexing issues with Google

**Option A: Prerender.io (Fastest)**
```bash
npm install prerender-node
```

**Option B: vite-plugin-ssr**
```bash
npm install vite-plugin-ssr
```

**Option C: Migrate to Next.js (Best long-term)**
- Full SSR/SSG support
- Better SEO out-of-the-box
- Image optimization built-in

---

## High Priority (Within 1 Week)

### 3. Add BreadcrumbList Schema

**File:** `src/components/common/Breadcrumbs.jsx`

```jsx
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';

const pathNames = {
  'sluzby': 'Sluzby',
  'predaj-techniky': 'Predaj techniky',
  'nahradne-diely': 'Nahradne diely',
  'cenova-ponuka': 'Cenova ponuka',
  'royal-fleet': 'Royal Fleet',
  'blog': 'Blog',
  'kontakt': 'Kontakt',
  'partneri': 'Partneri',
  'gdpr': 'GDPR',
  'obchodne-podmienky': 'Obchodne podmienky'
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbItems = [
    { name: 'Domov', url: 'https://royalstroje.sk/' }
  ];

  let currentPath = '';
  pathnames.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbItems.push({
      name: pathNames[segment] || segment,
      url: `https://royalstroje.sk${currentPath}`
    });
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <nav className="flex items-center gap-2 text-sm text-white/60">
        <Link to="/" className="hover:text-orange-primary">
          <Home size={16} />
        </Link>
        {pathnames.map((segment, index) => (
          <div key={segment} className="flex items-center gap-2">
            <ChevronRight size={14} />
            <Link
              to={`/${pathnames.slice(0, index + 1).join('/')}`}
              className="hover:text-orange-primary"
            >
              {pathNames[segment] || segment}
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
}
```

---

### 4. Add Article Schema to Blog Posts

**File:** `src/pages/BlogDetail.jsx`

Add this schema inside Helmet:

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
      "description": article.excerpt,
      "datePublished": article.dateISO,
      "dateModified": article.dateISO,
      "author": {
        "@type": "Organization",
        "name": "Royal Stroje",
        "url": "https://royalstroje.sk"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Royal Stroje",
        "logo": {
          "@type": "ImageObject",
          "url": "https://royalstroje.sk/logoroyal.webp"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://royalstroje.sk/blog/${slug}`
      }
    })}
  </script>
</Helmet>
```

---

### 5. Add FAQ Schema

**File:** `src/components/home/FAQ.jsx`

Add FAQPage schema for the FAQ section:

```jsx
const faqItems = [
  {
    question: "Ako funguje prenajom strojov?",
    answer: "Staci nam zavolat alebo napisat email..."
  },
  // ... other FAQ items
];

// In Helmet:
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

---

## Medium Priority (Within 1 Month)

### 6. Add Explicit Image Dimensions

All images should have width and height:

```jsx
// Product images
<img
  src={product.image}
  alt={`${product.brand} ${product.model}`}
  width={400}
  height={400}
  loading="lazy"
  decoding="async"
/>

// Hero images
<img
  src="/hero-main1.webp"
  alt="Royal Stroje - Pozicovna naradia"
  width={1920}
  height={1080}
  fetchpriority="high"
/>
```

---

### 7. Implement Lazy Loading

Add to all below-fold images:

```jsx
<img
  src={product.image}
  alt={product.name}
  loading="lazy"
  decoding="async"
/>
```

---

### 8. Add Service Schema

**File:** `src/pages/Sluzby.jsx`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Prenajom stavebnej techniky",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Royal Stroje",
    "@id": "https://royalstroje.sk/#organization"
  },
  "areaServed": {
    "@type": "City",
    "name": "Senec"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Stavebne stroje a naradie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Prenajom mini-rypadiel"
        }
      }
    ]
  }
}
```

---

### 9. Clean Up Orphan Pages

**Remove or route these files:**
- `src/pages/DovozTechniky.jsx`
- `src/pages/ZemnePrace.jsx`
- `src/pages/ServisNaradia.jsx`

If keeping, add routes to App.jsx:
```jsx
<Route path="/sluzby/dovoz-techniky" element={<DovozTechniky />} />
<Route path="/sluzby/zemne-prace" element={<ZemnePrace />} />
<Route path="/sluzby/servis-naradia" element={<ServisNaradia />} />
```

---

## Low Priority (Backlog)

### 10. Create llms.txt

**File:** `public/llms.txt`

```
# Royal Stroje - AI Crawler Information

## About
Royal Stroje is a construction equipment rental company based in Senec, Slovakia.
20+ years of experience in tool and machinery rental.

## Key Services
- Tool rental (drills, grinders, demolition hammers)
- Heavy machinery rental (excavators, loaders, platforms)
- Delivery service (24-hour availability)
- Professional equipment sales

## Contact
Phone: +421948555551
Email: info@royalstroje.sk
Address: Recka cesta 182, Senec 925 26, Slovakia

## Areas Served
Senec, Bratislava, Galanta, Trnava, Pezinok, Samorin

## Website Structure
- / - Homepage with product catalog
- /sluzby - Services overview
- /blog - Industry articles and guides
- /kontakt - Contact information
- /{product-id} - Individual product pages (139 products)
```

---

### 11. Add Related Products

On ProductDetail.jsx, add section for related products:

```jsx
// Get related products from same subcategory
const relatedProducts = products
  .filter(p => p.subcategory === productData.subcategory && p.id !== productId)
  .slice(0, 4);
```

---

## Implementation Checklist

### Critical (Week 1)
- [ ] Generate dynamic sitemap with all URLs
- [ ] Submit new sitemap to Google Search Console
- [ ] Implement prerendering solution

### High Priority (Week 2)
- [ ] Add BreadcrumbList schema
- [ ] Add Article schema to blog posts
- [ ] Add FAQ schema

### Medium Priority (Month 1)
- [ ] Add explicit image dimensions
- [ ] Implement lazy loading
- [ ] Add Service schema
- [ ] Clean up orphan pages

### Low Priority (Quarter 1)
- [ ] Create llms.txt
- [ ] Add related products section
- [ ] Consider Next.js migration

---

## Expected Results

After implementing all recommendations:

| Metric | Current | Expected |
|--------|---------|----------|
| SEO Score | 73/100 | 88-92/100 |
| Indexed Pages | ~11 | 150+ |
| Rich Results | 2 types | 5+ types |
| Core Web Vitals | Mixed | All Green |

---

*Last updated: March 9, 2026*
