"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Package,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Calendar,
  ArrowLeft,
  FileText,
  Trash2,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getAllProducts, getAllStockMovements, addStockMovement, type Product } from "@/lib/mock-data"
import { useSearchParams } from "next/navigation"

export default function MovimentacoesPage() {
  const searchParams = useSearchParams()
  const productIdParam = searchParams.get("produto")

  const [products] = useState(getAllProducts())
  const [stockMovements, setStockMovements] = useState(getAllStockMovements())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isAddMovementOpen, setIsAddMovementOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  // Form states
  const [movementType, setMovementType] = useState<"entrada" | "saida" | "ajuste">("entrada")
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [costPrice, setCostPrice] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Carregar produto da URL se existir
  useEffect(() => {
    if (productIdParam) {
      const product = products.find((p) => p.id === productIdParam)
      if (product) {
        setSelectedProduct(product)
        setSearchTerm(product.name)
      }
    }
  }, [productIdParam, products])

  // Filtrar produtos baseado na pesquisa
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProducts(filtered.slice(0, 10)) // Limitar a 10 resultados
    } else {
      setFilteredProducts([])
    }
  }, [searchTerm, products])

  // Obter movimentações do produto selecionado
  const productMovements = selectedProduct
    ? stockMovements
        .filter((movement) => movement.product_id === selectedProduct.id)
        .filter((movement) => {
          if (!selectedDate) return true
          const movementDate = new Date(movement.created_at).toISOString().split("T")[0]
          return movementDate === selectedDate
        })
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    : []

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setSearchTerm(product.name)
    setFilteredProducts([])
    // Pré-preencher os preços
    setSalePrice(product.sale_price.toString())
    setCostPrice(product.cost_price?.toString() || "0")
  }

  const handleAddMovement = async () => {
    if (!selectedProduct || !quantity || !reason) {
      setFeedback({ type: "error", message: "Preencha todos os campos obrigatórios" })
      return
    }

    setIsLoading(true)
    try {
      addStockMovement({
        productId: selectedProduct.id,
        type: movementType,
        quantity:
          movementType === "ajuste" && quantity.startsWith("-")
            ? Number.parseInt(quantity)
            : movementType === "saida"
              ? Math.abs(Number.parseInt(quantity))
              : Math.abs(Number.parseInt(quantity)),
        reason,
        notes: notes || undefined,
        created_by: "Leya raphaella",
      })

      setStockMovements(getAllStockMovements())
      setFeedback({ type: "success", message: "Movimentação adicionada com sucesso!" })

      // Reset form
      setQuantity("")
      setReason("")
      setNotes("")
      setSalePrice("")
      setCostPrice("")
      setIsAddMovementOpen(false)
    } catch (error) {
      setFeedback({ type: "error", message: "Erro ao adicionar movimentação" })
      console.error("Erro ao adicionar movimentação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMovement = (movementId: string) => {
    if (confirm("Tem certeza que deseja excluir esta movimentação?")) {
      // Aqui você implementaria a exclusão real
      setFeedback({ type: "success", message: "Movimentação excluída com sucesso!" })
    }
  }

  // Calcular valor total do estoque
  const stockValue = selectedProduct ? selectedProduct.current_stock * selectedProduct.sale_price : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Feedback Toast */}
        {feedback && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              feedback.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {feedback.message}
            <button onClick={() => setFeedback(null)} className="ml-2 text-white hover:text-gray-200">
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedProduct(null)
                setSearchTerm("")
                setSelectedDate("")
              }}
              className="p-2 hover:bg-gray-100 text-gray-900 text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Voltar para o produto</span>
              <span className="sm:hidden">Voltar</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Lançamento de estoque</h1>
          <Dialog open={isAddMovementOpen} onOpenChange={setIsAddMovementOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow-sm w-full sm:w-auto"
                disabled={!selectedProduct}
                size="sm"
              >
                <Plus size={16} className="mr-2" />
                Novo Lançamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] mx-4">
              <DialogHeader>
                <DialogTitle className="text-lg">Nova Movimentação - {selectedProduct?.name}</DialogTitle>
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
                      <SelectItem value="entrada">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          Entrada
                        </div>
                      </SelectItem>
                      <SelectItem value="saida">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          Saída
                        </div>
                      </SelectItem>
                      <SelectItem value="ajuste">
                        <div className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4 text-blue-500" />
                          Ajuste
                        </div>
                      </SelectItem>
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
                  <Input
                    id="reason"
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Digite o motivo da movimentação"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="salePrice">Preço de Venda</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="0,00"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="costPrice">Preço de Custo</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      step="0.01"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      placeholder="0,00"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Informações adicionais sobre a movimentação..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddMovementOpen(false)} className="w-full sm:w-auto">
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddMovement}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Adicionando..." : "Adicionar Movimentação"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Barra de Pesquisa */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Digite o nome ou código do produto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-400 focus:ring-blue-400/20"
                />

                {/* Dropdown de resultados */}
                {filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSelectProduct(product)}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500 truncate">
                              SKU: {product.sku} | Estoque: {product.current_stock}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10 w-full sm:w-[180px] text-sm"
                    placeholder="Selecionar data"
                  />
                </div>
                {selectedDate && (
                  <Button variant="outline" onClick={() => setSelectedDate("")} size="sm" className="flex-shrink-0">
                    Limpar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estado Inicial - Nenhum produto selecionado */}
        {!selectedProduct && (
          <Card className="shadow-sm">
            <CardContent className="py-12 sm:py-16">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Pesquise um produto para começar</h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Digite o nome ou código do produto na barra de pesquisa acima
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Produto Selecionado - Cards de Resumo */}
        {selectedProduct && (
          <div className="space-y-4 sm:space-y-6">
            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Resumo do Estoque */}
              <Card className="shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <span className="text-xl sm:text-2xl font-bold text-yellow-800">
                        {selectedProduct.current_stock}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-gray-600 text-xs sm:text-sm font-medium">Resumo do Estoque</h3>
                      <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                        {selectedProduct.current_stock} {selectedProduct.unit_of_measure} em estoque
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Estoque mínimo: {selectedProduct.min_stock} {selectedProduct.unit_of_measure}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Valor do Estoque */}
              <Card className="shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <span className="text-lg font-bold text-green-800">R$</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-gray-600 text-xs sm:text-sm font-medium">Valor do Estoque</h3>
                      <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                        R$ {stockValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {selectedProduct.current_stock} x R$ {selectedProduct.sale_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Informações do Produto e Tabela */}
            <Card className="shadow-sm">
              <CardContent className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 uppercase truncate">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">Código: {selectedProduct.sku}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-500">Mais recentes primeiro</span>
                    <Button variant="ghost" size="sm">
                      <TrendingDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tabela Desktop */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Data</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Entrada</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Saída</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">Preço de Venda</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600 flex items-center gap-1">
                          Preço de Custo
                          <HelpCircle className="h-3 w-3" />
                        </th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Observação</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Origem</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productMovements.length > 0 ? (
                        productMovements.map((movement) => (
                          <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-2 text-sm">
                              <div>
                                <div className="font-medium">
                                  {new Date(movement.created_at).toLocaleDateString("pt-BR")}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {new Date(movement.created_at).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center text-sm">
                              {movement.type === "entrada" ? movement.quantity : "-"}
                            </td>
                            <td className="py-3 px-2 text-center text-sm">
                              {movement.type === "saida" ? movement.quantity : "-"}
                            </td>
                            <td className="py-3 px-2 text-center text-sm">
                              R$ {selectedProduct.sale_price.toFixed(2)}
                            </td>
                            <td className="py-3 px-2 text-center text-sm">
                              R$ {selectedProduct.cost_price?.toFixed(2) || "0,00"}
                            </td>
                            <td className="py-3 px-2 text-sm">
                              <span className="text-gray-900 hover:underline cursor-pointer">{movement.reason}</span>
                            </td>
                            <td className="py-3 px-2 text-sm text-gray-900">{movement.created_by}</td>
                            <td className="py-3 px-2 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => handleDeleteMovement(movement.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-12 text-center">
                            <div className="text-gray-400 mb-4">
                              <FileText className="mx-auto h-12 w-12" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma movimentação encontrada</h3>
                            <p className="text-gray-500 mb-4">
                              {selectedDate
                                ? "Não há movimentações para a data selecionada"
                                : "Este produto ainda não possui movimentações registradas"}
                            </p>
                            <Button
                              className="bg-yellow-400 hover:bg-yellow-500 text-black"
                              onClick={() => setIsAddMovementOpen(true)}
                            >
                              <Plus size={16} className="mr-2" />
                              Criar Primeira Movimentação
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Cards Mobile */}
                <div className="lg:hidden space-y-3">
                  {productMovements.length > 0 ? (
                    productMovements.map((movement) => (
                      <Card key={movement.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {movement.type === "entrada" && <TrendingUp className="h-4 w-4 text-green-500" />}
                              {movement.type === "saida" && <TrendingDown className="h-4 w-4 text-red-500" />}
                              {movement.type === "ajuste" && <RotateCcw className="h-4 w-4 text-blue-500" />}
                              <span className="font-medium text-sm capitalize">{movement.type}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-red-500 p-1"
                              onClick={() => handleDeleteMovement(movement.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Data:</span>
                              <span className="font-medium">
                                {new Date(movement.created_at).toLocaleDateString("pt-BR")} às{" "}
                                {new Date(movement.created_at).toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-600">Quantidade:</span>
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

                            <div className="flex justify-between">
                              <span className="text-gray-600">Observação:</span>
                              <span className="text-gray-900 text-right flex-1 ml-2">{movement.reason}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-600">Origem:</span>
                              <span className="text-gray-900">{movement.created_by}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <div className="text-gray-400 mb-4">
                        <FileText className="mx-auto h-12 w-12" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma movimentação encontrada</h3>
                      <p className="text-gray-500 mb-4 text-sm">
                        {selectedDate
                          ? "Não há movimentações para a data selecionada"
                          : "Este produto ainda não possui movimentações registradas"}
                      </p>
                      <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black w-full sm:w-auto"
                        onClick={() => setIsAddMovementOpen(true)}
                      >
                        <Plus size={16} className="mr-2" />
                        Criar Primeira Movimentação
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
