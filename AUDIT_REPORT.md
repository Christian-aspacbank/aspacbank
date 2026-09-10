# ASPAC Bank Website Audit & Improvements

**Site:** https://www.aspacbank.com/ · **Stack:** CRA + CRACO, React Router, Vercel
**Scope:** Technical SEO, structured data, accessibility (WCAG 2.2 AA), security, and performance.
**Approach:** Targeted, reviewable fixes on the existing codebase — no redesign, no new branding, no fabricated content (rates, dates, legal copy, coordinates).

---

## 1. Audit summary

A read-only audit (SEO/metadata, accessibility, performance, security/forms) of the existing site found a generally mature codebase — it already had a working `Seo.tsx` component, `robots.txt`, `sitemap.xml`, and baseline Vercel security headers — with the following notable issues:

| # | Finding | Severity | Location |
|---|---|---|---|
| 1 | Unauthenticated, GET-triggerable endpoint sends real email via live Azure/Graph credentials | **High** | `api/test-mail.js` |
| 2 | Rate limiting used a per-instance in-memory `Map`, ineffective on stateless Vercel functions | **High** | `api/submit.js` |
| 3 | No Origin/Referer check on the form submission endpoint | **Medium** | `api/submit.js` |
| 4 | Internal error detail (including a full PII fallback payload) echoed back to the client on failure | **Medium** | `api/submit.js` |
| 5 | No HSTS; CSP only set `frame-ancestors 'none'` | **Medium** | `vercel.json` |
| 6 | Dead `/privacy` footer link (404) | **Medium** | `src/module/FooterBadge.tsx` |
| 7 | Two external links missing `rel="noopener noreferrer"` | **Low** | `src/components/AspacChatbot.tsx` |
| 8 | `.env.production` tracked in git, not covered by `.gitignore` (content was benign) | **Low** | `.gitignore` |
| 9 | `/saturday-branches` missing from `sitemap.xml` despite being indexable and linked from the homepage | **Medium** | `public/sitemap.xml` |
| 10 | Inconsistent/misleading page titles (`Branches`, `Careers`, `ExplorePage`) | **Low** | `src/Pages/*.tsx` |
| 11 | Canonical `/annual-reports` page shipped no structured data while its noindexed duplicates did | **Low** | `src/Pages/AnnualReports.tsx` |
| 12 | No skip-to-content link; keyboard users tab through the full nav on every page | **Medium** | `src/App.tsx` |
| 13 | Two focus-visible gaps (`outline-none` with no replacement) | **Low** | `ChatBot.tsx`, `DepositAccount.tsx` |
| 14 | Yellow-on-white text failing WCAG contrast (~1.6:1) | **Medium** | `src/Pages/Loans.tsx` |
| 15 | Unlabeled icon-only dismiss button | **Low** | `src/Pages/DepositAccount.tsx` |
| 16 | Form inputs not programmatically associated with their `<label>`s; errors not exposed to assistive tech | **Medium** | `ApplyNowModal.tsx`, `AttachmentField.tsx` |
| 17 | Modals (`AlertDialog`, `ApplyNowModal`, `ChatBot`, partially `AspacChatbot`) lacked focus trap and/or focus restoration | **Medium** | 4 components |
| 18 | Carousels ignored `prefers-reduced-motion` and had no keyboard navigation | **Medium** | `Testimonials.tsx`, `Parallax.tsx`, `Branches.tsx` |
| 19 | Homepage hero shipped a 1.17MB JPEG when an already-converted 55KB WebP sat unused next to it | **Medium** | `src/data/hero.ts` |
| 20 | No preload hint for the homepage's likely LCP image | **Low** | `public/index.html` |
| 21 | Every route statically imported into the main bundle, including `pdfjs-dist` (only needed by 2 report pages) | **High** (perf) | `src/App.tsx` |
| 22 | Contradictory `preload="none"` + `autoPlay` on homepage video | **Low** | `src/WelcomePage.tsx` |

Full detail on each finding (file:line, reasoning) was produced by four parallel research passes during the audit; the table above is the condensed version.

---

## 2. What was implemented

### Security
- **Deleted `api/test-mail.js`** — removes the unauthenticated mail-sender entirely.
- **`api/submit.js`** — rewired rate limiting onto `@upstash/redis` (already a dependency) with a graceful fallback to the old in-memory check if Redis env vars aren't configured; added an Origin/Referer allowlist (production domain + `*.vercel.app` previews + localhost in dev); replaced every client-facing error field with a generic message, moving detail to `console.error` only — including removing a `fallback` field that was leaking the applicant's full name, email, mobile, school, and loan amount back to the client on failure.
- **`vercel.json`** — added `Strict-Transport-Security` and replaced the placeholder CSP with one scoped to what the app actually loads (self, Google Fonts, the chatbot's Railway backend). All pre-existing headers kept as-is.
- **`AspacChatbot.tsx`** — added missing `rel="noopener noreferrer"`.
- **`.gitignore`** — now covers `.env.production`.
- **`FooterBadge.tsx`** — removed the two dead `/privacy` links (per your decision) — see follow-ups below.

### SEO & structured data
- Added `/saturday-branches` to `public/sitemap.xml`.
- Fixed inconsistent titles in `Branches.tsx` and `Careers.tsx`.
- Added real `CollectionPage`/`ItemList` JSON-LD to `AnnualReports.tsx`, built from its actual report data (no fabricated fields).
- Rewrote `ExplorePage.tsx`'s title/description to match its actual "Simply Safe Banking" content.
- Added a clarifying comment in `public/index.html` documenting that the global Organization/WebSite JSON-LD is intentional and distinct from per-route schema.

### Accessibility (WCAG 2.2 AA)
- Skip-to-main-content link in `App.tsx`.
- Visible focus rings restored on the ChatBot input and DepositAccount FAQ trigger.
- Fixed the yellow-on-white contrast failure in `Loans.tsx` by reusing the existing brand green already used for other headings on the same cards.
- Labeled the icon-only dismiss button in `DepositAccount.tsx`.
- Full label/`id`/`aria-describedby`/`aria-invalid` wiring across every field in `ApplyNowModal.tsx` and `AttachmentField.tsx`; extended `SearchableSelect.tsx` to accept `aria-labelledby`.
- New shared hook `src/hooks/useModalA11y.ts` (focus trap, Escape-to-close, focus restoration), applied to `AlertDialog`, `ApplyNowModal`, `ChatBot`, and `AspacChatbot` (the last only needed the trap/restoration piece added, since it already had Escape handling).
- New shared hook `src/hooks/usePrefersReducedMotion.ts`, applied to disable autoplay/parallax motion in `Testimonials.tsx`, `Parallax.tsx`, and `Branches.tsx`; all three carousels also gained Swiper's `Keyboard`/`A11y` modules.

### Performance / Core Web Vitals
- `src/data/hero.ts` now points a hero slide at the existing `Simplysafe.webp` (55KB) instead of `Simplysafe.jpg` (1.17MB).
- Added a `<link rel="preload" as="image">` for the homepage's first/default hero image.
- Converted every route in `App.tsx` to `React.lazy` behind a single `<Suspense>` boundary — **the initial JS bundle dropped by 146KB gzipped**, since `pdfjs-dist` and other route-specific code no longer ship to every visitor.
- Fixed the contradictory `preload="none"` + `autoPlay` on the homepage video (`preload="metadata"`).

---

## 3. Before / after (measured)

| Metric | Before | After |
|---|---|---|
| Initial JS bundle (gzip) | ~331 KB (`main.js`) | **185.69 KB** `main.js` + on-demand chunks |
| Hero slide 4 image | 1.17 MB JPEG | 55 KB WebP |
| `sitemap.xml` entries | 14 | 15 (`/saturday-branches` added) |
| CSP directives | `frame-ancestors 'none'` only | Full `default-src`/`script-src`/`style-src`/`font-src`/`img-src`/`connect-src`/`object-src`/`base-uri`/`form-action`/`frame-ancestors` |
| HSTS header | absent | `max-age=63072000; includeSubDomains; preload` |
| Unauthenticated mail-sending endpoint | live in production | removed |

---

## 4. Verification performed

- `npm run build` — compiles successfully, no new TypeScript errors.
- `vercel.json` and `public/sitemap.xml` validated (JSON parse / tag-balance check).
- `api/submit.js` and `api/test-mail.js` removal checked for stray references (`grep -r "test-mail"` — none found).
- `npm test` — the one existing suite (`App.test.tsx`) fails on `react-router-dom` module resolution; confirmed via `git stash` that this **pre-exists** these changes and is unrelated.
- Local API server (`server.js`) started and confirmed listening on port 4000 to unblock manual testing of the Apply Now form.

---

## 5. Needs confirmation from management / legal / IT

- **Privacy Notice / Terms of Use page** — no real page exists; the dead footer link was removed rather than invented. Needs legal-approved content and a link back in the footer.
- **BSP disclosures, fraud-warning guidance, deposit-insurance (PDIC) statement wording** — not drafted; flagged for legal/compliance to provide accurate copy.
- **Upstash Redis env vars** (`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`) — must be provisioned in the Vercel project for the new rate limiter to take effect; it fails open to the old per-instance limiter otherwise.
- **`JobPosting` `datePosted`/`validThrough`** — no source-of-truth date exists in `Careers.tsx`'s job data; needs real dates from whoever maintains it.
- **Branch `GeoCoordinates`/phone numbers** already embedded in `Branches.tsx`'s JSON-LD — not fabricated, but unverified against the bank's official branch register.
- **~27MB of orphaned, unreferenced images** in `public/` (e.g. `services.jpg`, `PYM-digital-poster.jpg`, `Sample1.png`) — flagged, not deleted, in case they're held for a future campaign.
- **Broader JPEG/PNG → WebP conversion** of the remaining large images — would require adding an image-processing dependency (e.g. `sharp`); not added without your go-ahead.
- **Removing unused dependencies** (`react-modal`, `@react-google-maps/api`) — left alone to keep this change set minimal.
- **Google Search Console / Bing Webmaster verification tags** — will add only when given the actual verification codes.

---

## 6. Files changed

```
.gitignore
api/submit.js
api/test-mail.js                       (deleted)
public/index.html
public/sitemap.xml
src/App.tsx
src/Pages/AnnualReports.tsx
src/Pages/Branches.tsx
src/Pages/Careers.tsx
src/Pages/DepositAccount.tsx
src/Pages/ExplorePage.tsx
src/Pages/Loans.tsx
src/WelcomePage.tsx
src/components/AlertDialog.tsx
src/components/ApplyNowModal.tsx
src/components/AspacChatbot.tsx
src/components/AttachmentField.tsx
src/components/ChatBot.tsx
src/components/SearchableSelect.tsx
src/components/Testimonials.tsx
src/data/hero.ts
src/hooks/useModalA11y.ts              (new)
src/hooks/usePrefersReducedMotion.ts   (new)
src/module/FooterBadge.tsx
src/module/Parallax.tsx
vercel.json
```

Nothing has been committed — these changes are in the working tree on `master`, ready for you to review before committing/pushing per the workflow in `DEPLOYMENT.md`.
