"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import { profile } from "@/app/data/resume";
import { accents } from "@/app/data/theme";
import type { CSSProperties } from "react";

const stats = [
  { label: "Years Experience", value: "6+", gradient: "from-indigo to-purple", glow: accents.violet.glow },
  { label: "Developers Mentored", value: "10+", gradient: "from-cyan to-cyan-strong", glow: accents.cyan.glow },
  { label: "Load Time Improvement", value: "40%", gradient: "from-warning to-error", glow: accents.amber.glow },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id="about"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-5xl scroll-mt-24 px-2 py-5  sm:px-6 sm:py-8"
    >
      <GlassCard accent="cyan" className="flex flex-col p-4 sm:p-8 md:p-12">
        <SectionHeading eyebrow="Profile" title="About Me" />

        <p className="text-balance text-center text-sm leading-relaxed text-ink-soft sm:text-base">
          Technical Lead – Frontend with 6+ years of experience architecting scalable web
          applications using <span className="text-ink">React.js</span>,{" "}
          <span className="text-ink">Next.js</span>,{" "}
          <span className="text-ink">TypeScript</span>, and{" "}
          <span className="text-ink">JavaScript</span>. Experienced in leading frontend
          development for enterprise IoT platforms and building organization-wide design
          systems using Storybook and Atomic Design principles. Skilled in designing reusable
          component libraries, improving application performance, implementing responsive UI,
          mentoring developers, conducting code reviews, and collaborating with UX designers
          and cross-functional teams to deliver high-quality, maintainable software.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 }}
              className="neu-surface-sm liquid-glass-sm flex flex-col items-center gap-1 rounded-2xl border border-line/60 bg-card-hover/40 px-4 py-4 text-center"
              style={
                {
                  "--neu-tint-light": `color-mix(in srgb, var(--neu-light) 82%, ${stat.glow} 18%)`,
                  "--neu-tint-dark": `color-mix(in srgb, var(--neu-dark) 85%, ${stat.glow} 15%)`,
                } as CSSProperties
              }
            >
              <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-2xl font-bold text-transparent sm:text-3xl`}>
                {stat.value}
              </span>
              <span className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-ink-faint">
          Based in {profile.location} · Open to remote & hybrid opportunities
        </p>
      </GlassCard>
    </motion.div>
  );
}
