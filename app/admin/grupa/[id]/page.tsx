"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSimpleToast } from "@/components/simple-toast-provider"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore"
import { Loader2, ArrowLeft, UserPlus, X } from "lucide-react"
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
  stiluri: string[] // Doar array-ul de stiluri
}

type UserData = {
  id?: string // Facem id opțional pentru a evita duplicarea
  nume: string
  prenume: string
  email: string
  telefon: string
  aprobat: boolean
  grupe: string[]
}

export default function GrupaDetailPage({ params }: { params: { id: string } }) {
  const [grupa, setGrupa] = useState<Grupa | null>(null)
  const [cursanti, setCursanti] = useState<UserData[]>([])
  const [utilizatoriDisponibili, setUtilizatoriDisponibili] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const router = useRouter()
  const { showToast } = useSimpleToast()
  const grupaId = params.id

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Verificăm dacă este admin
        if (currentUser.email !== "admin@gmail.com") {
          router.push("/cont")
          return
        }

        // Încărcăm detaliile grupei
        if (grupaId) {
          await fetchGrupaDetails(grupaId)
        }
      } else {
        // Dacă nu este autentificat, redirecționăm către pagina de login
        router.push("/autentificare")
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router, grupaId])

  const fetchGrupaDetails = async (grupaId: string) => {
    try {
      // Obținem detaliile grupei
      const grupaDoc = await getDoc(doc(db, "grupe", grupaId))

      if (!grupaDoc.exists()) {
        showToast("Grupa nu a fost găsită","error"
         
      )
        router.push("/admin/grupe")
        return
      }

      const data = grupaDoc.data()

      // Asigurăm compatibilitatea cu datele existente
      const stiluri = data.stiluri || (data.stil ? [data.stil] : [])

      const grupaData = {
        id: grupaDoc.id,
        ...data,
        zile: data.zile || (data.program.includes("Luni") ? ["Luni", "Miercuri"] : ["Marți", "Joi"]),
        ora: data.program.split(",").pop()?.trim() || (data.program.includes("19:00") ? "19:00" : "20:30"),
        stiluri: stiluri,
      } as Grupa

      setGrupa(grupaData)

      // Încărcăm cursanții asociați grupei
      await fetchCursanti(grupaData.titlu)
    } catch (error) {
      console.error("Eroare la încărcarea detaliilor grupei:", error)
      showToast(
     
        "Nu s-au putut încărca detaliile grupei","info"
       
      )
    }
  }

  const fetchCursanti = async (grupaTitlu: string) => {
    try {
      // Obținem toți utilizatorii care sunt în grupa selectată
      const usersQuery = query(collection(db, "users"), where("grupe", "array-contains", grupaTitlu))

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
      await fetchUtilizatoriDisponibili(grupaTitlu)
    } catch (error) {
      console.error("Eroare la încărcarea cursanților:", error)
      showToast(
        
       "Nu s-au putut încărca cursanții","info"
      
      )
    }
  }

  const fetchUtilizatoriDisponibili = async (grupaTitlu: string) => {
    setIsLoadingUsers(true)

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
      showToast(
        "Nu s-au putut încărca utilizatorii disponibili","info"
       
      )
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleAddToGroup = async (userId: string) => {
    if (!grupa) return

    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        showToast(
         
          "Utilizatorul nu a fost găsit","info"
          
        )
        return
      }

      const userData = userDoc.data()
      const grupe = userData.grupe || []

      // Adăugăm grupa la lista de grupe a utilizatorului
      await updateDoc(userRef, {
        grupe: [...grupe, grupa.titlu],
      })

      showToast(
       
        "Utilizatorul a fost adăugat în grupă","success"
      )

      // Actualizăm listele de utilizatori
      await fetchCursanti(grupa.titlu)
    } catch (error) {
      console.error("Eroare la adăugarea utilizatorului în grupă:", error)
      showToast(
       
        "Nu s-a putut adăuga utilizatorul în grupă",
        "error",
      )
    }
  }

  const handleRemoveFromGroup = async (userId: string) => {
    if (!grupa) return

    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        showToast(
        
         "Utilizatorul nu a fost găsit",
         "info",
        )
        return
      }

      const userData = userDoc.data()
      const grupe = userData.grupe || []

      // Eliminăm grupa din lista de grupe a utilizatorului
      await updateDoc(userRef, {
        grupe: grupe.filter((g: string) => g !== grupa.titlu),
      })

      showToast(
         "Utilizatorul a fost eliminat din grupă","info"
      )

      // Actualizăm listele de utilizatori
      await fetchCursanti(grupa.titlu)
    } catch (error) {
      console.error("Eroare la eliminarea utilizatorului din grupă:", error)
      showToast(
         "Nu s-a putut elimina utilizatorul din grupă","error"
      
      )
    }
  }

  const filteredUtilizatori = utilizatoriDisponibili.filter((user) => {
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
          <p className="mt-4 text-gray-500">Se încarcă detaliile grupei...</p>
        </div>
      </div>
    )
  }

  if (!grupa) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Grupa nu a fost găsită</CardTitle>
            <CardDescription>Grupa pe care încerci să o accesezi nu există</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/admin/grupe")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Înapoi la lista de grupe
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="icon" onClick={() => router.push("/admin/grupe")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{grupa.titlu}</h1>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {grupa.stiluri &&
              grupa.stiluri.map((stil, index) => (
                <Badge key={index} className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                  {stil}
                </Badge>
              ))}
          </div>
          <p className="text-gray-500 mt-1">
            {grupa.zile.join(", ")}, {grupa.ora} • Instructor: {grupa.instructor}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cursanți înscriși</CardTitle>
            <CardDescription>Lista cursanților înscriși în această grupă</CardDescription>
          </CardHeader>
          <CardContent>
            {cursanti.length > 0 ? (
              <div className="space-y-4">
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
                              size="icon"
                              onClick={() => handleRemoveFromGroup(cursant.id!)}
                              title="Elimină din grupă"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              <Input
                placeholder="Caută după nume sau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {isLoadingUsers ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
                  <p className="mt-4 text-gray-500">Se încarcă utilizatorii...</p>
                </div>
              ) : filteredUtilizatori.length > 0 ? (
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
                              onClick={() => handleAddToGroup(user.id!)}
                              className="flex items-center gap-1"
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
  )
}

