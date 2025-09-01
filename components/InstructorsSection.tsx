'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Loader2 } from 'lucide-react';

// Definim interfața pentru instructor (conform Firebase)
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
  createdAt?: number;
}

interface InstructorsSectionProps {
  instructorNames?: string[]; // Array cu numele instructorilor de afișat
  customTitle?: string; // Titlu personalizat pentru secțiune
}

export default function InstructorsSection({ instructorNames, customTitle }: InstructorsSectionProps) {
  const [instructori, setInstructori] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Filtrez instructorii după numele specificate în props
        let filteredInstructori = sortedInstructori;
        console.log('Instructor names:', filteredInstructori);
        if (instructorNames && instructorNames.length > 0) {
          filteredInstructori = sortedInstructori.filter(instructor =>
            instructorNames.some(name => {
              // Verific dacă numele instructorului conține exact numele căutat
              const instructorNameLower = instructor.name.toLowerCase();
              const searchNameLower = name.toLowerCase();
              
              // Cazuri speciale pentru potriviri exacte
              if (searchNameLower === 'alexandra' && instructorNameLower.includes('alexandra')) return true;
              if (searchNameLower === 'cătălina' && instructorNameLower.includes('cătălina')) return true;
              if (searchNameLower === 'miriam' && instructorNameLower.includes('miriam')) return true;
              if (searchNameLower === 'niko' && instructorNameLower.includes('niko')) return true;
              if (searchNameLower === 'nicholas' && instructorNameLower.includes('nicholas')) return true;
              
              // Pentru alte cazuri, verific dacă numele instructorului începe cu numele căutat
              return instructorNameLower.startsWith(searchNameLower) || 
                     instructorNameLower.includes(searchNameLower);
            })
          );
        }

        console.log('Instructori filtrați:', filteredInstructori);
        setInstructori(filteredInstructori);
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
  }, [instructorNames]);

  if (isLoading) {
    return (
      <div className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Cunoaște instructorii noștri</h2>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Cunoaște instructorii noștri</h2>
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (instructori.length === 0) {
    return (
      <div className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Cunoaște instructorii noștri</h2>
        <div className="text-center text-gray-600">
          <p>Nu s-au găsit instructorii specificați.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 container py-12">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
        {customTitle || (
          instructori.length === 2 
            ? "Instructorii noștri de dans de societate din București"
            : "Instructorii noștri de dans latino din București"
        )}
      </h2>
      
             <div className={`flex flex-wrap justify-center gap-6 max-w-[90rem] mx-auto `}>
        {instructori.map((instructor) => (
                     <div key={instructor.id} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden flex flex-col w-full max-w-xs lg:max-w-sm">
            {/* Border animat ca un șarpe */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-white rounded-xl m-0.5 flex flex-col flex-1">
                             <div className="relative h-96 w-full bg-gradient-to-br from-orange-50 to-red-50">
                <Image
                  src={instructor.imageUrl}
                  alt={`Dansuri latino in Bucuresti cu ${instructor.name}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
                             <div className="p-4 flex-1 flex flex-col">
                <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{instructor.name}</div>
                <p className="text-red-600 font-medium mb-3">{instructor.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
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
                      "susținuți și înțeleși"
                    ];
                    
                    return instructor.bio.split('\n').map((paragraph, pIndex) => (
                      <span key={pIndex}>
                        {(() => {
                          let highlightedParagraph = paragraph;
                          
                          phrasesToHighlight.forEach(phrase => {
                            const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                            highlightedParagraph = highlightedParagraph.replace(regex, `<strong class="text-orange-700">${phrase}</strong>`);
                          });
                          
                          return <span dangerouslySetInnerHTML={{ __html: highlightedParagraph }} />;
                        })()}
                        {pIndex < instructor.bio.split('\n').length - 1 && <br />}
                      </span>
                    ));
                  })()}
                </p>
                
                {/* Social Media Links */}
                <div className="flex space-x-3 mt-auto">
                  {instructor.facebookUrl && (
                    <a
                      href={instructor.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                      aria-label={`Facebook ${instructor.name}`}
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {instructor.instagramUrl && (
                    <a
                      href={instructor.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-600 transition-all duration-300 hover:scale-110"
                      aria-label={`Instagram ${instructor.name}`}
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {instructor.youtubeUrl && (
                    <a
                      href={instructor.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-110"
                      aria-label={`YouTube ${instructor.name}`}
                    >
                      <Youtube size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}