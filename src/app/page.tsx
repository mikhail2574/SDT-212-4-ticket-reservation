import Hero3D from './(home)/Hero3D';
import SearchForm from '@/components/SearchForm';

export default function Page() {
  return (
    <main className="px-6 py-12">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">Live City Radar</p>
          <h1 className="text-5xl leading-tight md:text-6xl">
            Find the nights your city will talk about.
          </h1>
          <p className="max-w-xl text-lg text-[var(--muted)]">
            Search curated concerts, festivals, and experiences, then jump straight to tickets, maps, and shareable itineraries.
          </p>
          <SearchForm />
          <div className="grid gap-4 text-sm text-[var(--muted)] sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-lg font-semibold text-[var(--fg)]">Fast search</p>
              <p>Instantly explore what is happening nearby.</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-lg font-semibold text-[var(--fg)]">Seat previews</p>
              <p>Visual seat picks with live totals.</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-lg font-semibold text-[var(--fg)]">Shareable plans</p>
              <p>Add to calendar and share in one tap.</p>
            </div>
          </div>
        </div>
        <div className="animate-fade-up">
          <Hero3D />
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
            <p className="font-semibold text-[var(--fg)]">Pro tip</p>
            <p>Try searching for Berlin, Amsterdam, or Lisbon to preview the catalog.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
