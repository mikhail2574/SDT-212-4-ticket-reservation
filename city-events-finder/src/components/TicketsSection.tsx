'use client';

import { useCallback, useMemo, useState } from 'react';
import SeatMap from '@/components/SeatMap';
import CartSidebar from '@/components/CartSidebar';
import { Seat } from '@/lib/types';

export default function TicketsSection({ eventId }: { eventId: string }) {
  const [selected, setSelected] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const total = useMemo(() => selected.reduce((s, x) => s + x.price, 0), [selected]);

  const onSelectionChange = useCallback((seats: Seat[]) => {
    setSelected(seats);
    // store to localStorage for demo persistence
    try { localStorage.setItem(`sel:${eventId}`, JSON.stringify(seats)); } catch {}
  }, [eventId]);

  const onReserve = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, seats: selected })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j.error || 'Failed to reserve');
        return;
      }
      const data = await res.json();
      setReservationId(data.id);
      alert(`Reserved! Reservation ID: ${data.id}`);
    } finally {
      setLoading(false);
    }
  }, [eventId, selected]);

  return (
    <div className="mt-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 min-w-0">
        <SeatMap eventId={eventId} onSelectionChange={onSelectionChange} />
      </div>
      <div className="w-full md:w-80 shrink-0">
        <CartSidebar eventId={eventId} selectedSeats={selected} onReserve={onReserve} />
        {reservationId ? (
          <p className="mt-2 text-sm text-green-600">Reservation: {reservationId}</p>
        ) : null}
        {loading ? <p className="mt-2 text-sm">Processing…</p> : null}
        <p className="mt-2 text-xs opacity-80">Selected seats: {selected.length} • Total €{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
