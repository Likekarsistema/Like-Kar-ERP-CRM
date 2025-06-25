"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Filter,
  Download,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getProductById, getStockMovementsByProduct, addStockMovement } from "@/lib/mock-data"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductStockHistoryPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const [stockMovements, setStockMovements] = useState(getStockMovementsByProduct(productId))

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "entrada" | "saida" | "ajuste">("all")
  const [isAddMovementOpen, setIsAddMovementOpen] = useState(false)

  // Form states
  const [movementType, setMovementType] = useState<"entrada" | "saida" | "ajuste">("entrada")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Produto não encontrado</h3>
          <Link href="/crm/produtos">
            <Button className="mt-4">Voltar para Produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch =
      movement.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.created_by.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || movement.type === filterType

    return matchesSearch && matchesType
  })

  const handleAddMovement = () => {
    if (!quantity || !reason) return

    const newMovement = addStockMovement({
      productId,
      type: movementType,
      quantity:
        movementType === "ajuste" && quantity.startsWith("-")
          ? Number.parseInt(quantity)
          : movementType === "saida"
            ? Math.abs(Number.parseInt(quantity))
            : Math.abs(Number.parseInt(quantity)),
      reason,
      notes: notes || undefined,
      created_by: "Usuário Atual", // Em um app real, viria do contexto de autenticação
    })

    setStockMovements([newMovement, ...stockMovements])

    // Reset form
    setQuantity("")
    setReason("")
    setNotes("")
    setIsAddMovementOpen(false)
  }

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

  const stockValue = product.stock * product.price

  // Calcular estatísticas
  const totalEntradas = filteredMovements.filter((m) => m.type === "entrada").reduce((sum, m) => sum + m.quantity, 0)

  const totalSaidas = filteredMovements.filter((m) => m.type === "saida").reduce((sum, m) => sum + m.quantity, 0)

  const totalAjustes = filteredMovements.filter((m) => m.type === "ajuste").reduce((sum, m) => sum + m.quantity, 0)

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/crm/produtos/${product.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o produto
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Movimentações de Estoque</h1>
          <p className="text-gray-600">{product.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddMovementOpen} onOpenChange={setIsAddMovementOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                <Plus size={16} className="mr-2" />
                Nova Movimentação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Movimentação de Estoque</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de Movimentação</Label>
                  <Select
                    value={movementType}
                    onValueChange={(value: "entrada" | "saida" | "ajuste") => setMovementType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">Entrada</SelectItem>
                      <SelectItem value="saida">Saída</SelectItem>
                      <SelectItem value="ajuste">Ajuste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={movementType === "ajuste" ? "Use - para reduzir" : "Quantidade"}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Motivo</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {movementType === "entrada" && (
                        <>
                          <SelectItem value="Compra">Compra</SelectItem>
                          <SelectItem value="Devolução">Devolução</SelectItem>
                          <SelectItem value="Transferência">Transferência</SelectItem>
                          <SelectItem value="Estoque inicial">Estoque inicial</SelectItem>
                        </>
                      )}
                      {movementType === "saida" && (
                        <>
                          <SelectItem value="Venda">Venda</SelectItem>
                          <SelectItem value="Transferência">Transferência</SelectItem>
                          <SelectItem value="Perda">Perda</SelectItem>
                          <SelectItem value="Uso interno">Uso interno</SelectItem>
                        </>
                      )}
                      {movementType === "ajuste" && (
                        <>
                          <SelectItem value="Inventário">Inventário</SelectItem>
                          <SelectItem value="Correção">Correção</SelectItem>
                          <SelectItem value="Produto danificado">Produto danificado</SelectItem>
                          <SelectItem value="Acerto de sistema">Acerto de sistema</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Informações adicionais..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddMovementOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddMovement} className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  Adicionar Movimentação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{product.stock} UN</h3>
                <p className="text-sm text-gray-500">Estoque Atual</p>
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
                <h3 className="font-semibold text-gray-900">{totalEntradas} UN</h3>
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
                <h3 className="font-semibold text-gray-900">{totalSaidas} UN</h3>
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
                <h3 className="font-semibold text-gray-900">{totalAjustes} UN</h3>
                <p className="text-sm text-gray-500">Total Ajustes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar por motivo, observações ou usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filterType}
              onValueChange={(value: "all" | "entrada" | "saida" | "ajuste") => setFilterType(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
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
            <Button variant="outline" className="sm:w-auto">
              <Calendar size={20} className="mr-2" />
              Filtrar por data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{product.name}</span>
            <div className="text-right">
              <p className="text-sm text-gray-500">Valor do estoque</p>
              <p className="text-lg font-bold text-green-600">
                R$ {stockValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Código:</span>
              <p className="font-medium">{product.barcode}</p>
            </div>
            <div>
              <span className="text-gray-500">Categoria:</span>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <span className="text-gray-500">Estoque mínimo:</span>
              <p className="font-medium">{product.minStock} UN</p>
            </div>
            <div>
              <span className="text-gray-500">Preço unitário:</span>
              <p className="font-medium">R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            </div>
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
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Observações</TableHead>
                      <TableHead>Usuário</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.map((movement) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {filteredMovements.map((movement) => (
                  <div key={movement.id} className="bg-white border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.type)}
                        {getMovementBadge(movement.type)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(movement.created_at).toLocaleDateString("pt-BR")} às{" "}
                        {new Date(movement.created_at).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div>
                      <p className="font-medium">{movement.reason}</p>
                      {movement.notes && <p className="text-sm text-gray-500">{movement.notes}</p>}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Por: {movement.created_by}</span>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <TrendingUp className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma movimentação encontrada</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterType !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Não há histórico de movimentação para este produto"}
              </p>
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={() => setIsAddMovementOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                Fazer Primeira Movimentação
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
