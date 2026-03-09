"use client"
import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function EditContact({ params }) {
  const { id } = use(params)
  const [companies, setCompanies] = useState([]) // Pour la liste des boîtes
  const [formData, setFormData] = useState({ 
    first_name: "", last_name: "", email: "", phone: "", company_id: "" 
  })
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      // 1. Charger le contact
      const { data: contact } = await supabase.from('contacts').select('*').eq('id', id).single()
      if (contact) setFormData(contact)

      // 2. Charger toutes les entreprises disponibles
      const { data: comps } = await supabase.from('companies').select('id, name')
      setCompanies(comps || [])
    }
    fetchData()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    // On met à jour avec le company_id sélectionné
    const { error } = await supabase.from('contacts').update({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      company_id: formData.company_id || null // Gère le cas "Aucune entreprise"
    }).eq('id', id)

    if (!error) {
      router.refresh()
      router.push("/dashboard/contacts")
    }
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-black">Modifier le Contact</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 text-black">
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-3 rounded" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} placeholder="Prénom" />
          <input className="border p-3 rounded" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} placeholder="Nom" />
        </div>
        
        <input className="border p-3 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" />

        {/* NOUVEAU : CHAMP D'AFFILIATION ENTREPRISE */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Affilier à une entreprise</label>
          <select 
            className="border p-3 rounded bg-gray-50" 
            value={formData.company_id || ""} 
            onChange={e => setFormData({...formData, company_id: e.target.value})}
          >
            <option value="">-- Indépendant / Aucun --</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-indigo-600 text-white p-4 rounded-xl font-bold mt-4 shadow-lg">
          Sauvegarder les changements
        </button>
      </form>
    </div>
  )
}