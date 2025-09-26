export type Favorite = { id: string; name: string; imageUrl?: string; date?: string; venueName?: string };

const KEY = 'favorites-v1';

export function loadFavorites(): Favorite[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem(KEY);
    if (!s) return [];
    return JSON.parse(s) as Favorite[];
  } catch { return []; }
}

export function saveFavorites(list: Favorite[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

export function isFavorite(id: string): boolean {
  return loadFavorites().some(f => f.id === id);
}

export function toggleFavorite(ev: Favorite): boolean {
  const list = loadFavorites();
  const idx = list.findIndex(f => f.id === ev.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    saveFavorites(list);
    return false;
  }
  list.push(ev);
  saveFavorites(list);
  return true;
}
