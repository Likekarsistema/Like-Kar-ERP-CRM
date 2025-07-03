"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Calendar,
  Filter,
  Printer,
  Trash2,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Check,
  X,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  getAccountsPayable,
  createAccountPayable,
  updateAccountPayable,
  type AccountPayable,
} from "@/lib/supabase-accounts"
import { getSuppliers } from "@/lib/supabase-queries"

export default function ContasPagarPage() {
  const [accounts, setAccounts] = useState<AccountPayable[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [filteredAccounts, setFilteredAccounts] = useState<AccountPayable[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [supplierSuggestions, setSupplierSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [financialCategories, setFinancialCategories] = useState<any[]>([
    { id: "1", name: "Fornecedores", type: "despesa" },
    { id: "2", name: "Salários e Encargos", type: "despesa" },
    { id: "3", name: "Aluguel", type: "despesa" },
    { id: "4", name: "Marketing e Publicidade", type: "despesa" },
  ])

  const [newAccount, setNewAccount] = useState({
    supplier_id: "",
    supplier_name: "",
    amount: "",
    issue_date: new Date().toISOString().split("T")[0],
    due_date: "",
    description: "",
    invoice_number: "",
    category: "",
    status: "pending" as const,
  })

  // Carregar dados iniciais
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [accountsData, suppliersData] = await Promise.all([getAccountsPayable(), getSuppliers()])

      setAccounts(accountsData)
      setSuppliers(suppliersData)
      setFilteredAccounts(accountsData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados das contas a pagar",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const searchSuppliers = (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSupplierSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = suppliers.filter((supplier) => supplier.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setSupplierSuggestions(filtered.slice(0, 5))
    setShowSuggestions(filtered.length > 0)
  }

  // Filtrar contas baseado na busca
  useEffect(() => {
    let filtered = accounts

    if (searchTerm) {
      filtered = filtered.filter(
        (account) =>
          account.suppliers?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredAccounts(filtered)
  }, [searchTerm, accounts])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAccounts(filteredAccounts.map((account) => account.id))
    } else {
      setSelectedAccounts([])
    }
  }

  const handleSelectAccount = (accountId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccounts([...selectedAccounts, accountId])
    } else {
      setSelectedAccounts(selectedAccounts.filter((id) => id !== accountId))
    }
  }

  const resetForm = () => {
    setNewAccount({
      supplier_id: "",
      supplier_name: "",
      amount: "",
      issue_date: new Date().toISOString().split("T")[0],
      due_date: "",
      description: "",
      invoice_number: "",
      category: "",
      status: "pending",
    })
  }

  const handleCreateAccount = async () => {
    // Validação dos campos obrigatórios
    if (!newAccount.supplier_id) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um fornecedor",
        variant: "destructive",
      })
      return
    }

    if (!newAccount.amount || Number.parseFloat(newAccount.amount.replace(",", ".")) <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, informe um valor válido",
        variant: "destructive",
      })
      return
    }

    if (!newAccount.due_date) {
      toast({
        title: "Erro",
        description: "Por favor, informe a data de vencimento",
        variant: "destructive",
      })
      return
    }

    if (!newAccount.invoice_number.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o número da fatura",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const accountData = {
        supplier_id: newAccount.supplier_id,
        invoice_number: newAccount.invoice_number.trim(),
        description: newAccount.description.trim() || `Ref. à fatura nº ${newAccount.invoice_number}`,
        amount: Number.parseFloat(newAccount.amount.replace(",", ".")),
        issue_date: newAccount.issue_date,
        due_date: newAccount.due_date,
        status: newAccount.status,
      }

      await createAccountPayable(accountData)

      toast({
        title: "Sucesso!",
        description: "Conta a pagar criada com sucesso",
      })

      // Recarregar dados e fechar sidebar
      await loadData()
      resetForm()
      setIsSidebarOpen(false)
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar conta a pagar. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMarkAsPaid = async (accountId: string) => {
    try {
      await updateAccountPayable(accountId, {
        status: "paid",
        payment_date: new Date().toISOString(),
      })

      toast({
        title: "Sucesso",
        description: "Conta marcada como paga!",
      })

      // Recarregar dados
      await loadData()
    } catch (error) {
      console.error("Erro ao atualizar conta:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar conta",
        variant: "destructive",
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
            Atrasada
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pendente
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
            Paga
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
            Cancelada
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contas a pagar</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-white border-gray-300">
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={selectedAccounts.length === 0}
            className="bg-white border-gray-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center space-x-4">
        {/* Dropdown de filtros */}
        <Button variant="outline" className="flex items-center space-x-2 bg-white border-gray-300">
          <Filter className="h-4 w-4" />
          <ChevronDown className="h-4 w-4" />
        </Button>

        {/* Busca */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquise por fornecedor, número da fatura ou descrição"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300"
          />
        </div>

        {/* Filtro de data - COR AMARELA */}
        <Button variant="outline" className="flex items-center space-x-2 text-yellow-600 border-yellow-500 bg-white">
          <Calendar className="h-4 w-4" />
          <span>Filtrar por data</span>
        </Button>

        {/* Botão Nova Conta - COR AMARELA E FUNCIONAL */}
        <Button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Conta</span>
        </Button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                  />
                </th>
                <th className="p-4 text-left font-medium text-gray-700">Fornecedor</th>
                <th className="p-4 text-left font-medium text-gray-700">Nº Fatura</th>
                <th className="p-4 text-left font-medium text-gray-700">Descrição</th>
                <th className="p-4 text-left font-medium text-gray-700">Vencimento</th>
                <th className="p-4 text-left font-medium text-gray-700">Valor</th>
                <th className="p-4 text-left font-medium text-gray-700">Situação</th>
                <th className="p-4 text-left font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={(checked) => handleSelectAccount(account.id, checked as boolean)}
                      className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-sm text-gray-900">{account.suppliers?.name || "N/A"}</div>
                    <div className="text-xs text-gray-500">{account.suppliers?.email}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">{account.invoice_number}</td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{account.description}</td>
                  <td className="p-4 text-sm text-gray-600">{formatDate(account.due_date)}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">{formatCurrency(account.amount)}</td>
                  <td className="p-4">{getStatusBadge(account.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {account.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                          onClick={() => handleMarkAsPaid(account.id)}
                          title="Marcar como pago"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhuma conta a pagar encontrada</div>
        )}
      </div>

      {/* Resumo */}
      <div className="text-sm text-gray-500">
        Mostrando {filteredAccounts.length} de {accounts.length} contas
      </div>

      {/* Sidebar - Formulário Nova Conta */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
              <h2 className="text-xl font-semibold text-gray-900">Nova Conta a Pagar</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Formulário */}
            <div className="p-6 space-y-6">
              {/* Primeira linha - Fornecedor, Valor */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
                <div className="space-y-2 relative">
                  <Label htmlFor="supplier_name" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    Fornecedor <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="supplier_name"
                      value={newAccount.supplier_name}
                      onChange={(e) => {
                        setNewAccount({ ...newAccount, supplier_name: e.target.value, supplier_id: "" })
                        searchSuppliers(e.target.value)
                      }}
                      onFocus={() => {
                        if (newAccount.supplier_name.length >= 2) {
                          searchSuppliers(newAccount.supplier_name)
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 200)
                      }}
                      placeholder="Digite o nome do fornecedor..."
                      className="w-full border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-10"
                    />

                    {/* Lista de sugestões */}
                    {showSuggestions && supplierSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {supplierSuggestions.map((supplier) => (
                          <div
                            key={supplier.id}
                            className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setNewAccount({
                                ...newAccount,
                                supplier_name: supplier.name,
                                supplier_id: supplier.id,
                              })
                              setShowSuggestions(false)
                            }}
                          >
                            <div className="font-medium">{supplier.name}</div>
                            {supplier.email && <div className="text-xs text-gray-500">{supplier.email}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    Valor (R$) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="amount"
                    value={newAccount.amount}
                    onChange={(e) => setNewAccount({ ...newAccount, amount: e.target.value })}
                    placeholder="0,00"
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 h-10"
                  />
                </div>
              </div>

              {/* Segunda linha - Número da Fatura */}
              <div className="space-y-2">
                <Label htmlFor="invoice_number" className="text-sm font-medium text-gray-700">
                  Número da Fatura <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="invoice_number"
                  value={newAccount.invoice_number}
                  onChange={(e) => setNewAccount({ ...newAccount, invoice_number: e.target.value })}
                  placeholder="Ex: FAT-001"
                  className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              {/* Terceira linha - Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issue_date" className="text-sm font-medium text-gray-700">
                    Data de Emissão <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="issue_date"
                    type="date"
                    value={newAccount.issue_date}
                    onChange={(e) => setNewAccount({ ...newAccount, issue_date: e.target.value })}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date" className="text-sm font-medium text-gray-700">
                    Data de Vencimento <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={newAccount.due_date}
                    onChange={(e) => setNewAccount({ ...newAccount, due_date: e.target.value })}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  value={newAccount.description}
                  onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                  placeholder="Descrição da conta a pagar..."
                  className="h-24 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 resize-none"
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Categoria
                </Label>
                <Select
                  value={newAccount.category}
                  onValueChange={(value) => setNewAccount({ ...newAccount, category: value })}
                >
                  <SelectTrigger className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {financialCategories
                      .filter((cat) => cat.type === "despesa")
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setIsSidebarOpen(false)
                  }}
                  disabled={isSubmitting}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateAccount}
                  disabled={isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
