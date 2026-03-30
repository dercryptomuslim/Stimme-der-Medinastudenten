import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section id="ueber-uns" className="pt-8 md:pt-12 pb-12 md:pb-24 bg-white relative overflow-hidden">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image / Visual Side */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-slate-100 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              {/* Logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-slate-100 flex items-center justify-center">
                <Image
                  src="/logo.jpeg"
                  alt="Stimme der Medinastudenten"
                  width={280}
                  height={280}
                  className="rounded-full shadow-lg"
                />
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-lg">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-slate-900 tracking-tighter">DACH</span>
                  <span className="text-sm font-semibold text-slate-600 mb-1.5 leading-tight">
                    Deutschland, Österreich
                    <br />
                    & Schweiz
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full border-2 border-slate-100 rounded-2xl hidden md:block" />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <span className="text-sm font-bold text-gold tracking-wide uppercase mb-3 block">
                Über uns
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                Studenten der <br/>
                <span className="text-slate-500">Islamischen Universität Medina</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Wir sind Studenten und Absolventen der Islamischen Universität in Medina aus dem deutschsprachigen Raum – Deutschland, Österreich und der Schweiz.
              </p>
              <p>
                Unser Verständnis der Religion gründet auf dem Qur'an und der authentischen Sunnah, im Verständnis der ersten Generationen dieser Ummah.
              </p>
            </div>

            {/* Important Clarification */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Nicht jede Aussage, jedes Verhalten oder jede Position von Personen, die in Medina studieren oder studiert haben, repräsentiert automatisch das, was dort gelehrt wird. Das Studium ist eine Möglichkeit zum Erwerb von Wissen. Doch wie dieses Wissen verstanden, umgesetzt und weitergegeben wird, liegt in der Verantwortung der jeweiligen Person.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-6">
              {[
                "Qur'an & Sunnah",
                "Verständnis der Salaf",
                "Wissen & Aufrichtigkeit",
                "DACH-Gemeinschaft"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-gold" />
                  </div>
                  <span className="text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="border-slate-200 hover:bg-slate-50 hover:text-navy">
                <Link href="#studium">
                  Studienbereiche entdecken <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="#bewerbung">
                  Bewerbung & Voraussetzungen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
