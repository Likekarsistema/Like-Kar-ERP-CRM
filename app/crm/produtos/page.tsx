"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProductTable } from "./components/product-table"
import { AdvancedProductFilters, type ProductFilters } from "./components/advanced-product-filters"
import { useToast } from "@/hooks/use-toast"
import { getAllProducts, deleteProductMock, deleteMultipleProducts } from "@/lib/mock-data"
import Link from "next/link"

export default function ProductsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Estado para filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState<ProductFilters>({
    situation: "all",
    stock: "all",
    category: "all",
    ncm: "",
    brand: "",
  })

  // Carregar produtos
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  const confirmDelete = (productId: string) => {
    setProductToDelete(productId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!productToDelete) return

    setIsDeleting(true)
    try {
      await deleteProductMock(productToDelete)

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete))
      setSelectedProducts((prev) => prev.filter((id) => id !== productToDelete))

      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o produto",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const confirmBulkDelete = () => {
    if (selectedProducts.length === 0) return
    setBulkDeleteDialogOpen(true)
  }

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return

    setIsDeleting(true)
    try {
      await deleteMultipleProducts(selectedProducts)

      setProducts((prevProducts) => prevProducts.filter((product) => !selectedProducts.includes(product.id)))
      setSelectedProducts([])

      toast({
        title: "Produtos excluídos",
        description: `${selectedProducts.length} produtos foram excluídos com sucesso.`,
      })
    } catch (error) {
      console.error("Erro ao excluir produtos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir os produtos selecionados",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setBulkDeleteDialogOpen(false)
    }
  }

  // Função para navegar para criar produto
  // const handleCreateProduct = () => {
  //   console.log("Navegando para criar produto...")
  //   router.push("/crm/produtos/criar")
  // }

  // Aplicar filtros avançados
  const applyAdvancedFilters = (product: any) => {
    // Filtro de situação
    if (advancedFilters.situation !== "all") {
      if (advancedFilters.situation === "recent") {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        if (!product.createdAt || new Date(product.createdAt) < weekAgo) return false
      } else if (advancedFilters.situation === "active" && product.status !== "ativo") return false
      else if (advancedFilters.situation === "inactive" && product.status !== "inativo") return false
      else if (advancedFilters.situation === "discontinued" && product.status !== "descontinuado") return false
    }

    // Filtro de estoque
    if (advancedFilters.stock !== "all") {
      if (advancedFilters.stock === "in-stock" && product.stock <= 0) return false
      if (advancedFilters.stock === "low-stock" && (product.stock <= 0 || product.stock > 10)) return false
      if (advancedFilters.stock === "out-of-stock" && product.stock > 0) return false
      if (advancedFilters.stock === "high-stock" && product.stock <= 50) return false
    }

    // Filtro de categoria avançado
    if (advancedFilters.category !== "all" && product.category_id !== advancedFilters.category) return false

    // Filtro de NCM
    if (advancedFilters.ncm && (!product.ncm || !product.ncm.includes(advancedFilters.ncm))) return false

    // Filtro de marca
    if (
      advancedFilters.brand &&
      (!product.brand || !product.brand.toLowerCase().includes(advancedFilters.brand.toLowerCase()))
    )
      return false

    return true
  }

  // Filtrar produtos
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAdvanced = applyAdvancedFilters(product)

    return matchesSearch && matchesAdvanced
  })

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-gray-500">Gerencie seu catálogo de produtos</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos por nome, SKU ou descrição..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>

            {/* Filters and New Product Button */}
            <div className="flex gap-3 flex-shrink-0">
              {/* Advanced Filters */}
              <AdvancedProductFilters currentFilters={advancedFilters} onFiltersChange={setAdvancedFilters} />

              {/* New Product Button */}
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 h-10">
                <Link href="/crm/produtos/criar">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Products Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-medium">
              {selectedProducts.length}{" "}
              {selectedProducts.length === 1 ? "produto selecionado" : "produtos selecionados"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedProducts([])}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            <p className="text-sm text-gray-500">Carregando produtos...</p>
          </div>
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onDeleteProduct={confirmDelete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão em massa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {selectedProducts.length} produtos? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir Produtos"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
