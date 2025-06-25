import type { Metadata } from "next"
import { DashboardChart } from "./components/dashboard-chart"
import { TasksList } from "./components/tasks-list"
import { MonthlyGoals } from "./components/monthly-goals"
import { Car, Users, ShoppingCart, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard CRM | Like Kar",
  description: "Painel de controle do CRM Like Kar",
}

export default function CrmDashboardPage() {
  const currentDate = new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/30 to-orange-50/20">
      <div className="space-y-8 p-3 md:p-6">
        {/* Cabeçalho Simplificado */}
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-2xl shadow-xl">
          {/* Elementos decorativos - apenas desktop */}
          <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
          <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-bounce"></div>

          {/* Layout Desktop */}
          <div className="hidden md:block p-8">
            <div className="relative flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Bem-vindo ao Like Kar</h1>
              </div>
              <div className="text-right text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-lg font-semibold">
                    {currentDate.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-yellow-100 text-sm mt-1">
                    {currentDate.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Layout Mobile - Apenas título e data */}
          <div className="block md:hidden p-6">
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold text-white">Bem-vindo ao Like Kar</h1>
                </div>
                <div className="text-right text-white bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-semibold">
                    {currentDate.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-yellow-100 text-xs mt-1">
                    {currentDate.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas Responsivos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {/* Veículos na Loja */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full -translate-y-8 md:-translate-y-10 translate-x-8 md:translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative flex items-center justify-between mb-3 md:mb-4">
              <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Car className="w-4 md:w-6 h-4 md:h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 bg-green-50 px-2 md:px-3 py-1 rounded-full border border-green-200">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-600 text-xs md:text-sm font-bold">+3%</span>
              </div>
            </div>
            <div className="relative space-y-1 md:space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                13
              </h3>
              <p className="text-gray-700 font-semibold text-sm md:text-base">Veículos na Loja</p>
              <p className="text-gray-500 text-xs md:text-sm hidden md:block">Veículos disponíveis para venda</p>
              <div className="flex items-center space-x-2 mt-2 md:mt-3">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <p className="text-gray-400 text-xs">Atualizado agora</p>
              </div>
            </div>
          </div>

          {/* Clientes Atendidos */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-400/20 to-blue-400/20 rounded-full -translate-y-8 md:-translate-y-10 translate-x-8 md:translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative flex items-center justify-between mb-3 md:mb-4">
              <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Users className="w-4 md:w-6 h-4 md:h-6 text-white" />
              </div>
              <div className="bg-blue-50 px-2 md:px-3 py-1 rounded-full border border-blue-200">
                <span className="text-blue-600 text-xs md:text-sm font-bold">Hoje</span>
              </div>
            </div>
            <div className="relative space-y-1 md:space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                24
              </h3>
              <p className="text-gray-700 font-semibold text-sm md:text-base">Clientes Atendidos</p>
              <p className="text-gray-500 text-xs md:text-sm hidden md:block">Clientes que visitaram a loja</p>
              <div className="flex items-center space-x-2 mt-2 md:mt-3">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <p className="text-gray-400 text-xs">Atendimentos do dia</p>
              </div>
            </div>
          </div>

          {/* Vendas Realizadas */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full -translate-y-8 md:-translate-y-10 translate-x-8 md:translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative flex items-center justify-between mb-3 md:mb-4">
              <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <ShoppingCart className="w-4 md:w-6 h-4 md:h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 bg-yellow-50 px-2 md:px-3 py-1 rounded-full border border-yellow-200">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-600 text-xs md:text-sm font-bold">+12%</span>
              </div>
            </div>
            <div className="relative space-y-1 md:space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                3
              </h3>
              <p className="text-gray-700 font-semibold text-sm md:text-base">Vendas Realizadas</p>
              <p className="text-gray-500 text-xs md:text-sm hidden md:block">Vendas concluídas hoje</p>
              <div className="flex items-center space-x-2 mt-2 md:mt-3">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <p className="text-gray-400 text-xs">Última venda às 12:48</p>
              </div>
            </div>
          </div>

          {/* Taxa de Conversão */}
          <div className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-yellow-400/20 to-purple-400/20 rounded-full -translate-y-8 md:-translate-y-10 translate-x-8 md:translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative flex items-center justify-between mb-3 md:mb-4">
              <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Target className="w-4 md:w-6 h-4 md:h-6 text-white" />
              </div>
              <div className="bg-purple-50 px-2 md:px-3 py-1 rounded-full border border-purple-200">
                <span className="text-purple-600 text-xs md:text-sm font-bold">Este mês</span>
              </div>
            </div>
            <div className="relative space-y-1 md:space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                25%
              </h3>
              <p className="text-gray-700 font-semibold text-sm md:text-base">Taxa de Conversão</p>
              <p className="text-gray-500 text-xs md:text-sm hidden md:block">Clientes que realizaram compra</p>
              <div className="flex items-center space-x-2 mt-2 md:mt-3">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full animate-ping"></div>
                <p className="text-gray-400 text-xs">Atualizado semanalmente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Tendência */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-xl p-4 md:p-8 hover:shadow-2xl transition-all duration-500">
          <DashboardChart />
        </div>

        {/* Grid de Tarefas e Metas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <TasksList />
          <MonthlyGoals />
        </div>
      </div>
    </div>
  )
}
