"use client"
import { ArrowLeft, Clock, Edit, Folder, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductById } from "@/lib/mock-data"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  let product
  try {
    product = getProductById(productId)
  } catch (error) {
    product = null
  }

  const handleEditProduct = () => {
    console.log("Navegando para editar produto:", productId)
    router.push(`/crm/produtos/${productId}/editar`)
  }

  const handleStockHistory = () => {
    console.log("Navegando para histórico de estoque:", productId)
    router.push(`/crm/produtos/${productId}/estoque`)
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Produto não encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">O produto solicitado não existe.</p>
          <Link href="/crm/produtos">
            <Button className="mt-4">Voltar para Produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const marginPercentage =
    product.sale_price > 0 && product.cost_price > 0
      ? ((product.sale_price - product.cost_price) / product.cost_price) * 100
      : 0
  const profit = product.sale_price - product.cost_price

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <Link href="/crm/produtos" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={18} className="mr-2" />
          <span>Voltar para Produtos</span>
        </Link>

        <div className="flex-1 md:ml-2">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
              Ativo
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 mt-3 md:mt-0">
          <Button variant="outline" className="flex items-center gap-1" onClick={handleStockHistory}>
            <Clock size={16} />
            <span>Histórico de Estoque</span>
          </Button>
          <Button
            className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-1"
            onClick={handleEditProduct}
          >
            <Edit size={16} />
            <span>Editar Produto</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image and Basic Info */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center h-80">
            <div className="text-center text-gray-400">
              <Folder size={64} className="mx-auto mb-2" />
              <p className="text-sm">Nenhuma imagem disponível</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 p-4">
              <h2 className="text-lg font-semibold text-yellow-500">Informações Básicas</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Categoria:</span>
                <span className="font-medium text-black">ACESSÓRIOS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subcategoria:</span>
                <span className="text-gray-500">Não informada</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Marca:</span>
                <span className="text-gray-500">Não informada</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">NCM:</span>
                <span className="text-gray-500">-</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns - Financial and Stock Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Financial and Stock Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Preço de Venda */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-yellow-500 mb-1">Preço de Venda</div>
              <div className="text-2xl font-bold text-black">
                R$ {product.sale_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Custo */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-yellow-500 mb-1">Custo</div>
              <div className="text-2xl font-bold text-black">
                R$ {product.cost_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Margem de Lucro */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-yellow-500 mb-1">Margem de Lucro</div>
              <div className="text-2xl font-bold text-black">{marginPercentage.toFixed(0)}%</div>
              <div className="text-xs text-gray-600">
                Lucro: R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Estoque Atual */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-yellow-500 mb-1">Estoque Atual</div>
              <div className="text-2xl font-bold text-black">
                {product.current_stock} <span className="text-sm">UN</span>
              </div>
            </div>

            {/* Estoque Mínimo */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-yellow-500 mb-1">Estoque Mínimo</div>
              <div className="text-2xl font-bold text-black">
                {product.min_stock} <span className="text-sm">UN</span>
              </div>
            </div>

            {/* Unidade */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-yellow-500 mb-1">Unidade</div>
              <div className="text-2xl font-bold text-black">{product.unit_of_measure}</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-black mb-3">Descrição do Produto</h3>
            <p className="text-black">{product.description || "Central multimídia com Bluetooth e tela touch"}</p>
          </div>

          {/* Stock Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-400 p-1.5 rounded-md">
                <Package size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Informações de Estoque</h4>
                <p className="text-sm text-yellow-700">Controle o estoque deste produto para evitar rupturas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
