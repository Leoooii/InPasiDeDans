'use client';

import { useState } from 'react';
import type { Excursie } from '@/app/admin/excursii/page';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Edit, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

interface ExcursiiListProps {
  excursii: Excursie[];
  onEdit: (excursie: Excursie) => void;
  onDeleteSuccess: () => void;
}

export function ExcursiiList({
  excursii,
  onEdit,
  onDeleteSuccess,
}: ExcursiiListProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [excursieToDelete, setExcursieToDelete] = useState<Excursie | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Funcție pentru a deschide dialogul de confirmare a ștergerii
  const handleDeleteClick = (excursie: Excursie) => {
    setExcursieToDelete(excursie);
    setIsDeleteDialogOpen(true);
  };

  // Funcție pentru a șterge o excursie
  const handleDelete = async () => {
    if (!excursieToDelete) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'excursii', excursieToDelete.id));
      onDeleteSuccess();
    } catch (error) {
      console.error('Eroare la ștergerea excursiei:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setExcursieToDelete(null);
    }
  };

  // Funcție pentru a formata data
  const formatDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'd MMMM yyyy, HH:mm', { locale: ro });
    } catch (error) {
      return 'Data necunoscută';
    }
  };

  return (
    <div>
      {excursii.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            Nu există excursii. Adăugați prima excursie folosind butonul de mai
            sus.
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Titlu</TableHead>
                <TableHead>Data excursiei</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data adăugării</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {excursii.map(excursie => (
                <TableRow key={excursie.id}>
                  <TableCell className="font-medium">
                    {excursie.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {excursie.eventDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {excursie.isUpcoming ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Viitoare
                      </Badge>
                    ) : (
                      <Badge variant="outline">Anterioară</Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(excursie.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {excursie.facebookLink && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            window.open(excursie.facebookLink, '_blank')
                          }
                          title="Deschide link Facebook"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(excursie)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteClick(excursie)}
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Ești sigur că vrei să ștergi această excursie?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune nu poate fi anulată. Excursia va fi ștearsă
              permanent din baza de date.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Anulează
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Se șterge...' : 'Șterge'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
