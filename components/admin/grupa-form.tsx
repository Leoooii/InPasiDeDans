"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Grupa } from "@/app/admin/page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface GrupaFormProps {
  onSubmit: (grupa: Grupa) => void
  initialData?: Grupa
  onCancel?: () => void
}

/**
 * Formular pentru adăugarea sau editarea unei grupe
 *
 * @param onSubmit - Funcție apelată la trimiterea formularului
 * @param initialData - Date inițiale pentru editare (opțional)
 * @param onCancel - Funcție apelată la anularea editării (opțional)
 */
export default function GrupaForm({ onSubmit, initialData, onCancel }: GrupaFormProps) {
  // Starea formularului
  const [formData, setFormData] = useState<Grupa>({
    titlu: "",
    descriere: "",
    dataStart: "",
    program: "",
    instructor: "",
    locuriDisponibile: 0,
    locuriTotale: 0,
    stiluri: [], // Doar array-ul de stiluri
    zile: ["Luni", "Miercuri"],
  })

  // Stare pentru a urmări dacă formularul este în curs de trimitere
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Stare pentru ora selectată
  const [oraSelectata, setOraSelectata] = useState("18:30 - 19:45")

  // Stare pentru tipul de orar (predefinit sau personalizat)
  const [tipOrar, setTipOrar] = useState<"predefinit" | "personalizat">("predefinit")

  // Stare pentru ora personalizată
  const [oraPersonalizata, setOraPersonalizata] = useState("")

  // Stare pentru vizibilitatea grupei (publică sau privată)
  const [isPublic, setIsPublic] = useState(true)

  // Populează formularul cu datele inițiale dacă sunt disponibile
  useEffect(() => {
    if (initialData) {
      // Verificăm dacă avem stiluri multiple sau un singur stil
      const stiluri = initialData.stiluri || []

      setFormData({
        ...initialData,
        stiluri: stiluri,
      })

      // Setăm vizibilitatea grupei
      setIsPublic(initialData.publica !== undefined ? initialData.publica : true)

      // Extragem ora din program dacă există
      const oraParts = initialData.program.split(",")
      if (oraParts.length > 0) {
        const ultimaParte = oraParts[oraParts.length - 1].trim()
        if (ultimaParte.includes(":")) {
          // Verificăm dacă ora este una dintre cele predefinite
          const orePredefinite = ["18:30 - 19:45", "19:45 - 21:00", "21:00 - 22:15"]
          if (orePredefinite.includes(ultimaParte)) {
            setOraSelectata(ultimaParte)
            setTipOrar("predefinit")
          } else {
            setOraPersonalizata(ultimaParte)
            setTipOrar("personalizat")
          }
        }
      }
    }
  }, [initialData])

  // Gestionează modificările în câmpurile formularului
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Pentru câmpurile numerice, convertim valoarea la număr
    if (name === "locuriDisponibile" || name === "locuriTotale") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number.parseInt(value) || 0,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Gestionează modificările în câmpurile de tip select
  const handleSelectChange = (name: string, value: string) => {
    if (name === "ora") {
      setOraSelectata(value)
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Gestionează adăugarea unui stil
  const handleAddStil = (stil: string) => {
    if (!formData.stiluri.includes(stil)) {
      setFormData((prev) => ({
        ...prev,
        stiluri: [...prev.stiluri, stil],
      }))
    }
  }

  // Gestionează eliminarea unui stil
  const handleRemoveStil = (stil: string) => {
    setFormData((prev) => ({
      ...prev,
      stiluri: prev.stiluri.filter((s) => s !== stil),
    }))
  }

  // Gestionează modificările în câmpurile de tip checkbox pentru zile
  const handleZileChange = (zi: string) => {
    setFormData((prev) => {
      const zile = [...prev.zile]

      if (zile.includes(zi)) {
        return { ...prev, zile: zile.filter((z) => z !== zi) }
      } else {
        return { ...prev, zile: [...zile, zi] }
      }
    })
  }

  // Gestionează trimiterea formularului
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Verificăm dacă avem cel puțin o zi selectată
    if (formData.zile.length === 0) {
      alert("Trebuie să selectezi cel puțin o zi pentru grupă")
      return
    }

    // Verificăm dacă avem cel puțin un stil selectat
    if (formData.stiluri.length === 0) {
      alert("Trebuie să selectezi cel puțin un stil de dans pentru grupă")
      return
    }

    setIsSubmitting(true)

    // Determinăm ora finală în funcție de tipul de orar
    const oraFinala = tipOrar === "predefinit" ? oraSelectata : oraPersonalizata

    // Actualizăm programul bazat pe zilele selectate și ora
    const programActualizat = `${formData.zile.join(", ")}, ${oraFinala}`

    // Trimite datele către componenta părinte
    onSubmit({
      ...formData,
      program: programActualizat,
      publica: isPublic, // Adăugăm proprietatea publica
      // Păstrează ID-ul dacă există (pentru editare)
      id: initialData?.id,
    })

    // Dacă nu este în modul de editare, resetează formularul
    if (!initialData) {
      setFormData({
        titlu: "",
        descriere: "",
        dataStart: "",
        program: "",
        instructor: "",
        locuriDisponibile: 0,
        locuriTotale: 0,
        stiluri: [],
        zile: ["Luni", "Miercuri"],
      })
      setOraSelectata("18:30 - 19:45")
      setTipOrar("predefinit")
      setOraPersonalizata("")
      setIsPublic(true)
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titlu">Titlu grupă *</Label>
        <Input
          id="titlu"
          name="titlu"
          value={formData.titlu}
          onChange={handleChange}
          placeholder="ex: Dans de Societate - Începători"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriere">Descriere *</Label>
        <Textarea
          id="descriere"
          name="descriere"
          value={formData.descriere}
          onChange={handleChange}
          placeholder="Descriere scurtă a grupei"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Stiluri dans *</Label>
        <Select onValueChange={(value) => handleAddStil(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Adaugă stiluri de dans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dans de societate">Dans de societate</SelectItem>
            <SelectItem value="Dans standard">Dans standard</SelectItem>
            <SelectItem value="Dans latino">Dans latino</SelectItem>
            <SelectItem value="Dansuri populare">Dansuri populare</SelectItem>
            <SelectItem value="Salsa">Salsa</SelectItem>
            <SelectItem value="Bachata">Bachata</SelectItem>
            <SelectItem value="Tango">Tango</SelectItem>
            <SelectItem value="Vals">Vals</SelectItem>
          </SelectContent>
        </Select>

        {/* Afișăm stilurile selectate */}
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.stiluri.map((stil) => (
            <Badge key={stil} className="flex items-center gap-1 px-3 py-1">
              {stil}
              <button type="button" onClick={() => handleRemoveStil(stil)} className="ml-1 text-xs hover:text-red-500">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {formData.stiluri.length === 0 && <p className="text-sm text-gray-500">Niciun stil selectat</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Zile *</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"].map((zi) => (
            <div key={zi} className="flex items-center space-x-2">
              <Checkbox
                id={`zi-${zi}`}
                checked={formData.zile.includes(zi)}
                onCheckedChange={() => handleZileChange(zi)}
              />
              <Label htmlFor={`zi-${zi}`} className="cursor-pointer">
                {zi}
              </Label>
            </div>
          ))}
        </div>
        {formData.zile.length === 0 && <p className="text-sm text-red-500">Trebuie să selectezi cel puțin o zi</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataStart">Data de start *</Label>
          <Input
            id="dataStart"
            name="dataStart"
            type="date"
            value={formData.dataStart}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Interval orar *</Label>
          <RadioGroup value={tipOrar} onValueChange={(value) => setTipOrar(value as "predefinit" | "personalizat")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="predefinit" id="predefinit" />
              <Label htmlFor="predefinit">Interval predefinit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="personalizat" id="personalizat" />
              <Label htmlFor="personalizat">Interval personalizat</Label>
            </div>
          </RadioGroup>

          {tipOrar === "predefinit" ? (
            <Select value={oraSelectata} onValueChange={(value) => handleSelectChange("ora", value)}>
              <SelectTrigger id="ora">
                <SelectValue placeholder="Selectează ora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18:30 - 19:45">18:30 - 19:45</SelectItem>
                <SelectItem value="19:45 - 21:00">19:45 - 21:00</SelectItem>
                <SelectItem value="21:00 - 22:15">21:00 - 22:15</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="oraPersonalizata"
              placeholder="ex: 17:00 - 18:30"
              value={oraPersonalizata}
              onChange={(e) => setOraPersonalizata(e.target.value)}
              required={tipOrar === "personalizat"}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructor">Instructor *</Label>
        <Input
          id="instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          placeholder="ex: Alexandru și Maria"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="locuriDisponibile">Locuri disponibile *</Label>
          <Input
            id="locuriDisponibile"
            name="locuriDisponibile"
            type="number"
            min="0"
            value={formData.locuriDisponibile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="locuriTotale">Locuri totale *</Label>
          <Input
            id="locuriTotale"
            name="locuriTotale"
            type="number"
            min="1"
            value={formData.locuriTotale}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Adăugăm opțiunea pentru vizibilitatea grupei */}
      <div className="flex items-center space-x-2 pt-4">
        <Switch id="publica" checked={isPublic} onCheckedChange={setIsPublic} />
        <Label htmlFor="publica" className="cursor-pointer">
          Grupă publică (vizibilă pe pagina de grupe în formare)
        </Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || formData.zile.length === 0 || formData.stiluri.length === 0}>
          {initialData ? "Actualizează grupa" : "Adaugă grupa"}
        </Button>
      </div>
    </form>
  )
}

