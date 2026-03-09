"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function NewCompany() {
  const [name, setName] = useState("")
  const [industry, setIndustry] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('companies')
      .insert([{ 
        name, 
        industry, 
        address, 
        phone 
      }])

    if (error) {
      alert("Erreur lors de la création : " + error.message)
      setLoading(false)
    } else {
      // On retourne vers la création de contact pour lier immédiatement quelqu'un à cette boîte
      router.push("/dashboard/contacts/new") 
    }
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <span>🏢</span> Nouvelle Entreprise
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nom de l'entité *</label>
          <input 
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none mt-1" 
            placeholder="Ex: Google France" 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Secteur</label>
          <input 
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none mt-1" 
            placeholder="Ex: Informatique" 
            onChange={e => setIndustry(e.target.value)} 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Numéro de téléphone</label>
          <input 
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none mt-1" 
            type="tel"
            placeholder="01 02 03 04 05" 
            onChange={e => setPhone(e.target.value)} 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-1">Adresse complète</label>
          <textarea 
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none mt-1 min-h-[100px]" 
            placeholder="Rue, Code Postal, Ville..." 
            onChange={e => setAddress(e.target.value)} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`mt-4 p-4 rounded-xl font-bold text-white transition-all shadow-lg ${
            loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'
          }`}
        >
          {loading ? "Création en cours..." : "Créer l'entreprise"}
        </button>
      </form>
    </div>
  )
}