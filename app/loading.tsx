export default function Loading() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="w-full max-w-lg border border-black/15 rounded-2xl p-8 bg-white/90 backdrop-blur-sm">
        <div className="h-3 w-36 bg-black/10 rounded mb-4 animate-pulse" />
        <div className="h-9 w-full bg-black/10 rounded mb-3 animate-pulse" />
        <div className="h-9 w-5/6 bg-black/10 rounded mb-8 animate-pulse" />
        <div className="h-10 w-40 bg-black rounded-full animate-pulse" />
      </div>
    </main>
  );
}
