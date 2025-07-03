"use client"

import React from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react"
import { loginAction } from "../actions"

export function LoginForm() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = React.useState(false)

  // Redirecionar em caso de sucesso
  React.useEffect(() => {
    if (state?.success) {
      router.push("/crm/dashboard")
    }
  }, [state?.success, router])

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-gray-900 relative overflow-hidden">
      {/* Efeito de gradiente moderno */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-200/40 rounded-full blur-3xl"></div>

      <div className="text-center mb-8 relative z-10">
        <div className="flex justify-center mb-6">
          <Image src="/images/like-kar-logo.png" alt="LIKE KAR Logo" width={180} height={45} className="h-12 w-auto" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Acesso Administrativo</h1>
        <p className="text-gray-600">Entre com suas credenciais para acessar o painel</p>
      </div>

      {state?.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {state.error}
        </div>
      )}

      <form action={action}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="seu.email@exemplo.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-yellow-600 hover:text-yellow-700">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-yellow-500 bg-white border-gray-300 rounded focus:ring-yellow-400"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
              Lembrar-me
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-all ${
            isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-black inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600 mb-2">Ainda não tem uma conta?</p>
        <Link href="/auth/register" className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
          Criar uma conta
        </Link>
      </div>
    </div>
  )
}
