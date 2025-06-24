"use client"

import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"

export function DashboardChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("7 dias")
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([])

  const periods = ["7 dias", "30 dias", "Ano"]

  // Dados do gráfico conforme a imagem
  const chartData = [
    { day: "SEG/06", dayMobile: "SEG", value: 45000, height: 60 },
    { day: "TER/07", dayMobile: "TER", value: 55000, height: 75 },
    { day: "QUA/08", dayMobile: "QUA", value: 60000, height: 85 },
    { day: "QUI/09", dayMobile: "QUI", value: 50000, height: 70 },
    { day: "SEX/10", dayMobile: "SEX", value: 40000, height: 55 },
    { day: "SÁB/11", dayMobile: "SÁB", value: 45000, height: 60 },
    { day: "DOM/12", dayMobile: "DOM", value: 35000, height: 45 },
  ]

  useEffect(() => {
    // Animação das barras ao carregar
    const timer = setTimeout(() => {
      setAnimatedHeights(chartData.map((data) => data.height))
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {/* Header do gráfico - Responsivo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Tendência de visitas</h3>
          </div>
          <p className="text-gray-600 text-sm md:text-base ml-0 md:ml-13">Movimento de clientes nos últimos 7 dias</p>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg md:rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                selectedPeriod === period
                  ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico de Barras - Responsivo */}
      <div className="relative bg-gradient-to-br from-gray-50 to-yellow-50/30 rounded-lg md:rounded-xl p-3 md:p-6">
        {/* Eixo Y - Responsivo */}
        <div className="absolute left-2 md:left-6 top-3 md:top-6 h-48 md:h-64 flex flex-col justify-between text-xs text-gray-500 font-medium">
          <span className="text-xs md:text-sm">60k</span>
          <span className="text-xs md:text-sm">45k</span>
          <span className="text-xs md:text-sm">30k</span>
          <span className="text-xs md:text-sm">15k</span>
          <span className="text-xs md:text-sm">0</span>
        </div>

        {/* Área do gráfico - Responsivo */}
        <div className="ml-8 md:ml-20 h-48 md:h-64 flex items-end justify-between space-x-1 md:space-x-3">
          {chartData.map((data, index) => (
            <div key={data.day} className="flex flex-col items-center flex-1 group">
              <div className="relative w-full">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 rounded-t-sm md:rounded-t-lg transition-all duration-1000 ease-out hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-200 shadow-lg group-hover:shadow-xl relative overflow-hidden"
                  style={{
                    height: `${animatedHeights[index] || 0}%`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                  {/* Tooltip no hover - apenas desktop */}
                  <div className="hidden md:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    R$ {data.value.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-600 mt-2 md:mt-3 font-medium transform group-hover:text-yellow-600 transition-colors duration-300">
                <span className="block md:hidden">{data.dayMobile}</span>
                <span className="hidden md:block">{data.day}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Linha de base decorativa */}
        <div className="ml-8 md:ml-20 mt-1 md:mt-2 h-0.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-full"></div>
      </div>

      {/* Resumo - Responsivo */}
      <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-yellow-200 space-y-2 md:space-y-0">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-gray-700 font-medium text-sm md:text-base">Total de visitas: 330.000</span>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUp size={14} className="md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-bold">+15% vs semana anterior</span>
        </div>
      </div>
    </div>
  )
}
