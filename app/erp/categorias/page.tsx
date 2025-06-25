"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  getProductCategories,
  getProductSubcategories,
  createCategoryMock,
  updateCategoryMock,
  deleteCategoryMock,
  createSubcategoryMock,
  updateSubcategoryMock,
  deleteSubcategoryMock,
  type ProductCategory,
  type ProductSubcategory,
} from "@/lib/mock-data"

export default function CategoriasPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [subcategories, setSubcategories] = useState<ProductSubcategory[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false)
  const [newSubcategoryDialogOpen, setNewSubcategoryDialogOpen] = useState(false)
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false)
  const [editSubcategoryDialogOpen, setEditSubcategoryDialogOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<ProductCategory | null>(null)
  const [subcategoryToEdit, setSubcategoryToEdit] = useState<ProductSubcategory | null>(null)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [newSubcategory, setNewSubcategory] = useState({ name: "", description: "", category_id: "" })

  // Carregar dados
  useEffect(() => {
    setCategories(getProductCategories())
    setSubcategories(getProductSubcategories())
  }, [])

  // Filtrar categorias e subcategorias
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Funções para categorias
  const handleSelectAllCategories = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(filteredCategories.map((c) => c.id))
    }
  }

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setSubcategoryToDelete(null)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      try {
        deleteCategoryMock(categoryToDelete)

        // Atualizar estado local
        setCategories(getProductCategories())
        setSubcategories(getProductSubcategories())

        toast({
          title: "Categoria excluída",
          description: "A categoria e suas subcategorias foram excluídas com sucesso.",
        })
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir a categoria.",
          variant: "destructive",
        })
      }
    }
    setDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  const handleBulkDeleteCategories = () => {
    setBulkDeleteDialogOpen(true)
  }

  const confirmBulkDeleteCategories = () => {
    try {
      selectedCategories.forEach((categoryId) => {
        deleteCategoryMock(categoryId)
      })

      // Atualizar estado local
      setCategories(getProductCategories())
      setSubcategories(getProductSubcategories())

      toast({
        title: "Categorias excluídas",
        description: `${selectedCategories.length} categoria(s) foram excluídas com sucesso.`,
      })
      setSelectedCategories([])
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir as categorias.",
        variant: "destructive",
      })
    }
    setBulkDeleteDialogOpen(false)
  }

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da categoria é obrigatório.",
        variant: "destructive",
      })
      return
    }

    try {
      createCategoryMock({
        name: newCategory.name,
        description: newCategory.description,
        is_active: true,
      })

      // Atualizar estado local
      setCategories(getProductCategories())
      setNewCategory({ name: "", description: "" })
      setNewCategoryDialogOpen(false)

      toast({
        title: "Categoria criada",
        description: "A categoria foi criada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar a categoria.",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = () => {
    if (!categoryToEdit) return

    if (!categoryToEdit.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da categoria é obrigatório.",
        variant: "destructive",
      })
      return
    }

    try {
      updateCategoryMock(categoryToEdit.id, {
        name: categoryToEdit.name,
        description: categoryToEdit.description,
        is_active: categoryToEdit.is_active,
      })

      // Atualizar estado local
      setCategories(getProductCategories())
      setEditCategoryDialogOpen(false)
      setCategoryToEdit(null)

      toast({
        title: "Categoria atualizada",
        description: "A categoria foi atualizada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a categoria.",
        variant: "destructive",
      })
    }
  }

  // Funções para subcategorias
  const handleSelectSubcategory = (subcategoryId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId) ? prev.filter((id) => id !== subcategoryId) : [...prev, subcategoryId],
    )
  }

  const handleDeleteSubcategory = (subcategoryId: string) => {
    setSubcategoryToDelete(subcategoryId)
    setCategoryToDelete(null)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteSubcategory = () => {
    if (subcategoryToDelete) {
      try {
        deleteSubcategoryMock(subcategoryToDelete)

        // Atualizar estado local
        setSubcategories(getProductSubcategories())

        toast({
          title: "Subcategoria excluída",
          description: "A subcategoria foi excluída com sucesso.",
        })
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir a subcategoria.",
          variant: "destructive",
        })
      }
    }
    setDeleteDialogOpen(false)
    setSubcategoryToDelete(null)
  }

  const handleCreateSubcategory = () => {
    if (!newSubcategory.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da subcategoria é obrigatório.",
        variant: "destructive",
      })
      return
    }

    if (!newSubcategory.category_id) {
      toast({
        title: "Erro",
        description: "Selecione uma categoria para a subcategoria.",
        variant: "destructive",
      })
      return
    }

    try {
      createSubcategoryMock({
        name: newSubcategory.name,
        description: newSubcategory.description,
        category_id: newSubcategory.category_id,
        is_active: true,
      })

      // Atualizar estado local
      setSubcategories(getProductSubcategories())
      setNewSubcategory({ name: "", description: "", category_id: "" })
      setNewSubcategoryDialogOpen(false)

      // Expandir a categoria pai
      if (!expandedCategories.includes(newSubcategory.category_id)) {
        setExpandedCategories((prev) => [...prev, newSubcategory.category_id])
      }

      toast({
        title: "Subcategoria criada",
        description: "A subcategoria foi criada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar a subcategoria.",
        variant: "destructive",
      })
    }
  }

  const handleEditSubcategory = () => {
    if (!subcategoryToEdit) return

    if (!subcategoryToEdit.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da subcategoria é obrigatório.",
        variant: "destructive",
      })
      return
    }

    try {
      updateSubcategoryMock(subcategoryToEdit.id, {
        name: subcategoryToEdit.name,
        description: subcategoryToEdit.description,
        category_id: subcategoryToEdit.category_id,
        is_active: subcategoryToEdit.is_active,
      })

      // Atualizar estado local
      setSubcategories(getProductSubcategories())
      setEditSubcategoryDialogOpen(false)
      setSubcategoryToEdit(null)

      toast({
        title: "Subcategoria atualizada",
        description: "A subcategoria foi atualizada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a subcategoria.",
        variant: "destructive",
      })
    }
  }

  // Função para expandir/colapsar categorias
  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Função para confirmar exclusão (categoria ou subcategoria)
  const confirmDelete = () => {
    if (categoryToDelete) {
      confirmDeleteCategory()
    } else if (subcategoryToDelete) {
      confirmDeleteSubcategory()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorias de Produtos</h1>
          <p className="text-gray-600">Gerencie as categorias e subcategorias dos seus produtos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium"
            onClick={() => setNewCategoryDialogOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Nova Categoria
          </Button>
          <Button
            variant="outline"
            className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
            onClick={() => setNewSubcategoryDialogOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Nova Subcategoria
          </Button>
        </div>
      </div>

      {/* Barra de Seleção */}
      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Selecionados: {selectedCategories.length} categoria{selectedCategories.length > 1 ? "s" : ""}
            <button onClick={() => setSelectedCategories([])} className="ml-2 text-blue-600 hover:text-blue-800">
              ×
            </button>
          </span>
          <button
            onClick={handleBulkDeleteCategories}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          >
            <Trash2 size={14} className="mr-1 inline" />
            Excluir Selecionadas
          </button>
          <Button variant="outline" size="sm" className="ml-auto">
            <Filter size={16} className="mr-2" />
            Ordenar
          </Button>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar categorias e subcategorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                    onChange={handleSelectAllCategories}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">Nome</th>
                <th className="text-left p-4 font-medium text-gray-900">Descrição</th>
                <th className="text-left p-4 font-medium text-gray-900">Subcategorias</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Criado em</th>
                <th className="w-16 p-4 font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((category) => {
                const categorySubcategories = subcategories.filter((s) => s.category_id === category.id)
                const isExpanded = expandedCategories.includes(category.id)

                return (
                  <React.Fragment key={category.id}>
                    <tr className={`hover:bg-gray-50 ${isExpanded ? "bg-gray-50" : ""}`}>
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleSelectCategory(category.id)}
                          className="rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900 flex items-center">
                          <button
                            onClick={() => toggleCategoryExpand(category.id)}
                            className="mr-2 text-gray-500 hover:text-gray-700"
                          >
                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          </button>
                          {category.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{category.description || "-"}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-900">{categorySubcategories.length} subcategorias</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.is_active ? "ativo" : "inativo"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{new Date(category.created_at).toLocaleDateString("pt-BR")}</div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setCategoryToEdit(category)
                                setEditCategoryDialogOpen(true)
                              }}
                            >
                              <Edit size={16} className="mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>

                    {/* Subcategorias expandidas */}
                    {isExpanded &&
                      categorySubcategories.map((subcategory) => (
                        <tr key={subcategory.id} className="bg-gray-50/50 hover:bg-gray-100">
                          <td className="p-4"></td>
                          <td className="p-4">
                            <div className="font-medium text-gray-700 pl-8">{subcategory.name}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-600">{subcategory.description || "-"}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-500 italic">Subcategoria</div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                subcategory.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {subcategory.is_active ? "ativo" : "inativo"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-600">
                              {new Date(subcategory.created_at).toLocaleDateString("pt-BR")}
                            </div>
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSubcategoryToEdit(subcategory)
                                    setEditSubcategoryDialogOpen(true)
                                  }}
                                >
                                  <Edit size={16} className="mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteSubcategory(subcategory.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 size={16} className="mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category) => {
              const categorySubcategories = subcategories.filter((s) => s.category_id === category.id)
              const isExpanded = expandedCategories.includes(category.id)

              return (
                <div key={category.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleSelectCategory(category.id)}
                        className="mt-1 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <button
                            onClick={() => toggleCategoryExpand(category.id)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          </button>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {category.is_active ? "ativo" : "inativo"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{category.description || "-"}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{categorySubcategories.length} subcategorias</span>
                          <span>{new Date(category.created_at).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCategoryToEdit(category)
                            setEditCategoryDialogOpen(true)
                          }}
                        >
                          <Edit size={16} className="mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)} className="text-red-600">
                          <Trash2 size={16} className="mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Subcategorias expandidas (mobile) */}
                  {isExpanded && categorySubcategories.length > 0 && (
                    <div className="mt-3 pl-8 border-l-2 border-gray-200">
                      {categorySubcategories.map((subcategory) => (
                        <div key={subcategory.id} className="py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-800">{subcategory.name}</h4>
                              <p className="text-sm text-gray-600">{subcategory.description || "-"}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span
                                  className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                                    subcategory.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {subcategory.is_active ? "ativo" : "inativo"}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(subcategory.created_at).toLocaleDateString("pt-BR")}
                                </span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSubcategoryToEdit(subcategory)
                                    setEditSubcategoryDialogOpen(true)
                                  }}
                                >
                                  <Edit size={16} className="mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteSubcategory(subcategory.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 size={16} className="mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dialog de Confirmação - Exclusão Individual */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{categoryToDelete ? "Excluir categoria" : "Excluir subcategoria"}</AlertDialogTitle>
            <AlertDialogDescription>
              {categoryToDelete
                ? "Tem certeza que deseja excluir esta categoria e todas as suas subcategorias? Esta ação não pode ser desfeita."
                : "Tem certeza que deseja excluir esta subcategoria? Esta ação não pode ser desfeita."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Confirmação - Exclusão em Lote */}
      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categorias selecionadas</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {selectedCategories.length} categoria(s) e todas as suas subcategorias?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDeleteCategories} className="bg-red-500 hover:bg-red-600">
              Excluir Todas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para Nova Categoria */}
      <Dialog open={newCategoryDialogOpen} onOpenChange={setNewCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>Crie uma nova categoria para seus produtos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria *</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Ex: Pneus"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Descreva a categoria"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={handleCreateCategory}>
              Criar Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Nova Subcategoria */}
      <Dialog open={newSubcategoryDialogOpen} onOpenChange={setNewSubcategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Subcategoria</DialogTitle>
            <DialogDescription>Crie uma nova subcategoria para seus produtos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={newSubcategory.category_id}
                onValueChange={(value) => setNewSubcategory({ ...newSubcategory, category_id: value })}
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
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Subcategoria *</Label>
              <Input
                id="name"
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                placeholder="Ex: Pneus de Passeio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newSubcategory.description}
                onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                placeholder="Descreva a subcategoria"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewSubcategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={handleCreateSubcategory}>
              Criar Subcategoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Editar Categoria */}
      <Dialog open={editCategoryDialogOpen} onOpenChange={setEditCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>Atualize as informações da categoria.</DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome da Categoria *</Label>
                <Input
                  id="edit-name"
                  value={categoryToEdit.name}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={categoryToEdit.description || ""}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={categoryToEdit.is_active ? "ativo" : "inativo"}
                  onValueChange={(value) =>
                    setCategoryToEdit({
                      ...categoryToEdit,
                      is_active: value === "ativo",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={handleEditCategory}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para Editar Subcategoria */}
      <Dialog open={editSubcategoryDialogOpen} onOpenChange={setEditSubcategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Subcategoria</DialogTitle>
            <DialogDescription>Atualize as informações da subcategoria.</DialogDescription>
          </DialogHeader>
          {subcategoryToEdit && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-subcategory-category">Categoria *</Label>
                <Select
                  value={subcategoryToEdit.category_id}
                  onValueChange={(value) =>
                    setSubcategoryToEdit({
                      ...subcategoryToEdit,
                      category_id: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
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
              <div className="space-y-2">
                <Label htmlFor="edit-subcategory-name">Nome da Subcategoria *</Label>
                <Input
                  id="edit-subcategory-name"
                  value={subcategoryToEdit.name}
                  onChange={(e) => setSubcategoryToEdit({ ...subcategoryToEdit, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subcategory-description">Descrição</Label>
                <Textarea
                  id="edit-subcategory-description"
                  value={subcategoryToEdit.description || ""}
                  onChange={(e) => setSubcategoryToEdit({ ...subcategoryToEdit, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subcategory-status">Status</Label>
                <Select
                  value={subcategoryToEdit.is_active ? "ativo" : "inativo"}
                  onValueChange={(value) =>
                    setSubcategoryToEdit({
                      ...subcategoryToEdit,
                      is_active: value === "ativo",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSubcategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={handleEditSubcategory}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
