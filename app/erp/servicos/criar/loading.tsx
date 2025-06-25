import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          <p className="text-sm text-gray-500">Carregando formulário...</p>
        </div>
      </div>
    </div>
  )
}
