"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";

interface ConsentEmbedProps {
  platform: string;
  children: React.ReactNode;
}

export default function ConsentEmbed({
  platform,
  children,
}: ConsentEmbedProps) {
  const [consented, setConsented] = useState(false);

  if (consented) {
    return <>{children}</>;
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
        Dabei werden Daten an {platform} übertragen.{" "}
        <a href="/datenschutz" className="underline hover:text-white">
          Mehr erfahren
        </a>
      </p>
    </div>
  );
}
