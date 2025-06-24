"use client"

import { Clock, User, ShoppingCart, FileText, Settings } from "lucide-react"

export function RecentActivities() {
  const activities = [
    {
      type: "customer",
      title: "Novo cliente cadastrado",
      description: "João Silva foi adicionado ao sistema",
      time: "2 min atrás",
      icon: User,
      color: "blue",
    },
    {
      type: "sale",
      title: "Venda realizada",
      description: "Polo Halógena vendida para Maria Santos",
      time: "15 min atrás",
      icon: ShoppingCart,
      color: "green",
    },
    {
      type: "quote",
      title: "Orçamento criado",
      description: "Orçamento #1234 para Carlos Oliveira",
      time: "1 hora atrás",
      icon: FileText,
      color: "yellow",
    },
    {
      type: "system",
      title: "Backup realizado",
      description: "Backup automático dos dados concluído",
      time: "2 horas atrás",
      icon: Settings,
      color: "gray",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activity.color === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : activity.color === "green"
                    ? "bg-green-100 text-green-600"
                    : activity.color === "yellow"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
              }`}
            >
              <activity.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
