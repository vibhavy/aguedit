import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#f6f7fb",
    icons: [
      { src: "/aguedit-icon.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
