"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { debugLocalStorage, resetCustomersData, testCreateCustomer } from "@/lib/debug-helper"
import { useRouter } from "next/navigation"

export default function DebugPage() {
  const [debugResult, setDebugResult] = useState<string>("")
  const router = useRouter()

  const handleDebugLocalStorage = () => {
    const result = debugLocalStorage()
    setDebugResult(`Depuração do localStorage: ${result ? "Sucesso" : "Falha"}`)
  }

  const handleResetCustomers = () => {
    const result = resetCustomersData()
    setDebugResult(`Reset de clientes: ${result ? "Sucesso" : "Falha"}`)
    router.refresh()
  }

  const handleTestCreateCustomer = () => {
    const result = testCreateCustomer()
    setDebugResult(`Teste de criação de cliente: ${result ? "Sucesso" : "Falha"}`)
    router.refresh()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Página de Depuração</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ferramentas de Depuração</CardTitle>
          <CardDescription>Use estas ferramentas para diagnosticar problemas no sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={handleDebugLocalStorage} variant="outline" className="w-full">
              Depurar LocalStorage
            </Button>
          </div>
          <div>
            <Button onClick={handleResetCustomers} variant="outline" className="w-full">
              Resetar Dados de Clientes
            </Button>
          </div>
          <div>
            <Button onClick={handleTestCreateCustomer} variant="outline" className="w-full">
              Testar Criação de Cliente
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full p-4 bg-gray-100 rounded-md">
            <p className="font-mono text-sm">{debugResult || "Nenhum resultado ainda"}</p>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => router.push("/crm/clientes")} variant="outline">
          Voltar para Clientes
        </Button>
      </div>
    </div>
  )
}
