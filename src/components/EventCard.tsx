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
    <Link href={`/events/${event.id}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="relative h-48">
        <Image
          src={event.imageUrl || '/placeholder.png'}
          alt={event.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-lg flex-1">{event.name}</h3>
          <FavoriteButton event={{ id: event.id, name: event.name, imageUrl: event.imageUrl, date: event.date, venueName: event.venueName }} />
        </div>
        <p className="text-gray-600 dark:text-gray-400">{event.date}</p>
        <p className="text-gray-600 dark:text-gray-400">{event.venueName}</p>
      </div>
    </Link>
  );
}
