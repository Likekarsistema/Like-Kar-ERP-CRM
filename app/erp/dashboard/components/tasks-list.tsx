"use client"

import { useState } from "react"
import { Plus, X, CheckCircle2, Clock } from "lucide-react"

export function TasksList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Renovar contrato de veículos",
      subtitle: "Verificar e renovar contratos",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      title: "Atualizar catálogo de acessórios",
      subtitle: "Adicionar e Listar novos produtos",
      completed: false,
      priority: "medium",
    },
    {
      id: 3,
      title: "Agendar visitas de clientes",
      subtitle: "Verificar e agendar visitas dos clientes",
      completed: false,
      priority: "low",
    },
  ])

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const pendingTasks = tasks.filter((task) => !task.completed).length

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tarefas</h3>
            <p className="text-gray-500 text-sm">Organize seu dia</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-yellow-600 text-sm font-bold">{pendingTasks} pendentes</span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300 border border-transparent hover:border-yellow-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="mt-1 w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center hover:bg-yellow-400 transition-all duration-300 group-hover:scale-110"
            >
              {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
            </button>

            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-400 animate-pulse"
                      : task.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                  }`}
                ></div>
                <p
                  className={`font-semibold transition-all duration-300 ${
                    task.completed ? "text-gray-500 line-through" : "text-gray-900 group-hover:text-yellow-700"
                  }`}
                >
                  {task.title}
                </p>
              </div>
              <p className="text-sm text-gray-500 ml-4">{task.subtitle}</p>
            </div>

            <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 flex items-center justify-center space-x-2 py-3 px-4 border-2 border-dashed border-yellow-300 rounded-xl text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400 transition-all duration-300 group">
        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-medium">Adicionar nova tarefa</span>
      </button>
    </div>
  )
}
