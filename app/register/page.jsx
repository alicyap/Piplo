"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Créer un compte</h1>

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={signUp}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl w-full transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded-xl text-center text-white ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}