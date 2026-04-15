"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";

interface ConsentEmbedProps {
  platform: string;
  children: React.ReactNode;
  preview?: React.ReactNode;
}

export default function ConsentEmbed({
  platform,
  children,
  preview,
}: ConsentEmbedProps) {
  const [consented, setConsented] = useState(false);

  if (consented) {
    return <>{children}</>;
  }

  if (preview) {
    return (
      <button
        type="button"
        onClick={() => setConsented(true)}
        aria-label={`${platform}-Inhalte laden`}
        className="group relative block w-full overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {preview}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pt-10 pb-3">
          <p className="text-xs text-white/90 text-center">
            Klick lädt <span className="font-medium">{platform}</span> · Daten
            werden an {platform} übertragen
          </p>
        </div>
      </button>
    );
  }

  return (
    <div
      className="w-full bg-surface-container-low rounded-xl flex flex-col items-center justify-center p-8 min-h-[200px] cursor-pointer group hover:bg-surface-container transition-colors duration-300"
      onClick={() => setConsented(true)}
    >
      <ShieldAlert
        size={32}
        className="text-on-surface-variant mb-4 group-hover:text-tertiary-fixed-dim transition-colors"
      />
      <p className="text-sm text-on-surface-variant text-center mb-2">
        Klick um <span className="text-white font-medium">{platform}</span>
        -Inhalte zu laden.
      </p>
      <p className="text-[10px] text-on-surface-variant/60 text-center">
        Dabei werden Daten an {platform} übertragen.
      </p>
    </div>
  );
}
