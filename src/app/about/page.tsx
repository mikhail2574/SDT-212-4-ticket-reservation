export default function Page() {
  return (
    <main className="px-6 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">About</p>
          <h1 className="mt-2 text-4xl">City Events Finder</h1>
          <p className="mt-3 text-[var(--muted)]">
            A lightweight experience for discovering events, previewing seats, and sharing plans.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm text-[var(--muted)]">
          <p className="font-semibold text-[var(--fg)]">What is inside?</p>
          <p className="mt-2">Ticketmaster Discovery API search, seat selection demos, and one-tap calendar exports.</p>
        </div>
      </div>
    </main>
  );
}
