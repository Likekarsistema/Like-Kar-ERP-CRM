import {
  AlignJustify,
  BarChart,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  Package,
  PieChart,
  Settings,
  ShoppingBag,
  Tag,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react"

import type { MainNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentação",
      href: "/docs",
    },
    {
      title: "Suporte",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Geral",
      items: [
        {
          title: "Visão Geral",
          href: "/dashboard",
          icon: LayoutDashboard,
          description: "Visão geral do seu negócio.",
        },
      ],
    },
    {
      title: "Vendas",
      items: [
        {
          title: "Produtos",
          href: "/vendas/produtos",
          icon: Package,
          description: "Gerencie seus produtos.",
        },
        {
          title: "Pedidos",
          href: "/vendas/pedidos",
          icon: ShoppingBag,
          description: "Gerencie seus pedidos.",
        },
        {
          title: "Clientes",
          href: "/vendas/clientes",
          icon: User,
          description: "Gerencie seus clientes.",
        },
      ],
    },
    {
      title: "Financeiro",
      items: [
        {
          title: "Contas a Receber",
          href: "/financeiro/contas-a-receber",
          icon: CreditCard,
          description: "Gerencie suas contas a receber.",
        },
        {
          title: "Contas a Pagar",
          href: "/financeiro/contas-a-pagar",
          icon: Wallet,
          description: "Gerencie suas contas a pagar.",
        },
        {
          icon: Tag,
          label: "Categorias de Finanças",
          href: "/financeiro/categorias-financas",
          description: "Organize suas categorias financeiras",
        },
        {
          title: "Fluxo de Caixa",
          href: "/financeiro/fluxo-de-caixa",
          icon: TrendingUp,
          description: "Acompanhe seu fluxo de caixa.",
        },
        {
          title: "Relatórios Financeiros",
          href: "/financeiro/relatorios",
          icon: BarChart,
          description: "Analise seus relatórios financeiros.",
        },
      ].map((item) => ({ ...item, label: item.label ? item.label : item.title })),
    },
    {
      title: "Tarefas",
      items: [
        {
          title: "Lista de Tarefas",
          href: "/tarefas/lista",
          icon: ListChecks,
          description: "Gerencie suas tarefas.",
        },
        {
          title: "Projetos",
          href: "/tarefas/projetos",
          icon: AlignJustify,
          description: "Gerencie seus projetos.",
        },
        {
          title: "Calendário",
          href: "/tarefas/calendario",
          icon: Calendar,
          description: "Gerencie seu calendário.",
        },
      ],
    },
    {
      title: "Relatórios",
      items: [
        {
          title: "Relatórios de Vendas",
          href: "/relatorios/vendas",
          icon: PieChart,
          description: "Analise seus relatórios de vendas.",
        },
        {
          title: "Relatórios de Desempenho",
          href: "/relatorios/desempenho",
          icon: FileText,
          description: "Analise seus relatórios de desempenho.",
        },
      ],
    },
    {
      title: "Configurações",
      items: [
        {
          title: "Configurações da Conta",
          href: "/configuracoes/conta",
          icon: Settings,
          description: "Gerencie suas configurações de conta.",
        },
      ],
    },
  ],
}

export interface SidebarNavItem {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
  label?: string
  description?: string
  items: SidebarNavItem[]
  href?: string
}
;("use client")

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detectar scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 shadow-lg py-2" : "bg-black py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIKE%20KAR%20%281%29-GhqLT1V6Xg5zFPyWk7o4TiKtJyIHdw.png"
            alt="LIKE KAR Logo"
            width={180}
            height={45}
            className="h-12 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white font-medium hover:text-yellow-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
          >
            Início
          </Link>
          <Link
            href="/servicos"
            className="text-white font-medium hover:text-yellow-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
          >
            Serviços
          </Link>

          {/* Financeiro Dropdown */}
          <div className="relative group">
            <button className="text-white font-medium hover:text-yellow-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full">
              Financeiro
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link
                  href="/financeiro/contas-receber"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  💰 Contas a Receber
                </Link>
                <Link
                  href="/financeiro/contas-pagar"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  💳 Contas a Pagar
                </Link>
                <Link
                  href="/financeiro/categorias-financas"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  🏷️ Categorias de Finanças
                </Link>
                <Link
                  href="/financeiro/fluxo-caixa"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  📊 Fluxo de Caixa
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/contato"
            className="text-white font-medium hover:text-yellow-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
          >
            Contato
          </Link>
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <Link
            href="https://wa.me/551145740701"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black px-5 py-2.5 rounded-full font-medium hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Fale conosco
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white z-20" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black/95 z-10 flex flex-col p-10 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-6 mt-16">
            <Link
              href="/"
              className="text-xl font-medium text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/servicos"
              className="text-xl font-medium text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </Link>

            {/* Mobile Financeiro Menu */}
            <div className="space-y-3">
              <div className="text-xl font-medium text-yellow-400">Financeiro</div>
              <div className="pl-4 space-y-3">
                <Link
                  href="/financeiro/contas-receber"
                  className="block text-lg text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contas a Receber
                </Link>
                <Link
                  href="/financeiro/contas-pagar"
                  className="block text-lg text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contas a Pagar
                </Link>
                <Link
                  href="/financeiro/categorias-financas"
                  className="block text-lg text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categorias de Finanças
                </Link>
                <Link
                  href="/financeiro/fluxo-caixa"
                  className="block text-lg text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fluxo de Caixa
                </Link>
              </div>
            </div>

            <Link
              href="/contato"
              className="text-xl font-medium text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              href="https://wa.me/551145740701"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors mt-4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
