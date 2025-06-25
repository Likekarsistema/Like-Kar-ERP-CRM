"use client"

import { useState } from "react"
import { Search, Filter, Download, Plus, TrendingUp, TrendingDown, RotateCcw, Package, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllStockMovements, getAllProducts } from "@/lib/mock-data"
import Link from "next/link"

export default function StockMovementsPage() {
  const [stockMovements] = useState(getAllStockMovements())
  const [products] = useState(getAllProducts())
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "entrada" | "saida" | "ajuste">("all")
  const [filterProduct, setFilterProduct] = useState<string>("all")

  const filteredMovements = stockMovements.filter((movement) => {
    const product = products.find((p) => p.id === movement.productId)
    const productName = product?.name || ""

    const matchesSearch =
      movement.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.created_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || movement.type === filterType
    const matchesProduct = filterProduct === "all" || movement.productId === filterProduct

    return matchesSearch && matchesType && matchesProduct
  })

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "saida":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "ajuste":
        return <RotateCcw className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getMovementBadge = (type: string) => {
    switch (type) {
      case "entrada":
        return <Badge className="bg-green-100 text-green-800">Entrada</Badge>
      case "saida":
        return <Badge className="bg-red-100 text-red-800">Saída</Badge>
      case "ajuste":
        return <Badge className="bg-blue-100 text-blue-800">Ajuste</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  // Calcular estatísticas
  const totalEntradas = filteredMovements.filter((m) => m.type === "entrada").reduce((sum, m) => sum + m.quantity, 0)

  const totalSaidas = filteredMovements.filter((m) => m.type === "saida").reduce((sum, m) => sum + m.quantity, 0)

  const totalAjustes = filteredMovements.filter((m) => m.type === "ajuste").reduce((sum, m) => sum + m.quantity, 0)

  const totalMovements = filteredMovements.length

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movimentações de Estoque</h1>
          <p className="text-gray-600">Controle e histórico de todas as movimentações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Link href="/erp/produtos">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Plus size={16} className="mr-2" />
              Gerenciar Produtos
            </Button>
          </Link>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{totalMovements}</h3>
                <p className="text-sm text-gray-500">Total Movimentações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{totalEntradas}</h3>
                <p className="text-sm text-gray-500">Total Entradas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{totalSaidas}</h3>
                <p className="text-sm text-gray-500">Total Saídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <RotateCcw className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{totalAjustes}</h3>
                <p className="text-sm text-gray-500">Total Ajustes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar por produto, motivo, observações ou usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filterType}
              onValueChange={(value: "all" | "entrada" | "saida" | "ajuste") => setFilterType(value)}
            >
              <SelectTrigger className="w-full lg:w-[180px]">
                <Filter size={16} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="entrada">Entradas</SelectItem>
                <SelectItem value="saida">Saídas</SelectItem>
                <SelectItem value="ajuste">Ajustes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <Package size={16} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os produtos</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="lg:w-auto">
              <Calendar size={20} className="mr-2" />
              Filtrar por data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stock Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Movimentações ({filteredMovements.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredMovements.length > 0 ? (
            <div className="w-full">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Observações</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.map((movement) => {
                      const product = products.find((p) => p.id === movement.productId)
                      return (
                        <TableRow key={movement.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {new Date(movement.created_at).toLocaleDateString("pt-BR")}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(movement.created_at).toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product?.name}</div>
                              <div className="text-sm text-gray-500">{product?.barcode}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getMovementIcon(movement.type)}
                              {getMovementBadge(movement.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                movement.type === "entrada"
                                  ? "text-green-600"
                                  : movement.type === "saida"
                                    ? "text-red-600"
                                    : "text-blue-600"
                              }`}
                            >
                              {movement.type === "entrada" ? "+" : movement.type === "saida" ? "-" : ""}
                              {movement.quantity}
                            </span>
                          </TableCell>
                          <TableCell>{movement.reason}</TableCell>
                          <TableCell>{movement.notes || "-"}</TableCell>
                          <TableCell>{movement.created_by}</TableCell>
                          <TableCell>
                            <Link href={`/erp/produtos/${movement.productId}/estoque`}>
                              <Button variant="outline" size="sm">
                                Ver Produto
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4 p-4">
                {filteredMovements.map((movement) => {
                  const product = products.find((p) => p.id === movement.productId)
                  return (
                    <div key={movement.id} className="bg-white border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getMovementIcon(movement.type)}
                          {getMovementBadge(movement.type)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(movement.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium">{product?.name}</p>
                        <p className="text-sm text-gray-500">{product?.barcode}</p>
                      </div>

                      <div>
                        <p className="font-medium">{movement.reason}</p>
                        {movement.notes && <p className="text-sm text-gray-500">{movement.notes}</p>}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Por: {movement.created_by}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              movement.type === "entrada"
                                ? "text-green-600"
                                : movement.type === "saida"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }`}
                          >
                            {movement.type === "entrada" ? "+" : movement.type === "saida" ? "-" : ""}
                            {movement.quantity}
                          </span>
                          <Link href={`/erp/produtos/${movement.productId}/estoque`}>
                            <Button variant="outline" size="sm">
                              Ver
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Package className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma movimentação encontrada</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterType !== "all" || filterProduct !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Não há movimentações de estoque registradas"}
              </p>
              <Link href="/erp/produtos">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  <Plus size={16} className="mr-2" />
                  Gerenciar Produtos
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
