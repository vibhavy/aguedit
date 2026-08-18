import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Static marketing routes included in the sitemap with sensible priorities. */
const routes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "monthly", priority: 0.9 },
  { path: "/security", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/download", changeFrequency: "weekly", priority: 0.9 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
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
