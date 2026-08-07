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

Die drei vorhandenen Einträge sind Platzhalter ohne Inhalt.

### Analytics und Einwilligung

Ohne `NEXT_PUBLIC_GA_MEASUREMENT_ID` wird kein Analytics geladen und folglich
kein Cookie-Banner angezeigt. Ist die ID gesetzt, erscheint der Banner und
Google Analytics wird erst nach ausdrücklicher Einwilligung nachgeladen. Vorher
existiert weder das Script noch `window.gtag`.

Die Schriften kommen über `next/font` und werden zur Buildzeit heruntergeladen
und lokal ausgeliefert. Es besteht zur Laufzeit keine Verbindung zu Google.

## Deployment

Vercel-Projekt `stimme-der-medinastudenten`. Push auf `main` löst ein
Production-Deployment aus.

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
- [ ] **Blogartikel schreiben.** Drei leere Platzhalter stehen indexierbar in
      der Sitemap.
- [ ] **Instagram-Link im Footer** zeigt auf `#`.
- [ ] **Kennzahlen belegen.** „+50 Studierende aus DACH" in
      `components/stats-section.tsx` sollte belastbar sein.
