"use client"

import Link from "next/link"
import { Plus, Users, Car, FileText, BarChart3 } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Novo Cliente",
      description: "Cadastrar cliente",
      href: "/erp/clientes/novo",
      icon: Users,
      color: "blue",
    },
    {
      title: "Novo Produto",
      description: "Adicionar produto",
      href: "/erp/produtos/criar",
      icon: Car,
      color: "green",
    },
    {
      title: "Novo Orçamento",
      description: "Criar orçamento",
      href: "/erp/orcamentos/novo",
      icon: FileText,
      color: "yellow",
    },
    {
      title: "Relatórios",
      description: "Ver relatórios",
      href: "/erp/relatorios",
      icon: BarChart3,
      color: "purple",
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Plus className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
      </div>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action.color === "blue"
                  ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                  : action.color === "green"
                    ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                    : action.color === "yellow"
                      ? "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200"
                      : "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
              }`}
            >
              <action.icon size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
