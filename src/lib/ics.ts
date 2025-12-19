export function buildICS(opts: {
  id: string;
  title: string;
  start: string; // ISO
  durationMinutes?: number;
  location?: string;
  url?: string;
  description?: string;
  timezone?: string; // optional, for MVP keep UTC
}) {
  const dtStart = opts.start.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const dtEnd = (() => {
    try {
      const d = new Date(opts.start);
      const end = new Date(d.getTime() + (opts.durationMinutes ?? 120) * 60000);
      return end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    } catch {
      return dtStart;
    }
  })();
  const uid = `${opts.id}@city-events-finder.local`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//City Events Finder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeText(opts.title)}`,
    opts.location ? `LOCATION:${escapeText(opts.location)}` : undefined,
    opts.url ? `URL:${escapeText(opts.url)}` : undefined,
    opts.description ? `DESCRIPTION:${escapeText(opts.description)}` : undefined,
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean) as string[];
  return lines.join('\r\n');
}

function escapeText(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
