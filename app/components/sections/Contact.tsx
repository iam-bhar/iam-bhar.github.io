"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Link2 } from "lucide-react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GlassCard from "@/app/components/ui/GlassCard";
import TiltIcon from "@/app/components/ui/TiltIcon";
import { profile } from "@/app/data/resume";
import type { AccentKey } from "@/app/data/theme";

const contactItems: { icon: typeof Mail; label: string; value: string; href?: string; accent: AccentKey }[] = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, accent: "violet" },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}`, accent: "cyan" },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined, accent: "amber" },
  { icon: Link2, label: "LinkedIn", value: "Connect on LinkedIn", href: profile.linkedin, accent: "rose" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Let's Talk" title="Get In Touch" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard accent="rose" className="p-8 sm:p-10">
            <p className="mx-auto mb-8 max-w-lg text-balance text-center text-sm leading-relaxed text-ink-soft sm:text-base">
              Open to Technical Lead / Senior Frontend roles and interesting collaborations.
              Reach out through any of the channels below.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactItems.map((item, i) => {
                const Content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-glass/40 p-4 transition-all duration-300 hover:border-line-strong hover:bg-glass/60">
                    <TiltIcon icon={item.icon} accent={item.accent} size={18} className="h-11 w-11" />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-ink-faint">{item.label}</p>
                      <p className="truncate text-sm font-medium text-ink">{item.value}</p>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {Content}
                      </a>
                    ) : (
                      Content
                    )}
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
