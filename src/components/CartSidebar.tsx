import { Seat } from '@/lib/types';

type CartSidebarProps = {
  eventId: string;
  selectedSeats: Seat[];
  onReserve: () => void;
};

export default function CartSidebar({ eventId, selectedSeats, onReserve }: CartSidebarProps) {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <aside className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)] md:w-80">
      <h2 className="text-xl font-semibold">Your Selection</h2>
      {selectedSeats.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--muted)]">Select seats from the map.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {selectedSeats.map(seat => (
            <li key={seat.id} className="flex justify-between">
              <span>{`Sec ${seat.section}, Row ${seat.row}, Seat ${seat.number}`}</span>
              <span>€{seat.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 border-t border-[var(--border)] pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <button
          onClick={onReserve}
          disabled={selectedSeats.length === 0}
          className="mt-4 w-full rounded-xl bg-[var(--accent)] p-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent-strong)] disabled:bg-[var(--border)] disabled:text-[var(--muted)]"
        >
          Reserve Now
        </button>
        <p className="mt-2 text-xs text-center text-[var(--muted)]">Demo reservation (no purchase)</p>
      </div>
    </aside>
  );
}
