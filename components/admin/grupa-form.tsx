"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Grupa } from "@/app/admin/page"

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
  })

  // Stare pentru a urmări dacă formularul este în curs de trimitere
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populează formularul cu datele inițiale dacă sunt disponibile
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
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

  // Gestionează trimiterea formularului
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Trimite datele către componenta părinte
    onSubmit({
      ...formData,
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
      })
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
          <Label htmlFor="program">Program *</Label>
          <Input
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            placeholder="ex: Luni și Miercuri, 18:00 - 19:30"
            required
          />
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
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? "Actualizează grupa" : "Adaugă grupa"}
        </Button>
      </div>
    </form>
  )
}

