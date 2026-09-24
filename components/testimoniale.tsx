'use client';

import { Star, Quote, Heart } from 'lucide-react';
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {titlu}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
            <CarouselContent className="-ml-1 md:-ml-6 lg:-ml-12">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className={`pl-1 md:pl-6 lg:pl-12 basis-full ${latime === 'treime' ? 'md:basis-1/2 lg:basis-1/3' : 'sm:basis-3/4 md:basis-2/3 lg:basis-1/2'}`}>
                  <div className="relative group">
                    <div
                      className={`relative p-6 rounded-2xl w-full h-full ${
                        index % 2 === 0 
                          ? 'bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500' 
                          : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500'
                      } hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                    >
                        {/* Quote Icon */}
                        <div className="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
                        </div>

                        {/* Rating */}
                        <div className="flex justify-center mb-3 lg:mb-4">
                          {[...Array(testimonial.rating)].map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500 fill-current mx-0.5 lg:mx-1"
                            />
                          ))}
                        </div>

                        {/* Highlight Text */}
                        <div className="text-center mb-3 lg:mb-4">
                          <p className="text-sm lg:text-base font-semibold text-gray-800 italic">
                            "{testimonial.highlight}"
                          </p>
                        </div>

                        {/* Full Testimonial */}
                        <p className="text-gray-700 leading-relaxed mb-4 lg:mb-6 text-center text-xs lg:text-sm">
                          {testimonial.text}
                        </p>

                        {/* Author */}
                        <div className="text-center">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-red-400 to-orange-400 rounded-full mx-auto mb-2 lg:mb-3 flex items-center justify-center">
                            <span className="text-white font-bold text-sm lg:text-base">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <p className="font-bold text-gray-900 text-sm lg:text-base">
                            {testimonial.name}
                          </p>
                          {testimonial.date && (
                            <p className="text-xs text-gray-500 ">
                              {testimonial.date}
                            </p>
                          )}
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-3 right-3 lg:top-4 lg:right-4 opacity-10">
                          <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-red-400" />
                        </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Butoane de navigare */}
            <CarouselPrevious className="flex absolute -left-2 md:-left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-red-500 text-red-500 hover:text-red-700 z-20" />
            <CarouselNext className="flex absolute -right-2 md:-right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-red-500 text-red-500 hover:text-red-700 z-20" />
          </Carousel>
        </div>
      </div>
    </div>
    </>
  );
}
