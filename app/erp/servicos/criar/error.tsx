"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Erro na página de criar serviço:", error)
  }, [error])

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Erro ao carregar página
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Ocorreu um erro ao carregar a página de criação de serviços.</p>
          <div className="flex gap-4">
            <Button onClick={reset} variant="outline">
              Tentar novamente
            </Button>
            <Link href="/erp/servicos">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Voltar para Serviços</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
