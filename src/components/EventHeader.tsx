'use client';

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
      text: `${e.name} - ${e.date ?? ''} ${e.venueName ?? ''}`.trim(),
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
    <header className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">Event briefing</p>
      <h1 className="mt-2 text-4xl md:text-5xl">{event.name}</h1>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        <span>{event.date || 'Date TBA'}</span>
        <span>{event.venueName || 'Venue TBA'}</span>
        <span>{event.cityName || 'City TBA'}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 items-center">
        {event.url ? (
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent-strong)]">
            Buy on Ticketmaster
          </a>
        ) : (
          <span className="rounded-xl border border-[var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Ticket Link Pending
          </span>
        )}
        <Link
          href={`/api/ics?id=${encodeURIComponent(event.id)}&title=${encodeURIComponent(event.name)}&start=${encodeURIComponent(toISO(event.date, event.time))}&location=${encodeURIComponent(event.venueName ?? '')}&url=${encodeURIComponent(event.url ?? '')}`}
          className="rounded-xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--fg)] transition hover:bg-[var(--fg)] hover:text-[var(--bg)]"
        >
          Add to Calendar
        </Link>
        <button
          className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--fg)]"
          onClick={() => shareEvent(event)}
        >
          Share
        </button>
        <FavoriteButton event={{ id: event.id, name: event.name, date: event.date, imageUrl: undefined, venueName: event.venueName }} />
      </div>
    </header>
  );
}
