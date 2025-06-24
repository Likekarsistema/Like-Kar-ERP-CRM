"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, Tag, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

interface FinancialCategory {
  id: string
  name: string
  description: string
  type: "receita" | "despesa" | "ambos"
  color: string
  active: boolean
  usageCount: number
  createdAt: string
}

const mockCategories: FinancialCategory[] = [
  {
    id: "1",
    name: "Vendas de Produtos",
    description: "Receitas provenientes da venda de produtos",
    type: "receita",
    color: "bg-green-500",
    active: true,
    usageCount: 45,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Prestação de Serviços",
    description: "Receitas de serviços prestados",
    type: "receita",
    color: "bg-blue-500",
    active: true,
    usageCount: 32,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Fornecedores",
    description: "Pagamentos para fornecedores",
    type: "despesa",
    color: "bg-red-500",
    active: true,
    usageCount: 28,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Salários",
    description: "Pagamento de salários e benefícios",
    type: "despesa",
    color: "bg-orange-500",
    active: true,
    usageCount: 12,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Marketing",
    description: "Investimentos em marketing e publicidade",
    type: "despesa",
    color: "bg-purple-500",
    active: true,
    usageCount: 18,
    createdAt: "2024-01-12",
  },
]

export default function CategoriasFinancasPage() {
  const [categories, setCategories] = useState<FinancialCategory[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todas")

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "todas") return matchesSearch
    if (activeTab === "receitas") return matchesSearch && category.type === "receita"
    if (activeTab === "despesas") return matchesSearch && category.type === "despesa"

    return matchesSearch
  })

  const totalCategories = categories.length
  const activeCategories = categories.filter((c) => c.active).length
  const revenueCategories = categories.filter((c) => c.type === "receita").length
  const expenseCategories = categories.filter((c) => c.type === "despesa").length

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
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Receita
          </Badge>
        )
      case "despesa":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Despesa
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Ambos
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias de Finanças</h1>
          <p className="text-gray-600 mt-1">Organize suas categorias financeiras para melhor controle</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">{activeCategories} ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias Ativas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCategories}</div>
            <p className="text-xs text-muted-foreground">
              {((activeCategories / totalCategories) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{revenueCategories}</div>
            <p className="text-xs text-muted-foreground">Categorias de receita</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expenseCategories}</div>
            <p className="text-xs text-muted-foreground">Categorias de despesa</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="todas">Todas ({totalCategories})</TabsTrigger>
              <TabsTrigger value="receitas">Receitas ({revenueCategories})</TabsTrigger>
              <TabsTrigger value="despesas">Despesas ({expenseCategories})</TabsTrigger>
            </TabsList>

            <TabsContent value="todas" className="mt-6">
              <CategoriesList categories={filteredCategories} getTypeIcon={getTypeIcon} getTypeBadge={getTypeBadge} />
            </TabsContent>

            <TabsContent value="receitas" className="mt-6">
              <CategoriesList categories={filteredCategories} getTypeIcon={getTypeIcon} getTypeBadge={getTypeBadge} />
            </TabsContent>

            <TabsContent value="despesas" className="mt-6">
              <CategoriesList categories={filteredCategories} getTypeIcon={getTypeIcon} getTypeBadge={getTypeBadge} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function CategoriesList({
  categories,
  getTypeIcon,
  getTypeBadge,
}: {
  categories: FinancialCategory[]
  getTypeIcon: (type: string) => JSX.Element
  getTypeBadge: (type: string) => JSX.Element
}) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma categoria encontrada</h3>
        <p className="text-gray-600">Tente ajustar os filtros ou criar uma nova categoria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </div>
              <div className="flex items-center gap-1">{getTypeIcon(category.type)}</div>
            </div>
            <CardDescription className="text-sm">{category.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-3">
              {getTypeBadge(category.type)}
              <Badge variant={category.active ? "default" : "secondary"}>{category.active ? "Ativa" : "Inativa"}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Usado {category.usageCount} vezes</span>
              <span>Criado em {new Date(category.createdAt).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
