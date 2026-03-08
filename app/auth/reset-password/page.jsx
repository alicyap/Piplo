"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setMessage("Erreur : " + error.message)
    } else {
      setMessage("Mot de passe mis à jour ! Redirection...")
      setTimeout(() => router.push("/dashboard"), 2000)
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Nouveau mot de passe</h1>
      <input
        type="password"
        placeholder="Entrez votre nouveau mot de passe"
        className="border p-2 w-full mb-4 text-black"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        onClick={handleUpdate}
        className="bg-green-600 text-white w-full p-2"
      >
        Valider le changement
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}