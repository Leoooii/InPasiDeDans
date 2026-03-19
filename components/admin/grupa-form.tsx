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
function extractOra(program: string): string {
  const parts = program.split(",")
  if (parts.length > 0) {
    const last = parts[parts.length - 1].trim()
    if (last.includes(":")) return last
  }
  return "18:30 - 19:45"
}

const TIME_CHIPS = [
  "17:30 - 18:30",
  "18:30 - 19:30",
  "18:30 - 19:45",
  "19:45 - 20:45",
  "19:45 - 21:00",
  "21:00 - 22:00",
  "21:00 - 22:15",
]

export default function GrupaForm({ onSubmit, initialData, onCancel }: GrupaFormProps) {
  // Inițializare directă din initialData — fix pentru Select nivel
  const [formData, setFormData] = useState<Grupa>(() =>
    initialData
      ? { ...initialData, stiluri: initialData.stiluri || [], nivel: initialData.nivel ?? "", sala: initialData.sala ?? "" }
      : { titlu: "", descriere: "", dataStart: "", program: "", instructor: "", locuriDisponibile: 0, locuriTotale: 0, stiluri: [], zile: ["Luni", "Miercuri"], nivel: "", sala: "" }
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [oraValue, setOraValue] = useState(() => initialData ? extractOra(initialData.program) : "18:30 - 19:45")
  const [isPublic, setIsPublic] = useState(() => initialData?.publica !== undefined ? initialData.publica : true)

  // Sincronizare dacă initialData se schimbă după montare (redundant cu key, dar sigur)
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, stiluri: initialData.stiluri || [], nivel: initialData.nivel ?? "", sala: initialData.sala ?? "" })
      setOraValue(extractOra(initialData.program))
      setIsPublic(initialData.publica !== undefined ? initialData.publica : true)
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

    // Determinăm ora finală
    const oraFinala = oraValue

    // Actualizăm programul bazat pe zilele selectate și ora
    const programActualizat = `${formData.zile.join(", ")}, ${oraFinala}`

    // Trimite datele către componenta părinte
    onSubmit({
      ...formData,
      instructor: formData.instructor.trim(),
      program: programActualizat,
      publica: isPublic,
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
        nivel: "",
        sala: "",
      })
      setOraValue("18:30 - 19:45")
      setIsPublic(true)
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">

      {/* ── Rând 1: Titlu full-width ───────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label htmlFor="titlu" className="text-sm font-medium text-slate-700">Titlu grupă *</Label>
        <Input
          id="titlu" name="titlu" value={formData.titlu} onChange={handleChange}
          placeholder="ex: Dans de Societate — Începători" required
          className="border-slate-200 focus-visible:ring-slate-400"
        />
      </div>

      {/* ── Rând 2: Descriere + Program (2 coloane) ───────────────────────── */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stânga: Descriere */}
        <div className="space-y-1.5">
          <Label htmlFor="descriere" className="text-sm font-medium text-slate-700">Descriere *</Label>
          <Textarea
            id="descriere" name="descriere" value={formData.descriere} onChange={handleChange}
            placeholder="Descriere scurtă a grupei" required rows={4}
            className="resize-none border-slate-200 focus-visible:ring-slate-400 h-full min-h-[120px]"
          />
        </div>

        {/* Dreapta: Zile + Oră + Dată */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">Zile *</Label>
            <div className="flex flex-wrap gap-1.5">
              {["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"].map((zi) => {
                const active = formData.zile.includes(zi)
                return (
                  <button key={zi} type="button" onClick={() => handleZileChange(zi)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >{zi}</button>
                )
              })}
            </div>
            {formData.zile.length === 0 && <p className="text-xs text-red-500">Trebuie să selectezi cel puțin o zi</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">Interval orar *</Label>
            <div className="flex flex-wrap gap-1.5">
              {TIME_CHIPS.map((chip) => (
                <button key={chip} type="button" onClick={() => setOraValue(chip)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    oraValue === chip ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >{chip}</button>
              ))}
            </div>
            <Input value={oraValue} onChange={(e) => setOraValue(e.target.value)}
              placeholder="ex: 17:00 - 18:30"
              className="mt-1 border-slate-200 focus-visible:ring-slate-400 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dataStart" className="text-sm font-medium text-slate-700">Data de start *</Label>
            <Input id="dataStart" name="dataStart" type="date" value={formData.dataStart}
              onChange={handleChange} required className="border-slate-200 focus-visible:ring-slate-400 w-fit"
            />
          </div>
        </div>
      </div>

      {/* ── Rând 3: Instructor + Nivel + Sală (3 coloane) ─────────────────── */}
      <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="instructor" className="text-sm font-medium text-slate-700">Instructor *</Label>
          <Input id="instructor" name="instructor" value={formData.instructor} onChange={handleChange}
            placeholder="ex: Alexandra" required className="border-slate-200 focus-visible:ring-slate-400"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">Nivel</Label>
          <Select value={formData.nivel || ""} onValueChange={(v) => setFormData(prev => ({ ...prev, nivel: v }))}>
            <SelectTrigger className="border-slate-200"><SelectValue placeholder="Selectează nivelul" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Începători">Începători</SelectItem>
              <SelectItem value="Începători 2">Începători 2</SelectItem>
              <SelectItem value="Începători 3">Începători 3</SelectItem>
              <SelectItem value="Începători (în formare)">Începători (în formare)</SelectItem>
              <SelectItem value="Intermediari 1">Intermediari 1</SelectItem>
              <SelectItem value="Intermediari 2">Intermediari 2</SelectItem>
              <SelectItem value="Intermediari 3">Intermediari 3</SelectItem>
              <SelectItem value="Intermediari/Avansați">Intermediari/Avansați</SelectItem>
              <SelectItem value="Avansați">Avansați</SelectItem>
              <SelectItem value="Avansați 1">Avansați 1</SelectItem>
              <SelectItem value="Avansați 2">Avansați 2</SelectItem>
              <SelectItem value="Avansați 3">Avansați 3</SelectItem>
              <SelectItem value="Copii Începători">Copii Începători</SelectItem>
              <SelectItem value="Copii Intermediari">Copii Intermediari</SelectItem>
              <SelectItem value="Copii Avansați">Copii Avansați</SelectItem>
              <SelectItem value="Formație">Formație</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">Sală</Label>
          <Select value={formData.sala || ""} onValueChange={(v) => setFormData(prev => ({ ...prev, sala: v }))}>
            <SelectTrigger className="border-slate-200"><SelectValue placeholder="Selectează sala" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Sala 1">Sala 1</SelectItem>
              <SelectItem value="Sala 2">Sala 2</SelectItem>
              <SelectItem value="Sala 3">Sala 3</SelectItem>
              <SelectItem value="Sala Mare">Sala Mare</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Rând 4: Stiluri + Capacitate (2 coloane) ──────────────────────── */}
      <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">Stiluri dans *</Label>
          <Select onValueChange={handleAddStil}>
            <SelectTrigger className="border-slate-200"><SelectValue placeholder="Adaugă stiluri de dans" /></SelectTrigger>
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
          <div className="flex flex-wrap gap-2 mt-2 min-h-[32px]">
            {formData.stiluri.map((stil) => (
              <Badge key={stil} className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-100">
                {stil}
                <button type="button" onClick={() => handleRemoveStil(stil)} className="ml-1 text-slate-400 hover:text-red-500 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {formData.stiluri.length === 0 && <p className="text-sm text-slate-400">Niciun stil selectat</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="locuriDisponibile" className="text-sm font-medium text-slate-700">Locuri disponibile *</Label>
              <Input id="locuriDisponibile" name="locuriDisponibile" type="number" min="0"
                value={formData.locuriDisponibile} onChange={handleChange} required
                className="border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="locuriTotale" className="text-sm font-medium text-slate-700">Locuri totale *</Label>
              <Input id="locuriTotale" name="locuriTotale" type="number" min="1"
                value={formData.locuriTotale} onChange={handleChange} required
                className="border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <Switch id="publica" checked={isPublic} onCheckedChange={setIsPublic} />
            <div>
              <Label htmlFor="publica" className="cursor-pointer text-sm font-medium text-slate-700">Grupă publică</Label>
              <p className="text-xs text-slate-400 mt-0.5">Vizibilă pe pagina de grupe în formare</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Butoane ───────────────────────────────────────────────────────── */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Anulează
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || formData.zile.length === 0 || formData.stiluri.length === 0}
          className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-medium px-8"
        >
          {initialData ? "Actualizează grupa" : "Adaugă grupa"}
        </Button>
      </div>
    </form>
  )
}
