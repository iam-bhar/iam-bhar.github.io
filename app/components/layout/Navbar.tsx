"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { User, Briefcase, FolderGit2, Code2, GraduationCap, Mail, Download } from "lucide-react";
import { cn } from "@/app/lib/cn";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import Dock, { type DockItem } from "@/app/components/ui/Dock";
import { profile } from "@/app/data/resume";

const links: DockItem[] = [
  { href: "#about", label: "About", icon: User },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div className="relative w-full max-w-3xl rounded-full p-[1.5px]">
          <div className="animate-name-glow absolute inset-0 rounded-full bg-gradient-to-r from-indigo via-cyan to-purple opacity-40 blur-[6px]" />
          <nav
            className={cn(
              "liquid-glass-panel relative flex w-full items-center justify-between gap-4 rounded-full border border-line px-5 py-2.5 backdrop-blur-2xl transition-all duration-500",
              scrolled
                ? "bg-midnight/80 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "bg-glass/55 shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)]",
            )}
          >
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo via-purple to-cyan text-xs font-bold text-white shadow-[0_2px_10px_rgba(36,179,85,0.5)]">
              BK
            </span>
            <span className="hidden bg-gradient-to-r from-indigo via-purple to-cyan bg-clip-text text-transparent sm:inline">Bhargav</span>{" "}
            <span className="hidden text-ink-faint sm:inline">Pulluru</span>
          </a>

          <div className="hidden sm:block">
            <Dock items={links} disableMagnify={shouldReduceMotion ?? false} />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <ThemeToggle />
            <a
              href={profile.resume}
              download
              aria-label="Download resume"
              title="Download resume"
              className="neu-surface liquid-glass-sm flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              <Download size={16} />
            </a>
            <a
              href="#contact"
              className="neu-surface-sm liquid-glass-sm rounded-full border border-line bg-gradient-to-r from-indigo/90 to-purple/90 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_16px_rgba(36,179,85,0.35)] transition-all duration-300 hover:shadow-[0_6px_22px_rgba(36,179,85,0.5)]"
            >
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <a
              href={profile.resume}
              download
              aria-label="Download resume"
              title="Download resume"
              className="neu-surface liquid-glass-sm flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              <Download size={16} />
            </a>
            <a
              href="#contact"
              className="neu-surface-sm liquid-glass-sm rounded-full border border-line bg-gradient-to-r from-indigo/90 to-purple/90 px-3 py-2 text-sm font-medium text-white shadow-[0_4px_16px_rgba(36,179,85,0.35)]"
            >
              Hire Me
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
      </motion.header>

      <nav
        aria-label="Section navigation"
        className="liquid-glass-panel fixed inset-x-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] justify-center rounded-full border border-line bg-midnight/90 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:hidden"
        style={{ position: "fixed", bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <Dock items={links} disableMagnify />
      </nav>
    </>
  );
}
