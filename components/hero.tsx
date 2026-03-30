"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[85dvh] w-full items-center justify-center overflow-hidden bg-white pt-24 md:pt-32 pb-12 md:pb-16">

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-8 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <span className="mr-2 flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-navy"></span>
            </span>
            Studenten & Absolventen aus dem DACH-Raum
          </div>

          <h1 className="text-5xl font-serif font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl mb-8">
            Stimme der <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-navy to-slate-900">
              Medinastudenten
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 md:text-xl leading-relaxed">
            Wir sind Studenten und Absolventen der Islamischen Universität in Medina aus Deutschland, Österreich und der Schweiz.{" "}
            <br className="hidden md:block" />
            <span className="font-medium text-slate-800">
              Unser Verständnis gründet auf dem Qur'an und der authentischen Sunnah.
            </span>
          </p>

          {/* Quote Highlight */}
          <div className="mx-auto mt-8 max-w-2xl">
            <blockquote className="border-l-4 border-gold bg-gold/5 pl-5 pr-6 py-4 rounded-r-lg">
              <p className="text-base md:text-lg font-medium text-slate-700 italic">
                Das Streben nach Wissen ist eine lebenslange Aufgabe. Es beginnt jetzt, sobald der Wille dazu vorhanden ist.
              </p>
            </blockquote>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-slate-900 px-8 text-lg font-medium text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="#ueber-uns">
                Über uns erfahren
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-slate-200 bg-white px-8 text-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm"
            >
              <Link href="#studium">
                Studienbereiche
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
