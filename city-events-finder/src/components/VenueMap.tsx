type Venue = { name?: string; city?: { name?: string } };

export default function VenueMap({ venue }: { venue?: Venue }) {
  const title = [venue?.name, venue?.city?.name].filter(Boolean).join(', ');
  const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(title || 'venue')}`;
  return (
    <div className="p-4 border rounded-md dark:border-gray-700">
      <div className="font-semibold mb-2">Venue</div>
      <div className="text-sm mb-2">{title || 'Unknown venue'}</div>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open in Maps</a>
    </div>
  );
}
