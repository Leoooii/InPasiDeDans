'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import EvenimentForm from '@/components/admin/eveniment-form';
import EvenimenteList from '@/components/admin/evenimente-list';

export type Eveniment = {
  id: string;
  date: Date | string;
  eventDate?: Date | string;
  title?: string;
  description?: string;
  link?: string;
  imageUrl?: string;
};

export default function EvenimentePage() {
  const [loading, setLoading] = useState(true);
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Eveniment | null>(null);
  const [activeTab, setActiveTab] = useState('lista');
  const { toast } = useToast();

  useEffect(() => {
    fetchEvenimente();
  }, []);

  const fetchEvenimente = async () => {
    setLoading(true);
    try {
      const evenimenteRef = collection(db, 'evenimente');
      const q = query(evenimenteRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);

      const evenimenteData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date?.toDate() || new Date(),
          eventDate: data.eventDate?.toDate() || null,
          title: data.title || '',
          description: data.description || '',
          link: data.link || '',
          imageUrl: data.imageUrl || '',
        } as Eveniment;
      });

      setEvenimente(evenimenteData);
    } catch (error) {
      console.error('Eroare la încărcarea evenimentelor:', error);
      toast({
        title: 'Eroare',
        description: 'Nu s-au putut încărca evenimentele. Încercați din nou.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = (eveniment: Eveniment) => {
    setSelectedEvent(eveniment);
    setActiveTab('adauga');
  };

  const handleAddSuccess = () => {
    setSelectedEvent(null);
    setActiveTab('lista');
    fetchEvenimente();
    toast({
      title: 'Succes',
      description: 'Evenimentul a fost salvat cu succes.',
    });
  };

  const handleDeleteSuccess = () => {
    fetchEvenimente();
    toast({
      title: 'Succes',
      description: 'Evenimentul a fost șters cu succes.',
    });
  };

  const handleCancel = () => {
    setSelectedEvent(null);
    setActiveTab('lista');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionare Evenimente</h1>
        {activeTab === 'lista' && (
          <Button
            onClick={() => setActiveTab('adauga')}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Adaugă Eveniment
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="lista">Listă Evenimente</TabsTrigger>
          <TabsTrigger value="adauga">
            {selectedEvent ? 'Editează Eveniment' : 'Adaugă Eveniment'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="mt-6">
          <EvenimenteList
            evenimente={evenimente}
            onEdit={handleEditEvent}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </TabsContent>

        <TabsContent value="adauga" className="mt-6">
          <EvenimentForm
            eveniment={selectedEvent}
            onSuccess={handleAddSuccess}
            onCancel={handleCancel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
