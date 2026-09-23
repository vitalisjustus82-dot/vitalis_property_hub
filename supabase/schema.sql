-- Vitalis Property Hub — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`)
-- on a new project.

create extension if not exists "pgcrypto";

-- =========================================================
-- APARTMENTS
-- =========================================================
create table if not exists public.apartments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  price numeric(12, 2) not null,
  price_period text not null default 'year',
  category text not null default 'other'
    check (category in ('self-contain', '1-bedroom', '2-bedroom', '3-bedroom', 'family-home', 'other')),
  bedrooms int,
  bathrooms int,
  features text[],
  description text,
  image_url text,
  video_url text,
  featured boolean not null default false,
  status text not null default 'available'
    check (status in ('available', 'taken', 'reserved')),
  created_at timestamptz not null default now()
);

create index if not exists apartments_status_idx on public.apartments (status);
create index if not exists apartments_category_idx on public.apartments (category);
create index if not exists apartments_created_at_idx on public.apartments (created_at desc);

alter table public.apartments enable row level security;

-- Anyone (including anonymous app users) can read available listings.
create policy "Public can view available apartments"
  on public.apartments for select
  using (status = 'available');

-- Only authenticated users (e.g. you, signed in to Supabase Studio or
-- an admin panel later) can insert/update/delete listings. Anonymous
-- app users never get write access to this table.
create policy "Authenticated can manage apartments"
  on public.apartments for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =========================================================
-- CONTACT MESSAGES (submissions from the app's Contact form)
-- =========================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  looking_for text,
  message text,
  apartment_id uuid references public.apartments (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- The public app can submit enquiries...
create policy "Public can submit enquiries"
  on public.contact_messages for insert
  with check (true);

-- ...but only you (authenticated) can read them back.
create policy "Authenticated can view enquiries"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

-- =========================================================
-- STORAGE — bucket for apartment photos
-- =========================================================
insert into storage.buckets (id, name, public)
values ('apartment-images', 'apartment-images', true)
on conflict (id) do nothing;

create policy "Public can view apartment images"
  on storage.objects for select
  using (bucket_id = 'apartment-images');

create policy "Authenticated can upload apartment images"
  on storage.objects for insert
  with check (bucket_id = 'apartment-images' and auth.role() = 'authenticated');

-- =========================================================
-- SEED DATA (optional — mirrors the sample listings from the
-- original static site, safe to delete)
-- =========================================================
insert into public.apartments
  (title, location, price, category, bedrooms, bathrooms, features, description, image_url, featured, status)
values
  (
    'Modern 2-Bedroom Apartment', 'Calabar • Peaceful Estate', 1200000, '2-bedroom', 2, 2,
    array['2 bedrooms', '2 bathrooms', 'Water', 'Parking'],
    'A bright, modern 2-bedroom apartment in a quiet, secure estate.',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85',
    true, 'available'
  ),
  (
    'Bright Self-Contain', 'Calabar • City Centre', 650000, 'self-contain', 1, 1,
    array['Room', 'Kitchen', 'Bathroom', 'Secure compound'],
    'A cozy self-contain right in the city centre, close to everything.',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
    false, 'available'
  ),
  (
    'Spacious Family Home', 'Calabar • GRA Area', 2000000, 'family-home', 3, 2,
    array['3 bedrooms', 'Parking', 'Water', 'Large compound'],
    'A spacious family home in the GRA area with a large compound.',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85',
    false, 'available'
  )
on conflict do nothing;






-- AGENT PROFILES (private contact)
create table agents (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone_number text not null, -- PRIVATE, only admin can see
  whatsapp_number text,
  email text,
  is_verified boolean default false,
  avg_rating decimal default 0,
  total_ratings int default 0,
  created_at timestamp default now()
);

-- APARTMENTS (linked to agent)
create table apartments (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade,
  title text not null,
  location text not null,
  price decimal not null,
  description text,
  images text[] default '{}', -- array of image urls
  video_url text,
  status text default 'pending', -- pending, approved, rented
  created_at timestamp default now()
);

-- RATINGS (user rates agent after dealing)
create table agent_ratings (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade,
  apartment_id uuid references apartments(id) on delete cascade,
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  rater_name text,
  created_at timestamp default now()
);

-- Enable RLS
alter table agents enable row level security;
alter table apartments enable row level security;
alter table agent_ratings enable row level security;

-- POLICIES: Hide agent phone number from public
-- 1. Public can only see apartments that are approved
create policy "Public can view approved apartments" on apartments for select using (status = 'approved');

-- 2. Agents can insert/update their own apartments
create policy "Agents can manage own apartments" on apartments for all using (auth.uid() = agent_id);

-- 3. Nobody can see agent phone except admin and themselves
create policy "Agents see own private data" on agents for select using (auth.uid() = id);
-- You as admin will use service_role key to see all

-- 4. Public can rate, and view ratings
create policy "Anyone can rate" on agent_ratings for insert with check (true);
create policy "Anyone can view ratings" on agent_ratings for select using (true);