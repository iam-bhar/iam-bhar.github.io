"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/cn";

export default function AnimatedBackground() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Pause the blob animations while the tab isn't visible to save CPU/battery
    // on low-end devices — no point animating pixels nobody can see.
    const onVisibility = () => setPaused(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px] opacity-30" />
      <div
        className={cn("animate-blob-1 absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-indigo/40 blur-[120px]", paused && "[animation-play-state:paused]")}
      />
      <div
        className={cn("animate-blob-2 absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan/35 blur-[120px]", paused && "[animation-play-state:paused]")}
      />
      <div
        className={cn("animate-blob-3 absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-purple/30 blur-[120px]", paused && "[animation-play-state:paused]")}
      />
      <div
        className={cn("animate-blob-2 absolute bottom-1/4 right-1/4 h-[22rem] w-[22rem] rounded-full bg-warning/20 blur-[120px]", paused && "[animation-play-state:paused]")}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/45 to-space" />
    </div>
  );
}
