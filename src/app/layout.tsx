import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

const bodyFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const displayFont = Fraunces({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'City Events Finder',
  description: 'Find events in your city',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)] backdrop-blur">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                  City Events Finder
                </Link>
                <nav className="hidden items-center gap-6 text-sm md:flex">
                  <Link href="/events" className="opacity-80 transition hover:opacity-100">Events</Link>
                  <Link href="/favorites" className="opacity-80 transition hover:opacity-100">Favorites</Link>
                  <Link href="/about" className="opacity-80 transition hover:opacity-100">About</Link>
                </nav>
                <ThemeToggle />
              </div>
              <nav className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 pb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)] md:hidden">
                <Link href="/events" className="transition hover:text-[var(--fg)]">Events</Link>
                <Link href="/favorites" className="transition hover:text-[var(--fg)]">Favorites</Link>
                <Link href="/about" className="transition hover:text-[var(--fg)]">About</Link>
              </nav>
            </header>
            <div className="flex-1">{children}</div>
            <footer className="border-t border-[var(--border)]">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
                <p>Built for quick city searches, curated tickets, and shareable itineraries.</p>
                <p>Data powered by Ticketmaster Discovery API.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
