"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const [type, setType] = useState("") // "info", "success" ou "error"
  const router = useRouter()

  const handleUpdate = async (e) => {
    e.preventDefault()
    setStatus("Mise à jour en cours...")
    setType("info")

    const { error } = await supabase.auth.updateUser({ password: password })

    if (error) {
      setStatus("Erreur : " + error.message)
      setType("error")
    } else {
      setStatus("Succès ! Votre mot de passe a été modifié. Redirection...")
      setType("success")
      setTimeout(() => router.push("/dashboard"), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* La carte Piplo */}
      <div className="bg-white p-12 md:p-16 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl">
        
        {/* Branding */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-blue-600 tracking-tighter mb-1">Piplo</h1>
          <p className="text-lg text-slate-500">Sécurisez votre compte</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 text-center mb-8">Nouveau mot de passe</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nouveau mot de passe</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="block w-full px-5 py-4 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-slate-50/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="mt-2 text-xs text-slate-400">Choisissez un mot de passe robuste d'au moins 6 caractères.</p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            Enregistrer le mot de passe
          </button>

          {/* Feedback visuel stylisé */}
          {status && (
            <div className={`p-4 rounded-xl text-center text-sm border transition-all ${
              type === "success" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : type === "error"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {status}
            </div>
          )}

          {/* Retour à la connexion */}
          <div className="text-center mt-12">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Retour à la page de connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}