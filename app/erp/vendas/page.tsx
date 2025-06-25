"use client"

import { useState, useEffect } from "react"
import { Plus, Download, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SalesPage() {
  const [loading, setLoading] = useState(true)

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando vendas...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Vendas</h1>
          <p className="text-gray-500">Gerencie todas as vendas e orçamentos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 h-10">
            <Link href="/erp/vendas/criar">
              <Plus className="h-4 w-4 mr-2" />
              Nova Venda
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Gerencie suas vendas</h3>
          <p className="text-gray-500 mb-6">
            Visualize e gerencie todas as suas vendas, orçamentos e comissões em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Link href="/erp/vendas/criar">
                <Plus className="h-4 w-4 mr-2" />
                Criar Nova Venda
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/erp/vendas/orcamentos">Ver Orçamentos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
