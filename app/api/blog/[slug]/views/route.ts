import { NextResponse } from "next/server";
import { getViews, incrementViewsIfAllowed } from "@/lib/blog-views";

function getVisitorId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
  return ip || "unknown";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const views = await getViews(slug);
  return NextResponse.json({ views });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const visitorId = getVisitorId(request);
  const views = await incrementViewsIfAllowed(slug, visitorId);
  return NextResponse.json({ views });
}
