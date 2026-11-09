/**
 * Endereço público do site, sem barra final. Usado em metadados, robots e sitemap.
 * Para publicar em outro domínio, defina NEXT_PUBLIC_SITE_URL no build.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://letraria.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Letraria";
export const SITE_DESCRIPTION =
  "Obras e formas desenhadas com letras: arte ASCII colorida e animada.";
