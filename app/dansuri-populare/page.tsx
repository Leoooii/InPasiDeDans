'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import FolkDancesCarousel from '@/components/FolkDancesCarousel';
import WhyChooseUsFolkDances from '@/components/WhyChooseUsFolkDances';
import FolkDancesStructure from '@/components/FolkDancesStructure';
import FolkDancesRegions from '@/components/FolkDancesRegions';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import PricingSection from '@/components/PricingSection';
import FolkDancesTestimonials from '@/components/FolkDancesTestimonials';
import FolkDancesFAQ from '@/components/FolkDancesFAQ';
import ExploreOtherDances from '@/components/ExploreOtherDances';
import ContactForm from '@/components/contact-form';

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
    <div className="container py-12 flex flex-col gap-12">
      <Head />
      {/* Container de început cu titlu, descriere și buton - stil Dansuri Latino */}
      <div className="p-0 container flex flex-col gap-4 items-center">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center">Dansuri populare</h1>
        <div>
          <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-6xl mx-auto font-serif mb-2">
            Dansurile populare îmbină frumusețea tradițiilor cu veselia de a dansa alături de oameni.
          </p>
          <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-[80rem] mx-auto font-serif mb-2">
            De la voioșia molipsitoare a horii și energia sârbei, la eleganța brâului și ritmul antrenant al bătutei, fiecare pas îți aduce mai aproape autenticitatea și frumusețea culturii noastre. Vei învăța pași simpli și vei trăi emoția dansului într-o atmosferă caldă, prietenoasă și plină de viață.
          </p>
          <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-[80rem] mx-auto font-serif mb-2">
            Începe acum și transformă fiecare pas într-o sărbătoare a tradiției și a bucuriei de a dansa împreună!
          </p>
        </div>
        <Link href="/inscriere" className="mt-4">
          <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-xl" size="lg">
            Înscrie-te la curs
          </Button>
        </Link>
      </div>

      {/* Al doilea container cu cursuri în București */}
      <div className="container flex flex-col gap-4 items-center border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm bg-white/50 dark:bg-gray-900/50">
        <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center">
          Cursuri de dansuri populare în București
        </h2>
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
          Dansurile populare sunt o comoară a patrimoniului cultural românesc, purtând obiceiuri, tradiții și povești transmise din generație în generație.
        </p>
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
          Fiecare regiune a țării are jocuri tradiționale proprii, cu ritmuri și stiluri aparte, care reflectă unicitatea și energia comunităților locale.
        </p>
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
          La școala noastră vei descoperi și învăța jocuri populare din toate colțurile României – de la hora molovenească și învârtita din Transilvania, până la brâul muntenesc și dansurile pline de vitalitate din Oltenia. În plus, îți oferim ocazia să te bucuri și de dansuri grecești și machedonești, pentru o experiență culturală și mai bogată.
        </p>
        
        {/* Secțiunea nouă cu informații suplimentare */}
        <div className="w-full max-w-6xl mt-8 space-y-4">
          {/* De ce sunt speciale dansurile populare */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border-l-4 border-orange-400 dark:border-orange-600 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              De ce sunt speciale dansurile populare?
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Ele impresionează prin frumusețea și diversitatea lor: ritmuri antrenante, mișcări pline de energie și un spirit comunitar care creează o legătură autentică între oameni. Dansurile populare nu sunt doar pași, ci povești vii despre tradiții, sărbători și bucuria de a fi împreună.
            </p>
          </div>

          {/* Cui se adresează cursurile */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-l-4 border-blue-400 dark:border-blue-600 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Cui se adresează cursurile?
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Cursurile sunt deschise tuturor – fie că ești la început de drum, fie că ai mai dansat, fie că vrei pur și simplu să descoperi frumusețea folclorului. Se potrivesc copiilor, adolescenților și adulților deopotrivă, fiind o modalitate minunată de a petrece timpul liber într-un mod activ și cultural.
            </p>
          </div>

          {/* În ce contexte sunt potrivite */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-400 dark:border-green-600 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              În ce contexte sunt potrivite?
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Dansurile populare sunt ideale pentru petreceri, nunți, festivaluri sau evenimente tradiționale, dar și ca activitate recreativă ce aduce mișcare, voie bună și prietenii noi.
            </p>
          </div>
        </div>
      </div>

      {/* Carusel cu imagini de dansuri populare */}
      <div className="container">
        
        <FolkDancesCarousel />
      </div>

      {/* Secțiunea De ce să alegi cursurile noastre */}
      <WhyChooseUsFolkDances />

      {/* Secțiunea Structura dansurilor populare */}
      <FolkDancesStructure />

      {/* Secțiunea cu regiuni și dansuri */}
      <FolkDancesRegions />

      {/* Secțiunea cu locația */}
      <LocationSection />

      {/* Secțiunea cu instructorii */}
      <InstructorsSection 
        instructorNames={['Alexandra', 'Cătălina']} 
        customTitle="Instructorii noștri de dans popular din București"
      />

      {/* Secțiunea cu abonamentele */}
      <PricingSection />

      {/* Secțiunea cu testimoniale */}
      <FolkDancesTestimonials />

      {/* Secțiunea FAQ */}
      <FolkDancesFAQ />

      {/* Secțiunea Explorează alte dansuri */}
      <ExploreOtherDances 
        danceCategories={[
          {
            id: 1,
            title: 'Dansuri Latino',
            description: 'Salsa, bachata, cha-cha și multe altele',
            imageSrc: '/images/latino.png',
            imageAlt: 'Dansuri latino',
            href: '/dansuri-latino',
            gradient: 'from-red-500 to-orange-600'
          },
          {
            id: 2,
            title: 'Dansuri de Societate',
            description: 'Vals, tango, foxtrot și multe altele',
            imageSrc: '/images/societate.png',
            imageAlt: 'Dansuri de societate',
            href: '/dansuri-de-societate',
            gradient: 'from-blue-500 to-purple-600'
          },
          {
            id: 3,
            title: 'Lecții Private',
            description: 'Instruire personalizată pentru progres rapid',
            imageSrc: '/images/private.png',
            imageAlt: 'Lecții private de dans',
            href: '/lectii-private',
            gradient: 'from-green-500 to-teal-600'
          }
        ]}
        sectionTitle="Explorează și alte dansuri"
        sectionDescription="Descoperă diversitatea stilurilor de dans pe care le oferim"
      />

      {/* Secțiunea de înscriere */}
      <div id="inscriere" className="px-0 md:px-32">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și înscrie-te la cursurile de dansuri populare
        </h3>
        <ContactForm/>
      </div>

      <GrupeInFormare />
    </div>
  );
}
