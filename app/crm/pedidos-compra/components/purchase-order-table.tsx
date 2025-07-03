"use client"
import { MoreHorizontal, Edit, Trash2, Eye, Package, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { PurchaseOrder } from "@/lib/mock-data"

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedOrders?: string[]
  onSelectOrder?: (orderId: string) => void
  onSelectAll?: () => void
  onDeleteOrder?: (orderId: string) => void
}

export function PurchaseOrderTable({
  purchaseOrders,
  searchTerm = "",
  setSearchTerm,
  selectedOrders = [],
  onSelectOrder,
  onSelectAll,
  onDeleteOrder,
}: PurchaseOrderTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: "bg-orange-100 text-orange-800 border-orange-200",
      aprovado: "bg-blue-100 text-blue-800 border-blue-200",
      concluido: "bg-green-100 text-green-800 border-green-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
    }

    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente}>
        {status === "concluido" ? "Concluído" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const isAllSelected = selectedOrders.length === purchaseOrders.length && purchaseOrders.length > 0

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                {onSelectAll && (
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={onSelectAll}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                )}
              </TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>N° Pedido</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell>
                  {onSelectOrder && (
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => onSelectOrder(order.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Link href={`/crm/pedidos-compra/${order.id}`} className="font-medium text-gray-900 cursor-pointer">
                      {order.supplier}
                    </Link>
                    <div className="text-sm text-gray-500">{order.department}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/crm/pedidos-compra/${order.id}`} className="text-blue-600 hover:text-blue-800">
                    {order.number}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{order.supplier}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{formatDate(order.orderDate)}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{formatCurrency(order.total)}</span>
                </TableCell>
                <TableCell>{getStatusBadge("concluido")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/pedidos-compra/${order.id}`}>
                          <Eye size={16} className="mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/pedidos-compra/${order.id}/editar`}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      {onDeleteOrder && (
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDeleteOrder(order.id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Search Bar */}
      {setSearchTerm && (
        <div className="md:hidden p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {purchaseOrders.map((order) => (
          <div key={order.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {onSelectOrder && (
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => onSelectOrder(order.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                  />
                )}
                <div className="flex-1">
                  <Link href={`/crm/pedidos-compra/${order.id}`} className="font-medium text-gray-900 cursor-pointer">
                    <h3>{order.supplier}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">{order.department}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/pedidos-compra/${order.id}`}>
                      <Eye size={16} className="mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/pedidos-compra/${order.id}/editar`}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  {onDeleteOrder && (
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => onDeleteOrder(order.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">N°: {order.number}</span>
              {getStatusBadge("concluido")}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Data:</span>
                <div className="font-medium">{formatDate(order.orderDate)}</div>
              </div>
              <div>
                <span className="text-gray-500">Valor:</span>
                <div className="font-medium">{formatCurrency(order.total)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {purchaseOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum pedido encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novos pedidos.</p>
        </div>
      )}
    </div>
  )
}
