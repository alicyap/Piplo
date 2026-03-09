"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*, contacts(first_name, last_name)')
      .order('due_date', { ascending: true })
    setTasks(data || [])
  }

  useEffect(() => { 
    document.title = "Piplo | Tâches";
    fetchTasks();
}, [])

  const toggleComplete = async (id, currentStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !currentStatus })
      .eq('id', id)
    
    if (!error) fetchTasks()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Mes Rappels & Actions 📝</h1>
        <Link href="/dashboard/tasks/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm">
          + Nouvelle Tâche
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {tasks.length > 0 ? tasks.map(task => (
            <div key={task.id} className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition ${task.is_completed ? 'bg-gray-50/50' : ''}`}>
              <input 
                type="checkbox" 
                checked={task.is_completed} 
                onChange={() => toggleComplete(task.id, task.is_completed)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              
              <div className="flex-1">
                <h3 className={`font-semibold text-slate-800 ${task.is_completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-gray-500">
                  👤 {task.contacts?.first_name} {task.contacts?.last_name} • 
                  📅 {task.due_date ? new Date(task.due_date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : "Pas de date"}
                </p>
              </div>

              <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                task.is_completed ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                {task.is_completed ? "Terminé" : "À faire"}
              </span>
            </div>
          )) : (
            <div className="p-12 text-center text-gray-400 italic">
              Aucune tâche prévue. Un bon commercial n'oublie jamais rien ! 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  )
}