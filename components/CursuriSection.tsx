'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
    imageSrc: "/images/bachata.png",
    description: "Învață dansuri latino, de societate și populare"
  },
  {
    id: 2,
    title: "Cursuri de dans pentru copii",
    href: "/cursuri-dans-copii",
    imageSrc: "/images/copii.jpeg",
    description: "Dezvoltă coordonarea și ritmul la copii"
  },
  {
    id: 3,
    title: "Lecții private",
    href: "/lectii-private",
    imageSrc: "/images/private2.png",
    description: "Instruire personalizată pentru progres rapid"
  },
  {
    id: 4,
    title: "Grupe noi",
    href: "/grupe-in-formare",
    imageSrc: "/images/grupenoi.png",
    description: "Înscrie-te acum la un curs de dans"
  },
  {
    id: 5,
    title: "Tarife",
    href: "/tarife",
    imageSrc: "/images/tarife.png",
    description: "Vezi prețurile și abonamentele disponibile"
  },
  {
    id: 6,
    title: "Program",
    href: "/program",
    imageSrc: "/images/program.png",
    description: "Programul cursurilor și grupelor"
  }
];

function CardCurs({ curs }: { curs: CursItem }) {
  return (
    <div className="relative group cursor-pointer">
      {/* Imaginea principală */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-orange-400/60">
        <div className="relative w-full h-48 md:h-64 lg:h-60">
          <Image
            src={curs.imageSrc}
            alt={curs.title}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Overlay gradient pentru text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Conținutul text peste imagine */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
          <h3 className="text-white text-sm md:text-xl font-bold mb-1 md:mb-2">
            {curs.title}
          </h3>
          {curs.description && (
            <p className="text-white/90 text-xs md:text-sm line-clamp-2">
              {curs.description}
            </p>
          )}
        </div>
      </div>

      {/* Buton "Află mai multe" sub imagine */}
      <div className="mt-3 text-center">
        <div className="inline-flex items-center justify-center text-white/70 group-hover:text-orange-400 transition-colors duration-300">
          <span className="text-xs md:text-sm font-medium mr-2">
            Află mai multe
          </span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Link overlay pentru navigare */}
      <Link href={curs.href} aria-label={curs.title} className="absolute inset-0 z-10" />
    </div>
  );
}

// aceleași clase ca în carusel, ca varianta statică să arate identic
const CLASA_SLIDE = 'pl-6 md:pl-12 lg:pl-10 basis-1/2 md:basis-1/2 lg:basis-1/4';

export default function CursuriSection() {
  // Caruselul (Embla) măsoară și clonează cardurile la pornire, ceea ce pe telefon costă
  // procesor exact când se încarcă pagina. Până ajunge vizitatorul la secțiune, cardurile
  // sunt afișate static (aceleași linkuri, același aspect).
  const [activ, setActiv] = useState(false);
  const sectiune = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectiune.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      intrari => {
        if (intrari.some(i => i.isIntersecting)) {
          setActiv(true);
          obs.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const autoplay = useEmblaCarouselAutoplay({
    delay: 4500,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  return (
    <section ref={sectiune} id="cursuri" className="pb-12 pt-16 bg-slate-950">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2">
            Descoperă cursurile
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Cursuri de Dans în București
          </h2>
        </div>

        {/* Carusel cu preview effect */}
        <div className="w-full relative">
          {activ ? (
            <Carousel
              className="w-full"
              opts={{
                loop: true,
                align: "center",
                containScroll: "trimSnaps",
                slidesToScroll: 1,
              }}
              plugins={[autoplay]}
            >
              <CarouselContent className="-ml-6 md:-ml-12 lg:-ml-16">
                {cursuriData.map(curs => (
                  <CarouselItem key={curs.id} className={CLASA_SLIDE}>
                    <CardCurs curs={curs} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Butoane de navigare */}
              <CarouselPrevious className="absolute left-1 sm:-left-4 lg:-left-6 h-10 w-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-white backdrop-blur-sm z-20" />
              <CarouselNext className="absolute right-1 sm:-right-4 lg:-right-6 h-10 w-10 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-white backdrop-blur-sm z-20" />
            </Carousel>
          ) : (
            <div className="overflow-hidden">
              <div className="flex -ml-6 md:-ml-12 lg:-ml-16">
                {cursuriData.map(curs => (
                  <div key={curs.id} className={`min-w-0 shrink-0 grow-0 ${CLASA_SLIDE}`}>
                    <CardCurs curs={curs} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
