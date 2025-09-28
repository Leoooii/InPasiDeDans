'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';

export default function LatinoAtmosphereSection() {
  const autoplay = useEmblaCarouselAutoplay({ delay: 3000, stopOnInteraction: false });

  // Imagini pentru atmosfera cursurilor de dans latino
  const latinoImages = [
    { src: '/images/latino/1.jpeg', alt: 'Atmosferă vibrantă la cursurile de salsa - energie și pasiune' },
    { src: '/images/latino/2.jpeg', alt: 'Curs bachata - momente de conexiune și senzualitate' },
    { src: '/images/latino/3.jpeg', alt: 'Workshop cha-cha - ritm și precizie în mișcări' },
    { src: '/images/latino/4.jpeg', alt: 'Atmosferă caldă la cursurile de rueda - comunitate și bucurie' },
    { src: '/images/latino/5.jpeg', alt: 'Curs rumba - eleganță și expresivitate în dans' },
    { src: '/images/latino/6.jpeg', alt: 'Workshop samba - energie braziliană și ritm contagios' },
    { src: '/images/latino/7.jpeg', alt: 'Curs lindy hop - veselie și improvizație în mișcare' },
    // { src: '/images/latino/8.jpeg', alt: 'Atmosferă vibrantă la cursurile de jive - energie și bucurie' },
    { src: '/images/latino/9.jpeg', alt: 'Workshop paso doble - dramă și intensitate în dans' },
    { src: '/images/latino/10.jpeg', alt: 'Cursuri latino - momente de conexiune și prietenie' },
    { src: '/images/latino/11.jpeg', alt: 'Atmosferă plină de viață la cursurile de dans latino' },
    { src: '/images/latino/12.jpeg', alt: 'Comunitate vibrantă de dansatori latino - bucurie și energie' },
    { src: '/images/latino/13.jpeg', alt: 'Celebrarea progresului la cursurile de dans latino' }
  ];

  return (
    <div className="container flex flex-col gap-6 items-center py-12">
      <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center">
        Atmosfera de la cursurile de dans latino
      </h2>
      
      <div className="max-w-6xl mx-auto text-center space-y-4 mb-8">
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
          Cursurile noastre de dans latino sunt mult mai mult decât simple lecții - sunt experiențe pline de viață, energie și conexiune umană. Fiecare sesiune aduce cu ea o atmosferă vibrantă unde pasiunea pentru dans se îmbină cu bucuria de a învăța și de a crea amintiri frumoase.
        </p>
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
          În sala noastră de dans, vei descoperi o comunitate prietenoasă și primitoare, unde fiecare pas este o ocazie de a te conecta cu alții prin limbajul universal al muzicii și mișcării. Atmosfera este una de încurajare, râs și progres comun.
        </p>
        <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
          De la salsa energică la bachata senzuală, fiecare stil de dans latino aduce cu el propria sa magie și farmec. Vei trăi momente de pură bucurie când vei simți cum ritmul te cucerește și cum dansul devine o extensie naturală a personalității tale.
        </p>
      </div>

      {/* Carusel cu imagini de atmosfera cursurilor latino */}
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
            {latinoImages.map((image, index) => (
              <CarouselItem key={index} className="pl-1 md:pl-6 lg:pl-12 basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 md:h-64 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
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
