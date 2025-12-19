import { NextResponse } from 'next/server';
import { Reservation, Seat } from '@/lib/types';

// In-memory store for demo purposes
const reservations: Map<string, Reservation> = new Map();
const reservedSeats: Set<string> = new Set(); // eventId-seatId

export async function POST(request: Request) {
  const { eventId, seats } = await request.json() as { eventId: string; seats: Seat[] };

  if (!eventId || !seats || seats.length === 0) {
    return NextResponse.json({ error: 'Missing eventId or seats' }, { status: 400 });
  }

  // Check if any seats are already reserved
  for (const seat of seats) {
    if (reservedSeats.has(`${eventId}-${seat.id}`)) {
      return NextResponse.json({ error: `Seat ${seat.id} is already reserved.` }, { status: 409 });
    }
  }

  // Mark seats as reserved
  seats.forEach(seat => reservedSeats.add(`${eventId}-${seat.id}`));

  const reservation: Reservation = {
    id: `res-${Date.now()}`,
    eventId,
    seats,
    total: seats.reduce((sum, seat) => sum + seat.price, 0),
    createdAt: new Date().toISOString(),
  };

  reservations.set(reservation.id, reservation);

  return NextResponse.json(reservation, { status: 201 });
}
