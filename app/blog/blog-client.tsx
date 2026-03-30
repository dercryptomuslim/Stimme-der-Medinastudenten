"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, BookOpen, Home, FileCheck } from "lucide-react";
import { blogPostsDe, blogCategories, sortByDateDesc } from "@/lib/blog-data";

const categoryIcons = {
  studium: BookOpen,
  leben: Home,
  bewerbung: FileCheck,
};

export function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = blogCategories.de;

  const sortedPosts = sortByDateDesc(blogPostsDe);
  const featuredPost = sortedPosts[0];
  const otherPosts = sortedPosts.slice(1);

  const filteredPosts = activeCategory
    ? otherPosts.filter(post => post.category === activeCategory)
    : otherPosts;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <section className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Blog & Wissen
            </h1>
            <p className="text-lg text-slate-600">
              Erfahrungen, Wissen und praktische Einblicke von Studenten und Absolventen der Islamischen Universität in Medina.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Alle Artikel
            </button>
            {Object.entries(categories).map(([key, { label }]) => {
              const Icon = categoryIcons[key as keyof typeof categoryIcons];
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activeCategory === key
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Featured Post */}
          {!activeCategory && (
            <Link href={`/blog/${featuredPost.slug}`} className="group block mb-12">
              <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-400">Bild folgt</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Neuester Artikel
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider mb-4 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {featuredPost.readTime}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {categories[featuredPost.category as keyof typeof categories]?.label}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="text-base font-semibold text-emerald-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                      Jetzt lesen <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {/* Other Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(activeCategory ? sortedPosts.filter(p => p.category === activeCategory) : filteredPosts).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                <Card className="h-full flex flex-col border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                  <div className="h-48 w-full relative overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center text-slate-400">
                      <span className="text-sm font-medium">Bild folgt</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      {(() => {
                        const Icon = categoryIcons[post.category as keyof typeof categoryIcons];
                        return (
                          <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                            <Icon className="h-3 w-3" />
                            {categories[post.category as keyof typeof categories]?.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {post.title}
                    </h2>
                  </CardHeader>

                  <CardContent className="pb-4 flex-grow">
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0 pb-6">
                    <div className="text-sm font-semibold text-emerald-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                      Jetzt weiterlesen <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {activeCategory && sortedPosts.filter(p => p.category === activeCategory).length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">Keine Artikel in dieser Kategorie gefunden.</p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
