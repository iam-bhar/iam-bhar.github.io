"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/cn";

export type DockItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/** macOS-dock-style icon nav: icons magnify based on cursor proximity to the pointer's x position. */
export default function Dock({ items, disableMagnify = false }: { items: DockItem[]; disableMagnify?: boolean }) {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <ul
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-1"
    >
      {items.map((item) => (
        <DockIcon key={item.href} item={item} mouseX={mouseX} disableMagnify={disableMagnify} />
      ))}
    </ul>
  );
}

function DockIcon({ item, mouseX, disableMagnify }: { item: DockItem; mouseX: MotionValue<number>; disableMagnify: boolean }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const Icon = item.icon;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const rawSize = useTransform(distance, [-120, 0, 120], [34, 50, 34]);
  const springSize = useSpring(rawSize, { mass: 0.1, stiffness: 200, damping: 16 });
  const size = disableMagnify ? 34 : springSize;

  return (
    <li ref={ref} className="relative flex flex-col items-center">
      <motion.a
        href={item.href}
        aria-label={item.label}
        style={{ width: size, height: size }}
        className={cn(
          "neu-surface-sm liquid-glass-sm flex min-h-9 min-w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:text-ink",
        )}
      >
        <Icon size={16} className="pointer-events-none" />
      </motion.a>
    </li>
  );
}
