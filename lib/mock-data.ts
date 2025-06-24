// Tipos existentes...
export interface PurchaseOrder {
  id: string
  number: string
  supplier: string
  supplierEmail: string
  supplierPhone: string
  status: "pendente" | "aprovado" | "enviado" | "recebido" | "cancelado"
  priority: "baixa" | "media" | "alta" | "urgente"
  orderDate: string
  expectedDate: string
  receivedDate?: string
  total: number
  items: {
    productId: string
    productName: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  notes?: string
  createdBy: string
  department: string
}

export interface Sale {
  id: string
  number: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
    document: string
  }
  vehicle?: {
    brand: string
    model: string
    year: number
    plate: string
  }
  status: "orcamento" | "aprovado" | "em_andamento" | "concluido" | "cancelado"
  type: "produto" | "servico" | "ambos"
  saleDate: string
  deliveryDate?: string
  paymentMethod: "dinheiro" | "cartao_credito" | "cartao_debito" | "pix" | "boleto" | "financiamento"
  paymentStatus: "pendente" | "parcial" | "pago" | "atrasado"
  subtotal: number
  discount: number
  total: number
  items: {
    type: "produto" | "servico"
    id: string
    name: string
    description?: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  salesperson: string
  commission: number
  notes?: string
}

export interface StockMovement {
  id: string
  product_id: string
  type: "entrada" | "saida" | "ajuste"
  quantity: number
  previous_stock: number
  new_stock: number
  unit_cost?: number
  total_cost?: number
  reason: string
  reference_document?: string
  notes?: string
  created_at: string
  created_by: string
  // Relacionamentos
  product?: Product
}

// Interface atualizada para produtos (removendo campos desnecessários)
export interface Product {
  id: string
  name: string
  description?: string
  sku: string
  category_id?: string
  subcategory_id?: string
  cost_price: number
  sale_price: number
  markup_percentage?: number
  current_stock: number
  min_stock: number
  max_stock: number
  unit_of_measure: string
  status: "ativo" | "inativo" | "descontinuado"
  is_deleted: boolean
  deleted_at?: string
  deleted_by?: string
  images: string[]
  main_image_url?: string
  tags?: string[]
  notes?: string
  created_at: string
  updated_at: string
  created_by?: string
  updated_by?: string
  // Relacionamentos
  category?: ProductCategory
  subcategory?: ProductSubcategory
}

export interface ProductCategory {
  id: string
  name: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductSubcategory {
  id: string
  name: string
  description?: string
  category_id: string
  is_active: boolean
  created_at: string
  updated_at: string
  // Relacionamento
  category?: ProductCategory
}

// Tipos
export interface Car {
  id: string
  customer_id: string
  vehicle_type: "carro" | "moto" | "caminhao"
  brand: string
  model: string
  license_plate: string
  color: string
  year?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  notes?: string
  status: "ativo" | "inativo" | "devedor"
  created_at: string
  updated_at: string
  cars?: Car[]
}

export interface Quote {
  id: string
  title: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  vehicle: {
    brand: string
    model: string
    year: number
    plate: string
  }
  category: string
  status: "pendente" | "aprovado" | "rejeitado" | "expirado"
  subtotal: number
  discount: number
  total: number
  validUntil: string
  createdAt: string
  items: {
    type: "produto" | "servico"
    name: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  image: string
}

export interface Collaborator {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: "ativo" | "inativo"
  permissions: string[]
  lastAccess: string
  isOnline: boolean
  avatar?: string
  createdAt: string
}

// Dados mock iniciais
const initialCustomers: Customer[] = [
  {
    id: "customer_1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-1111",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zip_code: "01234-567",
    status: "ativo",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    cars: [
      {
        id: "car_1",
        customer_id: "customer_1",
        vehicle_type: "carro",
        brand: "Toyota",
        model: "Corolla",
        license_plate: "ABC-1234",
        color: "Branco",
        year: 2020,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "car_2",
        customer_id: "customer_1",
        vehicle_type: "carro",
        brand: "Honda",
        model: "Civic",
        license_plate: "DEF-5678",
        color: "Preto",
        year: 2019,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
    ],
  },
  {
    id: "customer_2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 99999-2222",
    address: "Av. Paulista, 456",
    city: "São Paulo",
    state: "SP",
    zip_code: "01310-100",
    status: "devedor",
    created_at: "2024-01-16T14:30:00Z",
    updated_at: "2024-01-16T14:30:00Z",
    cars: [
      {
        id: "car_3",
        customer_id: "customer_2",
        vehicle_type: "carro",
        brand: "Ford",
        model: "Focus",
        license_plate: "GHI-9012",
        color: "Azul",
        year: 2018,
        created_at: "2024-01-16T14:30:00Z",
        updated_at: "2024-01-16T14:30:00Z",
      },
    ],
  },
  {
    id: "customer_3",
    name: "Pedro Oliveira",
    phone: "(11) 99999-3333",
    address: "Rua Augusta, 789",
    city: "São Paulo",
    state: "SP",
    status: "inativo",
    created_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-17T09:15:00Z",
    cars: [],
  },
]

// Dados iniciais (defaults)
const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "1",
    number: "PC-2024-001",
    supplier: "AutoPeças Brasil Ltda",
    supplierEmail: "vendas@autopecasbrasil.com.br",
    supplierPhone: "(11) 3456-7890",
    status: "pendente",
    priority: "alta",
    orderDate: "2024-01-15",
    expectedDate: "2024-01-25",
    total: 2850.0,
    items: [
      {
        productId: "1",
        productName: "Pastilha de Freio Dianteira",
        quantity: 10,
        unitPrice: 85.0,
        total: 850.0,
      },
      {
        productId: "2",
        productName: "Filtro de Óleo",
        quantity: 20,
        unitPrice: 25.0,
        total: 500.0,
      },
      {
        productId: "3",
        productName: "Amortecedor Traseiro",
        quantity: 4,
        unitPrice: 375.0,
        total: 1500.0,
      },
    ],
    notes: "Urgente para estoque mínimo",
    createdBy: "João Silva",
    department: "Compras",
  },
  {
    id: "2",
    number: "PC-2024-002",
    supplier: "Distribuidora Som & Cia",
    supplierEmail: "pedidos@somecialtda.com.br",
    supplierPhone: "(11) 2345-6789",
    status: "aprovado",
    priority: "media",
    orderDate: "2024-01-12",
    expectedDate: "2024-01-22",
    total: 4200.0,
    items: [
      {
        productId: "4",
        productName: 'Central Multimídia 7"',
        quantity: 3,
        unitPrice: 800.0,
        total: 2400.0,
      },
      {
        productId: "5",
        productName: "Câmera de Ré",
        quantity: 6,
        unitPrice: 150.0,
        total: 900.0,
      },
      {
        productId: "6",
        productName: 'Alto-falante 6"',
        quantity: 8,
        unitPrice: 112.5,
        total: 900.0,
      },
    ],
    createdBy: "Maria Santos",
    department: "Vendas",
  },
  {
    id: "3",
    number: "PC-2024-003",
    supplier: "Pneus & Rodas Express",
    supplierEmail: "comercial@pneusrodas.com.br",
    supplierPhone: "(11) 4567-8901",
    status: "recebido",
    priority: "baixa",
    orderDate: "2024-01-08",
    expectedDate: "2024-01-18",
    receivedDate: "2024-01-17",
    total: 1600.0,
    items: [
      {
        productId: "7",
        productName: "Pneu 185/65 R15",
        quantity: 4,
        unitPrice: 280.0,
        total: 1120.0,
      },
      {
        productId: "8",
        productName: "Válvula de Pneu",
        quantity: 20,
        unitPrice: 8.0,
        total: 160.0,
      },
      {
        productId: "9",
        productName: "Peso de Roda",
        quantity: 32,
        unitPrice: 10.0,
        total: 320.0,
      },
    ],
    createdBy: "Carlos Oliveira",
    department: "Oficina",
  },
  {
    id: "4",
    number: "PC-2024-004",
    supplier: "Ferramentas Pro",
    supplierEmail: "vendas@ferramentaspro.com.br",
    supplierPhone: "(11) 5678-9012",
    status: "enviado",
    priority: "media",
    orderDate: "2024-01-10",
    expectedDate: "2024-01-20",
    total: 950.0,
    items: [
      {
        productId: "10",
        productName: "Chave de Roda",
        quantity: 5,
        unitPrice: 45.0,
        total: 225.0,
      },
      {
        productId: "11",
        productName: "Macaco Hidráulico",
        quantity: 2,
        unitPrice: 180.0,
        total: 360.0,
      },
      {
        productId: "12",
        productName: "Kit Ferramentas",
        quantity: 1,
        unitPrice: 365.0,
        total: 365.0,
      },
    ],
    createdBy: "Ana Costa",
    department: "Oficina",
  },
  {
    id: "5",
    number: "PC-2024-005",
    supplier: "Óleos & Lubrificantes SA",
    supplierEmail: "pedidos@oleoslubrificantes.com.br",
    supplierPhone: "(11) 6789-0123",
    status: "cancelado",
    priority: "baixa",
    orderDate: "2024-01-05",
    expectedDate: "2024-01-15",
    total: 680.0,
    items: [
      {
        productId: "13",
        productName: "Óleo Motor 5W30",
        quantity: 12,
        unitPrice: 35.0,
        total: 420.0,
      },
      {
        productId: "14",
        productName: "Óleo Câmbio",
        quantity: 8,
        unitPrice: 32.5,
        total: 260.0,
      },
    ],
    notes: "Cancelado - fornecedor sem estoque",
    createdBy: "Pedro Lima",
    department: "Compras",
  },
]

const initialSales: Sale[] = [
  {
    id: "1",
    number: "VD-2024-001",
    customer: {
      id: "1",
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      phone: "(11) 99999-1111",
      document: "123.456.789-01",
    },
    vehicle: {
      brand: "Honda",
      model: "Civic",
      year: 2020,
      plate: "ABC-1234",
    },
    status: "concluido",
    type: "ambos",
    saleDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    paymentMethod: "cartao_credito",
    paymentStatus: "pago",
    subtotal: 1800.0,
    discount: 100.0,
    total: 1700.0,
    items: [
      {
        type: "produto",
        id: "1",
        name: 'Central Multimídia 7"',
        description: "Com Android Auto e Apple CarPlay",
        quantity: 1,
        unitPrice: 800.0,
        total: 800.0,
      },
      {
        type: "produto",
        id: "2",
        name: "Câmera de Ré",
        description: "HD com visão noturna",
        quantity: 1,
        unitPrice: 150.0,
        total: 150.0,
      },
      {
        type: "servico",
        id: "3",
        name: "Instalação Multimídia",
        description: "Instalação completa com chicote",
        quantity: 1,
        unitPrice: 850.0,
        total: 850.0,
      },
    ],
    salesperson: "Maria Santos",
    commission: 170.0,
    notes: "Cliente muito satisfeito",
  },
  {
    id: "2",
    number: "VD-2024-002",
    customer: {
      id: "2",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 99999-2222",
      document: "987.654.321-02",
    },
    vehicle: {
      brand: "Toyota",
      model: "Corolla",
      year: 2019,
      plate: "DEF-5678",
    },
    status: "em_andamento",
    type: "servico",
    saleDate: "2024-01-14",
    paymentMethod: "pix",
    paymentStatus: "parcial",
    subtotal: 1200.0,
    discount: 0,
    total: 1200.0,
    items: [
      {
        type: "servico",
        id: "4",
        name: "Troca de Suspensão",
        description: "Amortecedores dianteiros e traseiros",
        quantity: 1,
        unitPrice: 800.0,
        total: 800.0,
      },
      {
        type: "servico",
        id: "5",
        name: "Alinhamento e Balanceamento",
        description: "Serviço completo",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
    ],
    salesperson: "João Silva",
    commission: 120.0,
  },
  {
    id: "3",
    number: "VD-2024-003",
    customer: {
      id: "3",
      name: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      phone: "(11) 99999-3333",
      document: "456.789.123-03",
    },
    vehicle: {
      brand: "Volkswagen",
      model: "Golf",
      year: 2021,
      plate: "GHI-9012",
    },
    status: "aprovado",
    type: "produto",
    saleDate: "2024-01-13",
    paymentMethod: "financiamento",
    paymentStatus: "pendente",
    subtotal: 2400.0,
    discount: 200.0,
    total: 2200.0,
    items: [
      {
        type: "produto",
        id: "6",
        name: "Pneu 225/45 R17",
        description: "Michelin Primacy 4",
        quantity: 4,
        unitPrice: 450.0,
        total: 1800.0,
      },
      {
        type: "produto",
        id: "7",
        name: 'Roda Liga Leve 17"',
        description: "Modelo esportivo",
        quantity: 4,
        unitPrice: 150.0,
        total: 600.0,
      },
    ],
    salesperson: "Pedro Lima",
    commission: 220.0,
    notes: "Aguardando aprovação do financiamento",
  },
  {
    id: "4",
    number: "VD-2024-004",
    customer: {
      id: "4",
      name: "Fernanda Santos",
      email: "fernanda.santos@email.com",
      phone: "(11) 99999-4444",
      document: "789.123.456-04",
    },
    vehicle: {
      brand: "Volkswagen",
      model: "Golf",
      year: 2021,
      plate: "GHI-9012",
    },
    status: "orcamento",
    type: "ambos",
    saleDate: "2024-01-12",
    paymentMethod: "cartao_credito",
    paymentStatus: "pendente",
    subtotal: 3200.0,
    discount: 320.0,
    total: 2880.0,
    items: [
      {
        type: "produto",
        id: "8",
        name: "Kit Xenon H7",
        description: "Lâmpada 6000K",
        quantity: 1,
        unitPrice: 280.0,
        total: 280.0,
      },
      {
        type: "produto",
        id: "9",
        name: "Película Automotiva",
        description: "3M Ceramic 70%",
        quantity: 1,
        unitPrice: 800.0,
        total: 800.0,
      },
      {
        type: "servico",
        id: "10",
        name: "Instalação Xenon",
        description: "Instalação completa",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
      {
        type: "servico",
        id: "11",
        name: "Aplicação de Película",
        description: "Todos os vidros",
        quantity: 1,
        unitPrice: 1720.0,
        total: 1720.0,
      },
    ],
    salesperson: "Ana Costa",
    commission: 288.0,
    notes: "Cliente analisando proposta",
  },
  {
    id: "5",
    number: "VD-2024-005",
    customer: {
      id: "5",
      name: "Ricardo Pereira",
      email: "ricardo.pereira@email.com",
      phone: "(11) 99999-5555",
      document: "321.654.987-05",
    },
    vehicle: {
      brand: "Ford",
      model: "Focus",
      year: 2018,
      plate: "JKL-3456",
    },
    status: "cancelado",
    type: "servico",
    saleDate: "2024-01-10",
    paymentMethod: "dinheiro",
    paymentStatus: "pendente",
    subtotal: 600.0,
    discount: 0,
    total: 600.0,
    items: [
      {
        type: "servico",
        id: "12",
        name: "Troca de Óleo",
        description: "Óleo sintético 5W30",
        quantity: 1,
        unitPrice: 180.0,
        total: 180.0,
      },
      {
        type: "servico",
        id: "13",
        name: "Revisão Completa",
        description: "Revisão de 10.000km",
        quantity: 1,
        unitPrice: 420.0,
        total: 420.0,
      },
    ],
    salesperson: "Carlos Oliveira",
    commission: 60.0,
    notes: "Cliente desistiu do serviço",
  },
]

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Central Multimídia Pioneer DMH-G228BT",
    description: "Central multimídia com Bluetooth e tela touch",
    sku: "MULT-123456",
    category_id: "1",
    subcategory_id: "1",
    cost_price: 699.99,
    sale_price: 899.99,
    markup_percentage: 22.22,
    current_stock: 15,
    min_stock: 5,
    max_stock: 30,
    unit_of_measure: "UN",
    status: "ativo",
    is_deleted: false,
    images: ["/placeholder.svg?height=200&width=200"],
    main_image_url: "/placeholder.svg?height=200&width=200",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Câmera de Ré Multilaser AU013",
    description: "Câmera de ré para veículos",
    sku: "ACES-789012",
    category_id: "2",
    subcategory_id: "3",
    cost_price: 129.9,
    sale_price: 189.9,
    markup_percentage: 31.59,
    current_stock: 25,
    min_stock: 10,
    max_stock: 50,
    unit_of_measure: "UN",
    status: "ativo",
    is_deleted: false,
    images: ["/placeholder.svg?height=200&width=200"],
    main_image_url: "/placeholder.svg?height=200&width=200",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Pneu Michelin Primacy 4 205/55 R16",
    description: "Pneu para carros de passeio",
    sku: "PNEU-345678",
    category_id: "3",
    subcategory_id: "5",
    cost_price: 359.99,
    sale_price: 459.99,
    markup_percentage: 21.74,
    current_stock: 8,
    min_stock: 4,
    max_stock: 20,
    unit_of_measure: "UN",
    status: "ativo",
    is_deleted: false,
    images: ["/placeholder.svg?height=200&width=200"],
    main_image_url: "/placeholder.svg?height=200&width=200",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Pastilha de Freio Bosch Cerâmica",
    description: "Pastilha de freio cerâmica para veículos",
    sku: "FREI-901234",
    category_id: "4",
    subcategory_id: "7",
    cost_price: 89.9,
    sale_price: 129.9,
    markup_percentage: 30.79,
    current_stock: 2,
    min_stock: 5,
    max_stock: 15,
    unit_of_measure: "UN",
    status: "ativo",
    is_deleted: false,
    images: ["/placeholder.svg?height=200&width=200"],
    main_image_url: "/placeholder.svg?height=200&width=200",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Óleo Motor Castrol GTX 5W30",
    description: "Óleo para motor a gasolina",
    sku: "OLEO-567890",
    category_id: "5",
    subcategory_id: "9",
    cost_price: 59.9,
    sale_price: 89.9,
    markup_percentage: 33.37,
    current_stock: 30,
    min_stock: 10,
    max_stock: 50,
    unit_of_measure: "UN",
    status: "ativo",
    is_deleted: false,
    images: ["/placeholder.svg?height=200&width=200"],
    main_image_url: "/placeholder.svg?height=200&width=200",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const initialCategories: ProductCategory[] = [
  {
    id: "1",
    name: "Multimídia",
    description: "Equipamentos de som e vídeo",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Acessórios",
    description: "Acessórios diversos para veículos",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Pneus",
    description: "Pneus para diversos veículos",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Freios",
    description: "Componentes de freio",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Óleos",
    description: "Óleos e lubrificantes",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const initialSubcategories: ProductSubcategory[] = [
  // Multimídia
  {
    id: "1",
    name: "Centrais Multimídia",
    description: "Centrais multimídia com tela",
    category_id: "1",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Alto-falantes",
    description: "Alto-falantes automotivos",
    category_id: "1",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Acessórios
  {
    id: "3",
    name: "Câmeras",
    description: "Câmeras de ré e frontais",
    category_id: "2",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Películas",
    description: "Películas automotivas",
    category_id: "2",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Pneus
  {
    id: "5",
    name: "Pneus de Passeio",
    description: "Pneus para carros de passeio",
    category_id: "3",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Pneus de Caminhão",
    description: "Pneus para caminhões",
    category_id: "3",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Freios
  {
    id: "7",
    name: "Pastilhas",
    description: "Pastilhas de freio",
    category_id: "4",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Discos",
    description: "Discos de freio",
    category_id: "4",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Óleos
  {
    id: "9",
    name: "Óleo Motor",
    description: "Óleos para motor",
    category_id: "5",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Óleo Câmbio",
    description: "Óleos para câmbio",
    category_id: "5",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Função para inicializar dados no localStorage se não existirem
function initializeMockData() {
  if (typeof window !== "undefined") {
    const existingData = localStorage.getItem("mockCustomers")
    if (!existingData) {
      localStorage.setItem("mockCustomers", JSON.stringify(initialCustomers))
    }
  }
}

// Mock data para clientes - ATUALIZADO com apenas status ativo/inativo
/* Este trecho foi comentado pois contém erros de sintaxe
// Código comentado para evitar erros
//  {
//    id: "4",
//    name: "Ana Pereira",
//    email: "ana.pereira@email.com",
//    phone: "(31) 98765-1234",
//    address: "Rua das Acácias, 789",
//    city: "Belo Horizonte",
//    state: "MG",
//    zip_code: "30130-000",
//    status: "ativo",
//    created_at: "2023-04-05T16:20:00Z",
//    cars: [
//      {
//        id: "car4",
//        brand: "Fiat",
//        model: "Uno",
//        year: 2015,
//        license_plate: "JKL-3456",
//        color: "Vermelho",
//        customer_id: "4",
//      },
//      {
//        id: "car5",
//        brand: "Chevrolet",
//        model: "Onix",
//        year: 2021,
//        license_plate: "MNO-7890",
//        color: "Azul",
//        customer_id: "4",
//      },
//      {
//        id: "car6",
//        brand: "Renault",
//        model: "Sandero",
//        year: 2017,
//        license_plate: "PQR-1234",
//        color: "Cinza",
//        customer_id: "4",
//      },
//    ],
//  },
//  {
//    id: "5",
//    name: "Roberto Almeida",
//    phone: "(41) 99999-8888",
//    city: "Curitiba",
//    state: "PR",
//    status: "inativo",
//    created_at: "2023-05-12T11:10:00Z",
//    cars: [
//      {
//        id: "car7",
//        brand: "Hyundai",
//        model: "HB20",
//        year: 2019,
//        license_plate: "STU-5678",
//        color: "Prata",
//        customer_id: "5",
//      },
//    ],
//  },
*/

const initialQuotes: Quote[] = [
  {
    id: "1",
    title: "Multimídia Honda Civic 2020",
    customer: {
      id: "1",
      name: "João Silva Santos",
      email: "joao.silva@email.com",
      phone: "(11) 99999-1111",
    },
    vehicle: {
      brand: "Honda",
      model: "Civic",
      year: 2020,
      plate: "ABC-1234",
    },
    category: "Multimídia",
    status: "aprovado",
    subtotal: 1200.0,
    discount: 100.0,
    total: 1100.0,
    validUntil: "2024-02-15",
    createdAt: "2024-01-15",
    items: [
      {
        type: "produto",
        name: "Central Multimídia Pioneer",
        description: 'Tela 7" com Android Auto',
        quantity: 1,
        unitPrice: 800.0,
        total: 800.0,
      },
      {
        type: "servico",
        name: "Instalação",
        description: "Instalação completa com chicote",
        quantity: 1,
        unitPrice: 400.0,
        total: 400.0,
      },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Suspensão Toyota Corolla 2019",
    customer: {
      id: "2",
      name: "Maria Oliveira Costa",
      email: "maria.costa@email.com",
      phone: "(11) 99999-2222",
    },
    vehicle: {
      brand: "Toyota",
      model: "Corolla",
      year: 2019,
      plate: "DEF-5678",
    },
    category: "Suspensão",
    status: "pendente",
    subtotal: 1800.0,
    discount: 0,
    total: 1800.0,
    validUntil: "2024-02-20",
    createdAt: "2024-01-14",
    items: [
      {
        type: "produto",
        name: "Amortecedor Dianteiro",
        description: "Par de amortecedores Monroe",
        quantity: 2,
        unitPrice: 450.0,
        total: 900.0,
      },
      {
        type: "produto",
        name: "Amortecedor Traseiro",
        description: "Par de amortecedores Monroe",
        quantity: 2,
        unitPrice: 350.0,
        total: 700.0,
      },
      {
        type: "servico",
        name: "Instalação",
        description: "Mão de obra especializada",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Pneus Volkswagen Golf 2021",
    customer: {
      id: "4",
      name: "Ana Paula Ferreira",
      email: "ana.ferreira@email.com",
      phone: "(11) 99999-4444",
    },
    vehicle: {
      brand: "Volkswagen",
      model: "Golf",
      year: 2021,
      plate: "GHI-9012",
    },
    category: "Pneus",
    status: "rejeitado",
    subtotal: 2000.0,
    discount: 200.0,
    total: 1800.0,
    validUntil: "2024-02-10",
    createdAt: "2024-01-12",
    items: [
      {
        type: "produto",
        name: "Pneu Michelin 225/45 R17",
        description: "Jogo completo Primacy 4",
        quantity: 4,
        unitPrice: 450.0,
        total: 1800.0,
      },
      {
        type: "servico",
        name: "Montagem e Balanceamento",
        description: "Serviço completo",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Ar Condicionado Ford EcoSport 2018",
    customer: {
      id: "4",
      name: "Ana Paula Ferreira",
      email: "ana.ferreira@email.com",
      phone: "(11) 99999-4444",
    },
    vehicle: {
      brand: "Ford",
      model: "EcoSport",
      year: 2018,
      plate: "JKL-3456",
    },
    category: "Ar Condicionado",
    status: "expirado",
    subtotal: 800.0,
    discount: 50.0,
    total: 750.0,
    validUntil: "2024-01-10",
    createdAt: "2024-01-05",
    items: [
      {
        type: "produto",
        name: "Compressor de Ar",
        description: "Compressor remanufaturado",
        quantity: 1,
        unitPrice: 500.0,
        total: 500.0,
      },
      {
        type: "servico",
        name: "Instalação e Carga de Gás",
        description: "Serviço completo",
        quantity: 1,
        unitPrice: 300.0,
        total: 300.0,
      },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Freios Chevrolet Onix 2022",
    customer: {
      id: "5",
      name: "Pedro Henrique Souza",
      email: "pedro.souza@email.com",
      phone: "(11) 99999-5555",
    },
    vehicle: {
      brand: "Chevrolet",
      model: "Onix",
      year: 2022,
      plate: "MNO-7890",
    },
    category: "Freios",
    status: "pendente",
    subtotal: 600.0,
    discount: 0,
    total: 600.0,
    validUntil: "2024-02-25",
    createdAt: "2024-01-16",
    items: [
      {
        type: "produto",
        name: "Pastilha de Freio Dianteira",
        description: "Bosch cerâmica",
        quantity: 1,
        unitPrice: 180.0,
        total: 180.0,
      },
      {
        type: "produto",
        name: "Disco de Freio",
        description: "Par dianteiro ventilado",
        quantity: 2,
        unitPrice: 120.0,
        total: 240.0,
      },
      {
        type: "servico",
        name: "Instalação",
        description: "Troca completa",
        quantity: 1,
        unitPrice: 180.0,
        total: 180.0,
      },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const initialCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@likekar.com.br",
    phone: "(11) 99999-1111",
    role: "Administrador",
    department: "TI",
    status: "ativo",
    permissions: ["CRM", "Clientes", "Produtos", "Relatórios", "Configurações"],
    lastAccess: "2024-01-16T10:30:00",
    isOnline: true,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@likekar.com.br",
    phone: "(11) 99999-2222",
    role: "Gerente de Vendas",
    department: "Vendas",
    status: "ativo",
    permissions: ["CRM", "Clientes", "Produtos", "Relatórios"],
    lastAccess: "2024-01-16T09:15:00",
    isOnline: true,
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@likekar.com.br",
    phone: "(11) 99999-3333",
    role: "Vendedor",
    department: "Vendas",
    status: "ativo",
    permissions: ["CRM", "Clientes"],
    lastAccess: "2024-01-15T16:45:00",
    isOnline: false,
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@likekar.com.br",
    phone: "(11) 99999-4444",
    role: "Atendente",
    department: "Atendimento",
    status: "ativo",
    permissions: ["CRM", "Clientes"],
    lastAccess: "2024-01-16T08:20:00",
    isOnline: true,
    createdAt: "2024-01-04",
  },
  {
    id: "5",
    name: "Pedro Lima",
    email: "pedro.lima@likekar.com.br",
    phone: "(11) 99999-5555",
    role: "Técnico",
    department: "Oficina",
    status: "ativo",
    permissions: ["CRM"],
    lastAccess: "2024-01-14T14:30:00",
    isOnline: false,
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    name: "Fernanda Rocha",
    email: "fernanda.rocha@likekar.com.br",
    phone: "(11) 99999-6666",
    role: "Financeiro",
    department: "Financeiro",
    status: "inativo",
    permissions: ["Relatórios"],
    lastAccess: "2024-01-10T11:00:00",
    isOnline: false,
    createdAt: "2024-01-06",
  },
]

// Funções de persistência no localStorage
const STORAGE_KEYS = {
  PRODUCTS: "likekar_products",
  CATEGORIES: "likekar_categories",
  SUBCATEGORIES: "likekar_subcategories",
  CUSTOMERS: "likekar_customers",
  QUOTES: "likekar_quotes",
  COLLABORATORS: "likekar_collaborators",
  PURCHASE_ORDERS: "likekar_purchase_orders",
  SALES: "likekar_sales",
  STOCK_MOVEMENTS: "likekar_stock_movements",
}

// Função para salvar dados no localStorage
function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error)
    }
  }
}

// Função para carregar dados do localStorage
function loadFromStorage<T>(key: string, defaultData: T[]): T[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error(`Erro ao carregar ${key} do localStorage:`, error)
    }
  }
  return defaultData
}

// Função para resetar dados (útil para desenvolvimento)
export function resetAllData(): void {
  if (typeof window !== "undefined") {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  }
}

// Variáveis que mantêm os dados em memória (carregados do localStorage)
const mockProducts = loadFromStorage<Product>(STORAGE_KEYS.PRODUCTS, initialProducts)
const mockCategories = loadFromStorage<ProductCategory>(STORAGE_KEYS.CATEGORIES, initialCategories)
let mockSubcategories = loadFromStorage<ProductSubcategory>(STORAGE_KEYS.SUBCATEGORIES, initialSubcategories)
// Mock data para clientes
//const mockCustomers = loadFromStorage<Customer>(STORAGE_KEYS.CUSTOMERS, initialCustomers)
const mockQuotes = loadFromStorage<Quote>(STORAGE_KEYS.QUOTES, initialQuotes)
const mockCollaborators = loadFromStorage<Collaborator>(STORAGE_KEYS.COLLABORATORS, initialCollaborators)
const mockPurchaseOrders = loadFromStorage<PurchaseOrder>(STORAGE_KEYS.PURCHASE_ORDERS, initialPurchaseOrders)
const mockSales = loadFromStorage<Sale>(STORAGE_KEYS.SALES, initialSales)
const mockStockMovements = loadFromStorage<StockMovement>(STORAGE_KEYS.STOCK_MOVEMENTS, [])

// Função para inicializar dados no localStorage se não existirem
initializeMockData()

// Função para obter clientes
export function getMockCustomers(): Customer[] {
  if (typeof window === "undefined") {
    return initialCustomers
  }

  const data = localStorage.getItem("mockCustomers")
  return data ? JSON.parse(data) : initialCustomers
}

// Exportar os dados para compatibilidade
export {
  mockProducts,
  mockCategories,
  mockSubcategories,
  mockQuotes,
  mockCollaborators,
  mockPurchaseOrders,
  mockSales,
  mockStockMovements,
}

// Adicionar funções para gerenciar pedidos de compra

// Função para gerar próximo número sequencial
export function getNextPurchaseOrderNumber(): string {
  const currentYear = new Date().getFullYear()
  const existingOrders = getAllPurchaseOrders()

  // Filtrar pedidos do ano atual
  const currentYearOrders = existingOrders.filter((order) => order.number.includes(`PC-${currentYear}`))

  // Encontrar o maior número
  let maxNumber = 0
  currentYearOrders.forEach((order) => {
    const numberMatch = order.number.match(/PC-\d{4}-(\d{3})/)
    if (numberMatch) {
      const num = Number.parseInt(numberMatch[1])
      if (num > maxNumber) {
        maxNumber = num
      }
    }
  })

  // Próximo número
  const nextNumber = maxNumber + 1
  return `PC-${currentYear}-${nextNumber.toString().padStart(3, "0")}`
}

// Função para criar pedido de compra
export function createPurchaseOrder(orderData: Omit<PurchaseOrder, "id" | "number" | "orderDate">): PurchaseOrder {
  const newOrder: PurchaseOrder = {
    ...orderData,
    id: `po_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
    number: getNextPurchaseOrderNumber(),
    orderDate: new Date().toISOString().split("T")[0],
  }

  mockPurchaseOrders.push(newOrder)
  saveToStorage(STORAGE_KEYS.PURCHASE_ORDERS, mockPurchaseOrders)

  return newOrder
}

// Função para atualizar pedido de compra
export function updatePurchaseOrder(id: string, updates: Partial<PurchaseOrder>): PurchaseOrder | null {
  const index = mockPurchaseOrders.findIndex((order) => order.id === id)
  if (index === -1) {
    return null
  }

  mockPurchaseOrders[index] = {
    ...mockPurchaseOrders[index],
    ...updates,
  }

  saveToStorage(STORAGE_KEYS.PURCHASE_ORDERS, mockPurchaseOrders)
  return mockPurchaseOrders[index]
}

// Função para deletar pedido de compra
export function deletePurchaseOrder(id: string): boolean {
  const index = mockPurchaseOrders.findIndex((order) => order.id === id)
  if (index === -1) {
    return false
  }

  mockPurchaseOrders.splice(index, 1)
  saveToStorage(STORAGE_KEYS.PURCHASE_ORDERS, mockPurchaseOrders)
  return true
}

// Função para deletar múltiplos pedidos
export function deleteMultiplePurchaseOrders(ids: string[]): boolean {
  try {
    ids.forEach((id) => {
      const index = mockPurchaseOrders.findIndex((order) => order.id === id)
      if (index !== -1) {
        mockPurchaseOrders.splice(index, 1)
      }
    })

    saveToStorage(STORAGE_KEYS.PURCHASE_ORDERS, mockPurchaseOrders)
    return true
  } catch (error) {
    console.error("Error deleting multiple purchase orders:", error)
    return false
  }
}

// Funções para manipular os dados mock
//export function getMockCustomers(): Customer[] {
//  return [...mockCustomers]
//}

//export function getMockCustomerById(id: string): Customer | undefined {
//  return mockCustomers.find((customer) => customer.id === id)
//}

//export function deleteCustomer(id: string): void {
//  const index = mockCustomers.findIndex((customer) => customer.id === id)
//  if (index !== -1) {
//    mockCustomers.splice(index, 1)
//    saveToStorage(STORAGE_KEYS.CUSTOMERS, mockCustomers)
//  }
//}

// Função para criar cliente - FUNCIONAL
export function createMockCustomer(customerData: Omit<Customer, "id" | "created_at" | "updated_at">): Customer {
  const customers = getMockCustomers()

  const newCustomer: Customer = {
    ...customerData,
    id: `customer_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  customers.push(newCustomer)

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }

  return newCustomer
}

// Função para atualizar cliente
//export function updateMockCustomer(id: string, updates: Partial<Customer>): Customer | null {
//  const index = mockCustomers.findIndex((customer) => customer.id === id)
//  if (index === -1) {
//    return null
//  }

//  mockCustomers[index] = {
//    ...mockCustomers[index],
//    ...updates,
//  }

//  saveToStorage(STORAGE_KEYS.CUSTOMERS, mockCustomers)
//  return mockCustomers[index]
//}

// Função para deletar cliente
export function deleteCustomer(customerId: string): boolean {
  const customers = getMockCustomers()
  const filteredCustomers = customers.filter((c) => c.id !== customerId)

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(filteredCustomers))
  }

  return true
}

// Função para obter cliente por ID
export function getMockCustomerById(id: string): Customer | null {
  const customers = getMockCustomers()
  return customers.find((c) => c.id === id) || null
}

// Função para atualizar cliente
export function updateMockCustomer(id: string, updates: Partial<Customer>): Customer {
  const customers = getMockCustomers()
  const customerIndex = customers.findIndex((c) => c.id === id)

  if (customerIndex === -1) {
    throw new Error("Cliente não encontrado")
  }

  customers[customerIndex] = {
    ...customers[customerIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }

  return customers[customerIndex]
}

// Funções para buscar dados
export function getAllPurchaseOrders(): PurchaseOrder[] {
  return mockPurchaseOrders
}

export function getAllSales(): Sale[] {
  return mockSales
}

export function getPurchaseOrderById(id: string): PurchaseOrder | undefined {
  return mockPurchaseOrders.find((order) => order.id === id)
}

export function getSaleById(id: string): Sale | undefined {
  return mockSales.find((sale) => sale.id === id)
}

// Funções mock para produtos
export function getAllProducts(includeDeleted = false) {
  console.log("Produtos carregados:", mockProducts.length) // Debug
  if (includeDeleted) {
    return mockProducts
  }
  return mockProducts.filter((product) => !product.is_deleted)
}

export function getProductById(id: string) {
  const product = mockProducts.find((p) => p.id === id && !p.is_deleted)
  if (!product) {
    throw new Error("Produto não encontrado")
  }
  return product
}

export function createProductMock(productData: Partial<Product>): Product {
  // Gerar ID único para o produto
  const id = `prod_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`

  // Criar o produto com os dados fornecidos e valores padrão para campos obrigatórios
  const newProduct: Product = {
    id,
    name: productData.name || "Produto sem nome",
    sku: productData.sku || `SKU-${Date.now()}`,
    cost_price: productData.cost_price || 0,
    sale_price: productData.sale_price || 0,
    current_stock: productData.current_stock || 0,
    min_stock: productData.min_stock || 0,
    max_stock: productData.max_stock || 0,
    unit_of_measure: productData.unit_of_measure || "UN",
    status: productData.status || "ativo",
    is_deleted: productData.is_deleted || false,
    images: productData.images || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...productData,
  }

  // Adicionar o produto à lista de produtos mock
  mockProducts.push(newProduct)

  // Salvar no localStorage
  saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)

  // Retornar o produto criado
  return newProduct
}

export function updateProductMock(id: string, updates: Partial<Product>) {
  const index = mockProducts.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error("Produto não encontrado")
  }

  mockProducts[index] = {
    ...mockProducts[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  // Salvar no localStorage
  saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)

  return mockProducts[index]
}

export function deleteProductMock(id: string) {
  const index = mockProducts.findIndex((p) => p.id === id)
  if (index === -1) {
    throw new Error("Produto não encontrado")
  }

  mockProducts[index] = {
    ...mockProducts[index],
    is_deleted: true,
    deleted_at: new Date().toISOString(),
  }

  // Salvar no localStorage
  saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)

  return mockProducts[index]
}

export function deleteMultipleProducts(productIds: string[]): boolean {
  try {
    productIds.forEach((id) => {
      const index = mockProducts.findIndex((p) => p.id === id)
      if (index !== -1) {
        mockProducts[index] = {
          ...mockProducts[index],
          is_deleted: true,
          deleted_at: new Date().toISOString(),
        }
      }
    })

    // Save to localStorage
    saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)

    return true
  } catch (error) {
    console.error("Error deleting multiple products:", error)
    return false
  }
}

export function getProductCategories() {
  return mockCategories
}

export function getProductSubcategories(categoryId?: string) {
  if (categoryId) {
    return mockSubcategories.filter((sub) => sub.category_id === categoryId && sub.is_active)
  }
  return mockSubcategories.filter((sub) => sub.is_active)
}

// Funções para categorias
export function createCategoryMock(
  categoryData: Omit<ProductCategory, "id" | "created_at" | "updated_at">,
): ProductCategory {
  const id = `cat_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`

  const newCategory: ProductCategory = {
    id,
    ...categoryData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockCategories.push(newCategory)
  saveToStorage(STORAGE_KEYS.CATEGORIES, mockCategories)

  return newCategory
}

export function updateCategoryMock(id: string, updates: Partial<ProductCategory>) {
  const index = mockCategories.findIndex((c) => c.id === id)
  if (index === -1) {
    throw new Error("Categoria não encontrada")
  }

  mockCategories[index] = {
    ...mockCategories[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  saveToStorage(STORAGE_KEYS.CATEGORIES, mockCategories)
  return mockCategories[index]
}

export function deleteCategoryMock(id: string) {
  // Remover categoria
  const categoryIndex = mockCategories.findIndex((c) => c.id === id)
  if (categoryIndex === -1) {
    throw new Error("Categoria não encontrada")
  }

  mockCategories.splice(categoryIndex, 1)

  // Remover subcategorias associadas
  mockSubcategories = mockSubcategories.filter((s) => s.category_id !== id)

  // Salvar no localStorage
  saveToStorage(STORAGE_KEYS.CATEGORIES, mockCategories)
  saveToStorage(STORAGE_KEYS.SUBCATEGORIES, mockSubcategories)

  return true
}

// Funções para subcategorias
export function createSubcategoryMock(
  subcategoryData: Omit<ProductSubcategory, "id" | "created_at" | "updated_at">,
): ProductSubcategory {
  const id = `subcat_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`

  const newSubcategory: ProductSubcategory = {
    id,
    ...subcategoryData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockSubcategories.push(newSubcategory)
  saveToStorage(STORAGE_KEYS.SUBCATEGORIES, mockSubcategories)

  return newSubcategory
}

export function updateSubcategoryMock(id: string, updates: Partial<ProductSubcategory>) {
  const index = mockSubcategories.findIndex((s) => s.id === id)
  if (index === -1) {
    throw new Error("Subcategoria não encontrada")
  }

  mockSubcategories[index] = {
    ...mockSubcategories[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  saveToStorage(STORAGE_KEYS.SUBCATEGORIES, mockSubcategories)
  return mockSubcategory[index]
}

export function deleteSubcategoryMock(id: string) {
  const index = mockSubcategories.findIndex((s) => s.id === id)
  if (index === -1) {
    throw new Error("Subcategoria não encontrada")
  }

  mockSubcategories.splice(index, 1)
  saveToStorage(STORAGE_KEYS.SUBCATEGORIES, mockSubcategories)

  return true
}

// Funções para movimentações de estoque
export function createStockMovement(movement: Omit<StockMovement, "id" | "created_at">) {
  const newId = (mockStockMovements.length + 1).toString()
  const now = new Date().toISOString()

  const newMovement: StockMovement = {
    ...movement,
    id: newId,
    created_at: now,
  }

  mockStockMovements.push(newMovement)

  // Atualizar estoque do produto
  const productIndex = mockProducts.findIndex((p) => p.id === movement.product_id)
  if (productIndex !== -1) {
    mockProducts[productIndex].current_stock = movement.new_stock
    saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)
  }

  saveToStorage(STORAGE_KEYS.STOCK_MOVEMENTS, mockStockMovements)
  return newMovement
}

export function getStockMovements(productId?: string) {
  if (productId) {
    return mockStockMovements.filter((m) => m.product_id === productId)
  }
  return mockStockMovements
}

export function getStockMovementsByProduct(productId: string) {
  return mockStockMovements.filter((m) => m.product_id === productId)
}

export function addStockMovement(movementData: {
  productId: string
  type: "entrada" | "saida" | "ajuste"
  quantity: number
  reason: string
  notes?: string
  created_by: string
}): StockMovement {
  const product = mockProducts.find((p) => p.id === movementData.productId)
  if (!product) {
    throw new Error("Produto não encontrado")
  }

  const previousStock = product.current_stock
  let newStock = previousStock

  // Calcular novo estoque baseado no tipo de movimentação
  switch (movementData.type) {
    case "entrada":
      newStock = previousStock + Math.abs(movementData.quantity)
      break
    case "saida":
      newStock = previousStock - Math.abs(movementData.quantity)
      break
    case "ajuste":
      if (movementData.quantity < 0) {
        newStock = previousStock + movementData.quantity // quantity já é negativo
      } else {
        newStock = movementData.quantity // ajuste para quantidade específica
      }
      break
  }

  // Garantir que o estoque não fique negativo
  newStock = Math.max(0, newStock)

  const newMovement: StockMovement = {
    id: `mov_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
    product_id: movementData.productId,
    type: movementData.type,
    quantity: Math.abs(movementData.quantity),
    previous_stock: previousStock,
    new_stock: newStock,
    reason: movementData.reason,
    notes: movementData.notes,
    created_at: new Date().toISOString(),
    created_by: movementData.created_by,
  }

  // Adicionar movimentação à lista
  mockStockMovements.unshift(newMovement)

  // Atualizar estoque do produto
  product.current_stock = newStock
  product.updated_at = new Date().toISOString()

  // Salvar no localStorage
  saveToStorage(STORAGE_KEYS.STOCK_MOVEMENTS, mockStockMovements)
  saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)

  return newMovement
}

export function getAllStockMovements(): StockMovement[] {
  return mockStockMovements
}

// Funções para buscar dados
export function getAllCollaborators(): Collaborator[] {
  return mockCollaborators
}

export function getCollaboratorById(id: string): Collaborator | undefined {
  return mockCollaborators.find((collaborator) => collaborator.id === id)
}

//export function getCarById(id: string): Car | undefined {
//  for (const customer of mockCustomers) {
//    const car = customer.cars?.find((car) => car.id === id)
//    if (car) return car
//  }
//  return undefined
//}

// Função para buscar todas as cotações
export function getAllQuotes(): Quote[] {
  return mockQuotes
}

// Functions for managing products
export function deleteProduct(productId: string): boolean {
  const index = mockProducts.findIndex((product) => product.id === productId)
  if (index > -1) {
    mockProducts.splice(index, 1)
    saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)
    return true
  }
  return false
}

export function updateProduct(productId: string, updates: Partial<Product>): boolean {
  const index = mockProducts.findIndex((product) => product.id === productId)
  if (index > -1) {
    mockProducts[index] = { ...mockProducts[index], ...updates, updated_at: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)
    return true
  }
  return false
}

export function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">): Product {
  const newProduct: Product = {
    ...product,
    id: (mockProducts.length + 1).toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockProducts.push(newProduct)
  saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts)
  return newProduct
}

// Função para buscar todos os clientes (alias para compatibilidade)
//export function getMockCustomers(): Customer[] {
//  return mockCustomers
//}

// Função para buscar cliente por ID (MISSING FUNCTION ADDED)
//export function getMockCustomerById(id: string): Customer | undefined {
//  return mockCustomers.find((customer) => customer.id === id)
//}

// Função para deletar cliente
//export function deleteCustomer(customerId: string): boolean {
//  const index = mockCustomers.findIndex((customer) => customer.id === customerId)
//  if (index > -1) {
//    mockCustomers.splice(index, 1)
//    saveToStorage(STORAGE_KEYS.CUSTOMERS, mockCustomers)
//    return true
//  }
//  return false
//}

// Função para deletar múltiplos clientes
export function deleteMultipleCustomers(customerIds: string[]): boolean {
  try {
    customerIds.forEach((id) => {
      const customers = getMockCustomers()
      const index = customers.findIndex((customer) => customer.id === id)
      if (index > -1) {
        customers.splice(index, 1)
        if (typeof window !== "undefined") {
          localStorage.setItem("mockCustomers", JSON.stringify(customers))
        }
      }
    })
    return true
  } catch (error) {
    return false
  }
}

// Função para atualizar cliente
export function updateCustomer(customerId: string, updates: Partial<Customer>): boolean {
  try {
    const customers = getMockCustomers()
    const index = customers.findIndex((customer) => customer.id === customerId)
    if (index > -1) {
      customers[index] = {
        ...customers[index],
        ...updates,
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("mockCustomers", JSON.stringify(customers))
      }
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

// Função para criar cliente
export function createCustomer(customer: Omit<Customer, "id" | "created_at">): Customer {
  const customers = getMockCustomers()
  const newCustomer: Customer = {
    ...customer,
    id: (customers.length + 1).toString(),
    created_at: new Date().toISOString(),
  }
  customers.push(newCustomer)
  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }
  return newCustomer
}

// Função para buscar cliente por ID
export function getCustomerById(id: string): Customer | undefined {
  const customers = getMockCustomers()
  return customers.find((customer) => customer.id === id)
}

// Função para buscar todos os clientes
export function getAllCustomers(): Customer[] {
  return getMockCustomers()
}

// Funções para gerenciamento de carros
export function addCarToCustomer(
  customerId: string,
  carData: Omit<Car, "id" | "customer_id" | "created_at" | "updated_at">,
): Car {
  const customers = getMockCustomers()
  const customerIndex = customers.findIndex((c) => c.id === customerId)

  if (customerIndex === -1) {
    throw new Error("Cliente não encontrado")
  }

  const newCar: Car = {
    ...carData,
    id: `car_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
    customer_id: customerId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  if (!customers[customerIndex].cars) {
    customers[customerIndex].cars = []
  }

  customers[customerIndex].cars!.push(newCar)

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }

  return newCar
}

export function deleteCarFromCustomer(customerId: string, carId: string): boolean {
  const customers = getMockCustomers()
  const customer = customers.find((c) => c.id === customerId)
  if (!customer || !customer.cars) {
    return false
  }

  const carIndex = customer.cars.findIndex((car) => car.id === carId)
  if (carIndex === -1) {
    return false
  }

  customer.cars.splice(carIndex, 1)

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }
  return true
}

export function updateCarFromCustomer(customerId: string, carId: string, updates: Partial<Car>): Car | null {
  const customers = getMockCustomers()
  const customer = customers.find((c) => c.id === customerId)
  if (!customer || !customer.cars) {
    return null
  }

  const carIndex = customer.cars.findIndex((car) => car.id === carId)
  if (carIndex === -1) {
    return null
  }

  customer.cars[carIndex] = {
    ...customer.cars[carIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }

  return customer.cars[carIndex]
}

export function getCarFromCustomer(customerId: string, carId: string): Car | null {
  const customers = getMockCustomers()
  const customer = customers.find((c) => c.id === customerId)
  if (!customer || !customer.cars) {
    return null
  }

  const car = customer.cars.find((car) => car.id === carId)
  return car || null
}

export function updateCarInCustomer(customerId: string, carId: string, updates: Partial<Car>): Car | null {
  const customers = getMockCustomers()
  const customer = customers.find((c) => c.id === customerId)
  if (!customer || !customer.cars) {
    return null
  }

  const carIndex = customer.cars.findIndex((car) => car.id === carId)
  if (carIndex === -1) {
    return null
  }

  customer.cars[carIndex] = {
    ...customer.cars[carIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("mockCustomers", JSON.stringify(customers))
  }

  return customer.cars[carIndex]
}

export function getCarById(customerId: string, carId: string): Car | undefined {
  const customers = getMockCustomers()
  const customer = customers.find((c) => c.id === customerId)
  if (!customer || !customer.cars) {
    return undefined
  }

  return customer.cars.find((car) => car.id === carId)
}

// Fornecedores
const mockSuppliers = [
  {
    id: "sup-001",
    name: "AutoPeças Brasil Ltda",
    document: "12.345.678/0001-90",
    email: "contato@autopecas.com",
    phone: "(11) 3456-7890",
    contact_person: "Carlos Silva",
    address: {
      street: "Av. Paulista",
      number: "1000",
      complement: "Sala 123",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zip: "01310-100",
    },
    is_active: true,
    notes: "Fornecedor principal de peças para carros nacionais.",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-01-15T10:30:00Z",
  },
  {
    id: "sup-002",
    name: "Import Auto Parts",
    document: "23.456.789/0001-12",
    email: "sales@importauto.com",
    phone: "(11) 4567-8901",
    contact_person: "Ana Rodrigues",
    address: {
      street: "Rua Augusta",
      number: "500",
      complement: "Andar 5",
      neighborhood: "Consolação",
      city: "São Paulo",
      state: "SP",
      zip: "01304-000",
    },
    is_active: true,
    notes: "Especializado em peças para carros importados.",
    created_at: "2023-02-20T14:15:00Z",
    updated_at: "2023-02-20T14:15:00Z",
  },
  {
    id: "sup-003",
    name: "Pneus & Cia",
    document: "34.567.890/0001-23",
    email: "vendas@pneusecia.com",
    phone: "(11) 5678-9012",
    contact_person: "Roberto Almeida",
    address: {
      street: "Av. dos Bandeirantes",
      number: "2500",
      complement: "",
      neighborhood: "Campo Belo",
      city: "São Paulo",
      state: "SP",
      zip: "04553-900",
    },
    is_active: true,
    notes: "Fornecedor de pneus e serviços relacionados.",
    created_at: "2023-03-10T09:45:00Z",
    updated_at: "2023-03-10T09:45:00Z",
  },
  {
    id: "sup-004",
    name: "Eletrônicos Automotivos SA",
    document: "45.678.901/0001-34",
    email: "contato@eletronicos-auto.com",
    phone: "(11) 6789-0123",
    contact_person: "Fernanda Costa",
    address: {
      street: "Rua Vergueiro",
      number: "1500",
      complement: "Bloco B",
      neighborhood: "Vila Mariana",
      city: "São Paulo",
      state: "SP",
      zip: "04101-000",
    },
    is_active: false,
    notes: "Especializado em sistemas eletrônicos e som automotivo.",
    created_at: "2023-04-05T11:20:00Z",
    updated_at: "2023-04-05T11:20:00Z",
  },
  {
    id: "sup-005",
    name: "Lubrificantes Express",
    document: "56.789.012/0001-45",
    email: "comercial@lubrificantes.com",
    phone: "(11) 7890-1234",
    contact_person: "Marcelo Santos",
    address: {
      street: "Av. Interlagos",
      number: "3000",
      complement: "",
      neighborhood: "Interlagos",
      city: "São Paulo",
      state: "SP",
      zip: "04661-100",
    },
    is_active: true,
    notes: "Fornecedor de óleos e lubrificantes automotivos.",
    created_at: "2023-05-12T15:30:00Z",
    updated_at: "2023-05-12T15:30:00Z",
  },
  {
    id: "sup-006",
    name: "Vidros Automotivos Rio",
    document: "67.890.123/0001-56",
    email: "atendimento@vidrosrio.com",
    phone: "(21) 8901-2345",
    contact_person: "Paulo Mendes",
    address: {
      street: "Av. Brasil",
      number: "5000",
      complement: "Galpão 3",
      neighborhood: "Penha",
      city: "Rio de Janeiro",
      state: "RJ",
      zip: "21040-361",
    },
    is_active: true,
    notes: "Especializado em vidros e para-brisas.",
    created_at: "2023-06-18T10:00:00Z",
    updated_at: "2023-06-18T10:00:00Z",
  },
  {
    id: "sup-007",
    name: "Baterias do Sul",
    document: "78.901.234/0001-67",
    email: "vendas@bateriasdosul.com",
    phone: "(51) 9012-3456",
    contact_person: "Luciana Oliveira",
    address: {
      street: "Av. Assis Brasil",
      number: "1200",
      complement: "",
      neighborhood: "Sarandi",
      city: "Porto Alegre",
      state: "RS",
      zip: "91010-000",
    },
    is_active: true,
    notes: "Fornecedor de baterias automotivas.",
    created_at: "2023-07-22T13:45:00Z",
    updated_at: "2023-07-22T13:45:00Z",
  },
  {
    id: "sup-008",
    name: "Acessórios Automotivos BH",
    document: "89.012.345/0001-78",
    email: "contato@acessoriosbh.com",
    phone: "(31) 0123-4567",
    contact_person: "Ricardo Gomes",
    address: {
      street: "Av. Amazonas",
      number: "2000",
      complement: "Loja 15",
      neighborhood: "Centro",
      city: "Belo Horizonte",
      state: "MG",
      zip: "30180-001",
    },
    is_active: false,
    notes: "Fornecedor de acessórios diversos para veículos.",
    created_at: "2023-08-30T09:15:00Z",
    updated_at: "2023-08-30T09:15:00Z",
  },
]

// Atualização das funções de fornecedores para usar localStorage

// Chave para armazenar fornecedores no localStorage
const SUPPLIERS_STORAGE_KEY = "likekar_suppliers"

// Função para inicializar fornecedores no localStorage se não existirem
function initializeSuppliers() {
  if (typeof window !== "undefined") {
    const existingData = localStorage.getItem(SUPPLIERS_STORAGE_KEY)
    if (!existingData) {
      const initialSuppliers = [
        {
          id: "sup-001",
          name: "AutoPeças Brasil Ltda",
          document: "12.345.678/0001-90",
          email: "contato@autopecas.com",
          phone: "(11) 3456-7890",
          contact_person: "Carlos Silva",
          address: {
            street: "Av. Paulista",
            number: "1000",
            complement: "Sala 123",
            neighborhood: "Bela Vista",
            city: "São Paulo",
            state: "SP",
            zip: "01310-100",
          },
          is_active: true,
          notes: "Fornecedor principal de peças para carros nacionais.",
          created_at: "2023-01-15T10:30:00Z",
          updated_at: "2023-01-15T10:30:00Z",
        },
        {
          id: "sup-002",
          name: "Import Auto Parts",
          document: "23.456.789/0001-12",
          email: "sales@importauto.com",
          phone: "(11) 4567-8901",
          contact_person: "Ana Rodrigues",
          address: {
            street: "Rua Augusta",
            number: "500",
            complement: "Andar 5",
            neighborhood: "Consolação",
            city: "São Paulo",
            state: "SP",
            zip: "01304-000",
          },
          is_active: true,
          notes: "Especializado em peças para carros importados.",
          created_at: "2023-02-20T14:15:00Z",
          updated_at: "2023-02-20T14:15:00Z",
        },
        {
          id: "sup-003",
          name: "Pneus & Cia",
          document: "34.567.890/0001-23",
          email: "vendas@pneusecia.com",
          phone: "(11) 5678-9012",
          contact_person: "Roberto Almeida",
          address: {
            street: "Av. dos Bandeirantes",
            number: "2500",
            complement: "",
            neighborhood: "Campo Belo",
            city: "São Paulo",
            state: "SP",
            zip: "04553-900",
          },
          is_active: true,
          notes: "Fornecedor de pneus e serviços relacionados.",
          created_at: "2023-03-10T09:45:00Z",
          updated_at: "2023-03-10T09:45:00Z",
        },
      ]
      localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(initialSuppliers))
    }
  }
}

// Função para salvar fornecedores no localStorage
function saveSuppliers(suppliers) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(suppliers))
  }
}

// Função para carregar fornecedores do localStorage
function loadSuppliers() {
  if (typeof window !== "undefined") {
    initializeSuppliers() // Inicializa os dados se não existirem
    const stored = localStorage.getItem(SUPPLIERS_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return [] // Retorna array vazio se não houver dados
}

export function getMockSuppliers() {
  const suppliers = loadSuppliers()
  console.log("Fornecedores carregados:", suppliers) // Debug
  return suppliers
}

export function getMockSupplierById(id: string) {
  const suppliers = loadSuppliers()
  return suppliers.find((supplier) => supplier.id === id)
}

export function createMockSupplier(supplierData: any) {
  const suppliers = loadSuppliers()
  const newId = `sup-${String(suppliers.length + 1).padStart(3, "0")}`

  const newSupplier = {
    id: newId,
    ...supplierData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  suppliers.push(newSupplier)
  saveSuppliers(suppliers)
  return newSupplier
}

export function updateMockSupplier(id: string, supplierData: any) {
  const suppliers = loadSuppliers()
  const index = suppliers.findIndex((supplier) => supplier.id === id)
  if (index !== -1) {
    suppliers[index] = {
      ...suppliers[index],
      ...supplierData,
      id, // Garantir que o ID não seja alterado
      updated_at: new Date().toISOString(),
    }
    saveSuppliers(suppliers)
    return suppliers[index]
  }
  throw new Error("Fornecedor não encontrado")
}

export function deleteMockSupplier(id: string) {
  const suppliers = loadSuppliers()
  const initialLength = suppliers.length
  const newSuppliers = suppliers.filter((supplier) => supplier.id !== id)
  if (newSuppliers.length === initialLength) {
    throw new Error("Fornecedor não encontrado")
  }
  saveSuppliers(newSuppliers)
  return true
}

export function deleteMultipleSuppliers(ids: string[]) {
  const suppliers = loadSuppliers()
  const newSuppliers = suppliers.filter((supplier) => !ids.includes(supplier.id))
  saveSuppliers(newSuppliers)
  return true
}

// Função para deletar uma venda
export function deleteSaleMock(id: string): boolean {
  const index = mockSales.findIndex((sale) => sale.id === id)
  if (index > -1) {
    mockSales.splice(index, 1)
    saveToStorage(STORAGE_KEYS.SALES, mockSales)
    return true
  }
  return false
}

// Função para deletar múltiplas vendas
export function deleteMultipleSales(saleIds: string[]): boolean {
  try {
    saleIds.forEach((id) => {
      const index = mockSales.findIndex((sale) => sale.id === id)
      if (index !== -1) {
        mockSales.splice(index, 1)
      }
    })

    saveToStorage(STORAGE_KEYS.SALES, mockSales)
    return true
  } catch (error) {
    console.error("Error deleting multiple sales:", error)
    return false
  }
}

// Função para criar venda
export function createSaleMock(saleData: Omit<Sale, "id" | "number" | "saleDate">): Sale {
  const newSale: Sale = {
    ...saleData,
    id: `sale_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
    number: getNextSaleNumber(),
    saleDate: new Date().toISOString().split("T")[0],
  }

  mockSales.push(newSale)
  saveToStorage(STORAGE_KEYS.SALES, mockSales)

  return newSale
}

// Função para atualizar venda
export function updateSaleMock(id: string, updates: Partial<Sale>): Sale | null {
  const index = mockSales.findIndex((sale) => sale.id === id)
  if (index === -1) {
    return null
  }

  mockSales[index] = {
    ...mockSales[index],
    ...updates,
  }

  saveToStorage(STORAGE_KEYS.SALES, mockSales)
  return mockSales[index]
}

// Função para gerar próximo número de venda
export function getNextSaleNumber(): string {
  const currentYear = new Date().getFullYear()
  const existingSales = getAllSales()

  // Filtrar vendas do ano atual
  const currentYearSales = existingSales.filter((sale) => sale.number.includes(`VD-${currentYear}`))

  // Encontrar o maior número
  let maxNumber = 0
  currentYearSales.forEach((sale) => {
    const numberMatch = sale.number.match(/VD-\d{4}-(\d{3})/)
    if (numberMatch) {
      const num = Number.parseInt(numberMatch[1])
      if (num > maxNumber) {
        maxNumber = num
      }
    }
  })

  // Próximo número
  const nextNumber = maxNumber + 1
  return `VD-${currentYear}-${nextNumber.toString().padStart(3, "0")}`
}
