"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, doc, updateDoc, query, where, Timestamp } from "firebase/firestore"
import { Loader2, Check, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type UserData = {
  id: string
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

export default function UtilizatoriPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("toti")
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [isAddAbonamentOpen, setIsAddAbonamentOpen] = useState(false)
  const [newAbonament, setNewAbonament] = useState({
    tip: "Standard",
    numarSedinte: 8,
    pretPlatit: 200,
    dataInceput: new Date().toISOString().split("T")[0],
  })
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

        // Încărcăm lista de utilizatori
        await fetchUsers()
      } else {
        // Dacă nu este autentificat, redirecționăm către pagina de login
        router.push("/autentificare")
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    // Filtrăm utilizatorii în funcție de tab-ul activ
    if (activeTab === "toti") {
      setFilteredUsers(users)
    } else if (activeTab === "aprobati") {
      setFilteredUsers(users.filter((user) => user.aprobat))
    } else if (activeTab === "neaprobati") {
      setFilteredUsers(users.filter((user) => !user.aprobat))
    }
  }, [activeTab, users])

  const fetchUsers = async () => {
    try {
      const usersQuery = query(collection(db, "users"), where("role", "==", "cursant"))
      const querySnapshot = await getDocs(usersQuery)

      const usersData: UserData[] = []
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as UserData)
      })

      setUsers(usersData)
      setFilteredUsers(usersData)
    } catch (error) {
      console.error("Eroare la încărcarea utilizatorilor:", error)
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca utilizatorii",
        variant: "destructive",
      })
    }
  }

  const handleApproveUser = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        aprobat: true,
        dataInceputCursuri: Timestamp.now(),
      })

      toast({
        title: "Succes",
        description: "Utilizatorul a fost aprobat",
      })

      // Actualizăm lista de utilizatori
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, aprobat: true, dataInceputCursuri: Timestamp.now() } : user,
        ),
      )
    } catch (error) {
      console.error("Eroare la aprobarea utilizatorului:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut aproba utilizatorul",
        variant: "destructive",
      })
    }
  }

  const handleAddAbonament = async () => {
    if (!selectedUser) return

    try {
      // Calculăm data de expirare (30 de zile de la data de început)
      const dataInceput = new Date(newAbonament.dataInceput)
      const dataExpirare = new Date(dataInceput)
      dataExpirare.setDate(dataExpirare.getDate() + 30)

      const abonament = {
        id: Date.now().toString(),
        tip: newAbonament.tip,
        dataInceput: Timestamp.fromDate(dataInceput),
        dataExpirare: Timestamp.fromDate(dataExpirare),
        pretPlatit: newAbonament.pretPlatit,
        numarSedinte: newAbonament.numarSedinte,
        sedinteRamase: newAbonament.numarSedinte,
      }

      // Adăugăm abonamentul la lista de abonamente a utilizatorului
      const userRef = doc(db, "users", selectedUser.id)
      const abonamente = selectedUser.abonamente || []

      await updateDoc(userRef, {
        abonamente: [...abonamente, abonament],
      })

      toast({
        title: "Succes",
        description: "Abonamentul a fost adăugat",
      })

      // Actualizăm lista de utilizatori
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, abonamente: [...(user.abonamente || []), abonament] } : user,
        ),
      )

      // Resetăm formularul și închidem dialogul
      setNewAbonament({
        tip: "Standard",
        numarSedinte: 8,
        pretPlatit: 200,
        dataInceput: new Date().toISOString().split("T")[0],
      })
      setIsAddAbonamentOpen(false)
    } catch (error) {
      console.error("Eroare la adăugarea abonamentului:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut adăuga abonamentul",
        variant: "destructive",
      })
    }
  }

  const handleAddToGroup = async (userId: string, grupa: string) => {
    try {
      const user = users.find((u) => u.id === userId)
      if (!user) return

      const grupe = user.grupe || []

      // Verificăm dacă utilizatorul este deja în grupă
      if (grupe.includes(grupa)) {
        toast({
          title: "Atenție",
          description: "Utilizatorul este deja în această grupă",
        })
        return
      }

      // Adăugăm grupa la lista de grupe a utilizatorului
      await updateDoc(doc(db, "users", userId), {
        grupe: [...grupe, grupa],
      })

      toast({
        title: "Succes",
        description: "Utilizatorul a fost adăugat în grupă",
      })

      // Actualizăm lista de utilizatori
      setUsers(users.map((u) => (u.id === userId ? { ...u, grupe: [...grupe, grupa] } : u)))
    } catch (error) {
      console.error("Eroare la adăugarea în grupă:", error)
      toast({
        title: "Eroare",
        description: "Nu s-a putut adăuga utilizatorul în grupă",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă utilizatorii...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionare Utilizatori</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Înapoi la panou
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="toti">Toți utilizatorii</TabsTrigger>
          <TabsTrigger value="aprobati">Aprobați</TabsTrigger>
          <TabsTrigger value="neaprobati">Neaprobați</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "toti" && "Toți utilizatorii"}
                {activeTab === "aprobati" && "Utilizatori aprobați"}
                {activeTab === "neaprobati" && "Utilizatori neaprobați"}
              </CardTitle>
              <CardDescription>
                {activeTab === "toti" && "Lista tuturor utilizatorilor înregistrați"}
                {activeTab === "aprobati" && "Utilizatori care au fost aprobați"}
                {activeTab === "neaprobati" && "Utilizatori care așteaptă aprobarea"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium">Nume</th>
                        <th className="p-3 text-left font-medium">Email</th>
                        <th className="p-3 text-left font-medium">Telefon</th>
                        <th className="p-3 text-left font-medium">Data înregistrării</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-left font-medium">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-t">
                          <td className="p-3">
                            {user.nume} {user.prenume}
                          </td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">{user.telefon}</td>
                          <td className="p-3">
                            {new Date(user.dataInregistrare.toDate()).toLocaleDateString("ro-RO")}
                          </td>
                          <td className="p-3">
                            {user.aprobat ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                <Check className="h-3 w-3 mr-1" />
                                Aprobat
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                <Clock className="h-3 w-3 mr-1" />
                                În așteptare
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              {!user.aprobat && (
                                <Button variant="outline" size="sm" onClick={() => handleApproveUser(user.id)}>
                                  Aprobă
                                </Button>
                              )}

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                    Detalii
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Detalii utilizator</DialogTitle>
                                    <DialogDescription>
                                      Informații complete despre {user.nume} {user.prenume}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                    <div>
                                      <h3 className="text-lg font-semibold mb-4">Informații personale</h3>
                                      <div className="space-y-3">
                                        <div>
                                          <p className="text-sm text-gray-500">Nume complet</p>
                                          <p className="font-medium">
                                            {user.nume} {user.prenume}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Email</p>
                                          <p className="font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Telefon</p>
                                          <p className="font-medium">{user.telefon}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Data înregistrării</p>
                                          <p className="font-medium">
                                            {new Date(user.dataInregistrare.toDate()).toLocaleDateString("ro-RO")}
                                          </p>
                                        </div>
                                        {user.dataInceputCursuri && (
                                          <div>
                                            <p className="text-sm text-gray-500">Data început cursuri</p>
                                            <p className="font-medium">
                                              {new Date(user.dataInceputCursuri.toDate()).toLocaleDateString("ro-RO")}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">Abonamente</h3>
                                        <Dialog open={isAddAbonamentOpen} onOpenChange={setIsAddAbonamentOpen}>
                                          <DialogTrigger asChild>
                                            <Button size="sm">Adaugă abonament</Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Adaugă abonament nou</DialogTitle>
                                              <DialogDescription>
                                                Completează detaliile pentru noul abonament
                                              </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-4 py-4">
                                              <div className="space-y-2">
                                                <Label htmlFor="tip">Tip abonament</Label>
                                                <Select
                                                  value={newAbonament.tip}
                                                  onValueChange={(value) =>
                                                    setNewAbonament({ ...newAbonament, tip: value })
                                                  }
                                                >
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Selectează tipul" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="Standard">Standard (8 ședințe)</SelectItem>
                                                    <SelectItem value="Premium">Premium (12 ședințe)</SelectItem>
                                                    <SelectItem value="VIP">VIP (16 ședințe)</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>

                                              <div className="space-y-2">
                                                <Label htmlFor="numarSedinte">Număr ședințe</Label>
                                                <Input
                                                  id="numarSedinte"
                                                  type="number"
                                                  value={newAbonament.numarSedinte}
                                                  onChange={(e) =>
                                                    setNewAbonament({
                                                      ...newAbonament,
                                                      numarSedinte: Number.parseInt(e.target.value),
                                                    })
                                                  }
                                                />
                                              </div>

                                              <div className="space-y-2">
                                                <Label htmlFor="pretPlatit">Preț plătit (lei)</Label>
                                                <Input
                                                  id="pretPlatit"
                                                  type="number"
                                                  value={newAbonament.pretPlatit}
                                                  onChange={(e) =>
                                                    setNewAbonament({
                                                      ...newAbonament,
                                                      pretPlatit: Number.parseInt(e.target.value),
                                                    })
                                                  }
                                                />
                                              </div>

                                              <div className="space-y-2">
                                                <Label htmlFor="dataInceput">Data început</Label>
                                                <Input
                                                  id="dataInceput"
                                                  type="date"
                                                  value={newAbonament.dataInceput}
                                                  onChange={(e) =>
                                                    setNewAbonament({
                                                      ...newAbonament,
                                                      dataInceput: e.target.value,
                                                    })
                                                  }
                                                />
                                              </div>
                                            </div>

                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setIsAddAbonamentOpen(false)}>
                                                Anulează
                                              </Button>
                                              <Button onClick={handleAddAbonament}>Adaugă abonament</Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                      </div>

                                      {user.abonamente && user.abonamente.length > 0 ? (
                                        <div className="space-y-3">
                                          {user.abonamente.map((abonament, index) => (
                                            <div key={index} className="border rounded-lg p-3">
                                              <div className="flex justify-between items-start">
                                                <div>
                                                  <h4 className="font-medium">{abonament.tip}</h4>
                                                  <p className="text-xs text-gray-500">
                                                    {new Date(abonament.dataInceput.toDate()).toLocaleDateString(
                                                      "ro-RO",
                                                    )}{" "}
                                                    -
                                                    {new Date(abonament.dataExpirare.toDate()).toLocaleDateString(
                                                      "ro-RO",
                                                    )}
                                                  </p>
                                                </div>
                                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                  {abonament.sedinteRamase} / {abonament.numarSedinte} ședințe
                                                </span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-gray-500 text-sm">Nu există abonamente</p>
                                      )}

                                      <h3 className="text-lg font-semibold mt-6 mb-4">Grupe</h3>
                                      <div className="space-y-3">
                                        {user.grupe && user.grupe.length > 0 ? (
                                          <div className="space-y-2">
                                            {user.grupe.map((grupa, index) => (
                                              <div key={index} className="border rounded-lg p-3">
                                                <p className="font-medium">{grupa}</p>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-gray-500 text-sm">Nu este înscris în nicio grupă</p>
                                        )}

                                        <div className="pt-2">
                                          <Dialog>
                                            <DialogTrigger asChild>
                                              <Button size="sm" variant="outline">
                                                Adaugă în grupă
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                              <DialogHeader>
                                                <DialogTitle>Adaugă în grupă</DialogTitle>
                                                <DialogDescription>
                                                  Selectează grupa în care dorești să adaugi utilizatorul
                                                </DialogDescription>
                                              </DialogHeader>

                                              <div className="py-4">
                                                <Select onValueChange={(value) => handleAddToGroup(user.id, value)}>
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Selectează grupa" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="Dans de societate - Începători">
                                                      Dans de societate - Începători
                                                    </SelectItem>
                                                    <SelectItem value="Dans de societate - Intermediari">
                                                      Dans de societate - Intermediari
                                                    </SelectItem>
                                                    <SelectItem value="Dans de societate - Avansați">
                                                      Dans de societate - Avansați
                                                    </SelectItem>
                                                    <SelectItem value="Salsa - Începători">
                                                      Salsa - Începători
                                                    </SelectItem>
                                                    <SelectItem value="Bachata - Începători">
                                                      Bachata - Începători
                                                    </SelectItem>
                                                    <SelectItem value="Tango Argentinian">Tango Argentinian</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există utilizatori în această categorie</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

