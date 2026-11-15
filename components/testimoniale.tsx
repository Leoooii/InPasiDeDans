'use client';

import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/testimoniale';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';






export default function Testimoniale({
  items,
  titlu = 'Ce spun cursanții noștri',
  subtitlu = 'Descoperă experiențele autentice ale cursanților noștri și cum dansul le-a schimbat viața',
  latime = 'jumatate',
}: {
  items: Testimonial[];
  titlu?: string;
  subtitlu?: string;
  latime?: 'jumatate' | 'treime';
}) {
  const testimonials = items;


  // Nu mai avem nevoie de grupare - fiecare testimonial este direct în carousel

  return (
    <>
      
      <div className="bg-white">
        <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {titlu}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {subtitlu}
          </p>
        </div>

        {/* Testimonials Carousel */}
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
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map(testimonial => (
                <CarouselItem key={testimonial.id} className={`pl-4 md:pl-6 basis-[88%] ${latime === 'treime' ? 'md:basis-1/2 lg:basis-1/3' : 'sm:basis-3/4 md:basis-2/3 lg:basis-1/2'}`}>
                  <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Quote className="h-8 w-8 text-orange-400" aria-hidden />
                      <div className="flex gap-0.5" aria-label={`${testimonial.rating} din 5 stele`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-lg font-semibold leading-snug text-slate-900">
                      {testimonial.highlight}
                    </p>
                    <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
                      <p>{testimonial.text}</p>
                    </blockquote>

                    <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                        {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">{testimonial.name}</span>
                        {testimonial.date && <span className="block text-xs text-slate-500">{testimonial.date}</span>}
                      </span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Butoane de navigare */}
            <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-sm z-20" />
            <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-sm z-20" />
          </Carousel>
        </div>
      </div>
    </div>
    </>
  );
}
