import type { MetadataRoute } from "next";
import { blogPostsDe } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.stimme-medinastudenten.de";
  const now = new Date();

  const staticRoutes = [
    "",
    "/impressum",
    "/datenschutz",
    "/blog",
  ];

  const blogRoutes = blogPostsDe.map((post) => `/blog/${post.slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes];

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
