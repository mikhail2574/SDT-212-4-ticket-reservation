import { Seat } from './types';

// A simple deterministic pseudo-random number generator
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function generateArenaSeats(rand: () => number): Seat[] {
  const seats: Seat[] = [];
  const sections = 10;
  const rowsPerSection = 15;
  const seatsPerRow = 30;

  for (let s = 0; s < sections; s++) {
    for (let r = 0; r < rowsPerSection; r++) {
      for (let n = 0; n < seatsPerRow; n++) {
        const price = 150 - r * 5; // Closer rows are more expensive
        seats.push({
          id: `sec${s}-row${r}-seat${n}`,
          section: String.fromCharCode(65 + s),
          row: (r + 1).toString(),
          number: n + 1,
          price,
          status: rand() < 0.2 ? 'reserved' : 'available',
          x: s * 400 + n * 12,
          y: r * 12,
        });
      }
    }
  }
  return seats;
}

function generateTheatreSeats(rand: () => number): Seat[] {
  const seats: Seat[] = [];
  const levels = ['Stalls', 'Balcony'];
  const rowsPerLevel = 10;
  const seatsPerRow = 20;

  levels.forEach(level => {
    for (let r = 0; r < rowsPerLevel; r++) {
      for (let n = 0; n < seatsPerRow; n++) {
        const price = level === 'Stalls' ? 120 - r * 6 : 80 - r * 4;
        seats.push({
          id: `${level}-row${r}-seat${n}`,
          section: level,
          row: (r + 1).toString(),
          number: n + 1,
          price,
          status: rand() < 0.15 ? 'reserved' : 'available',
          x: n * 15,
          y: (levels.indexOf(level) * 150) + r * 12,
        });
      }
    }
  });
  return seats;
}

export function generateSeatMap(eventId: string, venueType: 'arena' | 'theatre' | 'ga' = 'arena'): Seat[] {
  if (venueType === 'ga') return [];

  // Create a numeric seed from the eventId string
  const seed = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rand = seededRandom(seed);

  if (venueType === 'theatre') {
    return generateTheatreSeats(rand);
  }
  return generateArenaSeats(rand);
}
