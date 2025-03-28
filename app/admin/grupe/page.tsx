"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { Loader2, Users, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Grupa = {
  id: string
  titlu: string
  descriere: string
  dataStart: string
  program: string
  instructor: string
  locuriDisponibile: number
  locuriTotale: number
  zile: string[]
  ora: string
  stil: string
}

export default function GrupePage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [filteredGrupe, setFilteredGrupe] = useState<Grupa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("toate")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Verificăm dacă este admin
        if (currentUser.email !== "admin@gmail.com") {
          router.push("/cont")
          return
        }

        // Încărcăm lista de grupe
        await fetchGrupe()
      } else {
        // Dacă nu este autentificat, redirecționăm către pagina de login
        router.push("/autentificare")
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    // Filtrăm grupele în funcție de tab-ul activ
    if (activeTab === "toate") {
      setFilteredGrupe(grupe)
    } else {
      setFilteredGrupe(grupe.filter((grupa) => grupa.stil === activeTab))
    }
  }, [activeTab, grupe])

  // Actualizăm funcția fetchGrupe pentru a folosi datele reale din baza de date
  const fetchGrupe = async () => {
    try {
      const grupeQuery = query(collection(db, "grupe"), orderBy("dataStart"))
      const querySnapshot = await getDocs(grupeQuery)

      const grupeData: Grupa[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        // Folosim datele reale din baza de date sau valori implicite dacă nu există
        const grupa = {
          id: doc.id,
          ...data,
          zile: data.zile || (data.program.includes("Luni") ? ["Luni", "Miercuri"] : ["Marți", "Joi"]),
          ora:
            data.program.split(",").pop()?.trim() ||
            (data.program.includes("19:00") ? "19:00 - 20:30" : "20:30 - 22:00"),
          stil: data.stil || ["Dans de societate", "Salsa", "Bachata", "Tango"][Math.floor(Math.random() * 4)],
        } as Grupa

        grupeData.push(grupa)
      })

      setGrupe(grupeData)
      setFilteredGrupe(grupeData)
    } catch (error) {
      console.error("Eroare la încărcarea grupelor:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca grupele",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă grupele...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionare Grupe</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/prezenta")}>
            <Calendar className="h-4 w-4 mr-2" />
            Prezență zilnică
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Înapoi la panou
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="toate">Toate</TabsTrigger>
          <TabsTrigger value="Dans de societate">Dans de societate</TabsTrigger>
          <TabsTrigger value="Salsa">Salsa</TabsTrigger>
          <TabsTrigger value="Bachata">Bachata</TabsTrigger>
          <TabsTrigger value="Tango">Tango</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>{activeTab === "toate" ? "Toate grupele" : `Grupe de ${activeTab}`}</CardTitle>
              <CardDescription>Vizualizează și gestionează grupele de dans</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredGrupe.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGrupe.map((grupa) => (
                    <Card key={grupa.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{grupa.titlu}</CardTitle>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            {grupa.stil}
                          </Badge>
                        </div>
                        <CardDescription>{grupa.descriere}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Instructor:</span>
                            <span className="text-sm font-medium">{grupa.instructor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Zile:</span>
                            <span className="text-sm font-medium">{grupa.zile.join(", ")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Ora:</span>
                            <span className="text-sm font-medium">{grupa.ora}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Data start:</span>
                            <span className="text-sm font-medium">
                              {new Date(grupa.dataStart).toLocaleDateString("ro-RO")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Locuri:</span>
                            <span className="text-sm font-medium">
                              {grupa.locuriDisponibile} / {grupa.locuriTotale}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => router.push(`/admin/grupa/${grupa.id}`)}
                          >
                            <Users className="h-4 w-4 mr-2" />
                            Cursanți
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există grupe în această categorie</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

