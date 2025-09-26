import { describe, it, expect } from 'vitest';
import { generateSeatMap } from '@/lib/seatmap';

describe('seatmap generator', () => {
  it('is deterministic per eventId', () => {
    const a = generateSeatMap('event-abc', 'arena');
    const b = generateSeatMap('event-abc', 'arena');
    expect(a).toEqual(b);
  });

  it('produces seats for arena and theatre', () => {
    const arena = generateSeatMap('event-x', 'arena');
    const theatre = generateSeatMap('event-y', 'theatre');
    expect(arena.length).toBeGreaterThan(100);
    expect(theatre.length).toBeGreaterThan(50);
  });

  it('marks some seats reserved', () => {
    const arena = generateSeatMap('event-x', 'arena');
    const reserved = arena.filter(s => s.status === 'reserved').length;
    expect(reserved).toBeGreaterThan(0);
  });
});
