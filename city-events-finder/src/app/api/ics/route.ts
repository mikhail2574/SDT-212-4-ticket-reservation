import { NextResponse } from 'next/server';
import { buildICS } from '@/lib/ics';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Event';
  const start = searchParams.get('start'); // ISO required
  const duration = Number(searchParams.get('duration') || '120');
  const location = searchParams.get('location') || undefined;
  const url = searchParams.get('url') || undefined;
  const description = searchParams.get('description') || undefined;
  const id = searchParams.get('id') || `evt-${Date.now()}`;

  if (!start) {
    return NextResponse.json({ error: 'Missing start (ISO string)' }, { status: 400 });
  }

  const ics = buildICS({ id, title, start, durationMinutes: duration, location, url, description });
  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${id}.ics"`
    },
  });
}
