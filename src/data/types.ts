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
}

export interface InstagramPost {
  id: string;
  url: string;
  image: string;
  alt: string;
  postedAt: string;
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
