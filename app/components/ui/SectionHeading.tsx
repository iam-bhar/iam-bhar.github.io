"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mb-12 flex flex-col items-center text-center", className)}
    >
      <span className="mb-3 rounded-full border border-line bg-glass/55 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-soft backdrop-blur-xl">
        {eyebrow}
      </span>
      <h2 className="bg-gradient-to-b from-ink to-ink-faint bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
        {title}
      </h2>
    </motion.div>
  );
}
