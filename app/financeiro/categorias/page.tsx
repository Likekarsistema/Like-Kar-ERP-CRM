"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Tag,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MoreHorizontal,
  Eye,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FinancialCategory {
  id: string
  name: string
  description: string
  type: "receita" | "despesa" | "ambos"
  color: string
  parent_id?: string
  is_active: boolean
  created_at: string
  usage_count: number
}

// Mock data inicial
const initialCategories: FinancialCategory[] = [
  {
    id: "1",
    name: "Vendas de Produtos",
    description: "Receitas provenientes da venda de produtos",
    type: "receita",
    color: "#10B981",
    is_active: true,
    created_at: "2024-01-15",
    usage_count: 45,
  },
  {
    id: "2",
    name: "Prestação de Serviços",
    description: "Receitas de serviços prestados",
    type: "receita",
    color: "#3B82F6",
    is_active: true,
    created_at: "2024-01-15",
    usage_count: 32,
  },
  {
    id: "3",
    name: "Fornecedores",
    description: "Pagamentos para fornecedores de produtos",
    type: "despesa",
    color: "#EF4444",
    is_active: true,
    created_at: "2024-01-15",
    usage_count: 28,
  },
  {
    id: "4",
    name: "Salários e Encargos",
    description: "Folha de pagamento e encargos trabalhistas",
    type: "despesa",
    color: "#F59E0B",
    is_active: true,
    created_at: "2024-01-15",
    usage_count: 12,
  },
  {
    id: "5",
    name: "Aluguel",
    description: "Pagamento de aluguel do estabelecimento",
    type: "despesa",
    color: "#8B5CF6",
    is_active: true,
    created_at: "2024-01-15",
    usage_count: 12,
  },
  {
    id: "6",
    name: "Marketing e Publicidade",
    description: "Investimentos em marketing e publicidade",
    type: "despesa",
    color: "#EC4899",
    is_active: true,
    created_at: "2024-01-15",
    usage_count: 8,
  },
]

const colorOptions = [
  { value: "#10B981", label: "Verde", color: "#10B981" },
  { value: "#3B82F6", label: "Azul", color: "#3B82F6" },
  { value: "#EF4444", label: "Vermelho", color: "#EF4444" },
  { value: "#F59E0B", label: "Amarelo", color: "#F59E0B" },
  { value: "#8B5CF6", label: "Roxo", color: "#8B5CF6" },
  { value: "#EC4899", label: "Rosa", color: "#EC4899" },
  { value: "#6B7280", label: "Cinza", color: "#6B7280" },
  { value: "#14B8A6", label: "Teal", color: "#14B8A6" },
]

export default function CategoriasFinanceirasPage() {
  const [categories, setCategories] = useState<FinancialCategory[]>(initialCategories)
  const [filteredCategories, setFilteredCategories] = useState<FinancialCategory[]>(initialCategories)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<FinancialCategory | null>(null)

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    type: "receita" as const,
    color: "#10B981",
    is_active: true,
  })

  // Filtrar categorias
  useEffect(() => {
    let filtered = categories

    if (searchTerm) {
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((category) => category.type === typeFilter)
    }

    setFilteredCategories(filtered)
  }, [searchTerm, typeFilter, categories])

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o nome da categoria",
        variant: "destructive",
      })
      return
    }

    try {
      const categoryData: FinancialCategory = {
        id: Date.now().toString(),
        name: newCategory.name.trim(),
        description: newCategory.description.trim(),
        type: newCategory.type,
        color: newCategory.color,
        is_active: newCategory.is_active,
        created_at: new Date().toISOString(),
        usage_count: 0,
      }

      setCategories([categoryData, ...categories])

      toast({
        title: "Sucesso",
        description: "Categoria criada com sucesso",
      })

      setIsCreateDialogOpen(false)
      setNewCategory({
        name: "",
        description: "",
        type: "receita",
        color: "#10B981",
        is_active: true,
      })
    } catch (error) {
      console.error("Erro ao criar categoria:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar categoria",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o nome da categoria",
        variant: "destructive",
      })
      return
    }

    try {
      setCategories(categories.map((cat) => (cat.id === editingCategory.id ? editingCategory : cat)))

      toast({
        title: "Sucesso",
        description: "Categoria atualizada com sucesso",
      })

      setIsEditDialogOpen(false)
      setEditingCategory(null)
    } catch (error) {
      console.error("Erro ao editar categoria:", error)
      toast({
        title: "Erro",
        description: "Erro ao editar categoria",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      setCategories(categories.filter((cat) => cat.id !== id))
      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso",
      })
    } catch (error) {
      console.error("Erro ao excluir categoria:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir categoria",
        variant: "destructive",
      })
    }
  }

  const toggleCategoryStatus = async (id: string) => {
    try {
      setCategories(categories.map((cat) => (cat.id === id ? { ...cat, is_active: !cat.is_active } : cat)))
      toast({
        title: "Sucesso",
        description: "Status da categoria atualizado",
      })
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar status da categoria",
        variant: "destructive",
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "receita":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "despesa":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <DollarSign className="h-4 w-4 text-blue-600" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "receita":
        return <Badge className="bg-green-100 text-green-800">Receita</Badge>
      case "despesa":
        return <Badge className="bg-red-100 text-red-800">Despesa</Badge>
      case "ambos":
        return <Badge className="bg-blue-100 text-blue-800">Ambos</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const totalCategories = categories.length
  const activeCategories = categories.filter((cat) => cat.is_active).length
  const revenueCategories = categories.filter((cat) => cat.type === "receita").length
  const expenseCategories = categories.filter((cat) => cat.type === "despesa").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categorias Financeiras</h1>
          <p className="text-muted-foreground">Gerencie as categorias para contas a pagar e receber</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Categoria Financeira</DialogTitle>
              <DialogDescription>Crie uma nova categoria para organizar suas transações financeiras.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Categoria</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Ex: Vendas de Produtos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Descrição da categoria"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={newCategory.type}
                  onValueChange={(value: "receita" | "despesa" | "ambos") =>
                    setNewCategory({ ...newCategory, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                    <SelectItem value="ambos">Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Cor</Label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${
                        newCategory.color === color.value ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.color }}
                      onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCategory} className="bg-yellow-500 hover:bg-yellow-600">
                Criar Categoria
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias Ativas</CardTitle>
            <Tag className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{revenueCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expenseCategories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
                <SelectItem value="ambos">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias Financeiras</CardTitle>
          <CardDescription>Lista de todas as categorias financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(category.type)}
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getTypeBadge(category.type)}
                  <Badge variant={category.is_active ? "default" : "secondary"}>
                    {category.is_active ? "Ativa" : "Inativa"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{category.usage_count} usos</span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingCategory(category)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleCategoryStatus(category.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {category.is_active ? "Desativar" : "Ativar"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Categoria Financeira</DialogTitle>
            <DialogDescription>Edite as informações da categoria financeira.</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome da Categoria</Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="Ex: Vendas de Produtos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Descrição da categoria"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Tipo</Label>
                <Select
                  value={editingCategory.type}
                  onValueChange={(value: "receita" | "despesa" | "ambos") =>
                    setEditingCategory({ ...editingCategory, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                    <SelectItem value="ambos">Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color">Cor</Label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${
                        editingCategory.color === color.value ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.color }}
                      onClick={() => setEditingCategory({ ...editingCategory, color: color.value })}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditCategory} className="bg-yellow-500 hover:bg-yellow-600">
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
