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

export interface LinkButton {
  id: string;
  label: string;
  url: string;
  description?: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
}

export interface MediaEmbed {
  id: string;
  type: "youtube" | "soundcloud" | "spotify";
  url: string;
  title?: string;
  variant?: string;
  height?: number;
}

export interface Gig {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time?: string;
  event_url?: string;
  stage?: string;
  status?: "confirmed" | "pending" | "sold_out";
}
