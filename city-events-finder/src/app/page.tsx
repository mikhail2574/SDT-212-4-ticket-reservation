import Hero3D from './(home)/Hero3D';
import SearchForm from '@/components/SearchForm';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-4xl font-bold text-center">City Events Finder</h1>
        <Hero3D />
        <SearchForm />
      </div>
    </main>
  );
}
