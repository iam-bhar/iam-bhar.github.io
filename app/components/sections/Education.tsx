"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Award, BadgeCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import TiltIcon from "@/app/components/ui/TiltIcon";
import { achievements, certificates, education, interests } from "@/app/data/resume";
import { accents } from "@/app/data/theme";
import type { CSSProperties } from "react";

export default function Education() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div id="education" className="mx-auto max-w-5xl scroll-mt-24 px-2 py-5  sm:px-6 sm:py-8">
      <GlassCard accent="amber" className="flex flex-col p-4 sm:p-8 md:p-12">
        <SectionHeading eyebrow="Foundations" title="Education & Recognition" />

        <div className="flex flex-col gap-5">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4">
              <TiltIcon icon={GraduationCap} accent="amber" size={18} className="h-11 w-11" />
              <h3 className="text-base font-semibold text-ink">Education</h3>
            </div>
            <ul className="mt-4 flex flex-col gap-4">
              {education.map((edu) => (
                <li key={edu.school} className="border-l-2 border-line pl-4">
                  <p className="text-sm font-medium text-ink">{edu.school}</p>
                  <p className="text-xs text-ink-faint">{edu.degree}</p>
                  <p className="mt-1 text-xs text-ink-faint">
                    {edu.period} · {edu.location}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line pt-5"
          >
            <div className="flex items-center gap-4">
              <TiltIcon icon={Award} accent="rose" size={18} className="h-11 w-11" />
              <h3 className="text-base font-semibold text-ink">Achievements & Awards</h3>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {achievements.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line pt-5"
          >
            <div className="flex items-center gap-4">
              <TiltIcon icon={BadgeCheck} accent="emerald" size={18} className="h-11 w-11" />
              <h3 className="text-base font-semibold text-ink">Certificates</h3>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {certificates.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="border-t border-line pt-5"
          >
            <div className="flex items-center gap-3">
              <TiltIcon icon={Sparkles} accent="violet" size={18} className="h-11 w-11" />
              <h3 className="text-sm font-semibold text-ink">Beyond Work</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="neu-surface-sm rounded-full border border-line bg-glass/50 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                  style={
                    {
                      "--neu-tint-light": `color-mix(in srgb, var(--neu-light) 85%, ${accents.violet.glow} 15%)`,
                      "--neu-tint-dark": `color-mix(in srgb, var(--neu-dark) 88%, ${accents.violet.glow} 12%)`,
                    } as CSSProperties
                  }
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </div>
  );
}
