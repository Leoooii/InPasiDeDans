'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import type { Instructor } from '@/app/admin/instructori/page';

interface InstructoriListProps {
  instructori: Instructor[];
  onEdit: (instructor: Instructor) => void;
  onDeleteSuccess: () => void;
}

export default function InstructoriList({
  instructori,
  onEdit,
  onDeleteSuccess,
}: InstructoriListProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Funcție pentru a deschide dialogul de confirmare pentru ștergere
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  // Funcție pentru a șterge un instructor
  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/instructori/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Eroare la ștergerea instructorului');
      }

      onDeleteSuccess();
    } catch (error) {
      console.error('Eroare:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  // Sortăm instructorii după ordinea de afișare
  const sortedInstructori = [...instructori].sort((a, b) => {
    const orderA = a.order || 0;
    const orderB = b.order || 0;
    return orderA - orderB;
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagine</TableHead>
              <TableHead>Nume</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="w-[100px]">Ordine</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInstructori.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nu există instructori. Adăugați primul instructor.
                </TableCell>
              </TableRow>
            ) : (
              sortedInstructori.map(instructor => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      {instructor.imageUrl ? (
                        <Image
                          src={instructor.imageUrl || '/placeholder.svg'}
                          alt={instructor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">N/A</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {instructor.name}
                  </TableCell>
                  <TableCell>{instructor.role}</TableCell>
                  <TableCell>{instructor.order || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(instructor)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editează</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteClick(instructor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Șterge</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune nu poate fi anulată. Instructorul va fi șters
              permanent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
