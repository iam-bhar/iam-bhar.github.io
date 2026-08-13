"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail, MapPin } from "lucide-react";
import { profile } from "@/app/data/resume";
import { cn } from "@/app/lib/cn";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : undefined;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-10 md:pt-28 md:pb-20">
      <motion.div
        initial={initial ?? { opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8 h-32 w-32"
      >
        <div
          className={cn(
            "absolute -inset-1.5 rounded-[2.25rem] bg-[conic-gradient(from_0deg,#6366f1,#5ee7ff,#a855f7,#fbbf24,#6366f1)] opacity-80 blur-[2px]",
            shouldReduceMotion ? "" : "animate-[spin_8s_linear_infinite]",
          )}
        />
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-line-strong bg-card shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            priority
            sizes="128px"
            className="object-cover"
          />
        </div>
        <span className="absolute -bottom-1.5 -right-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-space bg-success shadow-[0_0_16px_rgba(52,211,153,0.7)]">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
      </motion.div>

      <motion.p
        initial={initial ?? { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-4 flex items-center gap-2 rounded-full border border-line bg-glass/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-ink-soft backdrop-blur-xl"
      >
        <MapPin size={12} className="text-cyan-strong" /> {profile.location}
      </motion.p>

      <motion.div
        initial={initial ?? { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl text-center"
      >
        <span
          aria-hidden
          className="animate-name-glow absolute inset-0 bg-gradient-to-r from-indigo via-cyan to-purple bg-clip-text text-4xl font-bold tracking-tight text-transparent blur-xl sm:text-6xl"
        >
          {profile.name}
        </span>
        <h1 className="text-outline relative text-balance text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          {profile.name}
        </h1>
      </motion.div>

      <motion.h2
        initial={initial ?? { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 text-lg font-semibold text-cyan-strong sm:text-xl"
      >
        {profile.title}
      </motion.h2>

      <motion.p
        initial={initial ?? { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-xl text-balance text-center text-sm leading-relaxed text-ink-soft sm:text-base"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={initial ?? { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href={`mailto:${profile.email}`}
          className="group flex items-center gap-2 rounded-full border border-line bg-gradient-to-r from-indigo to-purple px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_10px_36px_rgba(168,85,247,0.55)]"
        >
          <Mail size={16} /> Get In Touch
        </a>
        <a
          href="#experience"
          className="flex items-center gap-2 rounded-full border border-line-strong bg-glass/60 px-5 py-2.5 text-sm font-medium text-ink backdrop-blur-xl transition-all duration-300 hover:bg-glass/85"
        >
          View Experience <ArrowDownRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}
