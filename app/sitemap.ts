import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { WORKS } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "/",
    "/app",
    ...WORKS.map((w) => `/app/${w.slug}`),
    "/app/coracao",
    "/app/lirios",
    "/app/buque",
  ];
  return routes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified }));
}
