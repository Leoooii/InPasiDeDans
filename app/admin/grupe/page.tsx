"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore"
import { Loader2, Users, Calendar, Search, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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

type UserData = {
  id: string
  nume: string
  prenume: string
  email: string
  telefon: string
  grupe: string[]
}

export default function GrupePage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [filteredGrupe, setFilteredGrupe] = useState<Grupa[]>([])
  const [selectedGrupa, setSelectedGrupa] = useState<Grupa | null>(null)
  const [cursanti, setCursanti] = useState<UserData[]>([])
  const [utilizatoriDisponibili, setUtilizatoriDisponibili] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCursanti, setIsLoadingCursanti] = useState(false)
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

  // Actualizăm funcția fetchGrupe pentru a folosi datele reale
  const fetchGrupe = async () => {
    try {
      const grupeQuery = query(collection(db, "grupe"))
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
          stil:
            data.stil ||
            ["Dans de societate", "Dans standard", "Dans latino", "Dansuri populare"][Math.floor(Math.random() * 4)],
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

  const fetchCursantiGrupa = async (grupa: Grupa) => {
    setIsLoadingCursanti(true)
    setSelectedGrupa(grupa)
    setSearchTerm("")

    try {
      // Obținem toți utilizatorii care sunt în grupa selectată
      const usersQuery = query(collection(db, "users"), where("grupe", "array-contains", grupa.titlu))

      const querySnapshot = await getDocs(usersQuery)

      const cursantiData: UserData[] = []
      querySnapshot.forEach((doc) => {
        // Extragem datele și adăugăm id-ul separat pentru a evita duplicarea
        const userData = doc.data() as UserData
        cursantiData.push({
          ...userData,
          id: doc.id,
        })
      })

      setCursanti(cursantiData)

      // Încărcăm și utilizatorii disponibili pentru adăugare
      await fetchUtilizatoriDisponibili(grupa.titlu)
    } catch (error) {
      console.error("Eroare la încărcarea cursanților:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca cursanții",
        variant: "destructive",
      })
    } finally {
      setIsLoadingCursanti(false)
    }
  }

  const fetchUtilizatoriDisponibili = async (grupaTitlu: string) => {
    try {
      // Obținem toți utilizatorii aprobați care nu sunt în grupa selectată
      const usersQuery = query(collection(db, "users"), where("aprobat", "==", true), where("role", "==", "cursant"))

      const querySnapshot = await getDocs(usersQuery)

      const utilizatoriData: UserData[] = []
      querySnapshot.forEach((doc) => {
        const userData = doc.data() as UserData
        // Verificăm dacă utilizatorul nu este deja în grupă
        if (!userData.grupe || !userData.grupe.includes(grupaTitlu)) {
          // Extragem datele și adăugăm id-ul separat pentru a evita duplicarea
          utilizatoriData.push({
            ...userData,
            id: doc.id,
          })
        }
      })

      setUtilizatoriDisponibili(utilizatoriData)
    } catch (error) {
      console.error("Eroare la încărcarea utilizatorilor disponibili:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca utilizatorii disponibili",
        variant: "destructive",
      })
    }
  }

  const handleAddToGroup = async (userId: string) => {
    if (!selectedGrupa) return

    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        toast({
          title: "Eroare",
          description: "Utilizatorul nu a fost găsit",
          variant: "destructive",
        })
        return
      }

      const userData = userDoc.data()
      const grupe = userData.grupe || []

      // Adăugăm grupa la lista de grupe a utilizatorului
      await updateDoc(userRef, {
        grupe: [...grupe, selectedGrupa.titlu],
      })

      toast({
        title: "Succes",
        description: "Utilizatorul a fost adăugat în grupă",
      })

      // Actualizăm listele de utilizatori
      await fetchCursantiGrupa(selectedGrupa)
    } catch (error) {
      console.error("Eroare la adăugarea utilizatorului în grupă:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut adăuga utilizatorul în grupă",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromGroup = async (userId: string) => {
    if (!selectedGrupa) return

    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        toast({
          title: "Eroare",
          description: "Utilizatorul nu a fost găsit",
          variant: "destructive",
        })
        return
      }

      const userData = userDoc.data()
      const grupe = userData.grupe || []

      // Eliminăm grupa din lista de grupe a utilizatorului
      await updateDoc(userRef, {
        grupe: grupe.filter((g: string) => g !== selectedGrupa.titlu),
      })

      toast({
        title: "Succes",
        description: "Utilizatorul a fost eliminat din grupă",
      })

      // Actualizăm listele de utilizatori
      await fetchCursantiGrupa(selectedGrupa)
    } catch (error) {
      console.error("Eroare la eliminarea utilizatorului din grupă:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut elimina utilizatorul din grupă",
        variant: "destructive",
      })
    }
  }

  const filteredUtilizatori = utilizatoriDisponibili.filter((user) => {
    if (!searchTerm) return true

    const fullName = `${user.nume} ${user.prenume}`.toLowerCase()
    const email = user.email.toLowerCase()
    const search = searchTerm.toLowerCase()

    return fullName.includes(search) || email.includes(search)
  })

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Gestionare Grupe</h1>
          <p className="text-gray-500">Vizualizează și gestionează grupele de dans</p>
        </div>
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

      {selectedGrupa ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedGrupa(null)}>
              Înapoi la lista de grupe
            </Button>
            <h2 className="text-xl font-semibold">{selectedGrupa.titlu}</h2>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">{selectedGrupa.stil}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cursanți înscriși</CardTitle>
                <CardDescription>Lista cursanților înscriși în această grupă</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingCursanti ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
                    <p className="mt-4 text-gray-500">Se încarcă cursanții...</p>
                  </div>
                ) : cursanti.length > 0 ? (
                  <div className="rounded-md border overflow-hidden overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-3 text-left font-medium">Nume</th>
                          <th className="p-3 text-left font-medium">Email</th>
                          <th className="p-3 text-left font-medium hidden md:table-cell">Telefon</th>
                          <th className="p-3 text-center font-medium">Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cursanti.map((cursant) => (
                          <tr key={cursant.id} className="border-t">
                            <td className="p-3">
                              {cursant.nume} {cursant.prenume}
                            </td>
                            <td className="p-3">{cursant.email}</td>
                            <td className="p-3 hidden md:table-cell">{cursant.telefon}</td>
                            <td className="p-3 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFromGroup(cursant.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                Elimină
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nu există cursanți înscriși în această grupă</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adaugă cursanți</CardTitle>
                <CardDescription>Adaugă cursanți noi în această grupă</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Caută după nume sau email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  {filteredUtilizatori.length > 0 ? (
                    <div className="rounded-md border overflow-hidden overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-3 text-left font-medium">Nume</th>
                            <th className="p-3 text-left font-medium hidden md:table-cell">Email</th>
                            <th className="p-3 text-center font-medium">Acțiuni</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUtilizatori.map((user) => (
                            <tr key={user.id} className="border-t">
                              <td className="p-3">
                                {user.nume} {user.prenume}
                              </td>
                              <td className="p-3 hidden md:table-cell">{user.email}</td>
                              <td className="p-3 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleAddToGroup(user.id)}
                                  className="flex items-center gap-1 text-green-600 hover:text-green-800 hover:bg-green-50"
                                >
                                  <UserPlus className="h-4 w-4" />
                                  <span className="hidden md:inline">Adaugă</span>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {searchTerm
                          ? "Nu s-au găsit utilizatori care să corespundă căutării"
                          : "Nu există utilizatori disponibili pentru adăugare"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
            <TabsTrigger value="toate">Toate</TabsTrigger>
            <TabsTrigger value="Dans de societate">Dans de societate</TabsTrigger>
            <TabsTrigger value="Dans standard">Dans standard</TabsTrigger>
            <TabsTrigger value="Dans latino">Dans latino</TabsTrigger>
            <TabsTrigger value="Dansuri populare">Dansuri populare</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === "toate" ? "Toate grupele" : `Grupe de ${activeTab}`}</CardTitle>
                <CardDescription>Selectează o grupă pentru a vedea și gestiona cursanții</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredGrupe.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredGrupe.map((grupa) => (
                      <Card
                        key={grupa.id}
                        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => fetchCursantiGrupa(grupa)}
                      >
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
                              onClick={(e) => {
                                e.stopPropagation()
                                fetchCursantiGrupa(grupa)
                              }}
                            >
                              <Users className="h-4 w-4 mr-2" />
                              Gestionează cursanți
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
      )}
    </div>
  )
}

