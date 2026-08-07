import { Metadata } from "next";
import { BlogPageClient } from "./blog-client";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Stimme der Medinastudenten - Einblicke aus Medina",
  description: "Erfahrungen, Wissen und praktische Einblicke von Studenten und Absolventen der Islamischen Universität in Medina.",
  keywords: ["Blog Medina", "Islamische Universität", "Leben in Medina", "Studium Medina", "Bewerbung Medina"],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Stimme der Medinastudenten",
    description: "Erfahrungen, Wissen und praktische Einblicke von Studenten und Absolventen der Islamischen Universität in Medina.",
    url: absoluteUrl("/blog"),
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Stimme der Medinastudenten",
    description: "Erfahrungen, Wissen und praktische Einblicke von Studenten und Absolventen der Islamischen Universität in Medina.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
