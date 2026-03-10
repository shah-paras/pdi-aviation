export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 lg:py-16">
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="h-5 w-32 bg-slate-200 rounded" />
                <div className="h-10 w-full bg-slate-100 rounded-lg" />
                <div className="h-10 w-full bg-slate-100 rounded-lg" />
                <div className="h-10 w-full bg-slate-100 rounded-lg" />
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <div className="h-10 w-full bg-slate-200 rounded-lg" />
                <div className="h-10 w-full bg-slate-100 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="animate-pulse space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-7 w-32 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <div className="h-5 w-40 bg-slate-200 rounded" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div className="h-4 w-32 bg-slate-100 rounded" />
                    <div className="h-4 w-24 bg-slate-100 rounded" />
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
