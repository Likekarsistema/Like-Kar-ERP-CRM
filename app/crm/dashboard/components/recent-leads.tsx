import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Construction } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  company: string
  status: string
  priority: string
  created_at: string
}

interface RecentLeadsProps {
  leads?: Lead[]
  inDevelopment?: boolean
}

export function RecentLeads({ leads = [], inDevelopment = false }: RecentLeadsProps) {
  if (inDevelopment) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Leads Recentes</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Construction className="h-16 w-16 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Em Desenvolvimento</h3>
          <p className="text-gray-500 max-w-md">
            Esta funcionalidade está sendo implementada e estará disponível em breve.
          </p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800"
      case "contacted":
        return "bg-blue-100 text-blue-800"
      case "qualified":
        return "bg-green-100 text-green-800"
      case "lost":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Leads Recentes</h3>
        <a href="/crm/leads" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
          Ver todos
        </a>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum lead encontrado</p>
          <a href="/crm/leads" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-2 inline-block">
            Adicionar primeiro lead
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{lead.name}</h4>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                    {lead.company && <p className="text-xs text-gray-500">{lead.company}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Badge className={getPriorityColor(lead.priority)}>
                  {lead.priority === "high" ? "Alta" : lead.priority === "medium" ? "Média" : "Baixa"}
                </Badge>
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status === "new"
                    ? "Novo"
                    : lead.status === "contacted"
                      ? "Contatado"
                      : lead.status === "qualified"
                        ? "Qualificado"
                        : "Perdido"}
                </Badge>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(lead.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
