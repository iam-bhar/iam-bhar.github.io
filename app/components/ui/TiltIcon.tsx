"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    // Skip pointer-tracked tilt on touch devices (no meaningful hover pointer)
    // and when the user prefers reduced motion. Reads an external platform API
    // (matchMedia), so this is a legitimate one-time sync-from-external-system effect.
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTiltEnabled(isFinePointer && !shouldReduceMotion);
  }, [shouldReduceMotion]);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), transparent 70%)`;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!tiltEnabled) return;
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
    if (!tiltEnabled) return;
    rotateX.set(0);
    rotateY.set(0);
  }

  const tintStyle = palette
    ? {
        "--neu-tint-light": `color-mix(in srgb, var(--neu-light) 78%, ${palette.glow} 22%)`,
        "--neu-tint-dark": `color-mix(in srgb, var(--neu-dark) 82%, ${palette.glow} 18%)`,
      }
    : undefined;

  return (
    <motion.div
      ref={ref}
      onPointerMove={tiltEnabled ? handleMove : undefined}
      onPointerLeave={tiltEnabled ? handleLeave : undefined}
      style={{
        ...tintStyle,
        ...(tiltEnabled ? { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 } : undefined),
      }}
      className={cn(
        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line-strong icon-neu",
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
      {tiltEnabled && <motion.div style={{ background }} className="pointer-events-none absolute inset-0 rounded-2xl" />}
      <Icon size={size} className={cn("relative z-10", palette ? "text-white" : "text-ink")} strokeWidth={1.75} />
    </motion.div>
  );
}
