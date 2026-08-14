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
| Zugang | Konten legt das Team an; Freigabe von Hand |
| Anmeldung | Vorerst E-Mail + Passwort; Magic Link, sobald eigenes SMTP steht |
| Erster Ausbaustand | Login, Freigabe-Workflow, drei Rubriken |

Redaktionell statt Wiki, weil damit weder Moderation noch Haftung für fremde
Inhalte anfällt. Die Datenstruktur lässt eine spätere Öffnung offen: dafür
genügt es, Schreibrechte in den Policies auf freigegebene Mitglieder
auszuweiten und eine Versionstabelle zu ergänzen.

Langfristig ist Magic Link das Ziel (keine Passwort-Resets, keine schwachen
Passwörter). Er setzt aber eigenes SMTP voraus – ohne SMTP lassen sich die
E-Mail-Vorlagen nicht auf token_hash umstellen, und der Standardlink
scheitert außerhalb des anfordernden Browsers. Bis Domain und SMTP stehen,
läuft der Betrieb deshalb mit Passwörtern, siehe „Betrieb ohne eigenes
SMTP“.

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
Team legt Konto im Dashboard an (Add user, Auto Confirm)
  │  Trigger legt profile an, status = 'wartend'
  ▼
Freigabe: SQL oder /intern/verwaltung   ──abgelehnt──> Hinweisseite
  │
  ▼
status = 'freigegeben'
  │  Zugangsdaten werden persönlich übergeben
  ▼
Anmeldung mit E-Mail + Passwort  ->  Zugriff auf /intern
  │
  ▼
Passwort ändern unter /intern/konto
```

Die Session liegt in einem httpOnly-Cookie. Im späteren Magic-Link-Betrieb
ersetzt der E-Mail-Link nur den Passwort-Schritt – Freigabe und Rollen
bleiben identisch.

## Routen

| Pfad | Zugriff |
|---|---|
| `/login` | offen |
| `/auth/confirm` | offen, prüft token_hash und legt die Session an |
| `/auth/callback` | offen, Rückfallebene für Links im PKCE-Code-Format |
| `/intern` | nur freigegeben — Übersicht der Rubriken |
| `/intern/[rubrik]` | nur freigegeben — Beiträge der Rubrik |
| `/intern/suche` | nur freigegeben — Volltextsuche |
| `/intern/[rubrik]/[slug]` | nur freigegeben — einzelner Beitrag |
| `/intern/warteliste` | eingeloggt, noch nicht freigegeben |
| `/intern/konto` | eingeloggt — eigenes Passwort ändern |
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

## Suche

Volltextsuche über Titel, Anriss, Tags und Inhalt aller Beiträge – deutsche
Wortstammsuche direkt in Postgres (`to_tsvector('german', …)`), damit
„Werkstatt“ auch „Werkstätten“ findet. Gewichtung: Titel vor Anriss und Tags
vor Fließtext.

Der Suchindex liegt in `beitrag.suche` und wird per Trigger gepflegt.
Die Funktion `beitrag_suchen(text)` ist bewusst **SECURITY INVOKER**: Damit
greifen die RLS-Policies des Aufrufers, ein Mitglied bekommt nur
veröffentlichte Beiträge, ein Redakteur auch Entwürfe – ohne Sonderlogik in
der Anwendung.

Kein Sprachmodell im Spiel: Die Suche kostet nichts, braucht keine externe
API und kann nichts erfinden. Bei praktischen Ortsangaben (Werkstätten,
Behördenwege) ist genau das der Punkt – eine erfundene Antwort würde dazu
führen, dass jemand zur falschen Adresse fährt.

Ein KI-Bot (RAG) bleibt als späterer Ausbau denkbar, sobald genug Inhalt da
ist. Festgelegt ist bereits: Er dürfte **ausschließlich** aus den Beiträgen
antworten, immer mit Quellenangabe, und müsste „steht bei uns noch nicht
drin“ sagen statt zu raten.

## Was noch offen ist

- **Inhalte.** Werkstätten, Unterkünfte und Behördenwege sind Ortswissen. Diese
  Texte müssen von Studenten vor Ort kommen.
- **Aktualität.** Preise und Ansprechpartner veralten. Ohne feste Zuständigkeit
  je Rubrik wird die Plattform binnen eines Jahres unbrauchbar.
- **Benachrichtigung bei Registrierung.** Über Resend an eine Team-Adresse,
  analog zum Kontaktformular.

## Betrieb ohne eigenes SMTP (aktueller Stand)

Solange kein eigenes SMTP eingerichtet ist, verschickt der Mitgliederbereich
**keine einzige E-Mail**. Anmeldung läuft über E-Mail + Passwort
(`signInWithPassword`), Passwortänderung über `/intern/konto`
(`updateUser` – versendet nichts, solange „Secure password change“ in den
Auth-Einstellungen deaktiviert bleibt; das ist der Standard).

### Konten anlegen

Im Dashboard unter **Authentication → Users → Add user → „Create new
user“**: E-Mail und Startpasswort eintragen, Haken bei **Auto Confirm
User**. Nicht „Send invitation“ wählen – das würde eine E-Mail verschicken,
die ohne SMTP nicht ankommt.

`auth.users` direkt per SQL zu befüllen ist keine Option: Die Tabelle
enthält interne Spalten (Passwort-Hash, Token, Bestätigungsfelder), die das
Dashboard korrekt setzt und Hand-SQL fast sicher nicht.

Der Trigger legt das Profil automatisch mit `status = 'wartend'` an.
Freigeben entweder als Admin unter `/intern/verwaltung` oder per SQL:

```sql
update public.profile
   set status = 'freigegeben', freigegeben_am = now()
 where email = 'NEUE-ADRESSE';
```

### Regeln für diese Phase

- Startpasswörter zufällig wählen, pro Person verschieden, persönlich
  übergeben (nicht in Gruppen posten).
- Jedes Mitglied ändert sein Passwort bei der ersten Anmeldung unter
  `/intern/konto` – sonst kennt das Team dauerhaft alle Passwörter.
- **Sign-ups deaktivieren:** Unter **Authentication → Sign In / Providers**
  „Allow new users to sign up“ ausschalten. Konten entstehen in dieser Phase
  ausschließlich über das Dashboard; die Registrierungs-Route bliebe sonst
  offen, obwohl ihre Bestätigungsmails nie ankommen.
- Passwort vergessen: Ohne SMTP gibt es keinen Self-Service-Reset. Der Admin
  löscht das Konto im Dashboard und legt es mit neuem Startpasswort neu an
  (Profil-Freigabe danach erneut setzen – der Löschvorgang räumt das Profil
  mit ab).

## Einrichtung

Diese Schritte lassen sich nicht aus dem Code heraus erledigen — der
Supabase-Connector ist nur für die Organisation *Nomad Agency* autorisiert und
erreicht dieses Projekt nicht.

### 1. Migration einspielen

Im Dashboard unter **SQL Editor** den Inhalt von
`supabase/migrations/20260808000000_intranet.sql` einfügen und ausführen.

### 2. Anmeldung konfigurieren

Unter **Authentication → Providers** nur *Email* aktiv lassen. **„Allow new
users to sign up“ ausschalten**, solange der Passwort-Betrieb läuft — Konten
entstehen ausschließlich über das Dashboard. Erst wenn später der
Magic-Link-Betrieb mit Selbstregistrierung gewünscht ist, wird die
Einstellung wieder aktiviert; die Zugangskontrolle bleibt auch dann die
Freigabe.

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

### 3. Eigenes SMTP einrichten – Voraussetzung für Magic Link

Unter **Project Settings → Authentication → SMTP Settings**. Für den
laufenden Passwort-Betrieb (siehe oben) ist dieser Schritt nicht nötig.

Für den Magic-Link-Betrieb ist er zwingend: **Supabase erlaubt das
Bearbeiten der E-Mail-Vorlagen nur mit eigenem SMTP.** Ohne diesen Schritt
lässt sich Schritt 2b nicht ausführen, und ohne 2b schlägt jede
Link-Anmeldung fehl, die nicht im selben Browser geöffnet wird. Im reinen
Link-Betrieb wäre der Mailversand damit gleichbedeutend mit dem
Anmeldesystem; im aktuellen Passwort-Betrieb ist das Passwort die
Rückfallebene.

Dazu kommt das Sendelimit des eingebauten Mailers, den Supabase selbst als
nur zu Demonstrationszwecken gedacht bezeichnet.

Zugangsdaten für Resend:

| Feld | Wert |
|---|---|
| Host | `smtp.resend.com` |
| Port | `587` |
| Username | `resend` |
| Password | Resend-API-Key |

### 3b. Absenderadresse – hängt an der Domain

Resend verschickt über `onboarding@resend.dev` ausschließlich an die eigene
Kontoadresse. Für alle anderen Empfänger verlangt Resend eine verifizierte
Domain.

Verifiziert ist bisher nur `fajrup.co` – die gehört zu einem anderen Projekt.
Anmeldemails für Medinastudenten von dort zu verschicken wäre technisch
möglich, aber falsch: Studenten bekämen Zugangslinks von einer fremden
Domain, was von Phishing kaum zu unterscheiden ist.

Daraus folgt die Reihenfolge:

1. **Jetzt:** SMTP mit `onboarding@resend.dev`. Reicht, um das eigene Konto
   anzulegen, zum Admin zu machen und den gesamten Ablauf zu prüfen.
2. **Bevor der Bereich für Mitglieder geöffnet wird:** eigene Domain
   registrieren, in Resend verifizieren, Absender umstellen.

Die Domainfrage blockiert damit nicht mehr nur den öffentlichen Launch,
sondern auch die Öffnung des Mitgliederbereichs.

### 4. Umgebungsvariablen setzen

Aus **Settings → API** übernehmen, in Vercel und lokal in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://dhxoeirilwrufhenhkpl.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=…
```

Erst wenn beide gesetzt sind, existieren `/login` und `/intern` überhaupt.

### 5. Ersten Admin setzen

Das eigene Konto im Dashboard anlegen (**Authentication → Users → Add user →
„Create new user“**, Haken bei *Auto Confirm User* — nicht „Send
invitation“), danach im SQL Editor:

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
      Anmeldung, Session-Cookie und Supabase ab.
- [ ] **AV-Vertrag mit Supabase abschließen** und die dort genannte Anschrift
      in der Datenschutzerklärung ergänzen (TODO im Quelltext markiert).
- [x] **Löschkonzept** – Konten auf Wunsch, abgelehnte Registrierungen nach
      sechs Monaten. Der Turnus muss gelebt werden, automatisiert ist er nicht.
- [ ] **Eigenes SMTP (Resend)** – siehe unten.

Login-Cookies sind technisch notwendig und brauchen keine Einwilligung, müssen
aber in der Erklärung stehen.
