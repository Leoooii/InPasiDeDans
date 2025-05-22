'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import InstructorForm from '@/components/admin/instructor-form';
import InstructoriList from '@/components/admin/instructori-list';

// Definim interfața pentru instructor
export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  order?: number;
  createdAt: number;
}

export default function InstructoriPage() {
  const [activeTab, setActiveTab] = useState('lista');
  const [instructori, setInstructori] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const { toast } = useToast();

  // Funcție pentru a încărca instructorii
  const fetchInstructori = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/instructori');
      if (!response.ok) {
        throw new Error('Eroare la încărcarea instructorilor');
      }
      const data = await response.json();
      setInstructori(data);
    } catch (error) {
      console.error('Eroare:', error);
      toast({
        title: 'Eroare',
        description: 'Nu s-au putut încărca instructorii. Încercați din nou.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Încărcăm instructorii la încărcarea paginii
  useEffect(() => {
    fetchInstructori();
  }, []);

  // Funcție pentru a gestiona editarea unui instructor
  const handleEditInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setActiveTab('adauga');
  };

  // Funcție pentru a gestiona adăugarea cu succes a unui instructor
  const handleAddSuccess = () => {
    setSelectedInstructor(null);
    setActiveTab('lista');
    fetchInstructori();
    toast({
      title: 'Succes',
      description: 'Instructorul a fost salvat cu succes.',
    });
  };

  // Funcție pentru a gestiona ștergerea cu succes a unui instructor
  const handleDeleteSuccess = () => {
    fetchInstructori();
    toast({
      title: 'Succes',
      description: 'Instructorul a fost șters cu succes.',
    });
  };

  // Funcție pentru a anula editarea
  const handleCancel = () => {
    setSelectedInstructor(null);
    setActiveTab('lista');
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionare Instructori</h1>
        {activeTab === 'lista' && (
          <Button onClick={() => setActiveTab('adauga')}>
            Adaugă Instructor
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista Instructori</TabsTrigger>
          <TabsTrigger value="adauga">
            {selectedInstructor ? 'Editează Instructor' : 'Adaugă Instructor'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <InstructoriList
              instructori={instructori}
              onEdit={handleEditInstructor}
              onDeleteSuccess={handleDeleteSuccess}
            />
          )}
        </TabsContent>

        <TabsContent value="adauga" className="mt-6">
          <InstructorForm
            instructor={selectedInstructor}
            onSuccess={handleAddSuccess}
            onCancel={handleCancel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
