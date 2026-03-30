"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export function InvestmentBanner() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-navy-dark">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden sm:flex h-14 w-14 md:h-16 md:w-16 rounded-xl bg-gold/20 items-center justify-center border border-gold/30 flex-shrink-0">
                <BookOpen className="h-7 w-7 md:h-8 md:w-8 text-gold-light" />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-gold-light" />
                  <span className="text-gold-light text-sm font-medium uppercase tracking-wider">
                    Wissen
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Studieren an der Islamischen Universität
                </h3>
                <p className="text-slate-300 text-sm md:text-base max-w-lg">
                  Aufrichtigkeit (Ikhlas) gehört zu den wichtigsten Grundlagen. Es geht nicht darum, mit einem Titel zurückzukehren, sondern Wissen zu erlangen und danach zu handeln.
                </p>
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex-shrink-0">
              <Button
                asChild
                size="lg"
                className="h-12 md:h-14 rounded-full bg-navy px-6 md:px-8 text-base font-medium text-white hover:bg-navy-light shadow-lg hover:shadow-gold/25 transition-all duration-300 group"
              >
                <Link href="#bewerbung">
                  Bewerbung starten
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
