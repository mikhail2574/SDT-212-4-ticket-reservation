type Venue = { name?: string; city?: { name?: string } };

export default function VenueMap({ venue }: { venue?: Venue }) {
  const title = [venue?.name, venue?.city?.name].filter(Boolean).join(', ');
  const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(title || 'venue')}`;
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]">
      <div className="text-lg font-semibold">Venue</div>
      <div className="mt-2 text-sm text-[var(--muted)]">{title || 'Unknown venue'}</div>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg)] transition hover:bg-[var(--fg)] hover:text-[var(--bg)]">
        Open in Maps
      </a>
    </div>
  );
}
