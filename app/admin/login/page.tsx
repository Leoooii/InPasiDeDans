"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Folosim Firebase Auth pentru autentificare
      await signInWithEmailAndPassword(auth, email, password)

      // Autentificare reușită, redirecționează către pagina de admin
      router.push("/admin")
    } catch (error: any) {
      console.error("Eroare la autentificare:", error)

      // Afișăm mesajul de eroare specific
      let errorMessage = "A apărut o eroare la autentificare"

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Email sau parolă incorecte"
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "Nu există niciun utilizator cu acest email"
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Parolă incorectă"
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Prea multe încercări eșuate. Încearcă mai târziu"
      }

      toast({
        title: "Eroare de autentificare",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Autentificare Admin</CardTitle>
          <CardDescription>Introdu datele de autentificare pentru a accesa panoul de administrare</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Se procesează..." : "Autentificare"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

