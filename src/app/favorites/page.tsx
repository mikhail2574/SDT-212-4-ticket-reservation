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
    <main className="px-6 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">Pinned Events</p>
          <h1 className="mt-2 text-4xl">Favorites</h1>
          <p className="text-sm text-[var(--muted)]">Quickly jump back into the events you have saved.</p>
        </div>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center text-[var(--muted)]">
            No favorites yet. Browse events and tap Save.
          </div>
        ) : (
          <ul className="space-y-3">
            {list.map(e => (
              <li key={e.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]">
                <div>
                  <div className="font-semibold">{e.name}</div>
                  <div className="text-sm text-[var(--muted)]">{e.date} • {e.venueName}</div>
                </div>
                <Link href={`/events/${e.id}`} className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent-strong)]">Open</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
