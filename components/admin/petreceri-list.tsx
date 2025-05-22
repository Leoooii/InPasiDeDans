'use client';

import { useState } from 'react';
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// Interfața pentru petrecere
interface Petrecere {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  facebookLink: string;
  imageUrl: string;
  isUpcoming: boolean;
  badge?: string;
  createdAt: number;
}

// Interfața pentru props
interface PetreceriListProps {
  petreceri: Petrecere[];
  onEdit: (petrecere: Petrecere) => void;
  onDeleteSuccess: () => void;
}

export default function PetreceriList({
  petreceri,
  onEdit,
  onDeleteSuccess,
}: PetreceriListProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [petrecereToDelete, setPetrecereToDelete] = useState<string | null>(
    null
  );

  // Funcție pentru ștergerea unei petreceri
  const deletePetrecere = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/petreceri/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || 'A apărut o eroare la ștergerea petrecerii'
        );
      }

      onDeleteSuccess();
    } catch (error: any) {
      console.error('Eroare:', error);
      toast({
        title: 'Eroare',
        description:
          error.message || 'A apărut o eroare la ștergerea petrecerii',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setPetrecereToDelete(null);
    }
  };

  // Sortăm petrecerile: mai întâi cele viitoare, apoi după data creării (cele mai recente primele)
  const sortedPetreceri = [...petreceri].sort((a, b) => {
    if (a.isUpcoming !== b.isUpcoming) {
      return a.isUpcoming ? -1 : 1;
    }
    return b.createdAt - a.createdAt;
  });

  // Dacă nu există petreceri
  if (sortedPetreceri.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          Nu există petreceri. Adăugați prima petrecere folosind tab-ul "Adaugă
          Petrecere".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagine</TableHead>
              <TableHead>Titlu</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPetreceri.map(petrecere => (
              <TableRow key={petrecere.id}>
                <TableCell>
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src={petrecere.imageUrl || '/placeholder.svg'}
                      alt={petrecere.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{petrecere.title}</TableCell>
                <TableCell>{petrecere.date}</TableCell>
                <TableCell>
                  {petrecere.isUpcoming ? (
                    <Badge
                      variant="default"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Viitoare
                    </Badge>
                  ) : (
                    <Badge variant="outline">Anterioară</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        window.open(petrecere.facebookLink, '_blank')
                      }
                      title="Deschide link Facebook"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(petrecere)}
                      title="Editează petrecerea"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          title="Șterge petrecerea"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Această acțiune va șterge definitiv petrecerea "
                            {petrecere.title}". Această acțiune nu poate fi
                            anulată.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Anulează</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deletePetrecere(petrecere.id)}
                            className="bg-red-500 hover:bg-red-600"
                            disabled={
                              isDeleting && petrecereToDelete === petrecere.id
                            }
                          >
                            {isDeleting &&
                              petrecereToDelete === petrecere.id && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                            Șterge
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
