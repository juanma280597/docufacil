import type { MetadataRoute } from "next";
import { GENERATORS } from "@/lib/catalog";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://docufacil.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["/", "/acerca-de/", "/privacidad/", "/terminos/", "/contacto/"].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1.0 : 0.4,
    })
  );

  const generatorRoutes = GENERATORS.map((g) => ({
    url: `${SITE_URL}/${g.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...generatorRoutes];
}
