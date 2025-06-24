import type { Metadata } from "next"
import Link from "next/link"
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | Like Kar",
  description: "Painel administrativo da Like Kar",
}

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao painel administrativo da Like Kar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total de Produtos</p>
              <h3 className="text-2xl font-bold">124</h3>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500 font-medium">↑ 12%</span> desde o último mês
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pedidos Recentes</p>
              <h3 className="text-2xl font-bold">43</h3>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500 font-medium">↑ 8%</span> desde o último mês
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Clientes Ativos</p>
              <h3 className="text-2xl font-bold">512</h3>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500 font-medium">↑ 15%</span> desde o último mês
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Receita Mensal</p>
              <h3 className="text-2xl font-bold">R$ 42.500</h3>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-red-500 font-medium">↓ 3%</span> desde o último mês
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/produtos/criar"
            className="bg-yellow-400 text-black px-4 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all text-center"
          >
            Adicionar Novo Produto
          </Link>
          <Link
            href="/dashboard/pedidos"
            className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all text-center"
          >
            Ver Pedidos Recentes
          </Link>
          <Link
            href="/dashboard/clientes"
            className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all text-center"
          >
            Gerenciar Clientes
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Produto adicionado: Central Multimídia Pioneer DMH-ZS9280TV</p>
                <p className="text-gray-500 text-sm">Há 2 horas atrás</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
