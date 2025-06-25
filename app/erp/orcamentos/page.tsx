"use client"

import { useState, useEffect, useMemo } from "react"
import { Plus, Search, Filter, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getQuoteItems, deleteMultipleQuoteItems, type QuoteItem } from "@/lib/supabase-quote-items"
import { QuoteItemTable } from "./components/quote-item-table"
import { QuoteItemFilters } from "./components/quote-item-filters"

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Carregar itens de orçamento
  const loadQuoteItems = async () => {
    try {
      setLoading(true)
      const items = await getQuoteItems()
      setQuoteItems(items)
    } catch (error) {
      console.error("Erro ao carregar itens:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os itens de orçamento.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuoteItems()
  }, [])

  // Filtrar itens
  const filteredItems = useMemo(() => {
    return quoteItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [quoteItems, searchTerm, selectedCategory])

  // Navegar para criar novo item
  const handleCreateItem = () => {
    router.push("/erp/orcamentos/criar")
  }

  // Selecionar item
  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Selecionar todos
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  // Excluir item
  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Tem certeza que deseja excluir este item?")) return

    try {
      await deleteMultipleQuoteItems([itemId])
      await loadQuoteItems()
      toast({
        title: "Sucesso",
        description: "Item excluído com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o item.",
        variant: "destructive",
      })
    }
  }

  // Excluir selecionados
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return
    if (!confirm(`Tem certeza que deseja excluir ${selectedItems.length} item(ns)?`)) return

    try {
      await deleteMultipleQuoteItems(selectedItems)
      setSelectedItems([])
      await loadQuoteItems()
      toast({
        title: "Sucesso",
        description: `${selectedItems.length} item(ns) excluído(s) com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir os itens selecionados.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 py-6 px-4 lg:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orçamentos</h1>
          <p className="text-gray-600">Gerencie seus orçamentos e propostas comerciais</p>
        </div>
        <Button onClick={handleCreateItem} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
          <Plus size={20} className="mr-2" />
          Novo Orçamento
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar orçamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {selectedItems.length > 0 && (
                <Button variant="destructive" onClick={handleDeleteSelected} className="flex items-center gap-2">
                  <Trash2 size={16} />
                  Excluir ({selectedItems.length})
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:w-auto">
                <Filter size={20} className="mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <QuoteItemFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={Array.from(new Set(quoteItems.map((item) => item.category).filter(Boolean)))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Orçamentos ({filteredItems.length})</span>
            {selectedItems.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-800">
                {selectedItems.length} selecionado{selectedItems.length > 1 ? "s" : ""}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <QuoteItemTable
            items={filteredItems}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDeleteItem={handleDeleteItem}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
