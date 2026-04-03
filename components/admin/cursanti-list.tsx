'use client';

import { useState } from 'react';
import Link from 'next/link';
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
import { Pencil, Trash2, Loader2, Eye } from 'lucide-react';
import type { Cursant } from '@/app/admin/cursanti/page';

interface CursantiListProps {
  cursanti: Cursant[];
  onEdit: (cursant: Cursant) => void;
  onDeleteSuccess: () => void;
}

export default function CursantiList({ cursanti, onEdit, onDeleteSuccess }: CursantiListProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/cursanti/${deleteId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Eroare la ștergere');
      onDeleteSuccess();
    } catch (error) {
      console.error('Eroare:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nume</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cursanti.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  Nu există cursanți. Adăugați primul cursant.
                </TableCell>
              </TableRow>
            ) : (
              cursanti.map((cursant, index) => (
                <TableRow key={cursant.id}>
                  <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="font-medium">{cursant.nume}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/cursanti/${cursant.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Vezi profil</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => onEdit(cursant)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editează</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(cursant.id)}>
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
              Această acțiune nu poate fi anulată. Cursantul va fi șters permanent.
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
