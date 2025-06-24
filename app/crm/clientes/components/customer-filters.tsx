"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CustomerFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const handleStatusChange = (status: string) => {
    setStatusFilter((current) => {
      if (current.includes(status)) {
        return current.filter((s) => s !== status)
      } else {
        return [...current, status]
      }
    })
  }

  return (
    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por nome, telefone, email ou carro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            {statusFilter.length > 0 && (
              <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs rounded-full px-2 py-0.5">
                {statusFilter.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Status do Cliente</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("active")}
            onCheckedChange={() => handleStatusChange("active")}
          >
            Ativo
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("inactive")}
            onCheckedChange={() => handleStatusChange("inactive")}
          >
            Inativo
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("potential")}
            onCheckedChange={() => handleStatusChange("potential")}
          >
            Potencial
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("lost")}
            onCheckedChange={() => handleStatusChange("lost")}
          >
            Perdido
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
