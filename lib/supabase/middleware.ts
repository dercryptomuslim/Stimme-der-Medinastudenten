import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { INTERN_ENABLED, SUPABASE_KEY, SUPABASE_URL } from "./config";

/**
 * Frischt die Session auf und schützt /intern.
 *
 * Die Middleware ist nur die erste Hürde. Die eigentliche Grenze sind die
 * RLS-Policies in der Datenbank – auch wenn hier etwas durchrutscht, gibt
 * Postgres keine Daten heraus, für die keine Freigabe vorliegt.
 */
export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const istGeschuetzt = pathname.startsWith("/intern");

  // Ohne Anbindung existiert der interne Bereich schlicht nicht.
  if (!INTERN_ENABLED) {
    if (istGeschuetzt || pathname.startsWith("/login")) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Zwischen createServerClient und getUser darf nichts stehen – sonst werden
  // Nutzer scheinbar zufällig abgemeldet.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (istGeschuetzt && !user) {
    // Ziel samt Suchparametern merken, damit ein geteilter Link wie
    // /intern/suche?q=Werkstatt nach der Anmeldung wieder beim Treffer landet.
    const ziel = pathname + request.nextUrl.search;

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // Die Parameter des Ziels dürfen nicht zusätzlich an /login hängen –
    // sonst stünde q=… doppelt in der Adresse.
    url.search = "";
    url.searchParams.set("weiter", ziel);
    return NextResponse.redirect(url);
  }

  // Angemeldete Nutzer brauchen die Anmeldeseite nicht mehr.
  if (pathname === "/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/intern";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
