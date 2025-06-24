import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

// Verificar se o usuário está autenticado usando cookies
export async function getAuthUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get("sb-access-token")?.value
    const userEmail = cookieStore.get("user-email")?.value

    if (!accessToken || !userEmail) {
      return null
    }

    return {
      id: "user-" + Date.now(),
      email: userEmail,
      user_metadata: {
        full_name: userEmail.split("@")[0],
      },
    }
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error)
    return null
  }
}

// Middleware para rotas protegidas
export async function requireAuth(): Promise<User> {
  const user = await getAuthUser()

  if (!user) {
    redirect("/auth/login")
  }

  return user
}

// Verificar se usuário está logado (para rotas públicas)
export async function checkAuth(): Promise<User | null> {
  return await getAuthUser()
}
