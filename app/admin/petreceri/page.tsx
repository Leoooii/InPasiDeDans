'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import PetrecereForm from '@/components/admin/petrecere-form';
import PetreceriList from '@/components/admin/petreceri-list';

// Definim interfața pentru petrecere
export interface Petrecere {
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

export default function PetreceriAdmin() {
  const [petreceri, setPetreceri] = useState<Petrecere[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPetrecere, setSelectedPetrecere] = useState<Petrecere | null>(
    null
  );
  const [activeTab, setActiveTab] = useState('lista');

  // Încărcăm petrecerile din API
  const loadPetreceri = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/petreceri', {
        cache: 'no-store', // Dezactivăm cache-ul pentru a obține datele cele mai recente
      });
      if (!response.ok) {
        throw new Error('Eroare la încărcarea petrecerilor');
      }
      const data = await response.json();
      setPetreceri(data);
      // console.log(data);
    } catch (error) {
      console.error('Eroare:', error);
      toast({
        title: 'Eroare',
        description: 'Nu s-au putut încărca petrecerile. Încercați din nou.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Încărcăm petrecerile la montarea componentei
  useEffect(() => {
    loadPetreceri();
  }, []);

  // Handler pentru editarea unei petreceri
  const handleEditPetrecere = (petrecere: Petrecere) => {
    setSelectedPetrecere(petrecere);
    setActiveTab('adauga');
  };

  // Handler pentru adăugarea/editarea cu succes a unei petreceri
  const handleAddSuccess = () => {
    loadPetreceri();
    setSelectedPetrecere(null);
    setActiveTab('lista');
    toast({
      title: 'Succes',
      description: 'Petrecerea a fost salvată cu succes.',
    });
  };

  // Handler pentru ștergerea cu succes a unei petreceri
  const handleDeleteSuccess = () => {
    loadPetreceri();
    toast({
      title: 'Succes',
      description: 'Petrecerea a fost ștearsă cu succes.',
    });
  };

  // Handler pentru anularea editării
  const handleCancel = () => {
    setSelectedPetrecere(null);
    setActiveTab('lista');
  };

  // Afișăm un indicator de încărcare
  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă petrecerile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Administrare Petreceri</h1>
        <p className="text-gray-500">
          Adaugă, editează sau șterge petrecerile organizate de școala de dans.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="lista">Listă Petreceri</TabsTrigger>
            <TabsTrigger value="adauga">
              {selectedPetrecere ? 'Editează Petrecere' : 'Adaugă Petrecere'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lista" className="mt-6">
            <PetreceriList
              petreceri={petreceri}
              onEdit={handleEditPetrecere}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </TabsContent>

          <TabsContent value="adauga" className="mt-6">
            <PetrecereForm
              petrecere={selectedPetrecere}
              onSuccess={handleAddSuccess}
              onCancel={handleCancel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
