"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const fetchCompanies = async () => {
    const { data } = await supabase.from('companies').select('*')
    setCompanies(data || [])
  }

  useEffect(() => { 
    document.title = "Piplo | Entreprises";
    fetchCompanies();
  }, [])

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Entreprises Partenaires 🏢</h1>
        <Link href="/dashboard/companies/new" className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">
          + Nouvelle Entreprise
        </Link>
      </div>

      <input 
        type="text" 
        placeholder="Rechercher une entreprise ou un secteur..." 
        className="w-full p-3 border rounded-lg mb-6 text-black"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(company => (
          <Link href={`/dashboard/companies/${company.id}`} key={company.id}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition cursor-pointer group">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600">{company.name}</h2>
                <span className="text-blue-500">➔</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">{company.industry || "Secteur non défini"}</p>
              <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                📍 {company.address || "Adresse non renseignée"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}