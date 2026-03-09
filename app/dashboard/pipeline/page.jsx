"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

const STEPS = ['prospect', 'qualification', 'proposition', 'negociation']

export default function PipelinePage() {
  const [leads, setLeads] = useState([])

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*, contacts(first_name, last_name)')
    setLeads(data || [])
  }

  useEffect(() => {
    document.title = "Piplo | Pipeline de Vente";
    fetchLeads();
  }, [])

  const updateLeadStep = async (id, currentStep) => {
    const nextSteps = {
      'prospect': 'qualification',
      'qualification': 'proposition',
      'proposition': 'negociation',
      'negociation': 'prospect'
    }
    const next = nextSteps[currentStep]
    
    const { error } = await supabase.from('leads').update({ step: next }).eq('id', id)
    
    if (error) {
      alert(error.message)
    } else {
      fetchLeads()
    }
  } 

  const handleDeleteLead = async (e, id) => {
    e.stopPropagation() 
    if (confirm("Voulez-vous vraiment supprimer cette opportunité ?")) {
      const { error } = await supabase.from('leads').delete().eq('id', id)
      if (error) alert(error.message)
      else fetchLeads()
    }
  }

const getStatusBadge = (status) => {
  switch (status) {
    case 'converti':
      return "bg-green-100 text-green-700 border-green-200";
    case 'perdu':
      return "bg-red-100 text-red-700 border-red-200";
    case 'en_cours':
      return "bg-blue-100 text-blue-700 border-blue-200";
    default: // 'nouveau'
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Pipeline de Vente 🚀</h1>
        <Link 
          href="/dashboard/leads/new" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm font-medium"
        >
          + Nouveau Lead
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {STEPS.map(step => (
          <div key={step} className="bg-gray-100 p-4 rounded-lg min-h-[500px]">
            <h2 className="font-bold text-blue-800 uppercase text-sm mb-4 border-b border-blue-200 pb-2">
              {step} ({leads.filter(l => l.step === step).length})
            </h2>
            
            <div className="flex flex-col gap-3">
              {leads.filter(l => l.step === step).map(lead => (
  <div key={lead.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition flex flex-col min-h-[180px] relative group">
    
    {/* 1. LIGNE DU HAUT : STATUT ET ACTIONS */}
    <div className="flex justify-between items-center mb-3">
      {/* LE STATUT AU-DESSUS */}
      <span className={`text-[10px] px-2 py-1 rounded-md border font-bold uppercase tracking-wider ${getStatusBadge(lead.status)}`}>
        {lead.status}
      </span>

      {/* ICONES MODIFIER / SUPPRIMER */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg">
        <Link href={`/dashboard/leads/${lead.id}/edit`} onClick={(e) => e.stopPropagation()} className="hover:scale-110 transition">✏️</Link>
        <button onClick={(e) => handleDeleteLead(e, lead.id)} className="hover:scale-110 transition">🗑️</button>
      </div>
    </div>

    {/* 2. TITRE ET INFOS */}
    <div className="flex-1 mb-4">
      <h3 className="text-base font-bold text-slate-900 leading-tight mb-2">
        {lead.title}
      </h3>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>👤</span>
        <p>{lead.contacts?.first_name} {lead.contacts?.last_name}</p>
      </div>
      <p className="text-lg font-black mt-2 text-green-600">
        {lead.amount?.toLocaleString()} €
      </p>
    </div>

    {/* 3. BOUTON D'ÉTAPE TOUT EN BAS */}
    <div className="border-t pt-3 mt-auto">
      <button 
        onClick={() => updateLeadStep(lead.id, lead.step)}
        className="w-full text-center text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 py-2 rounded-lg bg-blue-50/50 hover:bg-blue-100 transition"
      >
        Étape Suivante ➔
      </button>
    </div>
  </div>
))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}