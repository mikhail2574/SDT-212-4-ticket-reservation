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
      className={`text-xl leading-none ${fav ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'} `}
      onClick={(e) => {
        e.preventDefault();
        const nowFav = toggleFavorite(event);
        setFav(nowFav);
      }}
    >
      {fav ? '★' : '☆'}
    </button>
  );
}
