import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabaseServer"

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return <>{children}</>
}