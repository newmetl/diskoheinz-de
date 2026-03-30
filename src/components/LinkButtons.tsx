"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Globe,
  Disc3,
  Zap,
  ExternalLink,
} from "lucide-react";
import { YoutubeIcon, SoundCloudIcon, SpotifyIcon } from "./icons";
import type { LinkButton } from "@/data/types";
import linksData from "@/data/links.json";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FileText,
  Globe,
  Youtube: YoutubeIcon,
  CloudHail: SoundCloudIcon,
  Disc3,
  Zap,
  Music: SpotifyIcon,
};

export default function LinkButtons() {
  const links = (linksData as LinkButton[])
    .filter((l) => l.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section className="py-20 px-6">
      <div className="max-w-xl mx-auto space-y-3">
        {links.map((link, i) => {
          const Icon = iconMap[link.icon || ""] || ExternalLink;
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group block w-full p-5 bg-surface-container-highest/80 border border-outline-variant/40 rounded-lg hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(255,178,184,0.15)] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-container-highest rounded-md flex items-center justify-center shrink-0 group-hover:bg-surface-container transition-colors">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-headline font-bold text-white uppercase tracking-tight">
                    {link.label}
                  </span>
                  {link.description && (
                    <span className="block text-xs text-on-surface-variant mt-0.5">
                      {link.description}
                    </span>
                  )}
                </div>
                <ExternalLink
                  size={16}
                  className="text-on-surface-variant group-hover:text-secondary transition-colors shrink-0"
                />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
