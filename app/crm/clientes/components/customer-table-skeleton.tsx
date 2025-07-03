export function CustomerTableSkeleton() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left w-10">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
              </th>
              <th className="py-3 px-4 text-right">
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }).map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-2">
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto border-t border-gray-200 p-4 flex justify-between">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  )
}
