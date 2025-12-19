import { getEventDetails, mapTmEventToAppEvent } from '@/lib/tm';
import Image from 'next/image';
import TicketsSection from '@/components/TicketsSection';
import VenueMap from '@/components/VenueMap';
import EventHeader from '@/components/EventHeader';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let eventDetails = null;
  try {
    eventDetails = await getEventDetails(id);
  } catch {
    return (
      <main className="px-6 py-12">
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-center text-[var(--muted)] shadow-[var(--shadow)]">
          <p className="text-lg font-semibold text-[var(--fg)]">We could not load this event.</p>
          <p>Check your Ticketmaster API key or enable `USE_MOCKS=true`.</p>
        </div>
      </main>
    );
  }

  if (!eventDetails) {
    return <p className="px-6 py-12 text-[var(--muted)]">Event not found.</p>;
  }

  const event = mapTmEventToAppEvent(eventDetails);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <EventHeader event={event} />
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <h2 className="text-2xl">Overview</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {eventDetails.pleaseNote || 'Ticket notes and venue information will appear here once published.'}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventDetails.images?.slice(0, 6).map((img, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--border)]">
                <Image src={img.url} alt={`${event.name} image ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <h2 className="text-2xl">Tickets</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Pick seats and hold them for a short demo reservation.</p>
          <TicketsSection eventId={event.id} />
        </section>
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <VenueMap venue={eventDetails._embedded?.venues?.[0]} />
        </section>
      </div>
    </main>
  );
}
