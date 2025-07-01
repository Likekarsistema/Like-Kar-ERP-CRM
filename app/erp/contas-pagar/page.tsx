"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Search, MoreHorizontal, Eye, Edit, Check, Calendar, Filter, Printer, Trash2, ChevronDown } from "lucide-react"

interface AccountPayable {
  id: string
  supplier_name: string
  invoice_number: string
  description: string
  payment_method: string
  due_date: string
  issue_date: string
  amount: number
  status: "pending" | "paid" | "overdue" | "cancelled"
  category: string
}

// Mock data para fornecedores
const mockSuppliers = [
  { id: "1", name: "FORNECEDOR ABC LTDA" },
  { id: "2", name: "DISTRIBUIDORA XYZ LTDA" },
  { id: "3", name: "MATERIAIS CONSTRUÇÃO SILVA" },
  { id: "4", name: "COMERCIAL SANTOS & CIA" },
]

// Mock data para categorias financeiras
const mockCategories = [
  { id: "1", name: "Fornecedores", type: "despesa" },
  { id: "2", name: "Salários e Encargos", type: "despesa" },
  { id: "3", name: "Aluguel", type: "despesa" },
  { id: "4", name: "Marketing e Publicidade", type: "despesa" },
]

// Mock data inicial
const initialAccounts: AccountPayable[] = [
  {
    id: "1",
    supplier_name: "FORNECEDOR ABC LTDA",
    invoice_number: "FAT-001",
    description: "Ref. ao pedido de compra nº 1176",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-06-01",
    issue_date: "2025-05-15",
    amount: 856.2,
    status: "overdue",
    category: "Fornecedores",
  },
  {
    id: "2",
    supplier_name: "DISTRIBUIDORA XYZ LTDA",
    invoice_number: "FAT-002",
    description: "Ref. ao pedido de compra nº 1339",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-05-04",
    issue_date: "2025-04-20",
    amount: 389.79,
    status: "overdue",
    category: "Fornecedores",
  },
  {
    id: "3",
    supplier_name: "GENERAL 222 INFINITY LTDA",
    invoice_number: "FAT-003",
    description: "Ref. ao pedido de compra nº 1397",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-05-13",
    issue_date: "2025-04-28",
    amount: 3371.56,
    status: "overdue",
    category: "Fornecedores",
  },
  {
    id: "4",
    supplier_name: "MARCO ANTONIO DA SILVA COMPONENTES ELETRONICOS LTDA",
    invoice_number: "FAT-004",
    description: "Ref. ao pedido de compra nº 1368",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-05-23",
    issue_date: "2025-05-08",
    amount: 1140.0,
    status: "overdue",
    category: "Fornecedores",
  },
  {
    id: "5",
    supplier_name: "CAZELLI AUTO SOM PEÇAS E ACESSORIOS LTDA",
    invoice_number: "FAT-005",
    description: "Ref. ao pedido de compra nº 1445",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-06-09",
    issue_date: "2025-05-25",
    amount: 10425.0,
    status: "overdue",
    category: "Fornecedores",
  },
]

export default function ContasPagarPage() {
  const [accounts, setAccounts] = useState<AccountPayable[]>(initialAccounts)
  const [filteredAccounts, setFilteredAccounts] = useState<AccountPayable[]>(initialAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [newAccount, setNewAccount] = useState({
    supplier_id: "",
    invoice_number: "",
    description: "",
    amount: 0,
    issue_date: "",
    due_date: "",
    status: "pending" as const,
    category_id: "",
  })

  // Filtrar contas baseado na busca
  useEffect(() => {
    let filtered = accounts

    if (searchTerm) {
      filtered = filtered.filter(
        (account) =>
          account.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleCreateAccount = async () => {
    try {
      setLoading(true)
      const supplier = mockSuppliers.find((s) => s.id === newAccount.supplier_id)
      const category = mockCategories.find((c) => c.id === newAccount.category_id)

      const account: AccountPayable = {
        id: Date.now().toString(),
        supplier_name: supplier?.name || "",
        invoice_number: newAccount.invoice_number,
        description: newAccount.description,
        payment_method: "CONTAS A PAGAR/RECEBER",
        due_date: newAccount.due_date,
        issue_date: newAccount.issue_date,
        amount: newAccount.amount,
        status: newAccount.status,
        category: category?.name || "",
      }

      setAccounts([...accounts, account])
      setIsCreateDialogOpen(false)
      setNewAccount({
        supplier_id: "",
        invoice_number: "",
        description: "",
        amount: 0,
        issue_date: "",
        due_date: "",
        status: "pending",
        category_id: "",
      })
    } catch (error) {
      console.error("Erro ao criar conta:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsPaid = (id: string) => {
    setAccounts(accounts.map((account) => (account.id === id ? { ...account, status: "paid" as const } : account)))
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
      case "paid":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Pago</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Atrasada</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Cancelado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contas a pagar</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent">
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 bg-transparent"
            disabled={selectedAccounts.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="flex items-center space-x-2 bg-white">
          <Filter className="h-4 w-4" />
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquise por nome, e-mail, CPF/CNPJ, número ou histórico"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        <Button variant="outline" className="flex items-center space-x-2 text-gray-600 border-gray-300 bg-white">
          <Calendar className="h-4 w-4" />
          <span>01/06/2025 até 31/07/2025</span>
        </Button>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Nova Conta</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Conta a Pagar</DialogTitle>
              <DialogDescription>Crie uma nova conta a pagar para um fornecedor.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="supplier">Fornecedor</Label>
                <Select
                  value={newAccount.supplier_id}
                  onValueChange={(value) => setNewAccount({ ...newAccount, supplier_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSuppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invoice_number">Número da Fatura</Label>
                <Input
                  id="invoice_number"
                  value={newAccount.invoice_number}
                  onChange={(e) => setNewAccount({ ...newAccount, invoice_number: e.target.value })}
                  placeholder="Ex: FAT-001"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newAccount.description}
                  onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                  placeholder="Descrição da conta"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newAccount.amount}
                  onChange={(e) => setNewAccount({ ...newAccount, amount: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issue_date">Data de Emissão</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={newAccount.issue_date}
                  onChange={(e) => setNewAccount({ ...newAccount, issue_date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due_date">Data de Vencimento</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={newAccount.due_date}
                  onChange={(e) => setNewAccount({ ...newAccount, due_date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={newAccount.category_id}
                  onValueChange={(value) => setNewAccount({ ...newAccount, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories
                      .filter((cat) => cat.type === "despesa")
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAccount} disabled={loading} className="bg-yellow-500 hover:bg-yellow-600">
                {loading ? "Criando..." : "Criar Conta"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left w-12">
                  <Checkbox
                    checked={selectedAccounts.length === filteredAccounts.length && filteredAccounts.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                  />
                </th>
                <th className="p-4 text-left font-medium text-gray-700">Fornecedor</th>
                <th className="p-4 text-left font-medium text-gray-700">Histórico</th>
                <th className="p-4 text-left font-medium text-gray-700">Forma de pagamento</th>
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
                    <div className="font-medium text-sm text-gray-900">{account.supplier_name}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {account.description}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{account.payment_method}</td>
                  <td className="p-4 text-sm text-gray-600">{formatDate(account.due_date)}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">{formatCurrency(account.amount)}</td>
                  <td className="p-4">{getStatusBadge(account.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => handleMarkAsPaid(account.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo */}
      <div className="text-sm text-gray-500">
        Mostrando {filteredAccounts.length} de {accounts.length} contas
      </div>
    </div>
  )
}
