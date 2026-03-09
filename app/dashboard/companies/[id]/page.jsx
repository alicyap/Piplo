"use client"
import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function CompanyDetail({ params }) {
  const { id } = use(params)
  const [company, setCompany] = useState(null)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // 1. Infos de l'entreprise
      const { data: comp } = await supabase.from('companies').select('*').eq('id', id).single()
      setCompany(comp)

      // 2. Contacts liés à cette entreprise
      const { data: cont } = await supabase.from('contacts').select('*').eq('company_id', id)
      setContacts(cont || [])
    }
    fetchData()
  }, [id])

  if (!company) return <div className="p-10 text-black">Chargement...</div>

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/dashboard/companies" className="text-blue-600 hover:underline mb-6 block">← Retour à la liste</Link>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        {/* HEADER AVEC BOUTON MODIFIER */}
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">{company.name}</h1>
            <p className="opacity-70 mt-2 uppercase tracking-widest">{company.industry}</p>
          </div>
          <Link 
            href={`/dashboard/companies/${id}/edit`} 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-bold border border-white/20 transition-all flex items-center gap-2"
          >
            ✏️ Modifier
          </Link>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Informations Générales</h3>
            <p className="text-lg"><strong>📍 Adresse :</strong> {company.address || "Non renseignée"}</p>
            <p className="text-lg"><strong>📞 Standard :</strong> {company.phone || "Non renseigné"}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Statistiques</h3>
            <p className="text-lg"><strong>👥 Nombre de contacts :</strong> {contacts.length}</p>
          </div>
        </div>
      </div>

      {/* LISTE DES CONTACTS DE L'ENTREPRISE */}
      <h2 className="text-2xl font-bold mb-4 text-black">Employés & Contacts rattachés</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-black">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Nom</th>
              <th className="p-4 font-semibold">Poste / Email</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{c.first_name} {c.last_name}</td>
                  <td className="p-4 text-gray-600">{c.email}</td>
                  <td className="p-4 text-right">
                    <Link href={`/dashboard/contacts/${c.id}/edit`} className="text-blue-600 font-bold hover:underline">Voir</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-400 italic">Aucun contact affilié à cette entreprise.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}