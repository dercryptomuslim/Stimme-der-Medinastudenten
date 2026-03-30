"use client";

import { GraduationCap, Home, UtensilsCrossed, Plane, Stethoscope, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
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

export function UniversityBenefits() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-gold tracking-wide uppercase mb-3 block">
            Stipendium & Leistungen
          </span>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-6">
            Was die Universität bietet
          </h2>
          <p className="text-lg text-slate-600">
            Die Islamische Universität Medina bietet internationalen Studenten umfassende Unterstützung - von der kostenlosen Ausbildung bis zur Unterkunft und medizinischen Versorgung.
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
            Aufenthaltsgenehmigung (Iqama)
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Die Universität arrangiert und finanziert die Aufenthaltsgenehmigung (Iqama) für alle internationalen Studenten. Diese wird während des gesamten Studiums aufrechterhalten und ermöglicht den legalen Aufenthalt in Saudi-Arabien.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
