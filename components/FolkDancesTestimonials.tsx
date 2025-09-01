'use client';

import { useState } from 'react';
import { Star, Quote, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarouselAutoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  highlight: string;
}

const folkDancesTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Angelica Barbu',
    text: 'Recomandăm cu mare drag această școală de dans! Eu și soțul meu facem cursuri aici de aproximativ 10 luni și mergem cu drag de două ori pe săptămână! Am început din dorința de a face mișcare și chiar nu ne așteptam să ne placă atât de mult! Cătălina este foarte implicată, pune mult suflet in fiecare curs, e mereu veselă și prietenoasă! Chiar își dorește sa aibă cursanți bine pregătiți, iar noi facem tot posibilul sa ne ținem de treabă. Atât de mult ne place încât regretăm când suntem în concedii sau intervine ceva și nu putem ajunge! De fiecare dată repetăm acasă cu drag dansurile învățate, mai ales când se întâmplă să lipsim. Cred că acest lucru se datorează in mare parte Cătălinei care a reușit să transforme câteva ore de mișcare în pasiune. Îi mulțumim tare mult pentru răbdarea pe care o are cu noi, pentru modul profesionist de a ne corecta fără a ne face să ne simțim prost și pentru faptul ca fiecare om care trece prin sala de dans pleacă de la ore cu o bucățică din sufletul ei. E ,,o mâna de om", dar are o putere fantastică de a aduna oamenii, de a-i apropia unii de alții, de a transmite bucurie și de a te scoate din grijile de zi cu zi. Ne bucurăm că am luat decizia de a învața aici dansuri populare! ❤️',
    rating: 5,
    highlight: 'O putere fantastică de a aduna oamenii'
  },
  {
    id: 2,
    name: 'Roxana',
    text: 'De ,,În pași de dans" am auzit de la o fată care a avut și ea, la rândul ei o experiență foarte faină cu oamenii de aici. Pentru că m-am trezit la o petrecere, unde se cânta muzică populară și se dansa până nu se mai putea, iar eu stăteam pe scaun 🥴 am început cu dansurile populare, cu Cătălina ca instructor. Ne-a plăcut atât de mult, încât dacă pierdeam puțin, nu știam cum sa recuperăm mai repede. O recomandăm cu drag și îi mulțumim că ne-a scăpat de două picioare stângi!🥰🤗♥️',
    rating: 5,
    highlight: 'Ne-a scăpat de două picioare stângi!'
  },
  {
    id: 3,
    name: 'Mihaela Vulpe',
    text: 'Dansuri populare de calitate, muzică bună și distracție maximă!',
    rating: 5,
    highlight: 'Dansuri populare de calitate'
  },
  {
    id: 4,
    name: 'Victoria Neacșu',
    text: 'Recomand pentru profesionalism, căldură, prietenie, răbdare și dedicație. Oricât de stângaci ești, nu pleci fără să dobândești cunoștințe de bază. Înveți și te distrezi în același loc. Felicitări!',
    rating: 5,
    highlight: 'Înveți și te distrezi în același loc'
  },
  {
    id: 5,
    name: 'Camelia Măgureanu',
    text: 'E combinația perfectă între distracție și plăcerea de a învața să dansezi. M-am simțit minunat printre profesioniști care îți arată că e ușor să dansezi chiar dacă ai două picioare stângi. Mulțumim!',
    rating: 5,
    highlight: 'Combinația perfectă între distracție și plăcerea de a învața'
  },
  {
    id: 6,
    name: 'Elena Apostolescu',
    text: 'Sunt multe de spus despre În Pași de Dans. E unul din locurile speciale în care am cunoscut oameni minunați, am descoperit pasiunea pentru dans și muzică, am legat prietenii temeinice și mi-am creat amintiri de neuitat. Este de departe cel mai special loc în care aș fi putut începe să dansez și în care revin cu drag ori de câte ori am ocazia. Recomand cu căldură!',
    rating: 5,
    highlight: 'Cel mai special loc în care aș fi putut începe să dansez'
  }
];

export default function FolkDancesTestimonials() {
  // Hook pentru autoplay - folosit doar pe client
  const autoplay = useEmblaCarouselAutoplay({ delay: 3000, stopOnInteraction: false });
  
  // State pentru testimonialele extinse
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set());
  
  // Funcție pentru a comuta starea unui testimonial
  const toggleTestimonial = (id: number) => {
    const newExpanded = new Set(expandedTestimonials);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTestimonials(newExpanded);
  };
  
  // Grupăm testimonialele în slide-uri de câte 2 pentru mobile și 3 pentru desktop
  const testimonialSlides = [];
  for (let i = 0; i < folkDancesTestimonials.length; i += 3) {
    testimonialSlides.push(folkDancesTestimonials.slice(i, i + 3));
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ce spun cursanții noștri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descoperă experiențele autentice ale cursanților noștri și cum dansul le-a schimbat viața
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-7xl mx-auto relative mb-12">
          <Carousel className="w-full" opts={{ 
            loop: true,
            align: "start",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            dragFree: true,
            skipSnaps: false,
            inViewThreshold: 0.7
          }} plugins={[autoplay]}>
            <CarouselContent>
              {testimonialSlides.map((slide, slideIndex) => (
                <CarouselItem key={slideIndex} className="pl-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    {slide.map((testimonial, index) => {
                      const isExpanded = expandedTestimonials.has(testimonial.id);
                      const needsExpansion = testimonial.text.length > 200; // Aproximativ 6 rânduri
                      
                      return (
                        <div
                          key={testimonial.id}
                          className={`relative p-6 rounded-2xl ${
                            index % 2 === 0 
                              ? 'bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500' 
                              : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500'
                          } hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full`}
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
                          <div className="mb-4 lg:mb-6">
                            <p className={`text-gray-700 leading-relaxed text-center text-xs lg:text-sm ${
                              !isExpanded && needsExpansion ? 'line-clamp-6' : ''
                            }`}>
                              {testimonial.text}
                            </p>
                            
                            {/* Buton Mai mult/Mai puțin */}
                            {needsExpansion && (
                              <div className="text-center mt-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleTestimonial(testimonial.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 h-auto"
                                >
                                  {isExpanded ? (
                                    <>
                                      <span className="mr-1">Mai puțin</span>
                                      <ChevronUp className="w-4 h-4" />
                                    </>
                                  ) : (
                                    <>
                                      <span className="mr-1">Mai mult</span>
                                      <ChevronDown className="w-4 h-4" />
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>

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
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-3 right-3 lg:top-4 lg:right-4 opacity-10">
                            <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-red-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons - ascunse pe mobile pentru a nu interfera cu swipe */}
            <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white z-10" />
            <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white z-10" />
          </Carousel>
        </div>

        {/* Buton Înscrie-te la curs */}
        <div className="text-center">
          <Link href="/inscriere">
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-xl" size="lg">
              Înscrie-te la curs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
