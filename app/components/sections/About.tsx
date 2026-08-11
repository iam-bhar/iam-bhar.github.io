"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import { profile } from "@/app/data/resume";

const stats = [
  { label: "Years Experience", value: "6+", gradient: "from-indigo to-purple" },
  { label: "Developers Mentored", value: "10+", gradient: "from-cyan to-cyan-strong" },
  { label: "Load Time Improvement", value: "40%", gradient: "from-warning to-error" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Profile" title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard accent="cyan" className="p-8 sm:p-10">
            <p className="text-balance text-center text-base leading-relaxed text-ink-soft sm:text-lg">
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

            <div className="mt-9 grid grid-cols-1 gap-4 border-t border-line pt-8 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-3xl font-bold text-transparent`}>
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-wider text-ink-faint">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Based in {profile.location} · Open to remote & hybrid opportunities
        </p>
      </div>
    </section>
  );
}
