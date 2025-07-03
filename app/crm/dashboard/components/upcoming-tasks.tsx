"use client"

import { useState } from "react"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function UpcomingTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Ligar para João Silva",
      dueDate: "Hoje, 14:00",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Enviar proposta para Empresa ABC",
      dueDate: "Amanhã, 10:00",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Reunião com equipe de vendas",
      dueDate: "Quinta, 09:00",
      priority: "high",
      completed: false,
    },
    {
      id: 4,
      title: "Atualizar relatório mensal",
      dueDate: "Sexta, 17:00",
      priority: "low",
      completed: false,
    },
  ])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <Clock className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Tarefas Próximas</h2>
        <a href="/crm/tarefas" className="text-sm font-medium text-yellow-600 hover:text-yellow-500">
          Ver todas
        </a>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start p-3 rounded-lg border ${
              task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex-shrink-0">
              <button onClick={() => toggleTaskCompletion(task.id)} className="focus:outline-none">
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                )}
              </button>
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                {task.title}
              </p>
              <div className="mt-1 flex items-center">
                {getPriorityIcon(task.priority)}
                <span className="ml-1.5 text-xs text-gray-500">{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
          + Nova Tarefa
        </button>
      </div>
    </div>
  )
}
