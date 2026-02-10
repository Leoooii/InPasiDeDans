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
import { buildGrupaSlug, cn } from '@/lib/utils';

type GrupeInFormareSectionProps = {
  variant?: 'default' | 'homepage';
  limit?: number;
};

const GrupeInFormareSection = ({ variant = 'default', limit }: GrupeInFormareSectionProps) => {
  const [grupe, setGrupe] = useState<Grupa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isHomepage = variant === 'homepage';
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
  const formatProgram = (str: string) => {
    const parti = str.split(', ');
    if (parti.length < 2) {
      return `${parti[0]}  `;
    } else if (parti.length === 2) {
      return `${parti[0]} ${parti[1]} `;
    }
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

  const displayedGrupe =
    typeof limit === 'number' && limit > 0 ? grupe.slice(0, limit) : grupe;

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className={cn('mt-4', isHomepage ? 'text-slate-600' : 'text-white/90')}>
            Se încarcă grupele în formare...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {displayedGrupe.length === 0 ? (
        <div className="text-center py-12">
          <p className={cn('text-xl', isHomepage ? 'text-slate-600' : 'text-white/90')}>
            Nu există grupe în formare momentan.
          </p>
          <p className={cn('mt-2', isHomepage ? 'text-slate-500' : 'text-white/70')}>
            Vă rugăm să reveniți mai târziu.
          </p>
        </div>
      ) : (
        <div
          className={cn(
            'grid',
            isHomepage
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16'
          )}
        >
          {displayedGrupe.map(grupa => (
            <Card
              key={grupa.id}
              role="link"
              onClick={() => handleViewDetails(grupa)}
              aria-label={`Detalii pentru ${grupa.titlu}`}
              className={cn(
                'overflow-hidden transition-all duration-300 hover:cursor-pointer flex flex-col justify-between',
                isHomepage
                  ? 'border border-slate-200 bg-white text-slate-900 shadow-lg hover:shadow-xl'
                  : 'border-orange-300/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl'
              )}
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle
                      className={cn('text-xl', isHomepage ? 'text-slate-900' : 'text-white')}
                    >
                      {grupa.titlu}
                    </CardTitle>
                  </div>
                  <CardDescription className={cn(isHomepage ? 'text-slate-500' : 'text-white/90')}>
                    Instructor: {grupa.instructor}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col sm:flex-row">
                  <CardContent className="space-y-4 w-full ">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {grupa.stiluri && grupa.stiluri.length > 0 ? (
                        grupa.stiluri.map((stil, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={cn(
                              isHomepage
                                ? 'bg-orange-50 border-orange-100 text-orange-700'
                                : 'bg-white/20 text-white border-white/30'
                            )}
                          >
                            {stil}
                          </Badge>
                        ))
                      ) : (
                        <Badge
                          variant="outline"
                          className={cn(
                            isHomepage
                              ? 'bg-orange-50 border-orange-100 text-orange-700'
                              : 'bg-white/20 text-white border-white/30'
                          )}
                        >
                          {grupa.stiluri && grupa.stiluri[0]
                            ? grupa.stiluri[0]
                            : 'General'}
                        </Badge>
                      )}
                    </div>

                    <p
                      className={cn(
                        'text-sm whitespace-pre-line',
                        isHomepage ? 'text-slate-600' : 'text-white/80'
                      )}
                    >
                      {grupa.descriere}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar
                          className={cn(
                            'h-4 w-4 mr-2',
                            isHomepage ? 'text-orange-500' : 'text-white/70'
                          )}
                        />
                        <span className={cn(isHomepage ? 'text-slate-700' : 'text-white/90')}>
                          Începe pe {formatDate(grupa.dataStart)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock
                          className={cn(
                            'h-4 w-4 mr-2',
                            isHomepage ? 'text-orange-500' : 'text-white/70'
                          )}
                        />
                        <span className={cn(isHomepage ? 'text-slate-700' : 'text-white/90')}>
                          {formatProgram(grupa.program)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users
                          className={cn(
                            'h-4 w-4 mr-2',
                            isHomepage ? 'text-orange-500' : 'text-white/70'
                          )}
                        />
                        <span className={cn(isHomepage ? 'text-slate-700' : 'text-white/90')}>
                          {grupa.locuriDisponibile} locuri disponibile din {grupa.locuriTotale}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className={cn(
                    'w-full',
                    isHomepage
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-primary text-white'
                  )}
                  onClick={event => {
                    event.stopPropagation();
                    grupa.id && handleInscriere(grupa.id);
                  }}
                  disabled={grupa.locuriDisponibile <= 0}
                >
                  {grupa.locuriDisponibile > 0 ? 'Înscrie-te' : 'Locuri epuizate'}
                </Button>
                <Button
                  variant={isHomepage ? 'outline' : 'secondary'}
                  className={cn(
                    'w-full',
                    isHomepage
                      ? 'border-slate-300 text-slate-900 hover:bg-slate-50'
                      : undefined
                  )}
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
