# Visual Design Analysis Report: royalstroje.sk

**Date:** 2026-03-14
**Viewports tested:** Desktop (1920x1080), Laptop (1366x768), Tablet (768x1024), Mobile (375x812)
**Tool:** Playwright Chromium (automated capture + metric extraction)

---

## 1. Above-the-Fold Content

### Desktop (1920x1080)
- **H1 heading** ("Pozicovna naradia a stavebnej techniky v Senci.") is prominently displayed at 72px bold white text over a dark workshop background image. Clearly visible and impactful.
- **Two CTAs visible:** "Zavolat teraz" (orange button, 192x60px) and "Zobrazit katalog" (dark gray button, 222x60px) sit at y=678, well within the fold.
- **Supporting copy** includes business hours (Po-Pia 7-16), nonstop phone line, and location info.
- **Announcement banner** in the top-right corner: "Coskoro otvarame!" (Coming soon) with a "Kontaktujte nas" link.
- **Navigation:** Logo top-left, three nav items (Pozicovna, Sluzby, Kontakt) top-center, phone icon top-right.
- **Hero image:** High-quality workshop photograph with construction equipment (excavator, power tools on workbench, generator). Creates strong industrial/professional atmosphere.

### Laptop (1366x768)
- All above-the-fold elements remain visible, though the layout is slightly tighter. CTAs are near the bottom edge of the fold but still visible.

### Tablet (768x1024)
- H1 is visible but noticeably more compressed. The hero image is still present. CTAs visible.

### Mobile (375x812)
- The hero section is completely replaced with a catalog-first layout. The mobile view shows "Katalog strojov na prenajom" as the H1 with category navigation (Male naradie, Stredna mechanizacia, etc.). This is a significant and intentional mobile-first design decision -- users on mobile go straight to browsing equipment.
- A fixed bottom navigation bar provides access to Pozicovna, Sluzby, and Kontakt.

**Assessment:** STRONG. Desktop hero is compelling with clear value proposition and visible CTAs. Mobile takes a practical catalog-first approach suited to task-oriented users.

---

## 2. Visual Hierarchy

### Heading Scale
| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 72px | 900 | Hero tagline (desktop) |
| H1 | 36px | 900 | Catalog section title |
| H2 | 48px | 900 | Major section headings (Mate otazky?, Chcete vediet viac?) |
| H2 | 36px | 900 | Sub-section headings |
| H3 | 18-24px | 700-900 | Card titles, FAQ items, features |
| H3 | 16px | 700 | Product card names |

**Issues identified:**
- **Duplicate H1 tags:** The page has two H1 elements -- one for the hero section and one for the catalog section. SEO best practice recommends a single H1 per page.
- The heading hierarchy otherwise follows a logical scale from large (hero) to progressively smaller subsections.

**Assessment:** GOOD overall hierarchy. The 72px hero heading immediately draws the eye, followed by 48px section dividers. The flow from hero to value props to catalog to FAQ to blog is logical.

---

## 3. Color Usage and Contrast

### Color Palette
| Role | Color | Hex (approx) |
|------|-------|---------------|
| Primary accent | Orange | #FF6600 (rgb 255,102,0) |
| Background | Near black | #18181B / #27272A |
| Text (primary) | White | #FFFFFF |
| Text (secondary) | White 60% | rgba(255,255,255,0.6) |
| Button (secondary) | Dark zinc | #27272A (rgb 39,39,42) |

### Contrast Analysis
- **White text on dark background:** Excellent contrast ratio (well above WCAG AAA 7:1).
- **Orange (#FF6600) on dark background:** Good contrast, approximately 5.5:1 -- passes WCAG AA for normal text.
- **Orange text used for:** Active nav state, phone number, "stavebnej techniky v Senci" highlight in H1, price labels.
- **White 60% opacity text on dark background:** This is the weakest contrast point. rgba(255,255,255,0.6) on #27272A produces approximately 4.5:1 -- barely passes WCAG AA. Used for inactive category buttons and some secondary text.

**Issues identified:**
- The 60%-opacity white text on dark backgrounds is borderline for accessibility. Consider bumping to 70-80% opacity for better readability.
- The orange accent is used consistently and sparingly, which is good for brand recognition.

**Assessment:** GOOD. The dark theme with white text and orange accents is cohesive and creates a professional, industrial feel. Minor concern with low-opacity secondary text.

---

## 4. Typography and Readability

- **Base font size:** 16px -- meets the recommended minimum for readability.
- **H1 at 72px** on desktop is bold and commanding.
- **Font weight:** Heavy use of 700-900 weights across headings creates a strong, masculine brand feel appropriate for construction equipment.
- **Body text** appears to use a sans-serif font (likely Inter or similar).
- **Line spacing** appears adequate on both desktop and mobile.

**Issues identified:**
- Product card title text at 16px with 700 weight is functional but could benefit from slightly more line-height for multi-line names.
- The "Coskoro otvarame!" announcement panel uses relatively small text (20px heading, ~14px body) that may be missed by some users despite its top-right position.

**Assessment:** GOOD. Typography is clean, legible, and appropriately sized across devices.

---

## 5. Spacing and Alignment

### Desktop
- The layout uses generous whitespace between major sections.
- The hero section fills the full viewport height with a well-composed background image.
- The "Preco si nas vyberaju stavbari" section uses a 4-column grid with consistent card sizing.
- The catalog section uses a sidebar (categories) + main content (product grid) layout that is well-structured.
- Product cards are arranged in a grid with consistent spacing.
- The FAQ section uses a clean accordion pattern with a delivery van image offset to the left.

### Mobile
- Proper stacking of elements with consistent horizontal padding.
- Category buttons span full width with consistent vertical spacing.
- Product cards stack in a single column with adequate spacing.
- The bottom fixed navigation bar is well-spaced with three equal sections.

**Issues identified:**
- No major spacing or alignment issues detected. The layout is well-organized.

**Assessment:** STRONG. Clean grid systems, consistent gutters, and appropriate use of whitespace.

---

## 6. Mobile Rendering Quality

### Positive findings
- **No horizontal scroll:** Confirmed -- scrollWidth matches viewportWidth (375px).
- **Responsive navigation:** Hamburger menu icon (top-right) + fixed bottom navigation bar with three primary sections.
- **Content adapts well:** The complete redesign of the above-the-fold area for mobile (catalog-first instead of hero image) shows thoughtful responsive design.
- **Product cards** reflow to single column cleanly.
- **Search bar** is prominently placed near the top of the mobile view.

### Touch Target Issues
- **60 out of 76 interactive elements** have at least one dimension below 48px (the recommended minimum).
- **PO/FO toggle buttons:** Only 50x27px and 49x27px -- significantly undersized for comfortable tapping.
- **Category buttons:** 317x44-46px -- width is fine but height is slightly under the 48px minimum.
- **Input fields:** 343x31px -- height is too short for comfortable mobile input.
- **Hamburger menu button:** 40x40px -- slightly below 48px recommendation.

**Assessment:** MIXED. The responsive layout and content strategy are excellent, but touch target sizing needs improvement across most interactive elements. This is the most significant usability concern found.

---

## 7. CTA Visibility

### Desktop
| CTA | Location | Size | Style | Visibility |
|-----|----------|------|-------|------------|
| "Zavolat teraz" | Hero section, y=678 | 192x60px | Orange gradient button with phone icon | HIGH |
| "Zobrazit katalog" | Hero section, y=678 | 222x60px | Dark gray button with arrow | MEDIUM |
| "Kontaktujte nas" | Top-right announcement | 182x44px | Orange outlined button | LOW (tucked in corner) |
| Phone number | Top-right nav | 40x32px (icon only) | Orange phone icon | LOW |

- The primary CTA ("Zavolat teraz") uses the brand orange and stands out well against the dark hero background.
- The secondary CTA ("Zobrazit katalog") uses a muted dark gray -- this is intentional hierarchy but could be slightly more prominent.

### Mobile
- **Fixed bottom navigation** ensures persistent access to Pozicovna, Sluzby, and Kontakt -- always visible.
- Individual product cards do not appear to have visible "rent now" or "add to cart" CTAs in the catalog view, which could reduce conversion.

**Assessment:** GOOD on desktop, ADEQUATE on mobile. The fixed bottom nav on mobile is smart, but individual product-level CTAs could be more prominent.

---

## 8. Image Quality and Optimization

### Hero Image (Desktop)
- High-resolution workshop photograph with excavator, power tools on a workbench, and a generator.
- The image is dark enough to allow white text overlay without additional darkening overlays (or uses a subtle overlay).
- Composition is excellent -- equipment is arranged to fill the right side while leaving the left clear for text.

### Product Images
- Product photos appear to be on white/light backgrounds, which contrasts well against the dark card backgrounds.
- Images are consistently sized within their card containers.
- Products shown include angle grinders, belt sanders, and other construction tools -- relevant and recognizable.

### Brand Section
- Partner logos (Vercajch, Makita, Nivel System) are displayed with appropriate brand colors.

**Assessment:** GOOD. Images are high quality, appropriately sized, and well-composed. The hero image in particular is professionally done and sets the right tone for the business.

---

## Summary of Issues and Recommendations

### Critical
1. **Touch targets too small on mobile** -- 60/76 interactive elements are below 48px minimum. Priority fix for PO/FO toggles (27px height), input fields (31px height), and category buttons (44-46px height).

### Important
2. **Duplicate H1 tags** -- Two H1 elements on the page. Consolidate to one H1 for better SEO.
3. **Low-opacity secondary text** -- rgba(255,255,255,0.6) on dark backgrounds is borderline WCAG AA. Increase to 0.7-0.8 opacity.

### Minor
4. **Announcement banner visibility** -- "Coskoro otvarame!" panel in top-right may be overlooked. Consider a more prominent banner or modal for this important message.
5. **Product-level CTAs on mobile** -- Add visible rent/inquiry buttons on product cards to improve conversion funnel.
6. **Secondary CTA contrast** -- "Zobrazit katalog" button could use a slightly lighter background or border to distinguish it more from the dark background.

### Strengths
- Professional, cohesive dark theme with consistent orange accent branding
- Strong visual hierarchy with well-scaled typography
- Excellent hero section composition on desktop
- Thoughtful mobile-first catalog approach
- No horizontal scroll issues on mobile
- Clean spacing and grid alignment across all viewports
- Fixed bottom navigation on mobile for persistent access
- High-quality product and hero photography
- Logical content flow: Hero > Value Props > Catalog > FAQ > Blog > Footer

---

## Screenshots Reference

All screenshots saved to `screenshots/` directory:
- `desktop_1920_above_fold.webp` / `desktop_1920_full_page.webp`
- `laptop_1366_above_fold.webp` / `laptop_1366_full_page.webp`
- `tablet_768_above_fold.webp` / `tablet_768_full_page.webp`
- `mobile_375_above_fold.webp` / `mobile_375_full_page.webp`
