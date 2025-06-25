export default function LeadsLoading() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mt-2 animate-pulse"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="min-w-[300px] bg-gray-100 rounded-lg animate-pulse">
              <div className="h-20 bg-gray-200 rounded-t-lg mb-4"></div>
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
