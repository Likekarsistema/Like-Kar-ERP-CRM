"use client"
import { MoreHorizontal, Edit, Trash2, AlertTriangle, Package, Eye, History, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

interface ProductTableProps {
  products: Product[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedProducts?: string[]
  onSelectProduct?: (productId: string) => void
  onSelectAll?: () => void
  onDeleteProduct?: (productId: string) => void
}

export function ProductTable({
  products,
  searchTerm = "",
  setSearchTerm,
  selectedProducts = [],
  onSelectProduct,
  onSelectAll,
  onDeleteProduct,
}: ProductTableProps) {
  const router = useRouter()

  const getStatusBadge = (product: Product) => {
    if (product.current_stock <= product.min_stock) {
      return <Badge variant="destructive">Estoque Baixo</Badge>
    }
    if (product.status === "ativo") {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Ativo
        </Badge>
      )
    }
    return <Badge variant="secondary">Inativo</Badge>
  }

  const getStockIcon = (product: Product) => {
    if (product.current_stock <= product.min_stock) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
    return <Package className="h-4 w-4 text-green-500" />
  }

  const handleStockClick = (productId: string) => {
    router.push(`/crm/movimentacoes?produto=${productId}`)
  }

  const isAllSelected = selectedProducts.length === products.length && products.length > 0

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
              <TableHead>Imagem</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>
                  {onSelectProduct && (
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => onSelectProduct(product.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Link href={`/crm/produtos/${product.id}`} className="font-medium text-gray-900 cursor-pointer">
                      {product.name}
                    </Link>
                    <div className="text-sm text-gray-500">
                      {product.brand} {product.model && `| ${product.model}`}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{product.sku}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{product.unit_of_measure}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    R$ {product.sale_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStockIcon(product)}
                    <span className="font-medium">{product.current_stock}</span>
                  </div>
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
                        <Link href={`/crm/produtos/${product.id}`}>
                          <Eye size={16} className="mr-2" />
                          Ver Detalhes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/movimentacoes?produto=${product.id}`}>
                          <History size={16} className="mr-2" />
                          Histórico de Estoque
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/crm/produtos/${product.id}/editar`}>
                          <Edit size={16} className="mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      {onDeleteProduct && (
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDeleteProduct(product.id)}
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
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {onSelectProduct && (
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => onSelectProduct(product.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                  />
                )}
                <div className="flex-1">
                  <Link href={`/crm/produtos/${product.id}`} className="font-medium text-gray-900 cursor-pointer">
                    <h3>{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">
                    {product.brand} {product.model && `| ${product.model}`}
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
                    <Link href={`/crm/produtos/${product.id}`}>
                      <Eye size={16} className="mr-2" />
                      Ver Detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/movimentacoes?produto=${product.id}`}>
                      <History size={16} className="mr-2" />
                      Histórico de Estoque
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/produtos/${product.id}/editar`}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  {onDeleteProduct && (
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => onDeleteProduct(product.id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              {getStatusBadge(product)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Preço:</span>
                <div className="font-medium">
                  R$ {product.sale_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Estoque:</span>
                <div className="flex items-center gap-1">
                  {getStockIcon(product)}
                  <span className="font-medium">
                    {product.current_stock} {product.unit_of_measure}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novos produtos.</p>
        </div>
      )}
    </div>
  )
}
