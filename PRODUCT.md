# Royal Stroje — royalstroje.sk

## What this is
Marketing + catalog website for Royal Stroje, a construction-equipment rental shop in Senec, Slovakia (rental + tool sales + delivery). The public site (`src/`) drives one conversion: **a phone call or quote request**. Separate apps: internal dashboard (`apps/dashboard`, app.royalstroje.sk) and Royal Card portal (`apps/portal`) — NOT covered by this file.

## Register
**Brand/marketing** — design IS the product. Long-scroll landing with embedded product catalog, service subpages, blog.

## Audience
- Primary: SK construction firms (právnické osoby) around Senec–Bratislava — foremen, small contractors. Price shown bez DPH.
- Secondary: private builders/DIY (fyzické osoby) — price s DPH.
- Mobile-heavy audience, often on site (stavba) with budget Android phones.

## Voice
Direct, industrial, local-trustworthy. Slovak only. Short claims backed by specifics ("do 24 hodín", "Senec – Bratislava", "20 rokov"). No corporate fluff.

## Visual system (committed — do not re-litigate)
- **Theme: dark elements on light background.** Page bg `#FAFAFA`; cards/chrome are dark zinc (`from-zinc-900 to-zinc-950`, `border-white/10`). Heroes light (PageHero white), footer black. Owner-approved direction (session 30/31).
- **Brand color:** orange `#FF6600` (`orange-primary`), hover `#ff8533`. Orange = action/accent. Rule: **one filled-orange element per component** — don't spray orange.
- **Type:** Archivo (display, 600–900) + Source Sans 3 (body, 400–900), Google Fonts, latin-ext. Headings `font-black`, tracking −0.015em global. (Body was Manrope until session 34 — owner found its narrow word space hard to read; Source Sans 3 = humanist, open apertures, wider word space, contrast axis vs grotesque Archivo.)
- **Primitives** (src/index.css): `.eyebrow` (use sparingly — heroes and true kickers only, NOT above every section), `.hairline`, `.btn-primary`, `.btn-secondary` (dark bg), `.card-light`, `.input-light`, `.btn-outline-light` (light bg), `.reveal*` scroll animations.
- **Shared components:** `PageHero` (subpage heroes), `CtaBand` (dark orange CTA band), `ContentSection` (light section wrapper).

## Hard constraints
1. **GPU guard (session 21):** NEVER put `backdrop-filter` on fixed/sticky elements; all animation end-states must be `transform: none`. Budget Android (Mali GPU) produces rendering garbage otherwise.
2. **Reveal guard:** content must be visible without JS — hidden base states only under `html.js-reveal` (set in index.html). Motion is enhancement, never a gate.
3. **Branch discipline:** work on `dev` (auto-deploys to Vercel preview/staging); `main` = production royalstroje.sk. Owner reviews staging before merges.
4. Keep all texts/CTAs/phone numbers unless asked; prices and services must stay truthful (no invented offers).
5. Touch targets ≥ 44px on mobile.

## Conversion surfaces (protect these)
- `tel:+421948555551` links (header, cards, CTA bands, FAQ)
- QuoteForm (homepage sidebar/mobile) + ContactForm (Kontakt, Cenová ponuka) — EmailJS + reCAPTCHA v3, domain-restricted keys
- WhatsApp `wa.me/421948555551`
