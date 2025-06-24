"use client"

import type React from "react"

import { useState } from "react"
import { MoreVertical, Building, Phone, Mail, Calendar, DollarSign, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Lead } from "@/lib/mock-data"

interface LeadCardProps {
  lead: Lead
  onEdit?: (lead: Lead) => void
  onDelete?: (leadId: string) => void
}

export function LeadCard({ lead, onEdit, onDelete }: LeadCardProps) {
  const [isDragging, setIsDragging] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200"
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "baixa":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "website":
        return "bg-blue-100 text-blue-800"
      case "google ads":
        return "bg-purple-100 text-purple-800"
      case "facebook":
        return "bg-indigo-100 text-indigo-800"
      case "whatsapp":
        return "bg-green-100 text-green-800"
      case "indicação":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    e.dataTransfer.setData("text/plain", lead.id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-move ${
        isDragging ? "opacity-50 rotate-2" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{lead.name}</h3>
          {lead.company && (
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Building className="h-3 w-3 mr-1" />
              <span className="truncate">{lead.company}</span>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(lead)}>Editar Lead</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete?.(lead.id)} className="text-red-600">
              Excluir Lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge className={getPriorityColor(lead.priority)} variant="outline">
          {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
        </Badge>
        <Badge className={getSourceColor(lead.source)} variant="outline">
          {lead.source}
        </Badge>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-3 w-3 mr-2" />
          <span className="truncate">{lead.phone}</span>
        </div>
        {lead.email && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-3 w-3 mr-2" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
      </div>

      {/* Value */}
      {lead.value && (
        <div className="flex items-center text-sm font-medium text-green-600 mb-3">
          <DollarSign className="h-3 w-3 mr-1" />
          R$ {lead.value.toLocaleString("pt-BR")}
        </div>
      )}

      {/* Notes */}
      {lead.notes && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{lead.notes}</p>}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        {lead.assigned_to && (
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span className="truncate">{lead.assigned_to}</span>
          </div>
        )}
        {lead.next_contact && (
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(lead.next_contact).toLocaleDateString("pt-BR")}</span>
          </div>
        )}
      </div>
    </div>
  )
}
