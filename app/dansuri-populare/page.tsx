'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Definim regiunile și dansurile asociate
const regiuniDansuri = [
  {
    id: 'muntenia',
    nume: 'Muntenia',
    imagine: '/images/Romania/harta-muntenia.jpg',
    dansuri: [
      'Hora',
      'Sârba (în doi, trei și patru pași)',
      'Ofițereasca',
      'Sârba studenților',
      'Zvac',
      'Ghimpele',
      'Alunelu',
      'Hora Lelea',
      'Ciuleandra',
      'Fedelesul',
      'Rocojina',
      'Hora bătută (Țigănească)',
      'Boereasca',
      'Breaza',
      'Drumul dracului',
      'Hora în două părți de la Conțești',
      'Arnauteasca de la Crivina',
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
      'Daolica',
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
    imagine: '/images/Romania/harta-oltenia.jpg',
    dansuri: [
      'Alunelu de la Goicea',
      'Ungurica',
      'Hora olteanească',
      'Hora ca la Gorj',
      'Floricica',
      'Ariciul',
      'Vulpiuța',
      'Hora boerească',
      'Hora peste picior de la Motăței',
      'Trei păzește de la Bistret',
      'Tocul',
      'Rustemul',
      'Brăulețul de la Barca',
      'Crăițele de la Meri',
      'Găile de la Motăței',
      'Leana de la Goicea',
      'Hora ca la Romanați',
      'Gălaonul',
      'Alunelul de la Daneți',
      'Alunelul de la Izbiceni',
      'Trandafirul oltenesc',
      'Ungurica țigănească de la Severin',
      'Hora dogarilor',
      'Cârligul',
      'Trei păzește de la Dolj',
    ],
  },
  {
    id: 'dobrogea',
    nume: 'Dobrogea',
    imagine: '/images/Romania/harta-dobrogea.jpg',
    dansuri: [
      'Geampara',
      'Cadânească',
      'Păidușca',
      'Sârba de la Oltina',
      'Pamporea',
      'Ceancul',
      'Sârba de la Negru Vodă',
      'Bestepeanca',
      'Joc bătrânesc de la Niculițel',
      'Hora stânga de la Ostrov',
      'Sârba de la Enisala',
      'Dobromireasca',
      'Floricica dobrogeană',
      'Tropotelul ca-n Dobrogea',
      'Pandelasul de la Plopu',
      'Corlu',
      'Basarabeanca',
    ],
  },
  {
    id: 'moldova',
    nume: 'Moldova',
    imagine: '/images/Romania/harta-moldova.jpg',
    dansuri: [
      'Hora',
      'Sârba (în doi, trei și patru pași)',
      'Bătuta',
      'Hora-n două părți',
      'Schioapa',
      'Balaceana',
      'Zdroboleanca',
      'Țărănească',
      'Hora din Tudora',
      'Promoroaca',
      'Salcioara',
      'Rata',
      'Caraselul',
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
    imagine: '/images/Romania/harta-bucovina.jpg',
    dansuri: [
      'Coragheasca',
      'Coragheasca de la Târnița',
      'Hutulca',
      'Hangul de la Cahul',
      'Polcuța',
      'Coșnencuța',
      'Bătuta ursului',
      'Bătrânească veche de la Iașlovăț',
      'Bătrânească de la Ciocănești',
      'Arcanul',
      'Bătrânească',
    ],
  },
  {
    id: 'transilvania',
    nume: 'Transilvania',
    imagine: '/images/Romania/harta-transilvania.jpg',
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
      'Arcanul',
      'Sârba pan’ la 10 de la Grădiștea de Munte',
    ],
  },
  {
    id: 'banat',
    nume: 'Banat',
    imagine: '/images/Romania/harta-banat.jpg',
    dansuri: ['Ardeleana', 'Brâul bănățean', 'Hora din Banat', 'Damul'],
  },
  {
    id: 'maramures',
    nume: 'Maramureș',
    imagine: '/images/Romania/harta-maramures.jpg',
    dansuri: ['Roate', '7 pași', 'Tropotita'],
  },
];

export default function DansuriPopulare() {
  // State pentru slideshow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Efect pentru a marca că suntem pe client
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Funcții pentru navigarea în slideshow
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? regiuniDansuri.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === regiuniDansuri.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Regiunea curentă
  const regiuneCurenta = regiuniDansuri[currentIndex];

  return (
    <div className="container py-12">
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
            <h2 className="text-2xl font-bold">Tradiție și pasiune</h2>
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
              din Oltenia.
            </p>
            <p>
              Mai jos gasiti jocurile populare predate in cadrul scolii noastre.
            </p>
            <div className="pt-4">
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Înscrie-te la curs
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

        {/* Secțiunea de slideshow cu regiuni */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Explorează regiunile României și dansurile lor
          </h2>

          {isLoaded && (
            <div className="relative">
              {/* Slideshow cu imagini ale regiunilor */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={regiuneCurenta.imagine || '/placeholder.svg'}
                  alt={`Regiunea ${regiuneCurenta.nume}`}
                  fill
                  className="object-contain"
                  onError={e => {
                    // Fallback pentru imagini care nu se încarcă
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg?height=400&width=600';
                  }}
                />

                {/* Overlay cu numele regiunii */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <h3 className="text-xl font-bold">{regiuneCurenta.nume}</h3>
                </div>

                {/* Butoane de navigare */}
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

              {/* Indicatori pentru slideshow */}
              <div className="flex justify-center mt-4 gap-2">
                {regiuniDansuri.map((regiune, index) => (
                  <button
                    key={regiune.id}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === index ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Lista de dansuri pentru regiunea curentă */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Dansuri populare din {regiuneCurenta.nume}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {regiuneCurenta.dansuri.map((dans, index) => (
                      <li
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="font-medium">{dans}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Secțiunea cu regiuni și dansuri (comentată) */}
        {/* 
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Dansuri populare din diferite regiuni</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <RegiuneCard nume="Moldova" dansuri={["Hora moldovenească", "Bătuta", "Corăgheasca", "Hangul"]} />
            <RegiuneCard nume="Muntenia" dansuri={["Brâul muntenesc", "Sârba", "Geampara", "Breaza"]} />
            <RegiuneCard nume="Transilvania" dansuri={["Învârtita", "Hațegana", "Fecioreasca", "Jiana"]} />
            <RegiuneCard nume="Banat" dansuri={["Brâul bănățean", "Ardeleana", "De doi", "Hora bănățeană"]} />
            <RegiuneCard nume="Oltenia" dansuri={["Hora oltenească", "Rustemul", "Alunelul", "Ciuleandra"]} />
            <RegiuneCard
              nume="Maramureș"
              dansuri={["Învârtita maramureșeană", "Jocul fecioresc", "Roata", "Bărbătescul"]}
            />
            <RegiuneCard nume="Dobrogea" dansuri={["Cadâneasca", "Geamparalele", "Hora dobrogeană", "Ghiordumul"]} />
            <RegiuneCard
              nume="Internaționale"
              dansuri={["Dansuri grecești", "Dansuri bulgărești", "Dansuri sârbești", "Dansuri ucrainene"]}
            />
          </div>
        </div>
        */}

        {/* Secțiunea de program */}
        {/* <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Programul Cursurilor</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Românești - Începători</h3>
                <p className="text-gray-500">Instructor: Ion Marin</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Marți, 18:00 - 19:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Balcanice - Mixt</h3>
                <p className="text-gray-500">Instructor: Elena Popescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Joi, 19:00 - 20:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Internaționale - Mixt</h3>
                <p className="text-gray-500">Instructor: Mihai Ionescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Sâmbătă, 11:00 - 13:00</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Secțiunea CTA */}
        {/* <div className="mt-12 bg-red-50 dark:bg-red-900/10 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Ansamblul de dansuri populare"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Alătură-te ansamblului nostru</h2>
              <p className="mb-6">
                Pentru cei pasionați, oferim posibilitatea de a face parte din ansamblul nostru de dansuri populare,
                care participă la diverse evenimente culturale și festivaluri.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Contactează-ne
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// Componenta pentru cardurile de regiuni (comentată)
/*
function RegiuneCard({ nume, dansuri }: { nume: string; dansuri: string[] }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-3">{nume}</h3>
        <ul className="space-y-1">
          {dansuri.map((dans, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              • {dans}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
*/
