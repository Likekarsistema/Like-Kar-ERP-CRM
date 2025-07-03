import { Users, Target, BarChart3, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  leadsCount: number
  customersCount: number
  opportunitiesCount: number
}

export function DashboardStats({ leadsCount, customersCount, opportunitiesCount }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total de Leads",
      value: leadsCount,
      icon: Target,
      change: "+12%",
      changeType: "positive" as const,
      color: "yellow",
    },
    {
      title: "Carrinho perdido",
      value: customersCount,
      icon: Users,
      change: "+8%",
      changeType: "positive" as const,
      color: "blue",
    },
    {
      title: "Oportunidades",
      value: opportunitiesCount,
      icon: BarChart3,
      change: "+23%",
      changeType: "positive" as const,
      color: "green",
    },
    {
      title: "Taxa de Conversão",
      value: "24%",
      icon: TrendingUp,
      change: "+5%",
      changeType: "positive" as const,
      color: "purple",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                stat.color === "yellow"
                  ? "bg-yellow-100"
                  : stat.color === "blue"
                    ? "bg-blue-100"
                    : stat.color === "green"
                      ? "bg-green-100"
                      : "bg-purple-100"
              }`}
            >
              <stat.icon
                className={`h-6 w-6 ${
                  stat.color === "yellow"
                    ? "text-yellow-600"
                    : stat.color === "blue"
                      ? "text-blue-600"
                      : stat.color === "green"
                        ? "text-green-600"
                        : "text-purple-600"
                }`}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">vs. mês anterior</span>
          </div>
        </div>
      ))}
    </div>
  )
}
