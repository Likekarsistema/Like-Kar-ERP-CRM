import { createSupabaseClient } from "./supabase-client"

export interface QuoteItem {
  id: string
  name: string
  description?: string
  brand?: string
  price: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

const supabase = createSupabaseClient()

// Dados mock para fallback - agora como uma variável global para persistir durante a sessão
const mockQuoteItems: QuoteItem[] = [
  {
    id: "1",
    name: 'Multimídia Honda Civic 2020 2021 2022 V3 Carplay Android Auto 9"',
    description: "Sistema multimídia completo com Carplay e Android Auto",
    brand: "Honda",
    price: 1100.0,
    image_url: undefined,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Kit Suspensão Toyota Corolla 2019 2020 2021 Completo",
    description: "Kit de suspensão completo com amortecedores e molas",
    brand: "Toyota",
    price: 1800.0,
    image_url: undefined,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Pneus Volkswagen Golf 2021 2022 2023 Aro 16 205/55",
    description: "Conjunto de 4 pneus novos com garantia",
    brand: "Volkswagen",
    price: 1800.0,
    image_url: undefined,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Ar Condicionado Ford EcoSport 2018 2019 2020 Digital",
    description: "Sistema de ar condicionado digital completo",
    brand: "Ford",
    price: 750.0,
    image_url: undefined,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Kit Freios Chevrolet Onix 2022 2023 Dianteiro e Traseiro",
    description: "Kit de freios completo com pastilhas e discos",
    brand: "Chevrolet",
    price: 600.0,
    image_url: undefined,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Verificar se a tabela existe
async function checkTableExists(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from("quote_items").select("id").limit(1)
    return !error
  } catch (error) {
    return false
  }
}

// Verificar se o bucket de storage existe
async function checkStorageBucketExists(): Promise<boolean> {
  try {
    const { data, error } = await supabase.storage.getBucket("quote-item-images")
    return !error && data !== null
  } catch (error) {
    return false
  }
}

// Funções para gerenciar itens de orçamento
export async function getQuoteItems(): Promise<QuoteItem[]> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      console.log("Tabela quote_items não encontrada, usando dados mock")
      return [...mockQuoteItems] // Retorna uma cópia para evitar mutações
    }

    const { data, error } = await supabase
      .from("quote_items")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar itens de orçamento:", error)
      return [...mockQuoteItems]
    }

    return data as QuoteItem[]
  } catch (error) {
    console.error("Erro ao buscar itens de orçamento:", error)
    return [...mockQuoteItems]
  }
}

export async function getQuoteItemById(id: string): Promise<QuoteItem | null> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      return mockQuoteItems.find((item) => item.id === id) || null
    }

    const { data, error } = await supabase.from("quote_items").select("*").eq("id", id).single()

    if (error) {
      console.error("Erro ao buscar item de orçamento:", error)
      return mockQuoteItems.find((item) => item.id === id) || null
    }

    return data as QuoteItem
  } catch (error) {
    console.error("Erro ao buscar item de orçamento:", error)
    return mockQuoteItems.find((item) => item.id === id) || null
  }
}

export async function createQuoteItem(item: Omit<QuoteItem, "id" | "created_at" | "updated_at">): Promise<QuoteItem> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      // Simular criação com dados mock
      const newItem: QuoteItem = {
        ...item,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockQuoteItems.unshift(newItem) // Adiciona no início da lista
      console.log("Item criado no modo mock:", newItem)
      return newItem
    }

    const { data, error } = await supabase.from("quote_items").insert([item]).select().single()

    if (error) {
      console.error("Erro ao criar item de orçamento:", error)
      throw error
    }

    return data as QuoteItem
  } catch (error) {
    console.error("Erro ao criar item de orçamento:", error)
    throw error
  }
}

export async function updateQuoteItem(id: string, updates: Partial<QuoteItem>): Promise<QuoteItem> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      // Simular atualização com dados mock
      const index = mockQuoteItems.findIndex((item) => item.id === id)
      if (index !== -1) {
        mockQuoteItems[index] = { ...mockQuoteItems[index], ...updates, updated_at: new Date().toISOString() }
        console.log("Item atualizado no modo mock:", mockQuoteItems[index])
        return mockQuoteItems[index]
      }
      throw new Error("Item não encontrado")
    }

    const { data, error } = await supabase.from("quote_items").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Erro ao atualizar item de orçamento:", error)
      throw error
    }

    return data as QuoteItem
  } catch (error) {
    console.error("Erro ao atualizar item de orçamento:", error)
    throw error
  }
}

export async function deleteQuoteItem(id: string): Promise<void> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      // Simular exclusão com dados mock
      const index = mockQuoteItems.findIndex((item) => item.id === id)
      if (index !== -1) {
        const deletedItem = mockQuoteItems.splice(index, 1)[0]
        console.log("Item excluído no modo mock:", deletedItem)
      }
      return
    }

    const { error } = await supabase.from("quote_items").delete().eq("id", id)

    if (error) {
      console.error("Erro ao excluir item de orçamento:", error)
      throw error
    }
  } catch (error) {
    console.error("Erro ao excluir item de orçamento:", error)
    throw error
  }
}

export async function deleteMultipleQuoteItems(ids: string[]): Promise<void> {
  try {
    const tableExists = await checkTableExists()

    if (!tableExists) {
      // Simular exclusão múltipla com dados mock
      ids.forEach((id) => {
        const index = mockQuoteItems.findIndex((item) => item.id === id)
        if (index !== -1) {
          const deletedItem = mockQuoteItems.splice(index, 1)[0]
          console.log("Item excluído no modo mock:", deletedItem)
        }
      })
      return
    }

    const { error } = await supabase.from("quote_items").delete().in("id", ids)

    if (error) {
      console.error("Erro ao excluir itens de orçamento:", error)
      throw error
    }
  } catch (error) {
    console.error("Erro ao excluir itens de orçamento:", error)
    throw error
  }
}

// Função para upload de imagem com verificação de bucket
export async function uploadQuoteItemImage(file: File, itemId: string): Promise<string | null> {
  try {
    // Verificar se o bucket existe
    const bucketExists = await checkStorageBucketExists()

    if (!bucketExists) {
      console.warn("Bucket de storage não configurado, pulando upload de imagem")
      return null
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${itemId}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("quote-item-images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Erro ao fazer upload da imagem:", error)
      return null
    }

    // Obter URL pública
    const {
      data: { publicUrl },
    } = supabase.storage.from("quote-item-images").getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error)
    return null
  }
}
