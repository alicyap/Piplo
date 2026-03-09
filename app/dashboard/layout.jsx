import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabaseServer"
import Link from "next/link"

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Latérale */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-700">
          Piplo 🚀
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 rounded hover:bg-slate-800 transition">
            🏠 Tableau de bord
          </Link>
          <Link href="/dashboard/companies" className="block p-3 rounded hover:bg-slate-800 transition">
            🏢 Entreprises
          </Link>
          <Link href="/dashboard/contacts" className="block p-3 rounded hover:bg-slate-800 transition">
            👥 Contacts
          </Link>
          <Link href="/dashboard/pipeline" className="block p-3 rounded hover:bg-slate-800 transition">
            🚀 Pipeline de vente
          </Link>
          <Link href="/dashboard/tasks" className="block p-3 rounded hover:bg-slate-800 transition">
            ✅ Tâches
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700 text-sm text-gray-400">
          Connecté : {user.email}
        </div>
      </aside>

      {/* Zone de contenu principal */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}