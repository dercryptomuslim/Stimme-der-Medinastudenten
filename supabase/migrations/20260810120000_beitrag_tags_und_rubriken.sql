-- Tags am Beitrag, breitere Rubriken und die ersten beiden Beiträge.
--
-- Tags sind bewusst ein text[]-Array direkt am Beitrag, keine eigene Tabelle:
-- Das passt zum "einfach hinzufügen"-Prinzip der Telegram-Gruppe (ein neuer
-- Hashtag ist nur ein neues Wort) und braucht keine zusätzliche RLS-Fläche –
-- die Tags erben den Schutz des Beitrags.

-- ---------------------------------------------------------------------------
-- Tags
-- ---------------------------------------------------------------------------

alter table public.beitrag
  add column if not exists tags text[] not null default '{}';

comment on column public.beitrag.tags is
  'Normalisierte Tag-Slugs, z. B. {finanzen, wichtige-apps}. Anzeige über lib/intern.ts.';

-- Filtern nach Tag (tags @> array['finanzen'])
create index if not exists beitrag_tags_idx on public.beitrag using gin (tags);

-- ---------------------------------------------------------------------------
-- Rubriken: breitere Bereiche, an die Hashtag-Kategorien angelehnt
-- ---------------------------------------------------------------------------

insert into public.rubrik (slug, titel, beschreibung, icon, reihenfolge) values
  ('familie',    'Familie & Gesundheit',
   'Ehe, Kinder, Schule, Ärzte und alles rund um die Familie.', 'HeartPulse', 10),
  ('wohnen',     'Wohnen & Haushalt',
   'Wohnungssuche, Möbel, Haushaltsware und Handwerker.', 'Home', 20),
  ('versorgung', 'Essen & Einkaufen',
   'Lebensmittel, Restaurants und wo es was gibt.', 'ShoppingCart', 30),
  ('auto',       'Auto & Mobilität',
   'Kauf, Zulassung, Versicherung und Werkstätten.', 'Car', 40),
  ('finanzen',   'Finanzen & Behörden',
   'Bankkonto, Geld wechseln, Idarah und Unterlagen für Deutschland.', 'Wallet', 50),
  ('apps',       'Wichtige Apps',
   'Apps, die den Alltag in Medina leichter machen.', 'Smartphone', 60),
  ('mekka',      'Mekka & Umrah',
   'Anreise, günstige Unterkünfte und Transport.', 'MapPin', 70),
  ('sonstiges',  'Sonstiges',
   'Alles, was in keine andere Rubrik passt.', 'LayoutGrid', 80)
on conflict (slug) do update set
  titel       = excluded.titel,
  beschreibung= excluded.beschreibung,
  icon        = excluded.icon,
  reihenfolge = excluded.reihenfolge;

-- ---------------------------------------------------------------------------
-- Erste Beiträge (aus der Telegram-Gruppe, inhaltlich unverändert)
-- ---------------------------------------------------------------------------

insert into public.beitrag
  (rubrik_slug, slug, titel, anriss, inhalt, veroeffentlicht, tags)
values
(
  'finanzen',
  'konto-bezahlen-geld-wechseln',
  'Konto eröffnen, bezahlen & Geld wechseln in Medina',
  'Bankkonto als Muqeem, tägliche Zahlungen mit Apple/Google Pay und wo du am besten Geld wechselst.',
  E'## Bankkonto als Muqeem (Resident)\n\nIn Medina kannst du bei folgenden Banken ein Konto eröffnen:\n\n**Al Rajhi Bank**\nRegistrierung in der App → Iqama & Handynummer eingeben → SMS-OTP → Angaben zu Beruf/Einkommen → Verifizierung über Absher/Nafath → IBAN sofort verfügbar → Debitkarte am Kiosk ausdrucken und am ATM aktivieren.\nhttps://www.alrajhibank.com.sa\n\n**SNB Al Ahli (Saudi National Bank)**\nRegistrierung über App oder Website mit Iqama & Absher → Konto wird direkt eröffnet → Karte am ATM abholen.\nhttps://www.alahli.com\n\n**Alinma Bank**\nApp oder Website → Iqama & Handynummer eingeben → Absher-Verifizierung → Konto sofort aktiv → digitale Karte sofort nutzbar → physische Karte am Kiosk drucken oder per Post erhalten.\nhttps://www.alinma.com\n\n## Tägliche Zahlungen\n\nApple Pay / Google Pay funktionieren überall problemlos, auch mit internationalen Karten:\n\n- N26 — https://n26.com\n- Revolut — https://www.revolut.com\n- Wise — https://wise.com\n\n## Geld wechseln\n\nDie Wechselstuben direkt am Haram geben keinen guten Kurs — weiter hinten ist er besser. Eine mit gutem Kurs, bei der du auch größere Beträge problemlos wechseln kannst:\n\nAus Tor 17/18/19 im Haram raus, hinter dem Hilton die große Fußgängerzone entlang. Dort ist die Wechselstube.\n\n[Standort auf Google Maps](https://maps.app.goo.gl/PdxpxXcBwGB5BaHf8?g_st=com.google.maps.preview.copy)',
  true,
  '{finanzen,wichtige-apps}'
),
(
  'finanzen',
  'abmeldung-krankenkasse-mukafa',
  'Abmeldung, Krankenkasse & Mukāfa-Nachweis',
  'Was du für Deutschland brauchst: Abmeldung, Befreiung von der Krankenkasse und der Mukāfa-Nachweis.',
  E'Du musst dich in Deutschland **nicht unbedingt abmelden**.\n\n## Befreiung von der Krankenkasse\n\nWenn du älter als 25 bist, kannst du dich von der deutschen Krankenkasse befreien lassen. Dafür brauchst du eine Bestätigung, dass du über die Uni versichert bist:\n\n- Das Schreiben bekommst du beim **Direktor des Universitätskrankenhauses** — frag am besten vor Ort danach.\n- Anschließend muss das Dokument **ins Englische übersetzt** werden.\n\n## Mukāfa-Nachweis (Stipendium)\n\nManche deutschen Behörden verlangen zusätzlich einen Nachweis, dass du eine Mukāfa (Stipendium) erhältst.\n\n- Dieses Dokument bekommst du im **Wahda 22 – Qism al-Mukāfa im Erdgeschoss**.\n- Auch dieses Schreiben muss **ins Englische übersetzt** werden.',
  true,
  '{unterlagen-fuer-deutschland,idarah}'
)
on conflict (rubrik_slug, slug) do nothing;
