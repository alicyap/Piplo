"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link" // Ajout de Link pour le design futur

export default function Login() {

  const router = useRouter()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errorMsg,setErrorMsg] = useState("")

  const signIn = async () => {
    setErrorMsg("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setErrorMsg(error.message)
      return
    }

    // Force le rafraîchissement des cookies avant de changer de page
    router.refresh() 
    setTimeout(() => {
      router.push("/dashboard")
    }, 100)
  }

  return (
    // Conteneur plein écran pour centrer la carte de connexion
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* La carte de connexion moderne */}
      <div className="bg-white p-12 md:p-16 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl">
        
        {/* Section de Branding au top */}
        <div className="text-center mb-12">
          {/* Le nom de l'app "Piplo" en grand et bold, couleur pro blue */}
          <h1 className="text-6xl font-extrabold text-blue-600 tracking-tighter mb-1">Piplo</h1>
          <p className="text-lg text-slate-500">Accédez à votre CRM Pipeliné</p>
        </div>

        {/* Le formulaire avec des espaces de respiration */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 text-center mb-8">Connexion à votre compte</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Adresse Email</label>
            <input
              type="email"
              placeholder="votre.nom@entreprise.com"
              onChange={(e)=>setEmail(e.target.value)}
              className="block w-full px-5 py-4 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e)=>setPassword(e.target.value)}
              className="block w-full px-5 py-4 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner bg-slate-50/50"
            />
          </div>

          {/* Bouton de connexion avec effets */}
          <button
            onClick={signIn}
            className="w-full bg-blue-600 text-white font-semibold px-6 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            Se connecter
          </button>

          {/* Message d'erreur stylisé */}
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="text-center mt-12 space-y-3">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Mot de passe oublié ?</Link>
            <p className="text-sm text-slate-500">Pas encore de compte ? <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">Inscrivez-vous</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}