<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio App — Project Conventions

This is Bhargav Lal Krishna's personal portfolio site, built with Next.js App Router (static export), Tailwind CSS v4, Framer Motion, and lucide-react. It renders the content of his resume as an animated, glassmorphic, colorful-dark single page.

**Living document rule**: whenever a design decision, color/theme choice, library choice, or content-structure change is made, update this file (the relevant section below) in the same change. Don't let this doc drift from the actual code.

## Content management (single source of truth)

All resume content lives in [app/data/resume.ts](app/data/resume.ts) as typed JS objects — no content is hardcoded in components. To add/edit/remove content:

- **Profile/contact info** → edit the `profile` object.
- **Skills pills** → edit the `skills` array.
- **Key expertise cards** → edit `keyExpertise` (each item needs a `title` matching an icon/accent mapping in the relevant section component — see below).
- **Work history** → edit the `experience` array. Each entry supports flat `bullets` or nested `subRoles` (used for HCLTech, which has PayPal + Epiroc client engagements under one employer).
- **Education / achievements / certificates / interests** → edit their respective arrays.

Components map over this data and never need edits just to update text. Restart isn't required — `next dev` hot-reloads.

Profile photo: `public/my_photo.jpg`, referenced via `profile.photo`. To swap it, replace the file (keep the same filename) or update `profile.photo` to point at a new file in `public/`.

## Theme / color system

**Single source of truth for every color in the app: CSS custom properties in [app/globals.css](app/globals.css) `:root`, re-exposed as Tailwind v4 tokens via `@theme inline`.** This generates real utility classes (`bg-space`, `text-ink`, `border-line`, `from-cyan`, `ring-indigo/30`, etc.) — never hardcode a Tailwind default color (`zinc-*`, `neutral-*`, `violet-*`...) in a component; always use a token below so a future palette change is a one-file edit.

| Token | Hex | Utility examples | Use |
|---|---|---|---|
| `space` | `#070A0F` | `bg-space` | Page background (top of gradient) |
| `midnight` | `#0B1018` | `bg-midnight` | Page background (bottom of gradient), scrolled navbar |
| `card` | `#101722` | `bg-card` | Solid surfaces |
| `card-hover` | `#151F2D` | `bg-card-hover` | Solid surface hover state |
| `glass` | `#111927` | `bg-glass/NN` | Translucent glass panels (always with an opacity modifier) |
| `line` | `#1A2330` | `border-line` | Subtle borders |
| `line-strong` | `#263244` | `border-line-strong` | Emphasized/hover borders |
| `ink` | `#F1F5F9` | `text-ink` | Primary text |
| `ink-soft` | `#A7B2C3` | `text-ink-soft` | Secondary text |
| `ink-faint` | `#667085` | `text-ink-faint` | Muted text |
| `cyan` | `#5EE7FF` | `text-cyan`, `from-cyan` | Accent |
| `cyan-strong` | `#22D3EE` | `to-cyan-strong` | Accent (stronger cyan) |
| `indigo` | `#6366F1` | `from-indigo` | Accent |
| `purple` | `#A855F7` | `to-purple` | Accent |
| `success` | `#34D399` | `text-success` | Semantic + reused as "emerald" accent |
| `warning` | `#FBBF24` | `text-warning` | Semantic + reused as "amber" accent |
| `error` | `#FB7185` | `text-error` | Semantic + reused as "rose" accent |
| `info` | `#60A5FA` | `text-info` | Semantic (not yet used as a section accent) |

`app/data/theme.ts` layers a named `accents` map (`violet`, `cyan`, `amber`, `rose`, `emerald`) on top of these tokens — each key bundles a `gradient` (icon/border), `glow` (blur-shadow rgba, kept as raw rgba since CSS `background` shorthand can't consume a Tailwind class), and `text` class built from the tokens above. Components accept an `accent?: AccentKey` prop (`GlassCard`, `TiltIcon`) rather than hardcoding colors — to change a section's color, change which accent key is passed in that section component, edit the mapping in `sectionAccents`, or edit `accents` in `theme.ts` to change it everywhere at once. To introduce a wholly new hue, add the CSS var + `@theme inline` entry in `globals.css` first, then reference it from `theme.ts`.

Base: dark space/midnight gradient background (not flat black) with colorful cyan/indigo/purple accents plus warm amber/rose/emerald semantic-reused accents layered on top via gradients, glows, and blurred blobs — "colorful dark theme," not monochrome.

## Design system

- **Liquid glass**: `GlassCard` (app/components/ui/GlassCard.tsx) — `backdrop-blur-2xl`, translucent white overlay borders, soft shadow, optional colored radial glow via `accent` prop.
- **3D icons**: `TiltIcon` (app/components/ui/TiltIcon.tsx) — pointer-tracked rotateX/rotateY tilt + radial pointer-light + optional gradient/glow background via `accent` prop. Used for every section icon (experience, skills, education, contact) instead of flat icons.
- **Aceternity-style effects**: hand-rolled (no external Aceternity package — those are copy-paste components, not an npm dependency), see `app/components/ui/Spotlight.tsx` (conic-gradient animated glow behind the hero) and the animated blob background in `app/components/ui/AnimatedBackground.tsx`. Conic-gradients hardcode the accent hex values (raw CSS gradients can't consume Tailwind token classes) — keep these hex literals in sync with the token table above if the palette changes.
- **iOS-style**: pill-shaped floating navbar, `rounded-3xl`/`rounded-[2rem]` cards, soft blur everywhere.
- **Mobile**: Navbar collapses to a hamburger (`Menu`/`X` icons) that opens an animated glass dropdown drawer below `sm:` breakpoint; all grids stack via Tailwind responsive classes (`sm:`, `lg:`).
- **Motion**: Framer Motion `whileInView` scroll reveals on every section, spring-based tilt on icons, `AnimatePresence` for the mobile menu.

## Tech icons

Skill/technology names anywhere in `resume.ts` (the `skills` array, `keyExpertise` items, and `experience[].technologies` / `subRoles[].technologies` strings) render as `TechBadge` (`app/components/ui/TechBadge.tsx`) — a pill with the technology's real logo in a white chip (for contrast/brand-accuracy regardless of the logo's own colors) plus the label, falling back to a plain text pill when no icon is mapped (e.g. "Lazy Loading", "Agile Methodologies").

Icons are real brand logos from the [`@dev.icons/react`](https://devicons.io/docs/react) npm package (a real runtime dependency, tree-shaken per icon at build time — fine under static export since it's plain React components, not files copied from `node_modules`). `app/data/techIcons.ts` maps each name to its icon component.

A handful of logos aren't in that package's ~1700-icon set (currently: React, Zustand, SVGO) — those fall back to statically vendored SVGs in `public/icons/devicon/<slug>.svg` (from [devicon](https://devicon.dev)), listed in `techIcons.ts`'s `vendoredTechIcons` map.

To add a new tech icon:
1. Check if `@dev.icons/react` exports it (`node -e "console.log(Object.keys(require('@dev.icons/react')))"`, prefer the `*Icon`-suffixed variant when both exist — it's the plain glyph mark vs. the more detailed wordmark art).
2. If found, import it and add a `"Exact Name In resume.ts": ComponentName` entry to `techIcons` in `app/data/techIcons.ts`.
3. If not found, fall back to devicon: copy the `-original.svg` (or `-plain.svg` if no colored original exists) from [devicon.dev](https://devicon.dev) or the `devicon` npm package's `icons/` folder to `public/icons/devicon/<slug>.svg`, then add a `"Exact Name In resume.ts": "slug"` entry to `vendoredTechIcons`.

`Experience.tsx` splits the `technologies` string on commas into individual `TechBadge`s — keep that format (comma-separated, no trailing period) when editing `experience` entries in `resume.ts`.

## Libraries

`framer-motion` (animation), `lucide-react` (icons — note: no `Linkedin` export in the installed version, `Link2` is used instead), `clsx` + `tailwind-merge` via `app/lib/cn.ts` (class merging). No component library (e.g. no shadcn) is installed — primitives are hand-built in `app/components/ui/`.

## Build

`next.config.ts` uses `output: "export"` (static export) with `images.unoptimized: true` (required for `next/image` under static export).
