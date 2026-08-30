/**
 * Central theme config — edit here to change accent colors across the whole site.
 * Backed by the CSS custom properties defined in app/globals.css (single palette source).
 * Each section pulls a `gradient` (for icons/borders), `glow` (blur-shadow rgba), and `text`.
 */
export const accents = {
  violet: { gradient: "from-indigo to-purple", glow: "rgba(139,163,60,0.35)", text: "text-indigo", ring: "ring-indigo/30" },
  cyan: { gradient: "from-cyan to-cyan-strong", glow: "rgba(111,224,138,0.35)", text: "text-cyan-strong", ring: "ring-cyan/30" },
  amber: { gradient: "from-warning to-error", glow: "rgba(201,154,46,0.35)", text: "text-warning", ring: "ring-warning/30" },
  rose: { gradient: "from-error to-purple", glow: "rgba(181,80,43,0.35)", text: "text-error", ring: "ring-error/30" },
  emerald: { gradient: "from-success to-cyan", glow: "rgba(34,165,89,0.35)", text: "text-success", ring: "ring-success/30" },
} as const;

export type AccentKey = keyof typeof accents;

export const sectionAccents: Record<string, AccentKey> = {
  hero: "violet",
  about: "cyan",
  experience: "violet",
  projects: "emerald",
  skills: "cyan",
  education: "amber",
  contact: "rose",
};
