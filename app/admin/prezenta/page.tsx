"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSimpleToast } from "@/components/simple-toast-provider"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"
import { Loader2, Check, Calendar, Clock, AlertCircle } from "lucide-react"
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
  stiluri: string[] // Păstrăm doar array-ul de stiluri
  zile: string[]
  ora: string
}

type UserData = {
  id: string
  nume: string
  prenume: string
  email: string
  telefon: string
  grupe: string[]
  abonamente: any[]
  prezente?: {
    data: any
    grupa: string
    profesor: string
  }[]
}

export default function PrezentaPage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [grupeAzi, setGrupeAzi] = useState<Grupa[]>([])
  const [selectedGrupa, setSelectedGrupa] = useState<Grupa | null>(null)
  const [cursanti, setCursanti] = useState<UserData[]>([])
  const [selectedCursanti, setSelectedCursanti] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCursanti, setIsLoadingCursanti] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { showToast } = useSimpleToast()

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

  // Actualizăm funcția fetchGrupe pentru a folosi datele reale și a filtra corect după ziua curentă
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
          // Asigurăm-ne că avem mereu un array de stiluri
          stiluri: data.stiluri || (data.stil ? [data.stil] : ["Dans de societate"]),
        } as Grupa

        grupeData.push(grupa)
      })

      setGrupe(grupeData)

      // Obținem ziua curentă în română
      const zileCuRomana = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
      const ziuaCurenta = zileCuRomana[new Date().getDay()]

      // Filtrăm grupele pentru ziua curentă
      const grupeAziData = grupeData.filter((grupa) => grupa.zile && grupa.zile.includes(ziuaCurenta))

      // Dacă nu avem grupe pentru ziua curentă, adăugăm una pentru demonstrație
      if (grupeAziData.length === 0 && grupeData.length > 0) {
        // Clonăm prima grupă și modificăm zilele pentru a include ziua curentă
        const grupaDemo = { ...grupeData[0] }
        grupaDemo.zile = [ziuaCurenta]
        grupaDemo.id = "demo_" + grupaDemo.id
        grupaDemo.titlu = `${grupaDemo.titlu} (Demo pentru ${ziuaCurenta})`
        grupeAziData.push(grupaDemo)
      }

      setGrupeAzi(grupeAziData)
    } catch (error) {
      console.error("Eroare la încărcarea grupelor:", error)
      showToast("Nu s-au putut încărca grupele", "error")
      
    }
  }

  // Actualizăm funcția fetchCursantiGrupa pentru a evita duplicarea id-ului
  const fetchCursantiGrupa = async (grupa: Grupa) => {
    setIsLoadingCursanti(true)
    setSelectedGrupa(grupa)
    setSelectedCursanti([])

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
    } catch (error) {
      console.error("Eroare la încărcarea cursanților:", error)
      showToast(
         "Nu s-au putut încărca cursanții","error"
       )
    } finally {
      setIsLoadingCursanti(false)
    }
  }

  // Verifică dacă un cursant are deja prezență pentru grupa și data curentă
  const hasAttendanceToday = (cursant: UserData, grupaTitlu: string) => {
    if (!cursant.prezente || !Array.isArray(cursant.prezente)) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Setăm ora la 00:00:00 pentru a compara doar data

    return cursant.prezente.some((prezenta) => {
      if (!prezenta.data || !prezenta.data.toDate) return false

      const prezentaDate = prezenta.data.toDate()
      prezentaDate.setHours(0, 0, 0, 0) // Setăm ora la 00:00:00 pentru a compara doar data

      return prezentaDate.getTime() === today.getTime() && prezenta.grupa === grupaTitlu
    })
  }

  const toggleSelectCursant = (cursantId: string) => {
    setSelectedCursanti((prev) =>
      prev.includes(cursantId) ? prev.filter((id) => id !== cursantId) : [...prev, cursantId],
    )
  }

  const handleSavePrezenta = async () => {
    if (!selectedGrupa || selectedCursanti.length === 0) return

    setIsSaving(true)

    try {
      const dataPrezenta = Timestamp.now()
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Setăm ora la 00:00:00 pentru a compara doar data

      // Pentru fiecare cursant selectat, adăugăm prezența
      for (const cursantId of selectedCursanti) {
        const cursantRef = doc(db, "users", cursantId)
        const cursant = cursanti.find((c) => c.id === cursantId)

        if (!cursant) continue

        // Verificăm dacă cursantul are deja prezență pentru această grupă astăzi
        if (hasAttendanceToday(cursant, selectedGrupa.titlu)) {
          console.log(
            `Cursantul ${cursant.nume} ${cursant.prenume} are deja prezență pentru astăzi la grupa ${selectedGrupa.titlu}`,
          )
          continue // Sărim peste acest cursant
        }

        // Adăugăm prezența în lista de prezențe a cursantului
        await updateDoc(cursantRef, {
          prezente: arrayUnion({
            data: dataPrezenta,
            grupa: selectedGrupa.titlu,
            profesor: selectedGrupa.instructor,
          }),
        })

        // Actualizăm numărul de ședințe rămase în abonament
        if (cursant.abonamente && cursant.abonamente.length > 0) {
          // Găsim primul abonament activ cu ședințe rămase
          const abonamenteActualizate = [...cursant.abonamente]

          for (let i = 0; i < abonamenteActualizate.length; i++) {
            const abonament = abonamenteActualizate[i]

            // Verificăm dacă abonamentul este activ și mai are ședințe
            if (abonament.sedinteRamase > 0 && new Date() < new Date(abonament.dataExpirare.toDate())) {
              // Decrementăm numărul de ședințe rămase
              abonamenteActualizate[i] = {
                ...abonament,
                sedinteRamase: abonament.sedinteRamase - 1,
              }

              // Actualizăm abonamentele în baza de date
              await updateDoc(cursantRef, {
                abonamente: abonamenteActualizate,
              })

              break
            }
          }
        }
      }

      showToast(`Prezența a fost salvată pentru ${selectedCursanti.length} cursanți`,"success"
      )

      // Reîncărcăm cursanții pentru a actualiza datele
      await fetchCursantiGrupa(selectedGrupa)

      // Resetăm selecția
      setSelectedCursanti([])
    } catch (error) {
      console.error("Eroare la salvarea prezenței:", error)
      showToast("Nu s-a putut salva prezența","error"
       )
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă datele...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Prezență zilnică</h1>
          <p className="text-gray-500">
            {new Date().toLocaleDateString("ro-RO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Înapoi la panou
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Grupe astăzi
              </CardTitle>
              <CardDescription>Grupele programate pentru astăzi</CardDescription>
            </CardHeader>
            <CardContent>
              {grupeAzi.length > 0 ? (
                <div className="space-y-3">
                  {grupeAzi.map((grupa) => (
                    <div
                      key={grupa.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedGrupa?.id === grupa.id
                          ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                          : "hover:border-red-200 hover:bg-red-50/50 dark:hover:bg-red-900/5"
                      }`}
                      onClick={() => fetchCursantiGrupa(grupa)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{grupa.titlu}</h3>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {grupa.stiluri.map((stil, index) => (
                            <Badge key={index} className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                              {stil}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{grupa.ora}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Instructor: {grupa.instructor}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există grupe programate pentru astăzi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedGrupa ? `Cursanți - ${selectedGrupa.titlu}` : "Selectează o grupă pentru a vedea cursanții"}
              </CardTitle>
              <CardDescription>
                {selectedGrupa
                  ? `Marchează prezența pentru cursanții din grupa ${selectedGrupa.titlu}`
                  : "Alege o grupă din lista din stânga"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingCursanti ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
                  <p className="mt-4 text-gray-500">Se încarcă cursanții...</p>
                </div>
              ) : selectedGrupa ? (
                cursanti.length > 0 ? (
                  <div className="space-y-4">
                    <div className="rounded-md border overflow-hidden overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-3 text-left font-medium">Nume</th>
                            <th className="p-3 text-left font-medium">Abonament</th>
                            <th className="p-3 text-left font-medium">Ședințe rămase</th>
                            <th className="p-3 text-center font-medium">Prezent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cursanti.map((cursant) => {
                            // Găsim primul abonament activ
                            const abonamentActiv = cursant.abonamente?.find(
                              (a) => a.sedinteRamase > 0 && new Date() < new Date(a.dataExpirare.toDate()),
                            )

                            // Verificăm dacă cursantul are deja prezență pentru astăzi
                            const arePrezentaAzi = hasAttendanceToday(cursant, selectedGrupa.titlu)

                            return (
                              <tr key={cursant.id} className="border-t">
                                <td className="p-3">
                                  {cursant.nume} {cursant.prenume}
                                </td>
                                <td className="p-3">
                                  {abonamentActiv ? (
                                    abonamentActiv.tip
                                  ) : (
                                    <span className="text-red-500">Fără abonament activ</span>
                                  )}
                                </td>
                                <td className="p-3">{abonamentActiv ? abonamentActiv.sedinteRamase : "-"}</td>
                                <td className="p-3 text-center">
                                  {arePrezentaAzi ? (
                                    <div className="flex items-center justify-center">
                                      <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4" />
                                      </span>
                                    </div>
                                  ) : (
                                    <button
                                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        selectedCursanti.includes(cursant.id)
                                          ? "bg-green-500 text-white"
                                          : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                                      }`}
                                      onClick={() => toggleSelectCursant(cursant.id)}
                                      disabled={!abonamentActiv || abonamentActiv.sedinteRamase <= 0}
                                      title={
                                        !abonamentActiv || abonamentActiv.sedinteRamase <= 0
                                          ? "Nu are abonament activ sau ședințe rămase"
                                          : ""
                                      }
                                    >
                                      {selectedCursanti.includes(cursant.id) && <Check className="h-4 w-4" />}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Afișăm un mesaj informativ despre prezențele deja înregistrate */}
                    {cursanti.some((cursant) => hasAttendanceToday(cursant, selectedGrupa.titlu)) && (
                      <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        <p>Cursanții cu bifa verde au deja prezența înregistrată pentru astăzi la această grupă.</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button onClick={handleSavePrezenta} disabled={selectedCursanti.length === 0 || isSaving}>
                        {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Salvează prezența ({selectedCursanti.length})
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nu există cursanți înscriși în această grupă</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Selectează o grupă pentru a vedea cursanții</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

