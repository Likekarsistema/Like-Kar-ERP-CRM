"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  LogOut,
  Package,
  FileText,
  Tag,
  Users,
  Truck,
  User,
  ShoppingCart,
  DollarSign,
  CreditCard,
} from "lucide-react"
import { signOutAction } from "@/app/auth/actions"

interface CrmHeaderHorizontalProps {
  user?: {
    id?: string
    email?: string
    user_metadata?: {
      full_name?: string
    }
  }
}

export function CrmHeaderHorizontal({ user }: CrmHeaderHorizontalProps) {
  const pathname = usePathname()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [cadastrosOpen, setCadastrosOpen] = useState(false)
  const [vendasOpen, setVendasOpen] = useState(false)
  const [comprasOpen, setComprasOpen] = useState(false)
  const [estoqueOpen, setEstoqueOpen] = useState(false)
  const [financeiroOpen, setFinanceiroOpen] = useState(false)

  const cadastrosItems = [
    { label: "Produtos", href: "/crm/produtos", icon: Package },
    { label: "Serviços", href: "/crm/servicos", icon: FileText },
    { label: "Categorias de Produtos", href: "/crm/categorias", icon: Tag },
    { label: "Clientes", href: "/crm/clientes", icon: Users },
    { label: "Fornecedores", href: "/crm/fornecedores", icon: Truck },
    { label: "Colaboradores", href: "/crm/colaboradores", icon: User },
  ]

  const vendasItems = [
    { label: "Orçamentos", href: "/crm/orcamentos", icon: FileText },
    { label: "Vendas", href: "/crm/vendas", icon: DollarSign },
  ]

  const comprasItems = [
    { label: "Pedidos de Compra", href: "/crm/pedidos-compra", icon: ShoppingCart },
    { label: "Fornecedores", href: "/crm/fornecedores", icon: Truck },
  ]

  const estoqueItems = [
    { label: "Produtos", href: "/crm/produtos", icon: Package },
    { label: "Movimentações", href: "/crm/movimentacoes", icon: FileText },
  ]

  const financeiroItems = [
    { label: "Contas a Receber", href: "/crm/contas-receber", icon: DollarSign },
    { label: "Contas a Pagar", href: "/crm/contas-pagar", icon: CreditCard },
    { label: "Fluxo de Caixa", href: "/crm/fluxo-caixa", icon: FileText },
  ]

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário"

  const closeAllDropdowns = () => {
    setCadastrosOpen(false)
    setVendasOpen(false)
    setComprasOpen(false)
    setEstoqueOpen(false)
    setFinanceiroOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo e Menu Principal */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/crm/dashboard" className="flex items-center" onClick={closeAllDropdowns}>
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-md p-1">
              <Image
                src="/images/like-kar-logo.png"
                alt="Like Kar Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Menu Horizontal */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Cadastros */}
            <div className="relative">
              <button
                onClick={() => {
                  setCadastrosOpen(!cadastrosOpen)
                  setVendasOpen(false)
                  setComprasOpen(false)
                  setEstoqueOpen(false)
                  setFinanceiroOpen(false)
                }}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  cadastrosOpen ||
                  pathname.includes("/produtos") ||
                  pathname.includes("/clientes") ||
                  pathname.includes("/servicos")
                    ? "text-yellow-600 bg-yellow-50 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Cadastros</span>
                <ChevronDown size={16} className={`transition-transform ${cadastrosOpen ? "rotate-180" : ""}`} />
              </button>

              {cadastrosOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {cadastrosItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Vendas */}
            <div className="relative">
              <button
                onClick={() => {
                  setVendasOpen(!vendasOpen)
                  setCadastrosOpen(false)
                  setComprasOpen(false)
                  setEstoqueOpen(false)
                  setFinanceiroOpen(false)
                }}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  vendasOpen || pathname.includes("/orcamentos") || pathname.includes("/vendas")
                    ? "text-yellow-600 bg-yellow-50 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Vendas</span>
                <ChevronDown size={16} className={`transition-transform ${vendasOpen ? "rotate-180" : ""}`} />
              </button>

              {vendasOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {vendasItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Compras */}
            <div className="relative">
              <button
                onClick={() => {
                  setComprasOpen(!comprasOpen)
                  setCadastrosOpen(false)
                  setVendasOpen(false)
                  setEstoqueOpen(false)
                  setFinanceiroOpen(false)
                }}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  comprasOpen
                    ? "text-yellow-600 bg-yellow-50 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Compras</span>
                <ChevronDown size={16} className={`transition-transform ${comprasOpen ? "rotate-180" : ""}`} />
              </button>

              {comprasOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {comprasItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Estoque */}
            <div className="relative">
              <button
                onClick={() => {
                  setEstoqueOpen(!estoqueOpen)
                  setCadastrosOpen(false)
                  setVendasOpen(false)
                  setComprasOpen(false)
                  setFinanceiroOpen(false)
                }}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  estoqueOpen
                    ? "text-yellow-600 bg-yellow-50 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Estoque</span>
                <ChevronDown size={16} className={`transition-transform ${estoqueOpen ? "rotate-180" : ""}`} />
              </button>

              {estoqueOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {estoqueItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Financeiro */}
            <div className="relative">
              <button
                onClick={() => {
                  setFinanceiroOpen(!financeiroOpen)
                  setCadastrosOpen(false)
                  setVendasOpen(false)
                  setComprasOpen(false)
                  setEstoqueOpen(false)
                }}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  financeiroOpen || pathname.includes("/contas-")
                    ? "text-yellow-600 bg-yellow-50 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>Financeiro</span>
                <ChevronDown size={16} className={`transition-transform ${financeiroOpen ? "rotate-180" : ""}`} />
              </button>

              {financeiroOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {financeiroItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Menu do Usuário */}
        <div className="relative">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen)
              closeAllDropdowns()
            }}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">{userName}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Link
                href="/crm/perfil"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setUserMenuOpen(false)}
              >
                <span>Meu Perfil</span>
              </Link>
              <Link
                href="/crm/configuracoes"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setUserMenuOpen(false)}
              >
                <span>Configurações</span>
              </Link>
              <hr className="my-2" />
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para fechar dropdowns */}
      {(cadastrosOpen || vendasOpen || comprasOpen || estoqueOpen || financeiroOpen) && (
        <div className="fixed inset-0 z-40" onClick={closeAllDropdowns} />
      )}
    </header>
  )
}
