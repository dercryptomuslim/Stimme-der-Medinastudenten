import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogPostsDe, type BlogPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Script from "next/script";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsDe.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsDe.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Artikel nicht gefunden",
    };
  }

  const defaultKeywords = ["Islamische Universität Medina", "Stimme der Medinastudenten", "Studium Medina"];
  const description = post.metaDescription ?? post.excerpt;
  const baseUrl = "https://www.stimme-medinastudenten.de";

  return {
    title: `${post.title} | Stimme der Medinastudenten`,
    description,
    keywords: defaultKeywords,
    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "Stimme der Medinastudenten",
      locale: "de_DE",
      type: "article",
      publishedTime: `${post.dateISO}T12:00:00+03:00`,
      authors: ["Stimme der Medinastudenten"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

function generateArticleJsonLd(post: BlogPost) {
  const description = post.metaDescription ?? post.excerpt;
  const iso = `${post.dateISO}T12:00:00+03:00`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": description,
    "datePublished": iso,
    "dateModified": iso,
    "author": {
      "@type": "Organization",
      "name": "Stimme der Medinastudenten",
      "url": "https://www.stimme-medinastudenten.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Stimme der Medinastudenten e.V.",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.stimme-medinastudenten.de/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsDe.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateArticleJsonLd(post);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <article className="pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">

          <Link href="/blog" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Zurück zur Übersicht
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium uppercase tracking-wider flex-wrap">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </header>

          <div
            className="max-w-none font-serif text-slate-900
              [&_h2]:text-[30px] [&_h2]:leading-[1.15] [&_h2]:font-extrabold [&_h2]:mt-[38px] [&_h2]:mb-[14px] [&_h2]:tracking-[-0.2px]
              [&_h3]:text-[32px] [&_h3]:leading-[1.15] [&_h3]:font-extrabold [&_h3]:mt-[18px] [&_h3]:mb-[10px] [&_h3]:tracking-[-0.2px]
              [&_p]:text-[18px] [&_p]:leading-[1.45] [&_p]:mb-[14px]
              [&_ul]:my-[10px] [&_ul]:ml-[44px] [&_ul]:text-[18px] [&_ul]:leading-[1.45]
              [&_li]:my-[6px]
              [&_strong]:font-extrabold
              [&_em]:italic
              [&_a]:text-gold [&_a:hover]:text-gold-dark [&_a]:underline
              [&_figure]:my-12
              [&_figcaption]:text-sm [&_figcaption]:text-slate-500 [&_figcaption]:mt-3 [&_figcaption]:text-center
              [&_img]:w-full [&_img]:rounded-xl [&_img]:shadow-lg
              [&_.lead]:text-xl [&_.lead]:text-slate-700 [&_.lead]:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              Interesse am Studium in Medina?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Erfahre mehr über die Voraussetzungen und den Bewerbungsprozess an der Islamischen Universität.
            </p>
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 shadow-lg">
              <Link href="/#bewerbung">
                Zur Bewerbung <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  );
}
