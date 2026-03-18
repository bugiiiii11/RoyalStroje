# RoyalStroje -- Technical Documentation

> Place of truth for the current state of the project.
> Last updated: 2026-03-18

---

## 1. Project Overview

**What:** Equipment rental website for Royal Stroje s.r.o. (construction machinery, tools, vehicles)
**Domain:** royalstroje.sk
**Stack:** React 19 + Vite 7 + Tailwind CSS 3 + Vercel
**Repo:** github.com/bugiiiii11/RoyalStroje (branch: main)

---

## 2. Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React 19.2 | ES modules, JSX |
| Build | Vite 7.2 | Code splitting, lazy loading all pages |
| Styling | Tailwind CSS 3.4 | Custom colors: orange-primary #FF6600, orange-hover #ff8533 |
| Routing | React Router 7.9 | BrowserRouter, dynamic routes |
| SEO | react-helmet-async 3.0 | Per-page meta, JSON-LD schema |
| Icons | lucide-react 0.554 | |
| Forms | EmailJS + reCAPTCHA v3 | Honeypot + rate limiting (3/hour) |
| Cart | React Context + localStorage | Key: royalstroje_cart |
| CSV parsing | papaparse 5.5 | |
| Hosting | Vercel | SPA rewrites, asset caching |

---

## 3. Project Structure

```
src/
  App.jsx                    # Router config, lazy-loaded pages
  main.jsx                   # Entry point
  index.css                  # Global styles
  context/
    CartContext.jsx           # Cart state (localStorage persistence)
  components/
    common/                  # Header, Footer, MobileNav, HamburgerMenu, Cart,
                             # AnimatedBackground, FloatingParticles, ScrollToTop,
                             # RecaptchaWrapper, ContentSection
    home/                    # Hero, Hero1, Catalog, FAQ, CTASection, WhyRoyalStroje
    product/                 # ProductCard
    catalog/                 # QuoteForm
    contact/                 # ContactForm
    ui/                      # CustomSelect
  pages/                     # 17 pages (all lazy-loaded)
  data/
    products.js              # 142 products
    categories.js            # 7 categories with subcategories
    accessories.js           # 15 accessory items (table display)
    blogArticles.jsx         # 18 articles (metadata + lazy loader)
    articles/                # 18 article JSX files
public/
  robots.txt                 # SEO directives
  sitemap.xml                # 13 URLs
  pictures/Katalog-PNG/      # Product images organized by category (webp)
  documents/                 # Contract templates
```

---

## 4. Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero carousel, catalog, FAQ, CTA |
| `/sluzby` | Sluzby | Services overview |
| `/sluzby/predaj-techniky` | PredajTechniky | Equipment sales |
| `/sluzby/nahradne-diely` | NahradneDiely | Spare parts |
| `/sluzby/cenova-ponuka` | CenovaPonuka | Pricing |
| `/sluzby/royal-fleet` | RoyalFleet | Fleet management |
| `/blog` | Blog | Blog listing |
| `/blog/:slug` | BlogDetail | Article detail (lazy-loaded content) |
| `/kontakt` | Kontakt | Contact form |
| `/kosik` | Kosik | Shopping cart |
| `/partneri` | Partneri | Partners |
| `/gdpr` | GDPR | Privacy policy |
| `/obchodne-podmienky` | ObchodnePodmienky | Terms of service |
| `/:productId` | ProductDetail | Dynamic product page |

---

## 5. Data Models

### Product (products.js)

```javascript
{
  id: string,                    // e.g. 'makita-tw001gm201'
  name: string,                  // e.g. 'Makita TW001GM201'
  category: string,              // e.g. 'male-naradie'
  subcategory: string,           // e.g. 'utahovace-a-skrutkovace'
  image: string,                 // webp path in /pictures/Katalog-PNG/
  price: string,                 // formatted: '24.6€/deň'
  pricePerDay: number,           // without VAT: 20
  description: string,           // short description
  features: string[],            // array of feature strings
  inStock: boolean,
  isNew: boolean,
  isPopular: boolean,
  blogArticleSlug?: string,      // optional link to blog article
}
```

**Counts:** 142 products across 7 categories.

### Category (categories.js)

```javascript
{
  id: string,                    // e.g. 'male-naradie'
  name: string,                  // e.g. 'Malé náradie'
  icon: ReactComponent,          // lucide-react icon
  subcategories: [
    { id: string, name: string }
  ]
}
```

**Categories (7):**

| Category | Subcategories |
|----------|--------------|
| Malé náradie | 15 (vŕtačky, brúsky, píly, vysávače, čerpadlá, kúrenie, zváranie, meranie, vibrátory, lešenie, nádrže, príslušenstvo...) |
| Stredná mechanizácia | 8 (zhutňovače, generátory, kompresory, rezačky, stolové píly, miešačky, manipulácia) |
| Ťažká technika | 9 (minirypadlá, ťažké rypadlá, kolesové, nakladače, dumpery, valce, manipulátory, vysokozdvižné) |
| Pracovné plošiny | 3 (interiérové, exteriérové) |
| Vybavenie staveniska | 6 (kancelárske kontajnery, skladové, sanitárne, oplotenie, toalety) |
| Autá a prívesy | 3 (autá/dodávky, prívesy) |
| Záhradná technika | 4 (kosačky, krovinorezy, rotavátory) |

### Accessory (accessories.js)

```javascript
{
  name: string,                  // e.g. 'sekáč'
  parameter: string,             // e.g. 'špicatý'
  pricePerDay: number,           // without VAT
  priceWithVat: number,          // with VAT (23%)
}
```

**Count:** 15 items. Displayed as a table in "Malé náradie > Príslušenstvo" subcategory.

### Blog Article (blogArticles.jsx + articles/)

```javascript
// Metadata in blogArticles.jsx
{
  title: string,
  date: string,
  author: string,               // 'Royal Stroje'
  readTime: string,             // e.g. '13 min'
  category: string,             // e.g. 'Návody'
  excerpt: string,
}

// Content lazy-loaded from articles/{slug}.jsx
// Each article exports: { title, date, author, readTime, category, excerpt, content: JSX }
```

**Count:** 18 articles. Some articles have product cross-links (blogArticleSlug on product, catalog link in article CTA).

---

## 6. Components Architecture

### Layout
- **Header** -- sticky nav, promo banner (slide-in), WhatsApp/Telegram links
- **Footer** -- multi-column: address (Recká cesta 182, 925 26 Senec), hours (Mon-Fri 07:00-16:00), contact
- **MobileNav** -- bottom navigation bar (visible < 768px)
- **HamburgerMenu** -- mobile menu overlay
- **ScrollToTop** -- auto-scroll on route change

### Home Page
- **Hero/Hero1** -- image carousel with CTAs
- **Catalog** -- category/subcategory filtering, product grid, pagination. Accessories subcategory renders table instead of cards.
- **FAQ** -- expandable questions
- **CTASection** -- call-to-action banner
- **WhyRoyalStroje** -- benefits grid

### Product
- **ProductCard** -- reusable card with image, price, "Zobraziť detail" + "Zavolať" buttons
- **ProductDetail** (page) -- full product view, schema markup, optional blog link

### Forms
- **ContactForm** -- name, email, phone, project type, message
- **QuoteForm** -- similar structure, used in catalog section

Both forms use: EmailJS submission, reCAPTCHA v3, honeypot field, rate limiting (3/hour via localStorage).

### Cart
- **CartContext** -- global state, localStorage persistence (key: `royalstroje_cart`)
- **Cart** -- modal overlay with cart items
- **Kosik** (page) -- full cart view with totals

---

## 7. SEO Implementation

### Meta Tags (react-helmet-async)
- Per-page title, description, keywords
- Open Graph tags (og:type, og:title, og:description, og:image, og:url, og:locale)
- Twitter card tags
- Canonical URLs

### Schema Markup (JSON-LD)
- **Home:** LocalBusiness schema (name, address, phone, email, geo, hours, service areas)
- **ProductDetail:** Dynamic Product schema per product
- **BlogDetail:** Article schema

### robots.txt
- Allow all crawlers on /
- Disallow: /kosik, /*.json$, /assets/
- Explicitly allow AI crawlers (GPTBot, Google-Extended, anthropic-ai, CCBot)
- Sitemap reference

### sitemap.xml
- 13 primary URLs with priorities and change frequencies
- Homepage priority 1.0, services 0.9, subpages 0.7-0.8

---

## 8. Forms & Email Flow

```
User fills form
  -> Honeypot check (reject bots)
  -> Rate limit check (max 3/hour, localStorage)
  -> reCAPTCHA v3 token
  -> EmailJS API call with template params
  -> Success/error toast
```

### Environment Variables (.env)

| Variable | Purpose |
|----------|---------|
| VITE_EMAILJS_SERVICE_ID | EmailJS service ID |
| VITE_EMAILJS_TEMPLATE_ID | EmailJS email template |
| VITE_EMAILJS_PUBLIC_KEY | EmailJS public API key |
| VITE_RECAPTCHA_SITE_KEY | Google reCAPTCHA v3 site key |

---

## 9. Deployment

### Vercel Configuration
- **SPA rewrite:** all routes -> /index.html
- **Caching:**
  - /assets/* -> 1 year, immutable
  - *.webp -> 1 day
  - *.woff2 -> 1 year, immutable

### Build
```bash
npm run build    # vite build -> dist/
npm run dev      # vite dev server
npm run preview  # preview production build
```

---

## 10. Styling

- **Tailwind CSS 3.4** with custom config
- Brand colors: orange-primary (#FF6600), orange-hover (#ff8533)
- Custom animations: float-slow, float-slower, float-reverse, pulse-slow
- Dark theme throughout (zinc/black backgrounds)
- Responsive: mobile-first, MobileNav below 768px

---

## 11. Current Stats

| Metric | Value |
|--------|-------|
| Products | 142 |
| Categories | 7 (with ~46 subcategories total) |
| Accessories | 15 |
| Blog articles | 18 |
| Pages | 17 |
| Components | 20 |
| Dependencies | 8 production + 11 dev |

---

## 12. Development Plan -- Equipment Rental Management System

> Full spec: `royal-stroje-spec.md` (MVP Specification v1.0)

### System Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend (website) | React + Vite + Tailwind (current) | Public website, royalstroje.sk |
| Frontend (dashboard) | React + Vite + Tailwind (new app) | Internal team app, app.royalstroje.sk |
| Frontend (portal) | React + Vite + Tailwind (new app) | Royal Card client portal, portal.royalstroje.sk |
| Database + Auth | Supabase (PostgreSQL + RLS + Auth) | All data, user management |
| Backend API | Supabase Edge Functions (Railway if needed) | PDF gen, notifications, business logic |
| File Storage | Supabase Storage | Quote/invoice PDFs, equipment photos |

### Planned App Structure

```
royal-stroje-system/
  apps/
    dashboard/          # Internal team app (protected)
    portal/             # Royal Card client portal (authenticated)
  packages/
    shared/             # Shared types, utils, Supabase client
  supabase/
    migrations/         # SQL schema migrations
    functions/          # Edge functions (PDF gen, notifications)
    seed.sql            # Initial equipment catalog data
```

### Inventory Model

- **Owned stock (unlimited supply):** Male naradie, Stredna mechanizacia, Tazka technika
- **Partner-sourced (availability-dependent):** Pracovne plosiny, Vybavenie staveniska, Auta a privesy, Zahradna technika

### Database Schema (10 tables)

| Table | Purpose | Key fields |
|-------|---------|------------|
| equipment_categories | 7 main categories | name, slug, ownership_type (owned/partner) |
| equipment_subcategories | ~46 subcategories | category_id, name, slug |
| equipment | Full catalog (142+ items) | category, model, daily_rate_base, pricing_type (fixed/negotiable), ownership_type, total_units, status |
| clients | Customer directory | company_name, ICO, DIC, IC_DPH, client_type (standard/royal_card/vip), discount_percent, auth_user_id |
| reservations | Deal pipeline | reservation_number (RS-2026-XXXX), status (inquiry->quoted->confirmed->active->completed->invoiced->paid), dates, delivery, financials |
| reservation_items | Line items per deal | equipment_id, quantity, daily_rate, days, line_total |
| invoices | Billing | invoice_number (FA/PF/CN-2026-XXXX), type (proforma/invoice/credit_note), subtotal, vat_amount, total, status |
| partners | Equipment partners | company info, contact |
| royal_card_invitations | Portal invite system | email, invite_code, status, expires_at |
| activity_log | Audit trail | user_id, action, entity_type, entity_id, details (JSONB) |

Auto-generated numbers: RS-2026-XXXX (reservations), FA-2026-XXXX (invoices), PF-2026-XXXX (proforma).

### Reservation Pipeline (Deal Stages)

```
inquiry -> quoted -> confirmed -> active -> completed -> invoiced -> paid
                                                                  -> cancelled (any stage)
```

### Internal Dashboard Pages

| Page | Route | Purpose |
|------|-------|---------|
| Dashboard Home | / | Stats row + Kanban pipeline + today's schedule + alerts |
| New Deal | /deals/new | Quick create: client -> equipment -> dates -> summary (under 60s) |
| Deal Detail | /deals/:id | Full deal view, status transitions, timeline, items, financials |
| Equipment Catalog | /equipment | Manage inventory, availability calendar |
| Client Directory | /clients | Search, client detail, rental history, Royal Card invite |
| Calendar | /calendar | Gantt-style timeline of all rentals |
| Invoices | /invoices | Invoice list, generate from reservation, PDF preview |
| Reports | /reports | Revenue charts, popular equipment, top clients, utilization |

### Royal Card Client Portal Pages

| Page | Route | Purpose |
|------|-------|---------|
| Portal Home | /portal | Active rentals, quick booking |
| Catalog | /portal/catalog | Browse equipment with real-time availability, RC discount shown |
| Booking | /portal/book | Build booking request, submit as inquiry |
| My Rentals | /portal/rentals | Past and current rentals, download PDFs |
| Profile | /portal/profile | Edit company info, RC details |

Royal Card benefits: 5% auto-discount, no deposit required, self-service portal.

### Security (Row-Level Security)

- **Dashboard users (admin/staff):** Full access to all tables
- **Portal users (Royal Card):** Read equipment, manage only own reservations/client record
- Equipment readable by everyone, writable by staff only

### API Endpoints (Edge Functions)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /generate-quote | POST | Generate quote PDF from reservation |
| /invite-royal-card | POST | Send Royal Card invitation |
| /dashboard-stats | GET | Active rentals, revenue, overdue counts |
| /check-availability | GET | Check equipment availability for date range |

### Build Sprints

| Sprint | Days | Deliverable |
|--------|------|-------------|
| 1 | 1-3 | Foundation: Supabase schema, migrations, seed data, dashboard scaffold, auth |
| 2 | 4-6 | Core dashboard: stats, pipeline kanban, new deal flow, deal detail, equipment catalog |
| 3 | 7-9 | Quoting + clients: PDF generation, client directory, client detail, calendar view |
| 4 | 10-12 | Royal Card portal: invitations, registration, catalog, booking, my rentals |
| 5 | 13-14 | Invoicing + polish: invoice gen, proforma, Slovak legal compliance, reports, testing |

### Quote/Invoice PDF

Slovak legal compliance: Dodavatel/Odberatel, ICO, DIC, IC DPH, IBAN, variabilny symbol.
VAT rate: 20% (Slovak standard).

### Future Enhancements (Post-MVP)

- WhatsApp Business API (send quotes directly)
- Omega od Krosu export for accounting
- Partner equipment coordination module
- Equipment GPS/IoT tracking
- Mobile app for delivery drivers
- SMS reminders for returns
- Online payment (Stripe/GoPay)
- Multi-language (SK/CZ/EN)
- Equipment maintenance scheduling
- Digital contract signatures

---

## 13. Business Info

| Field | Value |
|-------|-------|
| Company | Royal Stroje s.r.o. |
| Address | Recká cesta 182, 925 26 Senec, Slovakia |
| Phone | +421 948 555 551 |
| Email | info@royalstroje.sk |
| Hours | Mon-Fri 07:00-16:00 |
| Service areas | Senec, Bratislava, Galanta, Trnava, Pezinok, Šamorín |
