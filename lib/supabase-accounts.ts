import { supabase } from "@/lib/supabase"

export interface AccountReceivable {
  id: string
  customer_id: string
  invoice_number: string
  description: string
  amount: number
  issue_date: string
  due_date: string
  payment_date?: string
  status: "pending" | "paid" | "overdue" | "cancelled"
  created_at: string
  updated_at: string
  customers?: {
    id: string
    name: string
    email: string
  }
}

export interface AccountPayable {
  id: string
  supplier_id: string
  invoice_number: string
  description: string
  amount: number
  issue_date: string
  due_date: string
  payment_date?: string
  status: "pending" | "paid" | "overdue" | "cancelled"
  created_at: string
  updated_at: string
  suppliers?: {
    id: string
    name: string
    email: string
  }
}

// Contas a Receber
export async function getAccountsReceivable(): Promise<AccountReceivable[]> {
  const { data, error } = await supabase
    .from("accounts_receivable")
    .select(`
      *,
      customers (
        id,
        name,
        email
      )
    `)
    .order("due_date", { ascending: true })

  if (error) {
    console.error("Erro ao buscar contas a receber:", error)
    throw error
  }

  return data || []
}

export async function createAccountReceivable(
  account: Omit<AccountReceivable, "id" | "created_at" | "updated_at" | "customers">,
) {
  const { data, error } = await supabase.from("accounts_receivable").insert([account]).select()

  if (error) {
    console.error("Erro ao criar conta a receber:", error)
    throw error
  }

  return data[0]
}

export async function updateAccountReceivable(id: string, updates: Partial<AccountReceivable>) {
  const { data, error } = await supabase.from("accounts_receivable").update(updates).eq("id", id).select()

  if (error) {
    console.error("Erro ao atualizar conta a receber:", error)
    throw error
  }

  return data[0]
}

// Contas a Pagar
export async function getAccountsPayable(): Promise<AccountPayable[]> {
  const { data, error } = await supabase
    .from("accounts_payable")
    .select(`
      *,
      suppliers (
        id,
        name,
        email
      )
    `)
    .order("due_date", { ascending: true })

  if (error) {
    console.error("Erro ao buscar contas a pagar:", error)
    throw error
  }

  return data || []
}

export async function createAccountPayable(
  account: Omit<AccountPayable, "id" | "created_at" | "updated_at" | "suppliers">,
) {
  const { data, error } = await supabase.from("accounts_payable").insert([account]).select()

  if (error) {
    console.error("Erro ao criar conta a pagar:", error)
    throw error
  }

  return data[0]
}

export async function updateAccountPayable(id: string, updates: Partial<AccountPayable>) {
  const { data, error } = await supabase.from("accounts_payable").update(updates).eq("id", id).select()

  if (error) {
    console.error("Erro ao atualizar conta a pagar:", error)
    throw error
  }

  return data[0]
}
