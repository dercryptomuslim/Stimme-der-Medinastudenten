-- Interner Mitgliederbereich
--
-- Redaktionelles Modell: das Team schreibt, freigegebene Mitglieder lesen.
-- Der Zugriffsschutz liegt in Row Level Security, nicht in der Anwendung.

-- ---------------------------------------------------------------------------
-- Typen
-- ---------------------------------------------------------------------------

create type public.mitglied_status as enum ('wartend', 'freigegeben', 'abgelehnt');
create type public.mitglied_rolle  as enum ('mitglied', 'redakteur', 'admin');

-- ---------------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------------

create table public.profile (
  id               uuid primary key references auth.users on delete cascade,
  email            text not null,
  name             text,
  status           public.mitglied_status not null default 'wartend',
  rolle            public.mitglied_rolle  not null default 'mitglied',
  notiz            text,
  erstellt_am      timestamptz not null default now(),
  freigegeben_am   timestamptz,
  freigegeben_von  uuid references auth.users on delete set null
);

comment on table public.profile is
  'Ein Datensatz je Konto. Wird beim Registrieren per Trigger angelegt.';
comment on column public.profile.notiz is
  'Interne Bemerkung zur Freigabe. Für Mitglieder nicht sichtbar.';

create index profile_status_idx on public.profile (status);

create table public.rubrik (
  slug          text primary key,
  titel         text not null,
  beschreibung  text,
  icon          text,
  reihenfolge   integer not null default 0
);

comment on table public.rubrik is
  'Themenbereiche. Als Tabelle, damit neue Rubriken ohne Migration möglich sind.';

create table public.beitrag (
  id               uuid primary key default gen_random_uuid(),
  rubrik_slug      text not null references public.rubrik(slug) on delete restrict,
  slug             text not null,
  titel            text not null,
  anriss           text,
  inhalt           text not null default '',
  veroeffentlicht  boolean not null default false,
  autor            uuid references auth.users on delete set null,
  erstellt_am      timestamptz not null default now(),
  geaendert_am     timestamptz not null default now(),
  unique (rubrik_slug, slug)
);

comment on column public.beitrag.inhalt is 'Markdown.';

create index beitrag_rubrik_idx on public.beitrag (rubrik_slug, veroeffentlicht);

-- ---------------------------------------------------------------------------
-- Hilfsfunktionen
--
-- security definer ist hier notwendig: eine Policy auf profile, die selbst
-- profile abfragt, würde sonst endlos rekursiv auswerten.
-- ---------------------------------------------------------------------------

create or replace function public.ist_freigegeben()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profile
    where id = auth.uid() and status = 'freigegeben'
  );
$$;

create or replace function public.hat_rolle(gesucht public.mitglied_rolle)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profile
    where id = auth.uid()
      and status = 'freigegeben'
      and (rolle = gesucht or rolle = 'admin')
  );
$$;

-- Profil beim Registrieren anlegen
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profile (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- geaendert_am pflegen
create or replace function public.touch_geaendert_am()
returns trigger
language plpgsql
as $$
begin
  new.geaendert_am = now();
  return new;
end;
$$;

create trigger beitrag_touch
  before update on public.beitrag
  for each row execute function public.touch_geaendert_am();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profile enable row level security;
alter table public.rubrik  enable row level security;
alter table public.beitrag enable row level security;

-- profile: eigenen Datensatz sehen, Admins sehen alle
create policy profile_select_eigen on public.profile
  for select using (id = auth.uid());

create policy profile_select_admin on public.profile
  for select using (public.hat_rolle('admin'));

-- Status und Rolle vergibt ausschließlich ein Admin.
-- Bewusst kein Self-Update: sonst könnte sich jeder selbst freischalten.
create policy profile_update_admin on public.profile
  for update using (public.hat_rolle('admin'))
  with check (public.hat_rolle('admin'));

-- rubrik
create policy rubrik_select on public.rubrik
  for select using (public.ist_freigegeben());

create policy rubrik_schreiben on public.rubrik
  for all using (public.hat_rolle('redakteur'))
  with check (public.hat_rolle('redakteur'));

-- beitrag: Veröffentlichtes für Freigegebene, alles für Redakteure
create policy beitrag_select_veroeffentlicht on public.beitrag
  for select using (veroeffentlicht and public.ist_freigegeben());

create policy beitrag_select_redaktion on public.beitrag
  for select using (public.hat_rolle('redakteur'));

create policy beitrag_schreiben on public.beitrag
  for all using (public.hat_rolle('redakteur'))
  with check (public.hat_rolle('redakteur'));

-- ---------------------------------------------------------------------------
-- Startrubriken
-- ---------------------------------------------------------------------------

insert into public.rubrik (slug, titel, beschreibung, icon, reihenfolge) values
  ('familie', 'Familie & Alltag',
   'Ehe, Kinder, Schule, Behördengänge und Wohnen in Medina.', 'Users', 10),
  ('auto', 'Auto',
   'Kauf, Zulassung, Versicherung und Werkstätten.', 'Car', 20),
  ('mekka', 'Mekka & Umrah',
   'Anreise, günstige Unterkünfte und Transport.', 'MapPin', 30);

-- ---------------------------------------------------------------------------
-- Nach dem Einspielen von Hand erledigen
-- ---------------------------------------------------------------------------
-- 1. Eigenes Konto über /login registrieren.
-- 2. Ersten Admin setzen – ohne diesen Schritt kann niemand freigeben:
--
--    update public.profile
--       set status = 'freigegeben',
--           rolle  = 'admin',
--           freigegeben_am = now()
--     where email = 'DEINE-ADRESSE';
--
-- 3. In Supabase unter Authentication > Providers ausschließlich
--    "Email" mit aktiviertem Magic Link belassen.
-- 4. SMTP auf Resend umstellen, sonst greift das Sendelimit von Supabase.
