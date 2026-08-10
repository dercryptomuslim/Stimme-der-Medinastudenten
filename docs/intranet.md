# Interner Bereich – Architektur

Geschützter Mitgliederbereich für Studenten der Islamischen Universität Medina
mit praktischen Informationen zum Leben vor Ort.

**Stand:** Anwendung gebaut, Datenbank noch nicht eingerichtet.
Zur Inbetriebnahme siehe [Einrichtung](#einrichtung) am Ende.

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
Passwörter und keinen Support-Aufwand gibt. Der Versand läuft über das
bereits eingerichtete Resend-Konto als SMTP-Anbieter in Supabase.

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

### Abschaltung als Standard

Ohne `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
liefern `/login`, `/intern/*` und `/auth/callback` durchgängig 404. Ein
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
| `/auth/callback` | offen, tauscht den Link-Token gegen eine Session |
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

Unter **Authentication → Providers** nur *Email* aktiv lassen, darin
*Confirm email* und Magic Link aktivieren, *Enable Signups* eingeschaltet
lassen — die Zugangskontrolle passiert über die Freigabe, nicht über
gesperrte Registrierung.

Unter **Authentication → URL Configuration** eintragen:

- *Site URL*: die Adresse der Website
- *Redirect URLs*: `<Adresse>/auth/callback`

Ohne den Callback-Eintrag lehnt Supabase jeden Anmeldelink ab.

### 3. Mailversand auf Resend umstellen

Unter **Project Settings → Authentication → SMTP Settings**. Der eingebaute
Versand von Supabase hat ein enges Sendelimit und ist für den Betrieb nicht
gedacht. Zugangsdaten liefert Resend, das für das Kontaktformular ohnehin
schon eingerichtet ist.

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
- [ ] **Datenschutzerklärung erweitern** um Nutzerkonten, gespeicherte Daten
      (E-Mail, Name, Zeitstempel), Login-Cookies, Löschfristen und die
      Rechtsgrundlage.
- [ ] **Supabase als Auftragsverarbeiter** — AV-Vertrag abschließen und in der
      Erklärung nennen.
- [ ] **Resend** ist bereits Auftragsverarbeiter, kommt durch den Magic-Link-
      Versand aber zusätzlich mit Mitgliederdaten in Berührung.
- [ ] **Löschkonzept.** Was passiert mit Konten von Abgängern, was mit
      abgelehnten Registrierungen.

Login-Cookies sind technisch notwendig und brauchen keine Einwilligung, müssen
aber in der Erklärung stehen.
