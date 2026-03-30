import { Metadata } from "next";
import { BlogPageEnClient } from "./blog-client";
import { getBlogIndexAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog | Voice of the Medina Students - Insights from Saudi Arabia",
  description: "Latest insights on company formation, life, and investment in Saudi Arabia. Real experience from nearly a decade of entrepreneurship in Medina.",
  alternates: getBlogIndexAlternates("en"),
  keywords: ["Blog Saudi Arabia", "Company Formation Saudi Arabia", "Living in Medina", "Investment Saudi Arabia", "Premium Residency"],
  openGraph: {
    title: "Blog | Insights from Saudi Arabia - Voice of the Medina Students",
    description: "Latest insights on company formation, life, and investment in Saudi Arabia. Real experience from Medina.",
    url: "https://www.stimme-medinastudenten.de/en/blog",
    siteName: "Voice of the Medina Students",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Insights from Saudi Arabia",
    description: "Latest insights on company formation, life, and investment in Saudi Arabia.",
  },
};

export default function BlogEnPage() {
  return <BlogPageEnClient />;
}
