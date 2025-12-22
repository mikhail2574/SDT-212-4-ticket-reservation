# City Events Finder

A Next.js app for discovering Ticketmaster events by city, viewing event details, and simulating reservations with seat selection.

## Overview

City Events Finder lets users search by city, browse event cards, and open event detail pages with images, venue info, and a demo reservation flow. The app supports mock data for local development when API access is unavailable.

## Features

- City search with event cards and detail pages
- Ticketmaster Discovery API integration (mocked fallback supported)
- Seat selection and reservation demo flow
- Favorites and calendar export (ICS)
- Optional 3D hero and seat map visuals
- Light/dark theme toggle

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Three Fiber
- Framer Motion
- Vitest + Playwright

## Project Structure

- `src/app/` pages, layouts, and API routes
- `src/components/` UI and interactive components
- `src/lib/` API client, types, mocks, utilities
- `src/lib/mocks/` local mock event data

## Environment Variables

Create a `.env` file in the project root:

```bash
TM_API_KEY=your_ticketmaster_consumer_key
USE_MOCKS=false
NEXT_PUBLIC_ENABLE_3D=true
NEXT_PUBLIC_ENABLE_PARTICLES=true
```

Notes:
- `TM_API_KEY` should be the Ticketmaster Consumer Key (Discovery API).
- Set `USE_MOCKS=true` to run without a key.

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Tests

```bash
pnpm test
pnpm test:e2e
```

## Reflection

This project focused on building a polished, user-friendly event discovery flow while keeping the data layer simple and flexible. The Ticketmaster Discovery API provides rich event data but requires careful handling of missing fields, inconsistent image hosts, and rate limits, which influenced the API wrapper and UI fallbacks.

Using mock data was critical for fast iteration and enabled consistent UI development even when API access was unavailable. The separation of API mapping in `src/lib/tm.ts` helped keep UI components clean and stable as data shapes evolved.

The main tradeoff is that client-side experiences (favorites, theming, and some 3D visuals) can introduce hydration or runtime edge cases in Next.js, so more robust guards and error boundaries would be valuable in future iterations. If the project were extended, the next steps would be: caching API responses, adding pagination for large result sets, and implementing a proper reservation backend.
