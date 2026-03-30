"use client";

import { GraduationCap, Home, UtensilsCrossed, Plane, Stethoscope, Wallet, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";

const benefitsDe = [
  {
    icon: GraduationCap,
    title: "Vollstipendium",
    description: "Das Studium an der Islamischen Universität ist vollständig kostenlos. Alle internationalen Studenten erhalten ein Vollstipendium.",
  },
  {
    icon: Wallet,
    title: "Monatliches Taschengeld",
    description: "Jeder Student erhält ein monatliches Stipendium von 840 SAR (ca. 210 EUR) zur freien Verfügung.",
  },
  {
    icon: Home,
    title: "Kostenlose Unterkunft",
    description: "Möblierte Zimmer in den Studentenwohnheimen werden allen internationalen Studenten kostenlos zur Verfügung gestellt.",
  },
  {
    icon: UtensilsCrossed,
    title: "Subventioniertes Essen",
    description: "Die Mensa bietet stark vergünstigte Mahlzeiten: Frühstück 1 SAR, Mittagessen 3 SAR, Abendessen 2 SAR.",
  },
  {
    icon: Plane,
    title: "Flugtickets",
    description: "Die Universität stellt Hin- und Rückflugtickets in das Heimatland zur Verfügung.",
  },
  {
    icon: Stethoscope,
    title: "Medizinische Versorgung",
    description: "Kostenlose medizinische Grundversorgung für alle Studenten während des gesamten Studiums.",
  },
];

const benefitsEn = [
  {
    icon: GraduationCap,
    title: "Full Scholarship",
    description: "Studying at the Islamic University is completely free. All international students receive a full scholarship.",
  },
  {
    icon: Wallet,
    title: "Monthly Allowance",
    description: "Each student receives a monthly stipend of 840 SAR (approx. 210 EUR) for personal use.",
  },
  {
    icon: Home,
    title: "Free Accommodation",
    description: "Furnished rooms in student dormitories are provided free of charge to all international students.",
  },
  {
    icon: UtensilsCrossed,
    title: "Subsidised Meals",
    description: "The cafeteria offers heavily subsidised meals: breakfast 1 SAR, lunch 3 SAR, dinner 2 SAR.",
  },
  {
    icon: Plane,
    title: "Airline Tickets",
    description: "The university provides return airline tickets to the student's home country.",
  },
  {
    icon: Stethoscope,
    title: "Medical Care",
    description: "Free basic medical care for all students throughout the duration of their studies.",
  },
];

export function UniversityBenefits({ locale = "de" }: { locale?: Locale }) {
  const t = (de: string, en: string) => (locale === "en" ? en : de);
  const benefits = locale === "en" ? benefitsEn : benefitsDe;

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-gold tracking-wide uppercase mb-3 block">
            {t("Stipendium & Leistungen", "Scholarship & Benefits")}
          </span>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-6">
            {t("Was die Universität bietet", "What the University Provides")}
          </h2>
          <p className="text-lg text-slate-600">
            {t(
              "Die Islamische Universität Medina bietet internationalen Studenten umfassende Unterstützung - von der kostenlosen Ausbildung bis zur Unterkunft und medizinischen Versorgung.",
              "The Islamic University of Madinah provides comprehensive support to international students - from free education to accommodation and medical care."
            )}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <div className="h-full bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <benefit.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-8"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            {t("Aufenthaltsgenehmigung (Iqama)", "Residence Permit (Iqama)")}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t(
              "Die Universität arrangiert und finanziert die Aufenthaltsgenehmigung (Iqama) für alle internationalen Studenten. Diese wird während des gesamten Studiums aufrechterhalten und ermöglicht den legalen Aufenthalt in Saudi-Arabien.",
              "The university arranges and finances the residence permit (Iqama) for all international students. It is maintained throughout the duration of studies and allows legal residence in Saudi Arabia."
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
