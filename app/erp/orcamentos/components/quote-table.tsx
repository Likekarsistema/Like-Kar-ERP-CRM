"use client"
import { MoreHorizontal, Edit, Trash2, Eye, Send, Calculator, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import Image from "next/image"

interface Quote {
  id: string
  number: string
  title: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  vehicle: {
    brand: string
    model: string
    year: number
    plate?: string
  }
  category: string
  items: Array<{
    productId: string
    name: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  discount: number
  total: number
  status: "pending" | "approved" | "rejected" | "expired"
  validUntil: string
  createdAt: string
  notes: string
  image?: string
}

interface QuoteTableProps {
  quotes: Quote[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedQuotes?: string[]
  onSelectQuote?: (quoteId: string) => void
  onSelectAll?: () => void
  onDeleteQuote?: (quoteId: string) => void
  onDeleteSelected?: () => void
  loading?: boolean
}

export function QuoteTable({
  quotes,
  searchTerm = "",
  setSearchTerm,
  selectedQuotes = [],
  onSelectQuote,
  onSelectAll,
  onDeleteQuote,
  onDeleteSelected,
  loading,
}: QuoteTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pendente
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Aprovado
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejeitado</Badge>
      case "expired":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Expirado
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const isAllSelected = selectedQuotes.length === quotes.length && quotes.length > 0

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
                {onSelectAll && (
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={onSelectAll}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                )}
              </TableHead>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead className="min-w-[200px]">Descrição</TableHead>
              <TableHead className="w-[120px]">Número</TableHead>
              <TableHead className="min-w-[180px]">Cliente</TableHead>
              <TableHead className="w-[120px]">Valor</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id} className="hover:bg-gray-50">
                <TableCell>
                  {onSelectQuote && (
                    <Checkbox
                      checked={selectedQuotes.includes(quote.id)}
                      onCheckedChange={() => onSelectQuote(quote.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {quote.image ? (
                      <Image
                        src={quote.image || "/placeholder.svg"}
                        alt={quote.title}
                        width={64}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Car className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div>
                    <div className="font-medium text-gray-900 text-sm lg:text-base">{quote.title}</div>
                    <div className="text-xs lg:text-sm text-gray-500 uppercase">{quote.category}</div>
                    <div className="text-xs lg:text-sm text-gray-500">
                      {quote.vehicle.brand} {quote.vehicle.model} {quote.vehicle.year}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{quote.number}</span>
                </TableCell>
                <TableCell className="min-w-[180px]">
                  <div>
                    <div className="font-medium text-sm lg:text-base">{quote.customer.name}</div>
                    <div className="text-xs lg:text-sm text-gray-500 truncate">{quote.customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    R$ {quote.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/orcamentos/${quote.id}`}>
                          <Eye size={16} className="mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/erp/orcamentos/${quote.id}/editar`}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send size={16} className="mr-2" />
                        Enviar
                      </DropdownMenuItem>
                      {onDeleteQuote && (
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDeleteQuote(quote.id)}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {quotes.map((quote) => (
          <div key={quote.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {onSelectQuote && (
                  <Checkbox
                    checked={selectedQuotes.includes(quote.id)}
                    onCheckedChange={() => onSelectQuote(quote.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                  />
                )}
                <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {quote.image ? (
                    <Image
                      src={quote.image || "/placeholder.svg"}
                      alt={quote.title}
                      width={64}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Car className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{quote.title}</h3>
                  <p className="text-sm text-gray-500 uppercase">{quote.category}</p>
                  <p className="text-sm text-gray-500">
                    {quote.vehicle.brand} {quote.vehicle.model} {quote.vehicle.year}
                  </p>
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
                    <Link href={`/erp/orcamentos/${quote.id}`}>
                      <Eye size={16} className="mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/erp/orcamentos/${quote.id}/editar`}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send size={16} className="mr-2" />
                    Enviar
                  </DropdownMenuItem>
                  {onDeleteQuote && (
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => onDeleteQuote(quote.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Nº: {quote.number}</span>
              {getStatusBadge(quote.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Cliente:</span>
                <div className="font-medium">{quote.customer.name}</div>
              </div>
              <div>
                <span className="text-gray-500">Valor:</span>
                <div className="font-medium">
                  R$ {quote.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {quote.notes && <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{quote.notes}</div>}
          </div>
        ))}
      </div>

      {quotes.length === 0 && (
        <div className="text-center py-12">
          <Calculator className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum orçamento encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou criar um novo orçamento.</p>
        </div>
      )}
    </div>
  )
}
