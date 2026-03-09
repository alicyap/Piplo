"use client" // Obligatoire pour le onClick et le router
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Sidebar({ userEmail }) {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full">
      <div className="p-6 text-2xl font-black text-blue-400 tracking-tighter border-b border-slate-800">
        Piplo 🚀
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block p-3 rounded-xl hover:bg-slate-800 transition font-medium">
          🏠 Tableau de bord
        </Link>
        <Link href="/dashboard/companies" className="block p-3 rounded-xl hover:bg-slate-800 transition font-medium">
          🏢 Entreprises
        </Link>
        <Link href="/dashboard/contacts" className="block p-3 rounded-xl hover:bg-slate-800 transition font-medium">
          👥 Contacts
        </Link>
        <Link href="/dashboard/pipeline" className="block p-3 rounded-xl hover:bg-slate-800 transition font-medium">
          🚀 Pipeline de vente
        </Link>
        <Link href="/dashboard/tasks" className="block p-3 rounded-xl hover:bg-slate-800 transition font-medium">
          ✅ Tâches
        </Link>
      </nav>

      {/* LE BOUTON DE DÉCONNEXION */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/50 border border-transparent rounded-xl transition-all group"
        >
          <span className="text-xl group-hover:scale-110 transition">🚪</span>
          <span className="font-semibold text-sm">Déconnexion</span>
        </button>

        <div className="px-2 text-xs text-slate-500 truncate">
          M1 : {userEmail}
        </div>
      </div>
    </aside>
  )
}