"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { ImageIcon, Loader2 } from "lucide-react"

export type ImagineData = {
  id?: string
  titlu: string
  descriere: string
  categorie: string
  url: string
  thumbnailUrl?: string
  dataAdaugare?: string
}

type ImagineFormProps = {
  onSubmit: (imagine: ImagineData, file: File | null) => Promise<void>
  initialData?: ImagineData
  onCancel?: () => void
}

export default function ImagineForm({ onSubmit, initialData, onCancel }: ImagineFormProps) {
  const [titlu, setTitlu] = useState(initialData?.titlu || "")
  const [descriere, setDescriere] = useState(initialData?.descriere || "")
  const [categorie, setCategorie] = useState(initialData?.categorie || "toate")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.url || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Creează un URL pentru previzualizare
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)

      // Curăță URL-ul când componenta se demontează
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titlu) {
      alert("Titlul este obligatoriu")
      return
    }

    if (!file && !initialData?.url) {
      alert("Selectați o imagine")
      return
    }

    setIsSubmitting(true)

    try {
      const imagineData: ImagineData = {
        id: initialData?.id,
        titlu,
        descriere,
        categorie,
        url: initialData?.url || "",
        dataAdaugare: initialData?.dataAdaugare || new Date().toISOString(),
      }

      await onSubmit(imagineData, file)

      // Resetează formularul după trimitere
      if (!initialData) {
        setTitlu("")
        setDescriere("")
        setCategorie("toate")
        setFile(null)
        setPreviewUrl("")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    } catch (error) {
      console.error("Eroare la trimiterea formularului:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titlu">Titlu imagine *</Label>
            <Input
              id="titlu"
              value={titlu}
              onChange={(e) => setTitlu(e.target.value)}
              placeholder="Introduceți titlul imaginii"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriere">Descriere</Label>
            <Textarea
              id="descriere"
              value={descriere}
              onChange={(e) => setDescriere(e.target.value)}
              placeholder="Introduceți o descriere scurtă"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categorie">Categorie</Label>
            <Select value={categorie} onValueChange={setCategorie}>
              <SelectTrigger id="categorie">
                <SelectValue placeholder="Selectați categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toate">Toate</SelectItem>
                <SelectItem value="cursuri">Cursuri</SelectItem>
                <SelectItem value="evenimente">Evenimente</SelectItem>
                <SelectItem value="spectacole">Spectacole</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagine">Imagine {!initialData && "*"}</Label>
            <Input
              id="imagine"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="cursor-pointer"
              required={!initialData}
            />
            <p className="text-xs text-gray-500">Format acceptat: JPG, PNG, GIF. Dimensiune maximă: 5MB</p>
          </div>
        </div>

        <div>
          <Label>Previzualizare</Label>
          <Card className="mt-2 overflow-hidden aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            {previewUrl ? (
              <img src={previewUrl || "/placeholder.svg"} alt="Previzualizare" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8">
                <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Nicio imagine selectată</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Actualizează imaginea" : "Adaugă imaginea"}
        </Button>
      </div>
    </form>
  )
}

