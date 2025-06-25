"use client"
import { MoreHorizontal, Edit, Trash2, User, Eye, Shield, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface Collaborator {
  id: string
  name: string
  email: string
  role: string
  status: string
  active: boolean
  createdAt: string
  lastAccess: string
}

interface CollaboratorTableProps {
  collaborators: Collaborator[]
  searchTerm?: string
  setSearchTerm?: (term: string) => void
  selectedCollaborators?: string[]
  onSelectCollaborator?: (collaboratorId: string) => void
  onSelectAll?: () => void
  onDeleteCollaborator?: (collaboratorId: string) => void
}

export function CollaboratorTable({
  collaborators,
  searchTerm = "",
  setSearchTerm,
  selectedCollaborators = [],
  onSelectCollaborator,
  onSelectAll,
  onDeleteCollaborator,
}: CollaboratorTableProps) {
  const router = useRouter()

  const getStatusBadge = (collaborator: Collaborator) => {
    if (collaborator.active) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Ativo
        </Badge>
      )
    }
    return <Badge variant="secondary">Inativo</Badge>
  }

  const handleToggleStatus = (collaboratorId: string) => {
    // Esta função seria implementada no componente pai
    console.log("Toggle status for:", collaboratorId)
  }

  const isAllSelected = selectedCollaborators.length === collaborators.length && collaborators.length > 0

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
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collaborators.map((collaborator) => (
              <TableRow key={collaborator.id} className="hover:bg-gray-50">
                <TableCell>
                  {onSelectCollaborator && (
                    <Checkbox
                      checked={selectedCollaborators.includes(collaborator.id)}
                      onCheckedChange={() => onSelectCollaborator(collaborator.id)}
                      className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-900">{collaborator.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-blue-600">{collaborator.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{collaborator.role}</span>
                </TableCell>
                <TableCell>{getStatusBadge(collaborator)}</TableCell>
                <TableCell>
                  <span className="text-gray-600 text-sm">
                    {new Date(collaborator.lastAccess).toLocaleDateString("pt-BR")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={collaborator.active}
                      onCheckedChange={() => handleToggleStatus(collaborator.id)}
                      className="data-[state=checked]:bg-yellow-400 scale-90"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/erp/colaboradores/${collaborator.id}`}>
                            <Eye size={16} className="mr-2" />
                            Ver Detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/erp/colaboradores/${collaborator.id}/editar`}>
                            <Edit size={16} className="mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield size={16} className="mr-2" />
                          Permissões
                        </DropdownMenuItem>
                        {onDeleteCollaborator && (
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => onDeleteCollaborator(collaborator.id)}
                          >
                            <Trash2 size={16} className="mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
              placeholder="Buscar colaboradores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {collaborators.map((collaborator) => (
          <div key={collaborator.id} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {onSelectCollaborator && (
                  <Checkbox
                    checked={selectedCollaborators.includes(collaborator.id)}
                    onCheckedChange={() => onSelectCollaborator(collaborator.id)}
                    className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
                  />
                )}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{collaborator.name}</h3>
                    <p className="text-sm text-blue-600">{collaborator.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={collaborator.active}
                  onCheckedChange={() => handleToggleStatus(collaborator.id)}
                  className="data-[state=checked]:bg-yellow-400 scale-90"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/erp/colaboradores/${collaborator.id}`}>
                        <Eye size={16} className="mr-2" />
                        Ver Detalhes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/erp/colaboradores/${collaborator.id}/editar`}>
                        <Edit size={16} className="mr-2" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield size={16} className="mr-2" />
                      Permissões
                    </DropdownMenuItem>
                    {onDeleteCollaborator && (
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => onDeleteCollaborator(collaborator.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Cargo: {collaborator.role}</span>
              {getStatusBadge(collaborator)}
            </div>

            <div className="text-sm text-gray-500">
              Último acesso: {new Date(collaborator.lastAccess).toLocaleDateString("pt-BR")}
            </div>
          </div>
        ))}
      </div>

      {collaborators.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum colaborador encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicionar novos colaboradores.</p>
        </div>
      )}
    </div>
  )
}
