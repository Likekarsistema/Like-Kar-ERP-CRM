"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

export interface SalesFilters {
  status: string
  paymentStatus: string
  type: string
  salesperson: string
  paymentMethod: string
  dateRange: string
}

interface AdvancedSalesFiltersProps {
  onFiltersChange: (filters: SalesFilters) => void
  currentFilters?: SalesFilters
}

const defaultFilters: SalesFilters = {
  status: "all",
  paymentStatus: "all",
  type: "all",
  salesperson: "",
  paymentMethod: "all",
  dateRange: "all",
}

export function AdvancedSalesFilters({ onFiltersChange, currentFilters = defaultFilters }: AdvancedSalesFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<SalesFilters>(currentFilters)

  const handleFilterChange = (key: keyof SalesFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: SalesFilters = {
      status: "all",
      paymentStatus: "all",
      type: "all",
      salesperson: "",
      paymentMethod: "all",
      dateRange: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    if (!filters) return 0

    let count = 0
    if (filters.status && filters.status !== "all") count++
    if (filters.paymentStatus && filters.paymentStatus !== "all") count++
    if (filters.type && filters.type !== "all") count++
    if (filters.salesperson && filters.salesperson.trim()) count++
    if (filters.paymentMethod && filters.paymentMethod !== "all") count++
    if (filters.dateRange && filters.dateRange !== "all") count++
    return count
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2 text-yellow-600" />
          Filtrar Vendas
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
            <SheetTitle>Filtrar Vendas</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status da Venda
            </Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="orcamento">Orçamento</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status de Pagamento */}
          <div className="space-y-2">
            <Label htmlFor="paymentStatus" className="text-sm font-medium text-gray-700">
              Status do Pagamento
            </Label>
            <Select value={filters.paymentStatus} onValueChange={(value) => handleFilterChange("paymentStatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="parcial">Parcial</SelectItem>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">
              Tipo de Venda
            </Label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="produto">Produto</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
                <SelectItem value="ambos">Produto + Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Método de Pagamento */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-sm font-medium text-gray-700">
              Método de Pagamento
            </Label>
            <Select value={filters.paymentMethod} onValueChange={(value) => handleFilterChange("paymentMethod", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os métodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="financiamento">Financiamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Período */}
          <div className="space-y-2">
            <Label htmlFor="dateRange" className="text-sm font-medium text-gray-700">
              Período
            </Label>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os períodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última Semana</SelectItem>
                <SelectItem value="month">Último Mês</SelectItem>
                <SelectItem value="quarter">Último Trimestre</SelectItem>
                <SelectItem value="year">Último Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendedor */}
          <div className="space-y-2">
            <Label htmlFor="salesperson" className="text-sm font-medium text-gray-700">
              Vendedor
            </Label>
            <Input
              id="salesperson"
              placeholder="Nome do vendedor"
              value={filters.salesperson}
              onChange={(e) => handleFilterChange("salesperson", e.target.value)}
              className="placeholder:text-gray-400"
            />
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
