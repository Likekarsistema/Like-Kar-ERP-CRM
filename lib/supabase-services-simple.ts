// Dados mock para demonstração
export interface Service {
  id: string
  name: string
  description?: string
  price: number
  status: "ativo" | "inativo"
  times_performed: number
  created_at: string
  updated_at: string
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Troca de Óleo",
    description: "Troca completa do óleo do motor com filtro",
    price: 89.9,
    status: "ativo",
    times_performed: 156,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Alinhamento e Balanceamento",
    description: "Alinhamento das rodas e balanceamento dos pneus",
    price: 120.0,
    status: "ativo",
    times_performed: 89,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "3",
    name: "Revisão Completa",
    description: "Revisão geral do veículo com checklist completo",
    price: 250.0,
    status: "ativo",
    times_performed: 45,
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z",
  },
  {
    id: "4",
    name: "Troca de Pastilhas de Freio",
    description: "Substituição das pastilhas de freio dianteiras",
    price: 180.0,
    status: "ativo",
    times_performed: 67,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
  {
    id: "5",
    name: "Instalação de Som",
    description: "Instalação de sistema de som automotivo",
    price: 150.0,
    status: "inativo",
    times_performed: 23,
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-01T10:00:00Z",
  },
]

// Simular delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getServices(): Promise<Service[]> {
  await delay(500) // Simular carregamento
  return [...mockServices]
}

export async function getServiceById(id: string): Promise<Service | null> {
  await delay(300)
  return mockServices.find((s) => s.id === id) || null
}

export async function createService(
  service: Omit<Service, "id" | "created_at" | "updated_at" | "times_performed">,
): Promise<Service> {
  await delay(1000)

  const newService: Service = {
    ...service,
    id: Math.random().toString(36).substr(2, 9),
    times_performed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockServices.unshift(newService)
  return newService
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  await delay(800)

  const index = mockServices.findIndex((s) => s.id === id)
  if (index === -1) return null

  mockServices[index] = {
    ...mockServices[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  return mockServices[index]
}

export async function deleteService(id: string): Promise<void> {
  await delay(500)

  const index = mockServices.findIndex((s) => s.id === id)
  if (index !== -1) {
    mockServices.splice(index, 1)
  }
}

export async function deleteMultipleServices(ids: string[]): Promise<void> {
  await delay(800)

  ids.forEach((id) => {
    const index = mockServices.findIndex((s) => s.id === id)
    if (index !== -1) {
      mockServices.splice(index, 1)
    }
  })
}
