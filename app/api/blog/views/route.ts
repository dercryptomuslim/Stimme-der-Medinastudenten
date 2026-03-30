import { NextResponse } from "next/server";
import { getAllViews } from "@/lib/blog-views";
import { blogPostsDe } from "@/lib/blog-data";

/** Returns view counts for all blog posts (key = canonical DE slug). */
export async function GET() {
  const slugs = blogPostsDe.map((p) => p.slug);
  const views = await getAllViews(slugs);
  return NextResponse.json(views);
}
