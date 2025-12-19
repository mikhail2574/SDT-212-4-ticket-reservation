import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

type EventCardProps = {
  event: {
    id: string;
    name: string;
    imageUrl?: string;
    date?: string;
    venueName?: string;
  };
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow)] transition hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.imageUrl || '/placeholder.svg'}
          alt={event.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex-1 text-lg font-semibold">{event.name}</h3>
          <FavoriteButton event={{ id: event.id, name: event.name, imageUrl: event.imageUrl, date: event.date, venueName: event.venueName }} />
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">{event.date || 'Date TBA'}</p>
        <p className="text-sm text-[var(--muted)]">{event.venueName || 'Venue TBA'}</p>
      </div>
    </Link>
  );
}
