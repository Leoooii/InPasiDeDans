import Image from 'next/image';
import Link from 'next/link';

const danceCategories = [
  {
    id: 1,
    title: 'Dansuri de Societate',
    description: 'Vals, tango, foxtrot și multe altele',
    imageSrc: '/images/societate.png',
    imageAlt: 'Dansuri de societate',
    href: '/dansuri-de-societate',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: 'Lecții Private',
    description: 'Instruire personalizată pentru progres rapid',
    imageSrc: '/images/private.png',
    imageAlt: 'Lecții private de dans',
    href: '/lectii-private',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 3,
    title: 'Dansuri Populare',
    description: 'Peste 200 de jocuri populare românești',
    imageSrc: '/images/populare.png',
    imageAlt: 'Dansuri populare românești',
    href: '/dansuri-populare',
    gradient: 'from-orange-500 to-red-600'
  }
];

export default function ExploreOtherDances() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Explorează și alte dansuri
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descoperă diversitatea stilurilor de dans pe care le oferim
          </p>
        </div>

        {/* Dance Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {danceCategories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h4 className="text-2xl font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                      {category.title}
                    </h4>
                    <p className="text-white/90 text-sm group-hover:text-white transition-colors duration-300">
                      {category.description}
                    </p>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
