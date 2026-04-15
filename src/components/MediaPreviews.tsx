"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// --- deterministic PRNG ---------------------------------------------------
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateWaveform(seed: string, count = 96): number[] {
  const rand = seededRandom(hashString(seed));
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    // layered envelope — two sines for organic shape
    const env =
      0.55 +
      0.25 * Math.sin(t * Math.PI * 3.1 + 0.7) +
      0.2 * Math.sin(t * Math.PI * 7.3 + 1.9);
    const r = rand();
    bars.push(Math.max(0.12, Math.min(1, env * 0.65 + r * 0.45)));
  }
  return bars;
}

// --- YouTube preview ------------------------------------------------------
interface YouTubePreviewProps {
  videoId: string;
}

export function YouTubePreview({ videoId }: YouTubePreviewProps) {
  const [src, setSrc] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <div className="relative aspect-video bg-black overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        onError={() =>
          setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)
        }
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-black/70 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#ff0000] group-hover:scale-110 shadow-lg">
          <Play size={32} className="text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  );
}

// --- SoundCloud preview ---------------------------------------------------
interface SoundCloudPreviewProps {
  seed?: string;
}

export function SoundCloudPreview({
  seed = "diskoheinz-soundcloud",
}: SoundCloudPreviewProps) {
  const bars = generateWaveform(seed);
  const vbWidth = 1000;
  const vbHeight = 320;
  const barWidth = vbWidth / bars.length;
  const gap = barWidth * 0.28;

  return (
    <div className="relative aspect-[5/2] overflow-hidden bg-gradient-to-br from-[#ff7700] via-[#ff5500] to-[#cc3300]">
      {/* subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)",
        }}
      />
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {bars.map((h, i) => {
          const barH = h * vbHeight * 0.82;
          const y = (vbHeight - barH) / 2;
          return (
            <rect
              key={i}
              x={i * barWidth + gap / 2}
              y={y}
              width={barWidth - gap}
              height={barH}
              fill="white"
              opacity={0.78}
              rx={1}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 shadow-lg ring-1 ring-white/30">
          <Play size={32} className="text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  );
}
