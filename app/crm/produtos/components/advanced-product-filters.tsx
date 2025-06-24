"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { getProductCategories } from "@/lib/mock-data"

export interface ProductFilters {
  situation: string
  stock: string
  category: string
  ncm: string
  brand: string
}

interface AdvancedProductFiltersProps {
  onFiltersChange: (filters: ProductFilters) => void
  currentFilters?: ProductFilters
}

const defaultFilters: ProductFilters = {
  situation: "all",
  stock: "all",
  category: "all",
  ncm: "",
  brand: "",
}

export function AdvancedProductFilters({
  onFiltersChange,
  currentFilters = defaultFilters,
}: AdvancedProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>(currentFilters)
  const categories = getProductCategories()

  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    onFiltersChange(filters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    const clearedFilters: ProductFilters = {
      situation: "all",
      stock: "all",
      category: "all",
      ncm: "",
      brand: "",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFiltersCount = () => {
    if (!filters) return 0

    let count = 0
    if (filters.situation && filters.situation !== "all") count++
    if (filters.stock && filters.stock !== "all") count++
    if (filters.category && filters.category !== "all") count++
    if (filters.ncm && filters.ncm.trim()) count++
    if (filters.brand && filters.brand.trim()) count++
    return count
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2 text-yellow-600" />
          Filtrar Produtos
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
            <SheetTitle>Filtrar Produtos</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Situação */}
          <div className="space-y-2">
            <Label htmlFor="situation" className="text-sm font-medium text-gray-700">
              Situação
            </Label>
            <Select value={filters.situation} onValueChange={(value) => handleFilterChange("situation", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Últimos Incluídos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="recent">Últimos Incluídos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="discontinued">Descontinuados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estoque */}
          <div className="space-y-2">
            <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
              Estoque
            </Label>
            <Select value={filters.stock} onValueChange={(value) => handleFilterChange("stock", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="in-stock">Em Estoque</SelectItem>
                <SelectItem value="low-stock">Estoque Baixo</SelectItem>
                <SelectItem value="out-of-stock">Sem Estoque</SelectItem>
                <SelectItem value="high-stock">Estoque Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Categoria
            </Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* NCM */}
          <div className="space-y-2">
            <Label htmlFor="ncm" className="text-sm font-medium text-gray-700">
              NCM
            </Label>
            <Input
              id="ncm"
              placeholder="Informe o código NCM"
              value={filters.ncm}
              onChange={(e) => handleFilterChange("ncm", e.target.value)}
              className="placeholder:text-gray-400"
            />
          </div>

          {/* Marca */}
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-sm font-medium text-gray-700">
              Marca
            </Label>
            <Input
              id="brand"
              placeholder="Informe a marca"
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
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
