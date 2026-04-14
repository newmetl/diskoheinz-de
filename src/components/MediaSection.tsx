"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { InstagramIcon } from "./icons";
import ConsentEmbed from "./ConsentEmbed";
import mediaData from "@/data/media.json";
import instagramData from "@/data/instagram.json";
import type { MediaEmbed, InstagramPost } from "@/data/types";

const media = mediaData as MediaEmbed[];
const youtube = media.find((m) => m.type === "youtube");
const soundcloud = media.find((m) => m.type === "soundcloud");

const instagramPosts = (instagramData as InstagramPost[])
  .slice()
  .sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  .slice(0, 4);

export default function MediaSection() {
  return (
    <section
      className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
      id="media"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase mb-2">
          Media <span className="text-tertiary-fixed-dim">Assets</span>
        </h2>
        <div className="h-1 w-24 bg-tertiary-fixed-dim" />
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* YouTube Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-surface-container-low rounded-xl overflow-hidden border-l-4 border-tertiary-fixed-dim">
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
            <div className="px-6 pb-6">
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
          </div>
        </motion.div>

        {/* Row 2: SoundCloud + Instagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SoundCloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-container rounded-xl overflow-hidden border-l-4 border-secondary"
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
            <div className="px-6 pb-6">
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

          {/* Instagram */}
          {instagramPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-2">
                {instagramPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative aspect-square overflow-hidden rounded-md"
                  >
                    <img
                      alt={post.alt}
                      src={post.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  </a>
                ))}
              </div>
              <a
                href="https://instagram.com/diskoheinz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 text-on-surface-variant hover:text-white transition-colors"
              >
                <InstagramIcon size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  @diskoheinz
                </span>
                <ExternalLink size={12} />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
