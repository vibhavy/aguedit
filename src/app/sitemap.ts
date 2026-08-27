import type { MetadataRoute } from "next";
import { featurePages } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/** Static marketing routes included in the sitemap with sensible priorities. */
const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "monthly", priority: 0.9 },
  { path: "/utilities", changeFrequency: "monthly", priority: 0.8 },
  // One page per feature.
  ...featurePages.map((page) => ({
    path: `/features/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  { path: "/security", changeFrequency: "monthly", priority: 0.9 },
  { path: "/download", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: new URL(r.path, siteConfig.url).toString(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
