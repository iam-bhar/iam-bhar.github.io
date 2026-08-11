"use client";

import { motion } from "framer-motion";
import { Code2, Gauge, Wrench, Users, Layers, Database, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import TiltIcon from "@/app/components/ui/TiltIcon";
import TechBadge from "@/app/components/ui/TechBadge";
import { keyExpertise, skills } from "@/app/data/resume";
import type { AccentKey } from "@/app/data/theme";

const icons: Record<string, LucideIcon> = {
  "Frontend Development": Code2,
  "State Management": Layers,
  "Backend & Database": Database,
  "Performance Optimization": Gauge,
  "Real-Time Communication": Radio,
  "Development Tools": Wrench,
  "Team Leadership & Mentorship": Users,
};

const groupAccents: Record<string, AccentKey> = {
  "Frontend Development": "violet",
  "State Management": "violet",
  "Backend & Database": "emerald",
  "Performance Optimization": "cyan",
  "Real-Time Communication": "rose",
  "Development Tools": "amber",
  "Team Leadership & Mentorship": "rose",
};

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Toolbox" title="Skills & Expertise" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap justify-center gap-2.5"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -3 }}
            >
              <TechBadge name={skill} size="md" className="px-1 py-1.5 text-sm" />
            </motion.span>
          ))}
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {keyExpertise.map((group, i) => {
            const Icon = icons[group.title] ?? Code2;
            const accent = groupAccents[group.title] ?? "violet";
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <GlassCard accent={accent} className="flex h-full flex-col gap-4 p-6">
                  <TiltIcon icon={Icon} accent={accent} />
                  <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <TechBadge name={item} />
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
