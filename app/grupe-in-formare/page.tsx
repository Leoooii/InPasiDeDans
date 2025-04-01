"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Users } from "lucide-react"
import type { Grupa } from "@/app/admin/page"
import { useToast } from "@/components/ui/use-toast"

export default function GrupeInFormarePage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const {toast} = useToast()
  useEffect(() => {
    const fetchGrupe = async () => {
      try {
        // Simplificăm query-ul pentru a evita eroarea de indexare
        // Folosim doar un singur filtru de egalitate
        const grupeQuery = query(collection(db, "grupe"), where("publica", "==", true))

        const querySnapshot = await getDocs(grupeQuery)

        const grupeData: Grupa[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          // Asigurăm compatibilitatea cu datele existente
          const stiluri = data.stiluri || []

          grupeData.push({
            id: doc.id,
            ...data,
            stiluri: stiluri,
          } as Grupa)
        })

        console.log("Grupe încărcate:", grupeData.length)
        setGrupe(grupeData)
      } catch (error) {
        console.error("Eroare la încărcarea grupelor:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGrupe()
  }, [])

  // Funcție pentru a formata data
  const formatDate = (dateString: string) => {
    if (!dateString) return "Data necunoscută"

    try {
      const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }
      return new Date(dateString).toLocaleDateString("ro-RO", options)
    } catch (error) {
      console.error("Eroare la formatarea datei:", error)
      return "Data necunoscută"
    }
  }

  // Funcție pentru a formata zilele săptămânii
  const formatZile = (zile: string[]) => {
    if (!zile || !Array.isArray(zile) || zile.length === 0) return "Zile necunoscute"

    const zileRomanesti: Record<string, string> = {
      luni: "Luni",
      marti: "Marți",
      miercuri: "Miercuri",
      joi: "Joi",
      vineri: "Vineri",
      sambata: "Sâmbătă",
      duminica: "Duminică",
    }

    return zile.map((zi) => zileRomanesti[zi.toLowerCase()] || zi).join(", ")
  }

  // Funcție pentru a naviga către pagina de înscriere
  const handleInscriere = (grupaId: string) => {
    router.push(`/inscriere?grupa=${grupaId}`)
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Grupe în formare</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Grupe în formare</h1>

      {grupe.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Nu există grupe în formare momentan.</p>
          <p className="mt-2 text-gray-400">Vă rugăm să reveniți mai târziu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grupe.map((grupa) => (
            <Card key={grupa.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{grupa.titlu}</CardTitle>
                </div>
                <CardDescription>Instructor: {grupa.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {grupa.stiluri && grupa.stiluri.length > 0 ? (
                    grupa.stiluri.map((stil, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                        {stil}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {grupa.stiluri && grupa.stiluri[0] ? grupa.stiluri[0] : "General"}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-500 line-clamp-3">{grupa.descriere}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Începe pe {formatDate(grupa.dataStart)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {formatZile(grupa.zile)}, {grupa.program}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {grupa.locuriDisponibile} locuri disponibile din {grupa.locuriTotale}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => grupa.id && handleInscriere(grupa.id)}
                  disabled={grupa.locuriDisponibile <= 0}
                >
                  {grupa.locuriDisponibile > 0 ? "Înscrie-te" : "Locuri epuizate"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <Button onClick={()=>{toast({
        title: "Mesaj trimis cu succes!",
        description: "Îți mulțumim pentru mesaj. Te vom contacta în curând.",
        duration: 5000,
      })}}>buton test</Button>
    </div>
  )
}

