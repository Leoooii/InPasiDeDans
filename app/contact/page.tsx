'use client';

import type React from 'react';

import { Mail, MapPin, Phone } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import ContactForm from '@/components/contact-form';

export default function Contact() {
  return (
    <div className="container py-12 ">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Contactează-ne pentru orice informații sau întrebări
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Adresă</h3>
                    <p className="text-gray-500">
                      Calea Rahovei, Nr. 262, Sector 5, Bucuresti.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Telefon</h3>
                    <p className="text-gray-500">+40 722 675 126</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 ">
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-500">inpasidedans@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 ">
                <h3 className="font-bold mb-2">
                  Ne puteți contacta telefonic:
                </h3>
                <div className="space-y-1 text-gray-500">
                  <p>Luni - Vineri: 10:00 - 17:00</p>
                  <p>Sâmbătă: 14:00 - 18:00</p>
                  <p>Duminică: Închis</p>
                  <p>Sau prin mesaj pe WhatsApp: oricând</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <ContactForm />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Locația noastră</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.86803561851!2d26.0774895!3d44.415353599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff9e4072cc6f%3A0x901ceb768f754f2a!2sIn%20Pa%C8%99i%20de%20Dans!5e0!3m2!1sen!2sro!4v1743511190472!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">
              Vino să ne cunoști
            </h2>
            <p className="dark:text-black">
              Te invităm să ne vizitezi pentru a cunoaște instructorii, a vedea
              sălile de dans și a afla mai multe despre cursurile noastre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
