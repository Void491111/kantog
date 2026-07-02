# Kantong · Catatan Keuangan

Minimal finance tracker built with **Next.js 15 + TypeScript + Tailwind v4 + shadcn + sonner + motion**.
Titan (titanium gray) × white palette. Features-first structure. Fully responsive.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- shadcn/ui primitives (button, card, input, dialog, select, table, sheet)
- sonner (toast notifications)
- motion / framer-motion (animate-ui style animations)
- Zustand + persist (localStorage — no backend needed)
- Recharts (area chart + pie chart)
- lucide-react (icons)

## Pages (3)

- `/dashboard` — welcome header, 4 stat cards (animated counters), revenue chart, recent activity
- `/transactions` — add/delete transactions, table (desktop) + card list (mobile)
- `/reports` — category breakdown pie chart + numeric summary

## Struktur

```
src/
├── app/                 # routes (App Router)
│   ├── dashboard/
│   ├── transactions/
│   └── reports/
├── features/            # features-first
│   ├── dashboard/components/
│   ├── transactions/components/
│   ├── reports/components/
│   └── shared/
│       ├── components/  # AppShell, AppSidebar, AnimatedNumber
│       └── store/       # Zustand finance store
├── components/ui/       # shadcn primitives
└── lib/utils.ts         # cn, formatCurrency, formatDate
```

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```
Or push to GitHub and import di dashboard Vercel — zero config, langsung jalan.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --build
```
Netlify auto-detects Next.js. Build command: `npm run build`, publish dir: `.next`.

## Notes

- Data persist di `localStorage` (key: `kantong-finance`), jadi ga perlu backend/DB.
- Auto-seed 7 dummy transaksi pas pertama kali buka.
- Untuk reset data: buka DevTools → Application → Local Storage → hapus `kantong-finance`.
