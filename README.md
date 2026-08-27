# Stimme der Medinastudenten

Website der Studenten und Absolventen der Islamischen Universität Medina aus dem
DACH-Raum. Einseitige Informationsseite mit Blog, Kontaktformular und
Rechtsseiten.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn/ui auf Radix |
| Animation | Framer Motion |
| Sprache | TypeScript |
| Hosting | Vercel |

## Lokal starten

```bash
npm install && npm run dev
```

Läuft auf **Port 7001** (nicht 3000): http://localhost:7001

Weitere Skripte:

```bash
npm run build
```

```bash
npm run lint
```

Beide müssen vor jedem Push ohne Fehler und ohne Warnungen durchlaufen.

## Umgebungsvariablen

`.env.example` nach `.env.local` kopieren und ausfüllen. In Vercel unter
Settings → Environment Variables dieselben Werte hinterlegen.

| Variable | Pflicht | Wirkung wenn leer |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | empfohlen | Fällt auf die `.vercel.app`-Adresse zurück |
| `NEXT_PUBLIC_ALLOW_INDEXING` | zum Launch | Seite bleibt auf `noindex`, robots.txt sperrt alles |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | nein | Kein Analytics **und** kein Cookie-Banner |
| `GOOGLE_SHEET_ID` | ja | Kontaktformular antwortet mit HTTP 500 |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | ja | dito |
| `GOOGLE_PRIVATE_KEY` | ja | dito |
| `GOOGLE_SHEET_TAB_NAME_CONTACT` | nein | Versucht `Sheet1`, dann das erste Blatt |
| `RESEND_API_KEY` | nein | Anfrage landet nur im Sheet, keine E-Mail |
| `RESEND_FROM` | nein | Fällt auf `onboarding@resend.dev` zurück |
| `RESEND_TO` | nein | Fällt auf `kontakt@stimme-medinastudenten.de` zurück |

Der `GOOGLE_PRIVATE_KEY` wird beim Einlesen normalisiert: Anführungszeichen und
literale `\n` werden korrigiert, ein fehlender PEM-Rahmen wird ergänzt. Der
Schlüssel kann also so eingefügt werden, wie Vercel ihn speichert.

## Aufbau

```
app/
  page.tsx              Startseite, setzt die Sektionen zusammen
  layout.tsx            Fonts, Metadaten, Organization-JSON-LD
  blog/                 Übersicht + Artikel unter /blog/[slug]
  impressum/            § 5 TMG
  datenschutz/          DSGVO
  api/leads/            Kontaktformular -> Google Sheets + Resend
  sitemap.ts robots.ts  Aus lib/site.ts abgeleitet
components/             Sektionen der Startseite, ui/ = shadcn
lib/
  site.ts               Kanonische Domain, einzige Quelle
  blog-data.ts          Artikel als Datenstruktur
  analytics.ts          GA-Events
```

Die Startseite ist eine Abfolge von Sektionen aus `components/`. Die
Sprungmarken sind `#ueber-uns`, `#studium`, `#bewerbung` und `#kontakt`.

Navbar und Footer erscheinen auf allen Seiten. Ihre Links müssen deshalb als
`/#anker` geschrieben werden — ein reines `#anker` greift auf `/blog`,
`/impressum` und `/datenschutz` ins Leere. Innerhalb der Startseiten-Sektionen
ist das kurze `#anker` dagegen richtig.

### Kontaktformular

`components/contact.tsx` sendet an `POST /api/leads`. Die Route schreibt eine
Zeile ins Google Sheet und verschickt optional eine Benachrichtigung über
Resend. Schlägt der E-Mail-Versand fehl, wird das nur geloggt — die Anfrage
gilt trotzdem als erfasst.

Spalten im Sheet:

| A | B | C | D | E |
|---|---|---|---|---|
| Datum (Zeitzone Riad) | Name | E-Mail | Typ | Nachricht |

Das Service-Account-Konto aus `GOOGLE_SERVICE_ACCOUNT_EMAIL` braucht
Schreibrechte auf die Tabelle.

### Blog

Artikel liegen als Objekte in `lib/blog-data.ts`, das Feld `content` enthält
HTML. Neue Artikel dort ergänzen — Übersicht, Detailseite, Sitemap und die
statische Generierung ziehen automatisch nach.

Verfügbare Auszeichnungen im `content`: `h2`, `h3`, `p`, `p.lead` für den
Vorspann, `ul`/`li`, `strong`, `em`, `a`, `figure`/`figcaption`, `img`. Die
Formatierung steckt in `app/blog/[slug]/page.tsx`.

Die drei ursprünglichen Artikel sind bewusst faktisch gehalten und stützen sich
nur auf Angaben, die auch auf der Startseite stehen. Erfahrungsberichte aus
erster Hand fehlen bislang — die sollten von Studenten selbst kommen.

Artikelbilder liegen als SVG unter `public/blog/` und werden über das Feld
`image` zugeordnet. Ohne `image` fällt die Karte auf den Platzhalter „Bild
folgt" zurück.

Bewusst gegenstandslose Ornamentik – die Seite verzichtet durchgängig auf
Abbildungen von Lebewesen.

Drei Muster stammen von Higgsfield (Modell `recraft_v4_1`, Variante
`vector`, Markenpalette als `colors`-Parameter). `probeaufenthalt.svg` ist
dagegen von Hand gerechnet: ein Khatam-Raster aus achtzackigen Sternen,
erzeugt über ein kurzes Python-Skript. Islamische Geometrie ist Mathematik,
dafür braucht es kein Modell – und das Ergebnis komprimiert deutlich besser
(2 KB gzip gegenüber 44–60 KB bei den generierten Mustern).

Wichtig bei der Geometrie: Der Sternradius muss zum Rasterabstand passen
(`R = S/2`), sonst überlagern sich benachbarte Sterne zu Schleifen statt zu
einer sauberen Parkettierung.

Nach dem Generieren einmal durch SVGO schicken:

```bash
npx svgo@3 -f public/blog -o public/blog --multipass -p 2
```

Wichtig beim Prompten: flächenfüllende, gleichmäßig verteilte Muster
verlangen („edge to edge, no blank areas"). Freigestellte Motive mit viel
Weißraum verschwinden im `object-cover`-Zuschnitt der Karten.

### Analytics-Events

Erfasst werden `form_submit`, `form_error`, `cta_click`,
`external_link_click` (u. a. der Wechsel zum Bewerbungsportal Minhati) und
`scroll_depth`. Alle laufen über `lib/analytics.ts` und feuern nur nach
erteilter Einwilligung.

### Analytics und Einwilligung

Ohne `NEXT_PUBLIC_GA_MEASUREMENT_ID` wird kein Analytics geladen und folglich
kein Cookie-Banner angezeigt. Ist die ID gesetzt, erscheint der Banner und
Google Analytics wird erst nach ausdrücklicher Einwilligung nachgeladen. Vorher
existiert weder das Script noch `window.gtag`.

Die Schriften kommen über `next/font` und werden zur Buildzeit heruntergeladen
und lokal ausgeliefert. Es besteht zur Laufzeit keine Verbindung zu Google.

## Interner Bereich

Geschützter Mitgliederbereich mit praktischen Informationen zum Leben in
Medina. Anmeldung mit E-Mail und Passwort über Supabase; Konten legt das
Team im Supabase-Dashboard an, Freigabe von Hand. Magic Link ist vorbereitet
und wird aktiviert, sobald eigenes SMTP eingerichtet ist.

Architektur, Datenmodell, Rechtekonzept und die Einrichtung stehen in
[docs/intranet.md](docs/intranet.md), die Migration in
`supabase/migrations/`.

**Für den späteren Magic-Link-Betrieb:** Die E-Mail-Vorlagen in Supabase
müssen auf `token_hash` umgestellt sein (siehe Einrichtung, Schritt 2b). Mit
dem Standardlink scheitert jede Link-Anmeldung, die nicht im selben Browser
geöffnet wird, der sie angefordert hat. Der laufende Passwort-Betrieb ist
davon nicht betroffen.

| Route | Zugriff |
|---|---|
| `/login` | offen, Anmeldung mit E-Mail und Passwort |
| `/auth/confirm` | prüft den Anmeldelink und legt die Session an |
| `/auth/callback` | Rückfallebene für Links im PKCE-Code-Format |
| `/intern` | nur freigegebene Mitglieder |
| `/intern/[rubrik]` | nur freigegebene Mitglieder |
| `/intern/suche` | Volltextsuche über alle Beiträge |
| `/intern/warteliste` | angemeldet, noch nicht freigegeben |
| `/intern/konto` | angemeldet — eigenes Passwort ändern |
| `/intern/verwaltung` | nur Admins |

Solange `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
fehlen, liefern **alle** diese Routen 404. Ein Bereich, der nach
Mitgliederbereich aussieht, darf nie ohne echte Anmeldung existieren.

Der eigentliche Zugriffsschutz sind die RLS-Policies in der Datenbank, nicht
die Middleware. Wer nicht freigegeben ist, bekommt von Postgres keine Zeile —
unabhängig davon, was das Frontend tut.

## Deployment

Vercel-Projekt `stimme-der-medinastudenten`. Push auf `main` löst ein
Production-Deployment aus. Erreichbar unter
https://stimme-der-medinastudenten.vercel.app

### Indexierung

Standardmäßig ist die Seite für Suchmaschinen gesperrt: `robots.txt` liefert
`Disallow: /` und jede Seite trägt `noindex, nofollow`. Das gilt bewusst auch
für Impressum und Datenschutz, die sonst eine eigene Regel setzen.

Zum Launch in Vercel setzen:

```
NEXT_PUBLIC_SITE_URL=https://<eigene-domain>
NEXT_PUBLIC_ALLOW_INDEXING=true
```

Damit schalten Canonicals, Sitemap, `robots.txt` und Open Graph gemeinsam auf
die echte Domain um.

## Offene Punkte vor dem Go-Live

- [ ] **Impressum ausfüllen.** Enthält Platzhalter und einen sichtbaren
      Warnhinweis. § 5 TMG verlangt eine natürliche Person mit ladungsfähiger
      Anschrift; ein eingetragener Verein besteht nicht, „e.V." darf nicht
      geführt werden. Dieselben Angaben gehören in die Datenschutzerklärung
      unter „Hinweis zur verantwortlichen Stelle".
- [ ] **Domain klären und anbinden.** Der Projektname lautet
      `stimme-der-medinastudenten`, die Domain im Code
      `stimme-medinastudenten.de` — ohne „der". Keine der beiden Varianten ist
      registriert. Nach dem Anbinden `NEXT_PUBLIC_SITE_URL` setzen und den
      www-Redirect in `vercel.json` auf dieselbe Schreibweise anpassen.
- [ ] **Datenschutzerklärung prüfen lassen.** Bearbeitete e-recht24-Vorlage.
      Tatsächlich eingesetzt werden: Vercel, Google Analytics, Google Sheets,
      Resend, Google Fonts lokal.
- [ ] **Erfahrungsberichte ergänzen.** Die drei vorhandenen Artikel sind
      faktische Übersichten. Was fehlt, sind Texte von Studenten über den
      tatsächlichen Alltag.
- [ ] **Instagram-Link im Footer** zeigt auf `#`.
- [ ] **Kennzahlen belegen.** „+50 Studierende aus DACH" in
      `components/stats-section.tsx` sollte belastbar sein.
