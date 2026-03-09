"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [stats, setStats] = useState({ 
    totalCA: 0, 
    leadCount: 0, 
    pendingTasks: 0,
    avgValue: 0,
    conversionRate: 0,
    steps: {}
  })

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Récupération des leads avec montants, statuts et étapes
      const { data: leads } = await supabase.from('leads').select('amount, status, step')
      
      // 2. Récupération des tâches non terminées
      const { count: tasksCount } = await supabase.from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('is_completed', false)
      
      if (leads) {
        const total = leads.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0)
        const count = leads.length
        
        // Calcul du Taux de Conversion (% de leads 'converti')
        const converted = leads.filter(l => l.status === 'converti').length
        const rate = count > 0 ? (converted / count) * 100 : 0

        // Calcul du Panier Moyen
        const avg = count > 0 ? total / count : 0

        // Répartition par étape (Funnel)
        const stepsDist = leads.reduce((acc, lead) => {
          acc[lead.step] = (acc[lead.step] || 0) + 1
          return acc
        }, {})

        setStats({ 
          totalCA: total, 
          leadCount: count, 
          pendingTasks: tasksCount || 0,
          avgValue: avg,
          conversionRate: rate,
          steps: stepsDist
        })
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Tableau de Bord Analytique 🚀</h1>
      
      {/* 1ère Ligne : KPIs Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
          <p className="text-gray-500 text-sm font-medium uppercase">CA Prévisionnel</p>
          <p className="text-3xl font-bold text-black">{stats.totalCA.toLocaleString()} €</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
          <p className="text-gray-500 text-sm font-medium uppercase">Total Leads</p>
          <p className="text-3xl font-bold text-black">{stats.leadCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500">
          <p className="text-gray-500 text-sm font-medium uppercase">Tâches Urgentes</p>
          <p className="text-3xl font-bold text-black">{stats.pendingTasks}</p>
        </div>
      </div>

      {/* 2ème Ligne : Analyses Avancées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4 text-slate-800">Performance Commerciale</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Panier Moyen</span>
              <span className="font-bold text-black">{stats.avgValue.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Taux de Conversion</span>
              <span className="font-bold text-blue-600">{stats.conversionRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Mini Funnel de Vente */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4 text-slate-800">Funnel de Conversion</h2>
          <div className="space-y-2">
            {['prospect', 'qualification', 'proposition', 'negociation'].map(step => {
              const count = stats.steps[step] || 0
              const percentage = stats.leadCount > 0 ? (count / stats.leadCount) * 100 : 0
              return (
                <div key={step}>
                  <div className="flex justify-between text-xs mb-1 uppercase text-gray-500">
                    <span>{step}</span>
                    <span>{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}