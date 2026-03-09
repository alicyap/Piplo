"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const router = useRouter()

  const handleUpdate = async (e) => {
    e.preventDefault()
    setStatus("Chargement...")

    const { error } = await supabase.auth.updateUser({ password: password })

    if (error) {
      setStatus("Erreur : " + error.message)
    } else {
      setStatus("Succès ! Redirection vers le dashboard...")
      setTimeout(() => router.push("/dashboard"), 2000)
    }
  }

  return (
    <div className="flex flex-col items-center p-20">
      <h1 className="text-2xl font-bold mb-4 text-black">Nouveau mot de passe</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full max-w-sm">
        <input 
          type="password" 
          placeholder="Entrez votre mot de passe robuste"
          className="border p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Enregistrer le mot de passe
        </button>
      </form>
      {status && <p className="mt-4 font-semibold text-blue-600">{status}</p>}
    </div>
  )
}