'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users } from 'lucide-react';
import type { Grupa } from '@/app/admin/page';
import { useSimpleToast } from '@/components/simple-toast-provider';

const GrupeInFormareSection = () => {
  const [grupe, setGrupe] = useState<Grupa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { showToast } = useSimpleToast();
  useEffect(() => {
    const fetchGrupe = async () => {
      try {
        // Simplificăm query-ul pentru a evita eroarea de indexare
        // Folosim doar un singur filtru de egalitate
        const grupeQuery = query(
          collection(db, 'grupe'),
          where('publica', '==', true)
        );

        const querySnapshot = await getDocs(grupeQuery);

        const grupeData: Grupa[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          // Asigurăm compatibilitatea cu datele existente
          const stiluri = data.stiluri || [];

          grupeData.push({
            id: doc.id,
            ...data,
            stiluri: stiluri,
          } as Grupa);
        });

        console.log('Grupe încărcate:', grupeData.length);
        setGrupe(grupeData);
      } catch (error) {
        console.error('Eroare la încărcarea grupelor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrupe();
  }, []);

  // Funcție pentru a formata data
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data necunoscută';

    try {
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      return new Date(dateString).toLocaleDateString('ro-RO', options);
    } catch (error) {
      console.error('Eroare la formatarea datei:', error);
      return 'Data necunoscută';
    }
  };

  // Funcție pentru a formata zilele săptămânii
  const formatZile = (zile: string[]) => {
    console.log('Zile:', zile);
    if (!zile || !Array.isArray(zile) || zile.length === 0)
      return 'Zile necunoscute';

    const zileRomanesti: Record<string, string> = {
      luni: 'Luni',
      marti: 'Marți',
      miercuri: 'Miercuri',
      joi: 'Joi',
      vineri: 'Vineri',
      sambata: 'Sâmbătă',
      duminica: 'Duminică',
    };

    return zile.map(zi => zileRomanesti[zi.toLowerCase()] || zi).join(', ');
  };

  const formatProgram = (str: string) => {
    const parti = str.split(', ');
    return `${parti[0]} și ${parti[1]} ${parti[2]}`;
  };

  // Funcție pentru a naviga către pagina de înscriere
  const handleInscriere = (grupaId: string) => {
    router.push(`/inscriere?grupa=${grupaId}`);
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Se încarcă grupele în formare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {grupe.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            Nu există grupe în formare momentan.
          </p>
          <p className="mt-2 text-gray-400">Vă rugăm să reveniți mai târziu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16">
          {grupe.map(grupa => (
            <Card
              key={grupa.id}
              className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 hover:cursor-pointer flex flex-col justify-between border-orange-600"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{grupa.titlu}</CardTitle>
                  </div>
                  <CardDescription>
                    Instructor: {grupa.instructor}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col sm:flex-row">
                  <CardContent className="space-y-4 w-full ">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {grupa.stiluri && grupa.stiluri.length > 0 ? (
                        grupa.stiluri.map((stil, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-primary/10 text-primary"
                          >
                            {stil}
                          </Badge>
                        ))
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary"
                        >
                          {grupa.stiluri && grupa.stiluri[0]
                            ? grupa.stiluri[0]
                            : 'General'}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 ">{grupa.descriere}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Începe pe {formatDate(grupa.dataStart)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatProgram(grupa.program)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {grupa.locuriDisponibile} locuri disponibile din{' '}
                          {grupa.locuriTotale}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => grupa.id && handleInscriere(grupa.id)}
                  disabled={grupa.locuriDisponibile <= 0}
                >
                  {grupa.locuriDisponibile > 0
                    ? 'Înscrie-te'
                    : 'Locuri epuizate'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default GrupeInFormareSection;
