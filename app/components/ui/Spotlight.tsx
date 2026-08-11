"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/cn";

/** Aceternity-style animated spotlight glow, used behind hero content. */
export default function Spotlight({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0deg,#5ee7ff_120deg,#a855f7_240deg,#6366f1_360deg)] opacity-20 blur-[100px]"
      />
    </div>
  );
}
