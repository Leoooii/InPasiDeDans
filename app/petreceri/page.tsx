'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import { Button } from '@/components/ui/button';
// Definim interfața pentru petrecere
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
  mapEmbed?: string;
}

export default function Petreceri() {
  const [upcomingPetreceri, setUpcomingPetreceri] = useState<Petrecere[]>([]);
  const [pastPetreceri, setPastPetreceri] = useState<Petrecere[]>([]);

  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Petreceri" }
  ];
  const [isLoading, setIsLoading] = useState(true);

  // Funcție pentru a extrage anul din data petrecerii
  const extractYear = (dateString: string): number => {
    const yearStr = dateString.trim().slice(-4);
    const year = Number.parseInt(yearStr, 10);
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      return year;
    }
    return 0;
  };

  // Încărcăm petrecerile din API (fără cache Firestore client)
  useEffect(() => {
    const loadPetreceri = async () => {
      try {
        const response = await fetch('/api/petreceri', {
          cache: 'no-store', // evită cache-ul pentru date actualizate imediat
        });
        if (!response.ok) {
          throw new Error('Eroare la încărcarea petrecerilor');
        }
        const petreceriList = (await response.json()) as Petrecere[];

        const upcoming = petreceriList.filter(p => p.isUpcoming);
        const past = petreceriList.filter(p => !p.isUpcoming);

        upcoming.sort((a, b) => b.createdAt - a.createdAt);
        past.sort((a, b) => {
          const yearA = extractYear(a.date);
          const yearB = extractYear(b.date);
          if (yearA !== yearB) {
            return yearB - yearA;
          }
          return b.createdAt - a.createdAt;
        });

        setUpcomingPetreceri(upcoming);
        setPastPetreceri(past);
      } catch (error) {
        console.error('Eroare la încărcarea petrecerilor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPetreceri();
  }, []);

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
    <>
      <Head>
        <title>Petreceri & Social Dance | In Pasi de Dans</title>
        <meta
          name="description"
          content="Participa la petrecerile tematice de dans organizate de In Pasi de Dans in Bucuresti, Sector 5. Practica dansul intr-o atmosfera relaxata!"
        />
        <meta
          name="keywords"
          content="petreceri dans Bucuresti, social dance, evenimente dans, petreceri tematice, scoala dans Sector 5"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.inpasidedans.ro/petreceri" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Petreceri & Social Dance | In Pasi de Dans"
        />
        <meta
          property="og:description"
          content="Participa la petrecerile tematice de dans organizate de In Pasi de Dans in Bucuresti, Sector 5. Practica dansul intr-o atmosfera relaxata!"
        />
        <meta property="og:url" content="https://www.inpasidedans.ro/petreceri" />
        <meta property="og:site_name" content="In Pasi de Dans" />
        <meta
          property="og:image"
          content="https://www.inpasidedans.ro/images/logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Petreceri de Dans" />
        <meta property="og:locale" content="ro_RO" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Petreceri & Social Dance | In Pasi de Dans"
        />
        <meta
          name="twitter:description"
          content="Participă la petrecerile tematice de dans organizate de În Pași de Dans în București, Sector 5. Practică dansul într-o atmosferă relaxată!"
        />
        <meta
          name="twitter:image"
          content="https://www.inpasidedans.ro/images/logo.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: 'Petreceri Tematice de Dans',
              description:
                'Petreceri tematice de dans organizate de În Pași de Dans în București, Sector 5, pentru cursanți și prieteni.',
              url: 'https://www.inpasidedans.ro/petreceri',
              location: {
                '@type': 'Place',
                name: 'În Pași de Dans',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Calea Rahovei 262',
                  addressLocality: 'București',
                  addressRegion: 'Sector 5',
                  postalCode: '050897',
                  addressCountry: 'RO',
                },
              },
              organizer: {
                '@type': 'Organization',
                name: 'În Pași de Dans',
                url: 'https://www.inpasidedans.ro',
              },
              eventAttendanceMode:
                'https://schema.org/OfflineEventAttendanceMode',
              eventStatus: 'https://schema.org/EventScheduled',
              startDate: '2025-05-29',
              endDate: '2025-12-31',
            }),
          }}
        />
      </Head>
      <div className="container py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/petreceri" />
        <div className="space-y-6 ">
          <div className="space-y-4 bg-gradient-to-r from-rose-50 to-amber-50 p-6 rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight ">
              Petreceri În Pași de Dans
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Participă la petrecerile noastre tematice și pune în practică ce
              ai învățat!
            </p>
            <p className="text-gray-500 leading-relaxed">
              Petrecerile tematice organizate de școala noastră sunt ocazii
              perfecte pentru a practica ce ai învățat la cursuri, într-o
              atmosferă relaxată și prietenoasă. Acestea sunt deschise atât
              cursanților noștri, cât și prietenilor acestora.
            </p>
            <a
              href="#galerie"
              className="inline-block mt-4 px-6 py-2 bg-rose-600 text-white font-semibold rounded-md hover:bg-rose-700 transition-colors"
            >
              Vezi galeriile
            </a>
          </div>

          {upcomingPetreceri.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Următoarele petreceri</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingPetreceri.map(petrecere => (
                  <Card
                    key={petrecere.id}
                    className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-red-600"
                    aria-label={`Petrecere: ${petrecere.title} pe ${petrecere.date}`}
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={petrecere.imageUrl || '/placeholder.svg'}
                        alt={petrecere.title}
                        fill
                        className="object-cover hover:scale-125 transition-transform duration-300"
                      />
                      {petrecere.badge && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {petrecere.badge}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="">
                        <h3 className="text-xl font-bold mb-2">
                          {petrecere.title}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{petrecere.date}</span>
                          </div>
                          {petrecere.time && (
                            <div className="flex items-center text-gray-500">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{petrecere.time}</span>
                            </div>
                          )}
                          {petrecere.location && (
                            <div className="flex items-center text-gray-500">
                              <div>
                                <MapPin className="w-4 h-4 mr-2" />
                              </div>
                              <span>{petrecere.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link href={`/petreceri/${petrecere.id}`}>
                          <Button className="w-full">
                            Mai multe informații
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {pastPetreceri.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">
                Galerie de la petrecerile anterioare
              </h2>
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                id="galerie"
              >
                {pastPetreceri.map(petrecere => (
                  <Card
                    key={petrecere.id}
                    className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-red-600"
                    aria-label={`Petrecere trecută: ${petrecere.title} pe ${petrecere.date}`}
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={petrecere.imageUrl || '/placeholder.svg'}
                        alt={petrecere.title}
                        fill
                        className="object-cover hover:scale-125 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Link href={petrecere.facebookLink} target="_blank">
                        <h3 className="text-xl font-bold mb-2">
                          {petrecere.title}
                        </h3>
                        <h3>{petrecere.date}</h3>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        <GrupeInFormare />
      </div>
    </>
  );
}
