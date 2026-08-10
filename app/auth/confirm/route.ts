import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { INTERN_ENABLED } from "@/lib/supabase/config";

/**
 * Bestätigt einen Anmeldelink über token_hash.
 *
 * Das ist der von Supabase für SSR dokumentierte Weg. Der Standardlink mit
 * ?code= setzt voraus, dass der PKCE-Verifier-Cookie noch im selben Browser
 * liegt, der die Anmeldung angefordert hat. Bei einer E-Mail ist genau das
 * die Ausnahme – Links werden auf dem Handy geöffnet, in einer Vorschau, in
 * einem anderen Browser. verifyOtp funktioniert ohne diesen Cookie.
 */
export async function GET(request: NextRequest) {
  if (!INTERN_ENABLED) {
    return new NextResponse("Nicht gefunden", { status: 404 });
  }

  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // Offene Weiterleitungen verhindern: nur seiteninterne Pfade zulassen.
  const roh = searchParams.get("weiter") ?? "/intern";
  const weiter = roh.startsWith("/") && !roh.startsWith("//") ? roh : "/intern";

  if (!tokenHash || !type) {
    return NextResponse.redirect(`${origin}/login?fehler=kein_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error) {
    console.error("Bestätigungsfehler:", error.message);
    return NextResponse.redirect(`${origin}/login?fehler=abgelaufen`);
  }

  return NextResponse.redirect(`${origin}${weiter}`);
}
