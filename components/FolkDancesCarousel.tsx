'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const folkDancesImages = [
  {
    id: 1,
    src: "/images/populare/1.jpeg",
    alt: "Dansuri populare românești 1"
  },
  {
    id: 2,
    src: "/images/populare/2.jpeg",
    alt: "Dansuri populare românești 2"
  },
  {
    id: 3,
    src: "/images/populare/3.jpeg",
    alt: "Dansuri populare românești 3"
  },
  {
    id: 4,
    src: "/images/populare/4.jpeg",
    alt: "Dansuri populare românești 4"
  },
  {
    id: 5,
    src: "/images/populare/5.jpeg",
    alt: "Dansuri populare românești 5"
  },
  {
    id: 6,
    src: "/images/populare/6.jpeg",
    alt: "Dansuri populare românești 6"
  },
  {
    id: 7,
    src: "/images/populare/7.jpeg",
    alt: "Dansuri populare românești 7"
  },
  {
    id: 8,
    src: "/images/populare/8.jpeg",
    alt: "Dansuri populare românești 8"
  }
];

export default function FolkDancesCarousel() {
  const autoplay = useEmblaCarouselAutoplay({ delay: 3000, stopOnInteraction: false });

  return (
    <div className="w-full relative">
      <Carousel 
        className="w-full" 
        opts={{ 
          loop: true,
          align: "center",
          containScroll: "trimSnaps",
          slidesToScroll: 1,
          dragFree: true
        }} 
        plugins={[autoplay]}
      >
        <CarouselContent className="-ml-6 md:-ml-12 lg:-ml-16">
          {folkDancesImages.map((image) => (
            <CarouselItem key={image.id} className="pl-6 md:pl-12 lg:pl-16 basis-3/4 md:basis-2/3 lg:basis-1/2">
              <div className="relative group cursor-pointer">
                {/* Imaginea principală */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <div className="relative w-full h-48 md:h-64 lg:h-80">
                    <Image 
                      src={image.src} 
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlay gradient pentru text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Butoane de navigare */}
        <CarouselPrevious className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
        <CarouselNext className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
      </Carousel>
    </div>
  );
}
