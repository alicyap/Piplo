"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function TestConnection() {

  useEffect(() => {
    async function testDB() {
      const { data, error } = await supabase
        .from("companies")
        .select("*")

      console.log("DATA:", data)
      console.log("ERROR:", error)
    }

    testDB()
  }, [])

  return <div>Test connexion Supabase - regarde la console</div>
}