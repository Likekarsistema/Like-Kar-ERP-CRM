"use client"
import { MoreHorizontal, Edit, Trash2, Eye, Phone, MapPin, Search, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Input } from "@/components/ui/input"

interface Supplier {
  id: string
  name: string
  document?: string
  email?: string
  phone?: string
  city?: string
  state?: string
  contact_person?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface SupplierTableProps {
  suppliers: Supplier[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedSuppliers?: string[]
  onSelectSupplier?: (supplierId: string) => void
  onSelectAll?: () => void
  onDeleteSupplier?: (supplierId: string) => void
}

export function SupplierTable({
  suppliers,
  searchTerm = "",
  setSearchTerm,
  selectedSuppliers = [],
  onSelectSupplier,
  onSelectAll,
  onDeleteSupplier,
}: SupplierTableProps) {
  const getStatusBadge = (supplier: Supplier) => {
    if (supplier.is_active) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Ativo
        </Badge>
      )
    }
    return <Badge variant="secondary">Inativo</Badge>
  }

  const isAllSelected = selectedSuppliers.length === suppliers.length && suppliers.length > 0

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
              <TableHead>Fornecedor</TableHead>
              <TableHead>CNPJ/CPF</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="hover:bg-gray-50">
                <TableCell>
                  {onSelectSupplier && (
                    <Checkbox
                      checked={selectedSuppliers.includes(supplier.id)}
                      onCheckedChange={() => onSelectSupplier(supplier.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <Link
                      href={`/crm/fornecedores/${supplier.id}`}
                      className="font-medium text-gray-900 cursor-pointer"
                    >
                      {supplier.name}
                    </Link>
                    {supplier.contact_person && (
                      <div className="text-sm text-gray-500">Contato: {supplier.contact_person}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600 font-mono text-sm">{supplier.document || "-"}</span>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {supplier.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-1" />
                        {supplier.phone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {(supplier.city || supplier.state) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      {supplier.city}
                      {supplier.city && supplier.state && ", "}
                      {supplier.state}
                    </div>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(supplier)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/fornecedores/${supplier.id}`}>
                          <Eye size={16} className="mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/fornecedores/${supplier.id}/editar`}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      {onDeleteSupplier && (
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDeleteSupplier(supplier.id)}
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
              placeholder="Buscar fornecedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {onSelectSupplier && (
                  <Checkbox
                    checked={selectedSuppliers.includes(supplier.id)}
                    onCheckedChange={() => onSelectSupplier(supplier.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                  />
                )}
                <div className="flex-1">
                  <Link href={`/crm/fornecedores/${supplier.id}`} className="font-medium text-gray-900 cursor-pointer">
                    <h3>{supplier.name}</h3>
                  </Link>
                  {supplier.contact_person && (
                    <p className="text-sm text-gray-500">Contato: {supplier.contact_person}</p>
                  )}
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
                    <Link href={`/crm/fornecedores/${supplier.id}`}>
                      <Eye size={16} className="mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/fornecedores/${supplier.id}/editar`}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  {onDeleteSupplier && (
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => onDeleteSupplier(supplier.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {supplier.document ? `CNPJ/CPF: ${supplier.document}` : "Sem documento"}
              </span>
              {getStatusBadge(supplier)}
            </div>

            <div className="space-y-1 text-sm">
              {supplier.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone size={14} className="mr-1" />
                  {supplier.phone}
                </div>
              )}
              {(supplier.city || supplier.state) && (
                <div className="flex items-center text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  {supplier.city}
                  {supplier.city && supplier.state && ", "}
                  {supplier.state}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum fornecedor encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novos fornecedores.</p>
        </div>
      )}
    </div>
  )
}
