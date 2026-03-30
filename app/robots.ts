import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.stimme-medinastudenten.de/sitemap.xml",
    host: "https://www.stimme-medinastudenten.de",
  };
}
