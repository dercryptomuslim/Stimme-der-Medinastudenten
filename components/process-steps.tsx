"use client";

import Link from "next/link";
import { Heart, FileCheck, Globe, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n";
import { motion } from "framer-motion";

const stepsDe = [
  {
    number: "01",
    title: "Aufrichtige Absicht",
    description: "Stelle dir ehrlich die Frage: Was ist mein Ziel? Warum möchte ich studieren? Was habe ich bereits für diesen Weg getan?",
    icon: Heart,
  },
  {
    number: "02",
    title: "Voraussetzungen prüfen",
    description: "Hochschulreife, gültiger Reisepass, Passbild, ärztliches Gutachten, zwei Tazkiyah (Empfehlungsschreiben), Alter bis 25 Jahre.",
    icon: FileCheck,
  },
  {
    number: "03",
    title: "Saudi-Arabien besuchen",
    description: "Wir empfehlen vor einer endgültigen Entscheidung mit einem Besuchs- oder Touristenvisum nach Saudi-Arabien zu reisen.",
    icon: Globe,
  },
  {
    number: "04",
    title: "Online bewerben",
    description: "Die Bewerbung erfolgt über das offizielle Online-Portal „Minhati" unter minhati.sa.",
    icon: GraduationCap,
  },
];

const stepsEn = [
  {
    number: "01",
    title: "Sincere Intention",
    description: "Ask yourself honestly: What is my goal? Why do I want to study? What have I already done for this path?",
    icon: Heart,
  },
  {
    number: "02",
    title: "Check Requirements",
    description: "High school diploma, valid passport, photo, medical certificate, two Tazkiyah (recommendation letters), age up to 25.",
    icon: FileCheck,
  },
  {
    number: "03",
    title: "Visit Saudi Arabia",
    description: "We recommend visiting Saudi Arabia with a tourist visa first to gain a realistic impression of life there.",
    icon: Globe,
  },
  {
    number: "04",
    title: "Apply Online",
    description: "The application is submitted through the official online portal 'Minhati' at minhati.sa.",
    icon: GraduationCap,
  },
];

export function ProcessSteps({ locale = "de" }: { locale?: Locale }) {
  const t = (de: string, en: string) => (locale === "en" ? en : de);
  const steps = locale === "en" ? stepsEn : stepsDe;

  return (
    <section id="bewerbung" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-emerald-400 tracking-wide uppercase mb-3 block">
            {t("Bewerbung", "Application")}
          </span>
          <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            {t("Dein Weg zum Studium in Medina", "Your Path to Studying in Medina")}
          </h2>
          <p className="text-lg text-slate-400">
            {t(
              "Bevor man diesen Weg einschlägt, sollte man sich ernsthaft und aufrichtig damit auseinandersetzen, ob dieser Weg wirklich der eigene ist. Das Streben nach Wissen ist keine kurzfristige Angelegenheit, sondern eine lebenslange Aufgabe.",
              "Before embarking on this path, one should seriously and sincerely consider whether this path is truly one's own. The pursuit of knowledge is not a short-term matter, but a lifelong task."
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-emerald-500/50 to-slate-700" />
              )}

              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full hover:bg-slate-800 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-bold text-slate-700">{step.number}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Requirements Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">{t("Voraussetzungen (Bachelor)", "Requirements (Bachelor)")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              t("Hochschulreife (Abitur, Matura oder gleichwertig)", "High school diploma (or equivalent)"),
              t("Gültiger Reisepass", "Valid passport"),
              t("Digitales Passbild", "Digital passport photo"),
              t("Ärztliches Gutachten", "Medical certificate"),
              t("Zwei Tazkiyah (Empfehlungsschreiben)", "Two Tazkiyah (recommendation letters)"),
              t("Alter: bis 25 Jahre", "Age: up to 25 years"),
            ].map((req) => (
              <div key={req} className="flex items-center gap-3 text-slate-300">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm">{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 text-lg">
            <a href="https://minhati.sa" target="_blank" rel="noopener noreferrer">
              {t("Zum Bewerbungsportal (Minhati)", "Go to Application Portal (Minhati)")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-slate-500">
            {t(
              "Weitere Informationen zum Bewerbungsprozess findest du auch auf dem Telegram-Kanal „InfoStudiumKSA".",
              "More information about the application process can be found on the Telegram channel 'InfoStudiumKSA'."
            )}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
