export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HeroData {
  name: string;
  tagline: string;
  badge: string;
  avatar: string;
  socials: SocialLink[];
}

export interface MediaEmbed {
  id: string;
  type: "youtube" | "soundcloud" | "spotify";
  url: string;
  title?: string;
  variant?: string;
  height?: number;
  thumbnailVideoId?: string;
}

export interface Gig {
  // Core
  id: string;
  title: string;
  venue: string;
  city: string;
  country?: string;
  starts_at: string; // ISO datetime with timezone offset
  ends_at?: string; // ISO datetime with timezone offset

  // Display
  stage?: string;
  lineup?: string[];
  description?: string;
  flyer_url?: string;
  event_url?: string;
  ticket_url?: string;

  // Flags
  status: "confirmed" | "pending" | "sold_out" | "cancelled";
  is_headliner?: boolean;
  is_private?: boolean;
}
