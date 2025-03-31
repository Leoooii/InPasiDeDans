"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
// Adăugăm importul pentru CreditCard
import { Loader2, LayoutDashboard, Users, Calendar, Image, BookOpen, Menu, CreditCard } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Verificăm dacă utilizatorul este admin
        if (user.email === "admin@gmail.com") {
          setIsAdmin(true)
        } else {
          router.push("/cont")
        }
      } else {
        router.push("/autentificare")
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă panoul de administrare...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  // Componenta pentru meniul de navigare (folosită atât pentru desktop cât și pentru mobil)
  const NavLinks = ({ onClick = () => {} }) => (
    <nav className="space-y-1">
      <Link href="/admin" onClick={onClick}>
        <Button
          variant={
            isActive("/admin") &&
            !isActive("/admin/utilizatori") &&
            !isActive("/admin/grupe") &&
            !isActive("/admin/prezenta") &&
            !isActive("/admin/galerie") &&
            !isActive("/admin/abonamente")
              ? "default"
              : "ghost"
          }
          className="w-full justify-start"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
      </Link>
      <Link href="/admin/utilizatori" onClick={onClick}>
        <Button variant={isActive("/admin/utilizatori") ? "default" : "ghost"} className="w-full justify-start">
          <Users className="h-4 w-4 mr-2" />
          Utilizatori
        </Button>
      </Link>
      <Link href="/admin/grupe" onClick={onClick}>
        <Button variant={isActive("/admin/grupe") ? "default" : "ghost"} className="w-full justify-start">
          <BookOpen className="h-4 w-4 mr-2" />
          Grupe
        </Button>
      </Link>
      <Link href="/admin/prezenta" onClick={onClick}>
        <Button variant={isActive("/admin/prezenta") ? "default" : "ghost"} className="w-full justify-start">
          <Calendar className="h-4 w-4 mr-2" />
          Prezență zilnică
        </Button>
      </Link>
      <Link href="/admin/abonamente" onClick={onClick}>
        <Button variant={isActive("/admin/abonamente") ? "default" : "ghost"} className="w-full justify-start">
          <CreditCard className="h-4 w-4 mr-2" />
          Abonamente
        </Button>
      </Link>
      <Link href="/admin/galerie" onClick={onClick}>
        <Button variant={isActive("/admin/galerie") ? "default" : "ghost"} className="w-full justify-start">
          <Image className="h-4 w-4 mr-2" />
          Galerie
        </Button>
      </Link>
    </nav>
  )

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar pentru desktop */}
      <div className="hidden md:block md:w-64 bg-gray-100 dark:bg-gray-800 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Panou Admin</h2>
          <NavLinks />
        </div>
      </div>

      {/* Header pentru mobil */}
      <div className="md:hidden sticky top-0 z-10 bg-background border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Panou Admin</h2>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>Meniu Navigare</SheetTitle>
            <div className="py-4">
              <NavLinks onClick={() => setIsSidebarOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

