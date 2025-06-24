"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

export interface PurchaseOrderFilters {
  status: string
  priority: string
  supplier: string
  department: string
}

interface AdvancedPurchaseOrderFiltersProps {
  onFiltersChange: (filters: PurchaseOrderFilters) => void
  currentFilters?: PurchaseOrderFilters
}

const defaultFilters: PurchaseOrderFilters = {
  status: "all",
  priority: "all",
  supplier: "",
  department: "all",
}

export function AdvancedPurchaseOrderFilters({
  onFiltersChange,
  currentFilters = defaultFilters,
}: AdvancedPurchaseOrderFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<PurchaseOrderFilters>(currentFilters)

  const handleFilterChange = (key: keyof PurchaseOrderFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: PurchaseOrderFilters = {
      status: "all",
      priority: "all",
      supplier: "",
      department: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    if (!filters) return 0

    let count = 0
    if (filters.status && filters.status !== "all") count++
    if (filters.priority && filters.priority !== "all") count++
    if (filters.supplier && filters.supplier.trim()) count++
    if (filters.department && filters.department !== "all") count++
    return count
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2 text-yellow-600" />
          Filtrar Pedidos
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-yellow-600" />
            <SheetTitle>Filtrar Pedidos</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status
            </Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prioridade */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
              Prioridade
            </Label>
            <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as prioridades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fornecedor */}
          <div className="space-y-2">
            <Label htmlFor="supplier" className="text-sm font-medium text-gray-700">
              Fornecedor
            </Label>
            <Input
              id="supplier"
              placeholder="Nome do fornecedor"
              value={filters.supplier}
              onChange={(e) => handleFilterChange("supplier", e.target.value)}
              className="placeholder:text-gray-400"
            />
          </div>

          {/* Departamento */}
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium text-gray-700">
              Departamento
            </Label>
            <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os departamentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Compras">Compras</SelectItem>
                <SelectItem value="Vendas">Vendas</SelectItem>
                <SelectItem value="Oficina">Oficina</SelectItem>
                <SelectItem value="TI">TI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="border-t pt-4 flex flex-row gap-3">
          <Button variant="outline" onClick={clearFilters} className="flex-1">
            Limpar Filtros
          </Button>
          <Button onClick={applyFilters} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white">
            Aplicar Filtros
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
