"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession({ storeSession: true })
        if (error) throw error

        // Ici, le trigger DB sur auth.users s'occupe de créer le profil automatiquement
        // donc on n'a plus besoin de upsert() côté client

        router.replace("/dashboard")
      } catch (err) {
        console.error(err)
        setErrorMsg(err.message || "Une erreur est survenue.")
        setLoading(false)
      }
    }

    handleAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-gray-700 text-lg">Connexion en cours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="bg-red-500 text-white p-3 rounded-xl">{errorMsg}</p>
    </div>
  )
}