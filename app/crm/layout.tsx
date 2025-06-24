import type { ReactNode } from "react"
import { CrmHeaderHorizontal } from "./components/crm-header-horizontal"

// Dados mock do usuário
const mockUser = {
  id: "mock-user-id",
  email: "leya.raphaella@likekar.com",
  user_metadata: {
    full_name: "Leya Raphaella",
  },
}

export default function CrmLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header Horizontal - único menu */}
      <CrmHeaderHorizontal user={mockUser} />

      {/* Área de Conteúdo - sem sidebar */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
