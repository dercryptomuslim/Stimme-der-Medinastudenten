"use client";

import Link from "next/link";
import { Heart, FileCheck, Globe, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const steps = [
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
    description: "Die Bewerbung erfolgt über das offizielle Online-Portal Minhati unter minhati.sa.",
    icon: GraduationCap,
  },
];

export function ProcessSteps() {
  return (
    <section id="bewerbung" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-gold-light tracking-wide uppercase mb-3 block">
            Bewerbung
          </span>
          <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Dein Weg zum Studium in Medina
          </h2>
          <p className="text-lg text-slate-400">
            Bevor man diesen Weg einschlägt, sollte man sich ernsthaft und aufrichtig damit auseinandersetzen, ob dieser Weg wirklich der eigene ist. Das Streben nach Wissen ist keine kurzfristige Angelegenheit, sondern eine lebenslange Aufgabe.
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
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-gold/50 to-slate-700" />
              )}

              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full hover:bg-slate-800 hover:border-gold/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold-light">
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
          <h3 className="text-xl font-bold text-white mb-4">Voraussetzungen (Bachelor)</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Hochschulreife (Abitur, Matura oder gleichwertig)",
              "Gültiger Reisepass (mind. 6 Monate gültig)",
              "Digitales Passbild",
              "Ärztliches Gutachten (frei von ansteckenden Krankheiten)",
              "Zwei Tazkiyah (Empfehlungsschreiben)",
              "Alter: bis 25 Jahre (Bachelor), bis 30 Jahre (Master)",
              "Muslim, gutes Benehmen und Verhalten",
              "Bereitschaft, sich an die Regeln der Universität zu halten",
              "Körperlich fit für das Studium",
            ].map((req) => (
              <div key={req} className="flex items-center gap-3 text-slate-300">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gold-light" />
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
          <Button asChild className="bg-navy hover:bg-navy-dark text-white rounded-full px-8 py-6 text-lg">
            <a href="https://minhati.sa" target="_blank" rel="noopener noreferrer">
              Zum Bewerbungsportal (Minhati)
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-slate-500">
            Weitere Informationen zum Bewerbungsprozess findest du auch auf dem Telegram-Kanal InfoStudiumKSA.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
