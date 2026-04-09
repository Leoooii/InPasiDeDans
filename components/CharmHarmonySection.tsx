'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';

export default function CharmHarmonySection() {
  const autoplay = useEmblaCarouselAutoplay({ delay: 3000, stopOnInteraction: false });

  // Imagini pentru workshopurile de dansuri de societate
  const societateImages = [
    { src: '/images/societate/1.jpeg', alt: 'Workshop vals - învățăm grația și eleganța mișcărilor' },
    { src: '/images/societate/2.jpeg', alt: 'Workshop tango - descoperim pasiunea și dramă dansului' },
    { src: '/images/societate/3.jpeg', alt: 'Workshop foxtrot - perfecționăm fluiditatea și sofisticarea' },
    { src: '/images/societate/4.jpeg', alt: 'Workshop quickstep - ne bucurăm de energia și veselia dansului' },
    { src: '/images/societate/5.jpeg', alt: 'Workshop vals vienez - învățăm rotațiile elegante și rapide' },
    { src: '/images/societate/6.jpeg', alt: 'Workshop dansuri de societate - momente de armonie și frumusețe' },
    { src: '/images/societate/7.jpeg', alt: 'Workshop final - celebram progresul și farmecul dansului' }
  ];

  return (
    <div className="container flex flex-col gap-6 items-center py-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Atmosfera de la cursurile noastre
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Rafinament, grație și momente autentice — descoperă farmecul dansurilor de societate
          într-o atmosferă caldă și primitoare.
        </p>
      </div>

      {/* Carusel cu imagini de dansuri de societate */}
      <div className="w-full relative max-w-6xl">
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
          <CarouselContent className="-ml-1 md:-ml-6 lg:-ml-12">
            {societateImages.map((image, index) => (
              <CarouselItem key={index} className="pl-1 md:pl-6 lg:pl-12 basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay cu text pentru fiecare imagine */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm md:text-base font-medium">
                          {image.alt}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Butoane de navigare */}
          <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
          <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-700 hover:text-gray-900 z-20" />
        </Carousel>
      </div>
    </div>
  );
}
