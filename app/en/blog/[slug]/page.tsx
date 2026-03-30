import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogPostsEn, type BlogPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { localizeHref, getBlogPostAlternates } from "@/lib/i18n";
import Script from "next/script";
import { getViews } from "@/lib/blog-views";
import { BlogViewCounter } from "@/components/blog-view-counter";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsEn.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsEn.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Article not found",
    };
  }

  // SEO Keywords based on slug
  const keywordMap: Record<string, string[]> = {
    "family-reunification": ["Family Reunification Saudi Arabia", "Bring Family to Saudi Arabia", "Iqama Family Visa", "Family Residence Visa KSA", "Dependent Visa Saudi Arabia", "Spouse Visa Saudi Arabia"],
    "saudi-premium-residency": ["Saudi Premium Residency", "Permanent Residence Saudi Arabia", "Golden Visa Saudi Arabia", "Investor Visa KSA", "Long-term Residency Saudi"],
    "how-to-start-a-business-in-saudi-arabia": ["Start Business Saudi Arabia", "Company Formation KSA", "LLC Saudi Arabia", "Open Business Medina", "Entrepreneur Visa Saudi"],
    "living-in-saudi-arabia-4-legal-ways-to-medina": ["Living in Saudi Arabia", "Move to Medina", "Work in Saudi Arabia", "Visa Saudi Arabia", "Residency KSA"],
    "what-does-living-in-medina-really-cost": ["Cost of Living Medina", "Living Costs Medina", "Medina Expenses", "Family Costs Medina", "Rent Medina", "School Medina", "Cost of Living Saudi Arabia", "Medina Monthly Costs", "Living in Medina Budget", "Medina Family Expenses"],
    "saudi-arabia-cities-compared": [
      "Medina vs Riyadh",
      "Jeddah vs Dammam",
      "Makkah Medina",
      "Saudi Arabia cities",
      "Move to Saudi Arabia which city",
      "Riyadh career",
      "Jeddah logistics",
      "Dammam oil gas",
      "Living in Medina",
      "Eastern Province Saudi Arabia",
      "Makkah economy",
      "Living in Jeddah",
      "Riyadh headquarters",
    ],
  };
  
  const specificKeywords = keywordMap[slug] || [];
  const defaultKeywords = ["Saudi Arabia", "Voice of the Medina Students", "Medina"];

  const views = await getViews(slug);
  const titleSuffix = views > 0 ? ` (${views} views)` : "";
  const description = post.metaDescription ?? post.excerpt;
  const baseUrl = "https://www.stimme-medinastudenten.de";
  const ogImageUrl = post.image ? `${baseUrl}${post.image}` : undefined;

  return {
    title: `${post.title} | Voice of the Medina Students${titleSuffix}`,
    description,
    alternates: getBlogPostAlternates("en", post.slug),
    keywords: [...specificKeywords, ...defaultKeywords],
    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/en/blog/${post.slug}`,
      siteName: "Voice of the Medina Students",
      locale: "en_US",
      type: "article",
      publishedTime: `${post.dateISO}T12:00:00+03:00`,
      modifiedTime: `${post.dateISO}T12:00:00+03:00`,
      authors: ["Voice of the Medina Students"],
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

function generateArticleJsonLd(post: BlogPost) {
  const desc = post.metaDescription ?? post.excerpt;
  const iso = `${post.dateISO}T12:00:00+03:00`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": desc,
    "image": post.image ? `https://www.stimme-medinastudenten.de${post.image}` : undefined,
    "datePublished": iso,
    "dateModified": iso,
    "author": {
      "@type": "Organization",
      "name": "Voice of the Medina Students",
      "url": "https://www.stimme-medinastudenten.de/en"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Stimme der Medinastudenten e.V.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.stimme-medinastudenten.de/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.stimme-medinastudenten.de/en/blog/${post.slug}`
    }
  };
}

export default async function BlogPostEnPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsEn.find((p) => p.slug === slug);
  const href = (raw: string) => localizeHref(raw, "en");

  if (!post) {
    notFound();
  }

  const jsonLd = generateArticleJsonLd(post);
  const initialViews = await getViews(slug);

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
          
          <Link href={href("/blog")} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to overview
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
              <BlogViewCounter slug={slug} initialViews={initialViews} label="views" />
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
              [&_a]:text-emerald-700 [&_a:hover]:text-emerald-800 [&_a]:underline
              [&_figure]:my-12
              [&_figcaption]:text-sm [&_figcaption]:text-slate-500 [&_figcaption]:mt-3 [&_figcaption]:text-center
              [&_img]:w-full [&_img]:rounded-xl [&_img]:shadow-lg
              [&_.lead]:text-xl [&_.lead]:text-slate-700 [&_.lead]:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              Ready for the next step?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Let's analyze your situation and find the best path for you. Discreet, direct, and based on real experience.
            </p>
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 shadow-lg">
              <Link href={href("/anfrage")}>
                Book an expert call <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

        </div>
      </article>

      <Footer locale="en" />
    </main>
  );
}
