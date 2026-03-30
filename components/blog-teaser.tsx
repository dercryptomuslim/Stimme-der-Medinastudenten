import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n";

const placeholderPostsDe = [
  {
    slug: "leben-in-medina",
    title: "Das Leben als Student in Medina",
    date: "Bald verfügbar",
    readTime: "- min",
    excerpt: "Ein ehrlicher Einblick in den Alltag, die Herausforderungen und die besonderen Momente als Student an der Islamischen Universität.",
  },
  {
    slug: "arabisch-lernen",
    title: "Arabisch lernen in Medina – Tipps & Erfahrungen",
    date: "Bald verfügbar",
    readTime: "- min",
    excerpt: "Praktische Tipps und persönliche Erfahrungen zum Erlernen der arabischen Sprache direkt in Medina.",
  },
  {
    slug: "bewerbungstipps",
    title: "Bewerbung an der Islamischen Universität – Was du wissen musst",
    date: "Bald verfügbar",
    readTime: "- min",
    excerpt: "Alles Wichtige rund um die Bewerbung, Voraussetzungen und den Ablauf für Studieninteressierte aus dem DACH-Raum.",
  },
];

const placeholderPostsEn = [
  {
    slug: "life-in-medina",
    title: "Life as a Student in Medina",
    date: "Coming soon",
    readTime: "- min",
    excerpt: "An honest look at daily life, challenges, and special moments as a student at the Islamic University.",
  },
  {
    slug: "learning-arabic",
    title: "Learning Arabic in Medina – Tips & Experiences",
    date: "Coming soon",
    readTime: "- min",
    excerpt: "Practical tips and personal experiences on learning the Arabic language directly in Medina.",
  },
  {
    slug: "application-tips",
    title: "Applying to the Islamic University – What You Need to Know",
    date: "Coming soon",
    readTime: "- min",
    excerpt: "Everything important about the application, requirements, and process for prospective students from the DACH region.",
  },
];

export function BlogTeaser({ locale = "de" }: { locale?: Locale }) {
  const t = (de: string, en: string) => (locale === "en" ? en : de);
  const href = (raw: string) => localizeHref(raw, locale);
  const posts = locale === "en" ? placeholderPostsEn : placeholderPostsDe;

  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-gold tracking-wide uppercase mb-3 block">
              {t("Blog & Wissen", "Blog & Knowledge")}
            </span>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-4">
              {t("Aktuelle Einblicke", "Latest Insights")}
            </h2>
            <p className="text-lg text-slate-600">
              {t(
                "Erfahrungen, Wissen und praktische Einblicke von Studenten und Absolventen der Islamischen Universität in Medina.",
                "Experiences, knowledge, and practical insights from students and graduates of the Islamic University of Madinah."
              )}
            </p>
          </div>

          <Button asChild variant="outline" className="hidden md:flex border-slate-200 hover:bg-slate-50 hover:text-navy hover:border-gold/30">
            <Link href={href("/blog")}>
              {t("Alle Artikel ansehen", "View all articles")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} className="group h-full">
              <Card className="h-full overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-50">

                {/* Placeholder Image Area */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-navy/5 to-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-sm font-medium">{t("Bild folgt", "Image coming soon")}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-gold mt-auto">
                    {t("Bald verfügbar", "Coming soon")}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button asChild variant="outline" className="w-full border-slate-200 hover:bg-slate-50 hover:text-navy">
            <Link href={href("/blog")}>
              {t("Alle Artikel ansehen", "View all articles")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
