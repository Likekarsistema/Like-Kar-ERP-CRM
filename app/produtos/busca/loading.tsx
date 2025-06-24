export default function SearchLoading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-16">
        <div className="animate-pulse space-y-8">
          {/* Search bar skeleton */}
          <div className="h-14 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto"></div>

          {/* Results count skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg w-48"></div>

          {/* Products grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
