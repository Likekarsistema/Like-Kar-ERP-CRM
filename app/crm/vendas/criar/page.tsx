"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getMockCustomers, getAllProducts, createSaleMock } from "@/lib/mock-data"

interface SaleItem {
  id: string
  description: string
  code: string
  unit: string
  quantity: number
  listPrice: number
  discount: number
  unitPrice: number
  totalPrice: number
}

export default function CreateSalePage() {
  const router = useRouter()
  const { toast } = useToast()

  // Estados do formulário
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [vendor, setVendor] = useState("")
  const [store, setStore] = useState("Nenhuma")
  const [businessUnit, setBusinessUnit] = useState("Nenhuma unidade de negócio")
  const [priceList, setPriceList] = useState("Selecione uma lista")
  const [items, setItems] = useState<SaleItem[]>([])
  const [activeTab, setActiveTab] = useState("items")
  const [saleNumber, setSaleNumber] = useState("01")
  const [saleDate, setSaleDate] = useState("20/06/2025")
  const [exitDate, setExitDate] = useState("20/06/2025")
  const [expectedDate, setExpectedDate] = useState("")
  const [purchaseOrder, setPurchaseOrder] = useState("")
  const [loading, setLoading] = useState(false)

  // Estados para campos editáveis
  const [generalDiscount, setGeneralDiscount] = useState(0)
  const [deliveryDeadline, setDeliveryDeadline] = useState(0)
  const [otherExpenses, setOtherExpenses] = useState(0)
  const [totalSaleDiscount, setTotalSaleDiscount] = useState(0)

  // Estados para controle da busca de cliente
  const [customerSearch, setCustomerSearch] = useState("")
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)

  // Filtrar clientes baseado na busca
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.phone?.includes(customerSearch) ||
      customer.document?.includes(customerSearch),
  )

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        const customersData = getMockCustomers()
        const productsData = getAllProducts()
        setCustomers(customersData)
        setProducts(productsData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".relative")) {
        setShowCustomerDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Calcular totais
  const totalItems = items.length
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalDiscount = items.reduce((sum, item) => sum + (item.listPrice * item.quantity * item.discount) / 100, 0)
  const totalCommissions = 0
  const totalItemsDiscount = totalDiscount
  const totalItemsValue = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const totalSale = totalItemsValue - totalSaleDiscount + otherExpenses

  // Adicionar item à venda
  const addItem = () => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      description: "",
      code: "",
      unit: "UN",
      quantity: 1,
      listPrice: 0,
      discount: 0,
      unitPrice: 0,
      totalPrice: 0,
    }
    setItems([...items, newItem])
  }

  // Remover item da venda
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // Atualizar item
  const updateItem = (id: string, field: string, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalcular preços
          if (field === "quantity" || field === "listPrice" || field === "discount") {
            const discountAmount = (updatedItem.listPrice * updatedItem.discount) / 100
            updatedItem.unitPrice = updatedItem.listPrice - discountAmount
            updatedItem.totalPrice = updatedItem.unitPrice * updatedItem.quantity
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  // Selecionar produto
  const selectProduct = (itemId: string, productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      updateItem(itemId, "description", product.name)
      updateItem(itemId, "code", product.sku || product.id)
      updateItem(itemId, "listPrice", product.sale_price)
      updateItem(itemId, "unitPrice", product.sale_price)
      updateItem(itemId, "totalPrice", product.sale_price)
    }
  }

  // Salvar venda
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCustomer || !customerSearch) {
      toast({
        title: "Erro",
        description: "Selecione um cliente válido",
        variant: "destructive",
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à venda",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const customer = customers.find((c) => c.id === selectedCustomer)

      const saleData = {
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email || "",
          phone: customer.phone,
          document: customer.document || "",
        },
        status: "orcamento" as const,
        type: "produto" as const,
        paymentMethod: "dinheiro" as any,
        paymentStatus: "pendente" as any,
        subtotal: totalItemsValue,
        discount: totalSaleDiscount,
        total: totalSale,
        items: items.map((item) => ({
          type: "produto" as const,
          id: item.id,
          name: item.description,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.totalPrice,
        })),
        salesperson: vendor,
        commission: totalCommissions,
        notes: "",
      }

      await createSaleMock(saleData)

      toast({
        title: "Sucesso",
        description: "Pedido de venda criado com sucesso!",
      })

      router.push("/crm/vendas")
    } catch (error) {
      console.error("Erro ao criar venda:", error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o pedido de venda",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pedido de venda - {saleNumber}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
          <div className="text-xs text-red-500">(*) Campos obrigatórios</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados do cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Cliente</Label>
                  <span className="text-red-500">*</span>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <div className="relative">
                  <Input
                    value={customerSearch}
                    onChange={(e) => {
                      setCustomerSearch(e.target.value)
                      setShowCustomerDropdown(true)
                      if (!e.target.value) {
                        setSelectedCustomer("")
                      }
                    }}
                    onFocus={() => setShowCustomerDropdown(true)}
                    placeholder="Digite para pesquisar cliente..."
                    className="border-2 border-yellow-400 focus:border-yellow-500"
                  />
                  {showCustomerDropdown && customerSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            onClick={() => {
                              setSelectedCustomer(customer.id)
                              setCustomerSearch(customer.name)
                              setShowCustomerDropdown(false)
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            <div className="font-medium">{customer.name}</div>
                            {customer.phone && <div className="text-gray-500 text-xs">{customer.phone}</div>}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-gray-500 text-sm">Nenhum cliente encontrado</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Vendedor</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Input value={vendor} onChange={(e) => setVendor(e.target.value)} />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Loja</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Select value={store} onValueChange={setStore}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nenhuma">Nenhuma</SelectItem>
                    <SelectItem value="Loja 1">Loja 1</SelectItem>
                    <SelectItem value="Loja 2">Loja 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Unidade de negócio</Label>
                <Select value={businessUnit} onValueChange={setBusinessUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nenhuma unidade de negócio">Nenhuma unidade de negócio</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="Serviços">Serviços</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-64">
              <Label className="text-sm font-medium mb-2 block">Lista de preço</Label>
              <Select value={priceList} onValueChange={setPriceList}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Selecione uma lista">Selecione uma lista</SelectItem>
                  <SelectItem value="Lista Padrão">Lista Padrão</SelectItem>
                  <SelectItem value="Lista Promocional">Lista Promocional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <div className="border-b">
            <div className="flex px-6">
              <button
                type="button"
                onClick={() => setActiveTab("items")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "items"
                    ? "border-yellow-400 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Itens do pedido de venda
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("commissions")}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "commissions"
                    ? "border-yellow-400 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Comissões
              </button>
            </div>
          </div>

          {activeTab === "items" && (
            <CardContent className="pt-6">
              {/* Tabela de itens */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-700">
                        <div className="flex items-center gap-1">
                          Descrição
                          <Info className="h-3 w-3 text-blue-500" />
                        </div>
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Código</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Un</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Quantidade</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Preço lista</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Desc (%)</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Preço un</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-700">Preço total</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-3">
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Pesquisar por código, descrição ou GTIN"
                            className="min-w-[200px]"
                          />
                        </td>
                        <td className="py-3">
                          <Input
                            value={item.code}
                            onChange={(e) => updateItem(item.id, "code", e.target.value)}
                            className="w-20"
                          />
                        </td>
                        <td className="py-3">
                          <Select value={item.unit} onValueChange={(value) => updateItem(item.id, "unit", value)}>
                            <SelectTrigger className="w-16">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UN">UN</SelectItem>
                              <SelectItem value="KG">KG</SelectItem>
                              <SelectItem value="L">L</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                            className="w-20"
                          />
                        </td>
                        <td className="py-3">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.listPrice}
                            onChange={(e) => updateItem(item.id, "listPrice", Number(e.target.value))}
                            className="w-24"
                          />
                        </td>
                        <td className="py-3">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={item.discount}
                            onChange={(e) => updateItem(item.id, "discount", Number(e.target.value))}
                            className="w-20"
                          />
                        </td>
                        <td className="py-3">
                          <Input type="number" value={item.unitPrice.toFixed(2)} readOnly className="w-24 bg-gray-50" />
                        </td>
                        <td className="py-3">
                          <Input
                            type="number"
                            value={item.totalPrice.toFixed(2)}
                            readOnly
                            className="w-24 bg-gray-50"
                          />
                        </td>
                        <td className="py-3">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  onClick={addItem}
                  variant="outline"
                  size="sm"
                  className="text-yellow-600 border-yellow-400 hover:bg-yellow-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar outro item
                </Button>
              </div>
            </CardContent>
          )}

          {activeTab === "commissions" && (
            <CardContent className="pt-6">
              <p className="text-gray-500">Configuração de comissões será implementada em breve.</p>
            </CardContent>
          )}
        </Card>

        {/* Totais */}
        <Card>
          <CardHeader>
            <CardTitle>Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Nº de itens</Label>
                <Input value={totalItems} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Soma das quantidades</Label>
                <Input value={totalQuantity.toFixed(2)} readOnly className="bg-blue-50" />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Desconto</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Input
                  type="number"
                  value={generalDiscount}
                  onChange={(e) => setGeneralDiscount(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Prazo de entrega</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Input
                  type="number"
                  value={deliveryDeadline}
                  onChange={(e) => setDeliveryDeadline(Number(e.target.value))}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Outras despesas</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Desconto total da venda</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={totalSaleDiscount}
                  onChange={(e) => setTotalSaleDiscount(Number(e.target.value))}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Total de comissões</Label>
                <Input value={totalCommissions.toFixed(2)} readOnly className="bg-blue-50" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Desconto total dos itens</Label>
                <Input value={totalItemsDiscount.toFixed(2)} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Total dos itens</Label>
                <Input value={totalItemsValue.toFixed(2)} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block font-semibold">Total da venda</Label>
                <Input value={totalSale.toFixed(2)} readOnly className="bg-gray-50 font-semibold text-lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalhes da venda */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da venda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Número do pedido</Label>
                <Input value={saleNumber} onChange={(e) => setSaleNumber(e.target.value)} />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Data da venda</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Input value={saleDate} onChange={(e) => setSaleDate(e.target.value)} />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Data saída</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Input value={exitDate} onChange={(e) => setExitDate(e.target.value)} />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Label className="text-sm font-medium">Data prevista</Label>
                  <Info className="h-3 w-3 text-blue-500" />
                </div>
                <Input value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} />
              </div>
            </div>

            <div className="mt-4 w-64">
              <div className="flex items-center gap-1 mb-2">
                <Label className="text-sm font-medium">Pedido de compra</Label>
                <Info className="h-3 w-3 text-blue-500" />
              </div>
              <Input value={purchaseOrder} onChange={(e) => setPurchaseOrder(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle>Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Configuração de pagamento será implementada em breve.</p>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
