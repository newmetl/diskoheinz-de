"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroData from "@/data/hero.json";

const ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  soundcloud: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 15.5c0-.8.2-1.5.6-2.2v4.4c-.4-.7-.6-1.4-.6-2.2Zm2-3.2v6.4a.4.4 0 0 0 .8 0v-6.4a.4.4 0 0 0-.8 0Zm2-1v8.4a.4.4 0 0 0 .8 0v-8.4a.4.4 0 0 0-.8 0Zm2-.5v9a.4.4 0 0 0 .8 0v-9a.4.4 0 0 0-.8 0Zm2 .2v8.8a.4.4 0 0 0 .8 0v-8.8a.4.4 0 0 0-.8 0Zm2.4-2.5c-.2 0-.4.1-.4.3v11.2a.4.4 0 0 0 .4.3h7.8c1.8 0 3.3-1.5 3.3-3.3 0-1.9-1.5-3.4-3.3-3.4-.5 0-1 .1-1.4.3-.2-2.8-2.6-5-5.4-5-.4 0-.7 0-1 .1v-.2a.4.4 0 0 0-.4-.3h-.1Z" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.62.62 0 0 1-.86.2c-2.34-1.43-5.29-1.75-8.77-.96a.62.62 0 1 1-.28-1.22c3.8-.87 7.07-.5 9.7 1.12.3.18.38.56.2.86Zm1.23-2.72a.78.78 0 0 1-1.07.26c-2.68-1.65-6.77-2.13-9.94-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.14-.56 11.2 1.32.37.22.49.7.26 1.08Zm.1-2.84c-3.21-1.91-8.52-2.09-11.59-1.15a.94.94 0 1 1-.54-1.8c3.52-1.07 9.39-.86 13.09 1.34a.94.94 0 1 1-.96 1.61Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 7.3c-.3-1.1-1-1.9-2.1-2.2C19 4.6 12 4.6 12 4.6s-7 0-8.9.5C2 5.4 1.3 6.2 1 7.3.5 9.2.5 12 .5 12s0 2.8.5 4.7c.3 1.1 1 1.9 2.1 2.2 1.9.5 8.9.5 8.9.5s7 0 8.9-.5c1.1-.3 1.8-1.1 2.1-2.2.5-1.9.5-4.7.5-4.7s0-2.8-.5-4.7ZM9.8 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.1-.3-.2-.5-.4ZM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L7.9 9.8a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  ),
};

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mb-12 md:mb-16 flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+15px)] w-[80%] max-w-[500px] aspect-square"
          >
            <Image
              src="/images/disco.png"
              alt=""
              width={600}
              height={600}
              priority
              className="w-full h-full object-contain opacity-70 drop-shadow-[0_0_40px_rgba(253,54,146,0.35)]"
            />
          </motion.div>
          <Image
            src="/images/logo_1280x627.png"
            alt={heroData.name}
            width={640}
            height={313}
            priority
            className="relative h-auto w-full max-w-[640px] translate-y-[5px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-on-surface-variant font-light tracking-wide mb-6"
        >
          {heroData.tagline}
        </motion.p>

        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          aria-label="Social"
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8"
        >
          {heroData.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              aria-label={social.label}
              title={social.label}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-outline-variant/60 bg-surface-container-low/40 backdrop-blur-md text-on-surface-variant hover:text-primary hover:border-primary/60 hover:bg-surface-container-low/70 hover:shadow-[0_0_18px_rgba(255,178,184,0.35)] transition-all duration-300"
            >
              <span className="w-5 h-5 block">{ICONS[social.platform]}</span>
            </a>
          ))}
        </motion.nav>

        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          aria-label="Main"
          className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto"
        >
          {[
            { label: "Music", href: "#music" },
            { label: "Gigs", href: "#gigs" },
            { label: "Booking", href: "#booking" },
            { label: "Bio", href: "#bio" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border border-secondary bg-surface-container-low/60 backdrop-blur-md text-white px-6 sm:px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm rounded-md shadow-[0_0_15px_rgba(253,54,146,0.25)] hover:bg-secondary hover:text-on-secondary hover:shadow-[0_0_25px_rgba(253,54,146,0.55)] transition-all duration-300 text-center"
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      </div>

    </section>
  );
}
