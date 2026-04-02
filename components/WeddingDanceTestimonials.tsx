'use client';

import React, { useState } from 'react';
import { Star, Quote, Heart, Link } from 'lucide-react';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  highlight: string;
  date?: string;
}

const weddingDanceTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alina',
    text: 'Am avut o experiență excelentă cu Miriam. Este răbdătoare, a reușit din două persoane care nu au dansat niciodată să scoată un vals al mirilor superb, apreciat de toți invitații, în câteva ședințe. O recomand cu căldură tuturor celor care vor să învețe să danseze!',
    rating: 5,
    highlight: 'Un vals al mirilor superb, apreciat de toți invitații',
    date: 'Mai 2025'
  },
  {
    id: 2,
    name: 'Alexandra Popescu',
    text: 'Multumim, Luiza pentru tot ce ne ai învățat și abordarea cu răbdare pe care ai aplicat o mereu! 😇 Pentru dansul mirilor ai realizat cea mai frumoasa coregrafie și totul a ieșit minunat! Un dar de nunta prețios care rămâne în inimile noastre pentru totdeauna! 🥰 Recomand sa lucrați cu Luiza deoarece este o persoana sociabila, vesela, adaptabila și foarte inteligenta, care are capacitatea de a găsi cel puțin o soluție la orice impediment. ❤️',
    rating: 5,
    highlight: 'Cea mai frumoasa coregrafie și totul a ieșit minunat!',
    date: 'August 2024'
  },
  {
    id: 3,
    name: 'Andra',
    text: 'Am colaborat, pentru dansul mirilor, cu Daniela și am fost foarte mulțumiți! A ieșit foarte bine și ne-a plăcut mult și coregrafia! Ședințele erau relaxante și veneam mereu cu plăcere. Deși a trecut nunta și acum ne place să facem coregrafia acasă. Recomand!',
    rating: 5,
    highlight: 'Ședințele erau relaxante și veneam mereu cu plăcere',
    date: 'Septembrie 2024'
  },
  {
    id: 4,
    name: 'Roxana',
    text: 'De scoala In Pași de Dans am auzit de la o fată care a avut și ea, la rândul ei o experiența foarte faină cu oamenii de aici. Pentru că m-am trezit la o petrecere, unde se cânta muzică populară și se dansa până nu se mai putea, iar eu stăteam pe scaun 🥴 am început cu dansurile populare, cu Cătălina ca instructor. Ne-a plăcut atât de mult, încât dacă pierdeam puțin, nu știam cum sa recuperăm mai repede. Atunci când a trebuit să ne gândim serios la nuntă și la faptul că ne dorim un dans al mirilor, nu ne-a venit decât Cătălina în minte… și a fost cea mai bună decizie! E omul cu care poți să râzi oricât și din orice și e cel mai bun instructor posibil, mai ales când vine vorba de o coregrafie pentru dansul mirilor, pune suflet și ajunge la un rezultat care este muult peste ce vă imaginați inițial! O recomandăm cu drag și îi mulțumim că ne-a scăpat de doua picioare stângi!🥰🤗♥️',
    rating: 5,
    highlight: 'Cel mai bun instructor posibil pentru dansul mirilor',
    date: 'Iulie 2023'
  },
  {
    id: 5,
    name: 'Iuliana Francusi',
    text: 'Recomand cu drag Luiza! Din prima secundă în care am pășit în sală am avut o senzație de confort și impresia ca ne cunoaștem de ani, iar asta ne-a ajutat să ne detașam și să venim cu drag la fiecare ședință✨🌸! Un om minunat cu o energie aparte!',
    rating: 5,
    highlight: 'O senzație de confort și impresia ca ne cunoaștem de ani',
    date: 'Septembrie 2023'
  },
  {
    id: 6,
    name: 'Cristina Taras',
    text: 'Am avut un dans divin, datorită ție, cea mai talentată și răbdătoare profesoară de dans din lume, care ne-a ajutat să învățăm în doar câteva ședințe un dans apreciat de toți invitații! Recomand pentru profesionalism, căldură, prietenie, răbdare și dedicare, un om deosebit! Multumim, Alexandra pentru răbdarea acordată pregătirii coregrafiei celui mai important dans din viața noastră!❤️💃🕺',
    rating: 5,
    highlight: 'Cea mai talentată și răbdătoare profesoară de dans',
    date: 'August 2022'
  }
];

export default function WeddingDanceTestimonials() {
  // JSON-LD pentru schema Review
  const generateReviewsSchema = () => {
    const reviewsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": weddingDanceTestimonials.map((testimonial, index) => ({
        "@type": "Review",
        "position": index + 1,
        "reviewBody": testimonial.text,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": testimonial.name
        },
        "itemReviewed": {
          "@type": "School",
          "name": "In Pasi de Dans",
          "additionalType": "https://www.productontology.org/id/Dance_school"
        }
      }))
    };
    return JSON.stringify(reviewsSchema);
  };

  return (
    <>
      {/* JSON-LD Schema pentru SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateReviewsSchema() }}
      />
      
      <div className="bg-white">
        <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ce spun mirii noștri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descoperă experiențele autentice ale cuplurilor care și-au creat momentul magic al nunții cu noi
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
              {weddingDanceTestimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-1 md:pl-6 lg:pl-12 basis-full md:basis-1/2 lg:basis-1/3">
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
                          <p className="text-xs text-gray-500 dark:text-gray-400">
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
