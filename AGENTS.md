# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Sjøhjelp is a mobile-first boat rescue/assistance web app for Høyanger, Vestland, Norway. The UI is entirely in Norwegian. It displays a map with nearby boats and allows users to call them for help.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Styling:** Tailwind CSS 3 with CSS custom properties for theming (defined in `app/globals.css`)
- **Maps:** Leaflet via `react-leaflet` — must be dynamically imported to avoid SSR issues (see `MapWrapper.tsx` pattern)
- **Language:** TypeScript (strict mode)
- **Deployment:** Render (configured in `render.yaml`)

## Development Commands

```bash
npm run dev       # Start dev server (uses Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint (next/core-web-vitals config)
```

## Architecture

### Routing (Next.js App Router)

- `/` — Redirect: sends logged-in users to `/app`, others to `/login`
- `/login` — Phone-based login
- `/register` — User + boat registration
- `/app` — Main view: greeting, GPS location, map with nearby boats
- `/settings` — Edit profile and boat info

### Key Patterns

- **Auth/state:** Currently localStorage-only (keys: `isLoggedIn`, `user`). No backend API yet — API calls are simulated with `setTimeout`. Auth checks run in `useEffect` on protected pages (`/app`, `/settings`).
- **Leaflet SSR workaround:** `Map.tsx` must not be server-rendered. It is wrapped by `MapWrapper.tsx` using `next/dynamic` with `ssr: false`. Follow this pattern for any Leaflet usage.
- **Mobile-first layout:** The root layout (`app/layout.tsx`) constrains content to `max-w-md` with centered layout, simulating a mobile app. All pages should be designed within this constraint.
- **Path alias:** `@/*` maps to the project root (e.g., `@/components/Map`).

### Theming

Colors are defined as CSS custom properties in `app/globals.css` and referenced in `tailwind.config.ts`. Use the Tailwind tokens (`text-primary`, `bg-primary-hover`, `text-foreground`, etc.) rather than raw color values.
