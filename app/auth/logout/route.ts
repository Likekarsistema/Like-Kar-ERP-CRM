import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient()

  // Fazer logout no Supabase
  await supabase.auth.signOut()

  // Limpar cookies
  cookies().delete("sb-auth-token")

  // Redirecionar para a página de login
  return NextResponse.redirect(new URL("/auth/login", request.url))
}
