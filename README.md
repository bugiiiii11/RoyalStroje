# 🏗️ Royal Stroje - Požičovňa náradia a stavebnej techniky

Moderný web pre požičovňu stavebného náradia a techniky v Senci.

## 🚀 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 3.4** - Styling
- **React Router v6** - Routing
- **Lucide React** - Icons

## 📦 Inštalácia

```bash
# Nainštalovať dependencie
npm install

# Spustiť development server
npm run dev

# Build pre produkciu
npm run build

# Preview produkčného buildu
npm run preview
```

## 📁 Štruktúra projektu

```
src/
├── components/
│   ├── common/          # Header, Footer, MobileNav
│   ├── home/            # Hero, Catalog
│   └── product/         # ProductCard
├── data/
│   ├── categories.js    # Kategórie produktov
│   └── products.js      # Produktové dáta
├── pages/
│   ├── Home.jsx         # Homepage
│   ├── Sluzby.jsx       # Služby
│   └── Kontakt.jsx      # Kontakt
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## 🎨 Design System

### Farby

- **Orange Primary:** `#FF6600`
- **Orange Hover:** `#ff8533`
- **Pozadie:** `zinc-950`, `zinc-900`, `zinc-800`
- **Text:** `white`, `white/90`, `white/80`, `white/70`

### Komponenty

- **Header** - Sticky navigácia s logo a CTA
- **Footer** - 4-stĺpcový footer s kontaktmi
- **MobileNav** - Bottom navigation pre mobile (<768px)
- **ProductCard** - Karta produktu s obrázkom, cenou, vlastnosťami
- **Hero** - Úvodná sekcia (33vh výška)
- **Catalog** - Kategórie + produkty + paginácia

## ✨ Funkcionality

### Homepage (`/`)

- ✅ Narrow hero sekcia (1/3 obrazovky)
- ✅ Katalóg s 6 kategóriami na ľavom sidebari
- ✅ Subcategory filter nad produktmi
- ✅ Produktový grid (3 stĺpce, 2 rady = 6 produktov/strana)
- ✅ Paginácia
- ✅ Default aktívna kategória: "Malé náradie"

### Služby (`/sluzby`)

- ✅ Hero sekcia
- ✅ 6 typov služieb (zemné práce, inžinierske siete, búracie práce...)
- ✅ CTA sekcia

### Kontakt (`/kontakt`)

- ✅ Kontaktné údaje (telefón, email, WhatsApp, Telegram)
- ✅ Adresa a otváracie hodiny
- ✅ O nás sekcia

## 📱 Responsive Design

- **Mobile First** prístup
- **Breakpoints:**
  - Mobile: `< 768px` → Bottom navigation
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px`

## 🎯 Kategórie produktov

1. **Malé náradie** - 6 produktov (vŕtačky, brúsky, píly...)
2. **Stredná mechanizácia** - 6 produktov (vibračné dosky, elektrocentrály...)
3. **Ťažká technika** - 6 produktov (bagre, rýpadlá, nakladače...)
4. **Pracovné plošiny** - 6 produktov (nožnicové, kĺbové...)
5. **Vybavenie staveniska** - 6 produktov (kontajnery, oplotenie...)
6. **Autá a prívesy** - 6 produktov (dodávky, nákladné autá...)

**Celkom:** 36 produktov

## 📞 Kontakt

- **Telefón:** +421 948 555 551
- **Email:** info@royalstroje.sk
- **Adresa:** Réčka cesta 182, 903 01 Senec
- **Otváracie hodiny:** Po-Pi: 7:00-16:00

## 🛠️ Ďalší vývoj

- [ ] Online rezervačný formulár
- [ ] Košík funkcionalita
- [ ] Blog sekcia
- [ ] Galéria projektov
- [ ] Hodnotenia zákazníkov
- [ ] Multi-language (SK + EN)

## 📄 Licencia

© 2026 Royal Stroje. Všetky práva vyhradené.
