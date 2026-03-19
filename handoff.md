# RoyalStroje -- Session Handoff

## Session Summary
| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 1 | 2026-03-18/19 | MVP Complete (Sprints 1-5) | Full rental management system: dashboard, portal, Supabase backend, invoicing, reports |
| 2 | 2026-03-19 | Design Rebrand + Bug Fixes | Orange #FF6600 rebrand, sidebar redesign, PDF diacritics fix, VAT 23% fix, portal RLS fix |

## What Was Done (Session 2) -- Design Rebrand + Critical Fixes

### Design Rebrand (Dashboard + Portal)
1. **Color palette swap** -- Replaced gold #ffc107 with orange #FF6600 across both Tailwind configs. New `royal` scale from royal-50 to royal-900. Files: `apps/dashboard/tailwind.config.js`, `apps/portal/tailwind.config.js`.
2. **CSS animation system** -- Added shine sweep, card lift, table row hover with orange accent, input glow, button press, page enter animations. Files: `apps/dashboard/src/index.css`, `apps/portal/src/index.css`.
3. **Dashboard UI overhaul** -- Gradient orange CTA buttons (rounded-full + glow shadow), softer card borders, modal backdrop blur + slide-up, improved spinner, orange-tinted pagination. Updated all 9 UI components in `components/ui/` and all 24 page files.
4. **Portal UI overhaul** -- Same treatment: gradient buttons, card lift effects, shine sweep on hero, image scale on hover, page enter animations. Updated all 8 portal source files.
5. **Sidebar redesign** -- Light sidebar with warm gradient bg, real RS logo (`znak.webp`), orange CTA button, expanded stats panel (6 metrics: active rentals, monthly revenue, clients, equipment, today events, overdue invoices in red), "Made by M.D.N Tech" credit with logo linking to mdntech.org. Custom right border with orange glow. File: `Sidebar.jsx`, `Header.jsx`, `DashboardLayout.jsx`.
6. **Table alignment fix** -- Removed broken `position: relative` on `<tr>` elements, switched to `td:first-child` border-left approach. Added `table-fixed` layout with `<colgroup>` column widths to DataTable. Files: `DataTable.jsx`, `EquipmentTable.jsx`, `ClientDirectory.jsx`, `InvoiceList.jsx`.

### PDF Diacritics Fix
7. **Embedded Inter font for PDFs** -- Downloaded full Inter TTF (Regular + Bold, ~830KB total) from official GitHub release. Created `pdfFonts.js` utility that fetches/caches fonts and registers with jsPDF. Updated all 3 PDF generators to use async `createPdfDoc()` with Inter font. Slovak characters (DODAVATEL, Sadzba/den, etc.) now render correctly. Files: `pdfFonts.js`, `generateInvoicePdf.js`, `generateQuotePdf.js`, `generateAgreementPdf.js`, `public/fonts/Inter-*.ttf`.

### VAT + RLS Fixes
8. **VAT 23% fix** -- Frontend now passes pre-calculated `subtotal`, `vat_amount`, `total` when creating reservations (both dashboard and portal), so DB trigger is no longer the sole source of truth. Migration `007_fix_portal_items_insert.sql` also updates the DB function. Files: `NewDeal.jsx`, `Booking.jsx`, `007_fix_portal_items_insert.sql`.
9. **Portal booking RLS fix** -- Added `items_own_insert` INSERT policy on `reservation_items` for portal users. Previously only SELECT was allowed. Migration: `supabase/migrations/007_fix_portal_items_insert.sql`. Applied to live DB.
10. **Stats hook expanded** -- `useDashboardStats` now queries overdue invoices and active equipment count in addition to existing metrics.

## What To Do Next
| Priority | Task | Notes |
|----------|------|-------|
| 1 | Verify Vercel deployments | Dashboard (app.royalstroje.sk) and Portal (portal.royalstroje.sk) -- add custom domains, set Supabase redirect URLs |
| 2 | Add IBAN to company info | Currently placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` |
| 3 | Commit + push Session 2 changes | ~40 files changed, not yet committed |
| 4 | Email notifications | Send quote/invoice PDFs via email (EmailJS or Supabase Edge Function) |
| 5 | Supabase Edge Functions | /generate-quote, /invite-royal-card, /dashboard-stats, /check-availability |
| 6 | WhatsApp Business API | Send quotes directly via WhatsApp (post-MVP) |
| 7 | Online payment | Stripe/GoPay integration (post-MVP) |

## Key Files
| File | Purpose |
|------|---------|
| `apps/dashboard/` | Internal team dashboard (port 3001) |
| `apps/portal/` | Royal Card client portal (port 3002) |
| `packages/shared/` | Shared Supabase client + constants |
| `supabase/migrations/` | DB schema (001-007), RLS, functions |
| `supabase/seed.sql` | Equipment catalog seed (142 items) |
| `apps/dashboard/src/lib/companyInfo.js` | Royal Stroje company details for PDFs |
| `apps/dashboard/src/lib/pdfFonts.js` | Inter font loader for jsPDF (fixes diacritics) |
| `apps/dashboard/src/lib/generateQuotePdf.js` | Quote PDF generator |
| `apps/dashboard/src/lib/generateAgreementPdf.js` | Rental agreement PDF |
| `apps/dashboard/src/lib/generateInvoicePdf.js` | Invoice/proforma/credit note PDF |
| `apps/dashboard/public/fonts/` | Inter TTF fonts for PDF generation |
| `apps/dashboard/public/znak.webp` | RS logo (orange shield, transparent bg) |
| `apps/dashboard/public/logo_mdntech.png` | M.D.N Tech logo for sidebar credit |

## Architecture
```
RoyalStroje/
  src/                    # Public website (royalstroje.sk)
  apps/
    dashboard/            # Internal app (app.royalstroje.sk) -- port 3001
    portal/               # Royal Card portal (portal.royalstroje.sk) -- port 3002
  packages/
    shared/               # Shared types, Supabase client, constants
  supabase/
    migrations/           # 7 SQL migrations
    seed.sql              # Equipment catalog data
```

## Supabase
- **Project:** royal-stroje-system (Pro plan, EU region)
- **URL:** https://dvmdoczuppmcumykhktm.supabase.co
- **Tables:** equipment_categories, equipment_subcategories, equipment, clients, reservations, reservation_items, invoices, partners, royal_card_invitations, activity_log
- **Auth:** Email/password, roles in user_metadata (admin, staff, royal_card)
- **Admin user:** info@royalstroje.sk (app_role: admin)
- **RLS note:** Migration 007 added `items_own_insert` policy and fixed VAT function to 23%. Applied to live DB on 2026-03-19.
