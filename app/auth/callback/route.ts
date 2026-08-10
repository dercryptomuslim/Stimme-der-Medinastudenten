import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { INTERN_ENABLED } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  if (!INTERN_ENABLED) {
    return new NextResponse("Nicht gefunden", { status: 404 });
  }

  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  // Offene Weiterleitungen verhindern: nur seiteninterne Pfade zulassen.
  const roh = searchParams.get("weiter") ?? "/intern";
  const weiter = roh.startsWith("/") && !roh.startsWith("//") ? roh : "/intern";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?fehler=kein_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Callback-Fehler:", error.message);
    return NextResponse.redirect(`${origin}/login?fehler=abgelaufen`);
  }

  return NextResponse.redirect(`${origin}${weiter}`);
}
