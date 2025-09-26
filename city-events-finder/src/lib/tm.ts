import { TmEvent } from './types';

const API_BASE = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = process.env.TM_API_KEY;
const USE_MOCKS = process.env.USE_MOCKS === 'true' || !API_KEY;

// A simple fetch wrapper with error handling and exponential backoff
async function fetchWithBackoff(url: string, options: RequestInit = {}, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) { // Rate limit
        console.warn(`Rate limited. Retrying in ${delay / 1000}s...`);
        await new Promise(res => setTimeout(res, delay));
        return fetchWithBackoff(url, options, retries - 1, delay * 2);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// --- API Client ---

export async function searchEvents(params: { city: string; startDate?: string; endDate?: string; page?: number; size?: number }) {
  if (USE_MOCKS) {
    console.log('Using mock data for searchEvents');
    const mockData = await import('@/lib/mocks/events.json');
    return { events: mockData.default as TmEvent[], totalElements: mockData.default.length };
  }

  const query = new URLSearchParams({
    apikey: API_KEY!,
    city: params.city,
    startDateTime: params.startDate ? `${params.startDate}T00:00:00Z` : '',
    endDateTime: params.endDate ? `${params.endDate}T23:59:59Z` : '',
    page: (params.page ?? 0).toString(),
    size: (params.size ?? 20).toString(),
    sort: 'date,asc',
  });

  const data = await fetchWithBackoff(`${API_BASE}/events.json?${query.toString()}`);
  return {
    events: data._embedded?.events as TmEvent[] || [],
    totalElements: data.page?.totalElements || 0,
  };
}

export async function getEventDetails(id: string): Promise<TmEvent | null> {
  if (USE_MOCKS) {
    console.log(`Using mock data for getEventDetails (id: ${id})`);
    try {
      const mockData = await import(`@/lib/mocks/event-${id}.json`);
      return mockData.default as TmEvent;
    } catch {
      return null;
    }
  }

  const query = new URLSearchParams({ apikey: API_KEY! });
  const data = await fetchWithBackoff(`${API_BASE}/events/${id}.json?${query.toString()}`);
  return data as TmEvent;
}

// --- Mappers (can be expanded later) ---

export function mapTmEventToAppEvent(tmEvent: TmEvent) {
  return {
    id: tmEvent.id,
    name: tmEvent.name,
    url: tmEvent.url,
    imageUrl: tmEvent.images?.[0]?.url,
    date: tmEvent.dates?.start?.localDate,
    time: tmEvent.dates?.start?.localTime,
    venueName: tmEvent._embedded?.venues?.[0]?.name,
    cityName: tmEvent._embedded?.venues?.[0]?.city?.name,
    priceRange: tmEvent.priceRanges?.[0] ? `${tmEvent.priceRanges[0].min} - ${tmEvent.priceRanges[0].max} ${tmEvent.priceRanges[0].currency}` : 'N/A',
    seatmapUrl: tmEvent.seatmap?.staticUrl,
  };
}
