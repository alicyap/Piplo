"use client"
import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function EditLead({ params }) {
  const { id } = use(params)
  const [formData, setFormData] = useState({ 
    title: "", 
    amount: 0, 
    status: "", 
    step: "" // On ajoute le step ici
  })
  const router = useRouter()

  useEffect(() => {
    const getLead = async () => {
      const { data } = await supabase.from('leads').select('*').eq('id', id).single()
      if (data) setFormData(data)
    }
    getLead()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    // On n'envoie que les champs modifiables pour éviter les erreurs Supabase
    const { error } = await supabase.from('leads').update({
      title: formData.title,
      amount: formData.amount,
      status: formData.status,
      step: formData.step
    }).eq('id', id)

    if (error) alert(error.message)
    else router.push("/dashboard/pipeline")
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-black">Modifier l'Opportunité 🚀</h1>
      
      <form onSubmit={handleUpdate} className="flex flex-col gap-6 text-black">
        {/* TITRE ET MONTANT */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-600 uppercase">Désignation</label>
          <input className="border p-3 rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-600 uppercase">Montant (€)</label>
          <input className="border p-3 rounded-lg" type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
        </div>

        {/* ÉTAPE DU PIPELINE (Pour déplacer le lead de colonne) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-600 uppercase">Étape (Colonne Pipeline)</label>
          <select className="border p-3 rounded-lg bg-blue-50" value={formData.step} onChange={e => setFormData({...formData, step: e.target.value})}>
            <option value="prospect">Prospect</option>
            <option value="qualification">Qualification</option>
            <option value="proposition">Proposition</option>
            <option value="negociation">Négociation</option>
          </select>
        </div>

        {/* STATUT MÉTIER (L'état du deal) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-600 uppercase">Statut Commercial</label>
          <select className="border p-3 rounded-lg bg-green-50" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En Cours</option>
            <option value="converti">✅ Converti (Gagné)</option>
            <option value="perdu">❌ Perdu</option>
          </select>
        </div>

        <button type="submit" className="bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}