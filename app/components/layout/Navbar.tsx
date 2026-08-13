"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, User, Briefcase, FolderGit2, Code2, GraduationCap, Mail } from "lucide-react";
import { cn } from "@/app/lib/cn";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import Dock, { type DockItem } from "@/app/components/ui/Dock";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const shouldReduceMotion = useReducedMotion();

  return (
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
            "relative flex w-full items-center justify-between gap-4 rounded-full border border-line px-5 py-2.5 backdrop-blur-2xl transition-all duration-500",
            scrolled
              ? "bg-midnight/80 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "bg-glass/55 shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)]",
          )}
        >
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo via-purple to-cyan text-xs font-bold text-white shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
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
              href="#contact"
              className="neu-surface-sm rounded-full border border-line bg-gradient-to-r from-indigo/90 to-purple/90 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_16px_rgba(168,85,247,0.35)] transition-all duration-300 hover:shadow-[0_6px_22px_rgba(168,85,247,0.5)]"
            >
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="neu-surface flex h-10 w-10 items-center justify-center rounded-full text-ink"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-3xl border border-line bg-midnight/90 p-3 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-glass/70 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="neu-surface-sm mt-1 block rounded-2xl bg-gradient-to-r from-indigo to-purple px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
