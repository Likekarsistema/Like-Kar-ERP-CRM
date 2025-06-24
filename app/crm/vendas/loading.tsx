import { Skeleton } from "@/components/ui/skeleton"

export default function SalesLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-12 mt-1" />
              </div>
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-80" />
        <div className="hidden lg:flex items-center gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-20 lg:hidden" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4">
                  <Skeleton className="h-4 w-4" />
                </th>
                {Array.from({ length: 10 }).map((_, i) => (
                  <th key={i} className="text-left p-4">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="p-4">
                    <Skeleton className="h-4 w-4" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-28 mt-1" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20 mt-1" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-8 w-8" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="lg:hidden space-y-4 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-28 mt-1" />
                </div>

                <div>
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-20 mt-1" />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-20 mt-1" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
