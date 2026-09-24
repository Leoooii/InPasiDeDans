'use client';

import { buttonVariants } from '@/components/ui/button';
import type React from 'react';

import { Mail, MapPin, Phone, Navigation, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';

import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import LocationSection from '@/components/LocationSection';

export default function Contact() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Contact" }
  ];

  return (
    <>

      <div className="container py-12 gap-6 flex flex-col">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/contact" />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Scoala de dansuri din Bucuresti</h1>
          <p className="text-slate-500 ">
            Contactează-ne pentru orice informații sau întrebări
          </p>
        </div>

        {/* Secțiune cu datele de contact identice din Google Business Profile */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-lg border border-red-200 ">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">În Pași de Dans - Locația noastră</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Adresă completă</h3>
                  <p className="text-slate-700 ">
                    Calea Rahovei, Nr. 262, Sector 5, București, România
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Cod poștal: 050897
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Ne puteți contacta telefonic</h3>
                  <div className="space-y-1 text-slate-700 ">
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
                  <h3 className="font-semibold text-slate-900 mb-1">Telefon</h3>
                  <a
                    href="tel:+40722675126"
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    0722 675 126
                  </a>
                  <p className="text-sm text-slate-600 mt-1">
                    Disponibil în programul de lucru
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <a
                    href="mailto:inpasidedans@gmail.com"
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    inpasidedans@gmail.com
                  </a>
                  <p className="text-sm text-slate-600 mt-1">
                    Răspundem în maximum 24 de ore
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buton de navigație către locație */}
          <div className="mt-6 pt-6 border-t border-red-200 ">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Calea+Rahovei+262+Sector+5+Bucuresti+Romania"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'brand', size: 'lg' })}
            >
              <Navigation className="h-5 w-5" />
              Navighează la locație
            </a>
            <p className="text-sm text-slate-600 mt-2">
              Click pentru a deschide aplicația Google Maps cu ruta către locația noastră
            </p>
          </div>
        </div>

        

        {/* Secțiunea cu locația - folosind LocationSection pentru consistență */}
        <LocationSection />

        {/* Secțiunea de invitare la vizită */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl border border-red-200 ">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">
              Vino să ne cunoști
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed">
              Te invităm să ne vizitezi pentru a cunoaște instructorii, a vedea sălile de dans și a afla mai multe despre cursurile noastre. 
              Programează o vizită gratuită și descoperă atmosfera plăcută din școala noastră!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <a
                href="tel:+40722675126"
                className={buttonVariants({ variant: 'brand', size: 'lg' })}
              >
                <Phone className="h-5 w-5" />
                Programează vizita
              </a>
              <a
                href="mailto:inpasidedans@gmail.com"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
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

    </>
  );
}
