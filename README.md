# Vitalis Property Hub — Ionic React + Supabase

Rebuilt from the original static `Home Agent` HTML/CSS site into an Ionic React
mobile app, backed by Supabase (Postgres). Same navy/gold/cream brand, same
four sections (Home, Apartments, About, Contact), now with live data instead
of hardcoded listings.

## Stack
- **Frontend:** Ionic React + Vite + TypeScript, Capacitor (for iOS/Android builds)
- **Backend:** Supabase (Postgres, Row Level Security, Storage for images)

## 1. Install dependencies
```bash
npm install
```

## 2. Create the Supabase project
1. Go to https://supabase.com/dashboard and create a new project.
2. Open the **SQL Editor** and run the contents of `supabase/schema.sql`.
   This creates:
   - `apartments` table (with RLS: public can read `available` listings;
     only authenticated users can write)
   - `contact_messages` table (RLS: public can insert enquiries; only
     authenticated users can read them)
   - a public `apartment-images` storage bucket
   - 3 seed listings so the app isn't empty on first run
3. Go to **Project Settings > API** and copy the **Project URL** and
   **anon public key**.

## 3. Configure environment variables
```bash
cp .env.example .env
```
Then fill in:
```
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

## 4. Run the app
```bash
npm run dev
```
Opens at http://localhost:5173 — resize the browser to a phone width, or
open dev tools' device toolbar, to preview it as a mobile app.

## 5. (Optional) Build native apps with Capacitor
```bash
npm run build
npx cap add ios       # or: npx cap add android
npx cap sync
npx cap open ios      # or: npx cap open android
```

## Managing listings — Admin Panel
The app now has a built-in admin panel at `/admin` (also reachable via the
small "Admin" link at the bottom of the Contact tab).

**One-time setup:** create your login in Supabase Dashboard →
**Authentication → Users → Add user** (check "Auto Confirm User"). That
email/password is what you sign in with at `/admin`.

From the admin panel you can:
- See every listing (not just available ones)
- Add a new apartment, with a real **photo/video file upload** button that
  pushes straight into the `apartment-images` storage bucket and saves the
  resulting public URL
- Edit or delete existing listings
- Toggle "Featured" and status (available / reserved / taken)

No more manual Supabase dashboard editing needed for day-to-day listing
management — though the Table Editor is still there as a fallback.

Enquiries submitted through the app's Contact form land in the
`contact_messages` table — view them in Supabase's Table Editor (they're
not publicly readable, only from an authenticated session).

## Project structure
```
src/
  pages/            Home, Apartments, ApartmentDetail, About, Contact
  components/       PropertyCard, WhatsAppFloat
  lib/supabase.ts   Supabase client
  types/database.ts Apartment / ContactMessage types
  theme/variables.css  Brand colors mapped to Ionic CSS vars
supabase/schema.sql  Full DB schema + RLS policies + seed data
```

## What changed from the original static site
- 4 HTML pages → 4 Ionic React pages behind a bottom tab bar
- Hardcoded sample apartment cards → live Supabase query (`apartments` table)
- `mailto:` contact form → Supabase insert into `contact_messages`, with a
  toast confirmation
- Apartment "View Details" now routes to a real detail page
  (`/apartments/:id`) reading a single row from Supabase
- WhatsApp/call links preserved exactly as in the original
