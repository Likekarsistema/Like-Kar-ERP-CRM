import { KanbanBoard } from "./components/kanban-board"

export default function LeadsPage() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
          <p className="text-gray-600">Gerencie seus leads no funil de vendas</p>
        </div>
      </div>
      <div className="h-[calc(100vh-120px)]">
        <KanbanBoard />
      </div>
    </div>
  )
}
