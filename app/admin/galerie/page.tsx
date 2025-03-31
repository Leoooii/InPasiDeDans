"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImagineForm, { type ImagineData } from "@/components/admin/imagine-form"
import ImaginiList from "@/components/admin/imagini-list"
import { useToast } from "@/components/ui/use-toast"
import { auth, db, storage } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
  getDoc,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { onAuthStateChanged } from "firebase/auth"
import { Loader2 } from "lucide-react"

export default function AdminGaleriePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [imagini, setImagini] = useState<ImagineData[]>([])
  const [editingImagine, setEditingImagine] = useState<ImagineData | null>(null)
  const [activeTab, setActiveTab] = useState("adauga-imagine")
  const router = useRouter()
  const { toast } = useToast()

  // Verifică dacă utilizatorul este autentificat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email !== "admin@gmail.com") {
          router.push("/cont")
          return
        }
        fetchImagini()
      } else {
        router.push("/admin/login")
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  // Funcție pentru a încărca imaginile existente
  const fetchImagini = async () => {
    try {
      const imaginiQuery = query(collection(db, "imagini"), orderBy("dataAdaugare", "desc"))
      const querySnapshot = await getDocs(imaginiQuery)

      const imaginiData: ImagineData[] = []
      querySnapshot.forEach((doc) => {
        imaginiData.push({ id: doc.id, ...doc.data() } as ImagineData)
      })

      setImagini(imaginiData)
    } catch (error) {
      console.error("Eroare la încărcarea imaginilor:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca imaginile",
        variant: "destructive",
      })
    }
  }

  // Funcție pentru a adăuga sau actualiza o imagine
  const handleSubmitImagine = async (imagine: ImagineData, file: File | null) => {
    try {
      let url = imagine.url
      const imagineId = imagine.id

      // Dacă avem un fișier nou, îl încărcăm în Storage
      if (file) {
        // Generăm un nume unic pentru fișier
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`
        const storageRef = ref(storage, `imagini/${fileName}`)

        // Încărcăm fișierul
        await uploadBytes(storageRef, file)

        // Obținem URL-ul de descărcare
        url = await getDownloadURL(storageRef)
      }

      // Pregătim datele pentru Firestore
      const imagineData = {
        titlu: imagine.titlu,
        descriere: imagine.descriere,
        categorie: imagine.categorie,
        url: url,
        dataAdaugare: imagine.dataAdaugare || Timestamp.now().toDate().toISOString(),
      }

      // Adăugăm sau actualizăm documentul în Firestore
      if (imagineId) {
        // Actualizare
        await updateDoc(doc(db, "imagini", imagineId), imagineData)
        toast({
          title: "Succes",
          description: "Imaginea a fost actualizată cu succes",
        })
      } else {
        // Adăugare
        await addDoc(collection(db, "imagini"), imagineData)
        toast({
          title: "Succes",
          description: "Imaginea a fost adăugată cu succes",
        })
      }

      // Resetăm starea de editare și reîncărcăm lista
      setEditingImagine(null)
      fetchImagini()
    } catch (error) {
      console.error("Eroare la procesarea imaginii:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut procesa imaginea",
        variant: "destructive",
      })
    }
  }

  // Funcție pentru a șterge o imagine
  const handleDeleteImagine = async (id: string) => {
    try {
      // Obținem documentul pentru a avea URL-ul imaginii
      //const imagineDoc = await db.collection("imagini").doc(id).get()
      const imagineDoc = await getDoc(doc(db, "imagini", id))

      if (imagineDoc.exists()) {
        const imagineData = imagineDoc.data() as ImagineData

        // Ștergem imaginea din Storage dacă avem un URL
        if (imagineData.url) {
          try {
            // Extragem calea din URL
            const urlObj = new URL(imagineData.url)
            const storagePath = decodeURIComponent(urlObj.pathname.split("/o/")[1].split("?")[0])
            const storageRef = ref(storage, storagePath)

            await deleteObject(storageRef)
          } catch (storageError) {
            console.error("Eroare la ștergerea fișierului din Storage:", storageError)
            // Continuăm cu ștergerea documentului chiar dacă ștergerea fișierului eșuează
          }
        }

        // Ștergem documentul din Firestore
        await deleteDoc(doc(db, "imagini", id))

        toast({
          title: "Succes",
          description: "Imaginea a fost ștearsă cu succes",
        })

        fetchImagini() // Reîncărcăm lista de imagini
      }
    } catch (error) {
      console.error("Eroare la ștergerea imaginii:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge imaginea",
        variant: "destructive",
      })
    }
  }

  // Funcție pentru a începe editarea unei imagini
  const handleEditImagine = (imagine: ImagineData) => {
    setEditingImagine(imagine)
    setActiveTab("adauga-imagine") // Schimbă la tab-ul de editare imagine
  }

  // Funcție pentru a anula editarea imaginii
  const handleCancelEditImagine = () => {
    setEditingImagine(null)
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionare Galerie</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Înapoi la panou
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="adauga-imagine">Adaugă imagine</TabsTrigger>
          <TabsTrigger value="lista-imagini">Galerie imagini</TabsTrigger>
        </TabsList>

        <TabsContent value="adauga-imagine">
          <Card>
            <CardHeader>
              <CardTitle>{editingImagine ? "Editează imaginea" : "Adaugă imagine nouă"}</CardTitle>
              <CardDescription>
                {editingImagine
                  ? "Modifică detaliile imaginii existente"
                  : "Completează formularul pentru a adăuga o imagine nouă în galerie"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImagineForm
                onSubmit={handleSubmitImagine}
                initialData={editingImagine || undefined}
                onCancel={editingImagine ? handleCancelEditImagine : undefined}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lista-imagini">
          <Card>
            <CardHeader>
              <CardTitle>Galerie imagini</CardTitle>
              <CardDescription>Gestionează imaginile din galerie</CardDescription>
            </CardHeader>
            <CardContent>
              <ImaginiList imagini={imagini} onEdit={handleEditImagine} onDelete={handleDeleteImagine} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

