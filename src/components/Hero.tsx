"use client";

import { motion } from "framer-motion";
import heroData from "@/data/hero.json";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="DJ performing in a dark industrial club with laser beams"
          className="w-full h-full object-cover opacity-50 grayscale"
          src="/images/hero-bg.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface to-surface" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <span className="px-4 py-1 border border-secondary text-secondary text-[10px] tracking-[0.2em] uppercase font-bold laser-glow-secondary">
            {heroData.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-7xl md:text-9xl font-headline font-black tracking-tighter text-white mb-4 uppercase"
        >
          {heroData.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-on-surface-variant font-light tracking-wide mb-12"
        >
          {heroData.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#booking"
            className="bg-primary text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm rounded-md hover:shadow-[0_0_20px_rgba(255,178,184,0.4)] transition-all duration-300"
          >
            Book Artist
          </a>
          <a
            href="#media"
            className="border border-outline-variant bg-surface-container-low/50 backdrop-blur-md text-white px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm rounded-md hover:bg-surface-container-highest transition-all duration-300"
          >
            Latest Sets
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
          Explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-tertiary-fixed-dim to-transparent" />
      </motion.div>
    </section>
  );
}
