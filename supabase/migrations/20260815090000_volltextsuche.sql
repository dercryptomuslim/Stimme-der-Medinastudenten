-- Volltextsuche über die Beiträge des internen Bereichs.
--
-- Deutsche Textsuche direkt in Postgres: findet Wortstämme, also "Werkstatt"
-- auch über "Werkstätten". Kostet nichts, braucht keine externe API und kann
-- nichts erfinden – im Gegensatz zu einem Sprachmodell.

-- ---------------------------------------------------------------------------
-- Suchspalte
-- ---------------------------------------------------------------------------

alter table public.beitrag
  add column if not exists suche tsvector;

comment on column public.beitrag.suche is
  'Automatisch gepflegter Suchindex. Gewichtung: Titel > Anriss/Tags > Inhalt.';

-- Bewusst per Trigger statt als generierte Spalte: array_to_string ist je nach
-- Postgres-Version nicht als IMMUTABLE markiert, was eine generierte Spalte
-- ablehnen würde. Der Trigger ist an dieser Stelle die verlässlichere Variante.
create or replace function public.beitrag_suche_aktualisieren()
returns trigger
language plpgsql
as $$
begin
  new.suche :=
    setweight(to_tsvector('german', coalesce(new.titel, '')), 'A') ||
    setweight(to_tsvector('german', coalesce(new.anriss, '')), 'B') ||
    setweight(to_tsvector('german', coalesce(array_to_string(new.tags, ' '), '')), 'B') ||
    setweight(to_tsvector('german', coalesce(new.inhalt, '')), 'C');
  return new;
end;
$$;

drop trigger if exists beitrag_suche_pflegen on public.beitrag;
create trigger beitrag_suche_pflegen
  before insert or update of titel, anriss, inhalt, tags on public.beitrag
  for each row execute function public.beitrag_suche_aktualisieren();

create index if not exists beitrag_suche_idx on public.beitrag using gin (suche);

-- Bestehende Beiträge einmalig indizieren. Der geaendert_am-Trigger wird dabei
-- kurz stillgelegt, damit alte Beiträge nicht als "gerade bearbeitet" gelten.
alter table public.beitrag disable trigger beitrag_touch;
update public.beitrag set titel = titel;
alter table public.beitrag enable trigger beitrag_touch;

-- ---------------------------------------------------------------------------
-- Suchfunktion
-- ---------------------------------------------------------------------------

-- Bewusst SECURITY INVOKER (Standard): Die Funktion läuft mit den Rechten des
-- Aufrufers, damit die RLS-Policies greifen. Ein Mitglied bekommt so nur
-- veröffentlichte Beiträge, ein Redakteur auch Entwürfe – ohne Sonderlogik.
create or replace function public.beitrag_suchen(suchbegriff text)
returns table (
  id uuid,
  rubrik_slug text,
  slug text,
  titel text,
  anriss text,
  veroeffentlicht boolean,
  tags text[],
  geaendert_am timestamptz,
  auszug text,
  relevanz real
)
language sql
stable
as $$
  with frage as (
    select websearch_to_tsquery('german', coalesce(suchbegriff, '')) as q
  )
  select
    b.id, b.rubrik_slug, b.slug, b.titel, b.anriss,
    b.veroeffentlicht, b.tags, b.geaendert_am,
    -- « » als Markierung statt HTML: die Anwendung rendert daraus <mark>,
    -- ohne jemals Auszeichnung aus der Datenbank auszuführen.
    -- Werte mit Leerzeichen müssen in Anführungszeichen stehen, sonst bricht
    -- ts_headline beim Parsen der Optionen ab.
    ts_headline(
      'german', b.inhalt, frage.q,
      'StartSel=«, StopSel=», MaxWords=38, MinWords=18, MaxFragments=2, FragmentDelimiter=" … "'
    ) as auszug,
    ts_rank(b.suche, frage.q) as relevanz
  from public.beitrag b, frage
  where frage.q is not null
    and frage.q <> ''::tsquery
    and b.suche @@ frage.q
  order by ts_rank(b.suche, frage.q) desc, b.geaendert_am desc
  limit 50;
$$;

comment on function public.beitrag_suchen(text) is
  'Volltextsuche über Beiträge. Respektiert RLS, weil SECURITY INVOKER.';
