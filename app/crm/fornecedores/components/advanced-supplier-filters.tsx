"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdvancedSupplierFiltersProps {
  currentFilters: {
    status: string
    city: string
    state: string
  }
  onFiltersChange: (filters: any) => void
}

export function AdvancedSupplierFilters({ currentFilters, onFiltersChange }: AdvancedSupplierFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(currentFilters)

  const handleFilterChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
    setIsOpen(false)
  }

  const resetFilters = () => {
    const defaultFilters = {
      status: "all",
      city: "",
      state: "",
    }
    setLocalFilters(defaultFilters)
    onFiltersChange(defaultFilters)
    setIsOpen(false)
  }

  const hasActiveFilters = currentFilters.status !== "all" || currentFilters.city !== "" || currentFilters.state !== ""

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={hasActiveFilters ? "border-yellow-400 text-yellow-600" : ""}>
          <Filter size={16} className="mr-2" />
          Filtrar Fornecedores
          {hasActiveFilters && (
            <span className="ml-2 bg-yellow-100 text-yellow-600 text-xs py-0.5 px-1.5 rounded-full">
              {Object.values(currentFilters).filter((v) => v && v !== "all").length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium">Filtros Avançados</h4>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={localFilters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              placeholder="Filtrar por cidade"
              value={localFilters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              placeholder="Filtrar por estado"
              value={localFilters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            />
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Limpar
            </Button>
            <Button size="sm" onClick={applyFilters} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
