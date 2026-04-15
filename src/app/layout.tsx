import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = "https://diskoheinz.de";
const ogDescription =
  "Techno and house with a slice of disco, soul, and love. Book DISKOHEINZ for club nights, festivals, and private events.";
// ~155 chars — fits Google's SERP snippet length.
const metaDescription =
  "DISKOHEINZ – DJ, producer & curator. Techno and house with a slice of disco, soul, and love. Book now for club nights, festivals & private events.";

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DISKOHEINZ – DJ, Producer & Booking",
    template: "%s | DISKOHEINZ",
  },
  description: metaDescription,
  keywords: [
    "DISKOHEINZ",
    "DJ",
    "Techno",
    "House",
    "Disco",
    "Cologne",
    "Köln",
    "Booking",
  ],
  authors: [{ name: "DISKOHEINZ" }],
  creator: "DISKOHEINZ",
  publisher: "DISKOHEINZ",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DISKOHEINZ – DJ, Producer & Booking",
    description: ogDescription,
    url: siteUrl,
    siteName: "DISKOHEINZ",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DISKOHEINZ – Techno and house with a slice of disco, soul, and love.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DISKOHEINZ – DJ, Producer & Booking",
    description: ogDescription,
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "DISKOHEINZ",
  alternateName: "Diskoheinz",
  url: siteUrl,
  image: `${siteUrl}/images/og-image.jpg`,
  logo: `${siteUrl}/images/logo_1280x627.png`,
  description: ogDescription,
  genre: ["Techno", "House", "Disco"],
  location: {
    "@type": "Place",
    name: "Cologne, Germany",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface text-on-surface font-body antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
