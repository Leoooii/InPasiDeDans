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
    stil: "Dans de societate",
    zile: ["Luni", "Miercuri"],
  })

  // Stare pentru a urmări dacă formularul este în curs de trimitere
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Stare pentru ora selectată
  const [oraSelectata, setOraSelectata] = useState("19:00 - 20:30")

  // Populează formularul cu datele inițiale dacă sunt disponibile
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)

      // Extragem ora din program dacă există
      const oraParts = initialData.program.split(",")
      if (oraParts.length > 0) {
        const ultimaParte = oraParts[oraParts.length - 1].trim()
        if (ultimaParte.includes(":")) {
          setOraSelectata(ultimaParte)
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

    setIsSubmitting(true)

    // Actualizăm programul bazat pe zilele selectate și ora
    const programActualizat = `${formData.zile.join(", ")}, ${oraSelectata}`

    // Trimite datele către componenta părinte
    onSubmit({
      ...formData,
      program: programActualizat,
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
        stil: "Dans de societate",
        zile: ["Luni", "Miercuri"],
      })
      setOraSelectata("19:00 - 20:30")
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
        <Label htmlFor="stil">Stil dans *</Label>
        <Select value={formData.stil} onValueChange={(value) => handleSelectChange("stil", value)}>
          <SelectTrigger id="stil">
            <SelectValue placeholder="Selectează stilul de dans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dans de societate">Dans de societate</SelectItem>
            <SelectItem value="Salsa">Salsa</SelectItem>
            <SelectItem value="Bachata">Bachata</SelectItem>
            <SelectItem value="Tango">Tango</SelectItem>
          </SelectContent>
        </Select>
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
          <Label htmlFor="ora">Ora *</Label>
          <Select value={oraSelectata} onValueChange={(value) => handleSelectChange("ora", value)}>
            <SelectTrigger id="ora">
              <SelectValue placeholder="Selectează ora" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="19:00 - 20:30">19:00 - 20:30</SelectItem>
              <SelectItem value="20:30 - 22:00">20:30 - 22:00</SelectItem>
            </SelectContent>
          </Select>
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

      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || formData.zile.length === 0}>
          {initialData ? "Actualizează grupa" : "Adaugă grupa"}
        </Button>
      </div>
    </form>
  )
}

