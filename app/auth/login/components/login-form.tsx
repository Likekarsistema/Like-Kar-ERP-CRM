"use client"

import React from "react"
import { useActionState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { signInAction } from "../../actions"

// Add useRouter and useEffect to handle redirection
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(signInAction, null)
  const [showPassword, setShowPassword] = React.useState(false)

  // Add useEffect to handle redirection
  React.useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 relative overflow-hidden">
          {/* Efeitos de gradiente modernos */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-200/40 rounded-full blur-3xl"></div>

          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/like-kar-logo.png"
                alt="LIKE KAR Logo"
                width={180}
                height={45}
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Bem-vindo de volta</h1>
            <p className="text-gray-600">Entre com suas credenciais para acessar o sistema</p>
          </div>

          {/* Mensagens de feedback */}
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {state?.message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-gray-900 placeholder-gray-500 shadow-sm"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-gray-900 placeholder-gray-500 shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-yellow-500 bg-white border-gray-300 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Lembrar-me por 30 dias
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-[1.02] shadow-md ${
                isPending ? "opacity-70 cursor-not-allowed scale-100" : ""
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
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                "Entrar no Sistema"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Ainda não tem uma conta?</p>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-yellow-400/50 text-yellow-600 rounded-lg hover:bg-yellow-50 hover:border-yellow-500 transition-all font-medium"
            >
              Criar uma conta
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Ao fazer login, você concorda com nossos{" "}
              <Link href="/termos" className="text-yellow-600 hover:text-yellow-700">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="text-yellow-600 hover:text-yellow-700">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
