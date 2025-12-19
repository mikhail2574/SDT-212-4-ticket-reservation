import { Seat } from '@/lib/types';

type CartSidebarProps = {
  eventId: string;
  selectedSeats: Seat[];
  onReserve: () => void;
};

export default function CartSidebar({ eventId, selectedSeats, onReserve }: CartSidebarProps) {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <aside className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full md:w-80">
      <h2 className="text-2xl font-bold mb-4">Your Selection</h2>
      {selectedSeats.length === 0 ? (
        <p>Select seats from the map.</p>
      ) : (
        <ul className="space-y-2">
          {selectedSeats.map(seat => (
            <li key={seat.id} className="flex justify-between">
              <span>{`Sec ${seat.section}, Row ${seat.row}, Seat ${seat.number}`}</span>
              <span>€{seat.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <button
          onClick={onReserve}
          disabled={selectedSeats.length === 0}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Reserve Now
        </button>
        <p className="text-xs text-center mt-2">Demo reservation (no purchase)</p>
      </div>
    </aside>
  );
}
