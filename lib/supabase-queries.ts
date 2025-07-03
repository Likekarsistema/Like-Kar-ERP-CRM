// Função para buscar fornecedores
import { createSupabaseClient } from "./supabase"

export async function getSuppliers() {
  const supabase = createSupabaseClient()

  const { data, error } = await supabase.from("suppliers").select("*").order("name")

  if (error) {
    console.error("Erro ao buscar fornecedores:", error)
    return []
  }

  return data || []
}
