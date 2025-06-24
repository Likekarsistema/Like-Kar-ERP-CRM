"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getProductById, updateProductMock, getProductCategories, getProductSubcategories } from "@/lib/mock-data"
import { ImageUpload } from "../../components/image-upload"
import Link from "next/link"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    category_id: "",
    subcategory_id: "",
    cost_price: 0,
    sale_price: 0,
    current_stock: 0,
    min_stock: 0,
    max_stock: 0,
    unit_of_measure: "UN",
    status: "ativo" as const,
    images: [] as string[],
    tags: [] as string[],
    notes: "",
  })

  // Carregar categorias e subcategorias
  const categories = getProductCategories()
  const [subcategories, setSubcategories] = useState(getProductSubcategories())

  // Carregar dados do produto
  useEffect(() => {
    try {
      const product = getProductById(productId)
      if (product) {
        setFormData({
          name: product.name,
          description: product.description || "",
          sku: product.sku,
          category_id: product.category_id || "",
          subcategory_id: product.subcategory_id || "",
          cost_price: product.cost_price,
          sale_price: product.sale_price,
          current_stock: product.current_stock,
          min_stock: product.min_stock,
          max_stock: product.max_stock,
          unit_of_measure: product.unit_of_measure,
          status: product.status,
          images: product.images || [],
          tags: product.tags || [],
          notes: product.notes || "",
        })

        // Carregar subcategorias da categoria do produto
        if (product.category_id) {
          setSubcategories(getProductSubcategories(product.category_id))
        }
      }
    } catch (error) {
      console.error("Erro ao carregar produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do produto",
        variant: "destructive",
      })
    } finally {
      setInitialLoading(false)
    }
  }, [productId, toast])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Quando a categoria muda, atualizar as subcategorias disponíveis
    if (field === "category_id") {
      setSubcategories(getProductSubcategories(value))
      setFormData((prev) => ({
        ...prev,
        subcategory_id: "", // Limpar subcategoria selecionada
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validações básicas
      if (!formData.name.trim()) {
        throw new Error("Nome do produto é obrigatório")
      }
      if (!formData.sale_price || formData.sale_price <= 0) {
        throw new Error("Preço de venda deve ser maior que zero")
      }

      // Atualizar produto
      const updatedProduct = updateProductMock(productId, {
        ...formData,
        main_image_url: formData.images[0] || null,
        updated_by: "user-mock",
        updated_at: new Date().toISOString(),
      })

      toast({
        title: "Produto atualizado com sucesso!",
        description: `${updatedProduct.name} foi atualizado.`,
      })

      // Redirecionar para a página de detalhes
      router.push(`/crm/produtos/${productId}`)
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error)
      toast({
        title: "Erro ao atualizar produto",
        description: error.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateMarkup = () => {
    if (formData.cost_price > 0 && formData.sale_price > 0) {
      return (((formData.sale_price - formData.cost_price) / formData.sale_price) * 100).toFixed(1)
    }
    return "0.0"
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
          <p className="text-sm text-gray-500">Carregando produto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/crm/produtos/${productId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar Produto</h1>
          <p className="text-gray-500">Atualize as informações do produto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Ex: Central Multimídia Pioneer"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Descrição detalhada do produto..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      placeholder="Código único do produto"
                    />
                  </div>

                  <div>
                    <Label htmlFor="unit_of_measure">Unidade</Label>
                    <Select
                      value={formData.unit_of_measure}
                      onValueChange={(value) => handleInputChange("unit_of_measure", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UN">Unidade</SelectItem>
                        <SelectItem value="KG">Quilograma</SelectItem>
                        <SelectItem value="L">Litro</SelectItem>
                        <SelectItem value="M">Metro</SelectItem>
                        <SelectItem value="M2">Metro²</SelectItem>
                        <SelectItem value="M3">Metro³</SelectItem>
                        <SelectItem value="PC">Peça</SelectItem>
                        <SelectItem value="PAR">Par</SelectItem>
                        <SelectItem value="CX">Caixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preços e Estoque */}
            <Card>
              <CardHeader>
                <CardTitle>Preços e Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cost_price">Preço de Custo</Label>
                    <Input
                      id="cost_price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.cost_price}
                      onChange={(e) => handleInputChange("cost_price", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sale_price">Preço de Venda *</Label>
                    <Input
                      id="sale_price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.sale_price}
                      onChange={(e) => handleInputChange("sale_price", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                      required
                    />
                  </div>

                  <div>
                    <Label>Margem de Lucro</Label>
                    <div className="h-10 px-3 py-2 border rounded-md bg-gray-50 flex items-center">
                      <span className="text-sm font-medium">{calculateMarkup()}%</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="current_stock">Estoque Atual</Label>
                    <Input
                      id="current_stock"
                      type="number"
                      min="0"
                      value={formData.current_stock}
                      onChange={(e) => handleInputChange("current_stock", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="min_stock">Estoque Mínimo</Label>
                    <Input
                      id="min_stock"
                      type="number"
                      min="0"
                      value={formData.min_stock}
                      onChange={(e) => handleInputChange("min_stock", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="max_stock">Estoque Máximo</Label>
                    <Input
                      id="max_stock"
                      type="number"
                      min="0"
                      value={formData.max_stock}
                      onChange={(e) => handleInputChange("max_stock", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Imagens */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens do Produto</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => handleInputChange("images", images)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Categorização */}
            <Card>
              <CardHeader>
                <CardTitle>Categorização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleInputChange("category_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Subcategoria</Label>
                  <Select
                    value={formData.subcategory_id}
                    onValueChange={(value) => handleInputChange("subcategory_id", value)}
                    disabled={!formData.category_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma subcategoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!formData.category_id && (
                    <p className="text-xs text-gray-500 mt-1">Selecione uma categoria primeiro</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="descontinuado">Descontinuado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Observações */}
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Observações adicionais sobre o produto..."
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href={`/crm/produtos/${productId}`}>Cancelar</Link>
          </Button>
          <Button type="submit" disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
