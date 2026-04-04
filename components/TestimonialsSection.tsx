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

interface TestimonialsSectionProps {
  danceType?: 'latino' | 'societate' | 'salsa-bachata' | 'copii' | 'default';
}

const latinoTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Magda Istrate',
    text: 'Am venit aici cu ideea: trecem un modul, învățăm ceva figuri și gata. Au trecut de atunci multe "module". După o zi grea, când zici "nu cred că pot să mă mișc", descoperi că dansezi cu plăcere, că abia aștepți să ajungi la sală. Și pleci încărcat cu o energie care ar putea să mute munții. Am descoperit un instructor, în persoana Alexandrei, care ar putea să învețe și un stâlp să danseze. Îi mulțumesc pentru răbdare, pentru motivare, pentru că există. Haideți la dans! Nici nu stiți ce pierdeți.',
    rating: 5,
    highlight: 'Energie care ar putea să mute munții'
  },
  {
    id: 2,
    name: 'Simona Haghighi',
    text: 'Este o atmosferă minunată, relaxantă și extrem de plăcută! Alexandra este o profesionistă, are răbdare cu cursanții, explică foarte clar toți pașii și toate mișcările și ne simțim extraordinar la curs! Mulțumim, Alexandra, pentru clipele frumoase petrecute în sala ta!',
    rating: 5,
    highlight: 'Atmosferă minunată și relaxantă'
  },
  {
    id: 3,
    name: 'Daniela Vlad',
    text: 'Atmosfera este de fiecare dată excelentă. Recomand cu încredere pe Alexandra, fie ca sunt cursuri de dans popular, fie de latino sau societate, nu ai cum să nu înveți să dansezi cu ea. Este cel mai bun profesor.',
    rating: 5,
    highlight: 'Cel mai bun profesor'
  },
  {
    id: 4,
    name: 'Antonia Anghel',
    text: 'Un loc care combină dansul, mișcarea și relaxarea în cel mai plăcut mod. Nu mă așteptam să îmi placă atât de mult, însă acum a devenit o activitate pe care nu o ratez.',
    rating: 5,
    highlight: 'Dans, mișcare și relaxare'
  },
  {
    id: 5,
    name: 'Adriana Băluță',
    text: 'Nu mă așteptam să îmi placă atât de mult! Învățăm să dansăm, să ne facem prieteni, să fim toleranți. Asta pe lângă matematica și fizica dansului, de care nu știam ca există până acum😊. Alexandra este minunată, dedicată, entuziasta, o frumusețe de om. Fericirea vine-n pași de dans!💃',
    rating: 5,
    highlight: 'Fericirea vine-n pași de dans'
  },
  {
    id: 6,
    name: 'Inga Bulat',
    text: 'Sunteți minunați, pe lângă eliminarea stresului, buna dispoziție, ținuta corectă, stima de sine crescută și o echipă plină de voie bună, as putea să mai adaug ca ne ajutați cu fiecare ședință să devenim mai buni, să iubim frumosul și să ne simțim bine in corpul nostru. Vă îmbrățișăm cu drag și ne bucurăm că am avut ocazia să vă cunoaștem!',
    rating: 5,
    highlight: 'Eliminarea stresului și buna dispoziție'
  }
];

const societateTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Lavinia Nicolescu',
    text: 'Recomand cu căldură această școală de dans. Alexandra este super! Este o persoana dinamică, implicată și foarte pasionată. ❤️',
    rating: 5,
    highlight: 'Recomand cu căldură această școală'
  },
  {
    id: 2,
    name: 'Simona Petcu',
    text: 'Oameni prietenoși, muzică, mișcare, veselie, siguranța condițiilor de lucru, atmosfera faină, implicare. Combinația din care ai numai de câștigat.',
    rating: 5,
    highlight: 'Combinația din care ai numai de câștigat'
  },
  {
    id: 3,
    name: 'Irina Roșu',
    text: 'Mulțumim pentru răbdarea de care ați dat dovadă pentru a învața tango ca dansul mirilor! A fost minunat și... emoționant! 🥳🤗😍',
    rating: 5,
    highlight: 'A fost minunat și... emoționant!'
  },
  {
    id: 4,
    name: 'Mirabela Năstase',
    text: 'Recomand școala În Pași de Dans, deoarece este cel mai potrivit loc de a face mișcare și de a scăpa de stresul cotidian! Unde mai pui că înveți și să dansezi! Așadar, ce poate fi mai plăcut decât dansul predat de Alexandra Dumitrache, o instructoare de dans cu har!',
    rating: 5,
    highlight: 'O instructoare de dans cu har!'
  },
  {
    id: 5,
    name: 'Miruna Băcilă',
    text: 'M-am înscris la dansuri din dorința de a avea o activitate care să iasă din rutină și am avut ocazia să descopăr o atmosfera plăcută și oameni frumoși. Recomand din tot sufletul!',
    rating: 5,
    highlight: 'Recomand din tot sufletul!'
  },
  {
    id: 6,
    name: 'Sorina Diamandescu',
    text: 'Cea mai plăcută modalitate de a face mișcare într-un mediu relaxant. Ce apreciez cel mai mult? Faptul că nu sunt doar cursuri de dans, ci o adevărată comunitate. Iar activitățile "extrașcolare" sunt deosebite… cele mai frumoase petreceri!!! și vacanțe de neuitat. Ați ridicat sus de tot ștacheta!',
    rating: 5,
    highlight: 'O adevărată comunitate'
  }
];

const salsaBachataTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Adriana Baluță',
    text: 'Cursurile de salsa și bachata au devenit cea mai așteptată parte a săptămânii pentru mine. Am descoperit nu doar dansul, ci și o comunitate caldă și prietenoasă.',
    rating: 5,
    highlight: 'Cea mai așteptată parte a săptămânii',
    date: 'Octombrie 2025'
  },
  {
    id: 2,
    name: 'Carmen Niculae',
    text: 'Nu am crezut că voi învăța pașii atât de repede! Instructorii explică pe înțelesul tuturor și reușesc să facă totul foarte distractiv.',
    rating: 5,
    highlight: 'Învățare rapidă și distractivă',
    date: 'Septembrie 2025'
  },
  {
    id: 3,
    name: 'Cristina Popa',
    text: 'Pentru mine, dansul a devenit o terapie. În fiecare oră de bachata uit de griji și plec cu zâmbetul pe buze.',
    rating: 5,
    highlight: 'Dansul ca terapie',
    date: 'Noiembrie 2025'
  },
  {
    id: 4,
    name: 'Cătălin Nistor',
    text: 'Atmosfera e minunată – multă energie, voie bună și muzică care te face să nu mai vrei să stai pe scaun.',
    rating: 5,
    highlight: 'Multă energie și voie bună',
    date: 'August 2025'
  },
  {
    id: 5,
    name: 'Victor Păducel',
    text: 'Cursurile de salsa m-au ajutat să am mai multă încredere în mine și să îmi dezvolt coordonarea. Plus că am cunoscut oameni super faini!',
    rating: 5,
    highlight: 'Încredere și coordonare',
    date: 'Ianuarie 2026'
  },
  {
    id: 6,
    name: 'Daria Mușat',
    text: 'Recomand din toată inima! Fiecare lecție e o combinație perfectă între tehnică, distracție și socializare.',
    rating: 5,
    highlight: 'Combinație perfectă',
    date: 'Decembrie 2025'
  }
];

const copiiTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ioana Marinescu',
    text: 'Fiica mea are 9 ani și de când a început cursurile la În Pași de Dans s-a transformat complet. Este mai sigură pe ea, mai coordonată și abia așteaptă fiecare oră de dans.',
    rating: 5,
    highlight: 'Mai sigură pe ea și mai coordonată',
    date: 'Octombrie 2025'
  },
  {
    id: 2,
    name: 'Radu Ionescu',
    text: 'Băiatul meu era timid și nu voia să iasă din cochilie. Cursurile de dans l-au ajutat enorm — acum participă la concursuri și e mândru de el. Mulțumim instructorilor!',
    rating: 5,
    highlight: 'Participă la concursuri și e mândru de el',
    date: 'Noiembrie 2025'
  },
  {
    id: 3,
    name: 'Alina Georgescu',
    text: 'Atmosfera la cursurile de copii este extraordinară. Instructorii au o răbdare incredibilă și știu să facă orele distractive și educative în același timp.',
    rating: 5,
    highlight: 'Ore distractive și educative',
    date: 'Septembrie 2025'
  },
  {
    id: 4,
    name: 'Mihai Dumitrescu',
    text: 'Fetița noastră face dans de 2 ani la această școală. Progresul ei este vizibil de la lună la lună. A participat la primul concurs și a câștigat locul 2!',
    rating: 5,
    highlight: 'Progres vizibil, locul 2 la concurs',
    date: 'Ianuarie 2026'
  },
  {
    id: 5,
    name: 'Elena Petre',
    text: 'Recomand cu toată inima! Copiii se simt ca acasă, instructorii sunt minunați și sala este dotată perfect. Cel mai bun cadou pe care l-am putut face copilului meu.',
    rating: 5,
    highlight: 'Cel mai bun cadou pentru copilul meu',
    date: 'Decembrie 2025'
  },
  {
    id: 6,
    name: 'Cristina Voicu',
    text: 'De la prima lecție, fiul meu a adorat cursurile. Acum dansează și acasă, singur, din plăcere. Este o activitate extraordinară pentru dezvoltarea lor.',
    rating: 5,
    highlight: 'Dansează și acasă din plăcere',
    date: 'Octombrie 2025'
  }
];

export default function TestimonialsSection({ danceType = 'default' }: TestimonialsSectionProps) {
  // Selectăm testimoniale în funcție de tipul de dans
  const getTestimonials = () => {
    switch (danceType) {
      case 'latino':
        return latinoTestimonials;
      case 'societate':
        return societateTestimonials;
      case 'salsa-bachata':
        return salsaBachataTestimonials;
      case 'copii':
        return copiiTestimonials;
      default:
        return latinoTestimonials; // Fallback la testimoniale latino
    }
  };

  const testimonials = getTestimonials();

  // JSON-LD pentru schema Review
  const generateReviewsSchema = () => {
    const reviewsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": testimonials.map((testimonial, index) => ({
        "@type": "Review",
        "position": index + 1,
        "reviewBody": testimonial.text,
        ...(testimonial.date ? { "datePublished": testimonial.date } : {}),
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

  // Nu mai avem nevoie de grupare - fiecare testimonial este direct în carousel

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
            Ce spun cursanții noștri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descoperă experiențele autentice ale cursanților noștri și cum dansul le-a schimbat viața
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
                <CarouselItem key={testimonial.id} className="pl-1 md:pl-6 lg:pl-12 basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2">
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
