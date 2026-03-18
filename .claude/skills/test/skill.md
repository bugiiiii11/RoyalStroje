---
description: Run frontend checks -- lint, build, and bundle analysis
---

Run available checks for the RoyalStroje frontend project and report results. No new dependencies needed.

## Arguments

Parse the user's `/test` arguments:
- `/test` or `/test all` -- run everything
- `/test lint` -- ESLint only (fast)
- `/test build` -- Vite build check only
- `/test bundle` -- build + show bundle size breakdown

## Step 1 -- Run checks (parallelize where possible)

Run these in parallel:

- **Lint:** `npm run lint 2>&1 | tail -30`
- **Build:** `npm run build 2>&1 | tail -30`

Capture exit code and last lines of output for each.

If the user requested `/test bundle`, after build completes also run:
- **Bundle size:** `ls -lhS dist/assets/*.js dist/assets/*.css 2>/dev/null | head -20`

## Step 2 -- Present results

Show a summary table:

### Test Results

| Check | Result | Details |
|-------|--------|---------|
| ESLint | PASS/FAIL | <error count or "clean"> |
| Vite Build | PASS/FAIL | <build time or error> |
| Bundle Size | INFO | <total JS/CSS size> |

### Summary
- **X/Y checks passed**
- If any failed, show the relevant error output (full errors only for failures, keep it concise)
- If build passed, note the total bundle size

## Rules

- Do NOT install new dependencies
- Do NOT modify any source files
- Capture output but keep it concise -- show full errors only for failures
- If a check hangs (>60s), kill it and report as TIMEOUT
- Build artifacts go to `dist/` -- this is gitignored, safe to generate
- Run all commands from the project root (no --prefix needed)
