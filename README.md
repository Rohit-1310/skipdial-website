# SkipDial.ai — Marketing Website

Rebuild of [skipdial.ai](https://www.skipdial.ai/) — Next.js 16 (App Router) + Payload CMS 3 in one codebase, one deploy, ₹0 CMS subscription.

- **Frontend:** Next.js 16, TypeScript strict, Tailwind CSS v4 (tokens as CSS variables), Framer Motion
- **CMS:** Payload 3 embedded at `/admin` — every visible word on the site is editable, pages are built from reorderable section blocks, publishing revalidates the live site in seconds (no redeploy)
- **Fonts:** Bricolage Grotesque (display) · Inter (body) · IBM Plex Mono (labels/timestamps), self-hosted via `next/font`
- **Design system:** see [design.md](design.md) — tokens, typography, the Voice Orb rules, motion spec, block inventory, and how to add a new section

## Quick start

```bash
npm install
npm run seed     # creates the SQLite schema + loads ALL site content
npm run dev      # http://localhost:3000  ·  admin at /admin
```

**Admin login (created by seed):** `admin@skipdial.ai` / `skipdial-admin-2026`
(override with `SEED_ADMIN_PASSWORD` before seeding — change it before any shared deploy)

Re-running the seed skips if content exists; `SEED_FORCE=true npm run seed` wipes and reloads.

## Database

Local dev runs on a SQLite file (`skipdial-website.db`) — zero setup. To switch to Postgres
(Neon / Supabase / Cloud SQL), change one line in `.env`:

```
DATABASE_URI=postgresql://user:password@host:5432/skipdial_website
```

The adapter is selected automatically in `src/payload.config.ts` based on the URI scheme.
Note: SQLite data does not migrate automatically — run `npm run seed` again after switching.

## Content model

| Where | What |
|---|---|
| `pages` | Block-based page builder (15 section blocks: Hero, PainPoints, Steps, AudioSample, Checklist, FeaturesGrid, CardGrid, ContentSplit, CtaBand, Accordion, LogoMarquee, DemoCallForm, SchedulerEmbed, NumberedList, RichText) |
| `posts` | Blog with drafts, autosave, tags, related posts, per-post SEO |
| `formSubmissions` | Every demo-call submission; forwarded to `DEMO_WEBHOOK_URL` when set |
| `testimonials`, `faqs` | Ready-to-use collections (empty until real content exists) |
| `siteSettings` global | Brand, logos, contact info, socials, default SEO, 404 copy |
| `navigation` global | Header links (incl. Industries dropdown), CTA, footer links |

Roles: `admin` (everything) and `editor` (content only — no settings, users, or globals).

Live preview: open any page/post in the admin and use the preview panel; draft mode is
served via `/next/preview` (guarded by `PREVIEW_SECRET`).

## Copy fixes vs. the live site

The seed content fixes the 8 issues documented in the rebuild reference:
duplicated Inbound card #5, Home-Services sub-cards copied from Outbound, the
"Service Call"/missing-"Supports" headings on Professional Offices, the gerund list on
Real Estate, the homepage "Contact us" link pointing at `/`, and the stray repeated
heading. The integrations logo grid now has a defined (placeholder) logo set.

## Remaining TODOs (marked in code/CMS)

- `DEMO_WEBHOOK_URL` — n8n webhook for form submissions (`.env`)
- Scheduling embed URL on `/request-a-free-demo` (Scheduler Embed block)
- Privacy Policy text — placeholder; capture verbatim from the live site before launch
- Real social profile URLs in Site Settings
- Industry-specific audio samples (every page currently uses the real-estate recording)
- Integration logo images (text wordmarks render in the marquee until assets are confirmed)
- `NEXT_PUBLIC_ANALYTICS_ID` + the analytics snippet in `(frontend)/layout.tsx`

## Scripts

| Command | |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run seed` | Populate DB + media (idempotent; `SEED_FORCE=true` to reset) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |
