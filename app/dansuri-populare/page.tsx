'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';

// Definim regiunile și dansurile asociate
const regiuniDansuri = [
  {
    id: 'muntenia',
    nume: 'Muntenia',
    imagine: '/images/Romania/harta-muntenia.png',
    dansuri: [
      'Hora',
      'Sârba (în doi, trei și patru pași)',
      'Ofițereasca',
      'Sârba studenților',
      'Zvâc',
      'Ghimpele',
      'Alunelu',
      'Hora Lelea',
      'Ciuleandra',
      'Fedeleșul',
      'Rogojina',
      'Hora bătută (Țigănească)',
      'Boereasca',
      'Breaza',
      'Drumul dracului',
      'Hora în două părți de la Conțești',
      'Arnauțeasca de la Crivina',
      'Ovreicuța',
      'Hora Maritica',
      'Brâul pe șase',
      'Brâul pe opt',
      'Brâul de la Brăiești',
      'Sârba de la Floroaia',
      'Aoleanul de la Fundul Părului',
      'Brâul de la Slănic',
      'Hora pe seară de la Vlădeni',
      'Hora Cantacuzino',
      'Stânga de la Gropeni',
      'Daolică',
      'Nuneasca',
      'Murgulețul de la Petrești',
      'Isa',
      'Buceagul ca pe Teleorman',
      'Hora mare',
      'Brânza de la Reviga',
    ],
  },
  {
    id: 'oltenia',
    nume: 'Oltenia',
    imagine: '/images/Romania/harta-oltenia.png',
    dansuri: [
      'Alunelu de la Goicea',
      'Ungurica',
      'Hora olteanească',
      'Hora ca la Gorj',
      'Floricica',
      'Ariciul',
      'Vulpiuța',
      'Hora boerească',
      'Sârba de la Băilești',
      'Hora peste picior de la Motăței',
      'Trei păzește de la Bistret',
      'Tocul',
      'Rustemul',
      'Brâulețul de la Bârca',
      'Crăițele de la Meri',
      'Găile de la Motăței',
      'Leana de la Goicea',
      'Hora ca la Romanați',
      'Galaonul',
      'Alunelul de la Dăneți',
      'Alunelul de la Izbiceni',
      'Trandafirul oltenesc',
      'Ungurica țigănească de la Severin',
      'Hora dogarilor',
      'Cârligul',
      'Trei păzește de la Dolj',
      'Basarabeanca',
    ],
  },
  {
    id: 'dobrogea',
    nume: 'Dobrogea',
    imagine: '/images/Romania/harta-dobrogea.png',
    dansuri: [
      'Geampara',
      'Cadânească',
      'Paidușca',
      'Sârba de la Oltina',
      'Pamporea',
      'Ceancul',
      'Sârba de la Negru Vodă',
      'Beștepeanca',
      'Joc bătrânesc de la Niculițel',
      'Hora stânga de la Ostrov',
      'Sârba de la Enisala',
      'Dobromireasca',
      'Floricica dobrogeană',
      'Tropoțelul ca-n Dobrogea',
      'Pandelasul de la Plopu',
      'Corlu',
    ],
  },
  {
    id: 'moldova',
    nume: 'Moldova',
    imagine: '/images/Romania/harta-moldova.png',
    dansuri: [
      'Hora',
      'Sârba (în doi, trei și patru pași)',
      'Bătuta',
      'Hora-n două părți',
      'Șchioapa',
      'Bălăceana',
      'Zdroboleanca',
      'Țărănească',
      'Hora din Tudora',
      'Promoroaca',
      'Salcioara',
      'Rata',
      'Cărășelul',
      'Hora bătută',
      'Hangul de la Tălpigi',
      'Sârba de la Izvoare',
      'Hora-n două părți de la Corni',
      'Polobocul',
      'Ostropatul',
      'Tantărașul',
      'Hora de la Brăhășești',
      'Ciobănașul de la Independența',
      'Bordeiașul',
      'Sârba tineretului',
      'Sârba lui Zdrelea',
    ],
  },
  {
    id: 'bucovina',
    nume: 'Bucovina',
    imagine: '/images/Romania/harta-bucovina.png',
    dansuri: [
      'Corăgheasca',
      'Corăgheasca de la Tarnița',
      'Huțulca',
      'Hangul de la Cahul',
      'Polcuța',
      'Coșnencuța',
      'Bătuta ursului',
      'Bătrânească veche de la Iaslovăț',
      'Bătrânească de la Ciocănești',
      'Arcanul',
      'Bătrânească',
    ],
  },
  {
    id: 'transilvania',
    nume: 'Transilvania',
    imagine: '/images/Romania/harta-transilvania.png',
    dansuri: [
      'Brașoveanca',
      'Hodoroaga',
      'Învârtita',
      'Jiana de la Jina',
      'Jiana de la Sibiu',
      'Jiana de la Gura Râului',
      'Jiana de la Tilișca',
      'Jiana de la Avrig',
      'Brâul de la Făgăraș',

      'Sârba pan’ la 10 de la Grădiștea de Munte',
    ],
  },
  {
    id: 'banat',
    nume: 'Banat',
    imagine: '/images/Romania/harta-banat.png',
    dansuri: ['Ardeleana', 'Brâul bănățean', 'Hora din Banat', 'Damul'],
  },
  {
    id: 'maramures',
    nume: 'Maramureș',
    imagine: '/images/Romania/harta-maramures.png',
    dansuri: ['Roate', '7 pași', 'Tropotita'],
  },
];

export default function DansuriPopulare() {
  // State pentru regiunea selectată
  const [currentRegion, setCurrentRegion] = useState(regiuniDansuri[0].id);

  // Funcții pentru navigarea cu săgeți
  const goToPrevious = () => {
    const currentIndex = regiuniDansuri.findIndex(
      regiune => regiune.id === currentRegion
    );
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? regiuniDansuri.length - 1 : currentIndex - 1;
    setCurrentRegion(regiuniDansuri[newIndex].id);
  };

  const goToNext = () => {
    const currentIndex = regiuniDansuri.findIndex(
      regiune => regiune.id === currentRegion
    );
    const isLast = currentIndex === regiuniDansuri.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentRegion(regiuniDansuri[newIndex].id);
  };

  // Regiunea curentă
  const regiuneCurenta = regiuniDansuri.find(
    regiune => regiune.id === currentRegion
  );

  return (
    <div className="container py-12">
      <Head />
      <div className="space-y-6">
        {/* Secțiunea de titlu */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Dansuri populare
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă frumusețea și energia dansurilor tradiționale românești
            din diferite regiuni
          </p>
        </div>

        {/* Secțiunea de introducere */}
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tradiție și folclor</h2>
            <p>
              Dansurile populare reprezintă o parte importantă a patrimoniului
              cultural, transmițând obiceiuri, tradiții și povești din generație
              în generație. Fiecare regiune a României are propriile dansuri
              tradiționale, cu stiluri și ritmuri distincte.
            </p>
            <p>
              La școala noastră, puteți învăța jocuri populare din toate
              regiunile României, de la hora moldovenească și învârtita din
              Transilvania, până la brâul muntenesc și jocurile pline de energie
              din Oltenia, dar si dansuri grecești și machedonești.
            </p>
            <p>
              Mai jos găsiți jocurile populare predate în cadrul școlii noastre.
            </p>
            <div className="pt-4 flex gap-2">
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Înscrie-te la curs
                </Button>
              </Link>
              <Link href="/program">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Verifică programul
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/dobrogea.jpg?height=400&width=600"
              alt="Dansuri populare"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Secțiunea cu taburi și imagine */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Explorează regiunile României și dansurile lor
          </h2>

          <Tabs
            value={currentRegion}
            onValueChange={setCurrentRegion}
            className="w-full"
          >
            <div className="grid gap-8 md:grid-cols-2">
              {/* Taburile din stânga */}
              <TabsList className="flex flex-col h-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                {regiuniDansuri.map(regiune => (
                  <TabsTrigger
                    key={regiune.id}
                    value={regiune.id}
                    className="py-3 text-left justify-start data-[state=active]:bg-red-100 data-[state=active]:text-red-700 dark:data-[state=active]:bg-red-900 dark:data-[state=active]:text-white"
                  >
                    {regiune.nume}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Imaginea din dreapta cu săgeți */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={regiuneCurenta?.imagine || '/placeholder.svg'}
                  alt={`Regiunea ${regiuneCurenta?.nume}`}
                  fill
                  className="object-contain"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=400&width=600';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <h3 className="text-xl font-bold">{regiuneCurenta?.nume}</h3>
                </div>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Lista de dansuri sub taburi și imagine */}
            {regiuniDansuri.map(regiune => (
              <TabsContent key={regiune.id} value={regiune.id} className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Dansuri populare din {regiune.nume}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {regiune.dansuri.map((dans, index) => (
                        <li
                          key={index}
                          className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900 transition duration-200"
                        >
                          <span className="font-medium">{dans}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}
