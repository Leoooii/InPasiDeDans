"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Loader2, AlertCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Abonament = {
  id: string
  tip: string
  dataInceput: any
  dataExpirare: any
  pretPlatit: number
  numarSedinte: number
  sedinteRamase: number
  userName?: string
  userEmail?: string
  userId?: string
}

type UserData = {
  id: string
  nume: string
  prenume: string
  email: string
  abonamente: Abonament[]
}

export default function AbonamentePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [abonamente, setAbonamente] = useState<{
    expirate: Abonament[]
    critice: Abonament[]
    active: Abonament[]
  }>({
    expirate: [],
    critice: [],
    active: [],
  })
  const [activeTab, setActiveTab] = useState("active")
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

        // Încărcăm abonamentele
        await fetchAbonamente()
      } else {
        // Dacă nu este autentificat, redirecționăm către pagina de login
        router.push("/autentificare")
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const fetchAbonamente = async () => {
    try {
      const usersQuery = query(collection(db, "users"), where("role", "==", "cursant"))
      const querySnapshot = await getDocs(usersQuery)

      const usersData: UserData[] = []
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as UserData)
      })

      // Procesăm abonamentele
      processAllAbonamente(usersData)
    } catch (error) {
      console.error("Eroare la încărcarea abonamentelor:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca abonamentele",
        variant: "destructive",
      })
    }
  }

  const processAllAbonamente = (users: UserData[]) => {
    const today = new Date()
    const allAbonamente: {
      expirate: Abonament[]
      critice: Abonament[]
      active: Abonament[]
    } = {
      expirate: [],
      critice: [],
      active: [],
    }

    users.forEach((user) => {
      if (!user.abonamente) return

      user.abonamente.forEach((abonament) => {
        // Adăugăm informații despre utilizator la abonament pentru afișare
        const abonamentWithUser = {
          ...abonament,
          userName: `${user.nume} ${user.prenume}`,
          userEmail: user.email,
          userId: user.id,
        }

        const dataExpirare = new Date(abonament.dataExpirare.toDate())
        const zileRamase = Math.floor((dataExpirare.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

        // Verificăm dacă abonamentul este expirat sau nu mai are ședințe
        if (dataExpirare < today || abonament.sedinteRamase <= 0) {
          allAbonamente.expirate.push(abonamentWithUser)
        }
        // Verificăm dacă abonamentul este aproape de expirare (mai puțin de 7 zile) sau are puține ședințe rămase (mai puțin de 3)
        else if (zileRamase < 7 || abonament.sedinteRamase < 3) {
          allAbonamente.critice.push(abonamentWithUser)
        }
        // Abonamente active în stare bună
        else {
          allAbonamente.active.push(abonamentWithUser)
        }
      })
    })

    setAbonamente(allAbonamente)
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă abonamentele...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionare Abonamente</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Înapoi la panou
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Abonamente</CardTitle>
          <CardDescription>Gestionează abonamentele utilizatorilor</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="active">
                Active
                {abonamente.active.length > 0 && (
                  <Badge className="ml-2 bg-green-100 text-green-800">{abonamente.active.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="critice">
                Aproape expirate
                {abonamente.critice.length > 0 && (
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">{abonamente.critice.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="expirate">
                Expirate
                {abonamente.expirate.length > 0 && (
                  <Badge className="ml-2 bg-red-100 text-red-800">{abonamente.expirate.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {abonamente.active.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium">Utilizator</th>
                        <th className="p-3 text-left font-medium">Tip abonament</th>
                        <th className="p-3 text-left font-medium">Ședințe rămase</th>
                        <th className="p-3 text-left font-medium">Valabilitate</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {abonamente.active.map((abonament: any) => (
                        <tr key={abonament.id} className="border-t">
                          <td className="p-3">{abonament.userName}</td>
                          <td className="p-3">{abonament.tip}</td>
                          <td className="p-3">
                            {abonament.sedinteRamase} / {abonament.numarSedinte}
                          </td>
                          <td className="p-3">
                            {new Date(abonament.dataExpirare.toDate()).toLocaleDateString("ro-RO")}
                          </td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              Activ
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există abonamente active</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="critice">
              {abonamente.critice.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium">Utilizator</th>
                        <th className="p-3 text-left font-medium">Tip abonament</th>
                        <th className="p-3 text-left font-medium">Ședințe rămase</th>
                        <th className="p-3 text-left font-medium">Valabilitate</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {abonamente.critice.map((abonament: any) => {
                        const dataExpirare = new Date(abonament.dataExpirare.toDate())
                        const today = new Date()
                        const zileRamase = Math.floor(
                          (dataExpirare.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
                        )

                        return (
                          <tr key={abonament.id} className="border-t">
                            <td className="p-3">{abonament.userName}</td>
                            <td className="p-3">{abonament.tip}</td>
                            <td className="p-3">
                              {abonament.sedinteRamase} / {abonament.numarSedinte}
                            </td>
                            <td className="p-3">
                              {new Date(abonament.dataExpirare.toDate()).toLocaleDateString("ro-RO")}
                              {zileRamase > 0 && (
                                <span className="text-xs text-yellow-600 ml-2">(mai {zileRamase} zile)</span>
                              )}
                            </td>
                            <td className="p-3">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Aproape expirat
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există abonamente aproape expirate</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="expirate">
              {abonamente.expirate.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium">Utilizator</th>
                        <th className="p-3 text-left font-medium">Tip abonament</th>
                        <th className="p-3 text-left font-medium">Ședințe rămase</th>
                        <th className="p-3 text-left font-medium">Valabilitate</th>
                        <th className="p-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {abonamente.expirate.map((abonament: any) => (
                        <tr key={abonament.id} className="border-t">
                          <td className="p-3">{abonament.userName}</td>
                          <td className="p-3">{abonament.tip}</td>
                          <td className="p-3">
                            {abonament.sedinteRamase} / {abonament.numarSedinte}
                          </td>
                          <td className="p-3">
                            {new Date(abonament.dataExpirare.toDate()).toLocaleDateString("ro-RO")}
                          </td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                              <X className="h-3 w-3 mr-1" />
                              Expirat
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există abonamente expirate</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// In this code, we have a page that displays a list of subscriptions (abonamente) for users. The subscriptions are categorized into three tabs: Active, Aproape expirate (Almost expired), and Expirate (Expired). The data is fetched from Firebase Firestore and displayed in a table format. Each subscription shows the user's name, type of subscription, remaining sessions, validity date, and status. The page also includes a loading state while fetching data and handles redirection for non-admin users.