'use client';

import { useEffect, useState } from 'react';
import { Favorite, isFavorite, toggleFavorite } from '@/lib/favorites';

export default function FavoriteButton({ event }: { event: Favorite }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(event.id));
  }, [event.id]);

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      className={`rounded-full border border-[var(--border)] px-2 py-1 text-sm ${fav ? 'text-[var(--accent-2)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'} `}
      onClick={(e) => {
        e.preventDefault();
        const nowFav = toggleFavorite(event);
        setFav(nowFav);
      }}
    >
      {fav ? 'Saved' : 'Save'}
    </button>
  );
}
