'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { Loader2, Edit, Trash2, Calendar, Link2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import type { Eveniment } from '@/app/admin/evenimente/page';

interface EvenimenteListProps {
  evenimente: Eveniment[];
  onEdit: (eveniment: Eveniment) => void;
  onDeleteSuccess: () => void;
}

export default function EvenimenteList({
  evenimente,
  onEdit,
  onDeleteSuccess,
}: EvenimenteListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!selectedEventId) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'evenimente', selectedEventId));
      onDeleteSuccess();
    } catch (error) {
      console.error('Eroare la ștergerea evenimentului:', error);
      toast({
        title: 'Eroare',
        description: 'Nu s-a putut șterge evenimentul. Încercați din nou.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedEventId(id);
    setDeleteDialogOpen(true);
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return 'Nedefinit';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (evenimente.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Nu există evenimente. Adăugați primul eveniment folosind butonul de
          mai sus.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evenimente.map(eveniment => (
          <Card key={eveniment.id} className="overflow-hidden">
            {eveniment.imageUrl ? (
              <div className="relative aspect-video w-full">
                <Image
                  src={eveniment.imageUrl || '/placeholder.svg'}
                  alt={eveniment.title || 'Imagine eveniment'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-gray-200 dark:bg-gray-700 aspect-video w-full flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Fără imagine
                </span>
              </div>
            )}

            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">
                {eveniment.title || 'Eveniment fără titlu'}
              </h3>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Postat: {formatDate(eveniment.date)}</span>
              </div>

              {eveniment.eventDate && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Data eveniment: {formatDate(eveniment.eventDate)}</span>
                </div>
              )}

              {eveniment.link && (
                <div className="flex items-center text-sm text-blue-500 mb-2">
                  <Link2 className="h-4 w-4 mr-1" />
                  <a
                    href={eveniment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate"
                  >
                    {eveniment.link}
                  </a>
                </div>
              )}

              {eveniment.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                  {eveniment.description}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex justify-end space-x-2 pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(eveniment)}
              >
                <Edit className="h-4 w-4 mr-1" /> Editează
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => confirmDelete(eveniment.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Șterge
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmați ștergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteți sigur că doriți să ștergeți acest eveniment? Această
              acțiune nu poate fi anulată.
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
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
