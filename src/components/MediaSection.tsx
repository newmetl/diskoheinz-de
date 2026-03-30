"use client";

import { motion } from "framer-motion";
import { Play, AudioLines, ExternalLink } from "lucide-react";
import { InstagramIcon } from "./icons";

const mixes = [
  { title: "Summer Equinox Mix", duration: "64:20", platform: "SoundCloud" },
  { title: "Midnight Pulse Pt. 2", duration: "58:12", platform: "SoundCloud" },
  { title: "Diskologne Live Set", duration: "72:45", platform: "SoundCloud" },
];

const instaImages = [
  { src: "/images/insta-1.jpg", alt: "Vinyl record on turntable in moody lighting" },
  { src: "/images/insta-2.jpg", alt: "Crowd silhouette with strobe light" },
  { src: "/images/insta-3.jpg", alt: "DJ booth with mixers under magenta light" },
  { src: "/images/insta-4.jpg", alt: "Minimalist techno event poster" },
];

export default function MediaSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto" id="media">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase mb-2">
          Media{" "}
          <span className="text-tertiary-fixed-dim">Assets</span>
        </h2>
        <div className="h-1 w-24 bg-tertiary-fixed-dim" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* YouTube Highlight - Video Thumbnail with Play Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-8"
        >
          <a
            href="https://youtube.com/playlist?list=PLu_PhkI5ea5sS2SCakYONpxvsPmWJH1vq"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-surface-container-low rounded-xl overflow-hidden group"
          >
            <div className="aspect-video relative">
              <img
                alt="DJ set in a warehouse with dramatic shadows and neon accents"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="/images/media-video-thumb.jpg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer">
                <Play
                  size={80}
                  className="text-white fill-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>
            <div className="p-6">
              <span className="text-secondary text-xs font-bold tracking-widest uppercase mb-2 block">
                Live Recording
              </span>
              <h3 className="text-2xl font-headline font-bold text-white">
                Warehouse Session 04: The Dark Room
              </h3>
            </div>
          </a>
        </motion.div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* SoundCloud Mix List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-container rounded-xl p-6 border-l-4 border-secondary"
          >
            <div className="flex items-center gap-4 mb-4">
              <AudioLines size={20} className="text-secondary" />
              <span className="font-headline font-bold text-white uppercase tracking-tighter">
                Latest Mixes
              </span>
            </div>

            <div className="space-y-2">
              {mixes.map((mix, i) => (
                <a
                  key={i}
                  href="https://soundcloud.com/diskoheinz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 hover:bg-surface-container-high rounded-md transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-surface-container-highest shrink-0 rounded-md flex items-center justify-center">
                    <Play
                      size={16}
                      className="text-on-surface-variant group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {mix.title}
                    </div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-tighter">
                      {mix.duration} &middot; {mix.platform}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="https://soundcloud.com/diskoheinz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center py-3 border border-outline-variant text-xs font-bold uppercase tracking-widest hover:border-white transition-colors rounded-md"
            >
              Open SoundCloud
            </a>
          </motion.div>

          {/* Instagram Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="https://instagram.com/diskoheinz"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="grid grid-cols-2 gap-2">
                {instaImages.map((img, i) => (
                  <img
                    key={i}
                    alt={img.alt}
                    className="w-full aspect-square object-cover rounded-md group-hover:opacity-80 transition-opacity"
                    src={img.src}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-on-surface-variant group-hover:text-white transition-colors">
                <InstagramIcon size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  @diskoheinz
                </span>
                <ExternalLink size={12} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
