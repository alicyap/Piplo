"use client"
import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function EditTask({ params }) {
  const { id } = use(params)
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    due_date: "",
    contact_id: "",
    is_completed: false
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      // 1. Charger la tâche actuelle
      const { data: task } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single()
      
      if (task) {
        // Formater la date pour l'input datetime-local (YYYY-MM-DDTHH:mm)
        const date = task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : ""
        setFormData({ ...task, due_date: date })
      }

      // 2. Charger la liste des contacts pour le menu déroulant
      const { data: cont } = await supabase.from('contacts').select('id, first_name, last_name')
      setContacts(cont || [])
    }
    fetchData()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Filtrage pour ne pas envoyer l'ID dans l'update
    const dataToUpdate = {
      title: formData.title,
      due_date: formData.due_date,
      contact_id: parseInt(formData.contact_id),
      is_completed: formData.is_completed
    }

    const { error } = await supabase
      .from('tasks')
      .update(dataToUpdate)
      .eq('id', id)

    if (!error) {
      router.refresh()
      router.push("/dashboard/tasks")
    } else {
      alert("Erreur : " + error.message)
      setLoading(false)
    }
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-6">Modifier la Tâche ✏️</h1>
      
      <form onSubmit={handleUpdate} className="flex flex-col gap-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sujet</label>
          <input 
            className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Échéance</label>
          <input 
            type="datetime-local" 
            className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.due_date}
            onChange={e => setFormData({...formData, due_date: e.target.value})}
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Contact associé</label>
          <select 
            className="w-full border p-3 rounded-xl mt-1 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.contact_id || ""}
            onChange={e => setFormData({...formData, contact_id: e.target.value})}
            required
          >
            <option value="">-- Sélectionner un contact --</option>
            {contacts.map(c => (
              <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <input 
            type="checkbox" 
            id="completed"
            checked={formData.is_completed}
            onChange={e => setFormData({...formData, is_completed: e.target.checked})}
            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="completed" className="font-semibold text-gray-700 cursor-pointer">
            Marquer comme terminée
          </label>
        </div>

        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="flex-1 bg-gray-100 text-gray-600 p-4 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white p-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </div>
      </form>
    </div>
  )
}