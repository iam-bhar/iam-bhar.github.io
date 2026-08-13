import { cn } from "@/app/lib/cn";
import { accents, type AccentKey } from "@/app/data/theme";
import { type CSSProperties, type HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  accent?: AccentKey;
};

export default function GlassCard({ className, accent, children, style, ...props }: GlassCardProps) {
  const palette = accent ? accents[accent] : null;

  return (
    <div
      className={cn(
        "relative rounded-3xl border bg-glass/55 backdrop-blur-2xl glass-neu",
        palette ? "border-line-strong" : "border-line",
        className,
      )}
      style={
        palette
          ? ({
              "--neu-tint-light": `color-mix(in srgb, var(--neu-light) 82%, ${palette.glow} 18%)`,
              "--neu-tint-dark": `color-mix(in srgb, var(--neu-dark) 85%, ${palette.glow} 15%)`,
              ...style,
            } as CSSProperties)
          : style
      }
      {...props}
    >
      {palette && (
        <>
          <div
            className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-40 blur-2xl"
            style={{ background: `radial-gradient(700px circle at 15% 0%, ${palette.glow}, transparent 65%)` }}
          />
          <div
            className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-25 blur-2xl"
            style={{ background: `radial-gradient(500px circle at 100% 100%, ${palette.glow}, transparent 65%)` }}
          />
        </>
      )}
      {children}
    </div>
  );
}
