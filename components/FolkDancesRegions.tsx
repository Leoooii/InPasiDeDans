'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      'Breaza',
      'Drumul dracului',
      'Hora în două părți de la Conțești',
      'Arnauțeasca de la Crivina',
      'Ovreicuța',
      'Hora Marițica',
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
      'Boereasca',
      'Țepușul de la Bistreț',
      'Hora boierească de la Săpata'
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
      'Ceamcul',
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
      'Rața',
      'Cărășelul',
      'Hora bătută',
      'Hangul de la Tălpigi',
      'Sârba de la Izvoare',
      'Hora-n două părți de la Corni',
      'Polobocul',
      'Ostropățul',
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
      "Sârba pan' la 10 de la Grădiștea de Munte",
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

export default function FolkDancesRegions() {
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
    <div className="space-y-6">
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
              <Card className="overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  {/* Header cu gradient */}
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      Dansuri populare din {regiune.nume}
                    </h3>
                    <p className="text-orange-100">
                      {regiune.dansuri.length} dansuri tradiționale
                    </p>
                  </div>
                  
                  {/* Grid cu dansuri stilizat */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {regiune.dansuri.map((dans, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                        >
                          {/* Background gradient subtle */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Conținut */}
                          <div className="relative z-10">
                            {/* Numărul dansului */}
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold mb-3 shadow-lg">
                              {index + 1}
                            </div>
                            
                            {/* Numele dansului */}
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">
                              {dans}
                            </h4>
                            
                            {/* Linie decorativă */}
                            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          {/* Efect hover - border colorat */}
                          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-300 dark:group-hover:border-orange-600 transition-colors duration-300"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Footer cu statistici */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Total dansuri: <span className="font-semibold text-orange-600 dark:text-orange-400">{regiune.dansuri.length}</span></span>
                        <span>Regiunea: <span className="font-semibold text-orange-600 dark:text-orange-400">{regiune.nume}</span></span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
