'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useToast } from '@/components/ui/use-toast';
import { ExcursieForm } from '@/components/admin/excursie-form';
import { ExcursiiList } from '@/components/admin/excursie-list';

// Definim interfața pentru excursie
export interface Excursie {
  id: string;
  title: string;
  date: string;
  eventDate: string;
  location?: string;
  spots?: string;
  description?: string;
  facebookLink?: string;
  imageUrl: string;
  isUpcoming: boolean;
  createdAt: number;
}

export default function ExcursiiAdmin() {
  const [excursii, setExcursii] = useState<Excursie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lista');
  const [selectedExcursie, setSelectedExcursie] = useState<Excursie | null>(
    null
  );
  const { toast } = useToast();

  // Funcție pentru a încărca excursiile
  const loadExcursii = async () => {
    setIsLoading(true);
    try {
      const excursiiCollection = collection(db, 'excursii');
      const excursiiSnapshot = await getDocs(excursiiCollection);
      const excursiiList = excursiiSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Excursie[];

      // Sortăm excursiile după data creării (cele mai recente primele)
      excursiiList.sort((a, b) => b.createdAt - a.createdAt);

      setExcursii(excursiiList);
    } catch (error) {
      console.error('Eroare la încărcarea excursiilor:', error);
      toast({
        title: 'Eroare',
        description: 'Nu s-au putut încărca excursiile. Încearcă din nou.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Încărcăm excursiile la încărcarea paginii
  useEffect(() => {
    loadExcursii();
  }, []);

  // Funcție pentru a gestiona editarea unei excursii
  const handleEditExcursie = (excursie: Excursie) => {
    setSelectedExcursie(excursie);
    setActiveTab('adauga');
  };

  // Funcție pentru a gestiona adăugarea cu succes a unei excursii
  const handleAddSuccess = () => {
    setSelectedExcursie(null);
    setActiveTab('lista');
    loadExcursii();
    toast({
      title: 'Succes',
      description: 'Excursia a fost salvată cu succes.',
    });
  };

  // Funcție pentru a gestiona ștergerea cu succes a unei excursii
  const handleDeleteSuccess = () => {
    loadExcursii();
    toast({
      title: 'Succes',
      description: 'Excursia a fost ștearsă cu succes.',
    });
  };

  // Funcție pentru a anula editarea
  const handleCancel = () => {
    setSelectedExcursie(null);
    setActiveTab('lista');
  };

  // Funcție pentru a adăuga o nouă excursie
  const handleAddNew = () => {
    setSelectedExcursie(null);
    setActiveTab('adauga');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă excursiile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionare Excursii</h1>
        {activeTab === 'lista' && (
          <Button
            onClick={handleAddNew}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adaugă Excursie
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista Excursii</TabsTrigger>
          <TabsTrigger value="adauga">
            {selectedExcursie ? 'Editează Excursie' : 'Adaugă Excursie'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="mt-6">
          <ExcursiiList
            excursii={excursii}
            onEdit={handleEditExcursie}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </TabsContent>

        <TabsContent value="adauga" className="mt-6">
          <ExcursieForm
            excursie={selectedExcursie}
            onSuccess={handleAddSuccess}
            onCancel={handleCancel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
