"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import ConsentEmbed from "./ConsentEmbed";
import mediaData from "@/data/media.json";
import type { MediaEmbed } from "@/data/types";

const media = mediaData as MediaEmbed[];
const youtube = media.find((m) => m.type === "youtube");
const soundcloud = media.find((m) => m.type === "soundcloud");

export default function MediaSection() {
  return (
    <section
      className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
      id="music"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase mb-2">
          <span className="text-tertiary-fixed-dim">Music</span>
        </h2>
        <div className="h-1 w-24 bg-tertiary-fixed-dim" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* YouTube Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-surface-container-low rounded-xl overflow-hidden border-l-4 border-tertiary-fixed-dim flex flex-col"
        >
          <div className="flex items-center justify-between gap-4 p-6 pb-4">
            <div className="flex items-center gap-4">
              <Play size={20} className="text-tertiary-fixed-dim" />
              <span className="font-headline font-bold text-white uppercase tracking-tighter">
                YouTube Recordings
              </span>
            </div>
            <a
              href="https://www.youtube.com/playlist?list=PLu_PhkI5ea5sS2SCakYONpxvsPmWJH1vq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-white transition-colors"
              aria-label="Open playlist on YouTube"
            >
              <ExternalLink size={16} />
            </a>
          </div>
          <div className="px-6 pb-6 flex-1">
            <ConsentEmbed platform="YouTube">
              <div className="aspect-video rounded-md overflow-hidden">
                {youtube && (
                  <iframe
                    src={youtube.url}
                    title="YouTube playlist"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}
              </div>
            </ConsentEmbed>
          </div>
        </motion.div>

        {/* SoundCloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface-container rounded-xl overflow-hidden border-l-4 border-secondary flex flex-col"
        >
          <div className="flex items-center justify-between gap-4 p-6 pb-4">
            <div className="flex items-center gap-4">
              <Play size={20} className="text-secondary" />
              <span className="font-headline font-bold text-white uppercase tracking-tighter">
                Soundcloud Sets
              </span>
            </div>
            <a
              href="https://soundcloud.com/diskoheinz/tracks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-white transition-colors"
              aria-label="Open tracks on SoundCloud"
            >
              <ExternalLink size={16} />
            </a>
          </div>
          <div className="px-6 pb-6 flex-1">
            <ConsentEmbed platform="SoundCloud">
              <div className="rounded-md overflow-hidden bg-surface-container-low">
                {soundcloud && (
                  <iframe
                    src={soundcloud.url}
                    title="SoundCloud tracks"
                    allow="autoplay"
                    className="w-full border-0"
                    style={{ height: soundcloud.height ?? 450 }}
                  />
                )}
              </div>
            </ConsentEmbed>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
