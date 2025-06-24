"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DollarSign, TrendingUp, TrendingDown, BarChart3, Tag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function FinanceiroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isFinanceiroOpen, setIsFinanceiroOpen] = useState(true)

  const financeiroMenuItems = [
    {
      icon: TrendingUp,
      label: "Contas a Receber",
      href: "/financeiro/contas-receber",
      description: "Gerencie contas a receber",
    },
    {
      icon: TrendingDown,
      label: "Contas a Pagar",
      href: "/financeiro/contas-pagar",
      description: "Gerencie contas a pagar",
    },
    {
      icon: Tag,
      label: "Categorias de Finanças",
      href: "/financeiro/categorias-financas",
      description: "Organize suas categorias financeiras",
    },
    {
      icon: BarChart3,
      label: "Fluxo de Caixa",
      href: "/financeiro/fluxo-caixa",
      description: "Controle o fluxo de caixa",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/crm/dashboard" className="text-gray-500 hover:text-gray-700">
              ← Voltar ao CRM
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <h1 className="text-xl font-semibold text-gray-900">Financeiro</h1>
            </div>
          </div>

          {/* Dropdown Menu for Mobile/Quick Access */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Financeiro</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {financeiroMenuItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center space-x-3 p-3">
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-1">
              {financeiroMenuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-yellow-50 text-yellow-600 border-r-2 border-yellow-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon size={20} className={isActive ? "text-yellow-600" : "text-gray-500"} />
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
