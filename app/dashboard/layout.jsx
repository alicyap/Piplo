import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabaseServer"
import Sidebar from "@/components/Sidebar" // On importe le nouveau composant

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Protection de la route côté serveur
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Utilisation de la Sidebar Client */}
      <Sidebar userEmail={user.email} />

      {/* Zone de contenu principal */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}