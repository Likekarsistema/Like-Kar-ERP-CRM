"use client"

import { useState, useEffect } from "react"
import { Target, TrendingUp } from "lucide-react"

export function MonthlyGoals() {
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([0, 0, 0])

  const goals = [
    {
      title: "Acessórios instalados",
      subtitle: "Meta: 50 acessórios",
      progress: 75,
      current: 38,
      target: 50,
      color: "yellow",
      trend: "+12%",
    },
    {
      title: "Atendimentos realizados",
      subtitle: "Meta: 100 atendimentos",
      progress: 60,
      current: 60,
      target: 100,
      color: "blue",
      trend: "+8%",
    },
    {
      title: "Satisfação dos clientes",
      subtitle: "Meta: 95% de satisfação",
      progress: 90,
      current: 85,
      target: 95,
      color: "green",
      trend: "+5%",
    },
  ]

  useEffect(() => {
    // Animação das barras de progresso
    const timer = setTimeout(() => {
      setAnimatedProgress(goals.map((goal) => goal.progress))
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Metas do mês</h3>
            <p className="text-gray-500 text-sm">Acompanhe seu progresso</p>
          </div>
        </div>
        <div className="bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
          <span className="text-yellow-600 text-sm font-bold">Junho</span>
        </div>
      </div>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="group space-y-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-yellow-50/50 transition-all duration-300"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                    goal.color === "yellow"
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                      : goal.color === "blue"
                        ? "bg-gradient-to-br from-blue-400 to-blue-600"
                        : "bg-gradient-to-br from-green-400 to-green-600"
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {goal.title}
                  </p>
                  <p className="text-sm text-gray-500">{goal.subtitle}</p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {goal.current}/{goal.target}
                  </span>
                  <div className="flex items-center space-x-1 text-green-600 text-xs">
                    <TrendingUp size={12} />
                    <span className="font-medium">{goal.trend}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{goal.progress}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                    goal.color === "yellow"
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                      : goal.color === "blue"
                        ? "bg-gradient-to-r from-blue-400 to-blue-600"
                        : "bg-gradient-to-r from-green-400 to-green-600"
                  }`}
                  style={{
                    width: `${animatedProgress[index]}%`,
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  {/* Brilho animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              </div>

              {/* Indicadores de marco */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo do mês */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">Progresso geral do mês</span>
          </div>
          <span className="text-yellow-600 font-bold text-lg">75%</span>
        </div>
      </div>
    </div>
  )
}
