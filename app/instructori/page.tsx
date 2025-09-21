'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

// Definim interfața pentru instructor
interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  order?: number;
}

export default function Instructori() {
  const [instructori, setInstructori] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedInstructors, setExpandedInstructors] = useState<Set<string>>(new Set());

  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Instructori" }
  ];

  // Funcție pentru toggle-ul expandării descrierii
  const toggleExpanded = (instructorId: string) => {
    setExpandedInstructors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(instructorId)) {
        newSet.delete(instructorId);
      } else {
        newSet.add(instructorId);
      }
      return newSet;
    });
  };

  // Încărcăm instructorii din Firebase
  useEffect(() => {
    const fetchInstructori = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/instructori');
        if (!response.ok) {
          throw new Error('Nu s-au putut încărca instructorii');
        }
        const data = await response.json();

        // Sortăm instructorii după ordinea de afișare
        const sortedInstructori = [...data].sort((a, b) => {
          const orderA = a.order || 0;
          const orderB = b.order || 0;
          return orderA - orderB;
        });

        setInstructori(sortedInstructori);
      } catch (error) {
        console.error('Eroare:', error);
        setError(
          'Nu s-au putut încărca instructorii. Încercați să reîmprospătați pagina.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructori();
  }, []);

  return (
    <div className="container py-12">
      <SEOBreadcrumbs items={breadcrumbItems} />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Instructori</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Cunoaște echipa noastră de instructori profesioniști.
            <br />
            <span className="block mt-2">
              <a
                href="/cursuri-dans-adulti"
                className="text-red-600 underline hover:text-orange-600"
              >
                Vezi cursurile pentru adulți
              </a>{' '}
              ·
              <a
                href="/cursuri-dans-copii"
                className="text-red-600 underline hover:text-orange-600 ml-2"
              >
                Cursuri pentru copii
              </a>{' '}
              ·
              <a
                href="/inscriere"
                className="text-red-600 underline hover:text-orange-600 ml-2"
              >
                Înscrie-te
              </a>
            </span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Echipa noastră de profesioniști
            </h2>
            <div>
              <p>
                Instructorii noștri sunt dansatori profesioniști cu experiență
                vastă atât în competiții naționale și internaționale, cât și în
                predarea dansului pentru toate nivelurile și vârstele.
              </p>
              <p>
                Pasionați și dedicați, ei sunt mereu pregătiți să împărtășească
                cunoștințele și dragostea lor pentru dans cu toți elevii.
                Fiecare instructor are propriul stil de predare, adaptat
                nevoilor și nivelului cursanților.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8">Instructorii noștri</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-red-600" />
              <span className="ml-2 text-gray-500">
                Se încarcă instructorii...
              </span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-8 border border-red-200 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instructori.map(instructor => (
                <InstructorCard
                  key={instructor.id}
                  id={instructor.id}
                  name={instructor.name}
                  role={instructor.role}
                  bio={instructor.bio}
                  src={instructor.imageUrl}
                  facebook={instructor.facebookUrl}
                  insta={instructor.instagramUrl}
                  youtube={instructor.youtubeUrl}
                  isExpanded={expandedInstructors.has(instructor.id)}
                  onToggleExpanded={() => toggleExpanded(instructor.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Specializări</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Formare continuă</h3>
              <p className="text-gray-500 text-sm">
                Echipa noastră participă regulat la workshop-uri și seminarii
                nationale și internaționale, pentru a fi la curent cu cele mai
                noi tendințe și tehnici.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Experiență competițională</h3>
              <p className="text-gray-500 text-sm">
                Majoritatea instructorilor noștri au participat la competiții
                naționale și internaționale, unii fiind campioni naționali sau
                finaliști internaționali.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Pedagogie adaptată</h3>
              <p className="text-gray-500 text-sm">
                Instructorii sunt pregătiți să adapteze metodele de predare în
                funcție de vârsta, nivelul și obiectivele cursanților.
              </p>
            </div>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}

function InstructorCard({
  id,
  name,
  role,
  bio,
  src,
  insta,
  facebook,
  youtube,
  isExpanded,
  onToggleExpanded,
}: {
  id: string;
  name: string;
  role: string;
  bio: string;
  src: string;
  insta?: string;
  facebook?: string;
  youtube?: string;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}) {
  return (
    <Card className="overflow-hidden group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-orange-500">
      <div className="relative bg-white rounded-xl flex flex-col flex-1">
        <div className="relative h-96 w-full bg-gradient-to-br from-orange-50 to-red-50">
          <Image
            src={src || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{name}</h3>
          <p className="text-red-600 font-medium mb-3">{role}</p>
          <div className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
            {(() => {
              const phrasesToHighlight = [
                "fondator, manager și instructor",
                "pasiunea pentru dans",
                "experiență de peste 24 de ani",
                "competiții naționale și internaționale",
                "predarea dansurilor latino, de societate și dansurilor populare",
                "organizarea și coordonarea",
                "organizarea evenimentelor și activităților",
                "dansuri latino și de societate",
                "experiență de peste 13 ani",
                "bucuria, eleganța și secretele dansului",
                "experiență solidă de 11 ani",
                "peste 16 ani",
                "vicecampion național la bachata",
                "stilul său tehnic, carisma pe ringul de dans",
                "2023",
                "salsa și bachata",
                "dezvoltarea comunității de dansatori",
                "instructor-coregraf",
                " dansuri populare adulți, lecții private pentru viitori miri, precum și workshopuri",
                "inspirație, bucurie și empatie",
                "susținuți și înțeleși",
                "competiții, evenimente și proiecte naționale și internaționale de dans",
                "dansul sportiv de 9 ani",
                "instructoare înțelegătoare, creativă",
                "lecții private pentru miri"
              ];
              
              const bioParagraphs = bio.split('\n');
              const paragraphsToShow = isExpanded ? bioParagraphs : [bioParagraphs[0]];
              
              return (
                <>
                  {paragraphsToShow.map((paragraph, pIndex) => (
                    <span key={pIndex}>
                      {(() => {
                        let highlightedParagraph = paragraph;
                        
                        phrasesToHighlight.forEach(phrase => {
                          const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                          highlightedParagraph = highlightedParagraph.replace(regex, `<strong class="text-orange-700">${phrase}</strong>`);
                        });
                        
                        return <span dangerouslySetInnerHTML={{ __html: highlightedParagraph }} />;
                      })()}
                      {pIndex < paragraphsToShow.length - 1 && <br />}
                    </span>
                  ))}
                  {bioParagraphs.length > 1 && (
                    <button
                      onClick={onToggleExpanded}
                      className="text-orange-600 hover:text-orange-700 font-medium ml-1 transition-colors duration-200"
                    >
                      {isExpanded ? 'Mai puțin...' : 'Mai multe...'}
                    </button>
                  )}
                </>
              );
            })()}
          </div>
          
          {/* Social Media Links */}
          <div className="flex space-x-3 mt-auto">
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                aria-label={`Facebook ${name}`}
              >
                <Facebook size={18} />
              </a>
            )}
            {insta && (
              <a
                href={insta}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-all duration-300 hover:scale-110"
                aria-label={`Instagram ${name}`}
              >
                <Instagram size={18} />
              </a>
            )}
            {youtube && (
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-110"
                aria-label={`YouTube ${name}`}
              >
                <Youtube size={18} />
              </a>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
