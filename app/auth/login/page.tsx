import type { Metadata } from "next"
import { LoginForm } from "./components/login-form"

export const metadata: Metadata = {
  title: "Login | Like Kar",
  description: "Faça login na sua conta Like Kar",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}
