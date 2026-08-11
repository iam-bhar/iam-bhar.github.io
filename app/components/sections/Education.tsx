"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BadgeCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import TiltIcon from "@/app/components/ui/TiltIcon";
import { achievements, certificates, education, interests } from "@/app/data/resume";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Foundations" title="Education & Recognition" />

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard accent="amber" className="flex h-full flex-col gap-5 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <TiltIcon icon={GraduationCap} accent="amber" />
                <h3 className="text-base font-semibold text-ink">Education</h3>
              </div>
              <ul className="flex flex-col gap-4">
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
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <GlassCard accent="rose" className="flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <TiltIcon icon={Award} accent="rose" />
                <h3 className="text-base font-semibold text-ink">Achievements & Awards</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {achievements.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard accent="emerald" className="flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <TiltIcon icon={BadgeCheck} accent="emerald" />
                <h3 className="text-base font-semibold text-ink">Certificates</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {certificates.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5"
        >
          <GlassCard accent="violet" className="flex flex-wrap items-center gap-4 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <TiltIcon icon={Sparkles} accent="violet" size={20} className="h-11 w-11" />
              <h3 className="text-sm font-semibold text-ink">Beyond Work</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-line bg-glass/50 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                >
                  {interest}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
