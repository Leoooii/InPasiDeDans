'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

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
  const [currentRegion, setCurrentRegion] = useState(0);
  const [showDances, setShowDances] = useState(false);

  // Funcții pentru navigarea cu săgeți
  const goToPrevious = () => {
    const currentIndex = regiuniDansuri.findIndex(
      regiune => regiune.id === regiuniDansuri[currentRegion].id
    );
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? regiuniDansuri.length - 1 : currentIndex - 1;
    setCurrentRegion(newIndex);
  };

  const goToNext = () => {
    const currentIndex = regiuniDansuri.findIndex(
      regiune => regiune.id === regiuniDansuri[currentRegion].id
    );
    const isLast = currentIndex === regiuniDansuri.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentRegion(newIndex);
  };

  // Regiunea curentă
  const regiuneCurenta = regiuniDansuri[currentRegion];

  return (
    <div className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dansuri populare din toate regiunile României
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descoperă frumusețea și diversitatea dansurilor populare românești, 
            de la Transilvania până la Dobrogea
          </p>
        </div>

        {/* Buton toggle pentru afișarea dansurilor */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowDances(!showDances)}
            variant="outline"
            className="bg-white hover:bg-orange-50 border-orange-200 text-orange-700 hover:text-orange-800 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            {showDances ? (
              <>
                <EyeOff className="w-5 h-5 mr-2" />
                Ascunde dansurile
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 mr-2" />
                Vezi toate dansurile
              </>
            )}
          </Button>
        </div>

        {/* Tabs pentru regiuni */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={currentRegion.toString()} onValueChange={(value) => setCurrentRegion(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mb-8 bg-white shadow-lg rounded-xl p-1 gap-1">
              {regiuniDansuri.map((regiune, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300 text-sm md:text-base px-3 py-3 md:px-3 md:py-2 whitespace-nowrap"
                >
                  {regiune.nume}
                </TabsTrigger>
              ))}
            </TabsList>

            {regiuniDansuri.map((regiune, index) => (
              <TabsContent key={index} value={index.toString()} className="mt-0">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Imaginea regiunii */}
                    <div className="relative">
                      <img
                        src={regiune.imagine}
                        alt={regiune.nume}
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                    </div>

                    {/* Informații despre regiune */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {regiune.nume}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Descoperă frumusețea dansurilor populare din {regiune.nume}, cu ritmuri și stiluri unice care reflectă tradițiile și cultura acestei regiuni.
                      </p>

                      {/* Butoane de navigare */}
                      <div className="flex gap-4">
                        <Button
                          onClick={goToPrevious}
                          variant="outline"
                          className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Anterior
                        </Button>
                        <Button
                          onClick={goToNext}
                          variant="outline"
                          className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                          Următor
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Lista dansurilor - afișată doar când showDances este true */}
                  {showDances && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          Dansuri populare din {regiune.nume}
                        </h4>
                        <p className="text-gray-600">
                          {regiune.dansuri.length} dansuri tradiționale
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {regiune.dansuri.map((dans, dansIndex) => (
                          <div
                            key={dansIndex}
                            className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {dansIndex + 1}
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-800">{dans}</h5>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-1"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-center mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Total: <span className="font-semibold text-orange-600">{regiune.dansuri.length}</span> dansuri populare
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
