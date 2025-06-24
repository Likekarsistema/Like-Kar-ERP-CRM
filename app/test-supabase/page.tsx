"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<string>("Testando...")
  const [userCount, setUserCount] = useState<number | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Testar conexão básica
        const { data, error } = await supabase.from("user_profiles").select("count", { count: "exact", head: true })

        if (error) {
          setConnectionStatus(`Erro: ${error.message}`)
        } else {
          setConnectionStatus("✅ Conectado com sucesso!")
          setUserCount(data?.length || 0)
        }
      } catch (err) {
        setConnectionStatus(`❌ Erro de conexão: ${err}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Teste Supabase</h1>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Status da Conexão:</h3>
            <p className="text-sm text-gray-600">{connectionStatus}</p>
          </div>

          {userCount !== null && (
            <div>
              <h3 className="font-semibold">Perfis de Usuário:</h3>
              <p className="text-sm text-gray-600">{userCount} registros encontrados</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold">Variáveis de Ambiente:</h3>
            <p className="text-xs text-gray-500">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurada" : "❌ Não encontrada"}
            </p>
            <p className="text-xs text-gray-500">
              Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurada" : "❌ Não encontrada"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
