"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function SalesChart() {
  const [chartData, setChartData] = useState([
    { name: "Jan", vendas: 4000 },
    { name: "Fev", vendas: 3000 },
    { name: "Mar", vendas: 5000 },
    { name: "Abr", vendas: 2780 },
    { name: "Mai", vendas: 1890 },
    { name: "Jun", vendas: 2390 },
    { name: "Jul", vendas: 3490 },
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Desempenho de Vendas</h2>
        <div className="flex items-center space-x-2">
          <select className="text-sm border-gray-300 rounded-md">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vendas" fill="#FBBF24" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
