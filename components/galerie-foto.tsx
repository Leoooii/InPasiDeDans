'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';
import type { ImagineGalerie } from '@/lib/galerii';

// Galeria foto de pe paginile de stiluri (societate, latino, populare).
export default function GalerieFoto({
  imagini,
  subtitlu,
  titlu = 'Atmosfera de la cursurile noastre',
  inaltime = 'normal',
  autoplayMs = 3000,
  inContainer = true,
}: {
  imagini: ImagineGalerie[];
  subtitlu: string;
  titlu?: string;
  inaltime?: 'normal' | 'mare';
  autoplayMs?: number | false;
  inContainer?: boolean;
}) {
  const autoplay = useEmblaCarouselAutoplay({ delay: autoplayMs || 3000, stopOnInteraction: false });

  return (
    <div className={inContainer ? 'container flex flex-col gap-6 items-center py-12' : 'flex flex-col gap-6'}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{titlu}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">{subtitlu}</p>
      </div>

      <div className={`w-full relative ${inContainer ? 'max-w-6xl' : ''}`}>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: 'start',
            containScroll: 'trimSnaps',
            slidesToScroll: 1,
            dragFree: true,
            skipSnaps: false,
            inViewThreshold: 0.7,
          }}
          plugins={autoplayMs ? [autoplay] : []}
        >
          <CarouselContent className="-ml-1 md:-ml-6 lg:-ml-12">
            {imagini.map(image => (
              <CarouselItem key={image.src} className="pl-1 md:pl-6 lg:pl-12 basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className={`relative w-full h-48 md:h-64 ${inaltime === 'mare' ? 'lg:h-96' : 'lg:h-80'}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Ascunse pe mobil ca să nu interfereze cu swipe */}
          <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-slate-300 text-slate-700 hover:text-slate-900 z-20" />
          <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-slate-300 text-slate-700 hover:text-slate-900 z-20" />
        </Carousel>
      </div>
    </div>
  );
}
