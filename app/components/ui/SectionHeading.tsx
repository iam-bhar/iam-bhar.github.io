"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/app/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
  /** Smaller spacing/type for use inside a bento tile rather than a full-width band. */
  compact?: boolean;
};

export default function SectionHeading({ eyebrow, title, className, compact }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col items-center text-center", compact ? "mb-6" : "mb-12", className)}
    >
      <span
        className={cn(
          "neu-surface-sm liquid-glass-sm rounded-full border border-line bg-glass/55 font-medium uppercase tracking-[0.2em] text-ink-soft backdrop-blur-xl",
          compact ? "mb-2 px-3 py-1 text-[10px]" : "mb-3 px-4 py-1.5 text-xs",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "bg-gradient-to-b from-ink to-ink-faint bg-clip-text font-semibold tracking-tight text-transparent",
          compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </h2>
    </motion.div>
  );
}
