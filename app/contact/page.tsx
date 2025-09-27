'use client';

import type React from 'react';

import { Mail, MapPin, Phone, Navigation, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import LocationSection from '@/components/LocationSection';
import Script from 'next/script';

export default function Contact() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Contact" }
  ];

  return (
    <>
      {/* Schema Local Business JSON-LD */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DanceSchool",
            "name": "În Pași de Dans",
            "description": "Școala de dans cu tradiție din 2009, oferind cursuri de dansuri latino, de societate, populare și lecții private în București.",
            "url": "https://www.inpasidedans.ro",
            "logo": "https://www.inpasidedans.ro/images/logo.png",
            "image": "https://www.inpasidedans.ro/images/logo.png",
            "telephone": "+40722675126",
            "email": "inpasidedans@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calea Rahovei, Nr. 262",
              "addressLocality": "București",
              "addressRegion": "Sector 5",
              "postalCode": "050897",
              "addressCountry": "RO"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 44.415353599999996,
              "longitude": 26.0774895
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "10:00",
                "closes": "17:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "14:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "00:00",
                "closes": "00:00",
                "validFrom": "2024-01-01",
                "validThrough": "2024-12-31"
              }
            ],
            "foundingDate": "2009",
            "priceRange": "$$",
            "currenciesAccepted": "RON",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "areaServed": {
              "@type": "City",
              "name": "București",
              "addressCountry": "RO"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 44.415353599999996,
                "longitude": 26.0774895
              },
              "geoRadius": "50000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Cursuri de Dans",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Dansuri Latino",
                    "description": "Salsa, bachata, cha-cha și multe altele"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Dansuri de Societate",
                    "description": "Vals, tango, foxtrot și alte dansuri elegante"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": "Dansuri Populare",
                    "description": "Peste 200 de jocuri populare românești"
                  }
                }
              ]
            },
            "sameAs": [
              "https://www.facebook.com/scoaladedansinpasidedans",
              "https://www.instagram.com/inpasidedans/",
              "https://www.tiktok.com/@in.pasi.de.dans",
              "https://www.youtube.com/@inpasidedans"
            ]
          })
        }}
      />

      <div className="container py-12 gap-6 flex flex-col">
        <Head />
        <SEOBreadcrumbs items={breadcrumbItems} />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Contact Scoala de dansuri din Bucuresti</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Contactează-ne pentru orice informații sau întrebări
          </p>
        </div>

        {/* Secțiune cu datele de contact identice din Google Business Profile */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-8 rounded-lg border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold mb-6 text-red-900 dark:text-red-100">În Pași de Dans - Locația noastră</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Adresă completă</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Calea Rahovei, Nr. 262, Sector 5, București, România
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Cod poștal: 050897
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Program de lucru</h3>
                  <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <p>Luni - Vineri: 10:00 - 17:00</p>
                    <p>Sâmbătă: 14:00 - 18:00</p>
                    <p>Duminică: Închis</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Telefon</h3>
                  <a
                    href="tel:+40722675126"
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    +40 722 675 126
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Disponibil în programul de lucru
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Email</h3>
                  <a
                    href="mailto:inpasidedans@gmail.com"
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    inpasidedans@gmail.com
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Răspundem în maximum 24 de ore
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buton de navigație către locație */}
          <div className="mt-6 pt-6 border-t border-red-200 dark:border-red-700">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Calea+Rahovei+262+Sector+5+Bucuresti+Romania"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Navigation className="h-5 w-5" />
              Navighează la locație
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Click pentru a deschide aplicația Google Maps cu ruta către locația noastră
            </p>
          </div>
        </div>

        

        {/* Secțiunea cu locația - folosind LocationSection pentru consistență */}
        <LocationSection />

        {/* Secțiunea de invitare la vizită */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-8 rounded-xl border border-red-200 dark:border-red-800">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">
              Vino să ne cunoști
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Te invităm să ne vizitezi pentru a cunoaște instructorii, a vedea sălile de dans și a afla mai multe despre cursurile noastre. 
              Programează o vizită gratuită și descoperă atmosfera plăcută din școala noastră!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a
                href="tel:+40722675126"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                <Phone className="h-5 w-5" />
                Programează vizita
              </a>
              <a
                href="mailto:inpasidedans@gmail.com"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                Trimite email
              </a>
            </div>
          </div>
        </div>

        
      </div>
      <div id="inscriere" className="px-0 md:px-32">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și înscrie-te la cursurile de dans latino
          </h3>
          <ContactForm/>
        </div>
      <GrupeInFormare />
      </div>

      {/* Schema Logo JSON-LD */}
      <Script
        id="logo-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "În Pași de Dans",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.inpasidedans.ro/images/logo.png",
              "width": 200,
              "height": 70
            },
            "url": "https://www.inpasidedans.ro"
          })
        }}
      />
    </>
  );
}
