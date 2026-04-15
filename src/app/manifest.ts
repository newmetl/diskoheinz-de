import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DISKOHEINZ",
    short_name: "DISKOHEINZ",
    description:
      "Techno and house with a slice of disco, soul, and love. Book DISKOHEINZ for club nights, festivals, and private events.",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/images/favicon.png", sizes: "64x64", type: "image/png" },
    ],
  };
}
