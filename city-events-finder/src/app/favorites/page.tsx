"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Favorite, loadFavorites } from '@/lib/favorites';

export default function Page() {
  const [list, setList] = useState<Favorite[]>([]);

  useEffect(() => {
    setList(loadFavorites());
  }, []);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>
      {list.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="space-y-3">
          {list.map(e => (
            <li key={e.id} className="p-4 border rounded-md dark:border-gray-700 flex items-center justify-between">
              <div>
                <div className="font-semibold">{e.name}</div>
                <div className="text-sm opacity-80">{e.date} • {e.venueName}</div>
              </div>
              <Link href={`/events/${e.id}`} className="px-3 py-2 bg-blue-500 text-white rounded-md">Open</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
