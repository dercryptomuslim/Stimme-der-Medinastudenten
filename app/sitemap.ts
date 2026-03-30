import type { MetadataRoute } from "next";
import { blogPostsDe, blogPostsEn } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.stimme-medinastudenten.de";
  const now = new Date();

  const staticRoutes = [
    "",
    "/impressum",
    "/datenschutz",
    "/blog",
    "/en",
    "/en/imprint",
    "/en/privacy",
    "/en/blog",
  ];

  const blogRoutesDe = blogPostsDe.map((post) => `/blog/${post.slug}`);
  const blogRoutesEn = blogPostsEn.map((post) => `/en/blog/${post.slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutesDe, ...blogRoutesEn];

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
