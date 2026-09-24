import Image from 'next/image';
import Link from 'next/link';

type Stil = 'latino' | 'societate' | 'private' | 'populare';

// Catalogul stilurilor prezentate în secțiunea „Explorează și alte dansuri".
const CATALOG: { id: Stil; title: string; description: string; imageSrc: string; imageAlt: string; href: string }[] = [
  { id: 'latino', title: 'Dansuri Latino', description: 'Salsa, bachata, cha-cha și multe altele', imageSrc: '/images/latino.png', imageAlt: 'Dansuri latino', href: '/dansuri-latino' },
  { id: 'societate', title: 'Dansuri de Societate', description: 'Vals, tango, foxtrot și multe altele', imageSrc: '/images/societate.png', imageAlt: 'Dansuri de societate', href: '/dansuri-de-societate' },
  { id: 'private', title: 'Lecții Private', description: 'Instruire personalizată pentru progres rapid', imageSrc: '/images/private.png', imageAlt: 'Lecții private de dans', href: '/lectii-private' },
  { id: 'populare', title: 'Dansuri Populare', description: 'Peste 200 de jocuri populare românești', imageSrc: '/images/populare.png', imageAlt: 'Dansuri populare românești', href: '/dansuri-populare' },
];

export default function ExploreOtherDances({
  exclude,
  sectionTitle = 'Explorează și alte dansuri',
  sectionDescription = 'Descoperă diversitatea stilurilor de dans pe care le oferim',
}: {
  /** Stilul paginii curente, care nu se mai afișează în listă. */
  exclude: Stil;
  sectionTitle?: string;
  sectionDescription?: string;
}) {
  const danceCategories = CATALOG.filter(c => c.id !== exclude).slice(0, 3);
  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Dance Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {danceCategories.map((category) => (
            <div key={category.id} className="group">
              {/* Image Container with Link */}
              <Link href={category.href} className="block">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 mb-4">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={category.imageSrc}
                      alt={category.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <svg 
                        className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Text Content Below Image */}
              <div className="text-center">
                <Link 
                  href={category.href}
                  className="inline-block text-2xl font-bold text-slate-900 hover:text-red-600 transition-colors duration-300 mb-2 group-hover:text-red-600"
                >
                  {category.title}
                </Link>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
