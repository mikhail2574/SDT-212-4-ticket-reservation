import { getEventDetails, mapTmEventToAppEvent } from '@/lib/tm';
import Image from 'next/image';
import TicketsSection from '@/components/TicketsSection';
import VenueMap from '@/components/VenueMap';
import EventHeader from '@/components/EventHeader';

export default async function Page({ params }: { params: { id: string } }) {
  const eventDetails = await getEventDetails(params.id);

  if (!eventDetails) {
    return <p>Event not found.</p>;
  }

  const event = mapTmEventToAppEvent(eventDetails);

  return (
    <main className="p-4 md:p-8">
      <EventHeader event={event} />
      <div className="mt-8">
        {/* Basic Tab Implementation for now */}
        <div role="tablist" className="tabs tabs-lifted">
          <a role="tab" className="tab tab-active">Overview</a>
          <a role="tab" className="tab">Tickets</a>
          <a role="tab" className="tab">Venue</a>
        </div>

        {/* Overview Content */}
        <div className="mt-4">
          <p>{eventDetails.pleaseNote}</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {eventDetails.images?.map((img, i) => (
              <div key={i} className="relative aspect-video">
                <Image src={img.url} alt={`${event.name} image ${i + 1}`} fill className="rounded-lg object-cover" />
              </div>
            ))}
          </div>
        </div>

        <TicketsSection eventId={event.id} />
      </div>
    </main>
  );
}
