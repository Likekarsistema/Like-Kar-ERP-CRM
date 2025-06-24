"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

export interface CustomerFilters {
  status: string
  city: string
  state: string
  hasVehicle: string
}

interface AdvancedCustomerFiltersProps {
  onFiltersChange: (filters: CustomerFilters) => void
  currentFilters?: CustomerFilters
}

const defaultFilters: CustomerFilters = {
  status: "all",
  city: "",
  state: "",
  hasVehicle: "all",
}

export function AdvancedCustomerFilters({
  onFiltersChange,
  currentFilters = defaultFilters,
}: AdvancedCustomerFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<CustomerFilters>(currentFilters)

  const handleFilterChange = (key: keyof CustomerFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: CustomerFilters = {
      status: "all",
      city: "",
      state: "",
      hasVehicle: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    if (!filters) return 0

    let count = 0
    if (filters.status && filters.status !== "all") count++
    if (filters.city && filters.city.trim()) count++
    if (filters.state && filters.state.trim()) count++
    if (filters.hasVehicle && filters.hasVehicle !== "all") count++
    return count
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2 text-yellow-600" />
          Filtrar Clientes
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
            <SheetTitle>Filtrar Clientes</SheetTitle>
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
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="devedor">Devedor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cidade */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              Cidade
            </Label>
            <Input
              id="city"
              placeholder="Informe a cidade"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="placeholder:text-gray-400"
            />
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium text-gray-700">
              Estado
            </Label>
            <Input
              id="state"
              placeholder="Informe o estado (UF)"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
              className="placeholder:text-gray-400"
            />
          </div>

          {/* Possui Veículo */}
          <div className="space-y-2">
            <Label htmlFor="hasVehicle" className="text-sm font-medium text-gray-700">
              Veículos
            </Label>
            <Select value={filters.hasVehicle} onValueChange={(value) => handleFilterChange("hasVehicle", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="yes">Com veículos</SelectItem>
                <SelectItem value="no">Sem veículos</SelectItem>
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
