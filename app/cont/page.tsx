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
import { Loader2, Calendar, CreditCard, Clock, User } from "lucide-react"

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
}

export default function ContPage() {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [prezente, setPrezente] = useState<Prezenta[]>([])
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

  const fetchUserData = async (userId: string) => {
    try {
      // Obținem datele utilizatorului din Firestore
      const userDoc = await getDoc(doc(db, "users", userId))

      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData)

        // Simulăm date de prezență pentru exemplu  {
        setUserData(userDoc.data() as UserData)

        // Simulăm date de prezență pentru exemplu
        const prezenteSimulate: Prezenta[] = [
          {
            id: "1",
            data: { toDate: () => new Date(2023, 5, 15) },
            grupa: "Dans de societate - Intermediari",
            profesor: "Alexandru Popescu",
          },
          {
            id: "2",
            data: { toDate: () => new Date(2023, 5, 17) },
            grupa: "Dans de societate - Intermediari",
            profesor: "Alexandru Popescu",
          },
          {
            id: "3",
            data: { toDate: () => new Date(2023, 5, 22) },
            grupa: "Dans de societate - Intermediari",
            profesor: "Alexandru Popescu",
          },
          {
            id: "4",
            data: { toDate: () => new Date(2023, 5, 24) },
            grupa: "Dans de societate - Intermediari",
            profesor: "Alexandru Popescu",
          },
        ]

        setPrezente(prezenteSimulate)
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

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Bine ai venit, {userData.nume} {userData.prenume}!
          </h1>
          <p className="text-gray-500">
            {userData.dataInceputCursuri
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
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Prezențele mele
              </CardTitle>
              <CardDescription>Istoricul prezențelor tale la cursuri</CardDescription>
            </CardHeader>
            <CardContent>
              {prezente.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium">Data</th>
                        <th className="p-3 text-left font-medium">Grupa</th>
                        <th className="p-3 text-left font-medium">Profesor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prezente.map((prezenta) => (
                        <tr key={prezenta.id} className="border-t">
                          <td className="p-3">{new Date(prezenta.data.toDate()).toLocaleDateString("ro-RO")}</td>
                          <td className="p-3">{prezenta.grupa}</td>
                          <td className="p-3">{prezenta.profesor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu ai încă prezențe înregistrate</p>
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
              {userData.abonamente && userData.abonamente.length > 0 ? (
                <div className="space-y-4">
                  {userData.abonamente.map((abonament, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{abonament.tip}</h3>
                          <p className="text-sm text-gray-500">
                            Valabil: {new Date(abonament.dataInceput.toDate()).toLocaleDateString("ro-RO")} -
                            {new Date(abonament.dataExpirare.toDate()).toLocaleDateString("ro-RO")}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            {new Date() < new Date(abonament.dataExpirare.toDate()) ? "Activ" : "Expirat"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Ședințe rămase</p>
                          <p className="font-semibold">
                            {abonament.sedinteRamase} / {abonament.numarSedinte}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Preț plătit</p>
                          <p className="font-semibold">{abonament.pretPlatit} lei</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu ai încă abonamente înregistrate</p>
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
                    {new Date(userData.dataInregistrare.toDate()).toLocaleDateString("ro-RO")}
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

