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
import { Plus, Search, DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import {
  getAccountsPayable,
  createAccountPayable,
  updateAccountPayable,
  type AccountPayable,
} from "@/lib/supabase-accounts"
import { getSuppliers } from "@/lib/supabase-queries"
import { toast } from "@/hooks/use-toast"

export default function ContasPagarPage() {
  const [accounts, setAccounts] = useState<AccountPayable[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [financialCategories, setFinancialCategories] = useState<any[]>([])

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

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [accountsData, suppliersData] = await Promise.all([getAccountsPayable(), getSuppliers()])
      setAccounts(accountsData)
      setSuppliers(suppliersData)

      // Mock financial categories
      setFinancialCategories([
        { id: "1", name: "Fornecedores", type: "despesa" },
        { id: "2", name: "Salários e Encargos", type: "despesa" },
        { id: "3", name: "Aluguel", type: "despesa" },
        { id: "4", name: "Marketing e Publicidade", type: "despesa" },
      ])
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

  const handleCreateAccount = async () => {
    try {
      await createAccountPayable(newAccount)
      toast({
        title: "Sucesso",
        description: "Conta a pagar criada com sucesso",
      })
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
      loadData()
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar conta a pagar",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsPaid = async (id: string) => {
    try {
      await updateAccountPayable(id, {
        status: "paid",
        payment_date: new Date().toISOString(),
      })
      toast({
        title: "Sucesso",
        description: "Conta marcada como paga",
      })
      loadData()
    } catch (error) {
      console.error("Erro ao atualizar conta:", error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar conta",
        variant: "destructive",
      })
    }
  }

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.suppliers?.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || account.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Vencido</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const totalPayable = accounts.reduce(
    (sum, account) => (account.status === "pending" || account.status === "overdue" ? sum + account.amount : sum),
    0,
  )
  const totalOverdue = accounts.reduce((sum, account) => (account.status === "overdue" ? sum + account.amount : sum), 0)
  const totalPaid = accounts.reduce((sum, account) => (account.status === "paid" ? sum + account.amount : sum), 0)

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contas a Pagar</h1>
          <p className="text-muted-foreground">Gerencie suas contas a pagar</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
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
                    {suppliers.map((supplier) => (
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
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAccount}>Criar Conta</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalPayable.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalOverdue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
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
                  placeholder="Buscar por fornecedor, fatura ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Contas */}
      <Card>
        <CardHeader>
          <CardTitle>Contas a Pagar</CardTitle>
          <CardDescription>Lista de todas as contas a pagar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Fatura</th>
                  <th className="text-left p-2">Fornecedor</th>
                  <th className="text-left p-2">Descrição</th>
                  <th className="text-left p-2">Valor</th>
                  <th className="text-left p-2">Vencimento</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b">
                    <td className="p-2 font-medium">{account.invoice_number}</td>
                    <td className="p-2">{account.suppliers?.name}</td>
                    <td className="p-2">{account.description}</td>
                    <td className="p-2">R$ {account.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="p-2">{new Date(account.due_date).toLocaleDateString("pt-BR")}</td>
                    <td className="p-2">{getStatusBadge(account.status)}</td>
                    <td className="p-2">
                      {account.status === "pending" && (
                        <Button size="sm" onClick={() => handleMarkAsPaid(account.id)}>
                          Marcar como Pago
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
