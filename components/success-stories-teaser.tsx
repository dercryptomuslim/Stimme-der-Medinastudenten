import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n";

const highlightsDe = [
  {
    title: "5 Fakultäten",
    category: "Studienschwerpunkt",
    description: "Scharia, Da'wa & Usul ad-Din, Hadith, Qur'an und Arabische Sprache – fünf spezialisierte Fakultäten für umfassende islamische Bildung.",
    icon: BookOpen
  },
  {
    title: "Vollstipendium & Unterkunft",
    category: "Unterstützung",
    description: "Kostenloses Studium, monatliches Taschengeld (840 SAR), kostenlose Unterkunft, subventioniertes Essen und medizinische Versorgung.",
    icon: GraduationCap
  },
  {
    title: "Internationale Gemeinschaft",
    category: "Studentenleben",
    description: "Studenten aus über 100 Ländern studieren gemeinsam in Medina – in unmittelbarer Nähe zur Prophetenmoschee.",
    icon: Users
  }
];

const highlightsEn = [
  {
    title: "5 Faculties",
    category: "Main Focus",
    description: "Shariah, Da'wah & Usul ad-Din, Hadith, Quran, and Arabic Language – five specialised faculties for comprehensive Islamic education.",
    icon: BookOpen
  },
  {
    title: "Full Scholarship & Housing",
    category: "Support",
    description: "Free education, monthly allowance (840 SAR), free accommodation, subsidised meals, and medical care.",
    icon: GraduationCap
  },
  {
    title: "International Community",
    category: "Student Life",
    description: "Students from over 100 countries study together in Medina – in close proximity to the Prophet's Mosque.",
    icon: Users
  }
];

export function SuccessStoriesTeaser({ locale = "de" }: { locale?: Locale }) {
  const t = (de: string, en: string) => (locale === "en" ? en : de);
  const highlights = locale === "en" ? highlightsEn : highlightsDe;
  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-4">
              {t("Das Studium in Medina", "Studying in Medina")}
            </h2>
            <p className="text-lg text-slate-600">
              {t(
                "Einblicke in das akademische Leben und die vielfältigen Möglichkeiten an der Islamischen Universität.",
                "Insights into academic life and the diverse opportunities at the Islamic University."
              )}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="group h-full">
              <Card className="h-full overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-50">

                {/* Icon Area */}
                <div className="relative h-48 w-full bg-white border-b border-slate-100 p-6 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-navy/5 flex items-center justify-center">
                    <item.icon className="h-10 w-10 text-gold" />
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gold border border-slate-100 shadow-sm">
                    {item.category}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
