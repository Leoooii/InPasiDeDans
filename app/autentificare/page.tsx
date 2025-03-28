"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function AutentificarePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      toast({
        title: "Autentificare reușită",
        description: "Bine ai revenit!",
      })

      // Redirecționează în funcție de email
      if (email === "admin@gmail.com") {
        router.push("/admin")
      } else {
        router.push("/cont")
      }
    } catch (error: any) {
      console.error("Eroare la autentificare:", error)

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
    <div className="container flex items-center justify-center min-h-[calc(100vh-5rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Autentificare</CardTitle>
          <CardDescription>Introdu datele de autentificare pentru a accesa contul tău</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nume@exemplu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Parolă</Label>
                <Link href="/resetare-parola" className="text-sm text-red-600 hover:underline">
                  Ai uitat parola?
                </Link>
              </div>
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
        <CardFooter className="flex flex-col">
          <div className="text-center mt-2">
            <p>
              Nu ai cont încă?{" "}
              <Link href="/inregistrare" className="text-red-600 hover:underline">
                Înregistrează-te
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

