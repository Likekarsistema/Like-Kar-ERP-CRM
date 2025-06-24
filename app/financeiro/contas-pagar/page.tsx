"use client"

import { useState } from "react"
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
import { toast } from "@/hooks/use-toast"

interface AccountPayable {
  id: string
  supplier_name: string
  invoice_number: string
  description: string
  amount: number
  due_date: string
  status: "pending" | "paid" | "overdue" | "cancelled"
}

// Mock data inicial
const initialAccounts: AccountPayable[] = [
  {
    id: "1",
    supplier_name: "Fornecedor ABC Ltda",
    invoice_number: "FAT-001",
    description: "Compra de materiais",
    amount: 1500.0,
    due_date: "2025-07-15",
    status: "pending",
  },
  {
    id: "2",
    supplier_name: "Distribuidora XYZ",
    invoice_number: "FAT-002",
    description: "Produtos para revenda",
    amount: 2800.0,
    due_date: "2025-06-10",
    status: "overdue",
  },
]

export default function ContasPagarPage() {
  const [accounts, setAccounts] = useState<AccountPayable[]>(initialAccounts)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const [newAccount, setNewAccount] = useState({
    supplier_name: "",
    invoice_number: "",
    description: "",
    amount: 0,
    issue_date: "",
    due_date: "",
    status: "pending" as const,
  })

  const handleCreateAccount = async () => {
    try {
      const accountData: AccountPayable = {
        id: Date.now().toString(),
        supplier_name: newAccount.supplier_name,
        invoice_number: newAccount.invoice_number,
        description: newAccount.description,
        amount: newAccount.amount,
        due_date: newAccount.due_date,
        status: newAccount.status,
      }

      setAccounts([accountData, ...accounts])

      toast({
        title: "Sucesso",
        description: "Conta a pagar criada com sucesso",
      })

      setIsCreateDialogOpen(false)
      setNewAccount({
        supplier_name: "",
        invoice_number: "",
        description: "",
        amount: 0,
        issue_date: "",
        due_date: "",
        status: "pending",
      })
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar conta a pagar",
        variant: "destructive",
      })
    }
  }

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contas a Pagar</h1>
          <p className="text-muted-foreground">Gerencie suas contas a pagar</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
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
                <Label htmlFor="supplier_name">Fornecedor</Label>
                <Input
                  id="supplier_name"
                  value={newAccount.supplier_name}
                  onChange={(e) => setNewAccount({ ...newAccount, supplier_name: e.target.value })}
                  placeholder="Nome do fornecedor"
                />
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
                <Label htmlFor="due_date">Data de Vencimento</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={newAccount.due_date}
                  onChange={(e) => setNewAccount({ ...newAccount, due_date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAccount} className="bg-yellow-500 hover:bg-yellow-600">
                Criar Conta
              </Button>
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
                    <td className="p-2">{account.supplier_name}</td>
                    <td className="p-2">{account.description}</td>
                    <td className="p-2">R$ {account.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="p-2">{new Date(account.due_date).toLocaleDateString("pt-BR")}</td>
                    <td className="p-2">{getStatusBadge(account.status)}</td>
                    <td className="p-2">
                      {account.status === "pending" && (
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
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
