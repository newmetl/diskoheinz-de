import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Diskoheinz",
  description:
    "Official website of DISKOHEINZ – DJ, producer, and curator of techno and house with a slice of disco, soul, and love. Book now for club nights, festivals, and private events.",
  keywords: [
    "DISKOHEINZ",
    "DJ",
    "Techno",
    "House",
    "Disco",
    "Cologne",
    "Booking",
  ],
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "DISKOHEINZ",
    description:
      "Techno and house with a slice of disco, soul, and love.",
    type: "website",
    locale: "de_DE",
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
      </body>
    </html>
  );
}
