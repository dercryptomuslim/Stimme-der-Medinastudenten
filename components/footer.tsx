"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/logo.jpeg" alt="Logo" width={40} height={40} className="rounded-full" />
              <span className="font-serif text-xl font-bold text-white">Stimme der Medinastudenten</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Studenten & Absolventen der Islamischen Universität Medina. <br/>
              Aus dem DACH-Raum.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#ueber-uns" className="hover:text-white transition-colors">Über uns</Link></li>
              <li><Link href="#studium" className="hover:text-white transition-colors">Studienbereiche</Link></li>
              <li><Link href="#bewerbung" className="hover:text-white transition-colors">Bewerbung</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Rechtliches</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/impressum" className="hover:text-gold transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-gold transition-colors">Datenschutz</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Kontakt</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">Medina, Saudi Arabia 🇸🇦</li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-900 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Stimme der Medinastudenten. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
