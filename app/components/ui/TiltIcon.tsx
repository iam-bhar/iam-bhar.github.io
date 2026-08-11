"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/app/lib/cn";
import { accents, type AccentKey } from "@/app/data/theme";
import type { LucideIcon } from "lucide-react";

type TiltIconProps = {
  icon: LucideIcon;
  className?: string;
  size?: number;
  accent?: AccentKey;
};

export default function TiltIcon({ icon: Icon, className, size = 22, accent }: TiltIconProps) {
  const palette = accent ? accents[accent] : null;
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), transparent 70%)`;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 24);
    rotateX.set((0.5 - py) * 24);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
      className={cn(
        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line-strong shadow-[0_6px_18px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.14)]",
        palette ? `bg-gradient-to-br ${palette.gradient}` : "bg-gradient-to-b from-card-hover to-card",
        className,
      )}
    >
      {palette && (
        <div
          className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl opacity-70 blur-lg"
          style={{ background: palette.glow }}
        />
      )}
      <motion.div style={{ background }} className="pointer-events-none absolute inset-0 rounded-2xl" />
      <Icon size={size} className={cn("relative z-10", palette ? "text-white" : "text-ink")} strokeWidth={1.75} />
    </motion.div>
  );
}
