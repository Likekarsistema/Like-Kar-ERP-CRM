export default function ProductsLoading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-16">
        <div className="animate-pulse space-y-8">
          {/* Hero section skeleton */}
          <div className="h-64 bg-gray-200 rounded-lg w-full"></div>

          {/* Search bar skeleton */}
          <div className="h-14 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto"></div>

          {/* Categories skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>

          {/* Featured products skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
