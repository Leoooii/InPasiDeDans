'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

// Definim interfața pentru excursie
interface Excursie {
  id: string;
  title: string;
  date?: string;
  eventDate: string;
  location?: string;
  spots?: string;
  description?: string;
  facebookLink?: string;
  imageUrl: string;
  isUpcoming: boolean;
  createdAt: number;
}

export default function Excursii() {
  const [upcomingExcursii, setUpcomingExcursii] = useState<Excursie[]>([]);
  const [pastExcursii, setPastExcursii] = useState<Excursie[]>([]);

  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Excursii" }
  ];
  const [isLoading, setIsLoading] = useState(true);

  // Funcție pentru a extrage anul din data excursiei
  const extractYear = (dateString: string): number => {
    // Încercăm să extragem ultimele 4 caractere și să le convertim în număr
    const yearStr = dateString.trim().slice(-4);
    const year = Number.parseInt(yearStr, 10);

    // Verificăm dacă avem un an valid
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      return year;
    }

    // Dacă nu putem extrage anul, returnăm 0 (va fi la sfârșitul listei)
    return 0;
  };

  // Încărcăm excursiile din Firebase
  useEffect(() => {
    const loadExcursii = async () => {
      try {
        const excursiiCollection = collection(db, 'excursii');
        const excursiiSnapshot = await getDocs(excursiiCollection);
        const excursiiList = excursiiSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Excursie[];

        // Separăm excursiile viitoare de cele trecute
        const upcoming = excursiiList.filter(e => e.isUpcoming);
        const past = excursiiList.filter(e => !e.isUpcoming);

        // Sortăm excursiile viitoare după data creării (cele mai recente primele)
        upcoming.sort((a, b) => b.createdAt - a.createdAt);

        // Sortăm excursiile trecute după anul din data excursiei (cele mai recente primele)
        past.sort((a, b) => {
          const yearA = extractYear(a.eventDate);
          const yearB = extractYear(b.eventDate);

          // Sortare descrescătoare după an
          if (yearA !== yearB) {
            return yearB - yearA;
          }

          // Dacă anii sunt egali, sortăm după data creării
          return b.createdAt - a.createdAt;
        });

        setUpcomingExcursii(upcoming);
        setPastExcursii(past);
      } catch (error) {
        console.error('Eroare la încărcarea excursiilor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExcursii();
  }, []);


  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă excursiile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <SEOBreadcrumbs items={breadcrumbItems} />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Excursii În Pași de Dans
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă lumea dansului prin excursiile noastre tematice
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Călătorește și dansează</h2>
            <p>
              Excursiile noastre tematice combină pasiunea pentru dans cu
              plăcerea de a călători și descoperi locuri noi. Organizăm periodic
              excursii atât în România, cât și în străinătate, unde cursanții
              noștri au ocazia să se distreze, să danseze, să socializeze și să
              exploreze locuri deosebite într-o atmosferă relaxată și plină de
              voie bună.
            </p>
            <p>
              Aceste excursii sunt deschise atât cursanților noștri, cât și
              partenerilor sau prietenilor acestora, fiind o oportunitate
              excelentă de a socializa și de a împărtăși experiențe unice.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/excursie.png"
              alt="Excursie de dans"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {upcomingExcursii.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Următoarele excursii</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingExcursii.map(excursie => (
                <Card key={excursie.id} className="overflow-hidden">
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={excursie.imageUrl || '/placeholder.svg'}
                      alt={excursie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{excursie.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{excursie.eventDate}</span>
                      </div>
                      {excursie.location && (
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{excursie.location}</span>
                        </div>
                      )}
                      {excursie.spots && (
                        <div className="flex items-center text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{excursie.spots}</span>
                        </div>
                      )}
                    </div>
                    {excursie.description && (
                      <p className="text-gray-500 text-sm mb-4 overflow-y-auto max-h-32">
                        {excursie.description}
                      </p>
                    )}
                    {excursie.facebookLink && (
                      <Link href={excursie.facebookLink} target="_blank">
                        <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                          Detalii și înscriere
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {pastExcursii.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Excursii anterioare</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {pastExcursii.map(excursie => (
                <Link
                  href={excursie.facebookLink || '#'}
                  key={excursie.id}
                  target={excursie.facebookLink ? '_blank' : '_self'}
                >
                  <div className="relative h-60 rounded-lg overflow-hidden group">
                    <Image
                      src={excursie.imageUrl || '/placeholder.svg'}
                      alt={excursie.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-bold">{excursie.title}</h3>
                        <p className="text-sm">{excursie.eventDate}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <GrupeInFormare />
    </div>
  );
}
