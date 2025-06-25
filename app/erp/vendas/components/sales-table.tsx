"use client"

import { useState } from "react"
import type { Sale } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit, Trash2, Send, Copy, Search, Package } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

interface SalesTableProps {
  sales: Sale[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedSales?: string[]
  onSelectSale?: (saleId: string) => void
  onSelectAll?: () => void
  onDeleteSale?: (saleId: string) => void
}

const statusColors = {
  orcamento: "bg-orange-100 text-orange-800 border-orange-200",
  aprovado: "bg-green-100 text-green-800 border-green-200",
  em_andamento: "bg-blue-100 text-blue-800 border-blue-200",
  concluido: "bg-gray-100 text-gray-800 border-gray-200",
  cancelado: "bg-red-100 text-red-800 border-red-200",
}

const paymentStatusColors = {
  pendente: "bg-orange-100 text-orange-800 border-orange-200",
  parcial: "bg-yellow-100 text-yellow-800 border-yellow-200",
  pago: "bg-green-100 text-green-800 border-green-200",
  atrasado: "bg-red-100 text-red-800 border-red-200",
}

const typeColors = {
  produto: "bg-blue-100 text-blue-800 border-blue-200",
  servico: "bg-purple-100 text-purple-800 border-purple-200",
  ambos: "bg-gray-100 text-gray-800 border-gray-200",
}

export function SalesTable({
  sales,
  searchTerm,
  setSearchTerm,
  selectedSales: initialSelectedSales,
  onSelectSale,
  onSelectAll,
  onDeleteSale,
}: SalesTableProps) {
  const [selectedSales, setSelectedSales] = useState<string[]>(initialSelectedSales || [])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSales(sales.map((sale) => sale.id))
    } else {
      setSelectedSales([])
    }
  }

  const handleSelectSale = (saleId: string, checked: boolean) => {
    if (checked) {
      setSelectedSales([...selectedSales, saleId])
    } else {
      setSelectedSales(selectedSales.filter((id) => id !== saleId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      orcamento: "Orçamento",
      aprovado: "Aprovado",
      em_andamento: "Em Andamento",
      concluido: "Concluído",
      cancelado: "Cancelado",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getPaymentStatusLabel = (status: string) => {
    const labels = {
      pendente: "Pendente",
      parcial: "Parcial",
      pago: "Pago",
      atrasado: "Atrasado",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      produto: "Produto",
      servico: "Serviço",
      ambos: "Produto + Serviço",
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <div className="space-y-4">
      {/* Mobile Search Bar */}
      {setSearchTerm && (
        <div className="md:hidden p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar vendas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Actions Bar */}
      {selectedSales.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <span className="text-sm text-yellow-800">{selectedSales.length} venda(s) selecionada(s)</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
            <Button size="sm" variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Duplicar
            </Button>
            <Button size="sm" variant="outline">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4">
                <Checkbox
                  checked={selectedSales.length === sales.length}
                  onCheckedChange={handleSelectAll}
                  className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                />
              </th>
              <th className="text-left p-4 font-medium text-gray-900">Número</th>
              <th className="text-left p-4 font-medium text-gray-900">Cliente</th>
              <th className="text-left p-4 font-medium text-gray-900">Veículo</th>
              <th className="text-left p-4 font-medium text-gray-900">Tipo</th>
              <th className="text-left p-4 font-medium text-gray-900">Status</th>
              <th className="text-left p-4 font-medium text-gray-900">Pagamento</th>
              <th className="text-left p-4 font-medium text-gray-900">Data</th>
              <th className="text-left p-4 font-medium text-gray-900">Total</th>
              <th className="text-left p-4 font-medium text-gray-900">Vendedor</th>
              <th className="text-left p-4 font-medium text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma venda encontrada</h3>
                <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novas vendas.</p>
              </div>
            )}
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <Checkbox
                    checked={selectedSales.includes(sale.id)}
                    onCheckedChange={(checked) => handleSelectSale(sale.id, checked as boolean)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{sale.number}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{sale.customer.name}</div>
                  <div className="text-sm text-gray-500">{sale.customer.email}</div>
                </td>
                <td className="p-4">
                  {sale.vehicle ? (
                    <div>
                      <div className="font-medium text-gray-900">
                        {sale.vehicle.brand} {sale.vehicle.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {sale.vehicle.year} • {sale.vehicle.plate}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-4">
                  <Badge className={typeColors[sale.type]}>{getTypeLabel(sale.type)}</Badge>
                </td>
                <td className="p-4">
                  <Badge className={statusColors[sale.status]}>{getStatusLabel(sale.status)}</Badge>
                </td>
                <td className="p-4">
                  <Badge className={paymentStatusColors[sale.paymentStatus]}>
                    {getPaymentStatusLabel(sale.paymentStatus)}
                  </Badge>
                </td>
                <td className="p-4 text-gray-900">{formatDate(sale.saleDate)}</td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{formatCurrency(sale.total)}</div>
                  {sale.discount > 0 && (
                    <div className="text-xs text-gray-500">Desc: {formatCurrency(sale.discount)}</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">{sale.salesperson}</div>
                  <div className="text-xs text-gray-500">Com: {formatCurrency(sale.commission)}</div>
                </td>
                <td className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/vendas/${sale.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/vendas/${sale.id}/editar`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {sales.map((sale) => (
          <div key={sale.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedSales.includes(sale.id)}
                  onCheckedChange={(checked) => handleSelectSale(sale.id, checked as boolean)}
                  className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                />
                <div>
                  <div className="font-medium text-gray-900">{sale.number}</div>
                  <div className="text-sm text-gray-500">{formatDate(sale.saleDate)}</div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/erp/vendas/${sale.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/erp/vendas/${sale.id}/editar`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <div>
                <div className="font-medium text-gray-900">{sale.customer.name}</div>
                <div className="text-sm text-gray-500">{sale.customer.email}</div>
              </div>

              {sale.vehicle && (
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {sale.vehicle.brand} {sale.vehicle.model} {sale.vehicle.year}
                  </div>
                  <div className="text-sm text-gray-500">{sale.vehicle.plate}</div>
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={typeColors[sale.type]}>{getTypeLabel(sale.type)}</Badge>
                <Badge className={statusColors[sale.status]}>{getStatusLabel(sale.status)}</Badge>
                <Badge className={paymentStatusColors[sale.paymentStatus]}>
                  {getPaymentStatusLabel(sale.paymentStatus)}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <div className="text-sm text-gray-500">Vendedor</div>
                  <div className="text-sm font-medium text-gray-900">{sale.salesperson}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(sale.total)}</div>
                  <div className="text-xs text-gray-500">Com: {formatCurrency(sale.commission)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
