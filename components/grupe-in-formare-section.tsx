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
import { buildGrupaSlug } from '@/lib/utils';

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
    if (parti.length < 2) {
      console.log('Program1:', parti[0]);
      return `${parti[0]}  `;
    } else if (parti.length === 2) {
      return `${parti[0]} ${parti[1]} `;
    }
    console.log('Program2:', str);
    return `${parti[0]} și ${parti[1]} ${parti[2]}`;
  };

  // Funcție pentru a naviga către pagina de înscriere
  const handleInscriere = (grupaId: string) => {
    router.push(`/inscriere?grupa=${grupaId}`);
  };

  const handleViewDetails = (grupa: Grupa) => {
    if (!grupa.id) return;
    const slug = buildGrupaSlug(grupa.titlu, grupa.id);
    router.push(`/grupe-in-formare/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-white/90">Se încarcă grupele în formare...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {grupe.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-white/90">
            Nu există grupe în formare momentan.
          </p>
          <p className="mt-2 text-white/70">Vă rugăm să reveniți mai târziu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16">
          {grupe.map(grupa => (
            <Card
              key={grupa.id}
              role="link"
              onClick={() => handleViewDetails(grupa)}
              aria-label={`Detalii pentru ${grupa.titlu}`}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:cursor-pointer flex flex-col justify-between border-orange-400 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-white">{grupa.titlu}</CardTitle>
                  </div>
                  <CardDescription className="text-white/90">
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
                            className="bg-white/20 text-white border-white/30"
                          >
                            {stil}
                          </Badge>
                        ))
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-white/20 text-white border-white/30"
                        >
                          {grupa.stiluri && grupa.stiluri[0]
                            ? grupa.stiluri[0]
                            : 'General'}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-white/80 ">{grupa.descriere}</p>

                                          <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-white/70" />
                          <span className="text-white/90">Începe pe {formatDate(grupa.dataStart)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-white/70" />
                          <span className="text-white/90">{formatProgram(grupa.program)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-white/70" />
                          <span className="text-white/90">
                            {grupa.locuriDisponibile} locuri disponibile din{' '}
                            {grupa.locuriTotale}
                          </span>
                        </div>
                      </div>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="w-full"
                  onClick={event => {
                    event.stopPropagation();
                    grupa.id && handleInscriere(grupa.id);
                  }}
                  disabled={grupa.locuriDisponibile <= 0}
                >
                  {grupa.locuriDisponibile > 0 ? 'Înscrie-te' : 'Locuri epuizate'}
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={event => {
                    event.stopPropagation();
                    handleViewDetails(grupa);
                  }}
                >
                  Află detalii
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
