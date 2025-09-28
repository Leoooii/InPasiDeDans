'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CursItem {
  id: number;
  title: string;
  href: string;
  imageSrc: string;
  description?: string;
}

const cursuriData: CursItem[] = [
  {
    id: 1,
    title: "Cursuri de dans pentru adulți",
    href: "/cursuri-dans-adulti",
    imageSrc: "/images/bachata.png?height=400&width=600",
    description: "Învață dansuri latino, de societate și populare"
  },
  {
    id: 2,
    title: "Cursuri de dans pentru copii",
    href: "/cursuri-dans-copii",
    imageSrc: "/images/copii.jpeg?height=400&width=600",
    description: "Dezvoltă coordonarea și ritmul la copii"
  },
  {
    id: 3,
    title: "Lecții private",
    href: "/lectii-private",
    imageSrc: "/images/private2.png?height=400&width=600",
    description: "Instruire personalizată pentru progres rapid"
  },
  {
    id: 4,
    title: "Grupe noi",
    href: "/grupe-in-formare",
    imageSrc: "/images/grupenoi.png?height=400&width=600",
    description: "Înscriere-te acum la un curs de dans"
  },
  {
    id: 5,
    title: "Tarife",
    href: "/tarife",
    imageSrc: "/images/tarife.png?height=400&width=600",
    description: "Vezi prețurile și abonamentele disponibile"
  },
  {
    id: 6,
    title: "Program",
    href: "/program",
    imageSrc: "/images/program.png?height=400&width=600",
    description: "Programul cursurilor și grupelor"
  }
];

export default function CursuriSection() {
  const autoplay = useEmblaCarouselAutoplay({ delay: 2000, stopOnInteraction: false });

  return (
    <section id="cursuri" className="pb-16 pt-20 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Cursuri de Dans în București
        </h1>
        
        {/* Carusel cu preview effect - 4 imagini vizibile */}
        <div className="w-full relative">
                     <Carousel 
             className="w-full" 
             opts={{ 
               loop: true,
               align: "center",        // Centrat pentru a vedea 3 imagini
               containScroll: "trimSnaps",
               slidesToScroll: 1,
               dragFree: true          // Permite scroll liber cu mouse-ul
             }} 
             plugins={[autoplay]}
           >
            <CarouselContent className="-ml-6 md:-ml-12 lg:-ml-16">
              {cursuriData.map((curs, index) => (
                <CarouselItem key={curs.id} className="pl-6 md:pl-12 lg:pl-16 basis-1/2 md:basis-1/2 lg:basis-1/4">
                                     <div className="relative group cursor-pointer">
                     {/* Imaginea principală */}
                     <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                       <img 
                         src={curs.imageSrc} 
                         alt={curs.title}
                         className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                       
                       {/* Overlay gradient pentru text */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                       
                       {/* Conținutul text peste imagine */}
                       <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                         <h3 className="text-white text-sm md:text-xl font-bold mb-1 md:mb-2">
                           {curs.title}
                         </h3>
                         {curs.description && (
                           <p className="text-white/90 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                             {curs.description}
                           </p>
                         )}
                       </div>
                     </div>
                     
                     {/* Buton "Află mai multe" sub imagine */}
                     <div className="mt-3 text-center">
                       <div className="flex items-center justify-center text-white/90 hover:text-white transition-colors duration-300">
                         <span className="text-xs md:text-sm font-medium mr-2">
                           Află mai multe
                         </span>
                         <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                       </div>
                     </div>
                     
                     {/* Link overlay pentru navigare */}
                     <Link href={curs.href} className="absolute inset-0 z-10" />
                   </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Butoane de navigare */}
            <CarouselPrevious className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
            <CarouselNext className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
