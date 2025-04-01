"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { Loader2, Calendar, CreditCard, Clock, User, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"

type UserData = {
  nume: string
  prenume: string
  email: string
  telefon: string
  dataInregistrare: any
  aprobat: boolean
  role: string
  dataInceputCursuri: any
  grupe: string[]
  abonamente: Abonament[]
  prezente: Prezenta[]
}

type Abonament = {
  id: string
  tip: string
  dataInceput: any
  dataExpirare: any
  pretPlatit: number
  numarSedinte: number
  sedinteRamase: number
}

type Prezenta = {
  id: string
  data: any
  grupa: string
  profesor: string
  status?: string
}

export default function ContPage() {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [prezente, setPrezente] = useState<Prezenta[]>([])
  const [filteredPrezente, setFilteredPrezente] = useState<Prezenta[]>([])
  const [selectedGrupa, setSelectedGrupa] = useState<string>("toate")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        // Verificăm dacă este admin și redirecționăm
        if (currentUser.email === "admin@gmail.com") {
          router.push("/admin")
          return
        }

        // Încărcăm datele utilizatorului
        await fetchUserData(currentUser.uid)
      } else {
        // Dacă nu este autentificat, redirecționăm către pagina de login
        router.push("/autentificare")
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  // Efect pentru filtrarea prezențelor în funcție de grupa selectată
  useEffect(() => {
    if (!prezente.length) {
      setFilteredPrezente([])
      return
    }

    if (selectedGrupa === "toate") {
      setFilteredPrezente(prezente)
    } else {
      setFilteredPrezente(prezente.filter((p) => p.grupa === selectedGrupa))
    }
  }, [prezente, selectedGrupa])

  // Modificăm funcția fetchUserData pentru a afișa prezențele reale
  const fetchUserData = async (userId: string) => {
    try {
      // Obținem datele utilizatorului din Firestore
      const userDoc = await getDoc(doc(db, "users", userId))

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData
        setUserData(userData)

        // Folosim prezențele reale din baza de date
        if (userData.prezente && userData.prezente.length > 0) {
          setPrezente(userData.prezente)
          setFilteredPrezente(userData.prezente)
        } else {
          // Dacă nu există prezențe, afișăm un array gol
          setPrezente([])
          setFilteredPrezente([])
        }
      }
    } catch (error) {
      console.error("Eroare la încărcarea datelor utilizatorului:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca datele contului",
        variant: "destructive",
      })
    }
  }

  const fetchPrezente = async (userId: string) => {
    try {
      const prezenteQuery = query(
        collection(db, "prezente"),
        where("userId", "==", userId),
        orderBy("data", "desc"),
        limit(10),
      )
      const prezenteSnapshot = await getDocs(prezenteQuery)

      if (prezenteSnapshot.empty) {
        setPrezente([])
        setFilteredPrezente([])
        return
      }

      // Asigurăm-ne că includem toate proprietățile necesare
      const prezenteData = prezenteSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          data: data.data,
          grupa: data.grupa || "Necunoscută",
          profesor: data.profesor || "Necunoscut",
          status: data.status || "Prezent", // Valoare implicită
        } as Prezenta
      })

      setPrezente(prezenteData)
      setFilteredPrezente(prezenteData)
    } catch (error) {
      console.error("Eroare la încărcarea prezențelor:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca prezențele",
        variant: "destructive",
      })
    }
  }

  // Funcție pentru a obține lista unică de grupe din prezențe
  const getUniqueGrupe = () => {
    if (!prezente.length) return []

    const grupe = prezente.map((p) => p.grupa)
    return [...new Set(grupe)]
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă datele contului...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Eroare la încărcarea datelor</CardTitle>
            <CardDescription>Nu s-au putut încărca datele contului tău</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/autentificare")}>Înapoi la autentificare</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Verificăm dacă utilizatorul este aprobat
  if (!userData.aprobat) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Cont în așteptare</CardTitle>
            <CardDescription>Contul tău este în curs de aprobare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Mulțumim pentru înregistrare! Contul tău este în curs de aprobare de către administratori. Vei fi
              notificat prin email când contul tău va fi activat.
            </p>
            <Button onClick={() => auth.signOut().then(() => router.push("/"))}>Înapoi la pagina principală</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const abonamente = userData.abonamente || []
  const uniqueGrupe = getUniqueGrupe()

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Bine ai venit, {userData.nume} {userData.prenume}!
          </h1>
          <p className="text-gray-500">
            {userData.dataInceputCursuri && typeof userData.dataInceputCursuri.toDate === "function"
              ? `Cursant din ${new Date(userData.dataInceputCursuri.toDate()).toLocaleDateString("ro-RO")}`
              : "Bine ai venit la școala noastră de dans!"}
          </p>
        </div>
      </div>

      <Tabs defaultValue="prezente" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="prezente">Prezențe</TabsTrigger>
          <TabsTrigger value="abonamente">Abonamente</TabsTrigger>
          <TabsTrigger value="grupe">Grupele mele</TabsTrigger>
          <TabsTrigger value="profil">Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="prezente">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Prezențele mele
                  </CardTitle>
                  <CardDescription>Istoricul prezențelor tale la cursuri</CardDescription>
                </div>

                {uniqueGrupe.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedGrupa === "toate" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedGrupa("toate")}
                      >
                        Toate
                      </Button>

                      {uniqueGrupe.map((grupa) => (
                        <Button
                          key={grupa}
                          variant={selectedGrupa === grupa ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedGrupa(grupa)}
                        >
                          {grupa}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {filteredPrezente.length > 0 ? (
                filteredPrezente.map((prezenta) => (
                  <div key={prezenta.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{prezenta.grupa}</p>
                      <p className="text-sm text-gray-500">
                        {prezenta.data && typeof prezenta.data.toDate === "function"
                          ? new Date(prezenta.data.toDate()).toLocaleDateString("ro-RO")
                          : "Data necunoscută"}
                      </p>
                    </div>
                    <Badge variant="outline">{prezenta.status || "Prezent"}</Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    {selectedGrupa === "toate"
                      ? "Nu există prezențe înregistrate"
                      : `Nu există prezențe înregistrate pentru grupa ${selectedGrupa}`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abonamente">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Abonamentele mele
              </CardTitle>
              <CardDescription>Detalii despre abonamentele tale active și expirate</CardDescription>
            </CardHeader>
            <CardContent>
              {abonamente.length > 0 ? (
                abonamente.map((abonament) => {
                  const dataExpirare =
                    abonament.dataExpirare && typeof abonament.dataExpirare.toDate === "function"
                      ? new Date(abonament.dataExpirare.toDate())
                      : new Date()
                  const acum = new Date()
                  const zileRamase = Math.ceil((dataExpirare.getTime() - acum.getTime()) / (1000 * 60 * 60 * 24))

                  let statusClass = "bg-green-100 text-green-800"
                  let statusText = "Activ"

                  if (zileRamase <= 0) {
                    statusClass = "bg-red-100 text-red-800 font-bold"
                    statusText = "Expirat"
                  } else if (zileRamase <= 7) {
                    statusClass = "bg-yellow-100 text-yellow-800 font-bold"
                    statusText = "Expiră curând"
                  }

                  return (
                    <div key={abonament.id} className="mb-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{abonament.tip}</h4>
                          <p className="text-sm text-gray-500">
                            Valabil până la:{" "}
                            {abonament.dataExpirare && typeof abonament.dataExpirare.toDate === "function"
                              ? new Date(abonament.dataExpirare.toDate()).toLocaleDateString("ro-RO")
                              : "Data necunoscută"}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>
                          {statusText}
                          {zileRamase > 0 && zileRamase <= 7 && ` (${zileRamase} zile)`}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Ședințe rămase:</span> {abonament.sedinteRamase} din{" "}
                          {abonament.numarSedinte}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Nu există abonamente înregistrate</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grupe">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Grupele mele
              </CardTitle>
              <CardDescription>Grupele la care participi</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.grupe && userData.grupe.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.grupe.map((grupa, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{grupa}</h3>
                      <p className="text-sm text-gray-500 mt-2">Program: Luni și Miercuri, 19:00 - 20:30</p>
                      <p className="text-sm text-gray-500">Instructor: Alexandru Popescu</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu ești înscris la nicio grupă momentan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profil">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profilul meu
              </CardTitle>
              <CardDescription>Informațiile tale personale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nume</p>
                    <p className="font-semibold">{userData.nume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prenume</p>
                    <p className="font-semibold">{userData.prenume}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="font-semibold">{userData.telefon}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Data înregistrării</p>
                  <p className="font-semibold">
                    {userData.dataInregistrare && typeof userData.dataInregistrare.toDate === "function"
                      ? new Date(userData.dataInregistrare.toDate()).toLocaleDateString("ro-RO")
                      : "Data necunoscută"}
                  </p>
                </div>

                <div className="pt-4">
                  <Button variant="outline">Actualizează datele</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

