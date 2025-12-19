'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    const params = new URLSearchParams({ city });
    router.push(`/events?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
        className="p-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Search
      </button>
    </form>
  );
}
