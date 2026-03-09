"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function NewLead() {
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({
    contact_id: "",
    title: "",
    amount: 0,
    step: "prospect"
  })
  const router = useRouter()

  useEffect(() => {
    // On récupère les contacts pour le menu déroulant
    const fetchContacts = async () => {
      const { data } = await supabase.from('contacts').select('id, first_name, last_name')
      setContacts(data || [])
    }
    fetchContacts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('leads').insert([formData])
    
    if (error) alert(error.message)
    else router.push("/dashboard/pipeline") // Redirection vers le pipeline pour voir le nouveau lead
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-black">Créer une opportunité (Lead) 🚀</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <label className="text-sm font-semibold text-gray-700">Associer à un contact</label>
        <select 
          className="border p-2 rounded text-black"
          onChange={(e) => setFormData({...formData, contact_id: e.target.value})}
          required
        >
          <option value="">-- Choisir un contact --</option>
          {contacts.map(c => (
            <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
          ))}
        </select>

        <label className="text-sm font-semibold text-gray-700">Nom de l'opportunité</label>
        <input className="border p-2 rounded text-black" placeholder="Ex: Vente Licence Logiciel" 
          onChange={(e) => setFormData({...formData, title: e.target.value})} required />

        <label className="text-sm font-semibold text-gray-700">Montant estimé (€)</label>
        <input className="border p-2 rounded text-black" type="number" 
          onChange={(e) => setFormData({...formData, amount: e.target.value})} required />

        <label className="text-sm font-semibold text-gray-700">Étape du pipeline</label>
        <select 
          className="border p-2 rounded text-black"
          onChange={(e) => setFormData({...formData, step: e.target.value})}
        >
          <option value="prospect">Prospect</option>
          <option value="qualification">Qualification</option>
          <option value="proposition">Proposition</option>
          <option value="negociation">Négociation</option>
        </select>

        <button type="submit" className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 mt-4">
          Créer le Lead
        </button>
      </form>
    </div>
  )
}