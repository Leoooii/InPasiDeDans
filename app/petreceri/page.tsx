'use client';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ImageSkeleton from '@/components/image-skeleton';
import Image from 'next/image';

export default function Petreceri() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Petreceri In Pași de Dans
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Participă la petrecerile noastre tematice și pune în practică ce ai
            învățat
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Dansează și socializează</h2>
            <p>
              Petrecerile tematice organizate de școala noastră sunt ocazii
              perfecte pentru a practica ce ai învățat la cursuri, într-o
              atmosferă relaxată și prietenoasă. Acestea sunt deschise atât
              cursanților noștri, cât și prietenilor acestora.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/petrecere.png?height=800&width=600"
              alt="Excursie de dans"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Următoarele petreceri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-red-600">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src="/images/petrecere.png?height=800&width=600"
                  alt="Excursie de dans"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  În curând
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Petrecere Craciun 2025
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>20 Decembrie 2025</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>19:30 - 02:00</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Restaurant Almafi Alegria</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Cel mai așteptat eveniment dansant al anului, devenit deja
                  tradiție pentru școala noastră! Vă așteptăm cu muzică bună,
                  dans, distracție și show-uri pregatite de cursanții noștri.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Galerie de la petrecerile anterioare
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <ImageSkeleton
                  width={300}
                  height={300}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
