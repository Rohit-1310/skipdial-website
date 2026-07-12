# SkipDial — Design System

> **"White does the talking."** The site is 90% white and neutral. Color appears only in
> small, deliberate doses inside components — never as full-section backgrounds, with one
> exception per page: the final gradient CTA band.

This document is the reference for anyone extending the site. Every rule here is already
implemented; file paths point at the source of truth.

---

## 1. Tokens

Defined in [`src/app/(frontend)/globals.css`](src/app/(frontend)/globals.css) as Tailwind v4
`@theme` variables — use the generated utilities (`bg-bg-soft`, `text-ink-2`, `border-line`,
`text-accent`, `rounded-card`…), never raw hex in components.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page canvas |
| `--color-bg-soft` | `#FAFAF8` | Barely-visible tint for the audio + demo-form sections only |
| `--color-ink` | `#16181D` | Headlines, and the dark footer background |
| `--color-ink-2` | `#5A6072` | Body copy (`text-body` helper class) |
| `--color-line` | `#ECEDF1` | 1px hairlines, card borders, idle waveform bars |
| `--color-accent` | `#5B5BF0` | Buttons, links, icon strokes, focus rings, active-nav underline |
| `--color-accent-soft` | `#EEEEFE` | Icon tile backgrounds only |
| `--color-accent-warm` | `#FF8A3D` | **Restricted:** orb gradient, 404 chip dot, one chip dot — nothing else |
| `--radius-card` | `18px` | All cards |

**Gradient** (orb + final CTA band only): indigo → warm orange, soft radial. See
`.orb-gradient` and the inline band gradient in
[`CtaBandSection.tsx`](src/components/blocks/CtaBandSection.tsx). Never reuse it elsewhere.

## 2. Typography

Loaded via `next/font` in [`src/app/(frontend)/layout.tsx`](src/app/(frontend)/layout.tsx)
(self-hosted, zero layout shift) and mapped in `@theme inline`:

| Role | Font | Utility / class |
|---|---|---|
| Display | **Bricolage Grotesque** 600/700 | `.h-display` (h1, clamp 2.6→4.5rem, tracking −0.025em), `.h-section` (h2), `.h-card` (card titles), `font-display` |
| Body | **Inter** 400/500 | default `body`, 1.0625rem / 1.75 |
| Mono detail | **IBM Plex Mono** 400/500 | `.mono-label` — eyebrows, timestamps, card indices (`01`), chips, captions, tags |

**The eyebrow pattern** is the site's typographic signature: mono uppercase label + a small
accent dot that breathes (`.eyebrow-dot`, CSS keyframes). Use the `<Eyebrow>` component from
[`typography.tsx`](src/components/typography.tsx).

**Emphasis in CMS copy:** body fields are textareas; blank line = new paragraph,
`**text**` = bold. Rendered by `BodyText` / `renderEmphasis` — don't parse markdown anywhere else.

## 3. Layout language

- **Container:** `.container-site` — max-width 1160px, centered, 1.5–2rem side padding.
- **Vertical rhythm:** sections are `py-16 md:py-[120px]` (set once in
  [`RenderBlocks.tsx`](src/components/RenderBlocks.tsx), not per-section).
- **Section separation:** 1px `--color-line` hairlines (`.hairline-t`) — **not** background
  color changes. The only tinted sections are `audioSample` and `demoCallForm` (`bg-bg-soft/70`),
  also decided centrally in `RenderBlocks`.
- **Cards:** `.card` — white, 1px line border, 18px radius. Hover: border → accent,
  lift −4px, and the icon ticks 8° once (`.card-icon`). No heavy shadows anywhere.
- **Footer** is the dark bookend: `bg-ink`, white logo variant, three columns.
- **Breakpoints in use:** `sm` (hero orb visibility), `md` (rhythm, footer grid),
  `lg` (desktop nav + dropdown, steps/list two-column splits).

## 4. The Voice Orb

The single memorable element — a breathing gradient orb (scale 1→1.06, 4s loop) that emits a
faint expanding ring every ~4s, like a call being answered.
Component: [`VoiceOrb.tsx`](src/components/VoiceOrb.tsx).

**It appears in exactly three places. Do not add a fourth.**

1. **Home hero** (230px) with three floating mono chips orbiting it.
2. **Header CTA** (16px) — appears via Framer `layoutId="voice-orb"` morph once the hero orb
   scrolls out of view. Coordination lives in [`OrbContext.tsx`](src/components/OrbContext.tsx)
   (IntersectionObserver in the hero hands off to the header). On inner pages the mini orb is
   always in the header CTA.
3. **Gradient CTA band** (150px, decorative, no `layoutId`).

Framer runs on rAF, so the orb pauses automatically on hidden tabs; `useReducedMotion`
renders it static with no ring.

## 5. Motion

Shared variants in [`src/lib/motion.ts`](src/lib/motion.ts): `fadeUp`, `fadeIn`, `scaleIn`,
`stagger`, `viewportOnce`. Global rules:

- Animate **transform + opacity only**. Ease `[0.22, 1, 0.36, 1]` (`EASE`).
- Reveals 0.5–0.7s via `<Reveal>` / `<RevealItem>` (`whileInView`, `once: true`); hovers 0.15s (CSS).
- **Every** animated component checks `useReducedMotion()` and collapses to simple fades /
  static rendering. This is mandatory for new components.
- Max one attention-seeking element per viewport. White space is part of the design — don't fill it.

Implemented spec items and where they live:

| Motion | Where |
|---|---|
| Hero sequence: eyebrow → H1 masked word rise (0.045s stagger) → body/CTAs → orb spring → chips pop + 6–8s drift | `HeroSection.tsx` |
| Orb breathing + ring pulse | `VoiceOrb.tsx` |
| Orb → header morph on scroll | `OrbContext.tsx` + `Header.tsx` |
| Sticky header: transparent → white blur + hairline after 24px; active-link underline slides (`layoutId="nav-underline"`) | `Header.tsx` |
| Eyebrow dot breathing | `globals.css` |
| Steps connector line draws on scroll (SVG `pathLength`), horizontal (home) + vertical (how-it-works) | `StepsSection.tsx` |
| Card hover lift + border + icon tick | `globals.css` `.card` |
| Magnetic primary CTA (24px pull, fine pointers only) + sheen sweep + tap 0.98 | `MagneticButton.tsx`, `.btn-primary .sheen` |
| Audio player: play/pause morph, bars animate only during playback, mono timer | `AudioPlayer.tsx` + `.wave-bar` |
| Logo marquee ≥30s loop, pauses on hover, edge fade mask | `Marquee.tsx` + `.marquee` |
| Page transitions: 0.25s fade | `(frontend)/template.tsx` |
| Mobile menu: right sheet, staggered items, focus-trapped, scroll-locked | `Header.tsx` |

Not implemented: stat count-ups (spec item 5) — the real SkipDial content has no numeric
stat cards. `NumberedList` covers the ladder pattern instead. Transcript type-in was dropped
for the same reason (no transcript content on the live site).

## 6. Components

**Primitives** (in `src/components/`): `VoiceOrb`, `Reveal`/`RevealItem`, `MagneticButton`,
`AudioPlayer`, `Accordion`, `Marquee`, `Eyebrow`/`BodyText`, `StrokeIcon`
([`icons.tsx`](src/components/icons.tsx) — 12 stroke icons, 1.5px, always `text-accent` on
an `accent-soft` tile).

**Section blocks** — one Payload block ⇄ one React section, switched in `RenderBlocks.tsx`:

| Block | Section | Used for |
|---|---|---|
| `hero` | `HeroSection` | Home (orb + chips) / inner (eyebrow + H1 + breadcrumb on nested slugs) |
| `painPoints` | `PainPointsSection` | Big-index pain cards |
| `steps` | `StepsSection` | `cards` (home 4-up + connector) / `rows` (how-it-works + vertical line) |
| `audioSample` | `AudioSampleSection` | "Hear it Live!" — soft-tinted, gets `id="sample"` for `#sample` anchors |
| `checklist` | `ChecklistSection` | Tick chips, with or without copy column |
| `featuresGrid` | `FeaturesGridSection` | Icon tiles, 3-up |
| `cardGrid` | `CardGridSection` | Numbered 5-card flows; `small` = compact 4-up sub-cards |
| `contentSplit` | `ContentSplitSection` | Heading/body left, tick list-groups right |
| `ctaBand` | `CtaBandSection` | `plain` (white, centered) / `gradient` (one per page, at the end) |
| `accordion` | `AccordionSection` | Integration categories; optional FAQPage JSON-LD |
| `logoMarquee` | `LogoMarqueeSection` | Grouped drifting wordmarks |
| `demoCallForm` | `DemoCallFormSection` | Live demo-call form (honeypot, aria-live states) |
| `schedulerEmbed` | `SchedulerEmbedSection` | Reserved 700px booking embed (no CLS) |
| `numberedList` | `NumberedListSection` | Mono-numbered ladders |
| `richText` | `RichTextSection` | Lexical content in a 680px `.prose-skip` column |

## 7. Accessibility (WCAG AA)

- Visible 2px accent focus ring on `:focus-visible`, everywhere.
- Never set accent-warm (orange) text on white — contrast fails; it's decorative only.
- Skip link (`.skip-link`) to `#main`; one `h1` per page; semantic landmarks.
- Accordion buttons carry `aria-expanded`/`aria-controls`; the audio player is a real
  `<button>` with state-aware labels; form errors use `aria-invalid` + `aria-live="polite"`.
- Mobile sheet: `role="dialog"`, focus trap, Escape closes, body scroll locked.
- Decorative elements (orb, waveform, marquee duplicate, chips dots) are `aria-hidden`.
- Media uploads require alt text (enforced by the CMS).

## 8. Adding a new section type

1. Define the block in [`src/blocks/index.ts`](src/blocks/index.ts) with an `interfaceName`,
   and add it to `allBlocks`.
2. `npm run generate:types` — the interface appears in `payload-types.ts`.
3. Build the section component in `src/components/blocks/` using the primitives above
   (Reveal for entrances, tokens for color, `.h-section` for the heading).
4. Add a case to `RenderBlocks.tsx` (and to `softSections` there if it needs the tint).
5. Seed an example in `src/seed/` so the block is demonstrated.

## 9. Do / Don't

- **Do** keep new sections white with hairline separation; express hierarchy with type and space.
- **Do** route every visible string through the CMS — zero hardcoded copy.
- **Don't** add a second colored section to a page, a fourth orb, scroll-jacking, parallax
  (beyond the ±10px chip drift), or animated body text.
- **Don't** introduce new fonts, shadows, or hex values outside the token set.
- **Don't** use `Math.random()`/`Math.sin()` for render-time visual variation — server and
  client must agree bit-for-bit (see `barRest` in `AudioPlayer.tsx` for the integer-math pattern).
