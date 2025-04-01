"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import type { Grupa } from "@/app/admin/page"

interface GrupeListProps {
  grupe: Grupa[]
  onEdit: (grupa: Grupa) => void
  onDelete: (id: string) => void
}

/**
 * Componenta pentru afișarea listei de grupe
 *
 * @param grupe - Lista de grupe de afișat
 * @param onEdit - Funcție apelată când se dorește editarea unei grupe
 * @param onDelete - Funcție apelată când se dorește ștergerea unei grupe
 */
export default function GrupeList({ grupe, onEdit, onDelete }: GrupeListProps) {
  // Stare pentru dialogul de confirmare a ștergerii
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  // ID-ul grupei care urmează să fie ștearsă
  const [grupaToDelete, setGrupaToDelete] = useState<string | null>(null)

  // Deschide dialogul de confirmare a ștergerii
  const handleDeleteClick = (id: string) => {
    setGrupaToDelete(id)
    setDeleteDialogOpen(true)
  }

  // Confirmă ștergerea grupei
  const confirmDelete = () => {
    if (grupaToDelete) {
      onDelete(grupaToDelete)
      setDeleteDialogOpen(false)
      setGrupaToDelete(null)
    }
  }

  // Formatează data pentru afișare
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ro-RO")
  }

  // Dacă nu există grupe, afișează un mesaj
  if (grupe.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nu există grupe în formare momentan.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titlu</TableHead>
              <TableHead>Data start</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Stiluri</TableHead>
              <TableHead>Locuri</TableHead>
              <TableHead>Vizibilitate</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grupe.map((grupa) => (
              <TableRow key={grupa.id}>
                <TableCell className="font-medium">{grupa.titlu}</TableCell>
                <TableCell>{formatDate(grupa.dataStart)}</TableCell>
                <TableCell>{grupa.instructor}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {grupa.stiluri && grupa.stiluri.length > 0 ? (
                      grupa.stiluri.map((stil, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                          {stil}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {grupa.locuriDisponibile} / {grupa.locuriTotale}
                </TableCell>
                <TableCell>
                  {grupa.publica !== false ? (
                    <Badge variant="outline" className="bg-green-100 text-green-700 flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Publică
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 flex items-center gap-1">
                      <EyeOff className="h-3 w-3" /> Privată
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(grupa)} title="Editează">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteClick(grupa.id!)} title="Șterge">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de confirmare pentru ștergere */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune va șterge definitiv grupa și nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

