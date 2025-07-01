import { createSupabaseClient } from "./supabase"

export type Customer = {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  status?: string
  created_at?: string
  updated_at?: string
}

const supabase = createSupabaseClient()

// Buscar todos os clientes
export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Erro ao buscar clientes:", error)
    return []
  }
  return data as Customer[]
}

// Buscar cliente por ID
export async function getCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await supabase.from("customers").select("*").eq("id", id).single()
  if (error) {
    console.error("Erro ao buscar cliente:", error)
    return null
  }
  return data as Customer
}

// Criar novo cliente
export async function createCustomer(customer: Omit<Customer, "id" | "created_at" | "updated_at">): Promise<Customer | null> {
  const { data, error } = await supabase.from("customers").insert(customer).select().single()
  if (error) {
    console.error("Erro ao criar cliente:", error)
    return null
  }
  return data as Customer
}

// Atualizar cliente
export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
  const { data, error } = await supabase.from("customers").update(updates).eq("id", id).select().single()
  if (error) {
    console.error("Erro ao atualizar cliente:", error)
    return null
  }
  return data as Customer
}

// Deletar cliente
export async function deleteCustomer(id: string): Promise<boolean> {
  const { error } = await supabase.from("customers").delete().eq("id", id)
  if (error) {
    console.error("Erro ao deletar cliente:", error)
    return false
  }
  return true
} 