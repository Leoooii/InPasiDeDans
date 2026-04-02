"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GrupaForm from "@/components/admin/grupa-form"
import GrupeList from "@/components/admin/grupe-list"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useSimpleToast } from "@/components/simple-toast-provider"
import {
  BookOpen,
  Users,
  PlusCircle,
  List,
  ExternalLink,
  PenSquare,
  Pencil,
  X,
} from "lucide-react"
import Link from "next/link"

export type Grupa = {
  id?: string
  titlu: string
  descriere: string
  dataStart: string
  program: string
  instructor: string
  locuriDisponibile: number
  locuriTotale: number
  stiluri: string[]
  zile: string[]
  publica?: boolean
  nivel?: string
  rol?: string
  sala?: string
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [editingGrupa, setEditingGrupa] = useState<Grupa | null>(null)
  const [activeTab, setActiveTab] = useState("adauga")
  const router = useRouter()
  const { showToast } = useSimpleToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        fetchGrupe()
      } else {
        router.push("/admin/login")
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  const fetchGrupe = async () => {
    try {
      const grupeQuery = query(collection(db, "grupe"), orderBy("dataStart"))
      const querySnapshot = await getDocs(grupeQuery)
      const grupeData: Grupa[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const stiluri = data.stiluri || (data.stil ? [data.stil] : [])
        grupeData.push({
          id: doc.id,
          ...data,
          stiluri,
          publica: data.publica !== undefined ? data.publica : true,
        } as Grupa)
      })
      setGrupe(grupeData)
    } catch (error) {
      console.error("Eroare la încărcarea grupelor:", error)
      showToast("Nu s-au putut încărca grupele", "error")
    }
  }

  const handleAddGrupa = async (grupa: Grupa) => {
    try {
      const { id, ...grupaData } = grupa
      await addDoc(collection(db, "grupe"), grupaData)
      showToast("Grupa a fost adăugată cu succes", "success")
      fetchGrupe()
    } catch {
      showToast("Nu s-a putut adăuga grupa", "error")
    }
  }

  const handleUpdateGrupa = async (grupa: Grupa) => {
    if (!grupa.id) return
    try {
      const grupaRef = doc(db, "grupe", grupa.id)
      const { id, ...grupaData } = grupa
      await updateDoc(grupaRef, grupaData)
      showToast("Grupă actualizată", "success")
      setEditingGrupa(null)
      setActiveTab("lista")

      fetchGrupe()
    } catch {
      showToast("Nu s-a putut actualiza grupa", "error")
    }
  }

  const handleDeleteGrupa = async (id: string) => {
    try {
      await deleteDoc(doc(db, "grupe", id))
      showToast("Grupa a fost ștearsă cu succes", "success")
      fetchGrupe()
    } catch {
      showToast("Nu s-a putut șterge grupa", "error")
    }
  }

  const handleEditGrupa = (grupa: Grupa) => {
    setEditingGrupa(grupa)
    setActiveTab("editeaza")
  }

  const handleCancelEdit = () => {
    setEditingGrupa(null)
    setActiveTab("lista")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Se încarcă...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  const grupePublice = grupe.filter(g => g.publica !== false)
  const locuriDisponibile = grupe.reduce((acc, g) => acc + (g.locuriDisponibile || 0), 0)
  const locuriTotale = grupe.reduce((acc, g) => acc + (g.locuriTotale || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Gestionează grupele și conținutul școlii</p>
        </div>
        <Link href="/admin/studio">
          <Button variant="outline" className="gap-2 text-sm">
            <PenSquare className="h-4 w-4" />
            Blog Studio
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total grupe</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{grupe.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Grupe publice</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{grupePublice.length}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Locuri libere</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{locuriDisponibile}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Ocupare</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {locuriTotale > 0 ? Math.round(((locuriTotale - locuriDisponibile) / locuriTotale) * 100) : 0}%
                </p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <div className="h-5 w-5 flex items-center justify-center">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-red-500"
                    style={{
                      background: `conic-gradient(#ef4444 ${locuriTotale > 0 ? ((locuriTotale - locuriDisponibile) / locuriTotale) * 360 : 0}deg, #fee2e2 0deg)`
                    }}
                  />
                </div>
              </div>
            </div>
            {locuriTotale > 0 && (
              <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{ width: `${((locuriTotale - locuriDisponibile) / locuriTotale) * 100}%` }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Grupe management */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-0 px-6 pt-6">
          <CardTitle className="text-lg font-semibold text-slate-900">Grupe în formare</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(val) => {
            if (val !== "editeaza") setEditingGrupa(null)
            setActiveTab(val)
          }}>
            <TabsList className="bg-slate-100 p-1 rounded-lg mb-6">
              <TabsTrigger
                value="adauga"
                className="flex items-center gap-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <PlusCircle className="h-4 w-4" />
                Adaugă grupă
              </TabsTrigger>
              <TabsTrigger
                value="lista"
                className="flex items-center gap-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <List className="h-4 w-4" />
                Listă grupe
                {grupe.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-slate-200 text-slate-600 rounded-full font-medium">
                    {grupe.length}
                  </span>
                )}
              </TabsTrigger>
              {editingGrupa && (
                <TabsTrigger
                  value="editeaza"
                  className="flex items-center gap-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Pencil className="h-4 w-4" />
                  Editează grupă
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCancelEdit() }}
                    className="ml-1 rounded hover:bg-slate-200 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="adauga">
              <p className="text-sm text-slate-500 mb-6">
                Completează formularul pentru a adăuga o grupă nouă în formare.
              </p>
              <GrupaForm
                key="new"
                onSubmit={handleAddGrupa}
              />
            </TabsContent>

            <TabsContent value="lista">
              <GrupeList
                grupe={grupe}
                onEdit={handleEditGrupa}
                onDelete={handleDeleteGrupa}
              />
            </TabsContent>

            {editingGrupa && (
              <TabsContent value="editeaza">
                <p className="text-sm text-slate-500 mb-6">
                  Modifică detaliile grupei existente.
                </p>
                <GrupaForm
                  key={editingGrupa.id}
                  onSubmit={handleUpdateGrupa}
                  initialData={editingGrupa}
                  onCancel={handleCancelEdit}
                />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
