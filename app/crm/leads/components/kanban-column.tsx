"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeadCard } from "./lead-card"
import type { Lead } from "@/lib/mock-data"

interface KanbanColumnProps {
  title: string
  status: Lead["status"]
  leads: Lead[]
  color: string
  onLeadMove: (leadId: string, newStatus: Lead["status"]) => void
  onAddLead?: () => void
  onEditLead?: (lead: Lead) => void
  onDeleteLead?: (leadId: string) => void
}

export function KanbanColumn({
  title,
  status,
  leads,
  color,
  onLeadMove,
  onAddLead,
  onEditLead,
  onDeleteLead,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const leadId = e.dataTransfer.getData("text/plain")
    if (leadId) {
      onLeadMove(leadId, status)
    }
  }

  return (
    <div className="flex flex-col h-full min-w-[300px] bg-gray-50 rounded-lg">
      {/* Header */}
      <div className={`p-4 rounded-t-lg ${color}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white/20" onClick={onAddLead}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between text-sm text-white/90">
          <span>
            {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </span>
          {totalValue > 0 && <span>R$ {totalValue.toLocaleString("pt-BR")}</span>}
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 p-4 space-y-3 overflow-y-auto ${
          isDragOver ? "bg-blue-50 border-2 border-dashed border-blue-300" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {leads.length > 0 ? (
          leads.map((lead) => <LeadCard key={lead.id} lead={lead} onEdit={onEditLead} onDelete={onDeleteLead} />)
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Nenhum lead nesta etapa</p>
            <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={onAddLead}>
              <Plus className="h-3 w-3 mr-1" />
              Adicionar Lead
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
