import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CustomerDetailsSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 pb-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div>
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-9 w-full bg-gray-200 rounded animate-pulse"></div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
