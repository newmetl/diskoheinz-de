"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ArtistBio() {
  return (
    <section
      className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
      id="bio"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tighter uppercase mb-2">
          <span className="text-tertiary-fixed-dim">Bio</span>
        </h2>
        <div className="h-1 w-24 bg-tertiary-fixed-dim" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border-l-4 border-tertiary-fixed-dim bg-surface-container-low">
            <Image
              src="/images/diskoheinz-portrait-2026.jpg"
              alt="Diskoheinz portrait"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-3 space-y-5 text-on-surface-variant leading-relaxed"
        >
          <p>
            Techno and house with a slice of disco, soul, and love – that&apos;s{" "}
            <a
              href="https://www.instagram.com/diskoheinz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-tertiary-fixed-dim transition-colors"
            >
              Diskoheinz
            </a>
            . As founder and resident of{" "}
            <a
              href="https://www.instagram.com/diskologne"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-tertiary-fixed-dim transition-colors"
            >
              Diskologne
            </a>
            , he blends powerful house beats with shimmering disco influences,
            driven by a deep passion for music and an unstoppable urge to
            connect people through sound. Known for his smooth and engaging
            sets, he&apos;s a passionate advocate for inclusive and respectful
            music scenes.
          </p>
          <p>
            His newest format,{" "}
            <a
              href="https://www.instagram.com/diskodynamite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-tertiary-fixed-dim transition-colors"
            >
              Disko Dynamite
            </a>
            , is where friendships, music, and pure disko energy collide.
            Diskoheinz brings together his closest friends to fuse everything
            between house, tech house, and techno.
          </p>
          <p>
            When he&apos;s not lighting up dancefloors in Cologne and beyond,
            Diskoheinz is also a resident with Munich&apos;s{" "}
            <a
              href="https://www.instagram.com/friendsandfriends.muc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-tertiary-fixed-dim transition-colors"
            >
              friends.
            </a>{" "}
            community, steadily spreading his signature blend of house, disco,
            and connection further south.
          </p>
          <p className="text-white font-semibold">
            One thing&apos;s for sure: Diskoheinz is just getting started.
          </p>
          <div className="pt-4">
            <a
              href="https://drive.google.com/drive/folders/13PsKFG-CQ7ph13HjNOGKo2hOUXgHh82p?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-tertiary-fixed-dim text-on-tertiary-fixed font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Press Kit
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
