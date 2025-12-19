import { searchEvents, mapTmEventToAppEvent } from '@/lib/tm';
import EventCard from '@/components/EventCard';
import { Suspense } from 'react';
import SearchForm from '@/components/SearchForm';

async function EventsList({ city }: { city: string }) {
  try {
    const { events } = await searchEvents({ city });
    const mappedEvents = events.map(mapTmEventToAppEvent);

    if (!mappedEvents.length) {
      return (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center text-[var(--muted)]">
          <p className="text-lg font-semibold text-[var(--fg)]">No events yet for {city}.</p>
          <p>Try a nearby city or check back soon.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mappedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  } catch {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center text-[var(--muted)]">
        <p className="text-lg font-semibold text-[var(--fg)]">We could not load events.</p>
        <p>Check your Ticketmaster API key or enable `USE_MOCKS=true`.</p>
      </div>
    );
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ city?: string }>;
}) {
  const city = (await searchParams)?.city ?? 'Berlin'; // Default to Berlin if no city is provided

  return (
    <main className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">Event Finder</p>
              <h1 className="text-4xl md:text-5xl">Events in {city}</h1>
              <p className="text-[var(--muted)]">Curated by date, ready for tickets.</p>
            </div>
            <div className="w-full md:max-w-md">
              <SearchForm initialCity={city} />
            </div>
          </div>
        </section>
        <Suspense fallback={<p className="text-[var(--muted)]">Loading events...</p>}>
          <EventsList city={city} />
        </Suspense>
      </div>
    </main>
  );
}
