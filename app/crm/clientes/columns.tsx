"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Edit, Trash2, Car, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type Customer = {
  id: string
  name: string
  phone: string
  email?: string
  city?: string
  state?: string
  status: string
  cars?: { id: string; brand: string; model: string; license_plate: string }[]
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Cliente",
    cell: ({ row }) => (
      <Link href={`/crm/clientes/${row.original.id}`} className="font-medium text-gray-900 hover:text-yellow-600">
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-900">
        <Phone className="h-4 w-4 mr-2 text-gray-400" />
        <a href={`tel:${row.getValue("phone")}`} className="hover:text-blue-600">
          {row.getValue("phone")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Localização",
    cell: ({ row }) => {
      const customer = row.original
      if (!customer.city) return null

      return (
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span>
            {customer.city}
            {customer.state && `, ${customer.state}`}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "cars",
    header: "Veículos",
    cell: ({ row }) => {
      const cars = row.original.cars || []

      return (
        <div className="flex items-center text-sm text-gray-600">
          <Car className="h-4 w-4 mr-2 text-gray-400" />
          <span>
            {cars.length > 0 ? `${cars.length} ${cars.length === 1 ? "veículo" : "veículos"}` : "Nenhum veículo"}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const getStatusColor = (status: string) => {
        switch (status) {
          case "active":
            return "bg-green-100 text-green-800 border-green-200"
          case "inactive":
            return "bg-gray-100 text-gray-800 border-gray-200"
          case "potential":
            return "bg-blue-100 text-blue-800 border-blue-200"
          case "lost":
            return "bg-red-100 text-red-800 border-red-200"
          default:
            return "bg-gray-100 text-gray-800 border-gray-200"
        }
      }

      const getStatusLabel = (status: string) => {
        switch (status) {
          case "active":
            return "Ativo"
          case "inactive":
            return "Inativo"
          case "potential":
            return "Potencial"
          case "lost":
            return "Perdido"
          default:
            return status
        }
      }

      return <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/crm/clientes/${customer.id}/editar`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
