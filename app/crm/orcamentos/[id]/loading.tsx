import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function QuoteItemDetailsLoading() {
  return (
    <div className="space-y-6 py-6 px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" disabled className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Voltar
        </Button>
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mt-2 animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
