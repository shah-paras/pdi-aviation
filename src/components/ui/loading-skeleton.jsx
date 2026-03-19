export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-24 bg-white/20 rounded" />
            <div className="h-8 w-80 bg-white/20 rounded" />
            <div className="h-4 w-96 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="animate-pulse space-y-4">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="h-5 w-32 bg-white/20 rounded" />
                <div className="h-10 w-full bg-white/10 rounded-lg" />
                <div className="h-10 w-full bg-white/10 rounded-lg" />
                <div className="h-10 w-full bg-white/10 rounded-lg" />
              </div>
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-3">
                <div className="h-10 w-full bg-white/20 rounded-lg" />
                <div className="h-10 w-full bg-white/10 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="animate-pulse space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-5 space-y-3">
                    <div className="h-4 w-24 bg-white/20 rounded" />
                    <div className="h-7 w-32 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl border border-white/10 p-6 space-y-3">
                <div className="h-5 w-40 bg-white/20 rounded" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div className="h-4 w-32 bg-white/10 rounded" />
                    <div className="h-4 w-24 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
