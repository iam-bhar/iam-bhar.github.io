"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FolderGit2, MapPin } from "lucide-react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import TechBadge from "@/app/components/ui/TechBadge";
import { projects } from "@/app/data/resume";
import type { AccentKey } from "@/app/data/theme";

const projectAccents: AccentKey[] = ["violet", "cyan", "amber", "rose", "emerald"];

function splitTech(tech: string) {
  return tech.split(",").map((t) => t.trim()).filter(Boolean);
}

function ProjectCard({ project, accent, index }: { project: (typeof projects)[number]; accent: AccentKey; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isLong = project.description.length > 160;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard accent={accent} className="flex h-full flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-ink">{project.title}</h3>
            <p className="text-sm font-medium text-ink-soft">{project.company}</p>
          </div>
          <FolderGit2 size={18} className="mt-0.5 shrink-0 text-ink-faint" />
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
          <span className="rounded-full border border-line bg-glass/55 px-2.5 py-0.5">{project.period}</span>
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {project.location}
          </span>
        </div>

        <p className={isLong && !expanded ? "line-clamp-3 text-sm leading-relaxed text-ink-soft" : "text-sm leading-relaxed text-ink-soft"}>
          {project.description}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 self-start text-xs font-medium text-cyan-strong transition-colors hover:text-cyan"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {project.technologies && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {splitTech(project.technologies).map((tech) => (
              <li key={tech}>
                <TechBadge name={tech} />
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-2 py-5 md:px-6 md:py-16  sm:px-6 sm:py-8">
      <GlassCard accent="emerald" className="flex flex-col p-4 sm:p-8 md:p-12">
        <SectionHeading eyebrow="Shipped Work" title="Projects" />

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} accent={projectAccents[i % projectAccents.length]} index={i} />
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
