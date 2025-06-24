"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"

export function TrendChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("7 dias")

  const periods = ["7 dias", "30 dias", "Ano"]

  // Dados simulados para o gráfico
  const chartData = [
    { day: "Seg", visits: 12, sales: 2 },
    { day: "Ter", visits: 19, sales: 3 },
    { day: "Qua", visits: 15, sales: 1 },
    { day: "Qui", visits: 22, sales: 4 },
    { day: "Sex", visits: 28, sales: 5 },
    { day: "Sáb", visits: 35, sales: 6 },
    { day: "Dom", visits: 20, sales: 2 },
  ]

  const maxVisits = Math.max(...chartData.map((d) => d.visits))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Tendência de Visitas</h3>
            <p className="text-sm text-gray-600">Movimento de clientes nos últimos 7 dias</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                selectedPeriod === period ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico de Barras Simples */}
      <div className="space-y-4">
        {chartData.map((data, index) => (
          <div key={data.day} className="flex items-center space-x-4">
            <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(data.visits / maxVisits) * 100}%` }}
                ></div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm font-medium text-gray-900">{data.visits}</span>
                <span className="text-xs text-gray-500 ml-1">visitas</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total de visitas esta semana:</span>
          <span className="font-semibold text-gray-900">{chartData.reduce((sum, data) => sum + data.visits, 0)}</span>
        </div>
      </div>
    </div>
  )
}
