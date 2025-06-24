"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"
import { signOutAction } from "../../auth/actions"

interface UserData {
  email: string
  full_name: string
  phone?: string
}

export function AccountDashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento dos dados do usuário
    // Em um ambiente real, isso viria do Supabase
    setTimeout(() => {
      setUserData({
        email: "usuario@exemplo.com",
        full_name: "João Silva",
        phone: "(11) 99999-9999",
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleLogout = async () => {
    await signOutAction()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-yellow-400 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Carregando sua conta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
            <p className="text-gray-600">Bem-vindo de volta, {userData?.full_name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
            <User className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Perfil</h3>
            <p className="text-sm text-gray-600">Editar informações pessoais</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
            <Package className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Pedidos</h3>
            <p className="text-sm text-gray-600">Acompanhar seus pedidos</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
            <Heart className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Favoritos</h3>
            <p className="text-sm text-gray-600">Produtos salvos</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
            <Settings className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Configurações</h3>
            <p className="text-sm text-gray-600">Preferências da conta</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações da Conta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <p className="text-gray-900">{userData?.full_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <p className="text-gray-900">{userData?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <p className="text-gray-900">{userData?.phone || "Não informado"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status da Conta</label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Ativa
            </span>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  )
}
