"use client"

import type React from "react"

import { MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { QuoteItem } from "@/lib/supabase-quote-items"

interface QuoteItemTableProps {
  items: QuoteItem[]
  selectedItems: string[]
  onSelectItem: (itemId: string) => void
  onSelectAll: () => void
  onDeleteItem: (itemId: string) => void
  loading?: boolean
}

export function QuoteItemTable({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onDeleteItem,
  loading,
}: QuoteItemTableProps) {
  const router = useRouter()
  const isAllSelected = selectedItems.length === items.length && items.length > 0

  const handleRowClick = (itemId: string, event: React.MouseEvent) => {
    // Não navegar se clicou em checkbox ou botão de ações
    const target = event.target as HTMLElement
    if (target.closest('input[type="checkbox"]') || target.closest("button") || target.closest('[role="menuitem"]')) {
      return
    }
    router.push(`/crm/orcamentos/${itemId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                  className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                />
              </TableHead>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead className="min-w-[200px]">Descrição</TableHead>
              <TableHead className="w-[120px]">Preço</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={(e) => handleRowClick(item.id, e)}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => onSelectItem(item.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                </TableCell>
                <TableCell>
                  <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div>
                    <div className="font-medium text-gray-900 text-sm lg:text-base">{item.name}</div>
                    {item.brand && <div className="text-xs lg:text-sm text-blue-600 font-medium">{item.brand}</div>}
                    {item.description && (
                      <div className="text-xs lg:text-sm text-gray-500 line-clamp-2">{item.description}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/orcamentos/${item.id}`}>
                          <Eye size={16} className="mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/orcamentos/${item.id}/editar`}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => onDeleteItem(item.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg p-4 space-y-3 hover:bg-gray-50 cursor-pointer"
            onClick={(e) => handleRowClick(item.id, e)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => onSelectItem(item.id)}
                  className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                />
                <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Package className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  {item.brand && <p className="text-sm text-blue-600 font-medium">{item.brand}</p>}
                  {item.description && <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>}
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
                    <Link href={`/crm/orcamentos/${item.id}`}>
                      <Eye size={16} className="mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/orcamentos/${item.id}/editar`}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => onDeleteItem(item.id)}>
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum item encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou criar um novo item.</p>
        </div>
      )}
    </div>
  )
}
