import { Metadata } from "next";
import { BlogPageClient } from "./blog-client";
import { getBlogIndexAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog | Stimme der Medinastudenten - Einblicke aus Saudi-Arabien",
  description: "Aktuelle Einblicke zu Firmengründung, Leben und Investment in Saudi-Arabien. Echte Erfahrung aus fast einem Jahrzehnt Unternehmertum in Medina.",
  alternates: getBlogIndexAlternates("de"),
  keywords: ["Blog Saudi-Arabien", "Firmengründung Saudi-Arabien", "Leben in Medina", "Investment Saudi-Arabien", "Premium Residency"],
  openGraph: {
    title: "Blog | Einblicke aus Saudi-Arabien - Stimme der Medinastudenten",
    description: "Aktuelle Einblicke zu Firmengründung, Leben und Investment in Saudi-Arabien. Echte Erfahrung aus Medina.",
    url: "https://www.stimme-medinastudenten.de/blog",
    siteName: "Stimme der Medinastudenten",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Einblicke aus Saudi-Arabien",
    description: "Aktuelle Einblicke zu Firmengründung, Leben und Investment in Saudi-Arabien.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
