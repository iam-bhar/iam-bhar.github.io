import { cn } from "@/app/lib/cn";
import { accents, type AccentKey } from "@/app/data/theme";
import React, { type HTMLAttributes, useRef } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  accent?: AccentKey;
};

export default function GlassCard({ className, hover = true, accent, children, ...props }: GlassCardProps) {
  const palette = accent ? accents[accent] : null;
  const ref = useRef<HTMLDivElement | null>(null);

  function handleMove(e: React.MouseEvent) {
    if (!hover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -8; // rotateX
    const ry = (px - 0.5) * 12; // rotateY
    ref.current.style.setProperty("--rx", `${rx}deg`);
    ref.current.style.setProperty("--ry", `${ry}deg`);
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", `0deg`);
    ref.current.style.setProperty("--ry", `0deg`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
      className={cn(
        "relative rounded-3xl border border-line bg-glass/55 backdrop-blur-2xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]",
        hover &&
        "transition-transform duration-300 will-change-transform hover:shadow-[0_12px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]",
        className,
      )}
      {...props}
    >
      {palette && (
        <div
          className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-[0.15] blur-2xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: `radial-gradient(600px circle at 20% 0%, ${palette.glow}, transparent 60%)` }}
        />
      )}
      {children}
    </div>
  );
}
