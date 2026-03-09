"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // 1. CHARGEMENT DES DONNÉES
  const fetchContacts = async () => {
    // On récupère les contacts et le nom de leur entreprise associée
    const { data } = await supabase
      .from('contacts')
      .select('*, companies(name)')
    setContacts(data || [])
  }

  useEffect(() => {
    document.title = "Piplo | Contacts";
    fetchContacts()
  }, [])

  // 2. LOGIQUE DE SUPPRESSION
  const handleDelete = async (id) => {
    if (confirm("Es-tu sûr de vouloir supprimer ce contact ?")) {
      const { error } = await supabase.from('contacts').delete().eq('id', id)
      
      if (error) {
        alert("Erreur lors de la suppression : " + error.message)
      } else {
        fetchContacts() // Rafraîchissement automatique
      }
    }
  }

  // 3. FILTRAGE POUR LA RECHERCHE
  const filteredContacts = contacts.filter(c => 
    c.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* HEADER : Titre et bouton d'ajout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Mes Contacts 👥</h1>
        <div className="flex gap-3">
          <Link 
            href="/dashboard/contacts/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-sm"
          >
            + Nouveau Contact
          </Link>
        </div>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
        <input 
          type="text"
          placeholder="Rechercher par nom, prénom ou email..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLEAU DES CONTACTS */}
      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left text-black">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Nom / Prénom</th>
              <th className="p-4 font-semibold text-gray-700">Entreprise</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{c.first_name} {c.last_name}</td>
                  <td className="p-4 text-gray-500 italic">
                    {c.companies?.name || "Indépendant"}
                  </td>
                  <td className="p-4 text-blue-600">{c.email}</td>
                  <td className="p-4 text-right space-x-4">
                    <Link 
                      href={`/dashboard/contacts/${c.id}/edit`} 
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-bold"
                    >
                      Modifier
                    </Link>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-12 text-center text-gray-400 italic">
                  Aucun contact trouvé pour cette recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}