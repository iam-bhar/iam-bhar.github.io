"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
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
  const [hovered, setHovered] = useState(false);
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
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-8 whitespace-nowrap rounded-full border border-line bg-midnight/90 px-2.5 py-1 text-[11px] font-medium text-ink shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.a
        href={item.href}
        aria-label={item.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
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
