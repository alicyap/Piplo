"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState("") 
  const [loading, setLoading] = useState(false)

  const handleResetRequest = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    setLoading(false)

    if (error) {
      setMessage("Erreur : " + error.message)
      setType("error")
    } else {
      setMessage("Vérifiez votre boîte mail ! Un lien de récupération vous a été envoyé.")
      setType("success")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-12 md:p-16 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl">
        
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-blue-600 tracking-tighter mb-1">Piplo</h1>
          <p className="text-lg text-slate-500">Récupération de compte</p>
        </div>

        <form onSubmit={handleResetRequest} className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 text-center mb-8">Mot de passe oublié ?</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Votre adresse Email</label>
            <input 
              type="email" 
              placeholder="votre.email@exemple.com"
              className="block w-full px-5 py-4 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-slate-50/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Recevoir le lien de réinitialisation"}
          </button>

          {message && (
            <div className={`p-4 rounded-xl text-center text-sm border transition-all ${
              type === "success" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-red-50 text-red-700 border-red-200"
            }`}>
              {message}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}