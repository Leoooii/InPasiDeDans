'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
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
}

export default function InstructorsSection({ instructorNames }: InstructorsSectionProps) {
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
        if (instructorNames && instructorNames.length > 0) {
          filteredInstructori = sortedInstructori.filter(instructor =>
            instructorNames.some(name => {
              // Verific dacă numele instructorului conține exact numele căutat
              const instructorNameLower = instructor.name.toLowerCase();
              const searchNameLower = name.toLowerCase();
              
              // Cazuri speciale pentru potriviri exacte
              if (searchNameLower === 'alexandra' && instructorNameLower.includes('alexandra')) return true;
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
        {instructori.length === 2 
          ? "Instructorii noștri de dans de societate din București"
          : "Instructorii noștri de dans latino din București"
        }
      </h2>
      
      {instructori.length === 2 ? (
        // Layout special pentru 2 instructori - mai mari și centrați
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {instructori.map((instructor) => (
            <Card key={instructor.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={instructor.imageUrl}
                  alt={instructor.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{instructor.name}</h3>
                <p className="text-red-600 font-medium mb-4 text-lg">{instructor.role}</p>
                <p className="text-gray-600 text-base leading-relaxed mb-6">{instructor.bio}</p>
                
                {/* Social Media Links */}
                <div className="flex space-x-4">
                  {instructor.facebookUrl && (
                    <a
                      href={instructor.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`Facebook ${instructor.name}`}
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {instructor.instagramUrl && (
                    <a
                      href={instructor.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-600 transition-colors"
                      aria-label={`Instagram ${instructor.name}`}
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {instructor.youtubeUrl && (
                    <a
                      href={instructor.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label={`YouTube ${instructor.name}`}
                    >
                      <Youtube size={20} />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Layout original pentru 3+ instructori
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {instructori.map((instructor) => (
            <Card key={instructor.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={instructor.imageUrl}
                  alt={instructor.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                <p className="text-red-600 font-medium mb-3">{instructor.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{instructor.bio}</p>
                
                {/* Social Media Links */}
                <div className="flex space-x-3">
                  {instructor.facebookUrl && (
                    <a
                      href={instructor.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
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
                      className="text-gray-400 hover:text-pink-600 transition-colors"
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
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label={`YouTube ${instructor.name}`}
                    >
                      <Youtube size={18} />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}