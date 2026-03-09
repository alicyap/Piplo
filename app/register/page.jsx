"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState("") // "success" ou "error"
  const [loading, setLoading] = useState(false)

  const signUp = async () => {
    setMessage("")
    setType("")
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      setType("error")
      return
    }

    setMessage("Compte créé ! Vérifie ton email pour confirmer ton inscription.")
    setType("success")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* La carte Piplo */}
      <div className="bg-white p-12 md:p-16 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl">
        
        {/* Branding */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-blue-600 tracking-tighter mb-1">Piplo</h1>
          <p className="text-lg text-slate-500">Créez votre accès CRM</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 text-center mb-8">Nouvelle inscription</h2>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Adresse Email</label>
            <input
              type="email"
              placeholder="votre.nom@entreprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-5 py-4 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-slate-50/50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-5 py-4 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-slate-50/50"
            />
          </div>

          {/* Bouton */}
          <button
            onClick={signUp}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Création du compte..." : "S'inscrire"}
          </button>

          {/* Feedback visuel (Success / Error) */}
          {message && (
            <div className={`p-4 rounded-xl text-center text-sm border transition-all ${
              type === "success" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-red-50 text-red-700 border-red-200"
            }`}>
              {type === "success" ? "✅ " : "❌ "} {message}
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-sm text-slate-500">
              Déjà un compte ? {" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Connectez-vous ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}