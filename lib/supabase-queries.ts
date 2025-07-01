// Função para buscar fornecedores
import { supabase } from "./supabase"

export type Supplier = {
  id: string
  name: string
  document?: string
  email?: string
  phone?: string
  address?: any
  contact_person?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export async function getSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase.from("suppliers").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Erro ao buscar fornecedores:", error)
    return []
  }
  return data as Supplier[]
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  const { data, error } = await supabase.from("suppliers").select("*").eq("id", id).single()
  if (error) {
    console.error("Erro ao buscar fornecedor:", error)
    return null
  }
  return data as Supplier
}

export async function createSupplier(supplier: Omit<Supplier, "id" | "created_at" | "updated_at">): Promise<Supplier | null> {
  const { data, error } = await supabase.from("suppliers").insert(supplier).select().single()
  if (error) {
    console.error("Erro ao criar fornecedor:", error)
    return null
  }
  return data as Supplier
}

export async function updateSupplier(id: string, updates: Partial<Supplier>): Promise<Supplier | null> {
  const { data, error } = await supabase.from("suppliers").update(updates).eq("id", id).select().single()
  if (error) {
    console.error("Erro ao atualizar fornecedor:", error)
    return null
  }
  return data as Supplier
}

export async function deleteSupplier(id: string): Promise<boolean> {
  const { error } = await supabase.from("suppliers").delete().eq("id", id)
  if (error) {
    console.error("Erro ao deletar fornecedor:", error)
    return false
  }
  return true
}
