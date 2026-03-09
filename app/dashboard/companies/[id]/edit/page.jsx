"use client"
import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function EditCompany({ params }) {
  const { id } = use(params)
  const [formData, setFormData] = useState({ name: "", industry: "", address: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getCompany = async () => {
      const { data } = await supabase.from('companies').select('*').eq('id', id).single()
      if (data) setFormData(data)
    }
    getCompany()
  }, [id])

  const handleUpdate = async (e) => {
  e.preventDefault()
  setLoading(true)

  // ON CRÉE UN OBJET PROPRE SANS L'ID
  const dataToUpdate = {
    name: formData.name,
    industry: formData.industry,
    address: formData.address,
    phone: formData.phone
  }

  const { error } = await supabase
    .from('companies')
    .update(dataToUpdate) // On envoie l'objet filtré ici
    .eq('id', id)
  
  if (!error) {
    router.refresh()
    router.push("/dashboard/companies")
  } else {
    alert("Erreur Supabase : " + error.message)
    setLoading(false)
  }
}

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-2xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">Modifier l'Entreprise 🏢</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 text-black">
        <label className="text-xs font-bold text-gray-400 uppercase">Nom de l'entreprise</label>
        <input className="border p-3 rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        
        <label className="text-xs font-bold text-gray-400 uppercase">Secteur d'activité</label>
        <input className="border p-3 rounded-lg" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
        
        <label className="text-xs font-bold text-gray-400 uppercase">Adresse postale</label>
        <textarea className="border p-3 rounded-lg" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
        
        <label className="text-xs font-bold text-gray-400 uppercase">Téléphone standard</label>
        <input className="border p-3 rounded-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />

        <button type="submit" disabled={loading} className="bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 transition mt-4">
          {loading ? "Mise à jour..." : "Enregistrer les modifications"}
        </button>
      </form>
    </div>
  )
}