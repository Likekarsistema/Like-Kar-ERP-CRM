"use server"

import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if (!email || !password) {
      return {
        success: false,
        error: "Email e senha são obrigatórios",
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      let errorMessage = "Erro ao fazer login"

      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou senha incorretos"
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirme seu email antes de fazer login"
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    if (data.session && data.user) {
      // Armazenar tokens em cookies seguros
      const cookieStore = cookies()

      cookieStore.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.session.expires_in,
        path: "/",
      })

      cookieStore.set("user-email", data.user.email || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: data.session.expires_in,
        path: "/",
      })

      return {
        success: true,
        message: "Login realizado com sucesso!",
      }
    }

    return {
      success: false,
      error: "Erro inesperado no login",
    }
  } catch (error) {
    console.error("Erro no login:", error)
    return {
      success: false,
      error: "Erro interno do servidor. Tente novamente.",
    }
  }
}
