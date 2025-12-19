# City Events Finder

This is a Next.js application that allows users to search for events in a city and view the details of the events. The application uses the Ticketmaster Discovery API to fetch the events.

## Features

- Search for events by city and date
- View the details of an event
- View the seat map of an event
- Reserve a seat for an event
- Add an event to the calendar
- Share an event with others
- View the venue of an event on a map
- Light and dark theme
- 3D hero section
- 3D seat map
- Confetti animation on successful reservation

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- React Three Fiber
- Framer Motion
- Vitest
- Playwright

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

Create a `.env.local` file for local development:

```bash
TM_API_KEY=your_ticketmaster_key
USE_MOCKS=true
NEXT_PUBLIC_ENABLE_3D=true
NEXT_PUBLIC_ENABLE_PARTICLES=true
```

- `TM_API_KEY` is required in production unless `USE_MOCKS=true`.
- `USE_MOCKS=true` lets the app run without a Ticketmaster key during local development.
- `NEXT_PUBLIC_ENABLE_3D` and `NEXT_PUBLIC_ENABLE_PARTICLES` toggle optional visuals.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

When configuring the project on Vercel, add `TM_API_KEY` (and any other optional flags) to the Environment Variables section.
