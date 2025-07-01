import { redirect } from "next/navigation"
import { createServerSupabaseClientWithCookies } from "./supabase-server"

// Verificar se o usuário está autenticado
export async function getSession() {
  const supabase = createServerSupabaseClientWithCookies()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Erro ao obter sessão:", error)
    return null
  }
}

// Middleware para rotas protegidas
export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  return session
}

// Middleware para rotas públicas (redireciona usuários logados)
export async function requireNoAuth() {
  const session = await getSession()

  if (session) {
    redirect("/erp/dashboard")
  }

  return null
}
