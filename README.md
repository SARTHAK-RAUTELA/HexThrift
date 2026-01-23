# HexThrift — Clothing Store Starter

Starter scaffold for an India-first clothing e-commerce site (HexThrift):

- Next.js + TypeScript + Tailwind CSS
- Supabase (Auth, Postgres, Storage)
- Razorpay Orders + Webhook (INR)
- Single app with /admin area (role-based)

Palette
- Accent / bg: #EAEFFE
- Primary accent: #9787F3
- Dark typography: #2D274B

Quick start
1. Install:
   - npm install
2. Environment variables: copy `.env.example` and fill values
3. Run migrations: paste `supabase-schema.sql` into Supabase SQL editor and run.
4. Start dev: `npm run dev`
5. Deploy: push to Git and connect to Vercel

Env variables required
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- RAZORPAY_WEBHOOK_SECRET
- NEXT_PUBLIC_APP_URL

Notes
- Prices are stored in paise (integer value).
- Checkout flow: server creates an order in DB, creates Razorpay order, client opens Razorpay Checkout with the order id, webhook updates payment status.
- Admin routes are under `/admin`. Basic role check (profile.role) required — set role to `admin` in `profiles` row to access.