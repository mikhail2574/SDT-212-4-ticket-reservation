'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchFormProps = {
  initialCity?: string;
};

export default function SearchForm({ initialCity }: SearchFormProps) {
  const [city, setCity] = useState(initialCity ?? '');
  const router = useRouter();

  useEffect(() => {
    if (initialCity) setCity(initialCity);
  }, [initialCity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = city.trim();
    if (!cleaned) return;
    const params = new URLSearchParams({ city: cleaned });
    router.push(`/events?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)] md:flex-row md:items-center">
      <label className="flex-1">
        <span className="sr-only">City</span>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city or neighborhood"
          className="w-full rounded-xl border border-transparent bg-transparent px-3 py-3 text-base text-[var(--fg)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[rgba(15,118,110,0.2)]"
        />
      </label>
      <button
        type="submit"
        className="animate-glow rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent-strong)]"
      >
        Search
      </button>
    </form>
  );
}
