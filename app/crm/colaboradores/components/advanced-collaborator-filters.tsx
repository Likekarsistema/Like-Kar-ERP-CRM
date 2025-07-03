"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

export interface CollaboratorFilters {
  status: string
  role: string
  lastAccess: string
}

interface AdvancedCollaboratorFiltersProps {
  onFiltersChange: (filters: CollaboratorFilters) => void
  currentFilters?: CollaboratorFilters
}

const defaultFilters: CollaboratorFilters = {
  status: "all",
  role: "all",
  lastAccess: "all",
}

export function AdvancedCollaboratorFilters({
  onFiltersChange,
  currentFilters = defaultFilters,
}: AdvancedCollaboratorFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<CollaboratorFilters>(currentFilters)

  const handleFilterChange = (key: keyof CollaboratorFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: CollaboratorFilters = {
      status: "all",
      role: "all",
      lastAccess: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    if (!filters) return 0

    let count = 0
    if (filters.status && filters.status !== "all") count++
    if (filters.role && filters.role !== "all") count++
    if (filters.lastAccess && filters.lastAccess !== "all") count++
    return count
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2 text-yellow-600" />
          Filtrar Colaboradores
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
            <SheetTitle>Filtrar Colaboradores</SheetTitle>
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
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cargo */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              Cargo
            </Label>
            <Select value={filters.role} onValueChange={(value) => handleFilterChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Gerente">Gerente</SelectItem>
                <SelectItem value="Funcionário">Funcionário</SelectItem>
                <SelectItem value="Atendente">Atendente</SelectItem>
                <SelectItem value="Técnico">Técnico</SelectItem>
                <SelectItem value="Vendedor">Vendedor</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Último Acesso */}
          <div className="space-y-2">
            <Label htmlFor="lastAccess" className="text-sm font-medium text-gray-700">
              Último Acesso
            </Label>
            <Select value={filters.lastAccess} onValueChange={(value) => handleFilterChange("lastAccess", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="recent">Últimos 7 dias</SelectItem>
                <SelectItem value="old">Mais de 30 dias</SelectItem>
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
