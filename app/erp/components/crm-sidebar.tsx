"use client"

import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  Calendar,
  Home,
  Calculator,
  TrendingUp,
  ShoppingCart,
  UserCheck,
  RotateCcw,
  ShoppingBag,
  ListChecks,
} from "lucide-react"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  href: string
  icon: any
  current: boolean
}

const CrmSidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/erp/dashboard", mobileIcon: Home },
    { icon: TrendingUp, label: "Vendas", href: "/erp/vendas" },
    { icon: Users, label: "Clientes", href: "/erp/clientes" },
    { icon: Calculator, label: "Orçamentos", href: "/erp/orcamentos" },
    { icon: ShoppingCart, label: "Pedidos Compra", href: "/erp/pedidos-compra" },
    { icon: UserCheck, label: "Colaboradores", href: "/erp/colaboradores" },
    { icon: Package, label: "Produtos", href: "/erp/produtos" },
    { icon: RotateCcw, label: "Movimentações", href: "/erp/movimentacoes" },
    { icon: Calendar, label: "Agenda", href: "/erp/agenda" },
    { icon: Settings, label: "Configurações", href: "/erp/configuracoes" },
  ]

  const overviewLinks: NavItem[] = [
    {
      name: "Dashboard",
      href: "/crm",
      icon: LayoutDashboard,
      current: pathname === "/crm",
    },
  ]

  const productLinks: NavItem[] = [
    {
      name: "Produtos",
      href: "/erp/produtos",
      icon: ShoppingBag,
      current: pathname === "/erp/produtos",
    },
    {
      name: "Estoque",
      href: "/erp/estoque",
      icon: Package,
      current: pathname === "/erp/estoque",
    },
  ]

  const customerLinks: NavItem[] = [
    {
      name: "Clientes",
      href: "/erp/clientes",
      icon: Users,
      current: pathname === "/erp/clientes",
    },
  ]

  const orderLinks: NavItem[] = [
    {
      name: "Pedidos",
      href: "/erp/pedidos",
      icon: ListChecks,
      current: pathname === "/erp/pedidos",
    },
  ]

  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <h2 className="text-lg font-semibold mb-4">CRM</h2>

      <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Visão Geral</h3>
      <ul>
        {overviewLinks.map((link) => (
          <li key={link.name} className="mb-1">
            <a
              href={link.href}
              className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${
                link.current ? "bg-gray-200 font-medium" : ""
              }`}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Produtos</h3>
      <ul>
        {productLinks.map((link) => (
          <li key={link.name} className="mb-1">
            <a
              href={link.href}
              className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${
                link.current ? "bg-gray-200 font-medium" : ""
              }`}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Clientes</h3>
      <ul>
        {customerLinks.map((link) => (
          <li key={link.name} className="mb-1">
            <a
              href={link.href}
              className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${
                link.current ? "bg-gray-200 font-medium" : ""
              }`}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <h3 className="text-sm font-medium text-gray-500 mt-4 mb-2">Pedidos</h3>
      <ul>
        {orderLinks.map((link) => (
          <li key={link.name} className="mb-1">
            <a
              href={link.href}
              className={`flex items-center p-2 rounded-md hover:bg-gray-200 ${
                link.current ? "bg-gray-200 font-medium" : ""
              }`}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CrmSidebar
