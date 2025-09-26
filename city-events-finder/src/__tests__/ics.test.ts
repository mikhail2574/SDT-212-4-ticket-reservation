import { describe, it, expect } from 'vitest';
import { buildICS } from '@/lib/ics';

describe('ICS builder', () => {
  it('produces VEVENT with required fields', () => {
    const ics = buildICS({ id: 'e1', title: 'Test', start: '2025-10-01T18:00:00Z', location: 'Berlin', url: 'https://example.com' });
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('SUMMARY:Test');
    expect(ics).toContain('DTSTART:20251001');
    expect(ics).toContain('END:VEVENT');
    expect(ics).toContain('END:VCALENDAR');
  });
});
