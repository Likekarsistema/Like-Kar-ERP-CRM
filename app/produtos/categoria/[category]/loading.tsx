export default function CategoryLoading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="w-full max-w-7xl px-4 py-16">
        <div className="animate-pulse space-y-8">
          {/* Hero section skeleton */}
          <div className="h-40 bg-gray-200 rounded-lg w-full"></div>

          {/* Filters skeleton */}
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>

          {/* Products grid skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
