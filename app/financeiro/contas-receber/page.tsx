"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "lucide-react"

interface AccountReceivable {
  id: string
  customer_name: string
  invoice_number: string
  description: string
  payment_method: string
  due_date: string
  amount: number
  status: "pending" | "paid" | "overdue" | "cancelled"
}

// Mock data inicial
const initialAccounts: AccountReceivable[] = [
  {
    id: "1",
    customer_name: "LEIA CAROLINA ALVES COSTA PINHEIRO DOS SANTOS",
    invoice_number: "1176",
    description: "Ref. ao pedido de venda nº 1176",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-06-02",
    amount: 856.2,
    status: "overdue",
  },
  {
    id: "2",
    customer_name: "LEIA CAROLINA ALVES COSTA PINHEIRO DOS SANTOS",
    invoice_number: "1339",
    description: "Ref. ao pedido de venda nº 1339",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-05-05",
    amount: 389.79,
    status: "overdue",
  },
  {
    id: "3",
    customer_name: "GENERAL 222 INFINITY LTDA",
    invoice_number: "1397",
    description: "Ref. ao pedido de venda nº 1397",
    payment_method: "CONTAS A PAGAR/RECEBER",
    due_date: "2025-05-14",
    amount: 3371.56,
    status: "overdue",
  },
]

export default function ContasReceberPage() {
  const [accounts, setAccounts] = useState<AccountReceivable[]>(initialAccounts)
  const [filteredAccounts, setFilteredAccounts] = useState<AccountReceivable[]>(initialAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newAccount, setNewAccount] = useState({
    customer_name: "",
    amount: "",
    issue_date: new Date().toISOString().split("T")[0],
    due_date: "",
    description: "",
    payment_method: "",
    category: "",
    status: "pending" as const,
  })

  // Filtrar contas baseado na busca
  useEffect(() => {
    let filtered = accounts

    if (searchTerm) {
      filtered = filtered.filter(
        (account) =>
          account.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.invoice_number.includes(searchTerm) ||
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
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contas a Receber</h1>
          <p className="text-gray-600">Gerencie suas contas a receber</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" disabled={selectedAccounts.length === 0}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquise por nome, e-mail, CPF/CNPJ, número ou histórico"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="flex items-center space-x-2 text-yellow-600 border-yellow-500">
          <Calendar className="h-4 w-4" />
          <span>01/06/2025 até 31/07/2025</span>
        </Button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-sm border">
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
                <th className="p-4 text-left font-medium text-gray-700">Cliente</th>
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
                <tr key={account.id} className="border-b">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={(checked) => handleSelectAccount(account.id, checked as boolean)}
                      className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-sm text-gray-900">{account.customer_name}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{account.description}</td>
                  <td className="p-4 text-sm text-gray-600">{account.payment_method}</td>
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
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4" />
                      </Button>
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
      </div>

      {/* Resumo */}
      <div className="text-sm text-gray-500">
        Mostrando {filteredAccounts.length} de {accounts.length} contas
      </div>
    </div>
  )
}
