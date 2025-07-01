"use server"

import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signInAction(prevState: any, formData: FormData) {
  console.log("🔐 Iniciando processo de login...")

  try {
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if (!email || !password) {
      return {
        success: false,
        error: "Email e senha são obrigatórios",
      }
    }

    console.log("📧 Tentando login para:", email)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("❌ Erro no login:", error.message)

      let errorMessage = "Erro ao fazer login"

      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou senha incorretos"
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirme seu email antes de fazer login"
      } else if (error.message.includes("Too many requests")) {
        errorMessage = "Muitas tentativas. Tente novamente em alguns minutos"
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    if (data.session && data.user) {
      console.log("✅ Login bem-sucedido")

      // Armazenar tokens em cookies seguros
      const cookieStore = cookies()

      cookieStore.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.session.expires_in,
        path: "/",
      })

      cookieStore.set("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      })

      cookieStore.set("user-email", data.user.email || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.session.expires_in,
        path: "/",
      })

      cookieStore.set("user-name", data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Usuário", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.session.expires_in,
        path: "/",
      })

      return {
        success: true,
        redirectTo: "/erp/dashboard",
        message: "Login realizado com sucesso!",
      }
    }

    return {
      success: false,
      error: "Erro inesperado no login",
    }
  } catch (error) {
    console.error("💥 Erro geral no login:", error)
    return {
      success: false,
      error: "Erro interno do servidor. Tente novamente.",
    }
  }
}

export async function signUpAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    const fullName = formData.get("fullName")?.toString()
    const phone = formData.get("phone")?.toString() || ""

    if (!email || !password || !fullName) {
      return {
        success: false,
        error: "Todos os campos obrigatórios devem ser preenchidos",
      }
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "A senha deve ter pelo menos 6 caracteres",
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    })

    if (error) {
      let errorMessage = "Erro ao criar conta"

      if (error.message.includes("User already registered")) {
        errorMessage = "Este email já está cadastrado"
      } else if (error.message.includes("Password should be at least")) {
        errorMessage = "A senha deve ter pelo menos 6 caracteres"
      } else if (error.message.includes("Invalid email")) {
        errorMessage = "Email inválido"
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    if (data.user) {
      return {
        success: true,
        message: data.user.email_confirmed_at
          ? "Conta criada com sucesso! Você pode fazer login agora."
          : "Conta criada! Verifique seu email para confirmar a conta antes de fazer login.",
      }
    }

    return {
      success: false,
      error: "Erro ao criar conta",
    }
  } catch (error) {
    console.error("Erro no registro:", error)
    return {
      success: false,
      error: "Erro interno do servidor",
    }
  }
}

export async function signOutAction() {
  console.log("🚪 Fazendo logout...")

  try {
    const cookieStore = cookies()

    // Remover cookies de autenticação
    cookieStore.delete("sb-access-token")
    cookieStore.delete("sb-refresh-token")
    cookieStore.delete("user-email")
    cookieStore.delete("user-name")

    // Fazer logout no Supabase
    await supabase.auth.signOut()

    console.log("✅ Logout realizado com sucesso")
  } catch (error) {
    console.error("💥 Erro no logout:", error)
  }

  redirect("/auth/login")
}
