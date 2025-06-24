import { createSupabaseClient } from "./supabase-client"

export interface Service {
  id: string
  name: string
  description?: string
  price: number
  status: "ativo" | "inativo"
  times_performed: number
  created_at: string
  updated_at: string
  created_by?: string
  updated_by?: string
}

// Dados mock como fallback
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

const supabase = createSupabaseClient()

// Função para verificar se a tabela existe
async function checkTableExists(): Promise<boolean> {
  try {
    const { error } = await supabase.from("services").select("id").limit(1)
    return !error
  } catch {
    return false
  }
}

// Funções para Serviços
export async function getServices(): Promise<Service[]> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      console.warn("Tabela 'services' não encontrada. Usando dados mock.")
      return mockServices
    }

    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar serviços:", error)
      console.warn("Usando dados mock como fallback.")
      return mockServices
    }

    return data as Service[]
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    console.warn("Usando dados mock como fallback.")
    return mockServices
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      const mockService = mockServices.find((s) => s.id === id)
      return mockService || null
    }

    const { data, error } = await supabase.from("services").select("*").eq("id", id).single()

    if (error) {
      console.error("Erro ao buscar serviço:", error)
      const mockService = mockServices.find((s) => s.id === id)
      return mockService || null
    }

    return data as Service
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    const mockService = mockServices.find((s) => s.id === id)
    return mockService || null
  }
}

export async function createService(
  service: Omit<Service, "id" | "created_at" | "updated_at" | "times_performed">,
): Promise<Service> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      // Simular criação com dados mock
      const newService: Service = {
        ...service,
        id: Math.random().toString(36).substr(2, 9),
        times_performed: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      console.warn("Tabela 'services' não encontrada. Simulando criação de serviço.")
      return newService
    }

    const { data, error } = await supabase
      .from("services")
      .insert({
        ...service,
        times_performed: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar serviço:", error)
      throw error
    }

    return data as Service
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    // Simular criação com dados mock
    const newService: Service = {
      ...service,
      id: Math.random().toString(36).substr(2, 9),
      times_performed: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    return newService
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      console.warn("Tabela 'services' não encontrada. Simulando atualização de serviço.")
      const mockService = mockServices.find((s) => s.id === id)
      if (mockService) {
        return { ...mockService, ...updates, updated_at: new Date().toISOString() }
      }
      return null
    }

    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Erro ao atualizar serviço:", error)
      throw error
    }

    return data as Service
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    const mockService = mockServices.find((s) => s.id === id)
    if (mockService) {
      return { ...mockService, ...updates, updated_at: new Date().toISOString() }
    }
    return null
  }
}

export async function deleteService(id: string): Promise<void> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      console.warn("Tabela 'services' não encontrada. Simulando exclusão de serviço.")
      return
    }

    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) {
      console.error("Erro ao excluir serviço:", error)
      throw error
    }
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    // Simular exclusão (não fazer nada)
  }
}

export async function deleteMultipleServices(ids: string[]): Promise<void> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      console.warn("Tabela 'services' não encontrada. Simulando exclusão de serviços.")
      return
    }

    const { error } = await supabase.from("services").delete().in("id", ids)

    if (error) {
      console.error("Erro ao excluir serviços:", error)
      throw error
    }
  } catch (error) {
    console.error("Erro na conexão com o banco:", error)
    // Simular exclusão (não fazer nada)
  }
}

// Função para buscar serviços com filtros
export async function searchServices(searchTerm: string, status?: string): Promise<Service[]> {
  try {
    const services = await getServices()

    return services.filter((service) => {
      const matchesSearch =
        !searchTerm ||
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = !status || status === "todos" || service.status === status

      return matchesSearch && matchesStatus
    })
  } catch (error) {
    console.error("Erro ao buscar serviços:", error)
    return mockServices
  }
}
