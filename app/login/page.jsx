"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

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

    router.replace("/dashboard")
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Connexion</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={signIn}
        className="bg-blue-600 text-white w-full p-2"
      >
        Se connecter
      </button>

      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
    </div>
  )
}