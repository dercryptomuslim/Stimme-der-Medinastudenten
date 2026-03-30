"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight, BookOpen, GraduationCap, Users, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Studienbereiche",
    href: "#studium",
    description: "Islamische & weitere Wissenschaften.",
    icon: BookOpen
  },
  {
    title: "Bewerbung",
    href: "#bewerbung",
    description: "Voraussetzungen & Ablauf.",
    icon: FileCheck
  },
  {
    title: "Universität",
    href: "#ueber-uns",
    description: "Die Islamische Universität Medina.",
    icon: GraduationCap
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 border-b",
      scrolled ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group relative z-50">
          <Image src="/logo.jpeg" alt="Stimme der Medinastudenten" width={48} height={48} className="rounded-full" />
          <span className="hidden sm:inline text-lg font-serif font-bold tracking-tight text-navy">
            Stimme der Medinastudenten
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex md:items-center md:space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-50 font-medium")}>
                    Startseite
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-50 font-medium")}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-50 font-medium")}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild className="ml-4 bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 font-medium shadow-md hover:shadow-lg transition-all">
            <Link href="#kontakt">Kontakt</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-900 hover:bg-slate-50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menü öffnen</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-[400px] bg-white border-l border-slate-200 p-0 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xl font-serif font-bold text-slate-900">Menü</span>
                <SheetClose asChild>
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6">
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-lg font-medium text-slate-900 py-4 border-b border-slate-100"
                  >
                    Startseite
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </Link>

                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between text-lg font-medium text-slate-900 py-4 border-b border-slate-100"
                    >
                      {item.title}
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </Link>
                  ))}

                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-lg font-medium text-slate-900 py-4 border-b border-slate-100"
                  >
                    Blog
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </Link>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
                <Button asChild className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold rounded-lg shadow-sm">
                  <Link href="#kontakt" onClick={() => setIsOpen(false)}>
                    Kontakt
                  </Link>
                </Button>
                <div className="mt-6 text-center text-sm text-slate-400">
                  © {new Date().getFullYear()} Stimme der Medinastudenten
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
