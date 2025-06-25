"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Search, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { PurchaseOrderTable } from "./components/purchase-order-table"
import { AdvancedPurchaseOrderFilters } from "./components/advanced-purchase-order-filters"
import { useToast } from "@/hooks/use-toast"
import { getAllPurchaseOrders, deleteMultiplePurchaseOrders } from "@/lib/mock-data"
import Link from "next/link"

export default function PurchaseOrdersPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  // Estado para filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState({
    status: "all",
    priority: "all",
    supplier: "",
    department: "all",
  })

  // Carregar pedidos
  useEffect(() => {
    loadPurchaseOrders()
  }, [])

  const loadPurchaseOrders = async () => {
    setLoading(true)
    try {
      const data = getAllPurchaseOrders()
      setPurchaseOrders(data)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os pedidos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) return

    try {
      const success = deleteMultiplePurchaseOrders(selectedOrders)
      if (success) {
        toast({
          title: "Sucesso",
          description: `${selectedOrders.length} pedido(s) excluído(s) com sucesso`,
        })
        setSelectedOrders([])
        loadPurchaseOrders()
      } else {
        throw new Error("Falha ao excluir pedidos")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir os pedidos selecionados",
        variant: "destructive",
      })
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const success = deleteMultiplePurchaseOrders([orderId])
      if (success) {
        toast({
          title: "Sucesso",
          description: "Pedido excluído com sucesso",
        })
        loadPurchaseOrders()
      } else {
        throw new Error("Falha ao excluir pedido")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o pedido",
        variant: "destructive",
      })
    }
  }

  // Aplicar filtros avançados
  const applyAdvancedFilters = (order: any) => {
    // Filtro de status
    if (advancedFilters.status !== "all" && order.status !== advancedFilters.status) return false

    // Filtro de prioridade
    if (advancedFilters.priority !== "all" && order.priority !== advancedFilters.priority) return false

    // Filtro de fornecedor
    if (advancedFilters.supplier && !order.supplier.toLowerCase().includes(advancedFilters.supplier.toLowerCase()))
      return false

    // Filtro de departamento
    if (advancedFilters.department !== "all" && order.department !== advancedFilters.department) return false

    return true
  }

  // Filtrar pedidos
  const filteredOrders = purchaseOrders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAdvanced = applyAdvancedFilters(order)

    return matchesSearch && matchesAdvanced
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pedidos de Compra</h1>
          <p className="text-gray-500">Gerencie seus pedidos de compra</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por fornecedor ou número..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* Filters and New Order Button */}
            <div className="flex gap-3 flex-shrink-0">
              {/* Advanced Filters */}
              <AdvancedPurchaseOrderFilters currentFilters={advancedFilters} onFiltersChange={setAdvancedFilters} />

              {/* New Order Button */}
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 h-10">
                <Link href="/erp/pedidos-compra/criar">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Pedido
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Orders Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-medium">
              {selectedOrders.length} {selectedOrders.length === 1 ? "pedido selecionado" : "pedidos selecionados"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedOrders([])}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando pedidos...</p>
          </div>
        </div>
      ) : (
        <PurchaseOrderTable
          purchaseOrders={filteredOrders}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedOrders={selectedOrders}
          onSelectOrder={handleSelectOrder}
          onSelectAll={handleSelectAll}
          onDeleteOrder={handleDeleteOrder}
        />
      )}
    </div>
  )
}
