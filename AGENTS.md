<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio App — Project Conventions

This is BhargavLal KrishnaReddy Pulluru's personal portfolio site, built with Next.js App Router (static export), Tailwind CSS v4, Framer Motion, and lucide-react. It renders the content of his resume as an animated, glassmorphic, colorful-dark single page.

**Living document rule**: whenever a design decision, color/theme choice, library choice, or content-structure change is made, update this file (the relevant section below) in the same change. Don't let this doc drift from the actual code.

## Content management (single source of truth)

All resume content lives in [app/data/resume.ts](app/data/resume.ts) as typed JS objects — no content is hardcoded in components. To add/edit/remove content:

- **Profile/contact info** → edit the `profile` object.
- **Skills pills** → edit the `skills` array.
- **Key expertise cards** → edit `keyExpertise` (each item needs a `title` matching an icon/accent mapping in the relevant section component — see below).
- **Work history** → edit the `experience` array. Each entry supports flat `bullets` or nested `subRoles` (used for HCLTech, which has PayPal + Epiroc client engagements under one employer).
- **Projects** → edit the `projects` array (newest first — to add a new project, prepend an entry; no component changes needed). Each `Project` has `title`/`company`/`location`/`period`/`description`, plus optional `technologies` (same comma-separated format as `experience[].technologies`, renders as `TechBadge`s) and `link` — both are safe to omit and fill in later. `Projects.tsx` renders them as a 2-column grid of cards with a "Read more" toggle for long descriptions (`line-clamp-3` past ~160 chars).
- **Education / achievements / certificates / interests** → edit their respective arrays.

Components map over this data and never need edits just to update text. Restart isn't required — `next dev` hot-reloads.

Profile photo: `public/my_photo.jpg`, referenced via `profile.photo`. To swap it, replace the file (keep the same filename) or update `profile.photo` to point at a new file in `public/`.

## Theme / color system

**Single source of truth for every color in the app: CSS custom properties in [app/globals.css](app/globals.css) `:root`, re-exposed as Tailwind v4 tokens via `@theme inline`.** This generates real utility classes (`bg-space`, `text-ink`, `border-line`, `from-cyan`, `ring-indigo/30`, etc.) — never hardcode a Tailwind default color (`zinc-*`, `neutral-*`, `violet-*`...) in a component; always use a token below so a future palette change is a one-file edit.

**Palette identity: green / grass / olive.** The site was originally cyan/indigo/purple; every accent and semantic token below was recolored to a cohesive green family while keeping the same token *names* (so `theme.ts`, `sectionAccents`, and every `accent` prop across components kept working unchanged — only the hex values moved). Don't reintroduce blue/purple/violet hues into these tokens; if a wholly new hue is ever needed, add a new CSS var instead of repurposing one of these.

| Token | Hex | Utility examples | Use |
|---|---|---|---|
| `space` | `#F5F7EE` (light) / `#050904` (dark) | `bg-space` | Page background (top of gradient) — warm grass-tinted off-white in light, moss-black in dark |
| `midnight` | `#E9EDD8` (light) / `#070C05` (dark) | `bg-midnight` | Page background (bottom of gradient), scrolled navbar |
| `card` | `#FFFFFF` (light) / `#0D1509` (dark) | `bg-card` | Solid surfaces |
| `card-hover` | `#EEF2E2` (light) / `#121D0D` (dark) | `bg-card-hover` | Solid surface hover state |
| `glass` | `#FFFFFF` (light) / `#0B1108` (dark) | `bg-glass/NN` | Translucent glass panels (always with an opacity modifier) |
| `line` | `#DBE3C8` (light) / `#1C2916` (dark) | `border-line` | Subtle borders |
| `line-strong` | `#C1CFA4` (light) / `#2C3D1F` (dark) | `border-line-strong` | Emphasized/hover borders |
| `ink` | `#17210F` (light) / `#EDF6E2` (dark) | `text-ink` | Primary text |
| `ink-soft` | `#445430` (light) / `#C6D6AC` (dark) | `text-ink-soft` | Secondary text |
| `ink-faint` | `#6C7C53` (light) / `#91A575` (dark) | `text-ink-faint` | Muted text |
| `cyan` | `#6FE08A` | `text-cyan`, `from-cyan` | Grass green — primary bright accent |
| `cyan-strong` | `#24B355` | `to-cyan-strong` | Deeper vivid green |
| `indigo` | `#8BA33C` | `from-indigo` | Olive-moss — mid accent |
| `purple` | `#4C6B1F` | `to-purple` | Deep forest olive — secondary accent |
| `success` | `#22A559` | `text-success` | Leaf green — semantic + reused as "emerald" accent |
| `warning` | `#C99A2E` | `text-warning` | Khaki gold — semantic + reused as "amber" accent |
| `error` | `#B5502B` | `text-error` | Terracotta/rust — semantic + reused as "rose" accent; kept warm/earthy on purpose so it still reads as "error" without clashing with the greens |
| `info` | `#3E8E7E` | `text-info` | Sage teal — semantic (not yet used as a section accent) |

`app/data/theme.ts` layers a named `accents` map (`violet`, `cyan`, `amber`, `rose`, `emerald` — legacy key names, now green/olive hues under the hood) on top of these tokens — each key bundles a `gradient` (icon/border), `glow` (blur-shadow rgba, kept as raw rgba since CSS `background` shorthand can't consume a Tailwind class — these were hand-converted to match the new hex values, so re-derive them if a token hex ever changes), and `text` class built from the tokens above. Components accept an `accent?: AccentKey` prop (`GlassCard`, `TiltIcon`) rather than hardcoding colors — to change a section's color, change which accent key is passed in that section component, edit the mapping in `sectionAccents`, or edit `accents` in `theme.ts` to change it everywhere at once. To introduce a wholly new hue, add the CSS var + `@theme inline` entry in `globals.css` first, then reference it from `theme.ts`.

Any hardcoded `rgba(...)`/hex literal outside the token system (button/badge glow shadows, the hero photo-ring conic-gradient, the online-status-dot glow) was likewise hand-converted to the new green/olive rgb values — grep for old values (`99,102,241` / `168,85,247` / `94,231,255` / `251,191,36` / `251,113,133` / `52,211,153` / `#6366f1` / `#a855f7` / `#5ee7ff`) before assuming a hardcoded color is current; there should be none left.

Base: warm grass/olive gradient background (off-white in light, moss-black in dark — not flat white/black) with vivid grass-green/olive-moss/deep-forest-olive accents plus khaki/terracotta/sage semantic-reused accents layered on top via gradients, glows, and blurred blobs — "colorful green/grass/olive theme," not monochrome. The site leans intentionally colorful/vivid rather than subtle: `AnimatedBackground` runs four large blurred accent blobs at higher opacity (indigo/40, cyan/35, purple/30, warning/20 — now olive/grass/deep-olive/khaki) instead of a faint tint, and `GlassCard` renders a two-corner colored glow (not just one) at higher opacity (0.40 / 0.25) plus an `accent`-tinted `border-line-strong` border when an `accent` prop is passed — keep new colored surfaces at this same vividness rather than reverting to subtle/muted glows.

### Light/dark theme (toggle; light is default)

**Light is the default theme.** The values in the token table above are the `:root` (no `data-theme` attribute) definitions — light gray/white surfaces, dark text. A `:root[data-theme="dark"]` block in `globals.css` redefines only the base/surface/text tokens — `space`, `midnight`, `card`, `card-hover`, `glass`, `line`, `line-strong`, `ink`, `ink-soft`, `ink-faint`, plus `color-scheme: dark` — to the dark equivalents. The accent and semantic tokens (`cyan`, `cyan-strong`, `indigo`, `purple`, `success`, `warning`, `error`, `info`) are **not** redefined per theme — same hex in both, so the colorful-accent identity survives the switch; only the canvas flips. The `--neu-light`/`--neu-dark` shadow-tint tokens (used by `.neu-*` classes) are likewise defined light-first on `:root` with a `:root[data-theme="dark"]` override.

Theme switching is hand-rolled (no `next-themes` dependency):
- `app/components/ui/ThemeToggle.tsx` — client component, Sun/Moon icons from `lucide-react`, toggles `data-theme` on `document.documentElement` and persists the choice to `localStorage` (`"theme"` key, values `"dark"`/`"light"`). Defaults its own state to `"light"` to match the SSR/anti-FOUC default.
- `app/layout.tsx` has an inline `<script>` in `<head>` (before hydration) that reads `localStorage.theme` and sets `data-theme` on `<html>` immediately — this is the anti-FOUC step; it defaults to `"light"` when nothing is stored.
- The toggle button is rendered in `Navbar.tsx` in both the desktop pill nav and the mobile drawer's icon row.
- Conic-gradient hex literals in `Spotlight.tsx`/Hero's photo ring/`AnimatedBackground.tsx` are left as-is in light mode — they hardcode accent hex values, and accents don't change between themes, so no separate light variant is needed there. `GlassCard`/`TiltIcon`/`Navbar` overlay `rgba(255,255,255,…)` highlights are subtle enough (low opacity, layered under a colored `accent` glow or a light-mode `glass`/`card` surface) that they don't wash out on light backgrounds; revisit if a future component adds a strong white overlay assuming a dark backdrop.

## Layout: stacked full-width sections

`app/page.tsx` renders `Hero` as a full-bleed band, then `About`, `Experience`, `Skills`, `Education`, `Contact` stacked in document order, each a full-width section. A whole-page bento grid layout was tried and reverted — each section component owns its own outer band: an anchor-id'd wrapper (`mx-auto max-w-5xl` — `max-w-6xl` for `Skills`, which needs room for the 4-column expertise grid — `scroll-mt-24 px-6 py-16 sm:py-24`) around a single `GlassCard` with `p-4 sm:p-8 md:p-12`. `SectionHeading` has an unused-by-default `compact?: boolean` prop (smaller eyebrow pill + smaller title) left over from the bento experiment — leave it available for any future tile-style layout, but the current stacked layout does not pass it. To add a new top-level section: build it the same way (id wrapper + `max-w-*` + single `GlassCard` + `SectionHeading`) and add it to `page.tsx`'s section list in scroll order.

## Design system

- **Liquid glass**: `GlassCard` (app/components/ui/GlassCard.tsx) — `backdrop-blur-2xl`, translucent white overlay borders, soft shadow, two-corner colored radial glow + `border-line-strong` border via `accent` prop (see the vividness note above). See "Apple-style Liquid Glass" below for the hover/touch sheen treatment layered on top.
- **3D icons**: `TiltIcon` (app/components/ui/TiltIcon.tsx) — pointer-tracked rotateX/rotateY tilt + radial pointer-light + optional gradient/glow background via `accent` prop. Used for every section icon (experience, skills, education, contact) instead of flat icons.
- **Aceternity-style effects**: hand-rolled (no external Aceternity package — those are copy-paste components, not an npm dependency); see the animated blob background in `app/components/ui/AnimatedBackground.tsx` (four blurred accent blobs, higher opacity per the vividness note above). The hero no longer has its own conic-gradient spotlight glow (`Spotlight.tsx` was removed) — it now relies solely on the page-wide `AnimatedBackground` gradient/blobs showing through, per request ("remove hero gradient, keep the whole-page gradient"). The hero photo ring's conic-gradient hex literals (`Hero.tsx`) hardcode accent hex values (raw CSS gradients can't consume Tailwind token classes) — currently `#8ba33c`/`#6fe08a`/`#4c6b1f`/`#c99a2e`, matching `indigo`/`cyan`/`purple`/`warning`; keep these in sync with the token table above if the palette changes.
- **iOS-style**: pill-shaped floating navbar, `rounded-3xl`/`rounded-[2rem]` cards, soft blur everywhere.
- **macOS-style dock nav** (desktop, `sm:` and up): `app/components/ui/Dock.tsx` — a generic `Dock`/`DockItem` pair, icon-only nav items that magnify (34px → 50px) based on cursor proximity along the x-axis, spring-smoothed (`useSpring`), with a floating label tooltip on hover/focus. `Navbar.tsx` feeds it `links: DockItem[]` (`{ href, label, icon }`, one `lucide-react` icon per section). `disableMagnify` is passed `shouldReduceMotion` so the size stays fixed at 34px (no spring/motion-value animation) under reduced motion.
- **Mobile**: Navbar collapses to a hamburger (`Menu`/`X` icons) that opens an animated glass dropdown drawer below `sm:` breakpoint (unchanged — the dock is a desktop-only replacement for the old text nav-links row since mouse-proximity magnification has no equivalent on touch); all grids stack via Tailwind responsive classes (`sm:`, `lg:`).
- **Motion**: Framer Motion `whileInView` scroll reveals on every section, spring-based tilt on icons, `AnimatePresence` for the mobile menu.

### Neumorphic depth (site-wide, colorful, additive to liquid glass)

The neumorphic soft dual-shadow "extruded" treatment now spans the whole page — small controls, section panels, and icon chips — layered on top of/underneath each surface's existing glass (blur + border + colored glow), never replacing it. Four utility classes in `app/globals.css`, all built from the same light/dark shadow-tint tokens:

- `.neu-surface` — larger throw (±3px/8px blur), for the theme toggle and Contact's item tiles.
- `.neu-surface-sm` — smaller throw (±2px/5px blur), for pill-shaped controls: `TechBadge` pills, nav links/"Hire Me" pill, `SectionHeading`'s eyebrow pill, About's stat tiles, Education's "Beyond Work" interest pills.
- `.glass-neu` — large panels (`GlassCard`, i.e. every section's outer panel): a much gentler, larger-blur (±14px/36px), lower-opacity dual shadow than the small-control classes so big surfaces read as softly extruded rather than muddy. Composed *with* (not instead of) GlassCard's existing `0 8px 32px` drop shadow, inset top highlight, border, `backdrop-blur-2xl`, and the two colored corner glows — GlassCard is no longer "pure glass," but the glass treatment is fully intact underneath the added depth.
- `.icon-neu` — `TiltIcon`'s icon-chip background: a soft dual shadow beneath its existing gradient fill + blurred glow + pointer-tracked tilt/light, so icons read as softly-pressed colorful buttons instead of flat gradient chips. Pointer-tilt interaction itself is untouched.

All four derive their base light/dark shadow tints from existing tokens via `color-mix()` — `--neu-light` (card-hover mixed toward white) and `--neu-dark` (space mixed toward black) in dark theme; light theme redefines both so the pair stays visible against light surfaces instead of washing out or inverting. `.neu-surface`/`.neu-surface-sm`'s `:active` state swaps to an inset pair plus `scale(0.98)`/`scale(0.97)` — the classic "pressed" cue — via a plain ~180-220ms CSS transition (shadow + transform only, not a Framer Motion spring; no `prefers-reduced-motion` guard needed since there's no continuous motion).

**Colorful tinting**: every class reads its shadow color through `color-mix(in srgb, var(--neu-tint-light, var(--neu-light)) N%, transparent)` (and the `-dark` equivalent) — i.e. an optional `--neu-tint-light`/`--neu-tint-dark` custom property pair that, when unset, falls back to the plain neutral tokens. Any accent-bearing component (`GlassCard`, `TiltIcon`, About's stat tiles, Education's interest pills) sets these two custom properties inline to `color-mix(in srgb, var(--neu-light) ~80%, ${accent.glow} ~18-22%)` (same pattern for `--neu-dark`), pulling the accent's `glow` rgba straight from `app/data/theme.ts`'s `accents` map — the same source every other colored-glow treatment on the site already uses. This is what keeps the neumorphism "colorful" (a faint cyan/violet/amber/rose/emerald cast per section) instead of flattening everything to gray; no new hardcoded grays or parallel color system were introduced.

Applied to: `ThemeToggle` button; `Navbar`'s desktop nav links/"Hire Me" pill/hamburger button/mobile drawer "Hire Me" link; `TechBadge` pills; `Contact`'s per-item tiles; `SectionHeading`'s eyebrow pill (every section); `GlassCard` (every section panel — About, Experience, Projects, Skills, Education, Contact); `TiltIcon` (every icon instance — Experience, Skills, Education, Contact); About's three stat tiles (now wrapped in a small bordered/tinted surface, tinted per-stat with violet/cyan/amber glows); Education's "Beyond Work" interest pills (tinted violet, matching that subsection's icon accent).

### Apple-style Liquid Glass (hover + touch sheen, site-wide)

Three CSS classes in `app/globals.css` approximate Apple's "Liquid Glass" material (visionOS/iOS-style) on top of the existing glass/neumorphic layers — a hairline rim-light border, a diagonal specular sheen that sweeps across the surface, and a lift/press transform:

- `.liquid-glass` — full treatment (rim + sheen + lift-on-hover + scale-down-on-press) for standalone interactive elements: buttons, pills, and — via `GlassCard`'s `interactive` prop — cards inside a grid.
- `.liquid-glass-sm` — same treatment, smaller throw/faster sheen, for small controls (`TechBadge`, `ThemeToggle`, Dock items, nav pills/buttons, TiltIcon chips, Contact tiles, About's stat tiles, Education's interest pills).
- `.liquid-glass-panel` — rim + sheen only, **no lift/scale transform**, for big containers that themselves hold other `.liquid-glass*` elements (the outer section `GlassCard`s, the navbar pill, the mobile drawer). CSS `:hover` bubbles up from any descendant, so giving a large panel the same lift as its own children would make the whole panel bob every time something inside it is hovered — this variant keeps the ambient glass glint without that jitter.

**`GlassCard`'s `interactive` prop decides which variant it gets**: pass `interactive` for a standalone hoverable card (a single project/job/expertise-category card in a grid — see `Experience.tsx`, `Skills.tsx`, `Projects.tsx`'s inner `GlassCard` calls) to get `.liquid-glass` (full lift). Leave it unset for an outer section panel (About/Experience/Projects/Skills/Education/Contact's outer `GlassCard`) to get `.liquid-glass-panel` (no lift) — **this matters because several sections nest an `interactive` `GlassCard` inside a non-interactive outer one**, and giving both the lift transform would double up.

Sheen/rim colors read through `--glass-sheen` / `--glass-sheen-soft` / `--glass-rim` custom properties, redefined per theme: **chromatic (grass-green tinted)** in light mode — a plain white sheen is invisible against light surfaces — and **neutral white** in dark mode, the classic glass-glint look. All three classes degrade under `prefers-reduced-motion: reduce` to a border/shadow-only transition with no sheen sweep or transform.

Touch/mobile gets the same feedback for free: `:active` (which fires on tap, not just `:hover`) triggers both the sheen sweep and a firm press-scale (`scale(0.94)` for `-sm`, `scale(0.982)` for the full variant) — this is what makes controls feel tactile on a phone with no hover capability, not a separate mobile-only code path.

### UX-law audit (2026-08-13)

Fixed genuine violations found during a pass over Navbar, ThemeToggle, TechBadge, and Contact:

- **Fitts's Law**: `ThemeToggle` and the mobile hamburger button were 32×32px (`h-8 w-8`) — bumped to 40×40px (`h-10 w-10`), closer to the ~44px recommended minimum touch target. Desktop nav link vertical padding increased slightly (`py-1.5` → `py-2`) for a taller hit area without changing visual density.
- **Jakob's Law**: `Contact`'s "Location" tile (no `href`, not a real link) previously shared the exact same hover state (`hover:border-line-strong hover:bg-glass/60`) as the three real link tiles next to it, implying clickability it didn't have. The hover state is now conditional on `item.href` being present, so only actually-interactive tiles look interactive.
- Reviewed and left alone (already satisfied): proximity/grouping in Experience's timeline and Education's four stacked groups was already consistent; Skills' flat "all skills" pill row followed by the four `keyExpertise` category cards already chunks the info for Miller's Law rather than dumping one huge undifferentiated list; nav item count (5 links + 1 CTA) is already minimal, no Hick's Law reduction needed.

## Tech icons

Skill/technology names anywhere in `resume.ts` (the `skills` array, `keyExpertise` items, and `experience[].technologies` / `subRoles[].technologies` strings) render as `TechBadge` (`app/components/ui/TechBadge.tsx`) — a pill with the technology's real logo in a white chip (for contrast/brand-accuracy regardless of the logo's own colors) plus the label, falling back to a plain text pill when no icon is mapped (e.g. "Lazy Loading", "Agile Methodologies").

Icons are real brand logos from the [`@dev.icons/react`](https://devicons.io/docs/react) npm package (a real runtime dependency, tree-shaken per icon at build time — fine under static export since it's plain React components, not files copied from `node_modules`). `app/data/techIcons.ts` maps each name to its icon component.

A handful of logos aren't in that package's ~1700-icon set (currently: React, Zustand, SVGO) — those fall back to statically vendored SVGs in `public/icons/devicon/<slug>.svg` (from [devicon](https://devicon.dev)), listed in `techIcons.ts`'s `vendoredTechIcons` map.

To add a new tech icon:
1. Check if `@dev.icons/react` exports it (`node -e "console.log(Object.keys(require('@dev.icons/react')))"`, prefer the `*Icon`-suffixed variant when both exist — it's the plain glyph mark vs. the more detailed wordmark art).
2. If found, import it and add a `"Exact Name In resume.ts": ComponentName` entry to `techIcons` in `app/data/techIcons.ts`.
3. If not found, fall back to devicon: copy the `-original.svg` (or `-plain.svg` if no colored original exists) from [devicon.dev](https://devicon.dev) or the `devicon` npm package's `icons/` folder to `public/icons/devicon/<slug>.svg`, then add a `"Exact Name In resume.ts": "slug"` entry to `vendoredTechIcons`.

`Experience.tsx` splits the `technologies` string on commas into individual `TechBadge`s — keep that format (comma-separated, no trailing period) when editing `experience` entries in `resume.ts`.

## Animation performance / reduced motion

Goal is cheaper-per-frame motion, not less-alive motion:

- Every Framer Motion component that animates on mount/scroll (`Hero`, `Navbar`, `SectionHeading`, section reveal `motion.div`s in `About`/`Experience`/`Skills`/`Education`/`Contact`) calls `useReducedMotion()` and skips/shortens transforms when it's `true` (typically `initial={shouldReduceMotion ? false : {...}}`, i.e. render already-settled instead of animating in). `globals.css` still separately disables the CSS keyframe animations (`animate-blob-*`, `animate-name-glow`) under `@media (prefers-reduced-motion: reduce)`.
- All `whileInView` reveals use `viewport={{ once: true, ... }}` so they fire once and don't re-trigger on repeated scroll past the same element.
- `GlassCard` has no pointer-tracked 3D tilt (removed per an earlier request) — but it does get a plain CSS hover lift via the Liquid Glass treatment when `interactive` is passed (see "Apple-style Liquid Glass" above); non-interactive (outer panel) `GlassCard`s stay static aside from the sheen glint. `TiltIcon`'s pointer-tracked rotateX/rotateY + glow still skips entirely when `useReducedMotion()` is true, and additionally checks `window.matchMedia("(pointer: fine)")` on mount to disable the tilt/glow listeners on touch devices (no meaningful hover pointer there, and it avoids pointless per-touch re-renders) — touch devices still get the Liquid Glass press-scale/sheen from `:active` instead.
- `AnimatedBackground.tsx` is a client component that listens for `visibilitychange` and applies `[animation-play-state:paused]` to the blob divs while the tab is hidden, so the blurred blobs stop costing CPU/battery when the page isn't visible. It now renders 4 blobs at higher opacity (see the vividness note under Theme) — cut further if profiling shows it's needed, but tab-visibility pausing was the higher-leverage fix.

## Fonts

Body/heading font is **Plus Jakarta Sans** (via `next/font/google`), mono is **JetBrains Mono** — loaded in [app/layout.tsx](app/layout.tsx) as `--font-app-sans` / `--font-app-mono` and mapped to Tailwind's `--font-sans`/`--font-mono` in `globals.css`'s `@theme inline`. Chosen for strong legibility at small sizes and a geometric-but-friendly look that reads well to recruiters skimming quickly. To change the typeface, swap the `next/font/google` import/weights in `layout.tsx` — no other file needs touching since every component uses Tailwind's `font-sans`/`font-mono` (or no explicit font class, which inherits `font-sans` from `body`).

## Resume download

`profile.resume` (`app/data/resume.ts`) points at `/resume.pdf`, served from `public/resume.pdf`. A "Download Resume" button (`download` attribute, `lucide-react`'s `Download` icon) appears in `Hero.tsx`'s CTA row and in `Navbar.tsx` (a small icon-only button next to `ThemeToggle`/"Hire Me" on desktop, a labeled row in the mobile drawer). **`public/resume.pdf` currently ships as a placeholder stub — replace it with the real resume PDF (same filename) before shipping**; no component changes are needed when swapping the file.

## Libraries

`framer-motion` (animation), `lucide-react` (icons — note: no `Linkedin` export in the installed version, `Link2` is used instead), `clsx` + `tailwind-merge` via `app/lib/cn.ts` (class merging). No component library (e.g. no shadcn) is installed — primitives are hand-built in `app/components/ui/`.

## Build

`next.config.ts` uses `output: "export"` (static export) with `images.unoptimized: true` (required for `next/image` under static export).
