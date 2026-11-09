import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { WORKS } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "/",
    ...WORKS.map((w) => `/${w.slug}`),
    "/coracao",
    "/lirios",
    "/buque",
  ];
  return routes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified }));
}
