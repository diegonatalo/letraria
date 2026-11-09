import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/lib/site";
import { WORKS } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...WORKS.map((w) => ({ url: `${BASE}/${w.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 })),
    { url: `${BASE}/coracao`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/lirios`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/buque`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
}
