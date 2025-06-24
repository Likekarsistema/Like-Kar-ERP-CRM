"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface AdvancedQuoteFiltersProps {
  filters: {
    status: string
    customer: string
    minValue: string
    maxValue: string
    dateFrom: string
    dateTo: string
    category: string
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

export function AdvancedQuoteFilters({ filters, onFiltersChange, onClearFilters }: AdvancedQuoteFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const activeFiltersCount = Object.values(filters).filter((value) => value && value !== "all").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros Avançados</h3>
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} ativo{activeFiltersCount > 1 ? "s" : ""}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
              <SelectItem value="expired">Expirado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="manutencao">Manutenção</SelectItem>
              <SelectItem value="reparo">Reparo</SelectItem>
              <SelectItem value="revisao">Revisão</SelectItem>
              <SelectItem value="instalacao">Instalação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer">Cliente</Label>
          <Input
            id="customer"
            placeholder="Nome do cliente..."
            value={filters.customer}
            onChange={(e) => updateFilter("customer", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Valor</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Valor mín."
              value={filters.minValue}
              onChange={(e) => updateFilter("minValue", e.target.value)}
              type="number"
            />
            <Input
              placeholder="Valor máx."
              value={filters.maxValue}
              onChange={(e) => updateFilter("maxValue", e.target.value)}
              type="number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFrom">Data Inicial</Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => updateFilter("dateFrom", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateTo">Data Final</Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={(e) => updateFilter("dateTo", e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onClearFilters} variant="outline" className="flex-1">
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}
