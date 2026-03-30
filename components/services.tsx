import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, Scale, ArrowRight, ScrollText, Mic } from "lucide-react";
import Link from "next/link";

const studyAreas = [
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

export function Services() {
  return (
    <section id="studium" className="pt-8 md:pt-12 pb-16 md:pb-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-6">
            Was kann man an der Universität lernen?
          </h2>
          <div className="text-lg text-slate-600 space-y-4 text-center">
            <p>
              Die Islamic University of Madinah bietet Studiengänge in verschiedenen Bereichen an, mit einem besonderen Schwerpunkt auf den islamischen Wissenschaften.
            </p>
            <p>
              Das Studium verbindet das Lesen und Verstehen klassischer Texte mit akademischer Ausbildung in verschiedenen Disziplinen.
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
                      Fakultät {index + 1}
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
              Interesse am Studium in Medina?
            </h3>
            <p className="text-slate-600">
              Erfahre mehr über die Voraussetzungen und den Bewerbungsprozess.
            </p>
          </div>
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 whitespace-nowrap">
            <Link href="#bewerbung">
              Zur Bewerbung
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
