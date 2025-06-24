import {
  BarChart3,
  DollarSign,
  Home,
  ListChecks,
  type LucideIcon,
  Plus,
  ShoppingBag,
  Tag,
  TrendingDown,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  disabled?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navigationItems: NavSection[] = [
  {
    title: "Geral",
    items: [
      {
        title: "Dashboard",
        href: "/crm",
        icon: Home,
      },
    ],
  },
  {
    title: "Clientes",
    items: [
      {
        title: "Listagem de Clientes",
        href: "/crm/clientes",
        icon: User,
      },
      {
        title: "Adicionar Novo Cliente",
        href: "/crm/clientes/novo",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Oportunidades",
    items: [
      {
        title: "Listagem de Oportunidades",
        href: "/crm/oportunidades",
        icon: ShoppingBag,
      },
      {
        title: "Criar Oportunidade",
        href: "/crm/oportunidades/nova",
        icon: Plus,
      },
    ],
  },
  {
    title: "Tarefas",
    items: [
      {
        title: "Listagem de Tarefas",
        href: "/crm/tarefas",
        icon: ListChecks,
      },
      {
        title: "Criar Tarefa",
        href: "/crm/tarefas/nova",
        icon: Plus,
      },
    ],
  },
  {
    title: "Financeiro",
    items: [
      {
        title: "Dashboard Financeiro",
        href: "/financeiro/dashboard",
        icon: DollarSign,
      },
      {
        title: "Contas a Receber",
        href: "/financeiro/contas-receber",
        icon: TrendingUp,
      },
      {
        title: "Contas a Pagar",
        href: "/financeiro/contas-pagar",
        icon: TrendingDown,
      },
      {
        title: "Fluxo de Caixa",
        href: "/financeiro/fluxo-caixa",
        icon: BarChart3,
      },
      {
        title: "Categorias Financeiras",
        href: "/financeiro/categorias",
        icon: Tag,
      },
    ],
  },
]

export default function CRMSidebarVertical() {
  return (
    <div className="flex flex-col h-full space-y-4 py-4 text-sm">
      {navigationItems.map((section) => (
        <div key={section.title}>
          <h4 className="mb-1 rounded-md px-2 text-sm font-semibold">{section.title}</h4>
          {section.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}
