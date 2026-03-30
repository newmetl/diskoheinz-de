"use client";

import { motion } from "framer-motion";
import heroData from "@/data/hero.json";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden">
      {/* Background: dark base with subtle laser texture */}
      <div className="absolute inset-0 z-0">
        <img
          alt=""
          className="w-full h-full object-cover opacity-25 grayscale"
          src="/images/hero-bg.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/90 to-surface" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <span className="px-4 py-1 border border-secondary text-secondary text-[10px] tracking-[0.2em] uppercase font-bold laser-glow-secondary">
                {heroData.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter text-white mb-4 uppercase"
            >
              {heroData.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-on-surface-variant font-light tracking-wide mb-10 max-w-lg mx-auto lg:mx-0"
            >
              {heroData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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

          {/* Right: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Ambient glow */}
              <div className="absolute -inset-8 rounded-3xl opacity-60 blur-3xl bg-gradient-to-br from-secondary/40 via-tertiary-fixed-dim/20 to-secondary/20 group-hover:opacity-80 transition-opacity duration-700" />

              {/* Portrait container */}
              <div className="relative w-64 h-80 md:w-72 md:h-[24rem] lg:w-80 lg:h-[28rem] rounded-2xl overflow-hidden border border-white/10">
                {/* The image - NOT grayscale so it stands out from the dark BG */}
                <img
                  alt="DISKOHEINZ"
                  src="/images/diskoheinz-portrait.jpg"
                  className="w-full h-full object-cover object-[center_15%]"
                />
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                {/* Subtle top darkening */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-surface/30 to-transparent" />
              </div>

              {/* Cyan laser line below */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-tertiary-fixed-dim to-transparent laser-glow-tertiary" />
            </div>
          </motion.div>
        </div>
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
