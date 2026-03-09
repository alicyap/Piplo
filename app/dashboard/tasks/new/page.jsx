"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function NewTask() {
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({
    title: "", 
    due_date: "", 
    contact_id: ""
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await supabase.from('contacts').select('id, first_name, last_name')
      setContacts(data || [])
    }
    fetchContacts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Insertion selon ta structure SQL
    const { error } = await supabase.from('tasks').insert([{
      title: formData.title,
      due_date: formData.due_date,
      contact_id: parseInt(formData.contact_id), // Conversion car ton ID est un INTEGER
      is_completed: false
    }])

    if (!error) {
      router.push("/dashboard/tasks")
    } else {
      alert("Erreur : " + error.message)
      setLoading(false)
    }
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">Planifier une Action ⚡</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sujet de la tâche</label>
          <input 
            className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" 
            placeholder="Ex: Rappeler pour la signature" 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Date et Heure limite</label>
          <input 
            type="datetime-local" 
            className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" 
            onChange={e => setFormData({...formData, due_date: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Lier à un contact</label>
          <select 
            className="w-full border p-3 rounded-xl mt-1 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500" 
            onChange={e => setFormData({...formData, contact_id: e.target.value})} 
            required
          >
            <option value="">-- Sélectionner un client --</option>
            {contacts.map(c => (
              <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-indigo-600 text-white p-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all mt-4 disabled:bg-gray-400"
        >
          {loading ? "Planification..." : "Programmer la tâche"}
        </button>
      </form>
    </div>
  )
}