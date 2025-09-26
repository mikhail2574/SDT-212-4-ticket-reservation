'use client';

import { generateSeatMap } from '@/lib/seatmap';
import { Seat } from '@/lib/types';
import { useEffect, useState } from 'react';

const seatStatusColors = {
  available: 'text-green-500',
  selected: 'text-blue-500',
  reserved: 'text-red-500',
};

export default function SeatMap({ eventId, onSelectionChange }: { eventId: string; onSelectionChange?: (seats: Seat[]) => void }) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  useEffect(() => {
    const generatedSeats = generateSeatMap(eventId, 'arena');
    setSeats(generatedSeats);
  }, [eventId]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat?.status === 'reserved') return;

    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seatId)) {
      newSelected.delete(seatId);
    } else {
      newSelected.add(seatId);
    }
    setSelectedSeats(newSelected);
    if (onSelectionChange) {
      const selected = seats.filter(s => newSelected.has(s.id));
      onSelectionChange(selected);
    }
  };

  return (
    <div className="w-full h-96 overflow-auto border rounded-lg bg-gray-50 dark:bg-gray-900">
      <svg width="2000" height="1000" viewBox="0 0 2000 1000">
        {seats.map(seat => (
          <circle
            key={seat.id}
            cx={seat.x}
            cy={seat.y}
            r={5}
            className={`cursor-pointer ${seatStatusColors[selectedSeats.has(seat.id) ? 'selected' : seat.status]}`}
            onClick={() => handleSeatClick(seat.id)}
          />
        ))}
      </svg>
    </div>
  );
}
