import { Mail } from "lucide-react";
import { InstagramIcon, YoutubeIcon, SoundCloudIcon, SpotifyIcon } from "./icons";
import heroData from "@/data/hero.json";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  soundcloud: SoundCloudIcon,
  spotify: SpotifyIcon,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5">
      {/* Social Icons Row */}
      <div className="py-12 border-b border-white/5">
        <div className="flex justify-center gap-8 md:gap-12">
          {heroData.socials.map((social) => {
            const Icon = socialIcons[social.platform];
            if (!Icon) return null;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-white transition-colors group"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.platform.slice(0, 2).toUpperCase()}
                  </span>
                  <Icon size={28} />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 gap-6">
        <div className="font-headline font-bold text-white text-lg tracking-tighter">
          DISKOHEINZ
        </div>
        <div className="flex gap-8">
          <a
            href="/impressum"
            className="text-xs tracking-widest text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            className="text-xs tracking-widest text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors"
          >
            Datenschutz
          </a>
        </div>
        <div className="text-xs tracking-widest text-on-surface-variant">
          {`\u00A9 ${new Date().getFullYear()} DISKOHEINZ. SOUL & LOVE.`}
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}
