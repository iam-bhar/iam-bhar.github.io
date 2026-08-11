import type { Icon } from "@dev.icons/react";
import {
  Nextjs,
  Typescript,
  Javascript,
  AngularIcon,
  Tailwind,
  Bootstrap,
  Css3,
  Html5,
  SupabaseIcon,
  GitIcon,
  Github,
  Postman,
  Vercel,
  Jest,
  Storybook,
  Figma,
  Postgresql,
  Socketio,
  Docker,
  Php,
  Mysql,
  Nodejs,
  Jquery,
} from "@dev.icons/react";

/**
 * Maps technology/skill names (as they appear anywhere in resume.ts) to an icon
 * component from the `@dev.icons/react` npm package (https://devicons.io/docs/react).
 * A few logos (React, Zustand, SVGO) aren't in that package's ~1700-icon set, so
 * they fall back to the locally vendored SVGs in public/icons/devicon/ instead
 * (see `vendoredTechIcons` below and AGENTS.md "Tech icons" section).
 * Names not present in either map render as plain text.
 */
export const techIcons: Record<string, Icon> = {
  "NextJS": Nextjs,
  "Next.js": Nextjs,
  "TypeScript": Typescript,
  "JavaScript": Javascript,
  "JavaScript (ES6+)": Javascript,
  "Angular": AngularIcon,
  "TailwindCSS": Tailwind,
  "Tailwind CSS": Tailwind,
  "Tailwind CSS 4": Tailwind,
  "Bootstrap": Bootstrap,
  "CSS": Css3,
  "CSS3": Css3,
  "HTML": Html5,
  "HTML5": Html5,
  "Supabase": SupabaseIcon,
  "Git": GitIcon,
  "GitHub": Github,
  "Postman": Postman,
  "Vercel": Vercel,
  "Jest": Jest,
  "Storybook": Storybook,
  "Figma": Figma,
  "PostgreSQL": Postgresql,
  "Socket.IO": Socketio,
  "Docker": Docker,
  "PHP": Php,
  "MySQL": Mysql,
  "Node.js": Nodejs,
  "JQuery": Jquery,
  "jQuery": Jquery,
};

/** Logos missing from @dev.icons/react — vendored locally as static SVGs instead. */
export const vendoredTechIcons: Record<string, string> = {
  "ReactJS": "react",
  "React.js": "react",
  "React": "react",
  "Zustand": "zustand",
  "SVGO": "svgo",
  "Pusher": "pusher",
  "GitHub Copilot": "copilot",
  "Copilot": "copilot",
  "Lighthouse Analysis": "lighthouse",
};

export function getTechIcon(name: string): Icon | undefined {
  return techIcons[name];
}

export function getVendoredTechIcon(name: string): string | undefined {
  return vendoredTechIcons[name];
}
