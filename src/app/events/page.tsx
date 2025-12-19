import { searchEvents, mapTmEventToAppEvent } from '@/lib/tm';
import EventCard from '@/components/EventCard';
import { Suspense } from 'react';

async function EventsList({ city }: { city: string }) {
  const { events } = await searchEvents({ city });
  const mappedEvents = events.map(mapTmEventToAppEvent);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mappedEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ city?: string }>;
}) {
  const city = (await searchParams)?.city ?? 'Berlin'; // Default to Berlin if no city is provided

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Events in {city}</h1>
      <Suspense fallback={<p>Loading events...</p>}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
