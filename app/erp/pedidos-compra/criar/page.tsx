"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Search, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createPurchaseOrder, getNextPurchaseOrderNumber, getMockSuppliers, getAllProducts } from "@/lib/mock-data"
import Link from "next/link"

interface Supplier {
  id: string
  name: string
  email?: string
  phone?: string
  contact_person?: string
  is_active: boolean
}

interface Product {
  id: string
  name: string
  sku: string
  sale_price: number
  current_stock: number
  unit_of_measure: string
}

interface PurchaseOrderItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  total: number
}

export default function CreatePurchaseOrderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

  // Dados do pedido
  const [orderData, setOrderData] = useState({
    priority: "media" as "baixa" | "media" | "alta" | "urgente",
    expectedDate: "",
    department: "Compras",
    notes: "",
  })

  // Itens do pedido
  const [items, setItems] = useState<PurchaseOrderItem[]>([])

  // Estados para mostrar/ocultar seções
  const [showSuppliers, setShowSuppliers] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [supplierSearch, setSupplierSearch] = useState("")
  const [productSearch, setProductSearch] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const suppliersData = getMockSuppliers()
      const productsData = getAllProducts()

      console.log("Fornecedores:", suppliersData)
      console.log("Produtos:", productsData)

      setSuppliers(suppliersData)
      setProducts(productsData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setOrderData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setShowSuppliers(false)
  }

  const handleProductSelect = (product: Product) => {
    // Verificar se o produto já foi adicionado
    const existingItem = items.find((item) => item.productId === product.id)
    if (existingItem) {
      toast({
        title: "Aviso",
        description: "Este produto já foi adicionado ao pedido",
        variant: "destructive",
      })
      return
    }

    const newItem: PurchaseOrderItem = {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      quantity: 1,
      unitPrice: product.sale_price,
      total: product.sale_price,
    }

    setItems([...items, newItem])
    setShowProducts(false)
    setProductSearch("")
  }

  const handleItemChange = (index: number, field: keyof PurchaseOrderItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }

    // Recalcular total do item
    if (field === "quantity" || field === "unitPrice") {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice
    }

    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validações básicas
      if (!selectedSupplier) {
        throw new Error("Selecione um fornecedor")
      }

      if (!orderData.expectedDate) {
        throw new Error("Data de entrega esperada é obrigatória")
      }

      if (items.length === 0) {
        throw new Error("Adicione pelo menos um produto ao pedido")
      }

      if (items.some((item) => item.quantity <= 0 || item.unitPrice <= 0)) {
        throw new Error("Todos os itens devem ter quantidade e preço válidos")
      }

      // Criar pedido
      const newOrder = createPurchaseOrder({
        supplier: selectedSupplier.name,
        supplierEmail: selectedSupplier.email || "",
        supplierPhone: selectedSupplier.phone || "",
        status: "pendente",
        priority: orderData.priority,
        expectedDate: orderData.expectedDate,
        total: calculateTotal(),
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
        })),
        notes: orderData.notes,
        createdBy: "Usuário Atual",
        department: orderData.department,
      })

      toast({
        title: "Sucesso",
        description: `Pedido ${newOrder.number} criado com sucesso`,
      })

      router.push("/erp/pedidos-compra")
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao criar pedido",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.is_active &&
      (supplier.name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
        (supplier.contact_person && supplier.contact_person.toLowerCase().includes(supplierSearch.toLowerCase()))),
  )

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.sku.toLowerCase().includes(productSearch.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/erp/pedidos-compra">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Novo Pedido de Compra</h1>
          <p className="text-gray-500">Número: {getNextPurchaseOrderNumber()}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seleção do Fornecedor */}
        <Card>
          <CardHeader>
            <CardTitle>Fornecedor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSupplier ? (
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                <div>
                  <h3 className="font-medium">{selectedSupplier.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedSupplier.contact_person && `${selectedSupplier.contact_person} • `}
                    {selectedSupplier.phone || "Telefone não informado"}
                  </p>
                  <p className="text-sm text-gray-500">{selectedSupplier.email || "Email não informado"}</p>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedSupplier(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowSuppliers(!showSuppliers)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Selecionar Fornecedor
                </Button>

                {showSuppliers && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar fornecedor..."
                        value={supplierSearch}
                        onChange={(e) => setSupplierSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredSuppliers.map((supplier) => (
                        <div
                          key={supplier.id}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSupplierSelect(supplier)}
                        >
                          <h4 className="font-medium">{supplier.name}</h4>
                          <p className="text-sm text-gray-500">
                            {supplier.contact_person && `${supplier.contact_person} • `}
                            {supplier.phone || "Telefone não informado"}
                          </p>
                          <p className="text-sm text-gray-500">{supplier.email || "Email não informado"}</p>
                        </div>
                      ))}
                      {filteredSuppliers.length === 0 && (
                        <p className="text-center text-gray-500 py-4">Nenhum fornecedor encontrado</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detalhes do Pedido */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={orderData.priority} onValueChange={(value: any) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expectedDate">Data de Entrega Esperada *</Label>
                <Input
                  id="expectedDate"
                  type="date"
                  value={orderData.expectedDate}
                  onChange={(e) => handleInputChange("expectedDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Departamento</Label>
                <Select value={orderData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compras">Compras</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="Oficina">Oficina</SelectItem>
                    <SelectItem value="TI">TI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={orderData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Observações sobre o pedido..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Produtos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Produtos</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowProducts(!showProducts)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showProducts && (
              <div className="border rounded-lg p-4 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar produto por nome ou SKU..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white border-b">
                      <tr>
                        <th className="text-left p-2">Produto</th>
                        <th className="text-left p-2">SKU</th>
                        <th className="text-left p-2">Preço</th>
                        <th className="text-left p-2">Estoque</th>
                        <th className="text-left p-2">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <p className="font-medium">{product.name}</p>
                          </td>
                          <td className="p-2 text-blue-600">{product.sku}</td>
                          <td className="p-2">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(product.sale_price)}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                product.current_stock > 10
                                  ? "bg-green-100 text-green-800"
                                  : product.current_stock > 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.current_stock} {product.unit_of_measure}
                            </span>
                          </td>
                          <td className="p-2">
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleProductSelect(product)}
                              disabled={items.some((item) => item.productId === product.id)}
                            >
                              {items.some((item) => item.productId === product.id) ? "Adicionado" : "Adicionar"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Nenhum produto encontrado</p>
                  )}
                </div>
              </div>
            )}

            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum produto adicionado</p>
                <p className="text-sm">Clique em "Adicionar Produto" para começar</p>
              </div>
            ) : (
              <>
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                    <div className="md:col-span-2">
                      <Label>Produto</Label>
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">{item.sku}</p>
                      </div>
                    </div>
                    <div>
                      <Label>Quantidade *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 1)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Preço Unitário *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div>
                      <Label>Total</Label>
                      <Input
                        value={new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.total)}
                        disabled
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Total Geral */}
                <div className="flex justify-end">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-lg font-bold">
                      Total Geral:{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(calculateTotal())}
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/erp/pedidos-compra">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            {loading ? "Criando..." : "Criar Pedido"}
          </Button>
        </div>
      </form>
    </div>
  )
}
