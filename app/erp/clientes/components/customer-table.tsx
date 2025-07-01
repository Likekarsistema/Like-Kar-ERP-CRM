"use client"
import { MoreHorizontal, Edit, Trash2, Car, Phone, MapPin, User, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import type { Customer } from "@/lib/supabase-customers"

interface CustomerTableProps {
  customers: Customer[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedCustomers?: string[]
  onSelectCustomer?: (customerId: string) => void
  onSelectAll?: () => void
  onDeleteCustomer?: (customerId: string) => void
}

export function CustomerTable({
  customers,
  searchTerm = "",
  setSearchTerm,
  selectedCustomers = [],
  onSelectCustomer,
  onSelectAll,
  onDeleteCustomer,
}: CustomerTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Ativo
          </Badge>
        )
      case "inativo":
        return <Badge variant="secondary">Inativo</Badge>
      case "devedor":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Devedor
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const isAllSelected = selectedCustomers.length === customers.length && customers.length > 0

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                {onSelectAll && (
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={onSelectAll}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                )}
              </TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Veículos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell>
                  {onSelectCustomer && (
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={() => onSelectCustomer(customer.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <Link href={`/erp/clientes/${customer.id}`} className="font-medium text-gray-900 cursor-pointer">
                      {customer.name}
                    </Link>
                    {customer.email && <div className="text-sm text-gray-500">{customer.email}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  {customer.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                        {customer.phone}
                      </a>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {customer.city && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {customer.city}
                        {customer.state && `, ${customer.state}`}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Car className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      {customer.cars && customer.cars.length > 0
                        ? `${customer.cars.length} ${customer.cars.length === 1 ? "veículo" : "veículos"}`
                        : "Nenhum veículo"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/clientes/${customer.id}`}>
                          <Eye size={16} className="mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/clientes/${customer.id}/editar`}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      {onDeleteCustomer && (
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDeleteCustomer(customer.id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Search Bar */}
      {setSearchTerm && (
        <div className="md:hidden p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {onSelectCustomer && (
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => onSelectCustomer(customer.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                  />
                )}
                <div className="flex-1">
                  <Link href={`/erp/clientes/${customer.id}`} className="font-medium text-gray-900 cursor-pointer">
                    <h3>{customer.name}</h3>
                  </Link>
                  {customer.email && <p className="text-sm text-gray-500">{customer.email}</p>}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/erp/clientes/${customer.id}`}>
                      <Eye size={16} className="mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/erp/clientes/${customer.id}/editar`}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  {onDeleteCustomer && (
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => onDeleteCustomer(customer.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              {customer.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${customer.phone}`}>{customer.phone}</a>
                </div>
              )}
              {getStatusBadge(customer.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {customer.city && customer.city}
                    {customer.state && `, ${customer.state}`}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center text-gray-600">
                  <Car className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {customer.cars && customer.cars.length > 0
                      ? `${customer.cars.length} ${customer.cars.length === 1 ? "veículo" : "veículos"}`
                      : "Nenhum veículo"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {customers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum cliente encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novos clientes.</p>
        </div>
      )}
    </div>
  )
}
