"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { ImagineData } from "./imagine-form"
import { Badge } from "@/components/ui/badge"

type ImaginiListProps = {
  imagini: ImagineData[]
  onEdit: (imagine: ImagineData) => void
  onDelete: (id: string) => void
  onView?: (imagine: ImagineData) => void
}

export default function ImaginiList({ imagini, onEdit, onDelete, onView }: ImaginiListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setShowDeleteDialog(false)
      setDeleteId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setDeleteId(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "cursuri":
        return { label: "Cursuri", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" }
      case "evenimente":
        return { label: "Evenimente", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
      case "spectacole":
        return { label: "Spectacole", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" }
      default:
        return { label: "Toate", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" }
    }
  }

  if (imagini.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nu există imagini în galerie</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imagini.map((imagine) => {
          const category = getCategoryLabel(imagine.categorie)

          return (
            <Card key={imagine.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={imagine.url || "/placeholder.svg"}
                  alt={imagine.titlu}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${category.color}`}>{category.label}</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">{imagine.titlu}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 h-10">{imagine.descriere}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {imagine.dataAdaugare && formatDate(imagine.dataAdaugare)}
                  </span>
                  <div className="flex space-x-1">
                    {onView && (
                      <Button variant="ghost" size="icon" onClick={() => onView(imagine)} title="Vizualizează">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => onEdit(imagine)} title="Editează">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(imagine.id!)} title="Șterge">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune va șterge definitiv imaginea din galerie și nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

