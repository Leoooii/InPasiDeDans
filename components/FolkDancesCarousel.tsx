'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';

export default function FolkDancesCarousel() {
  const autoplay = useEmblaCarouselAutoplay({ delay: 2000, stopOnInteraction: false });

  return (
    <div className="w-full relative">
      <Carousel 
        className="w-full" 
        opts={{ 
          loop: true,
          align: "start",
          containScroll: "trimSnaps",
          slidesToScroll: 1,
          dragFree: true,
          skipSnaps: false,
          inViewThreshold: 0.7
        }} 
        plugins={[autoplay]}
      >
        <CarouselContent className="-ml-2 md:-ml-6 lg:-ml-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <CarouselItem key={num} className="pl-2 md:pl-6 lg:pl-12 basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={`/images/populare/${num}.jpeg`}
                    alt={`Dansuri populare ${num}`}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Butoane de navigare - ascunse pe mobile pentru a nu interfera cu swipe */}
        <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
        <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
      </Carousel>
    </div>
  );
}
