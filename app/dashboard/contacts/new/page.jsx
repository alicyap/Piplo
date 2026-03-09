"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewContact() {
  const [companies, setCompanies] = useState([])
  const [formData, setFormData] = useState({ 
    first_name: "", last_name: "", email: "", company_id: "" 
  })
  const router = useRouter()

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data } = await supabase.from('companies').select('id, name')
      setCompanies(data || [])
    }
    fetchCompanies()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('contacts').insert([formData])
    if (!error) router.push("/dashboard/contacts")
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-black">Nouveau Contact 👤</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
        <input placeholder="Prénom" className="border p-3 rounded" onChange={e => setFormData({...formData, first_name: e.target.value})} required />
        <input placeholder="Nom" className="border p-3 rounded" onChange={e => setFormData({...formData, last_name: e.target.value})} required />
        <input placeholder="Email" type="email" className="border p-3 rounded" onChange={e => setFormData({...formData, email: e.target.value})} required />

        {/* SÉLECTION DE L'ENTREPRISE */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Entreprise</label>
          <div className="flex gap-2">
            <select 
              className="flex-1 border p-3 rounded bg-gray-50"
              onChange={e => setFormData({...formData, company_id: e.target.value})}
            >
              <option value="">-- Particulier / Indépendant --</option>
              {companies.map(comp => (
                <option key={comp.id} value={comp.id}>{comp.name}</option>
              ))}
            </select>
            <Link href="/dashboard/companies/new" className="bg-gray-200 p-3 rounded hover:bg-gray-300" title="Créer une nouvelle entreprise">
              🏢+
            </Link>
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-4 rounded-xl font-bold mt-4">
          Créer le contact
        </button>
      </form>
    </div>
  )
}