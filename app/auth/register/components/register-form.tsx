"use client"

import React from "react"
import { useActionState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Lock, Mail, User, Phone, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { signUpAction } from "../../actions"

export function RegisterForm() {
  const [state, action, isPending] = useActionState(signUpAction, null)
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
          {/* Efeitos de gradiente modernos */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl"></div>

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
            <h1 className="text-3xl font-bold mb-2 text-white">Criar Conta</h1>
            <p className="text-gray-400">Preencha os dados para criar sua conta</p>
          </div>

          {/* Mensagens de feedback */}
          {state?.error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {state?.success && state?.message && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-mail *
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
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Telefone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 6 caracteres</p>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-yellow-400 bg-white/10 border-white/20 rounded focus:ring-yellow-400 focus:ring-2 mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                Eu concordo com os{" "}
                <Link href="/termos" className="text-yellow-400 hover:text-yellow-300">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-yellow-400 hover:text-yellow-300">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-[1.02] shadow-lg ${
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
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 mb-4">Já tem uma conta?</p>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-yellow-400/30 text-yellow-400 rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all font-medium"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
