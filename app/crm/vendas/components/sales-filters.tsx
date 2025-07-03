"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, X } from "lucide-react"

export function SalesFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    paymentStatus: "all",
    type: "all",
    salesperson: "",
    paymentMethod: "all",
  })

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      paymentStatus: "all",
      type: "all",
      salesperson: "",
      paymentMethod: "all",
    })
  }

  const activeFiltersCount = Object.values(filters).filter((value) => value !== "").length

  return (
    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por número, cliente..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Quick Filters - Desktop */}
      <div className="hidden lg:flex items-center gap-2">
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
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

        <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="produto">Produto</SelectItem>
            <SelectItem value="servico">Serviço</SelectItem>
            <SelectItem value="ambos">Ambos</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.paymentStatus}
          onValueChange={(value) => setFilters({ ...filters, paymentStatus: value })}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Pagamento" />
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

      {/* Mobile Filter Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden relative">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>Filtre as vendas por diferentes critérios</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
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

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="servico">Serviço</SelectItem>
                  <SelectItem value="ambos">Produto + Serviço</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Status Pagamento</Label>
              <Select
                value={filters.paymentStatus}
                onValueChange={(value) => setFilters({ ...filters, paymentStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
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

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Forma Pagamento</Label>
              <Select
                value={filters.paymentMethod}
                onValueChange={(value) => setFilters({ ...filters, paymentMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="cartao_credito">Cartão Crédito</SelectItem>
                  <SelectItem value="cartao_debito">Cartão Débito</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="financiamento">Financiamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salesperson">Vendedor</Label>
              <Input
                id="salesperson"
                placeholder="Nome do vendedor"
                value={filters.salesperson}
                onChange={(e) => setFilters({ ...filters, salesperson: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <Button onClick={handleClearFilters} variant="outline" className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
              <Button onClick={() => setIsOpen(false)} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
                Aplicar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Clear Filters - Desktop */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={handleClearFilters} className="hidden lg:flex">
          <X className="h-4 w-4 mr-2" />
          Limpar ({activeFiltersCount})
        </Button>
      )}
    </div>
  )
}
