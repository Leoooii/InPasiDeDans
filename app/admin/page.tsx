"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GrupaForm from "@/components/admin/grupa-form"
import GrupeList from "@/components/admin/grupe-list"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useSimpleToast } from "@/components/simple-toast-provider"
// Tipul pentru o grupă în formare
export type Grupa = {
  id?: string
  titlu: string
  descriere: string
  dataStart: string
  program: string
  instructor: string
  locuriDisponibile: number
  locuriTotale: number
  stiluri: string[] // Păstrăm doar array-ul de stiluri
  zile: string[]
  publica?: boolean // Proprietate opțională pentru compatibilitate
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [editingGrupa, setEditingGrupa] = useState<Grupa | null>(null)
  const [activeTab, setActiveTab] = useState("adauga")
  const router = useRouter()
  const { showToast } = useSimpleToast()

  // Verifică dacă utilizatorul este autentificat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        fetchGrupe()
      } else {
        // Dacă nu este autentificat, redirecționează către pagina de login
        router.push("/admin/login")
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  // Funcție pentru a încărca grupele existente
  const fetchGrupe = async () => {
    try {
      const grupeQuery = query(collection(db, "grupe"), orderBy("dataStart"))
      const querySnapshot = await getDocs(grupeQuery)

      const grupeData: Grupa[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        // Asigurăm compatibilitatea cu datele existente
        // Dacă există stil dar nu stiluri, creăm array-ul stiluri din stil
        const stiluri = data.stiluri || (data.stil ? [data.stil] : [])

        grupeData.push({
          id: doc.id,
          ...data,
          stiluri: stiluri,
          publica: data.publica !== undefined ? data.publica : true,
        } as Grupa)
      })

      setGrupe(grupeData)
    } catch (error) {
      console.error("Eroare la încărcarea grupelor:", error)
      showToast(
       "Nu s-au putut încărca grupele","error",
      )
    }
  }

  // Funcție pentru a adăuga o grupă nouă
  const handleAddGrupa = async (grupa: Grupa) => {
    try {
      // Eliminăm id-ul din obiect înainte de a-l trimite la Firestore
      const { id, ...grupaData } = grupa

      await addDoc(collection(db, "grupe"), grupaData)

      showToast(
        "Grupa a fost adăugată cu succes","success",
      )
      fetchGrupe() // Reîncarcă lista de grupe
    } catch (error) {
      console.error("Eroare la adăugarea grupei:", error)
      showToast( "Nu s-a putut adăuga grupa",
        "error",
      )
    }
  }

  // Funcție pentru a actualiza o grupă existentă
  const handleUpdateGrupa = async (grupa: Grupa) => {
    if (!grupa.id) return

    try {
      const grupaRef = doc(db, "grupe", grupa.id)
      const { id, ...grupaData } = grupa // Eliminăm id-ul din datele de actualizat

      await updateDoc(grupaRef, grupaData)

      showToast("Succes","success"
      )
      setEditingGrupa(null)
      fetchGrupe() // Reîncarcă lista de grupe
    } catch (error) {
      console.error("Eroare la actualizarea grupei:", error)
      showToast( "Nu s-a putut actualiza grupa",
         "error",)
    }
  }

  // Funcție pentru a șterge o grupă
  const handleDeleteGrupa = async (id: string) => {
    try {
      await deleteDoc(doc(db, "grupe", id))

      showToast(
        "Grupa a fost ștearsă cu succes","success"
      )
      fetchGrupe() // Reîncarcă lista de grupe
    } catch (error) {
      console.error("Eroare la ștergerea grupei:", error)
      showToast("Nu s-a putut șterge grupa","error"
       )
    }
  }

  // Funcție pentru a începe editarea unei grupe
  const handleEditGrupa = (grupa: Grupa) => {
    setEditingGrupa(grupa)
    setActiveTab("adauga") // Schimbă la tab-ul de editare
  }

  // Funcție pentru a anula editarea
  const handleCancelEdit = () => {
    setEditingGrupa(null)
  }

  // Funcție pentru deconectare
  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
      showToast("Deconectare reușită","success"
      )
    } catch (error) {
      console.error("Eroare la deconectare:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirecționarea se face în useEffect
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panou de administrare</h1>
        <div className="flex gap-3">
          <Button 
            variant="default" 
            onClick={() => router.push('/admin/studio')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            📝 Blog Studio
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Deconectare
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="adauga">Adaugă grupă</TabsTrigger>
          <TabsTrigger value="lista">Lista grupelor</TabsTrigger>
        </TabsList>

        <TabsContent value="adauga">
          <Card>
            <CardHeader>
              <CardTitle>{editingGrupa ? "Editează grupa" : "Adaugă grupă nouă"}</CardTitle>
              <CardDescription>
                {editingGrupa
                  ? "Modifică detaliile grupei existente"
                  : "Completează formularul pentru a adăuga o grupă nouă în formare"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GrupaForm
                onSubmit={editingGrupa ? handleUpdateGrupa : handleAddGrupa}
                initialData={editingGrupa || undefined}
                onCancel={editingGrupa ? handleCancelEdit : undefined}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lista">
          <Card>
            <CardHeader>
              <CardTitle>Grupe în formare</CardTitle>
              <CardDescription>Gestionează grupele existente</CardDescription>
            </CardHeader>
            <CardContent>
              <GrupeList grupe={grupe} onEdit={handleEditGrupa} onDelete={handleDeleteGrupa} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

