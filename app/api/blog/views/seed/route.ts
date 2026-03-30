import { NextResponse } from "next/server";
import { seedInitialViews } from "@/lib/blog-views";

/**
 * One-time seed: set initial blog view counts from INITIAL_VIEW_COUNTS.
 * Call once after deploying. Protected by BLOG_VIEWS_SEED_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.BLOG_VIEWS_SEED_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Seed not configured" }, { status: 501 });
  }
  const body = await request.json().catch(() => ({}));
  const auth = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? body.secret;
  if (auth !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const views = await seedInitialViews();
  return NextResponse.json({ ok: true, views });
}
