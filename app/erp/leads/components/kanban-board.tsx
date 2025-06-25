"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KanbanColumn } from "./kanban-column"
import { useToast } from "@/hooks/use-toast"
import { getAllLeads, updateLeadStatus, deleteLead } from "@/lib/mock-data"
import type { Lead } from "@/lib/mock-data"

const COLUMNS = [
  { status: "novo" as const, title: "Novos Leads", color: "bg-blue-500" },
  { status: "contato" as const, title: "Em Contato", color: "bg-yellow-500" },
  { status: "proposta" as const, title: "Proposta", color: "bg-purple-500" },
  { status: "negociacao" as const, title: "Negociação", color: "bg-orange-500" },
  { status: "fechado" as const, title: "Fechados", color: "bg-green-500" },
  { status: "perdido" as const, title: "Perdidos", color: "bg-red-500" },
]

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadLeads()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [leads, searchTerm, filterBy])

  const loadLeads = async () => {
    try {
      setLoading(true)
      // Simular carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const data = getAllLeads()
      setLeads(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os leads",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = leads

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtros específicos
    switch (filterBy) {
      case "high-priority":
        filtered = filtered.filter((lead) => lead.priority === "alta")
        break
      case "assigned-to-me":
        filtered = filtered.filter((lead) => lead.assigned_to === "Carlos Santos")
        break
      // "all" não precisa de filtro adicional
    }

    setFilteredLeads(filtered)
  }

  const handleLeadMove = (leadId: string, newStatus: Lead["status"]) => {
    const updatedLead = updateLeadStatus(leadId, newStatus)
    if (updatedLead) {
      setLeads((prev) => prev.map((lead) => (lead.id === leadId ? updatedLead : lead)))
      toast({
        title: "Lead atualizado",
        description: `Lead movido para ${COLUMNS.find((col) => col.status === newStatus)?.title}`,
      })
    }
  }

  const handleDeleteLead = (leadId: string) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return

    try {
      deleteLead(leadId)
      setLeads((prev) => prev.filter((lead) => lead.id !== leadId))
      toast({
        title: "Lead excluído",
        description: "Lead foi excluído com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o lead",
        variant: "destructive",
      })
    }
  }

  const getLeadsByStatus = (status: Lead["status"]) => {
    return filteredLeads.filter((lead) => lead.status === status)
  }

  const totalLeads = filteredLeads.length
  const totalValue = filteredLeads.reduce((sum, lead) => sum + (lead.value || 0), 0)
  const closedLeads = filteredLeads.filter((lead) => lead.status === "fechado").length
  const conversionRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : "0"

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-2 text-gray-500">Carregando leads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header com filtros */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-4">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalLeads}</div>
            <div className="text-sm text-blue-600">Total de Leads</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">R$ {totalValue.toLocaleString("pt-BR")}</div>
            <div className="text-sm text-green-600">Valor Total</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{closedLeads}</div>
            <div className="text-sm text-purple-600">Leads Fechados</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{conversionRate}%</div>
            <div className="text-sm text-orange-600">Taxa de Conversão</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Leads</SelectItem>
              <SelectItem value="high-priority">Alta Prioridade</SelectItem>
              <SelectItem value="assigned-to-me">Atribuídos a Mim</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 p-4 h-full min-w-max">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              leads={getLeadsByStatus(column.status)}
              color={column.color}
              onLeadMove={handleLeadMove}
              onDeleteLead={handleDeleteLead}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
