import FavoriteButton from '@/components/FavoriteButton';
import Link from 'next/link';

type EventHeaderProps = {
  event: {
    id: string;
    name: string;
    date?: string;
    time?: string;
    venueName?: string;
    cityName?: string;
    url?: string;
  };
};

export default function EventHeader({ event }: EventHeaderProps) {
  function toISO(date?: string, time?: string) {
    if (!date) return new Date().toISOString();
    const iso = time ? `${date}T${time}` : `${date}T00:00:00`;
    try { return new Date(iso).toISOString(); } catch { return new Date().toISOString(); }
  }

  async function shareEvent(e: EventHeaderProps['event']) {
    const shareData = {
      title: e.name,
      text: `${e.name} — ${e.date ?? ''} ${e.venueName ?? ''}`.trim(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    } as ShareData;
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url || '');
        alert('Link copied to clipboard');
      }
    } catch {
      /* ignore */
    }
  }
  return (
    <header>
      <h1 className="text-4xl font-bold">{event.name}</h1>
      <div className="flex gap-4 mt-2 text-lg text-gray-600 dark:text-gray-400">
        <span>{event.date}</span>
        <span>{event.venueName}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <a href={event.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Buy on Ticketmaster
        </a>
        <Link
          href={`/api/ics?id=${encodeURIComponent(event.id)}&title=${encodeURIComponent(event.name)}&start=${encodeURIComponent(toISO(event.date, event.time))}&location=${encodeURIComponent(event.venueName ?? '')}&url=${encodeURIComponent(event.url ?? '')}`}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
        >
          Add to Calendar
        </Link>
        <button
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          onClick={() => shareEvent(event)}
        >
          Share
        </button>
        <FavoriteButton event={{ id: event.id, name: event.name, date: event.date, imageUrl: undefined, venueName: event.venueName }} />
      </div>
    </header>
  );
}
