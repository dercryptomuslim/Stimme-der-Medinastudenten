# Interner Bereich – Architektur

Geschützter Mitgliederbereich für Studenten der Islamischen Universität Medina
mit praktischen Informationen zum Leben vor Ort.

**Stand:** Anwendung gebaut, Datenbank eingerichtet. Offen sind nur noch die
Umgebungsvariablen in Vercel und der erste Admin – siehe
[Einrichtung](#einrichtung).

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Wer schreibt | Nur das Team, Mitglieder lesen |
| Zugang | Registrierung landet auf Warteliste, Freigabe von Hand |
| Anmeldung | Magic Link per E-Mail, kein Passwort |
| Erster Ausbaustand | Login, Freigabe-Workflow, drei Rubriken |

Redaktionell statt Wiki, weil damit weder Moderation noch Haftung für fremde
Inhalte anfällt. Die Datenstruktur lässt eine spätere Öffnung offen: dafür
genügt es, Schreibrechte in den Policies auf freigegebene Mitglieder
auszuweiten und eine Versionstabelle zu ergänzen.

Magic Link statt Passwort, weil es keine Passwort-Resets, keine schwachen
Passwörter und keinen Support-Aufwand gibt. Der Versand läuft vorerst über
den eingebauten Mailer von Supabase – zu dessen Grenzen siehe Einrichtung,
Schritt 3.

## Technik

- **Supabase** (Postgres + Auth), Projekt `dhxoeirilwrufhenhkpl`,
  Region `eu-central-1` (Frankfurt), eigene Organisation, Free-Tarif
- **Row Level Security** auf allen Tabellen — die Zugriffsregeln liegen in der
  Datenbank, nicht in der Anwendung. Ein Fehler im Frontend legt damit keine
  Daten offen.
- **`@supabase/ssr`** für Cookie-basierte Sessions im App Router

### Warum ein eigenes Projekt

Mitgliederdaten in einer gemeinsamen Datenbank mit unbeteiligten Projekten
lassen sich datenschutzrechtlich nur schwer sauber begründen — Löschkonzept,
Zugriffsbeschränkung und Auftragsverarbeitung betreffen dann jedes Mal alles.

### Vollständig server-seitig

Kein Client-Baustein spricht mit Supabase. Anmeldung, Sessionprüfung und alle
Abfragen laufen über Server Actions, Server Components und die Middleware.
Folge: Im ausgelieferten Browser-Bundle steht **kein** Supabase-Schlüssel —
nachgeprüft über alle 11 Chunks der Anmeldeseite.

Das ist strenger als nötig; der Anon-Key wäre öffentlich unbedenklich. Sollte
später ein Client-Baustein Supabase brauchen (etwa `onAuthStateChange`), muss
`createBrowserClient` neu angelegt werden — die frühere Datei war ungenutzt
und wurde entfernt.

### Abschaltung als Standard

Ohne `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
liefern `/login`, `/intern/*`, `/auth/confirm` und `/auth/callback`
durchgängig 404. Ein
Bereich, der nach Mitgliederbereich aussieht, darf nie ohne echte Anmeldung
existieren — auch nicht versehentlich.

## Datenmodell

Drei Tabellen. Die vollständige Migration liegt in
`supabase/migrations/`.

### `profile`

Ein Datensatz je Konto, 1:1 zu `auth.users`. Wird beim Registrieren
automatisch per Trigger angelegt, mit `status = 'wartend'`.

| Spalte | Bedeutung |
|---|---|
| `id` | Verweis auf `auth.users` |
| `email` | Kopie der Anmelde-Adresse |
| `name` | Anzeigename, optional |
| `status` | `wartend` / `freigegeben` / `abgelehnt` |
| `rolle` | `mitglied` / `redakteur` / `admin` |
| `notiz` | interne Bemerkung zur Freigabe |
| `freigegeben_am`, `freigegeben_von` | Nachvollziehbarkeit |

### `rubrik`

Die Themenbereiche. Als Tabelle und nicht als Enum, damit neue Rubriken ohne
Migration möglich sind.

### `beitrag`

Die Artikel. `inhalt` ist Markdown. `veroeffentlicht` trennt Entwurf von
sichtbar; eindeutig ist die Kombination aus `rubrik_slug` und `slug`.

## Rechte

Die Prüfung läuft über zwei `security definer`-Funktionen, `ist_freigegeben()`
und `hat_rolle()`. Das ist notwendig, weil eine Policy auf `profile`, die
selbst `profile` abfragt, sonst endlos rekursiv wird.

| Tabelle | lesen | schreiben |
|---|---|---|
| `profile` | eigener Datensatz; Admins alle | nur Admins |
| `rubrik` | freigegebene Mitglieder | Redakteure, Admins |
| `beitrag` | veröffentlichte für freigegebene Mitglieder; alle für Redakteure | Redakteure, Admins |

Wichtig: Wer auf der Warteliste steht, sieht **nichts** außer der eigenen
Statusseite. Das ist in den Policies verankert, nicht im Frontend.

## Ablauf

```
Registrierung
  │  E-Mail eingeben -> Magic Link
  ▼
Konto angelegt, profile.status = 'wartend'
  │  Team wird benachrichtigt
  ▼
Freigabe von Hand  ──abgelehnt──> Hinweisseite, kein Zugriff
  │
  ▼
status = 'freigegeben'  ->  Zugriff auf /intern
```

Jeder weitere Login läuft über einen neuen Magic Link. Die Session liegt in
einem httpOnly-Cookie.

## Routen

| Pfad | Zugriff |
|---|---|
| `/login` | offen |
| `/auth/confirm` | offen, prüft token_hash und legt die Session an |
| `/auth/callback` | offen, Rückfallebene für Links im PKCE-Code-Format |
| `/intern` | nur freigegeben — Übersicht der Rubriken |
| `/intern/[rubrik]` | nur freigegeben — Beiträge der Rubrik |
| `/intern/[rubrik]/[slug]` | nur freigegeben — einzelner Beitrag |
| `/intern/warteliste` | eingeloggt, noch nicht freigegeben |
| `/intern/verwaltung` | nur Admins — Freigaben |

Abgesichert wird in `middleware.ts` **und** über RLS. Die Middleware ist
Komfort, die Datenbank ist die eigentliche Grenze.

## Rubriken zum Start

| Slug | Titel | Inhalt |
|---|---|---|
| `familie` | Familie & Alltag | Ehe, Kinder, Schule, Behördengänge, Wohnen |
| `auto` | Auto | Kauf, Zulassung, Versicherung, Werkstätten |
| `mekka` | Mekka & Umrah | Anreise, günstige Unterkünfte, Transport |

Restaurants und Einkaufen sind als vierte Rubrik vorgesehen, sobald die ersten
drei gefüllt sind.

## Was noch offen ist

- **Inhalte.** Werkstätten, Unterkünfte und Behördenwege sind Ortswissen. Diese
  Texte müssen von Studenten vor Ort kommen.
- **Aktualität.** Preise und Ansprechpartner veralten. Ohne feste Zuständigkeit
  je Rubrik wird die Plattform binnen eines Jahres unbrauchbar.
- **Benachrichtigung bei Registrierung.** Über Resend an eine Team-Adresse,
  analog zum Kontaktformular.

## Einrichtung

Diese Schritte lassen sich nicht aus dem Code heraus erledigen — der
Supabase-Connector ist nur für die Organisation *Nomad Agency* autorisiert und
erreicht dieses Projekt nicht.

### 1. Migration einspielen

Im Dashboard unter **SQL Editor** den Inhalt von
`supabase/migrations/20260808000000_intranet.sql` einfügen und ausführen.

### 2. Anmeldung konfigurieren

Unter **Authentication → Providers** nur *Email* aktiv lassen, *Enable
Signups* eingeschaltet lassen — die Zugangskontrolle passiert über die
Freigabe, nicht über gesperrte Registrierung.

Unter **Authentication → URL Configuration** eintragen:

- *Site URL*: die Adresse der Website, nicht der Standardwert
  `http://localhost:3000`
- *Redirect URLs*: `<Adresse>/auth/confirm` und für die lokale Entwicklung
  `http://localhost:7001/auth/confirm`

Steht die Zieladresse nicht in der Allowlist, wird sie **stillschweigend
verworfen** und der Link führt zur Site URL. Supabase meldet dabei keinen
Fehler – das ist die häufigste Ursache für Anmeldelinks, die scheinbar ins
Nichts führen.

### 2b. E-Mail-Vorlagen umstellen

**Zwingend erforderlich.** Unter **Authentication → Email Templates** in den
Vorlagen *Magic Link* und *Confirm signup* den Link ersetzen durch:

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email">Anmelden</a>
```

Der Standardlink nutzt `{{ .ConfirmationURL }}` und damit den PKCE-Ablauf.
Der setzt voraus, dass der Verifier-Cookie noch in genau dem Browser liegt,
der die Anmeldung angefordert hat. Bei E-Mail-Links ist das die Ausnahme:
geöffnet wird auf dem Handy, in einer Vorschau, in einem anderen Browser.
Die Folge ist der Fehler „PKCE code verifier not found in storage".

Das `&` vor `token_hash` ist Absicht – `{{ .RedirectTo }}` enthält bereits
`?weiter=…`.

### 3. Mailversand auf Resend umstellen (aufgeschoben)

Unter **Project Settings → Authentication → SMTP Settings**.

Derzeit läuft der Versand über den eingebauten Mailer von Supabase. Der ist
laut deren eigener Dokumentation nur zu Demonstrationszwecken gedacht und hat
ein projektweites Stundenlimit, das sich ausschließlich mit eigenem SMTP
anheben lässt. Da der Anmeldelink der einzige Weg in den Bereich ist, ist der
Mailversand hier gleichbedeutend mit dem Anmeldesystem: Läuft das Limit voll,
kommt niemand mehr hinein – es gibt kein Passwort als Rückfallebene.

Für die ersten Anmeldungen genügt der eingebaute Versand. Vor der Freigabe an
eine größere Gruppe sollte umgestellt werden. Der Wechsel erfordert keine
Codeänderung.

### 4. Umgebungsvariablen setzen

Aus **Settings → API** übernehmen, in Vercel und lokal in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://dhxoeirilwrufhenhkpl.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=…
```

Erst wenn beide gesetzt sind, existieren `/login` und `/intern` überhaupt.

### 5. Ersten Admin setzen

Einmal über `/login` registrieren, danach im SQL Editor:

```sql
update public.profile
   set status = 'freigegeben', rolle = 'admin', freigegeben_am = now()
 where email = 'DEINE-ADRESSE';
```

Ohne diesen Schritt kann niemand Freigaben erteilen — auch nicht du selbst.

## Rechtliches vor dem Start

Der interne Bereich darf erst online gehen, wenn diese Punkte erledigt sind:

- [ ] **Impressum vollständig.** Enthält weiterhin Platzhalter. Ohne gültige
      Anbieterkennzeichnung dürfen keine Mitgliederkonten betrieben werden.
- [x] **Datenschutzerklärung erweitert** – Abschnitt 5 deckt Nutzerkonto,
      Anmeldung ohne Passwort, Session-Cookie und Supabase ab.
- [ ] **AV-Vertrag mit Supabase abschließen** und die dort genannte Anschrift
      in der Datenschutzerklärung ergänzen (TODO im Quelltext markiert).
- [x] **Löschkonzept** – Konten auf Wunsch, abgelehnte Registrierungen nach
      sechs Monaten. Der Turnus muss gelebt werden, automatisiert ist er nicht.
- [ ] **Eigenes SMTP (Resend)** – siehe unten.

Login-Cookies sind technisch notwendig und brauchen keine Einwilligung, müssen
aber in der Erklärung stehen.
