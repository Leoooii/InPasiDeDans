"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSimpleToast } from "@/components/simple-toast-provider"
import { Pencil, Trash2, PlusCircle, List, X, Star } from "lucide-react"

type Tarif = {
  id?: string
  titlu: string
  descriere: string
  pret: number
  moneda: string
  categorie: "grup" | "privat" | "copii"
  beneficii: string[]
  popular: boolean
  ordine: number
}

const CATEGORII = [
  { value: "grup", label: "Cursuri Grup Adulți" },
  { value: "privat", label: "Lecții Private" },
  { value: "copii", label: "Cursuri Copii" },
]

const INITIAL_TARIFE: Omit<Tarif, "id">[] = [
  // Grup adulți
  {
    titlu: "Abonament 8",
    descriere: "Valabil 4 săptămâni",
    pret: 250,
    moneda: "Lei",
    categorie: "grup",
    beneficii: [
      "8 ședințe pe lună",
      "Acces la o singură grupă",
      "Valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)",
    ],
    popular: false,
    ordine: 1,
  },
  {
    titlu: "Abonament 16",
    descriere: "Valabil 4 săptămâni",
    pret: 350,
    moneda: "Lei",
    categorie: "grup",
    beneficii: [
      "16 ședințe pe lună",
      "Acces la 2 grupe",
      "Valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)",
    ],
    popular: true,
    ordine: 2,
  },
  {
    titlu: "Abonament Full Pass",
    descriere: "Valabil 4 săptămâni",
    pret: 420,
    moneda: "Lei",
    categorie: "grup",
    beneficii: [
      "Acces nelimitat la grupe",
      "Valabil începând cu prima ședință efectuată",
      "Permite acces la toate grupele în desfășurare la momentul achiziționării",
    ],
    popular: false,
    ordine: 3,
  },
  {
    titlu: "Plata la ședință",
    descriere: "Orice stil de dans",
    pret: 45,
    moneda: "Lei",
    categorie: "grup",
    beneficii: [
      "O ședință la grup",
      "Tarif valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)",
    ],
    popular: false,
    ordine: 4,
  },
  // Lecții private
  {
    titlu: "Pachet 4 ședințe",
    descriere: "",
    pret: 640,
    moneda: "Lei",
    categorie: "privat",
    beneficii: ["4 ședințe private", "Instructor dedicat"],
    popular: false,
    ordine: 1,
  },
  {
    titlu: "Pachet 6 ședințe",
    descriere: "",
    pret: 900,
    moneda: "Lei",
    categorie: "privat",
    beneficii: ["6 ședințe private", "Instructor dedicat"],
    popular: false,
    ordine: 2,
  },
  {
    titlu: "Pachet 8 ședințe",
    descriere: "",
    pret: 1120,
    moneda: "Lei",
    categorie: "privat",
    beneficii: ["8 ședințe private", "Instructor dedicat"],
    popular: false,
    ordine: 3,
  },
  {
    titlu: "Plata la ședință",
    descriere: "",
    pret: 180,
    moneda: "Lei",
    categorie: "privat",
    beneficii: ["O ședință privată", "Instructor dedicat"],
    popular: false,
    ordine: 4,
  },
  // Copii
  {
    titlu: "Abonament 4",
    descriere: "Valabil o lună (4 ședințe)",
    pret: 110,
    moneda: "Lei",
    categorie: "copii",
    beneficii: ["4 ședințe pe lună", "O ședință pe săptămână", "Acces la grupe pentru copii"],
    popular: false,
    ordine: 1,
  },
  {
    titlu: "Abonament 8",
    descriere: "Valabil o lună (8 ședințe)",
    pret: 200,
    moneda: "Lei",
    categorie: "copii",
    beneficii: ["8 ședințe pe lună", "2 ședințe pe săptămână", "Acces la grupe pentru copii"],
    popular: false,
    ordine: 2,
  },
  {
    titlu: "Abonament 12",
    descriere: "Valabil o lună (12 ședințe)",
    pret: 250,
    moneda: "Lei",
    categorie: "copii",
    beneficii: ["12 ședințe pe lună", "3 ședințe pe săptămână", "Acces la grupe pentru copii"],
    popular: false,
    ordine: 3,
  },
  {
    titlu: "Plata la ședință",
    descriere: "Ședință de grup",
    pret: 35,
    moneda: "Lei",
    categorie: "copii",
    beneficii: ["O ședință la grup", "Acces la grupe pentru copii"],
    popular: false,
    ordine: 4,
  },
]

const EMPTY_TARIF: Omit<Tarif, "id"> = {
  titlu: "",
  descriere: "",
  pret: 0,
  moneda: "Lei",
  categorie: "grup",
  beneficii: [],
  popular: false,
  ordine: 99,
}

export default function TarifePage() {
  const [tarife, setTarife] = useState<Tarif[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSeeding, setIsSeeding] = useState(false)
  const [form, setForm] = useState<Omit<Tarif, "id">>(EMPTY_TARIF)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [beneficiuNou, setBeneficiuNou] = useState("")
  const [activeTab, setActiveTab] = useState("lista")
  const { showToast } = useSimpleToast()

  useEffect(() => {
    fetchTarife()
  }, [])

  const fetchTarife = async () => {
    try {
      const q = query(collection(db, "tarife"), orderBy("ordine", "asc"))
      const snapshot = await getDocs(q)
      setTarife(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Tarif)))
    } catch {
      showToast("Nu s-au putut încărca tarifele", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSeed = async () => {
    setIsSeeding(true)
    try {
      for (const tarif of INITIAL_TARIFE) {
        await addDoc(collection(db, "tarife"), tarif)
      }
      showToast("Tarifele inițiale au fost adăugate cu succes", "success")
      fetchTarife()
    } catch {
      showToast("Eroare la popularea tarifelor", "error")
    } finally {
      setIsSeeding(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.titlu || !form.pret || !form.categorie) {
      showToast("Completează titlul, prețul și categoria", "error")
      return
    }
    try {
      if (editingId) {
        await updateDoc(doc(db, "tarife", editingId), { ...form, pret: Number(form.pret) })
        showToast("Tarif actualizat", "success")
      } else {
        await addDoc(collection(db, "tarife"), { ...form, pret: Number(form.pret) })
        showToast("Tarif adăugat", "success")
      }
      resetForm()
      fetchTarife()
    } catch {
      showToast("Eroare la salvarea tarifului", "error")
    }
  }

  const handleEdit = (tarif: Tarif) => {
    setEditingId(tarif.id!)
    setForm({
      titlu: tarif.titlu,
      descriere: tarif.descriere,
      pret: tarif.pret,
      moneda: tarif.moneda,
      categorie: tarif.categorie,
      beneficii: [...tarif.beneficii],
      popular: tarif.popular,
      ordine: tarif.ordine,
    })
    setActiveTab("formular")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Ești sigur că vrei să ștergi acest tarif?")) return
    try {
      await deleteDoc(doc(db, "tarife", id))
      showToast("Tarif șters", "success")
      fetchTarife()
    } catch {
      showToast("Eroare la ștergerea tarifului", "error")
    }
  }

  const resetForm = () => {
    setForm(EMPTY_TARIF)
    setEditingId(null)
    setBeneficiuNou("")
    setActiveTab("lista")
  }

  const addBeneficiu = () => {
    if (!beneficiuNou.trim()) return
    setForm((f) => ({ ...f, beneficii: [...f.beneficii, beneficiuNou.trim()] }))
    setBeneficiuNou("")
  }

  const removeBeneficiu = (idx: number) => {
    setForm((f) => ({ ...f, beneficii: f.beneficii.filter((_, i) => i !== idx) }))
  }

  const grupedTarife = {
    grup: tarife.filter((t) => t.categorie === "grup"),
    privat: tarife.filter((t) => t.categorie === "privat"),
    copii: tarife.filter((t) => t.categorie === "copii"),
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tarife</h1>
          <p className="text-sm text-slate-500 mt-0.5">Gestionează tarifele afișate pe pagina /tarife</p>
        </div>
        <div className="flex gap-2">
          {tarife.length === 0 && (
            <Button
              variant="outline"
              onClick={handleSeed}
              disabled={isSeeding}
              className="text-sm"
            >
              {isSeeding ? "Se populează..." : "Populare automată"}
            </Button>
          )}
          <Button
            onClick={() => { resetForm(); setActiveTab("formular") }}
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Tarif nou
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => { if (v !== "formular") resetForm(); setActiveTab(v) }}>
            <TabsList className="bg-slate-100 p-1 rounded-lg mb-6">
              <TabsTrigger value="lista" className="flex items-center gap-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <List className="h-4 w-4" />
                Listă tarife
                {tarife.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-slate-200 text-slate-600 rounded-full font-medium">
                    {tarife.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="formular" className="flex items-center gap-2 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                {editingId ? <Pencil className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                {editingId ? "Editează tarif" : "Adaugă tarif"}
                {editingId && (
                  <button onClick={(e) => { e.stopPropagation(); resetForm() }} className="ml-1 rounded hover:bg-slate-200 p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </TabsTrigger>
            </TabsList>

            {/* LIST TAB */}
            <TabsContent value="lista">
              {tarife.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p className="mb-4">Nu există tarife. Adaugă primul tarif sau folosește popularea automată.</p>
                  <Button variant="outline" onClick={handleSeed} disabled={isSeeding}>
                    {isSeeding ? "Se populează..." : "Populare automată cu tarifele curente"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {CATEGORII.map(({ value, label }) => {
                    const list = grupedTarife[value as keyof typeof grupedTarife]
                    if (!list.length) return null
                    return (
                      <div key={value}>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</h3>
                        <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                          {list.map((tarif) => (
                            <div key={tarif.id} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-slate-800 text-sm">{tarif.titlu}</span>
                                    {tarif.popular && (
                                      <Badge className="bg-orange-100 text-orange-700 text-xs px-1.5 py-0 flex items-center gap-1">
                                        <Star className="h-2.5 w-2.5" /> Popular
                                      </Badge>
                                    )}
                                  </div>
                                  {tarif.descriere && (
                                    <p className="text-xs text-slate-400 mt-0.5">{tarif.descriere}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                <span className="font-bold text-slate-900">{tarif.pret} {tarif.moneda}</span>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleEdit(tarif)}
                                    className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(tarif.id!)}
                                    className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            {/* FORM TAB */}
            <TabsContent value="formular">
              <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="titlu">Titlu *</Label>
                    <Input
                      id="titlu"
                      value={form.titlu}
                      onChange={(e) => setForm((f) => ({ ...f, titlu: e.target.value }))}
                      placeholder="ex: Abonament 8"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pret">Preț (Lei) *</Label>
                    <Input
                      id="pret"
                      type="number"
                      min={0}
                      value={form.pret}
                      onChange={(e) => setForm((f) => ({ ...f, pret: Number(e.target.value) }))}
                      placeholder="ex: 250"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descriere">Descriere / subtitlu</Label>
                  <Input
                    id="descriere"
                    value={form.descriere}
                    onChange={(e) => setForm((f) => ({ ...f, descriere: e.target.value }))}
                    placeholder="ex: Valabil 4 săptămâni"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Categorie *</Label>
                    <Select
                      value={form.categorie}
                      onValueChange={(v) => setForm((f) => ({ ...f, categorie: v as Tarif["categorie"] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORII.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ordine">Ordine afișare</Label>
                    <Input
                      id="ordine"
                      type="number"
                      min={1}
                      value={form.ordine}
                      onChange={(e) => setForm((f) => ({ ...f, ordine: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Beneficii</Label>
                  <div className="flex gap-2">
                    <Input
                      value={beneficiuNou}
                      onChange={(e) => setBeneficiuNou(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBeneficiu() } }}
                      placeholder="Adaugă un beneficiu și apasă Enter"
                    />
                    <Button type="button" variant="outline" onClick={addBeneficiu} className="shrink-0">
                      Adaugă
                    </Button>
                  </div>
                  {form.beneficii.length > 0 && (
                    <ul className="space-y-1 mt-2">
                      {form.beneficii.map((b, i) => (
                        <li key={i} className="flex items-center justify-between text-sm bg-slate-50 rounded px-3 py-1.5">
                          <span>{b}</span>
                          <button type="button" onClick={() => removeBeneficiu(i)} className="text-slate-400 hover:text-red-500 ml-2">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="popular"
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm((f) => ({ ...f, popular: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 accent-red-600"
                  />
                  <Label htmlFor="popular" className="cursor-pointer">Marchează ca Popular</Label>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
                    {editingId ? "Salvează modificările" : "Adaugă tarif"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Anulează
                    </Button>
                  )}
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
