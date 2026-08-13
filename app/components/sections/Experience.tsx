"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import TiltIcon from "@/app/components/ui/TiltIcon";
import TechBadge from "@/app/components/ui/TechBadge";
import { experience } from "@/app/data/resume";
import type { AccentKey } from "@/app/data/theme";

const jobAccents: AccentKey[] = ["violet", "cyan", "amber"];

function splitTech(tech: string) {
  return tech.split(",").map((t) => t.trim()).filter(Boolean);
}

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-10">
      <GlassCard accent="violet" className="flex flex-col p-8 sm:p-12">
        <SectionHeading eyebrow="Career Path" title="Professional Experience" />

        <div className="relative">
          <div className="absolute left-7 top-2 bottom-2 hidden w-px bg-gradient-to-b from-line-strong via-line to-transparent sm:block" />

          <div className="flex flex-col gap-6">
            {experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative sm:pl-20"
              >
                <div className="absolute left-0 top-0 hidden sm:block">
                  <TiltIcon icon={Briefcase} accent={jobAccents[i % jobAccents.length]} />
                </div>

                <GlassCard accent={jobAccents[i % jobAccents.length]} className="p-5 sm:p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{job.role}</h3>
                      <p className="text-sm font-medium text-ink-soft">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className="rounded-full border border-line bg-glass/55 px-3 py-1 text-xs font-medium text-ink-soft">
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-ink-faint">
                        <MapPin size={11} /> {job.location}
                      </span>
                    </div>
                  </div>

                  {job.technologies && (
                    <ul className="mb-4 flex flex-wrap gap-1.5">
                      {splitTech(job.technologies).map((tech) => (
                        <li key={tech}>
                          <TechBadge name={tech} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.bullets.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {job.subRoles?.map((sub) => (
                    <div key={sub.role} className="mt-5 border-t border-line pt-5">
                      <h4 className="mb-2 text-sm font-semibold text-ink">{sub.role}</h4>
                      {sub.technologies && (
                        <ul className="mb-3 flex flex-wrap gap-1.5">
                          {splitTech(sub.technologies).map((tech) => (
                            <li key={tech}>
                              <TechBadge name={tech} />
                            </li>
                          ))}
                        </ul>
                      )}
                      <ul className="flex flex-col gap-2">
                        {sub.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
