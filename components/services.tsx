import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, Scale, Cpu, ArrowUpRight, ArrowRight, ScrollText, Mic, BookMarked } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n";

const studyAreasDe = [
  {
    title: "Fakultät für Scharia",
    description: "Islamisches Recht (Fiqh), Rechtsgrundlagen (Usul al-Fiqh), Erbrecht, vergleichende Rechtswissenschaft und islamische Wirtschaftslehre.",
    icon: Scale,
    features: ["Fiqh", "Usul al-Fiqh", "Erbrecht", "Islamische Wirtschaft"],
  },
  {
    title: "Fakultät für Da'wa & Usul ad-Din",
    description: "Glaubenslehre (Aqidah), Einladung zum Islam (Da'wa), vergleichende Religionswissenschaft, Pädagogik und Psychologie.",
    icon: Mic,
    features: ["Aqidah", "Da'wa", "Religionswissenschaft", "Pädagogik"],
  },
  {
    title: "Fakultät für Hadith & Islamische Studien",
    description: "Die Wissenschaften des Hadith, Hadith-Überlieferungsketten, Hadith-Kritik, Sira (Prophetenbiographie) und islamische Geschichte.",
    icon: ScrollText,
    features: ["Hadith-Wissenschaften", "Sira", "Islamische Geschichte"],
  },
  {
    title: "Fakultät für Qur'an & Islamische Studien",
    description: "Qur'an-Exegese (Tafsir), Qur'an-Rezitation (Tilawa), Qur'an-Wissenschaften und Tajwid.",
    icon: BookOpen,
    features: ["Tafsir", "Tilawa", "Qur'an-Wissenschaften", "Tajwid"],
  },
  {
    title: "Fakultät für Arabische Sprache",
    description: "Arabische Grammatik (Nahw), Morphologie (Sarf), Rhetorik (Balagha), arabische Literatur und Linguistik.",
    icon: Languages,
    features: ["Nahw", "Sarf", "Balagha", "Arabische Literatur"],
  },
];

const studyAreasEn = [
  {
    title: "Faculty of Shariah",
    description: "Islamic jurisprudence (Fiqh), legal theory (Usul al-Fiqh), inheritance law, comparative law, and Islamic economics.",
    icon: Scale,
    features: ["Fiqh", "Usul al-Fiqh", "Inheritance Law", "Islamic Economics"],
  },
  {
    title: "Faculty of Da'wah & Usul ad-Din",
    description: "Islamic creed (Aqidah), propagation of Islam (Da'wah), comparative religion, education, and psychology.",
    icon: Mic,
    features: ["Aqidah", "Da'wah", "Comparative Religion", "Education"],
  },
  {
    title: "Faculty of Hadith & Islamic Studies",
    description: "Hadith sciences, chains of narration, Hadith criticism, Sira (biography of the Prophet), and Islamic history.",
    icon: ScrollText,
    features: ["Hadith Sciences", "Sira", "Islamic History"],
  },
  {
    title: "Faculty of Quran & Islamic Studies",
    description: "Quran exegesis (Tafsir), Quran recitation (Tilawa), Quranic sciences, and Tajwid.",
    icon: BookOpen,
    features: ["Tafsir", "Tilawa", "Quranic Sciences", "Tajwid"],
  },
  {
    title: "Faculty of Arabic Language",
    description: "Arabic grammar (Nahw), morphology (Sarf), rhetoric (Balagha), Arabic literature, and linguistics.",
    icon: Languages,
    features: ["Nahw", "Sarf", "Balagha", "Arabic Literature"],
  },
];

export function Services({ locale = "de" }: { locale?: Locale }) {
  const t = (de: string, en: string) => (locale === "en" ? en : de);
  const studyAreas = locale === "en" ? studyAreasEn : studyAreasDe;
  return (
    <section id="studium" className="pt-8 md:pt-12 pb-16 md:pb-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-6">
            {t("Was kann man an der Universität lernen?", "What Can You Study at the University?")}
          </h2>
          <div className="text-lg text-slate-600 space-y-4 text-center">
            <p>
              {t(
                "Die Islamic University of Madinah bietet Studiengänge in verschiedenen Bereichen an, mit einem besonderen Schwerpunkt auf den islamischen Wissenschaften.",
                "The Islamic University of Madinah offers programs in various fields, with a special emphasis on Islamic sciences."
              )}
            </p>
            <p>
              {t(
                "Das Studium verbindet das Lesen und Verstehen klassischer Texte mit akademischer Ausbildung in verschiedenen Disziplinen.",
                "The program combines the reading and understanding of classical texts with academic training in various disciplines."
              )}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {studyAreas.map((area, index) => (
            <div key={area.title} className="group block h-full">
              <Card className="h-full border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wide">
                      {t("Bereich", "Area")} {index + 1}
                    </span>
                  </div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-900 group-hover:bg-navy/5 group-hover:text-gold transition-colors">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-gold transition-colors">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full justify-between">
                  <div>
                    <CardDescription className="text-slate-600 mb-6 text-base leading-relaxed">
                      {area.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {area.features.map((feature) => (
                        <span key={feature} className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2">
              {t("Interesse am Studium in Medina?", "Interested in Studying in Medina?")}
            </h3>
            <p className="text-slate-600">
              {t(
                "Erfahre mehr über die Voraussetzungen und den Bewerbungsprozess.",
                "Learn more about the requirements and application process."
              )}
            </p>
          </div>
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 whitespace-nowrap">
            <Link href="#bewerbung">
              {t("Zur Bewerbung", "To Application")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
